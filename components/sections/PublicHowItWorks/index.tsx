'use client'

import { AnimateIn } from '@/components/ui/animate-in'
import { Typography } from '@/components/ui/typography'

const STEPS = [
  {
    number: '01',
    title: 'Connect',
    body: 'Relevant club and athlete data are brought together without replacing the systems already in place.',
  },
  {
    number: '02',
    title: 'Learn',
    body: 'Twinspire builds an evolving individual baseline and response profile for each athlete.',
  },
  {
    number: '03',
    title: 'Interpret',
    body: 'Meaningful changes and their contributing signals are surfaced as decision support for staff.',
  },
] as const

export function PublicHowItWorksSection() {
  return (
    <section id="science" className="bg-background relative z-10 w-full">
      <div className="section-x section-y section-inner mx-auto">
        <AnimateIn variant="fadeUp">
          <div className="mx-auto mb-10 max-w-3xl text-center">
            <h2 className="text-foreground text-[22px] leading-[1.2] font-bold tracking-wide uppercase sm:text-[28px] lg:text-[32px]">
              How Twinspire Works
            </h2>
            <p className="text-foreground/80 mt-4 text-[15px] leading-[1.8]">
              One intelligence layer across the data already surrounding the athlete.
            </p>
          </div>
        </AnimateIn>

        <div className="mx-auto grid max-w-5xl gap-6 md:grid-cols-3">
          {STEPS.map((step, index) => (
            <AnimateIn key={step.title} variant="fadeUp" delay={index * 0.08}>
              <div className="bg-muted/30 h-full rounded-xl p-6 sm:p-7">
                <p className="text-primary mb-4 text-[13px] font-bold tracking-widest">
                  {step.number}
                </p>
                <Typography variant="heading" as="h3" textColor="default">
                  {step.title}
                </Typography>
                <Typography variant="paragraph" as="p" className="mt-3">
                  {step.body}
                </Typography>
              </div>
            </AnimateIn>
          ))}
        </div>
      </div>
    </section>
  )
}
