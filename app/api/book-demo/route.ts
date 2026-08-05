import { NextRequest, NextResponse } from 'next/server'
import { Resend } from 'resend'

function getResend() {
  const key = process.env.RESEND_API_KEY
  if (!key) throw new Error('RESEND_API_KEY not configured')
  return new Resend(key)
}

const FROM = 'Twinspire <info@twinspire.ai>'
const TEAM = 'info@twinspire.ai'

function esc(s: string) {
  return s.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;')
          .replace(/"/g,'&quot;').replace(/'/g,'&#039;')
}

export async function POST(req: NextRequest) {
  const body = await req.json().catch(() => null)
  if (!body) return NextResponse.json({ error: 'Invalid body' }, { status: 400 })

  const { name, email, role, club, league, gpsPlatform } = body

  if (!name?.trim() || !email?.trim() || !role?.trim()) {
    return NextResponse.json({ error: 'name, email and role are required' }, { status: 422 })
  }

  try {
    const resend = getResend()

    await resend.emails.send({
      from: FROM,
      to: TEAM,
      replyTo: email.trim(),
      subject: `Demo request — ${esc(name.trim())} · ${esc(role.trim())} · ${esc(club?.trim() ?? 'no club')}`,
      html: `
        <h2 style="font-family:sans-serif;color:#0802A3">New demo request</h2>
        <table style="font-family:sans-serif;font-size:14px;border-collapse:collapse">
          <tr><td style="padding:6px 16px 6px 0;color:#737373;font-weight:600">Name</td><td>${esc(name)}</td></tr>
          <tr><td style="padding:6px 16px 6px 0;color:#737373;font-weight:600">Email</td><td>${esc(email)}</td></tr>
          <tr><td style="padding:6px 16px 6px 0;color:#737373;font-weight:600">Role</td><td>${esc(role)}</td></tr>
          <tr><td style="padding:6px 16px 6px 0;color:#737373;font-weight:600">Club</td><td>${esc(club ?? 'Not provided')}</td></tr>
          <tr><td style="padding:6px 16px 6px 0;color:#737373;font-weight:600">League / level</td><td>${esc(league ?? 'Not provided')}</td></tr>
          <tr><td style="padding:6px 16px 6px 0;color:#737373;font-weight:600;color:#0802A3">GPS platform</td><td style="font-weight:700;color:#0802A3">${esc(gpsPlatform ?? 'Not provided')}</td></tr>
        </table>`,
    })

    await resend.emails.send({
      from: FROM,
      to: email.trim(),
      subject: 'Your Twinspire demo request',
      html: `
        <p style="font-family:sans-serif;font-size:15px;color:#0a0a0a">Hi ${esc(name.trim().split(' ')[0])},</p>
        <p style="font-family:sans-serif;font-size:15px;color:#0a0a0a">Thanks for requesting a demo. We will be in touch within one business day to confirm a time.</p>
        <p style="font-family:sans-serif;font-size:15px;color:#0a0a0a">The Twinspire team</p>`,
    })

    return NextResponse.json({ success: true })
  } catch (err) {
    console.error('[book-demo/route]', err)
    return NextResponse.json({ error: 'Failed to send. Please try again.' }, { status: 500 })
  }
}
