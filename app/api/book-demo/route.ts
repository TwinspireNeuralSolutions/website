import { NextRequest, NextResponse } from 'next/server'
import { Resend } from 'resend'
import { emailShell, p, detailTable, escapeHtml } from '@/lib/email/template'

function getResend() {
  const key = process.env.RESEND_API_KEY
  if (!key) throw new Error('RESEND_API_KEY not configured')
  return new Resend(key)
}

const FROM = 'Twinspire <info@twinspire.ai>'
const TEAM = 'info@twinspire.ai'

export async function POST(req: NextRequest) {
  const body = await req.json().catch(() => null)
  if (!body) return NextResponse.json({ error: 'Invalid body' }, { status: 400 })

  const { name, email, role, club, league, gpsPlatform } = body

  if (!name?.trim() || !email?.trim() || !role?.trim()) {
    return NextResponse.json({ error: 'name, email and role are required' }, { status: 422 })
  }

  try {
    const resend = getResend()
    const firstName = name.trim().split(' ')[0]

    // ── Internal notification ──
    await resend.emails.send({
      from: FROM,
      to: TEAM,
      replyTo: email.trim(),
      subject: `Demo request: ${name.trim()} · ${role.trim()}${club?.trim() ? ` · ${club.trim()}` : ''}`,
      html: emailShell({
        eyebrow: 'New demo request',
        heading: `${name.trim()} wants a demo`,
        preheader: `${role.trim()}${club?.trim() ? ` at ${club.trim()}` : ''}`,
        body: detailTable([
          ['Name',     name.trim()],
          ['Email',    email.trim()],
          ['Role',     role.trim()],
          ['Club',     club?.trim()   || 'Not provided'],
          ['League',   league?.trim() || 'Not provided'],
          ['GPS platform', gpsPlatform?.trim() || 'Not provided'],
        ], true),
        cta: { label: 'Reply to ' + firstName, url: `mailto:${email.trim()}` },
      }),
    })

    // ── Requester confirmation ──
    await resend.emails.send({
      from: FROM,
      to: email.trim(),
      subject: 'Your Twinspire demo request',
      html: emailShell({
        eyebrow: 'Demo request received',
        heading: `Thanks, ${escapeHtml(firstName)}`,
        preheader: 'We will confirm a time within one business day.',
        body:
          p('We have your demo request and will be in touch within one business day to confirm a time that works for you.') +
          p('The session runs about 30 minutes. We will walk through the platform with your current setup in mind, and there is time at the end for questions.') +
          p('If anything changes before then, just reply to this email.'),
        cta: { label: 'Visit twinspire.ai', url: 'https://twinspire.ai' },
      }),
    })

    return NextResponse.json({ success: true })
  } catch (err) {
    console.error('[book-demo/route]', err)
    return NextResponse.json({ error: 'Failed to send. Please try again.' }, { status: 500 })
  }
}
