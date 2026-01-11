import { NextRequest, NextResponse } from 'next/server'
import { Storage } from '@google-cloud/storage'

// Initialize GCP Storage
const storage = new Storage({
  projectId: process.env.GCP_PROJECT_ID,
  credentials: {
    client_email: process.env.GCP_CLIENT_EMAIL,
    private_key: process.env.GCP_PRIVATE_KEY?.replace(/\\n/g, '\n'),
  },
})

const bucketName = process.env.GCP_BUCKET_NAME!

export async function POST(request: NextRequest) {
  try {
    // Validate environment variables
    if (
      !process.env.GCP_PROJECT_ID ||
      !process.env.GCP_CLIENT_EMAIL ||
      !process.env.GCP_PRIVATE_KEY ||
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
    ]
    const isValidType =
      validTypes.includes(file.type) ||
      file.name.endsWith('.xlsx') ||
      file.name.endsWith('.xls')

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
    const buffer = Buffer.from(bytes)

    // Create unique file identifier (using hash or UUID-like string)
    const timestamp = Date.now()
    const randomStr = Math.random().toString(36).substring(2, 15)
    const fileId = `${timestamp}-${randomStr}`

    // Sanitize original filename
    const sanitizedFileName = file.name.replace(/[^a-zA-Z0-9.-]/g, '_')

    // Create partitioned folder structure: source=excel/team_id={teamId}/measure_date={date}/file={filename}
    const fileName = `source=statssport/measure_date=${measureDate}/team_id=${teamId}/file=${fileId}-${sanitizedFileName}`

    // Upload to GCP Storage
    const bucket = storage.bucket(bucketName)
    const blob = bucket.file(fileName)

    await blob.save(buffer, {
      metadata: {
        contentType: file.type,
        metadata: {
          originalName: file.name,
          uploadedAt: new Date().toISOString(),
        },
      },
    })

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

    return NextResponse.json({
      success: true,
      fileName: file.name,
      storagePath: fileName,
      url: signedUrl,
      size: file.size,
      uploadedAt: new Date().toISOString(),
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
