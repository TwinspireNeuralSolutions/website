import { NextRequest, NextResponse } from 'next/server'
import { Resend } from 'resend'
import { buildApplyConfirmationEmail } from '@/components/emails/ApplyConfirmationEmail'

function getResendClient() {
  const apiKey = process.env.RESEND_API_KEY
  if (!apiKey) throw new Error('RESEND_API_KEY is not configured')
  return new Resend(apiKey)
}

const FROM_ADDRESS = 'Twinspire <info@twinspire.ai>'
const RECRUITER_ADDRESS = 'roxane@twinspire.dk'

const MAX_FILE_SIZE = 5 * 1024 * 1024 // 5 MB
const ALLOWED_MIME = new Set([
  'application/pdf',
  'application/msword',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
])

function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
}

/** Minimal HTML escaping to prevent XSS in team notification email. */
function escapeHtml(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;')
}

export async function POST(req: NextRequest) {
  let formData: FormData
  try {
    formData = await req.formData()
  } catch {
    return NextResponse.json({ error: 'Invalid request body' }, { status: 400 })
  }

  const name = (formData.get('name') as string | null)?.trim() ?? ''
  const email = (formData.get('email') as string | null)?.trim() ?? ''
  const phone = (formData.get('phone') as string | null)?.trim() ?? ''
  const linkedin = (formData.get('linkedin') as string | null)?.trim() ?? ''
  const message = (formData.get('message') as string | null)?.trim() ?? ''
  const jobTitle =
    (formData.get('jobTitle') as string | null)?.trim() ?? 'Unknown Position'
  const cvFile = formData.get('cv') as File | null

  // Server-side validation
  if (!name || !email) {
    return NextResponse.json(
      { error: 'Full name and email are required' },
      { status: 422 }
    )
  }

  if (!isValidEmail(email)) {
    return NextResponse.json(
      { error: 'Invalid email address' },
      { status: 422 }
    )
  }

  // CV file validation
  let cvAttachment: {
    filename: string
    content: Buffer
    contentType: string
  } | null = null
  if (cvFile && cvFile.size > 0) {
    if (cvFile.size > MAX_FILE_SIZE) {
      return NextResponse.json(
        { error: 'CV file must be under 5 MB' },
        { status: 422 }
      )
    }
    if (!ALLOWED_MIME.has(cvFile.type)) {
      return NextResponse.json(
        { error: 'CV must be a PDF or Word document' },
        { status: 422 }
      )
    }
    const buffer = await cvFile.arrayBuffer()
    cvAttachment = {
      filename: cvFile.name,
      content: Buffer.from(buffer),
      contentType: cvFile.type,
    }
  }

  const confirmationHtml = buildApplyConfirmationEmail(name, jobTitle)

  try {
    const resend = getResendClient()

    await Promise.all([
      // 1. Confirmation to applicant
      resend.emails.send({
        from: FROM_ADDRESS,
        to: email,
        subject: `Application received — ${jobTitle}`,
        html: confirmationHtml,
      }),

      // 2. Notification to recruiter with CV attached
      resend.emails.send({
        from: FROM_ADDRESS,
        to: RECRUITER_ADDRESS,
        replyTo: email,
        subject: `New application — ${jobTitle} — ${name}`,
        html: `
        <h2 style="font-family:sans-serif;color:#0802A3;margin:0 0 16px">New job application</h2>
        <table style="font-family:sans-serif;font-size:14px;border-collapse:collapse;width:100%">
          <tr><td style="padding:6px 16px 6px 0;color:#737373;font-weight:600;white-space:nowrap">Position</td><td>${escapeHtml(jobTitle)}</td></tr>
          <tr><td style="padding:6px 16px 6px 0;color:#737373;font-weight:600;white-space:nowrap">Full Name</td><td>${escapeHtml(name)}</td></tr>
          <tr><td style="padding:6px 16px 6px 0;color:#737373;font-weight:600;white-space:nowrap">Email</td><td><a href="mailto:${escapeHtml(email)}">${escapeHtml(email)}</a></td></tr>
          <tr><td style="padding:6px 16px 6px 0;color:#737373;font-weight:600;white-space:nowrap">Phone</td><td>${escapeHtml(phone || '—')}</td></tr>
          <tr><td style="padding:6px 16px 6px 0;color:#737373;font-weight:600;white-space:nowrap">LinkedIn</td><td>${linkedin ? `<a href="${escapeHtml(linkedin)}">${escapeHtml(linkedin)}</a>` : '—'}</td></tr>
        </table>
        ${message ? `<p style="font-family:sans-serif;font-size:14px;color:#0a0a0a;margin-top:20px"><strong>Message:</strong><br/><span style="white-space:pre-wrap">${escapeHtml(message)}</span></p>` : ''}
        ${cvAttachment ? `<p style="font-family:sans-serif;font-size:13px;color:#737373;margin-top:12px">CV attached: ${escapeHtml(cvAttachment.filename)}</p>` : '<p style="font-family:sans-serif;font-size:13px;color:#737373;margin-top:12px">No CV attached.</p>'}
      `,
        attachments: cvAttachment ? [cvAttachment] : undefined,
      }),
    ])

    return NextResponse.json({ success: true })
  } catch (err) {
    console.error('[apply/route] Resend error', err)
    return NextResponse.json(
      { error: 'Failed to send application. Please try again later.' },
      { status: 500 }
    )
  }
}
