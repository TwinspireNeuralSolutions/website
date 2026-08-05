/* eslint-disable */
import { Navbar }        from '@/components/ui/navbar'
import { FooterSection } from '@/components/sections/Footer'

function HeroAthletes() {
  return (
    <section className="relative flex min-h-[90svh] items-center justify-center overflow-hidden bg-[#080C18] px-6 py-32 text-center">
      {/* Subtle radial glow */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_-10%,rgba(0,168,255,0.12),transparent)]" />
      <div className="relative mx-auto max-w-3xl">
        <p className="text-primary mb-6 text-[11px] font-semibold uppercase tracking-widest opacity-90">
          For athletes
        </p>
        <h1 className="mb-6 font-['Barlow_Condensed',sans-serif] text-[clamp(48px,8vw,96px)] font-black leading-none tracking-tight text-white">
          Your data.<br />
          Your baseline.<br />
          <span className="text-primary">Your career.</span>
        </h1>
        <p className="text-foreground/60 mx-auto mb-10 max-w-xl text-[16px] leading-relaxed">
          Every session, load, injury, and rehabilitation milestone — portable, owned by you, readable by any club you sign for.
        </p>
        <a
          href="#athlete-waitlist"
          className="bg-primary hover:bg-primary/90 inline-block rounded-lg px-8 py-4 text-[15px] font-semibold text-white transition-colors"
        >
          Join the Waitlist
        </a>
      </div>
    </section>
  )
}

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
            <p className="text-foreground/60 mb-6 text-[15px] leading-relaxed">
              A new club inherits your name and a transfer fee. What they do not inherit is 18 months of individual baseline data — what load your body responds to, what recovery looks like for you, where your personal thresholds actually sit.
            </p>
            <p className="text-foreground/60 text-[15px] leading-relaxed">
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
                <div className="bg-primary/10 text-primary mt-0.5 flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="20 6 9 17 4 12"/></svg>
                </div>
                <div>
                  <p className="text-foreground mb-1 text-[14px] font-semibold">{title}</p>
                  <p className="text-foreground/55 text-[13px] leading-relaxed">{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

function HowAppWorksSection() {
  return (
    <section className="bg-muted/20 py-24 sm:py-32">
      <div className="mx-auto max-w-5xl px-6">
        <div className="mb-14 text-center">
          <p className="text-primary mb-4 text-[11px] font-semibold uppercase tracking-widest">The player app</p>
          <h2 className="text-foreground text-3xl font-black tracking-tight sm:text-4xl">
            How it works for you
          </h2>
        </div>
        <div className="grid gap-6 sm:grid-cols-3">
          {[
            {
              step: '01',
              title: 'Connect your wearable once',
              body: 'Link your wearable device through the Twinspire app. One setup. Your recovery, sleep, and HRV data flows automatically from that point forward.',
            },
            {
              step: '02',
              title: 'Morning check-in',
              body: 'A short daily check-in captures the subjective signals no wearable can measure automatically — how you feel, your energy, your readiness. Takes under 30 seconds.',
            },
            {
              step: '03',
              title: 'See your individual baseline',
              body: 'The app shows you your own metrics against your personal baseline — not a population average. You see what your normal looks like, and when something shifts.',
            },
          ].map(s => (
            <div key={s.step} className="bg-background rounded-xl p-6">
              <p className="text-primary/50 mb-4 font-['Barlow_Condensed',sans-serif] text-[32px] font-black">{s.step}</p>
              <h3 className="text-foreground mb-3 text-[16px] font-bold">{s.title}</h3>
              <p className="text-foreground/55 text-[14px] leading-relaxed">{s.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function OwnershipSection() {
  return (
    <section className="bg-background py-24 sm:py-32">
      <div className="mx-auto max-w-2xl px-6 text-center">
        <p className="text-primary mb-4 text-[11px] font-semibold uppercase tracking-widest">Data ownership</p>
        <h2 className="text-foreground mb-6 text-3xl font-black tracking-tight sm:text-4xl">
          The data is yours.<br />Not the club's.
        </h2>
        <p className="text-foreground/60 mb-4 text-[15px] leading-relaxed">
          Your Athletic Passport belongs to you. The club sees their squad analytics. Twinspire hosts both under a formal Data Processing Agreement. Your data is never sold, never shared without your consent, and fully portable when you move.
        </p>
        <p className="text-foreground/60 text-[15px] leading-relaxed">
          You decide what you share, with which club, and for how long. You can withdraw consent at any time.
        </p>
      </div>
    </section>
  )
}

function AthleteWaitlistSection() {
  return (
    <section id="athlete-waitlist" className="bg-muted/20 py-24 sm:py-32">
      <div className="mx-auto max-w-lg px-6 text-center">
        <p className="text-primary mb-4 text-[11px] font-semibold uppercase tracking-widest">Join the waitlist</p>
        <h2 className="text-foreground mb-4 text-3xl font-black tracking-tight">
          Be among the first athletes on the platform
        </h2>
        <p className="text-foreground/55 mb-10 text-[15px] leading-relaxed">
          Twinspire is currently deploying with founding partner clubs. Leave your email and we will reach out when athlete access opens.
        </p>
        <div className="flex gap-3">
          <input
            type="email"
            placeholder="your@email.com"
            className="bg-background border-border flex-1 rounded-lg border px-4 py-3 text-[14px] text-white placeholder:text-white/30 focus:border-primary/50 focus:outline-none"
          />
          <button className="bg-primary hover:bg-primary/90 rounded-lg px-6 py-3 text-[14px] font-semibold text-white transition-colors">
            Join
          </button>
        </div>
        <p className="text-foreground/35 mt-4 text-[12px]">No spam. One email when access opens.</p>
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
