import { NextRequest, NextResponse } from 'next/server'
import { Resend } from 'resend'
import { buildConfirmationEmail } from '@/components/emails/ConfirmationEmail'

function getResendClient() {
  const apiKey = process.env.RESEND_API_KEY
  if (!apiKey) {
    throw new Error('RESEND_API_KEY is not configured')
  }
  return new Resend(apiKey)
}

const FROM_ADDRESS = 'Twinspire <info@twinspire.ai>'
const TEAM_ADDRESS = 'info@twinspire.ai'

interface ContactPayload {
  name: string
  email: string
  role: string
  clubOrClinic: string
  message?: string
}

function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
}

export async function POST(req: NextRequest) {
  let body: ContactPayload

  try {
    body = (await req.json()) as ContactPayload
  } catch {
    return NextResponse.json({ error: 'Invalid request body' }, { status: 400 })
  }

  const { name, email, role, clubOrClinic, message } = body

  // Basic server-side validation
  if (!name?.trim() || !email?.trim() || !role?.trim()) {
    return NextResponse.json(
      { error: 'name, email and role are required' },
      { status: 422 }
    )
  }

  if (!isValidEmail(email)) {
    return NextResponse.json(
      { error: 'Invalid email address' },
      { status: 422 }
    )
  }

  // Build confirmation HTML
  const confirmationHtml = buildConfirmationEmail(name.trim())

  try {
    const resend = getResendClient()

    // 1. Send confirmation receipt to the applicant
    await resend.emails.send({
      from: FROM_ADDRESS,
      to: email.trim(),
      subject: "Thanks for reaching out — we'll be in touch soon",
      html: confirmationHtml,
    })

    // 2. Notify the Twinspire team
    await resend.emails.send({
      from: FROM_ADDRESS,
      to: TEAM_ADDRESS,
      replyTo: email.trim(),
      subject: `New pilot cohort application — ${name.trim()}`,
      html: `
        <h2 style="font-family:sans-serif;color:#0802A3">New application received</h2>
        <table style="font-family:sans-serif;font-size:14px;border-collapse:collapse">
          <tr><td style="padding:6px 16px 6px 0;color:#737373;font-weight:600">Name</td><td>${escapeHtml(name)}</td></tr>
          <tr><td style="padding:6px 16px 6px 0;color:#737373;font-weight:600">Email</td><td>${escapeHtml(email)}</td></tr>
          <tr><td style="padding:6px 16px 6px 0;color:#737373;font-weight:600">Role</td><td>${escapeHtml(role)}</td></tr>
          <tr><td style="padding:6px 16px 6px 0;color:#737373;font-weight:600">Club / Clinic</td><td>${escapeHtml(clubOrClinic ?? '—')}</td></tr>
        </table>
        ${message?.trim() ? `<p style="font-family:sans-serif;font-size:14px;color:#0a0a0a;margin-top:16px"><strong>Message:</strong><br/>${escapeHtml(message)}</p>` : ''}
      `,
    })

    return NextResponse.json({ success: true })
  } catch (err) {
    console.error('[contact/route] Resend error', err)
    return NextResponse.json(
      { error: 'Failed to send email. Please try again later.' },
      { status: 500 }
    )
  }
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
