import { NextRequest, NextResponse } from 'next/server'
import { Resend } from 'resend'

function getResendClient() {
  const apiKey = process.env.RESEND_API_KEY
  if (!apiKey) throw new Error('RESEND_API_KEY is not configured')
  return new Resend(apiKey)
}

const FROM_ADDRESS = 'Twinspire <info@twinspire.ai>'
const TEAM_ADDRESS = 'roxane@twinspire.dk'

interface ReachOutPayload {
  name: string
  email: string
  subject: string
  message: string
}

function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
}

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;')
}

export async function POST(req: NextRequest) {
  let body: ReachOutPayload

  try {
    body = (await req.json()) as ReachOutPayload
  } catch {
    return NextResponse.json({ error: 'Invalid request body' }, { status: 400 })
  }

  const { name, email, subject, message } = body

  if (!name?.trim() || !email?.trim() || !subject?.trim() || !message?.trim()) {
    return NextResponse.json(
      { error: 'All fields are required' },
      { status: 422 }
    )
  }

  if (!isValidEmail(email)) {
    return NextResponse.json(
      { error: 'Invalid email address' },
      { status: 422 }
    )
  }

  const safeName = escapeHtml(name.trim())
  const safeEmail = escapeHtml(email.trim())
  const safeSubject = escapeHtml(subject.trim())
  const safeMessage = escapeHtml(message.trim())

  try {
    const resend = getResendClient()

    await Promise.all([
      // Confirmation to sender
      resend.emails.send({
        from: FROM_ADDRESS,
        to: email.trim(),
        subject: "Thanks for reaching out — we'll be in touch soon",
        html: `
        <p style="font-family:sans-serif;font-size:15px;color:#0a0a0a">Hi ${safeName},</p>
        <p style="font-family:sans-serif;font-size:15px;color:#555">Thanks for reaching out to Twinspire. We've received your message and will be in touch if there's a strong fit.</p>
        <p style="font-family:sans-serif;font-size:15px;color:#555">— The Twinspire Team</p>
      `,
      }),

      // Notification to team
      resend.emails.send({
        from: FROM_ADDRESS,
        to: TEAM_ADDRESS,
        replyTo: email.trim(),
        subject: `New open invitation — ${name.trim()}`,
        html: `
        <h2 style="font-family:sans-serif;color:#0802A3">New open invitation received</h2>
        <table style="font-family:sans-serif;font-size:14px;border-collapse:collapse">
          <tr><td style="padding:6px 16px 6px 0;color:#737373;font-weight:600">Name</td><td>${safeName}</td></tr>
          <tr><td style="padding:6px 16px 6px 0;color:#737373;font-weight:600">Email</td><td>${safeEmail}</td></tr>
          <tr><td style="padding:6px 16px 6px 0;color:#737373;font-weight:600">Subject</td><td>${safeSubject}</td></tr>
          <tr><td style="padding:6px 16px 6px 0;color:#737373;font-weight:600;vertical-align:top">Message</td><td>${safeMessage}</td></tr>
        </table>
      `,
      }),
    ])

    return NextResponse.json({ ok: true })
  } catch (err) {
    console.error('[reach-out] email send failed', err)
    return NextResponse.json(
      { error: 'Failed to send message' },
      { status: 500 }
    )
  }
}
