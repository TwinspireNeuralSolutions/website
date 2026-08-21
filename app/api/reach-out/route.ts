import { NextRequest, NextResponse } from 'next/server'
import { Resend } from 'resend'
import { emailShell, p, detailTable, BRAND } from '@/lib/email/template'

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
  const safeMessage = escapeHtml(message.trim())

  try {
    const resend = getResendClient()

    await Promise.all([
      // Confirmation to sender
      resend.emails.send({
        from: FROM_ADDRESS,
        to: email.trim(),
        subject: 'We received your message',
        html: emailShell({
          eyebrow: 'Message received',
          heading: `Thanks, ${safeName.split(' ')[0]}`,
          preheader: 'We will be in touch if there is a strong fit.',
          body:
            p(
              'Thanks for reaching out to Twinspire. We have your message and will be in touch if there is a strong fit.'
            ) + p('If anything changes before then, just reply to this email.'),
          cta: { label: 'Visit twinspire.ai', url: 'https://twinspire.ai' },
        }),
      }),

      // Notification to team
      resend.emails.send({
        from: FROM_ADDRESS,
        to: TEAM_ADDRESS,
        replyTo: email.trim(),
        subject: `Open invitation: ${name.trim()}`,
        html: emailShell({
          eyebrow: 'Open invitation',
          heading: `${name.trim()} reached out`,
          preheader: subject.trim(),
          body:
            detailTable([
              ['Name', name.trim()],
              ['Email', email.trim()],
              ['Subject', subject.trim()],
            ]) +
            `<div style="margin-top:24px;padding:18px 20px;background-color:${BRAND.paper};border-radius:6px;">
               <p style="margin:0 0 8px;font-size:11px;font-weight:600;letter-spacing:0.08em;text-transform:uppercase;color:${BRAND.muted};">Message</p>
               <p style="margin:0;font-size:14px;line-height:1.65;color:${BRAND.ink};white-space:pre-wrap;">${safeMessage}</p>
             </div>`,
          cta: {
            label: `Reply to ${name.trim().split(' ')[0]}`,
            url: `mailto:${email.trim()}`,
          },
        }),
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
