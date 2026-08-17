/* eslint-disable */
'use client'

import { useState }      from 'react'
import Image             from 'next/image'
import { Navbar }        from '@/components/ui/navbar'
import { FooterSection } from '@/components/sections/Footer'

/* ── Hero ────────────────────────────────────────────────────── */
function HeroAthletes() {
  return (
    <section className="bg-background relative flex min-h-[85svh] items-center justify-center px-6 pb-20 pt-36 text-center">
      <div className="relative mx-auto max-w-3xl">
        <p className="text-primary mb-6 text-[11px] font-semibold uppercase tracking-widest">
          For athletes
        </p>
        <h1 className="text-foreground mb-6 font-['Barlow_Condensed',sans-serif] text-[clamp(48px,8vw,96px)] font-black leading-none tracking-tight">
          Your data.<br />
          Your baseline.<br />
          <span className="text-primary">Your career.</span>
        </h1>
        <p className="text-foreground/80 mx-auto mb-10 max-w-xl text-[16px] leading-relaxed">
          Every session, load, injury, and rehabilitation milestone. Portable, owned by you, shared only with the clubs you choose.
        </p>
        <a
          href="#athlete-waitlist"
          className="bg-primary hover:bg-primary/90 inline-block rounded-[6px] px-8 py-4 text-[15px] font-semibold text-white transition-colors"
        >
          Join the Waitlist
        </a>
      </div>
    </section>
  )
}

/* ── Passport ────────────────────────────────────────────────── */
function PassportSection() {
  return (
    <section className="bg-background py-24 sm:py-32">
      <div className="mx-auto max-w-5xl px-6">
        <div className="grid items-center gap-16 lg:grid-cols-2">
          <div>
            <p className="text-primary mb-4 text-[11px] font-semibold uppercase tracking-widest">The Athletic Passport</p>
            <h2 className="text-foreground mb-6 text-3xl font-black tracking-tight sm:text-4xl">
              Every time you transfer,<br />
              your physiological history<br />
              <span className="text-primary">resets to zero.</span>
            </h2>
            <p className="text-foreground/80 mb-6 text-[15px] leading-relaxed">
              A new club inherits your name and a transfer fee. What they do not inherit is 18 months of individual baseline data. What load your body responds to. What recovery looks like for you. Where your personal thresholds actually sit.
            </p>
            <p className="text-foreground/80 text-[15px] leading-relaxed">
              The Athletic Passport changes that. Every session, load, injury, and rehabilitation milestone is structured into a portable record that belongs to you. When you sign for a new club, your baseline arrives with you.
            </p>
          </div>
          <div className="grid gap-4">
            {[
              ['Individual baseline, continuously updated', 'Not a squad average. Your normal, built over time.'],
              ['Full load, injury, and rehab history', 'Every session. Every milestone. Portable.'],
              ['You control who sees what', 'Granular consent. Withdrawable at any time.'],
              ['New club inherits your data from day one', 'No more starting from scratch after every transfer.'],
            ].map(([title, desc]) => (
              <div key={title} className="bg-muted/30 flex items-start gap-4 rounded-xl p-5">
                <div className="bg-primary/10 text-primary mt-0.5 flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-[6px]">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="20 6 9 17 4 12"/></svg>
                </div>
                <div>
                  <p className="text-foreground mb-1 text-[14px] font-semibold">{title}</p>
                  <p className="text-foreground/80 text-[13px] leading-relaxed">{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

/* ── App walkthrough with real screenshot ─────────────────────── */
function HowAppWorksSection() {
  return (
    <section className="bg-muted/40 py-24 sm:py-32">
      <div className="mx-auto max-w-6xl px-6">
        <div className="mb-14 text-center">
          <p className="text-primary mb-4 text-[11px] font-semibold uppercase tracking-widest">The player app</p>
          <h2 className="text-foreground text-3xl font-black tracking-tight sm:text-4xl">
            How it works for you
          </h2>
        </div>

        <div className="grid items-center gap-12 lg:grid-cols-[1fr_auto]">
          {/* Steps */}
          <div className="grid gap-6 sm:grid-cols-1">
            {[
              {
                step: '01',
                title: 'Connect your wearable once',
                body: 'Link your wearable device through the Twinspire app. One setup. Your recovery, sleep, and HRV data flows automatically from that point forward.',
              },
              {
                step: '02',
                title: 'Morning check-in',
                body: 'A short daily check-in captures the subjective signals no wearable measures automatically. How you feel, your energy, your readiness. Takes under 30 seconds.',
              },
              {
                step: '03',
                title: 'See your individual baseline',
                body: 'The app shows your metrics against your personal baseline, not a population average. You see what your normal looks like, and when something shifts.',
              },
            ].map(s => (
              <div key={s.step} className="bg-background flex items-start gap-5 rounded-xl p-6">
                <p className="text-primary/50 font-['Barlow_Condensed',sans-serif] text-[32px] font-black leading-none">{s.step}</p>
                <div>
                  <h3 className="text-foreground mb-2 text-[16px] font-bold">{s.title}</h3>
                  <p className="text-foreground/80 text-[14px] leading-relaxed">{s.body}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Real app screenshot in iPhone frame */}
          <div className="relative mx-auto w-[250px] lg:w-[270px]">
            {/* Device body */}
            <div className="relative overflow-hidden rounded-[36px] border-[7px] border-[#1a1a1c] bg-[#1a1a1c] shadow-2xl">
              {/* Dynamic island */}
              <div className="absolute left-1/2 top-2 z-10 h-[18px] w-[76px] -translate-x-1/2 rounded-full bg-[#1a1a1c]" />
              {/* Screen */}
              <div className="overflow-hidden rounded-[29px]">
                <Image
                  src="/product/app-screenshot.jpg"
                  alt="Twinspire player app: daily check-in, performance metrics, and individual baseline"
                  width={390}
                  height={844}
                  quality={92}
                  className="block w-full"
                />
              </div>
            </div>
            {/* Side buttons */}
            <div className="absolute -left-[2px] top-[110px] h-[26px] w-[3px] rounded-l-sm bg-[#2a2a2c]" />
            <div className="absolute -left-[2px] top-[150px] h-[44px] w-[3px] rounded-l-sm bg-[#2a2a2c]" />
            <div className="absolute -left-[2px] top-[205px] h-[44px] w-[3px] rounded-l-sm bg-[#2a2a2c]" />
            <div className="absolute -right-[2px] top-[160px] h-[64px] w-[3px] rounded-r-sm bg-[#2a2a2c]" />
          </div>
        </div>
      </div>
    </section>
  )
}

/* ── Ownership ───────────────────────────────────────────────── */
function OwnershipSection() {
  return (
    <section className="bg-background py-24 sm:py-32">
      <div className="mx-auto max-w-2xl px-6 text-center">
        <p className="text-primary mb-4 text-[11px] font-semibold uppercase tracking-widest">Data ownership</p>
        <h2 className="text-foreground mb-6 text-3xl font-black tracking-tight sm:text-4xl">
          The data is yours.<br />Not the club&#39;s.
        </h2>
        <p className="text-foreground/80 mb-4 text-[15px] leading-relaxed">
          Your Athletic Passport belongs to you. The club sees their squad analytics. Twinspire hosts both under a formal Data Processing Agreement. Your data is never sold, never shared without your consent, and fully portable when you move.
        </p>
        <p className="text-foreground/80 text-[15px] leading-relaxed">
          You decide what you share, with which club, and for how long. You can withdraw consent at any time.
        </p>
      </div>
    </section>
  )
}

/* ── Waitlist (wired to real backend) ─────────────────────────── */
function AthleteWaitlistSection() {
  const [email, setEmail]   = useState('')
  const [status, setStatus] = useState<'idle'|'submitting'|'success'|'error'>('idle')

  const valid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())

  const submit = async () => {
    if (!valid) return
    setStatus('submitting')
    try {
      const res = await fetch('/api/athlete-waitlist', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: email.trim() }),
      })
      setStatus(res.ok ? 'success' : 'error')
    } catch { setStatus('error') }
  }

  return (
    <section id="athlete-waitlist" className="bg-muted/40 py-24 sm:py-32">
      <div className="mx-auto max-w-lg px-6 text-center">
        {status === 'success' ? (
          <>
            <div className="mx-auto mb-6 flex h-14 w-14 items-center justify-center rounded-full bg-green-500/10 text-green-500 ring-1 ring-green-500/20">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="20 6 9 17 4 12"/></svg>
            </div>
            <h2 className="text-foreground mb-3 text-2xl font-black">You are on the list</h2>
            <p className="text-foreground/80 text-[15px] leading-relaxed">
              We will send you one email when athlete access opens. Check your inbox for a confirmation.
            </p>
          </>
        ) : (
          <>
            <p className="text-primary mb-4 text-[11px] font-semibold uppercase tracking-widest">Join the waitlist</p>
            <h2 className="text-foreground mb-4 text-3xl font-black tracking-tight">
              Be among the first athletes on the platform
            </h2>
            <p className="text-foreground/80 mb-10 text-[15px] leading-relaxed">
              Twinspire is currently deploying with founding partner clubs. Leave your email and we will reach out when athlete access opens.
            </p>
            <div className="flex gap-3">
              <input
                type="email"
                placeholder="your@email.com"
                value={email}
                onChange={e => setEmail(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && submit()}
                className="bg-background border-border text-foreground flex-1 rounded-[6px] border px-4 py-3 text-[14px] placeholder:text-foreground/40 focus:border-primary/50 focus:outline-none"
              />
              <button
                onClick={submit}
                disabled={status === 'submitting' || !valid}
                className="bg-primary hover:bg-primary/90 rounded-[6px] px-6 py-3 text-[14px] font-semibold text-white transition-colors disabled:cursor-not-allowed disabled:opacity-50"
              >
                {status === 'submitting' ? 'Sending...' : 'Join'}
              </button>
            </div>
            {status === 'error' && (
              <p className="mt-3 text-[13px] text-red-500">Something went wrong. Try again or email info@twinspire.ai</p>
            )}
            <p className="text-foreground/50 mt-4 text-[12px]">No spam. One email when access opens.</p>
          </>
        )}
      </div>
    </section>
  )
}

export default function ForAthletesPage() {
  return (
    <>
      <Navbar />
      <main>
        <HeroAthletes />
        <PassportSection />
        <HowAppWorksSection />
        <OwnershipSection />
        <AthleteWaitlistSection />
      </main>
      <FooterSection />
    </>
  )
}
