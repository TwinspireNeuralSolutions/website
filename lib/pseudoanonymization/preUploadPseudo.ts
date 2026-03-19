import { Firestore } from '@google-cloud/firestore'
import { PubSub } from '@google-cloud/pubsub'
import * as XLSX from 'xlsx'

const UUID_RE =
  /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i
const SUPPORTED_SOURCES = new Set(['statssports', 'vald'])
const MAX_UNMAPPED_SAMPLES = 5

type SourceDevice = 'statssports' | 'vald'
type TeamLookupStatus = 'resolved' | 'unresolved' | 'ambiguous'

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
  teamColumnDetected: boolean
  teamCellsUpdated: number
  unmappedSamples: UnmappedSample[]
}

export interface PreUploadPseudoInput {
  source: string
  fileName: string
  contentType?: string
  raw: Buffer
  teamId: string
  traceId?: string
  gcp: GcpRuntimeConfig
  refPlayerTable?: string
  refTeamTable?: string
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
  traceId?: string
  gcp: GcpRuntimeConfig
  refTeamTable?: string
}

export interface ResolveTeamFolderKeyResult {
  inputTeamId: string
  tnsTeamId: string | null
  resolvedFromUuid: boolean
  resolved: boolean
  status: TeamLookupStatus
  matchedBy: string | null
  normalizedInput: string
  candidateTnsTeamIds: string[]
  checkedAliases: number
  teamCollection: string
  firestoreDatabase: string
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

interface FirestoreClients {
  pubsub: PubSub
  firestore: Firestore
}

interface TeamAliasDoc {
  docId: string
  tnsTeamId: string
  teamKey: string | null
  teamDisplayName: string | null
  appProfileId: string | null
}

const clientsCache = new Map<string, FirestoreClients>()
console.info(
  `[pseudo][startup] ${JSON.stringify({
    backend: 'firestore',
    bigqueryFallbackDisabled: true,
  })}`
)

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

function asNonEmptyString(value: unknown): string | null {
  const text = String(value ?? '').trim()
  return text || null
}

function firstStringField(
  row: Record<string, unknown>,
  candidates: string[]
): string | null {
  for (const candidate of candidates) {
    const value = asNonEmptyString(row[candidate])
    if (value) {
      return value
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

function normalizeTeamAlias(value: unknown): string {
  return normalizeText(value).replace(/[^a-z0-9]+/g, '')
}

function normalizeCollectionRef(value: string | undefined, fallback: string): string {
  const raw = String(value ?? '').trim()
  if (!raw) {
    return fallback
  }
  const parts = raw.split('.').filter(Boolean)
  if (parts.length >= 2) {
    return `${parts[parts.length - 2]}.${parts[parts.length - 1]}`
  }
  return raw
}

function resolveFirestoreDbFromEnv(): string {
  return (
    process.env.PSEUDO_FIRESTORE_DB?.trim() ||
    process.env.FIRESTORE_DATABASE?.trim() ||
    process.env.NEXT_PUBLIC_FIREBASE_DB_NAME?.trim() ||
    'twinspire'
  )
}

function resolveRefCollections(
  input: Pick<PreUploadPseudoInput, 'refPlayerTable' | 'refTeamTable'>
): { playerCollection: string; teamCollection: string } {
  return {
    playerCollection: normalizeCollectionRef(
      input.refPlayerTable ||
        process.env.REF_PLAYER_COLLECTION ||
        process.env.REF_PLAYER_TABLE,
      'ref.ref_player'
    ),
    teamCollection: normalizeCollectionRef(
      input.refTeamTable ||
        process.env.REF_TEAM_COLLECTION ||
        process.env.REF_TEAM_TABLE,
      'ref.ref_team'
    ),
  }
}

function logPseudo(event: string, fields: Record<string, unknown>): void {
  console.info(
    `[pseudo][${event}] ${JSON.stringify({
      backend: 'firestore',
      ...fields,
    })}`
  )
}

function getClients(gcp: GcpRuntimeConfig): FirestoreClients {
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
    pubsub: new PubSub({
      projectId: gcp.projectId,
      credentials,
    }),
    firestore: new Firestore({
      projectId: gcp.projectId,
      credentials,
      databaseId: resolveFirestoreDbFromEnv(),
    }),
  }

  clientsCache.set(cacheKey, clients)
  return clients
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

async function buildPlayerMapsFromFirestore(
  firestore: Firestore,
  refPlayerCollection: string,
  tnsTeamId: string | null
): Promise<PlayerMaps> {
  if (!tnsTeamId) {
    return emptyPlayerMaps()
  }

  const maps = emptyPlayerMaps()
  const snapshot = await firestore
    .collection(refPlayerCollection)
    .where('tns_team_id', '==', tnsTeamId)
    .get()

  for (const doc of snapshot.docs) {
    const row = doc.data() as Record<string, unknown>
    const tnsPlayerId =
      firstStringField(row, ['tns_player_id']) ||
      (UUID_RE.test(doc.id) ? doc.id : null)
    if (!tnsPlayerId) {
      continue
    }
    maps.tnsIds.add(tnsPlayerId)

    const displayName = normalizeText(
      firstStringField(row, ['player_display_name', 'player_name', 'name']) || ''
    )
    const whoopId = firstStringField(row, ['whoop_player_id']) || ''
    const valdId = firstStringField(row, ['vald_player_id']) || ''
    const statsExtId =
      firstStringField(row, [
        'statssports_playerExtId',
        'statssports_player_ext_id',
      ]) || ''
    const valdExtId =
      firstStringField(row, ['vald_playerExtId', 'vald_player_ext_id']) || ''

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

function normalizeTeamDoc(
  docId: string,
  row: Record<string, unknown>
): TeamAliasDoc | null {
  const tnsTeamId = firstStringField(row, ['tns_team_id'])
  if (!tnsTeamId) {
    return null
  }
  return {
    docId,
    tnsTeamId,
    teamKey: firstStringField(row, ['team_key', 'teamId', 'team_id']),
    teamDisplayName: firstStringField(row, ['team_display_name']),
    appProfileId: firstStringField(row, ['app_profile_id']),
  }
}

function collectUniqueTeamIds(values: string[]): string[] {
  return [...new Set(values.filter(Boolean))]
}

async function resolveTeamLookup(
  clients: FirestoreClients,
  teamCollection: string,
  inputTeamId: string,
  traceId: string | undefined
): Promise<ResolveTeamFolderKeyResult> {
  const raw = inputTeamId.trim()
  if (!raw) {
    throw new Error('teamId is required')
  }

  const normalizedInput = normalizeTeamAlias(raw)
  const firestoreDatabase = resolveFirestoreDbFromEnv()
  const lookupStart = Date.now()
  logPseudo('team_lookup_start', {
    traceId,
    teamCollection,
    firestoreDatabase,
    inputTeamId: raw,
    normalizedInput,
  })

  const snapshot = await clients.firestore.collection(teamCollection).get()
  const teamDocs: TeamAliasDoc[] = []
  for (const doc of snapshot.docs) {
    if (doc.id === '_bootstrap') {
      continue
    }
    const normalized = normalizeTeamDoc(
      doc.id,
      doc.data() as Record<string, unknown>
    )
    if (normalized) {
      teamDocs.push(normalized)
    }
  }

  const checkedAliases = teamDocs.length * 5

  const docOrTnsMatches = collectUniqueTeamIds(
    teamDocs
      .filter((doc) => doc.docId === raw || doc.tnsTeamId === raw)
      .map((doc) => doc.tnsTeamId)
  )
  if (docOrTnsMatches.length === 1) {
    const result: ResolveTeamFolderKeyResult = {
      inputTeamId: raw,
      tnsTeamId: docOrTnsMatches[0],
      resolvedFromUuid: UUID_RE.test(raw),
      resolved: true,
      status: 'resolved',
      matchedBy: 'doc_id_or_tns_team_id_exact',
      normalizedInput,
      candidateTnsTeamIds: docOrTnsMatches,
      checkedAliases,
      teamCollection,
      firestoreDatabase,
    }
    logPseudo('team_lookup_result', {
      traceId,
      status: result.status,
      matchedBy: result.matchedBy,
      tnsTeamId: result.tnsTeamId,
      checkedAliases: result.checkedAliases,
      durationMs: Date.now() - lookupStart,
    })
    return result
  }
  if (docOrTnsMatches.length > 1) {
    const result: ResolveTeamFolderKeyResult = {
      inputTeamId: raw,
      tnsTeamId: null,
      resolvedFromUuid: false,
      resolved: false,
      status: 'ambiguous',
      matchedBy: 'doc_id_or_tns_team_id_exact',
      normalizedInput,
      candidateTnsTeamIds: docOrTnsMatches,
      checkedAliases,
      teamCollection,
      firestoreDatabase,
    }
    logPseudo('team_lookup_result', {
      traceId,
      status: result.status,
      matchedBy: result.matchedBy,
      candidateTnsTeamIds: result.candidateTnsTeamIds,
      checkedAliases: result.checkedAliases,
      durationMs: Date.now() - lookupStart,
    })
    return result
  }

  const keyOrProfileMatches = collectUniqueTeamIds(
    teamDocs
      .filter((doc) => doc.teamKey === raw || doc.appProfileId === raw)
      .map((doc) => doc.tnsTeamId)
  )
  if (keyOrProfileMatches.length === 1) {
    const result: ResolveTeamFolderKeyResult = {
      inputTeamId: raw,
      tnsTeamId: keyOrProfileMatches[0],
      resolvedFromUuid: false,
      resolved: true,
      status: 'resolved',
      matchedBy: 'team_key_or_app_profile_id_exact',
      normalizedInput,
      candidateTnsTeamIds: keyOrProfileMatches,
      checkedAliases,
      teamCollection,
      firestoreDatabase,
    }
    logPseudo('team_lookup_result', {
      traceId,
      status: result.status,
      matchedBy: result.matchedBy,
      tnsTeamId: result.tnsTeamId,
      checkedAliases: result.checkedAliases,
      durationMs: Date.now() - lookupStart,
    })
    return result
  }
  if (keyOrProfileMatches.length > 1) {
    const result: ResolveTeamFolderKeyResult = {
      inputTeamId: raw,
      tnsTeamId: null,
      resolvedFromUuid: false,
      resolved: false,
      status: 'ambiguous',
      matchedBy: 'team_key_or_app_profile_id_exact',
      normalizedInput,
      candidateTnsTeamIds: keyOrProfileMatches,
      checkedAliases,
      teamCollection,
      firestoreDatabase,
    }
    logPseudo('team_lookup_result', {
      traceId,
      status: result.status,
      matchedBy: result.matchedBy,
      candidateTnsTeamIds: result.candidateTnsTeamIds,
      checkedAliases: result.checkedAliases,
      durationMs: Date.now() - lookupStart,
    })
    return result
  }

  const normalizedMatches = collectUniqueTeamIds(
    teamDocs
      .filter((doc) =>
        [doc.docId, doc.tnsTeamId, doc.teamKey, doc.teamDisplayName, doc.appProfileId]
          .filter(Boolean)
          .map((value) => normalizeTeamAlias(value))
          .includes(normalizedInput)
      )
      .map((doc) => doc.tnsTeamId)
  )
  if (normalizedMatches.length === 1) {
    const result: ResolveTeamFolderKeyResult = {
      inputTeamId: raw,
      tnsTeamId: normalizedMatches[0],
      resolvedFromUuid: false,
      resolved: true,
      status: 'resolved',
      matchedBy: 'normalized_alias_exact',
      normalizedInput,
      candidateTnsTeamIds: normalizedMatches,
      checkedAliases,
      teamCollection,
      firestoreDatabase,
    }
    logPseudo('team_lookup_result', {
      traceId,
      status: result.status,
      matchedBy: result.matchedBy,
      tnsTeamId: result.tnsTeamId,
      checkedAliases: result.checkedAliases,
      durationMs: Date.now() - lookupStart,
    })
    return result
  }
  if (normalizedMatches.length > 1) {
    const result: ResolveTeamFolderKeyResult = {
      inputTeamId: raw,
      tnsTeamId: null,
      resolvedFromUuid: false,
      resolved: false,
      status: 'ambiguous',
      matchedBy: 'normalized_alias_exact',
      normalizedInput,
      candidateTnsTeamIds: normalizedMatches,
      checkedAliases,
      teamCollection,
      firestoreDatabase,
    }
    logPseudo('team_lookup_result', {
      traceId,
      status: result.status,
      matchedBy: result.matchedBy,
      candidateTnsTeamIds: result.candidateTnsTeamIds,
      checkedAliases: result.checkedAliases,
      durationMs: Date.now() - lookupStart,
    })
    return result
  }

  const unresolved: ResolveTeamFolderKeyResult = {
    inputTeamId: raw,
    tnsTeamId: null,
    resolvedFromUuid: false,
    resolved: false,
    status: 'unresolved',
    matchedBy: null,
    normalizedInput,
    candidateTnsTeamIds: [],
    checkedAliases,
    teamCollection,
    firestoreDatabase,
  }
  logPseudo('team_lookup_result', {
    traceId,
    status: unresolved.status,
    checkedAliases: unresolved.checkedAliases,
    durationMs: Date.now() - lookupStart,
  })
  return unresolved
}

async function buildPlayerMaps(
  clients: FirestoreClients,
  refPlayerCollection: string,
  tnsTeamId: string | null,
  traceId: string | undefined
): Promise<PlayerMaps> {
  const lookupStart = Date.now()
  const maps = await buildPlayerMapsFromFirestore(
    clients.firestore,
    refPlayerCollection,
    tnsTeamId
  )
  logPseudo('player_map_load_result', {
    traceId,
    tnsTeamId,
    refPlayerCollection,
    tnsIds: maps.tnsIds.size,
    nameMap: maps.nameMap.size,
    whoopMap: maps.whoopMap.size,
    valdIdMap: maps.valdIdMap.size,
    statsExtMap: maps.statsExtMap.size,
    valdExtMap: maps.valdExtMap.size,
    durationMs: Date.now() - lookupStart,
  })
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

function ensureRowWidth(row: string[], index: number): void {
  while (row.length <= index) {
    row.push('')
  }
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

function extractTeamColumnIndex(normalizedHeaders: string[]): number | null {
  return firstIndex(normalizedHeaders, [
    'teamid',
    'externalteamid',
    'sourceteamid',
  ])
}

function pseudoanonymizeCsv(
  raw: Buffer,
  source: SourceDevice,
  maps: PlayerMaps,
  tnsTeamId: string | null
): TransformResult {
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
        teamColumnDetected: false,
        teamCellsUpdated: 0,
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
  const teamIndex =
    source === 'statssports' ? extractTeamColumnIndex(normalizedHeaders) : null
  const teamColumnDetected = teamIndex !== null

  let rowsTotal = 0
  let rowsMapped = 0
  let rowsUnmapped = 0
  let teamCellsUpdated = 0
  const unmappedSamples: UnmappedSample[] = []

  for (let rowIdx = 1; rowIdx < rows.length; rowIdx += 1) {
    const row = rows[rowIdx]
    if (!row.some((value) => String(value ?? '').trim())) {
      continue
    }

    if (teamIndex !== null && tnsTeamId) {
      ensureRowWidth(row, teamIndex)
      const existingTeam = String(row[teamIndex] ?? '').trim()
      if (existingTeam !== tnsTeamId) {
        row[teamIndex] = tnsTeamId
        teamCellsUpdated += 1
      }
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
      teamColumnDetected,
      teamCellsUpdated,
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
  maps: PlayerMaps,
  tnsTeamId: string | null
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
        teamColumnDetected: false,
        teamCellsUpdated: 0,
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
        teamColumnDetected: false,
        teamCellsUpdated: 0,
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
  const teamIndex =
    source === 'statssports' ? extractTeamColumnIndex(normalizedHeaders) : null
  const teamColumnDetected = teamIndex !== null

  let rowsTotal = 0
  let rowsMapped = 0
  let rowsUnmapped = 0
  let teamCellsUpdated = 0
  const unmappedSamples: UnmappedSample[] = []

  for (let rowIdx = headerRowIndex + 1; rowIdx < matrix.length; rowIdx += 1) {
    const row = (matrix[rowIdx] ?? []).map((value) => String(value ?? ''))
    if (!row.some((value) => String(value ?? '').trim())) {
      continue
    }

    if (teamIndex !== null && tnsTeamId) {
      const existingTeam = String(row[teamIndex] ?? '').trim()
      if (existingTeam !== tnsTeamId) {
        setSheetCellValue(sheet, rowIdx, teamIndex, tnsTeamId)
        teamCellsUpdated += 1
      }
    }

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
      teamColumnDetected,
      teamCellsUpdated,
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

  const traceId = input.traceId || `pseudo-${Date.now()}`
  const firestoreDatabase = resolveFirestoreDbFromEnv()
  const refs = resolveRefCollections(input)
  const clients = getClients(input.gcp)
  logPseudo('lookup_config_resolved', {
    traceId,
    firestoreDatabase,
    playerCollection: refs.playerCollection,
    teamCollection: refs.teamCollection,
    bigqueryFallbackDisabled: true,
  })
  logPseudo('start', {
    traceId,
    source: input.source,
    fileName: input.fileName,
    fileBytes: input.raw.length,
    teamId: input.teamId,
  })

  let teamLookup: ResolveTeamFolderKeyResult
  try {
    teamLookup = await resolveTeamLookup(
      clients,
      refs.teamCollection,
      input.teamId,
      traceId
    )
  } catch (error) {
    logPseudo('lookup_error', {
      traceId,
      stage: 'team_lookup',
      source,
      fileName: input.fileName,
      teamId: input.teamId,
      error: error instanceof Error ? error.message : String(error),
    })
    throw error
  }

  const tnsTeamId = teamLookup.tnsTeamId
  let maps: PlayerMaps
  try {
    maps = await buildPlayerMaps(
      clients,
      refs.playerCollection,
      tnsTeamId,
      traceId
    )
  } catch (error) {
    logPseudo('lookup_error', {
      traceId,
      stage: 'player_map_load',
      source: input.source,
      fileName: input.fileName,
      teamId: input.teamId,
      tnsTeamId,
      error: error instanceof Error ? error.message : String(error),
    })
    throw error
  }

  let transformResult: TransformResult
  const lowered = input.fileName.toLowerCase()
  if (lowered.endsWith('.csv')) {
    transformResult = pseudoanonymizeCsv(input.raw, source, maps, tnsTeamId)
  } else if (lowered.endsWith('.xls') || lowered.endsWith('.xlsx')) {
    transformResult = pseudoanonymizeWorkbook(
      input.raw,
      input.fileName,
      source,
      maps,
      tnsTeamId
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
  logPseudo('transform_summary', {
    traceId,
    source,
    fileName: input.fileName,
    tnsTeamId,
    rowsTotal: transformResult.stats.rowsTotal,
    rowsMapped: transformResult.stats.rowsMapped,
    rowsUnmapped: transformResult.stats.rowsUnmapped,
    teamColumnDetected: transformResult.stats.teamColumnDetected,
    teamCellsUpdated: transformResult.stats.teamCellsUpdated,
    unmappedSamplesTop2: transformResult.stats.unmappedSamples.slice(0, 2),
  })

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
  const traceId = input.traceId || `team-${Date.now()}`
  const refs = resolveRefCollections({
    refPlayerTable: undefined,
    refTeamTable: input.refTeamTable,
  })
  const clients = getClients(input.gcp)

  logPseudo('lookup_config_resolved', {
    traceId,
    firestoreDatabase: resolveFirestoreDbFromEnv(),
    playerCollection: refs.playerCollection,
    teamCollection: refs.teamCollection,
    bigqueryFallbackDisabled: true,
  })

  try {
    return await resolveTeamLookup(
      clients,
      refs.teamCollection,
      input.teamId,
      traceId
    )
  } catch (error) {
    logPseudo('lookup_error', {
      traceId,
      stage: 'team_lookup',
      inputTeamId: input.teamId,
      teamCollection: refs.teamCollection,
      error: error instanceof Error ? error.message : String(error),
    })
    throw error
  }
}
