import { BigQuery } from '@google-cloud/bigquery'
import { PubSub } from '@google-cloud/pubsub'
import * as XLSX from 'xlsx'

const UUID_RE =
  /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i
const SUPPORTED_SOURCES = new Set(['statssports', 'vald'])
const MAX_UNMAPPED_SAMPLES = 5

type SourceDevice = 'statssports' | 'vald'

export interface GcpRuntimeConfig {
  projectId: string
  clientEmail: string
  privateKey: string
}

export interface UnmappedSample {
  rowNumber: number
  reason: string
  identifiers: Record<string, string | null>
  rowPreview: Record<string, string>
}

export interface PseudoStats {
  rowsTotal: number
  rowsMapped: number
  rowsUnmapped: number
  unmappedSamples: UnmappedSample[]
}

export interface PreUploadPseudoInput {
  source: string
  fileName: string
  contentType?: string
  raw: Buffer
  teamId: string
  gcp: GcpRuntimeConfig
  refPlayerTable: string
  refTeamTable: string
  pseudoVersion: string
}

export interface PreUploadPseudoResult {
  transformed: Buffer
  contentType: string
  metadata: Record<string, string>
  stats: PseudoStats
  tnsTeamId: string | null
}

export interface PublishPseudoAlertInput {
  gcp: GcpRuntimeConfig
  topicName: string
  payload: Record<string, unknown>
}

export interface ResolveTeamFolderKeyInput {
  teamId: string
  gcp: GcpRuntimeConfig
  refTeamTable: string
}

export interface ResolveTeamFolderKeyResult {
  inputTeamId: string
  teamFolderKey: string
  tnsTeamId: string | null
  resolvedFromUuid: boolean
}

interface PlayerMaps {
  tnsIds: Set<string>
  nameMap: Map<string, string>
  whoopMap: Map<string, string>
  valdIdMap: Map<string, string>
  statsExtMap: Map<string, string>
  valdExtMap: Map<string, string>
}

interface TransformResult {
  transformed: Buffer
  contentType: string
  stats: PseudoStats
}

interface ParsedTableFqn {
  projectId: string
  datasetId: string
  tableId: string
}

const tableColumnsCache = new Map<string, Set<string>>()
const clientsCache = new Map<string, { bigquery: BigQuery; pubsub: PubSub }>()

function nowIso(): string {
  return new Date().toISOString()
}

function normalizeText(value: unknown): string {
  const text = String(value ?? '')
    .replace(/\ufeff/g, '')
    .trim()
    .toLowerCase()
  return text.replace(/\s+/g, ' ')
}

function normalizeHeader(value: unknown): string {
  return normalizeText(value).replace(/[^a-z0-9]+/g, '')
}

function truncateText(value: unknown, maxLen = 120): string {
  const text = String(value ?? '').trim()
  if (text.length <= maxLen) {
    return text
  }
  return `${text.slice(0, maxLen - 3)}...`
}

function asSource(source: string): SourceDevice | null {
  const normalized = source.trim().toLowerCase()
  if (!SUPPORTED_SOURCES.has(normalized)) {
    return null
  }
  return normalized as SourceDevice
}

function firstExisting(columns: Set<string>, candidates: string[]): string | null {
  for (const candidate of candidates) {
    if (columns.has(candidate)) {
      return candidate
    }
  }
  return null
}

function firstIndex(headers: string[], candidates: string[]): number | null {
  for (const candidate of candidates) {
    const idx = headers.indexOf(candidate)
    if (idx >= 0) {
      return idx
    }
  }
  return null
}

function parseTableFqn(
  tableFqn: string,
  defaultProjectId: string
): ParsedTableFqn {
  const parts = tableFqn.trim().split('.').filter(Boolean)
  if (parts.length === 3) {
    return { projectId: parts[0], datasetId: parts[1], tableId: parts[2] }
  }
  if (parts.length === 2) {
    return { projectId: defaultProjectId, datasetId: parts[0], tableId: parts[1] }
  }
  throw new Error(`Invalid table reference: ${tableFqn}`)
}

function getClients(gcp: GcpRuntimeConfig): { bigquery: BigQuery; pubsub: PubSub } {
  const cacheKey = `${gcp.projectId}|${gcp.clientEmail}`
  const cached = clientsCache.get(cacheKey)
  if (cached) {
    return cached
  }

  const credentials = {
    client_email: gcp.clientEmail,
    private_key: gcp.privateKey,
  }

  const clients = {
    bigquery: new BigQuery({
      projectId: gcp.projectId,
      credentials,
    }),
    pubsub: new PubSub({
      projectId: gcp.projectId,
      credentials,
    }),
  }

  clientsCache.set(cacheKey, clients)
  return clients
}

async function getTableColumns(
  bigquery: BigQuery,
  tableFqn: string,
  defaultProjectId: string
): Promise<Set<string>> {
  const normalizedFqn = tableFqn.trim()
  const cached = tableColumnsCache.get(normalizedFqn)
  if (cached) {
    return cached
  }

  const parsed = parseTableFqn(normalizedFqn, defaultProjectId)
  const sql = `
    SELECT column_name
    FROM \`${parsed.projectId}.${parsed.datasetId}.INFORMATION_SCHEMA.COLUMNS\`
    WHERE table_name = @table_name
  `

  const [rows] = await bigquery.query({
    query: sql,
    params: { table_name: parsed.tableId },
    useLegacySql: false,
  })

  const columns = new Set<string>()
  for (const row of rows as Array<Record<string, unknown>>) {
    const name = String(row.column_name ?? '').trim()
    if (name) {
      columns.add(name)
    }
  }

  tableColumnsCache.set(normalizedFqn, columns)
  return columns
}

function emptyPlayerMaps(): PlayerMaps {
  return {
    tnsIds: new Set<string>(),
    nameMap: new Map<string, string>(),
    whoopMap: new Map<string, string>(),
    valdIdMap: new Map<string, string>(),
    statsExtMap: new Map<string, string>(),
    valdExtMap: new Map<string, string>(),
  }
}

async function resolveTnsTeamId(
  bigquery: BigQuery,
  refTeamTable: string,
  teamId: string,
  defaultProjectId: string
): Promise<string | null> {
  const teamKey = teamId.trim()
  if (!teamKey) {
    return null
  }

  if (UUID_RE.test(teamKey)) {
    return teamKey
  }

  const columns = await getTableColumns(bigquery, refTeamTable, defaultProjectId)
  if (!columns.has('tns_team_id')) {
    return null
  }

  const lookupColumn = firstExisting(columns, [
    'team_key',
    'teamId',
    'team_id',
    'external_team_id',
    'source_team_id',
  ])

  if (!lookupColumn) {
    return null
  }

  const sql = `
    SELECT CAST(\`tns_team_id\` AS STRING) AS tns_team_id
    FROM \`${refTeamTable}\`
    WHERE CAST(\`${lookupColumn}\` AS STRING) = @team_key
    LIMIT 2
  `

  const [rows] = await bigquery.query({
    query: sql,
    params: { team_key: teamKey },
    useLegacySql: false,
  })

  if (!Array.isArray(rows) || rows.length === 0) {
    return null
  }

  const first = rows[0] as Record<string, unknown>
  const resolved = String(first.tns_team_id ?? '').trim()
  return resolved || null
}

async function buildPlayerMaps(
  bigquery: BigQuery,
  refPlayerTable: string,
  tnsTeamId: string | null,
  defaultProjectId: string
): Promise<PlayerMaps> {
  if (!tnsTeamId) {
    return emptyPlayerMaps()
  }

  const columns = await getTableColumns(bigquery, refPlayerTable, defaultProjectId)
  if (!columns.has('tns_player_id') || !columns.has('tns_team_id')) {
    return emptyPlayerMaps()
  }

  const displayCol = firstExisting(columns, [
    'player_display_name',
    'player_name',
    'name',
  ])
  const whoopCol = firstExisting(columns, ['whoop_player_id'])
  const valdIdCol = firstExisting(columns, ['vald_player_id'])
  const statsExtCol = firstExisting(columns, [
    'statssports_playerExtId',
    'statssports_player_ext_id',
  ])
  const valdExtCol = firstExisting(columns, ['vald_playerExtId', 'vald_player_ext_id'])

  const selectParts = ['CAST(`tns_player_id` AS STRING) AS tns_player_id']
  if (displayCol) {
    selectParts.push(`CAST(\`${displayCol}\` AS STRING) AS display_name`)
  }
  if (whoopCol) {
    selectParts.push(`CAST(\`${whoopCol}\` AS STRING) AS whoop_id`)
  }
  if (valdIdCol) {
    selectParts.push(`CAST(\`${valdIdCol}\` AS STRING) AS vald_id`)
  }
  if (statsExtCol) {
    selectParts.push(`CAST(\`${statsExtCol}\` AS STRING) AS stats_ext_id`)
  }
  if (valdExtCol) {
    selectParts.push(`CAST(\`${valdExtCol}\` AS STRING) AS vald_ext_id`)
  }

  const sql = `
    SELECT ${selectParts.join(', ')}
    FROM \`${refPlayerTable}\`
    WHERE CAST(\`tns_team_id\` AS STRING) = @tns_team_id
  `

  const [rows] = await bigquery.query({
    query: sql,
    params: { tns_team_id: tnsTeamId },
    useLegacySql: false,
  })

  const maps = emptyPlayerMaps()

  for (const row of rows as Array<Record<string, unknown>>) {
    const tnsPlayerId = String(row.tns_player_id ?? '').trim()
    if (!tnsPlayerId) {
      continue
    }
    maps.tnsIds.add(tnsPlayerId)

    const displayName = normalizeText(row.display_name ?? '')
    const whoopId = String(row.whoop_id ?? '').trim()
    const valdId = String(row.vald_id ?? '').trim()
    const statsExtId = String(row.stats_ext_id ?? '').trim()
    const valdExtId = String(row.vald_ext_id ?? '').trim()

    if (displayName && !maps.nameMap.has(displayName)) {
      maps.nameMap.set(displayName, tnsPlayerId)
    }
    if (whoopId && !maps.whoopMap.has(whoopId)) {
      maps.whoopMap.set(whoopId, tnsPlayerId)
    }
    if (valdId && !maps.valdIdMap.has(valdId)) {
      maps.valdIdMap.set(valdId, tnsPlayerId)
    }
    if (statsExtId && !maps.statsExtMap.has(statsExtId)) {
      maps.statsExtMap.set(statsExtId, tnsPlayerId)
    }
    if (valdExtId && !maps.valdExtMap.has(valdExtId)) {
      maps.valdExtMap.set(valdExtId, tnsPlayerId)
    }
  }

  return maps
}

function resolveTnsPlayerId(
  maps: PlayerMaps,
  ids: {
    displayName: string | null
    whoopPlayerId: string | null
    valdPlayerId: string | null
    statssportsPlayerExtId: string | null
    valdPlayerExtId: string | null
  }
): string | null {
  const normalizedName = normalizeText(ids.displayName)
  if (normalizedName) {
    const byName = maps.nameMap.get(normalizedName)
    if (byName) {
      return byName
    }
  }

  const candidates: Array<[string | null, Map<string, string>]> = [
    [ids.whoopPlayerId, maps.whoopMap],
    [ids.valdPlayerId, maps.valdIdMap],
    [ids.statssportsPlayerExtId, maps.statsExtMap],
    [ids.valdPlayerExtId, maps.valdExtMap],
  ]

  for (const [candidate, map] of candidates) {
    const key = String(candidate ?? '').trim()
    if (!key) {
      continue
    }
    if (maps.tnsIds.has(key)) {
      return key
    }
    const resolved = map.get(key)
    if (resolved) {
      return resolved
    }
  }

  return null
}

function detectCsvDelimiter(sample: string): string {
  const quoteSafeSample = sample.replace(/"([^"]|"")*"/g, '')
  const candidates = [',', ';', '\t']
  let bestDelimiter = ','
  let bestCount = -1
  for (const delimiter of candidates) {
    const count = quoteSafeSample.split(delimiter).length - 1
    if (count > bestCount) {
      bestCount = count
      bestDelimiter = delimiter
    }
  }
  return bestDelimiter
}

function parseCsv(text: string, delimiter: string): string[][] {
  const rows: string[][] = []
  let row: string[] = []
  let field = ''
  let inQuotes = false

  for (let i = 0; i < text.length; i += 1) {
    const char = text[i]

    if (inQuotes) {
      if (char === '"') {
        const next = text[i + 1]
        if (next === '"') {
          field += '"'
          i += 1
        } else {
          inQuotes = false
        }
      } else {
        field += char
      }
      continue
    }

    if (char === '"') {
      inQuotes = true
      continue
    }

    if (char === delimiter) {
      row.push(field)
      field = ''
      continue
    }

    if (char === '\n') {
      row.push(field)
      rows.push(row)
      row = []
      field = ''
      continue
    }

    if (char === '\r') {
      if (text[i + 1] === '\n') {
        i += 1
      }
      row.push(field)
      rows.push(row)
      row = []
      field = ''
      continue
    }

    field += char
  }

  if (field.length > 0 || row.length > 0) {
    row.push(field)
    rows.push(row)
  }

  return rows
}

function escapeCsvField(value: string, delimiter: string): string {
  if (
    value.includes('"') ||
    value.includes(delimiter) ||
    value.includes('\n') ||
    value.includes('\r')
  ) {
    return `"${value.replace(/"/g, '""')}"`
  }
  return value
}

function stringifyCsv(rows: string[][], delimiter: string): string {
  return rows
    .map((row) =>
      row.map((value) => escapeCsvField(String(value ?? ''), delimiter)).join(delimiter)
    )
    .join('\n')
}

function rowValue(row: string[], index: number | null): string | null {
  if (index === null || index < 0 || index >= row.length) {
    return null
  }
  const value = String(row[index] ?? '').trim()
  return value || null
}

function buildRowPreview(
  headers: string[],
  row: string[],
  maxCols = 4
): Record<string, string> {
  const preview: Record<string, string> = {}

  for (let i = 0; i < row.length; i += 1) {
    const text = String(row[i] ?? '').trim()
    if (!text) {
      continue
    }
    const header = String(headers[i] ?? '').trim()
    const key = header || `col_${i + 1}`
    preview[key] = truncateText(text)
    if (Object.keys(preview).length >= maxCols) {
      return preview
    }
  }

  for (let i = 0; i < Math.min(row.length, maxCols); i += 1) {
    const header = String(headers[i] ?? '').trim()
    const key = header || `col_${i + 1}`
    if (!preview[key]) {
      preview[key] = truncateText(row[i])
    }
  }

  return preview
}

function buildUnmappedSample(
  rowNumber: number,
  reason: string,
  ids: Record<string, string | null>,
  rowPreview: Record<string, string>
): UnmappedSample {
  return {
    rowNumber,
    reason,
    identifiers: ids,
    rowPreview,
  }
}

function extractIdentityColumns(
  normalizedHeaders: string[]
): {
  nameIndex: number | null
  whoopIndex: number | null
  valdIdIndex: number | null
  statsExtIndex: number | null
  valdExtIndex: number | null
} {
  return {
    nameIndex: firstIndex(normalizedHeaders, [
      'playerdisplayname',
      'playername',
      'playerdisplay',
      'name',
      'navn',
    ]),
    whoopIndex: firstIndex(normalizedHeaders, ['whoopplayerid', 'whoopid']),
    valdIdIndex: firstIndex(normalizedHeaders, ['valdplayerid']),
    statsExtIndex: firstIndex(normalizedHeaders, [
      'playerextid',
      'statssportsplayerextid',
    ]),
    valdExtIndex: firstIndex(normalizedHeaders, ['valdplayerextid']),
  }
}

function pseudoanonymizeCsv(raw: Buffer, maps: PlayerMaps): TransformResult {
  const text = raw.toString('utf-8').replace(/^\ufeff/, '')
  const delimiter = detectCsvDelimiter(text.slice(0, 4096))
  const rows = parseCsv(text, delimiter)

  if (rows.length === 0) {
    return {
      transformed: raw,
      contentType: 'text/csv',
      stats: {
        rowsTotal: 0,
        rowsMapped: 0,
        rowsUnmapped: 0,
        unmappedSamples: [],
      },
    }
  }

  const headers = rows[0]
  const normalizedHeaders = headers.map((header) => normalizeHeader(header))
  const {
    nameIndex,
    whoopIndex,
    valdIdIndex,
    statsExtIndex,
    valdExtIndex,
  } = extractIdentityColumns(normalizedHeaders)

  let rowsTotal = 0
  let rowsMapped = 0
  let rowsUnmapped = 0
  const unmappedSamples: UnmappedSample[] = []

  for (let rowIdx = 1; rowIdx < rows.length; rowIdx += 1) {
    const row = rows[rowIdx]
    if (!row.some((value) => String(value ?? '').trim())) {
      continue
    }

    rowsTotal += 1
    const ids = {
      displayName: rowValue(row, nameIndex),
      whoopPlayerId: rowValue(row, whoopIndex),
      valdPlayerId: rowValue(row, valdIdIndex),
      statssportsPlayerExtId: rowValue(row, statsExtIndex),
      valdPlayerExtId: rowValue(row, valdExtIndex),
    }

    const tnsPlayerId = resolveTnsPlayerId(maps, ids)

    if (tnsPlayerId && nameIndex !== null && nameIndex < row.length) {
      row[nameIndex] = tnsPlayerId
      rowsMapped += 1
      continue
    }

    rowsUnmapped += 1
    if (unmappedSamples.length < MAX_UNMAPPED_SAMPLES) {
      const reason =
        tnsPlayerId && nameIndex === null ? 'name_column_missing' : 'no_match'
      unmappedSamples.push(
        buildUnmappedSample(
          rowIdx + 1,
          reason,
          ids,
          buildRowPreview(headers, row, 4)
        )
      )
    }
  }

  const transformedText = stringifyCsv(rows, delimiter)
  return {
    transformed: Buffer.from(transformedText, 'utf-8'),
    contentType: 'text/csv',
    stats: {
      rowsTotal,
      rowsMapped,
      rowsUnmapped,
      unmappedSamples,
    },
  }
}

function findHeaderRow(source: SourceDevice, matrix: string[][]): number {
  const maxScan = Math.min(matrix.length, 40)

  if (source === 'vald') {
    for (let rowIdx = 0; rowIdx < maxScan; rowIdx += 1) {
      const normalized = matrix[rowIdx].map((value) => normalizeHeader(value))
      if (normalized.includes('navn') || normalized.includes('playername')) {
        return rowIdx
      }
    }
    return 0
  }

  for (let rowIdx = 0; rowIdx < maxScan; rowIdx += 1) {
    const normalized = matrix[rowIdx].map((value) => normalizeHeader(value))
    if (
      normalized.includes('playerdisplayname') ||
      normalized.includes('playername')
    ) {
      return rowIdx
    }
  }

  return 0
}

function setSheetCellValue(
  sheet: XLSX.WorkSheet,
  row: number,
  col: number,
  value: string
): void {
  const address = XLSX.utils.encode_cell({ r: row, c: col })
  const existing = sheet[address]
  if (existing) {
    existing.v = value
    existing.t = 's'
    delete (existing as { w?: string }).w
    return
  }

  sheet[address] = { t: 's', v: value }
}

function workbookContentType(fileName: string, fallback: string): string {
  const lowered = fileName.toLowerCase()
  if (lowered.endsWith('.xls')) {
    return 'application/vnd.ms-excel'
  }
  if (lowered.endsWith('.xlsx')) {
    return 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
  }
  return fallback
}

function workbookType(fileName: string): XLSX.BookType {
  return fileName.toLowerCase().endsWith('.xls') ? 'xls' : 'xlsx'
}

function pseudoanonymizeWorkbook(
  raw: Buffer,
  fileName: string,
  source: SourceDevice,
  maps: PlayerMaps
): TransformResult {
  const workbook = XLSX.read(raw, {
    type: 'buffer',
    cellDates: false,
    raw: false,
  })

  const firstSheetName = workbook.SheetNames[0]
  if (!firstSheetName) {
    return {
      transformed: raw,
      contentType: workbookContentType(fileName, 'application/octet-stream'),
      stats: {
        rowsTotal: 0,
        rowsMapped: 0,
        rowsUnmapped: 0,
        unmappedSamples: [],
      },
    }
  }

  const sheet = workbook.Sheets[firstSheetName]
  const matrix = XLSX.utils.sheet_to_json(sheet, {
    header: 1,
    raw: false,
    defval: '',
  }) as string[][]

  if (matrix.length === 0) {
    return {
      transformed: raw,
      contentType: workbookContentType(fileName, 'application/octet-stream'),
      stats: {
        rowsTotal: 0,
        rowsMapped: 0,
        rowsUnmapped: 0,
        unmappedSamples: [],
      },
    }
  }

  const headerRowIndex = findHeaderRow(source, matrix)
  const headers = (matrix[headerRowIndex] ?? []).map((value) => String(value ?? ''))
  const normalizedHeaders = headers.map((header) => normalizeHeader(header))
  const {
    nameIndex,
    whoopIndex,
    valdIdIndex,
    statsExtIndex,
    valdExtIndex,
  } = extractIdentityColumns(normalizedHeaders)

  let rowsTotal = 0
  let rowsMapped = 0
  let rowsUnmapped = 0
  const unmappedSamples: UnmappedSample[] = []

  for (let rowIdx = headerRowIndex + 1; rowIdx < matrix.length; rowIdx += 1) {
    const row = (matrix[rowIdx] ?? []).map((value) => String(value ?? ''))

    const ids = {
      displayName: rowValue(row, nameIndex),
      whoopPlayerId: rowValue(row, whoopIndex),
      valdPlayerId: rowValue(row, valdIdIndex),
      statssportsPlayerExtId: rowValue(row, statsExtIndex),
      valdPlayerExtId: rowValue(row, valdExtIndex),
    }

    if (!Object.values(ids).some((value) => String(value ?? '').trim())) {
      continue
    }

    rowsTotal += 1
    const tnsPlayerId = resolveTnsPlayerId(maps, ids)

    if (tnsPlayerId && nameIndex !== null) {
      setSheetCellValue(sheet, rowIdx, nameIndex, tnsPlayerId)
      rowsMapped += 1
      continue
    }

    rowsUnmapped += 1
    if (unmappedSamples.length < MAX_UNMAPPED_SAMPLES) {
      const reason =
        tnsPlayerId && nameIndex === null ? 'name_column_missing' : 'no_match'
      unmappedSamples.push(
        buildUnmappedSample(
          rowIdx + 1,
          reason,
          ids,
          buildRowPreview(headers, row, 4)
        )
      )
    }
  }

  const transformed = XLSX.write(workbook, {
    type: 'buffer',
    bookType: workbookType(fileName),
  }) as Buffer

  return {
    transformed,
    contentType: workbookContentType(fileName, 'application/octet-stream'),
    stats: {
      rowsTotal,
      rowsMapped,
      rowsUnmapped,
      unmappedSamples,
    },
  }
}

function sourceContentType(
  source: SourceDevice,
  fileName: string,
  incomingContentType?: string
): string {
  const lowered = fileName.toLowerCase()
  if (lowered.endsWith('.csv')) {
    return 'text/csv'
  }
  if (lowered.endsWith('.xls')) {
    return 'application/vnd.ms-excel'
  }
  if (lowered.endsWith('.xlsx')) {
    return 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
  }
  if (incomingContentType) {
    return incomingContentType
  }
  if (source === 'statssports') {
    return 'text/csv'
  }
  return 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
}

export async function preUploadPseudoanonymize(
  input: PreUploadPseudoInput
): Promise<PreUploadPseudoResult> {
  const source = asSource(input.source)
  if (!source) {
    throw new Error(`Unsupported pre-upload source: ${input.source}`)
  }

  const { bigquery } = getClients(input.gcp)
  console.info(
    `[pseudo][start] ${JSON.stringify({
      source: input.source,
      fileName: input.fileName,
      fileBytes: input.raw.length,
      teamId: input.teamId,
      refPlayerTable: input.refPlayerTable,
      refTeamTable: input.refTeamTable,
    })}`
  )

  const tnsTeamId = await resolveTnsTeamId(
    bigquery,
    input.refTeamTable,
    input.teamId,
    input.gcp.projectId
  )
  console.info(
    `[pseudo][team_resolved] ${JSON.stringify({
      inputTeamId: input.teamId,
      tnsTeamId,
    })}`
  )

  const maps = await buildPlayerMaps(
    bigquery,
    input.refPlayerTable,
    tnsTeamId,
    input.gcp.projectId
  )
  console.info(
    `[pseudo][player_maps_ready] ${JSON.stringify({
      tnsTeamId,
      tnsIds: maps.tnsIds.size,
      nameMap: maps.nameMap.size,
      whoopMap: maps.whoopMap.size,
      valdIdMap: maps.valdIdMap.size,
      statsExtMap: maps.statsExtMap.size,
      valdExtMap: maps.valdExtMap.size,
    })}`
  )

  let transformResult: TransformResult
  const lowered = input.fileName.toLowerCase()
  if (lowered.endsWith('.csv')) {
    transformResult = pseudoanonymizeCsv(input.raw, maps)
  } else if (lowered.endsWith('.xls') || lowered.endsWith('.xlsx')) {
    transformResult = pseudoanonymizeWorkbook(
      input.raw,
      input.fileName,
      source,
      maps
    )
  } else {
    throw new Error(
      `Unsupported file extension for pre-upload pseudoanonymization: ${input.fileName}`
    )
  }

  const metadata: Record<string, string> = {
    pseudoanonymized_version: input.pseudoVersion,
    pseudoanonymized_at: nowIso(),
    pseudo_source: source,
    pseudo_mode: 'preupload',
  }
  console.info(
    `[pseudo][transform_complete] ${JSON.stringify({
      source,
      fileName: input.fileName,
      rowsTotal: transformResult.stats.rowsTotal,
      rowsMapped: transformResult.stats.rowsMapped,
      rowsUnmapped: transformResult.stats.rowsUnmapped,
      unmappedSamplesTop2: transformResult.stats.unmappedSamples.slice(0, 2),
    })}`
  )

  return {
    transformed: transformResult.transformed,
    contentType:
      transformResult.contentType ||
      sourceContentType(source, input.fileName, input.contentType),
    metadata,
    stats: transformResult.stats,
    tnsTeamId,
  }
}

export async function publishPseudoUnmappedAlert(
  input: PublishPseudoAlertInput
): Promise<string | null> {
  if (!input.topicName.trim()) {
    return null
  }

  const { pubsub } = getClients(input.gcp)
  const data = Buffer.from(
    JSON.stringify(input.payload, (_key, value) => value ?? null),
    'utf-8'
  )

  const messageId = await pubsub.topic(input.topicName).publishMessage({
    data,
    attributes: {
      event_type: 'pseudoanonymization.unmapped',
      source: String(input.payload.source ?? ''),
      bucket: String(input.payload.bucket ?? ''),
    },
  })
  return messageId
}

export async function resolveTeamFolderKey(
  input: ResolveTeamFolderKeyInput
): Promise<ResolveTeamFolderKeyResult> {
  const rawTeamId = input.teamId.trim()
  if (!rawTeamId) {
    throw new Error('teamId is required')
  }

  const { bigquery } = getClients(input.gcp)
  const columns = await getTableColumns(
    bigquery,
    input.refTeamTable,
    input.gcp.projectId
  )

  if (!columns.has('tns_team_id')) {
    return {
      inputTeamId: rawTeamId,
      teamFolderKey: rawTeamId,
      tnsTeamId: UUID_RE.test(rawTeamId) ? rawTeamId : null,
      resolvedFromUuid: false,
    }
  }

  const teamKeyColumn = firstExisting(columns, [
    'team_key',
    'teamId',
    'team_id',
    'external_team_id',
    'source_team_id',
  ])

  if (!teamKeyColumn) {
    return {
      inputTeamId: rawTeamId,
      teamFolderKey: rawTeamId,
      tnsTeamId: UUID_RE.test(rawTeamId) ? rawTeamId : null,
      resolvedFromUuid: false,
    }
  }

  if (UUID_RE.test(rawTeamId)) {
    const [rows] = await bigquery.query({
      query: `
        SELECT
          CAST(\`tns_team_id\` AS STRING) AS tns_team_id,
          CAST(\`${teamKeyColumn}\` AS STRING) AS team_key
        FROM \`${input.refTeamTable}\`
        WHERE CAST(\`tns_team_id\` AS STRING) = @tns_team_id
        LIMIT 2
      `,
      params: { tns_team_id: rawTeamId },
      useLegacySql: false,
    })

    const first = (Array.isArray(rows) && rows.length > 0
      ? (rows[0] as Record<string, unknown>)
      : null) as Record<string, unknown> | null
    const resolvedKey = String(first?.team_key ?? '').trim()
    const resolvedTnsTeamId = String(first?.tns_team_id ?? rawTeamId).trim()

    if (resolvedKey) {
      return {
        inputTeamId: rawTeamId,
        teamFolderKey: resolvedKey,
        tnsTeamId: resolvedTnsTeamId || rawTeamId,
        resolvedFromUuid: true,
      }
    }

    return {
      inputTeamId: rawTeamId,
      teamFolderKey: rawTeamId,
      tnsTeamId: rawTeamId,
      resolvedFromUuid: false,
    }
  }

  const resolvedTnsTeamId = await resolveTnsTeamId(
    bigquery,
    input.refTeamTable,
    rawTeamId,
    input.gcp.projectId
  )

  return {
    inputTeamId: rawTeamId,
    teamFolderKey: rawTeamId,
    tnsTeamId: resolvedTnsTeamId,
    resolvedFromUuid: false,
  }
}
