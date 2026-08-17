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

  const { email } = body
  const valid = typeof email === 'string' && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())
  if (!valid) return NextResponse.json({ error: 'Valid email required' }, { status: 422 })

  try {
    const resend = getResend()

    await resend.emails.send({
      from: FROM,
      to: TEAM,
      subject: `Athlete waitlist signup: ${esc(email.trim())}`,
      html: `<p style="font-family:sans-serif;font-size:14px">New athlete waitlist signup: <strong>${esc(email.trim())}</strong></p>`,
    })

    await resend.emails.send({
      from: FROM,
      to: email.trim(),
      subject: 'You are on the Twinspire athlete waitlist',
      html: `
        <p style="font-family:sans-serif;font-size:15px;color:#0a0a0a">You are on the list.</p>
        <p style="font-family:sans-serif;font-size:15px;color:#0a0a0a">Twinspire is currently deploying with founding partner clubs. We will send you one email when athlete access opens. No spam.</p>
        <p style="font-family:sans-serif;font-size:15px;color:#0a0a0a">The Twinspire team</p>`,
    })

    return NextResponse.json({ success: true })
  } catch (err) {
    console.error('[athlete-waitlist/route]', err)
    return NextResponse.json({ error: 'Failed. Please try again.' }, { status: 500 })
  }
}
