import { NextRequest, NextResponse } from 'next/server'
import { Storage } from '@google-cloud/storage'
import {
  preUploadPseudoanonymize,
  publishPseudoUnmappedAlert,
  resolveTeamFolderKey,
  type PseudoStats,
} from '@/lib/pseudoanonymization/preUploadPseudo'

function normalizePrivateKey(raw: string | undefined): string | undefined {
  if (!raw) {
    return undefined
  }
  let value = raw.trim()
  if (
    (value.startsWith('"') && value.endsWith('"')) ||
    (value.startsWith("'") && value.endsWith("'"))
  ) {
    value = value.slice(1, -1)
  }
  return value.replace(/\\n/g, '\n')
}

const normalizedPrivateKey = normalizePrivateKey(process.env.GCP_PRIVATE_KEY)

// Initialize GCP Storage
const storage = new Storage({
  projectId: process.env.GCP_PROJECT_ID,
  credentials: {
    client_email: process.env.GCP_CLIENT_EMAIL,
    private_key: normalizedPrivateKey,
  },
})

const bucketName = process.env.GCP_BUCKET_NAME!
const pseudoUnmappedTopic =
  process.env.PSEUDO_UNMAPPED_TOPIC ||
  `projects/${process.env.GCP_PROJECT_ID}/topics/pseudoanonymization-unmapped`
const refPlayerLookup =
  process.env.REF_PLAYER_COLLECTION ||
  process.env.REF_PLAYER_TABLE ||
  'ref.ref_player'
const refTeamLookup =
  process.env.REF_TEAM_COLLECTION || process.env.REF_TEAM_TABLE || 'ref.ref_team'
const pseudoVersion = process.env.PSEUDO_VERSION || 'v1'

function logUpload(event: string, fields: Record<string, unknown>): void {
  console.info(`[upload][${event}] ${JSON.stringify(fields)}`)
}

function truncateError(error: unknown): string {
  const message =
    error instanceof Error
      ? error.message
      : typeof error === 'string'
        ? error
        : 'unknown_error'
  return message.length > 240 ? `${message.slice(0, 237)}...` : message
}

function toGenerationNumber(
  value: string | number | undefined
): number | null {
  if (value === undefined) {
    return null
  }

  const parsed = Number(value)
  return Number.isFinite(parsed) ? parsed : null
}

export async function POST(request: NextRequest) {
  try {
    // Validate environment variables
    if (
      !process.env.GCP_PROJECT_ID ||
      !process.env.GCP_CLIENT_EMAIL ||
      !normalizedPrivateKey ||
      !bucketName
    ) {
      console.error('Missing GCP configuration environment variables')
      return NextResponse.json(
        { error: 'Server configuration error. Please contact administrator.' },
        { status: 500 }
      )
    }

    const formData = await request.formData()
    const file = formData.get('file') as File
    const teamId = formData.get('teamId') as string
    const measureDate = formData.get('measureDate') as string
    const deviceName = formData.get('deviceName') as string

    if (!file) {
      return NextResponse.json({ error: 'No file provided' }, { status: 400 })
    }

    if (!teamId) {
      return NextResponse.json(
        { error: 'Team ID is required' },
        { status: 400 }
      )
    }

    if (!measureDate) {
      return NextResponse.json(
        { error: 'Measure date is required' },
        { status: 400 }
      )
    }

    // Validate date format (YYYY-MM-DD)
    const dateRegex = /^\d{4}-\d{2}-\d{2}$/
    if (!dateRegex.test(measureDate)) {
      return NextResponse.json(
        { error: 'Invalid date format. Please use YYYY-MM-DD format.' },
        { status: 400 }
      )
    }

    // Validate file type (Excel files only)
    const validTypes = [
      'application/vnd.ms-excel',
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      'text/csv',
      'application/csv',
    ]
    const isValidType =
      validTypes.includes(file.type) ||
      file.name.endsWith('.xlsx') ||
      file.name.endsWith('.xls') ||
      file.name.endsWith('.csv')

    if (!isValidType) {
      return NextResponse.json(
        {
          error:
            'Invalid file type. Only Excel files (.xlsx, .xls) are allowed.',
        },
        { status: 400 }
      )
    }

    // Validate file size (e.g., max 10MB)
    const maxSize = 10 * 1024 * 1024 // 10MB
    if (file.size > maxSize) {
      return NextResponse.json(
        { error: 'File size exceeds 10MB limit' },
        { status: 400 }
      )
    }

    // Convert file to buffer
    const bytes = await file.arrayBuffer()
    const buffer: Buffer = Buffer.from(bytes)

    // Create unique file identifier (using hash or UUID-like string)
    const timestamp = Date.now()
    const randomStr = Math.random().toString(36).substring(2, 15)
    const fileId = `${timestamp}-${randomStr}`
    const uploadTraceId = `${timestamp}-${Math.random().toString(36).slice(2, 10)}`

    // Sanitize original filename
    const sanitizedFileName = file.name.replace(/[^a-zA-Z0-9.-]/g, '_')

    const uploadedAt = new Date().toISOString()
    const normalizedDevice = deviceName.trim().toLowerCase()
    const canPrePseudo =
      normalizedDevice === 'statssports' || normalizedDevice === 'vald'
    const gcpRuntime = {
      projectId: process.env.GCP_PROJECT_ID!,
      clientEmail: process.env.GCP_CLIENT_EMAIL!,
      privateKey: normalizedPrivateKey!,
    }
    let resolvedTnsTeamId: string | null = null
    let teamResolved = false
    let resolvedFromUuid = false
    let pseudoLookupTeamId = teamId
    let teamLookupStatus: 'resolved' | 'unresolved' | 'ambiguous' = 'unresolved'
    let teamLookupMatchedBy: string | null = null
    let teamLookupNormalizedInput = ''
    let teamLookupCandidates: string[] = []
    let teamLookupCheckedAliases = 0
    let teamLookupCollection = refTeamLookup

    try {
      const teamResolution = await resolveTeamFolderKey({
        teamId,
        traceId: uploadTraceId,
        gcp: gcpRuntime,
        refTeamTable: refTeamLookup,
      })

      resolvedTnsTeamId = teamResolution.tnsTeamId || null
      teamResolved = Boolean(teamResolution.resolved)
      resolvedFromUuid = Boolean(teamResolution.resolvedFromUuid)
      pseudoLookupTeamId = resolvedTnsTeamId || teamId
      teamLookupStatus = teamResolution.status
      teamLookupMatchedBy = teamResolution.matchedBy
      teamLookupNormalizedInput = teamResolution.normalizedInput
      teamLookupCandidates = teamResolution.candidateTnsTeamIds
      teamLookupCheckedAliases = teamResolution.checkedAliases
      teamLookupCollection = teamResolution.teamCollection

      logUpload('team_resolution_completed', {
        traceId: uploadTraceId,
        inputTeamId: teamId,
        tnsTeamId: resolvedTnsTeamId,
        resolved: teamResolved,
        resolvedFromUuid,
        status: teamLookupStatus,
        matchedBy: teamLookupMatchedBy,
        normalizedInput: teamLookupNormalizedInput,
        candidateTnsTeamIds: teamLookupCandidates,
        checkedAliases: teamLookupCheckedAliases,
        teamCollection: teamLookupCollection,
        pathTeamId: resolvedTnsTeamId || teamId,
      })
    } catch (teamResolutionError) {
      resolvedTnsTeamId = null
      teamResolved = false
      resolvedFromUuid = false
      pseudoLookupTeamId = teamId
      teamLookupStatus = 'unresolved'
      logUpload('team_resolution_error', {
        traceId: uploadTraceId,
        inputTeamId: teamId,
        tnsTeamId: null,
        resolved: false,
        resolvedFromUuid: false,
        pathTeamId: teamId,
        reason: truncateError(teamResolutionError),
      })
    }

    const pathTeamId = resolvedTnsTeamId || teamId
    // Create partitioned folder structure: source=<device>/measure_date=<date>/team_id=<tns_team_id|input>/file=<filename>
    const fileName = `source=${deviceName}/measure_date=${measureDate}/team_id=${pathTeamId}/file=${fileId}-${sanitizedFileName}`

    let uploadBuffer: Buffer = buffer
    let uploadContentType = file.type || 'application/octet-stream'
    let pseudoMetadata: Record<string, string> = {}
    let pseudoStats: PseudoStats | null = null
    let tnsTeamId: string | null = resolvedTnsTeamId
    let technicalFallbackError: string | null = null

    logUpload('request_received', {
      traceId: uploadTraceId,
      deviceName: normalizedDevice,
      originalFileName: file.name,
      fileSizeBytes: file.size,
      fileMimeType: file.type || 'application/octet-stream',
      inputTeamId: teamId,
      tnsTeamId: resolvedTnsTeamId,
      resolved: teamResolved,
      resolvedFromUuid,
      pathTeamId,
      pseudoLookupTeamId,
      teamLookupStatus,
      teamLookupMatchedBy,
      teamLookupCandidates,
      measureDate,
      storagePath: fileName,
      canPrePseudo,
    })

    if (canPrePseudo) {
      try {
        const pseudoStart = Date.now()
        const pseudoResult = await preUploadPseudoanonymize({
          source: normalizedDevice,
          fileName: file.name,
          contentType: file.type,
          raw: buffer,
          teamId: pseudoLookupTeamId,
          traceId: uploadTraceId,
          gcp: gcpRuntime,
          refPlayerTable: refPlayerLookup,
          refTeamTable: refTeamLookup,
          pseudoVersion,
        })

        uploadBuffer = pseudoResult.transformed
        uploadContentType = pseudoResult.contentType || uploadContentType
        pseudoMetadata = pseudoResult.metadata
        pseudoStats = pseudoResult.stats
        tnsTeamId = pseudoResult.tnsTeamId

        logUpload('preupload_pseudo_success', {
          traceId: uploadTraceId,
          source: normalizedDevice,
          storagePath: fileName,
          tnsTeamId,
          durationMs: Date.now() - pseudoStart,
          rowsTotal: pseudoResult.stats.rowsTotal,
          rowsMapped: pseudoResult.stats.rowsMapped,
          rowsUnmapped: pseudoResult.stats.rowsUnmapped,
          teamColumnDetected: pseudoResult.stats.teamColumnDetected,
          teamCellsUpdated: pseudoResult.stats.teamCellsUpdated,
          unmappedSamplesTop2: (pseudoResult.stats.unmappedSamples || []).slice(
            0,
            2
          ),
          metadata: pseudoMetadata,
        })
      } catch (error) {
        technicalFallbackError = truncateError(error)
        logUpload('preupload_pseudo_fallback', {
          traceId: uploadTraceId,
          source: normalizedDevice,
          storagePath: fileName,
          reason: technicalFallbackError,
        })
        console.error(
          'Pre-upload pseudoanonymization failed; continuing with original file',
          error
        )
      }
    } else {
      logUpload('preupload_pseudo_skipped', {
        traceId: uploadTraceId,
        source: normalizedDevice,
        storagePath: fileName,
      })
    }

    // Upload to GCP Storage
    const bucket = storage.bucket(bucketName)
    const blob = bucket.file(fileName)

    await blob.save(uploadBuffer, {
      metadata: {
        contentType: uploadContentType,
        metadata: {
          originalName: file.name,
          uploadedAt,
          ...pseudoMetadata,
        },
      },
    })

    const [blobMeta] = await blob.getMetadata()
    const savedGeneration = toGenerationNumber(blobMeta.generation)

    logUpload('gcs_upload_complete', {
      traceId: uploadTraceId,
      bucket: bucketName,
      storagePath: fileName,
      generation: savedGeneration,
      contentType: uploadContentType,
      uploadedBytes: uploadBuffer.length,
      hasPseudoMarker: Boolean(pseudoMetadata.pseudoanonymized_version),
    })

    if (!resolvedTnsTeamId) {
      const unresolvedReason =
        teamLookupStatus === 'ambiguous'
          ? 'team_lookup_ambiguous'
          : 'team_lookup_unresolved'
      const unresolvedTeamAlertPayload = {
        eventType: 'pseudoanonymization.unmapped',
        source: normalizedDevice,
        bucket: bucketName,
        name: fileName,
        generation: savedGeneration,
        traceId: uploadTraceId,
        teamId,
        tnsTeamId: null,
        teamLookupStatus,
        teamLookupMatchedBy,
        teamLookupCandidates,
        teamLookupCheckedAliases,
        teamLookupCollection,
        normalizedTeamInput: teamLookupNormalizedInput,
        rowsTotal: Number(pseudoStats?.rowsTotal || 0),
        rowsMapped: Number(pseudoStats?.rowsMapped || 0),
        rowsUnmapped: Number(pseudoStats?.rowsUnmapped || 0),
        teamColumnDetected: Boolean(pseudoStats?.teamColumnDetected || false),
        teamCellsUpdated: Number(pseudoStats?.teamCellsUpdated || 0),
        technicalFallback: false,
        unmappedSamples: [
          {
            rowNumber: 0,
            reason: unresolvedReason,
            identifiers: {
              source: normalizedDevice,
              inputTeamId: teamId,
              normalizedInput: teamLookupNormalizedInput,
            },
            rowPreview: {
              inputTeamId: teamId,
              fallbackPathTeamId: pathTeamId,
              candidateTnsTeamIds: teamLookupCandidates.join(','),
            },
          },
        ],
        completedAt: new Date().toISOString(),
      }

      logUpload('notifier_publish_attempt', {
        traceId: uploadTraceId,
        reason: unresolvedReason,
        topic: pseudoUnmappedTopic,
        source: normalizedDevice,
        storagePath: fileName,
        payloadPreview: {
          eventType: unresolvedTeamAlertPayload.eventType,
          generation: unresolvedTeamAlertPayload.generation,
          fallbackPathTeamId: pathTeamId,
        },
      })

      try {
        const messageId = await publishPseudoUnmappedAlert({
          gcp: gcpRuntime,
          topicName: pseudoUnmappedTopic,
          payload: unresolvedTeamAlertPayload,
        })
        logUpload('notifier_publish_success', {
          traceId: uploadTraceId,
          reason: unresolvedReason,
          topic: pseudoUnmappedTopic,
          messageId,
          storagePath: fileName,
        })
      } catch (alertError) {
        logUpload('notifier_publish_failed', {
          traceId: uploadTraceId,
          reason: unresolvedReason,
          topic: pseudoUnmappedTopic,
          storagePath: fileName,
          error: truncateError(alertError),
        })
        console.error('Failed to publish unresolved team alert', alertError)
      }
    }

    if (canPrePseudo && technicalFallbackError) {
      const fallbackAlertPayload = {
        eventType: 'pseudoanonymization.unmapped',
        source: normalizedDevice,
        bucket: bucketName,
        name: fileName,
        generation: savedGeneration,
        teamId,
        tnsTeamId,
        rowsTotal: 0,
        rowsMapped: 0,
        rowsUnmapped: 1,
        technicalFallback: true,
        unmappedSamples: [
          {
            rowNumber: 0,
            reason: 'technical_fallback',
            identifiers: {
              source: normalizedDevice,
              teamId,
            },
            rowPreview: {
              error: technicalFallbackError,
            },
          },
        ],
        completedAt: new Date().toISOString(),
      }

      logUpload('notifier_publish_attempt', {
        traceId: uploadTraceId,
        reason: 'technical_fallback',
        topic: pseudoUnmappedTopic,
        source: normalizedDevice,
        storagePath: fileName,
        rowsUnmapped: 1,
        payloadPreview: {
          eventType: fallbackAlertPayload.eventType,
          generation: fallbackAlertPayload.generation,
          technicalFallback: true,
          sampleCount: fallbackAlertPayload.unmappedSamples.length,
        },
      })

      try {
        const messageId = await publishPseudoUnmappedAlert({
          gcp: gcpRuntime,
          topicName: pseudoUnmappedTopic,
          payload: fallbackAlertPayload,
        })
        logUpload('notifier_publish_success', {
          traceId: uploadTraceId,
          reason: 'technical_fallback',
          topic: pseudoUnmappedTopic,
          messageId,
          storagePath: fileName,
        })
      } catch (alertError) {
        logUpload('notifier_publish_failed', {
          traceId: uploadTraceId,
          reason: 'technical_fallback',
          topic: pseudoUnmappedTopic,
          storagePath: fileName,
          error: truncateError(alertError),
        })
        console.error('Failed to publish technical fallback alert', alertError)
      }
    }

    if (
      canPrePseudo &&
      pseudoStats &&
      Number(pseudoStats.rowsUnmapped || 0) > 0
    ) {
      const unmappedAlertPayload = {
        eventType: 'pseudoanonymization.unmapped',
        source: normalizedDevice,
        bucket: bucketName,
        name: fileName,
        generation: savedGeneration,
        teamId,
        tnsTeamId,
        rowsTotal: Number(pseudoStats.rowsTotal || 0),
        rowsMapped: Number(pseudoStats.rowsMapped || 0),
        rowsUnmapped: Number(pseudoStats.rowsUnmapped || 0),
        teamColumnDetected: Boolean(pseudoStats.teamColumnDetected || false),
        teamCellsUpdated: Number(pseudoStats.teamCellsUpdated || 0),
        unmappedSamples: (pseudoStats.unmappedSamples || []).slice(0, 5),
        completedAt: new Date().toISOString(),
      }

      logUpload('notifier_publish_attempt', {
        traceId: uploadTraceId,
        reason: 'rows_unmapped',
        topic: pseudoUnmappedTopic,
        source: normalizedDevice,
        storagePath: fileName,
        rowsUnmapped: unmappedAlertPayload.rowsUnmapped,
        payloadPreview: {
          eventType: unmappedAlertPayload.eventType,
          generation: unmappedAlertPayload.generation,
          sampleCount: unmappedAlertPayload.unmappedSamples.length,
          topRowNumbers: unmappedAlertPayload.unmappedSamples.map(
            (sample) => sample.rowNumber
          ),
        },
      })

      try {
        const messageId = await publishPseudoUnmappedAlert({
          gcp: gcpRuntime,
          topicName: pseudoUnmappedTopic,
          payload: unmappedAlertPayload,
        })
        logUpload('notifier_publish_success', {
          traceId: uploadTraceId,
          reason: 'rows_unmapped',
          topic: pseudoUnmappedTopic,
          messageId,
          storagePath: fileName,
          rowsUnmapped: unmappedAlertPayload.rowsUnmapped,
        })
      } catch (alertError) {
        logUpload('notifier_publish_failed', {
          traceId: uploadTraceId,
          reason: 'rows_unmapped',
          topic: pseudoUnmappedTopic,
          storagePath: fileName,
          error: truncateError(alertError),
        })
        console.error('Failed to publish pseudo unmapped alert', alertError)
      }
    }

    // Optional: Make file public
    // Uncomment the following lines if you want files to be publicly accessible
    // await blob.makePublic()
    // const publicUrl = `https://storage.googleapis.com/${bucketName}/${fileName}`

    // Get signed URL (valid for 1 hour) - more secure than public URL
    const [signedUrl] = await blob.getSignedUrl({
      version: 'v4',
      action: 'read',
      expires: Date.now() + 60 * 60 * 1000, // 1 hour
    })

    console.log(`File uploaded successfully: ${fileName}`)
    logUpload('request_completed', {
      traceId: uploadTraceId,
      storagePath: fileName,
      responseFileName: file.name,
      rowsMapped: pseudoStats?.rowsMapped ?? null,
      rowsUnmapped: pseudoStats?.rowsUnmapped ?? null,
      teamColumnDetected: pseudoStats?.teamColumnDetected ?? null,
      teamCellsUpdated: pseudoStats?.teamCellsUpdated ?? null,
      technicalFallback: Boolean(technicalFallbackError),
    })

    return NextResponse.json({
      success: true,
      fileName: file.name,
      storagePath: fileName,
      url: signedUrl,
      size: file.size,
      uploadedAt,
    })
  } catch (error) {
    console.error('Upload error:', error)

    // Provide more specific error messages
    if (error instanceof Error) {
      return NextResponse.json(
        { error: `Upload failed: ${error.message}` },
        { status: 500 }
      )
    }

    return NextResponse.json(
      { error: 'Upload failed. Please try again.' },
      { status: 500 }
    )
  }
}
