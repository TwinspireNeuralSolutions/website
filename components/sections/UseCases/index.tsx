import { useTranslations } from 'next-intl'
import { AnimateIn } from '@/components/ui/AnimateIn'

const cases = [
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M22 12h-4l-3 9L9 3l-3 9H2"/>
      </svg>
    ),
    title: 'The hidden overload',
    body: "A player's club metrics look normal. Three weeks of declining wearable recovery scores tell a different story. Twinspire flags the pattern before it becomes a conversation with the physio.",
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
        <polyline points="9 12 11 14 15 10"/>
      </svg>
    ),
    title: 'The return-to-play decision',
    body: 'Clearance decisions are currently made on subjective assessment and session data. Twinspire adds the player\'s individual recovery baseline and the trend since the injury. Objective criteria, documented.',
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
        <circle cx="12" cy="7" r="4"/>
        <line x1="18" y1="8" x2="23" y2="13"/>
        <line x1="23" y1="8" x2="18" y2="13"/>
      </svg>
    ),
    title: 'The new signing',
    body: 'A player transfers. Instead of starting the individual model from scratch, their Athletic Passport arrives with them. New club inherits 18 months of baseline data from day one.',
  },
]

export function UseCasesSection() {
  return (
    <section className="bg-background py-20 sm:py-24">
      <div className="mx-auto max-w-6xl px-6">

        <AnimateIn variant="fadeUp">
          <p className="text-primary mb-4 text-[11px] font-semibold uppercase tracking-widest">In practice</p>
          <h2 className="text-foreground mb-12 max-w-lg text-3xl font-black tracking-tight sm:text-4xl">
            What the data looks like in use
          </h2>
        </AnimateIn>

        <div className="grid gap-6 sm:grid-cols-3">
          {cases.map((c, i) => (
            <AnimateIn key={c.title} variant="fadeUp" delay={i * 0.08}>
              <div className="bg-muted/30 flex h-full flex-col gap-4 rounded-xl p-6">
                <div className="text-primary flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                  {c.icon}
                </div>
                <h3 className="text-foreground text-[16px] font-bold">{c.title}</h3>
                <p className="text-foreground/60 text-[14px] leading-relaxed">{c.body}</p>
              </div>
            </AnimateIn>
          ))}
        </div>

      </div>
    </section>
  )
}
