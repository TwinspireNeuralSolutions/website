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
const refPlayerTable =
  process.env.REF_PLAYER_TABLE || 'twinspire-neural-solutions.ref.ref_player'
const refTeamTable =
  process.env.REF_TEAM_TABLE || 'twinspire-neural-solutions.ref.ref_team'
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
    let teamFolderKey = teamId
    let pseudoLookupTeamId = teamId

    try {
      const teamResolution = await resolveTeamFolderKey({
        teamId,
        gcp: gcpRuntime,
        refTeamTable,
      })

      teamFolderKey = teamResolution.teamFolderKey || teamId
      pseudoLookupTeamId = teamResolution.tnsTeamId || teamId

      logUpload('team_folder_resolved', {
        inputTeamId: teamId,
        teamFolderKey,
        tnsTeamId: teamResolution.tnsTeamId,
        resolvedFromUuid: teamResolution.resolvedFromUuid,
      })
    } catch (teamResolutionError) {
      teamFolderKey = teamId
      pseudoLookupTeamId = teamId
      logUpload('team_folder_resolution_fallback', {
        inputTeamId: teamId,
        reason: truncateError(teamResolutionError),
      })
    }

    // Create partitioned folder structure: source=excel/team_id={teamKey}/measure_date={date}/file={filename}
    const fileName = `source=${deviceName}/measure_date=${measureDate}/team_id=${teamFolderKey}/file=${fileId}-${sanitizedFileName}`

    let uploadBuffer: Buffer = buffer
    let uploadContentType = file.type || 'application/octet-stream'
    let pseudoMetadata: Record<string, string> = {}
    let pseudoStats: PseudoStats | null = null
    let tnsTeamId: string | null = null
    let technicalFallbackError: string | null = null

    logUpload('request_received', {
      deviceName: normalizedDevice,
      originalFileName: file.name,
      fileSizeBytes: file.size,
      fileMimeType: file.type || 'application/octet-stream',
      teamId,
      teamFolderKey,
      pseudoLookupTeamId,
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
          gcp: gcpRuntime,
          refPlayerTable,
          refTeamTable,
          pseudoVersion,
        })

        uploadBuffer = pseudoResult.transformed
        uploadContentType = pseudoResult.contentType || uploadContentType
        pseudoMetadata = pseudoResult.metadata
        pseudoStats = pseudoResult.stats
        tnsTeamId = pseudoResult.tnsTeamId

        logUpload('preupload_pseudo_success', {
          source: normalizedDevice,
          storagePath: fileName,
          tnsTeamId,
          durationMs: Date.now() - pseudoStart,
          rowsTotal: pseudoResult.stats.rowsTotal,
          rowsMapped: pseudoResult.stats.rowsMapped,
          rowsUnmapped: pseudoResult.stats.rowsUnmapped,
          unmappedSamplesTop2: (pseudoResult.stats.unmappedSamples || []).slice(
            0,
            2
          ),
          metadata: pseudoMetadata,
        })
      } catch (error) {
        technicalFallbackError = truncateError(error)
        logUpload('preupload_pseudo_fallback', {
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
      bucket: bucketName,
      storagePath: fileName,
      generation: savedGeneration,
      contentType: uploadContentType,
      uploadedBytes: uploadBuffer.length,
      hasPseudoMarker: Boolean(pseudoMetadata.pseudoanonymized_version),
    })

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
          reason: 'technical_fallback',
          topic: pseudoUnmappedTopic,
          messageId,
          storagePath: fileName,
        })
      } catch (alertError) {
        logUpload('notifier_publish_failed', {
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
        unmappedSamples: (pseudoStats.unmappedSamples || []).slice(0, 5),
        completedAt: new Date().toISOString(),
      }

      logUpload('notifier_publish_attempt', {
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
          reason: 'rows_unmapped',
          topic: pseudoUnmappedTopic,
          messageId,
          storagePath: fileName,
          rowsUnmapped: unmappedAlertPayload.rowsUnmapped,
        })
      } catch (alertError) {
        logUpload('notifier_publish_failed', {
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
      storagePath: fileName,
      responseFileName: file.name,
      rowsMapped: pseudoStats?.rowsMapped ?? null,
      rowsUnmapped: pseudoStats?.rowsUnmapped ?? null,
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
