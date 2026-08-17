import { NextRequest, NextResponse } from 'next/server'
import { Resend } from 'resend'
import { emailShell, p, detailTable } from '@/lib/email/template'

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

  const { email } = body
  const valid = typeof email === 'string' && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())
  if (!valid) return NextResponse.json({ error: 'Valid email required' }, { status: 422 })

  try {
    const resend = getResend()

    // ── Internal notification ──
    await resend.emails.send({
      from: FROM,
      to: TEAM,
      replyTo: email.trim(),
      subject: `Athlete waitlist: ${email.trim()}`,
      html: emailShell({
        eyebrow: 'Athlete waitlist',
        heading: 'New waitlist signup',
        preheader: email.trim(),
        body: detailTable([['Email', email.trim()], ['Source', 'For Athletes page']]),
      }),
    })

    // ── Athlete confirmation ──
    await resend.emails.send({
      from: FROM,
      to: email.trim(),
      subject: 'You are on the Twinspire athlete waitlist',
      html: emailShell({
        eyebrow: 'Waitlist confirmed',
        heading: 'You are on the list',
        preheader: 'One email when athlete access opens. Nothing else.',
        body:
          p('Twinspire is currently deploying with founding partner clubs across elite sport. Athlete access opens after that.') +
          p('When it does, you will get one email. Your individual baseline, your Athletic Passport, and full control over who sees your data.') +
          p('No spam in the meantime.'),
        cta: { label: 'Learn more', url: 'https://twinspire.ai/en/for-athletes' },
      }),
    })

    return NextResponse.json({ success: true })
  } catch (err) {
    console.error('[athlete-waitlist/route]', err)
    return NextResponse.json({ error: 'Failed. Please try again.' }, { status: 500 })
  }
}
