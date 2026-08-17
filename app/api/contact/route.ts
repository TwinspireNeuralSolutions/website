import { NextRequest, NextResponse } from 'next/server'
import { Resend } from 'resend'
import { emailShell, p, detailTable, escapeHtml, BRAND } from '@/lib/email/template'

function getResendClient() {
  const apiKey = process.env.RESEND_API_KEY
  if (!apiKey) throw new Error('RESEND_API_KEY is not configured')
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

  if (!name?.trim() || !email?.trim() || !role?.trim()) {
    return NextResponse.json({ error: 'name, email and role are required' }, { status: 422 })
  }
  if (!isValidEmail(email)) {
    return NextResponse.json({ error: 'Invalid email address' }, { status: 422 })
  }

  const firstName = name.trim().split(' ')[0]

  try {
    const resend = getResendClient()

    // ── Applicant confirmation ──
    await resend.emails.send({
      from: FROM_ADDRESS,
      to: email.trim(),
      subject: 'We received your application',
      html: emailShell({
        eyebrow: 'Application received',
        heading: `Thanks, ${escapeHtml(firstName)}`,
        preheader: 'We will respond within one business day.',
        body:
          p('We have your application to join the founding partner cohort and will respond within one business day.') +
          p('The next step is a short call to understand your current setup, what data you already capture, and whether Twinspire is the right fit for both sides. No commitment.') +
          p('If anything changes before then, just reply to this email.'),
        cta: { label: 'Visit twinspire.ai', url: 'https://twinspire.ai' },
      }),
    })

    // ── Internal notification ──
    await resend.emails.send({
      from: FROM_ADDRESS,
      to: TEAM_ADDRESS,
      replyTo: email.trim(),
      subject: `Founding partner application: ${name.trim()}${clubOrClinic?.trim() ? ` · ${clubOrClinic.trim()}` : ''}`,
      html: emailShell({
        eyebrow: 'New application',
        heading: `${name.trim()} applied to the cohort`,
        preheader: `${role.trim()}${clubOrClinic?.trim() ? ` at ${clubOrClinic.trim()}` : ''}`,
        body:
          detailTable([
            ['Name',  name.trim()],
            ['Email', email.trim()],
            ['Role',  role.trim()],
            ['Club',  clubOrClinic?.trim() || 'Not provided'],
          ]) +
          (message?.trim()
            ? `<div style="margin-top:24px;padding:18px 20px;background-color:${BRAND.paper};border-radius:6px;">
                 <p style="margin:0 0 8px;font-size:11px;font-weight:600;letter-spacing:0.08em;text-transform:uppercase;color:${BRAND.muted};">Message</p>
                 <p style="margin:0;font-size:14px;line-height:1.65;color:${BRAND.ink};white-space:pre-wrap;">${escapeHtml(message.trim())}</p>
               </div>`
            : ''),
        cta: { label: `Reply to ${firstName}`, url: `mailto:${email.trim()}` },
      }),
    })

    return NextResponse.json({ success: true })
  } catch (err) {
    console.error('[contact/route] Resend error', err)
    return NextResponse.json({ error: 'Failed to send email. Please try again later.' }, { status: 500 })
  }
}
