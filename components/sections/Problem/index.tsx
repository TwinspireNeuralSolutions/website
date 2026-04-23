'use client'

import { Typography } from '@/components/ui/typography'
import { AnimateIn } from '@/components/ui/animate-in'
import { useTranslation } from '@/i18n'

export function ProblemSection() {
  const { t } = useTranslation()

  const items = [
    {
      key: 'one',
      number: '1',
      side: 'left',
      title: 'The Unresolved Decision',
      body: 'GPS in one platform. Strength data in another. Clinical notes remain local. Wearable signals often never leave the athlete’s own device. The challenge in elite sport is no longer access to data alone, but the absence of a coherent longitudinal model of the individual athlete across contexts and over time.',
    },
    {
      key: 'two',
      number: '2',
      side: 'right',
      title: 'The Return-to-Play Gap',
      body: 'Football injury epidemiology is well established through long-running cohort studies, including the UEFA Elite Club research, which spans thousands of players across multiple countries and seasons. Yet despite increasingly sophisticated monitoring environments, the central decision problem remains unresolved: how to interpret changing signals at the individual level when decisions about return to training, return to play, and load modification must be made under uncertainty.',
    },
    {
      key: 'three',
      number: '3',
      side: 'left',
      title: 'Recurrent Injuries',
      body: 'Subsequent and recurrent injuries continue to represent a meaningful part of the burden in professional football, and the period following return remains especially sensitive. The gap is therefore not simply one of data collection, but of individualized interpretation.',
    },
  ]

  // Highlight specific phrases in the headline
  const headline = t('problem.headline')
  const highlights = ["Sunday's Decision", "Tuesday's Data"]
  const escapeRegExp = (s: string) => s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
  const headlineParts = headline.split(
    new RegExp(`(${highlights.map(escapeRegExp).join('|')})`)
  )

  return (
    <section
      id="problem"
      aria-labelledby="problem-heading"
      className="bg-background relative z-10 w-full"
    >
      <div className="section-x section-y section-inner mx-auto">
        <AnimateIn variant="fadeUp">
          <h2 className="mb-6 text-center text-[22px] leading-[1.2] tracking-wide uppercase sm:text-[26px] lg:mb-8 lg:text-[32px]">
            {headlineParts.map((part, i) =>
              highlights.includes(part) ? (
                <span key={`${part}-${i}`} className="text-primary font-bold">
                  {part}
                </span>
              ) : (
                <span
                  key={`${part}-${i}`}
                  className="text-foreground font-bold"
                >
                  {part}
                </span>
              )
            )}
          </h2>
        </AnimateIn>

        {/* Timeline container */}
        <div className="relative mx-auto mt-16 max-w-6xl">
          <div className="hidden md:block">
            <div className="bg-border absolute top-6 left-1/2 h-[calc(100%_-_3rem)] w-px -translate-x-1/2" />
          </div>

          <div className="mt-6 space-y-10 md:space-y-12">
            {items.map((item) => (
              <div
                key={item.key}
                className="grid grid-cols-1 items-start gap-y-6 md:grid-cols-[1fr_48px_1fr] md:items-center md:gap-x-2 md:gap-y-12"
              >
                {/* Left column (desktop) */}
                <div className="hidden md:flex md:justify-end">
                  {item.side === 'left' ? (
                    <div className="w-full max-w-[820px]">
                      <div className="px-0 py-0">
                        <Typography
                          variant="heading"
                          as="h3"
                          textColor="default"
                          className="text-left uppercase"
                        >
                          {item.title}
                        </Typography>
                        <Typography
                          variant="paragraph"
                          as="p"
                          className="mt-2 text-left"
                        >
                          {item.body}
                        </Typography>
                      </div>
                    </div>
                  ) : (
                    <div />
                  )}
                </div>

                {/* Center column: timeline + badge */}
                <div className="flex justify-center md:order-none">
                  <div className="relative flex items-center">
                    <div className="hidden items-center justify-center md:flex">
                      <div className="bg-primary flex h-9 w-9 items-center justify-center rounded-full font-bold text-white">
                        {item.number}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Right column (desktop) */}
                <div className="hidden md:flex md:justify-start">
                  {item.side === 'right' ? (
                    <div className="w-full max-w-[820px]">
                      <div className="px-0 py-0">
                        <Typography
                          variant="heading"
                          as="h3"
                          textColor="default"
                          className="text-left uppercase"
                        >
                          {item.title}
                        </Typography>
                        <Typography
                          variant="paragraph"
                          as="p"
                          className="mt-2 text-left"
                        >
                          {item.body}
                        </Typography>
                      </div>
                    </div>
                  ) : (
                    <div />
                  )}
                </div>

                {/* Mobile stacked: centered number above title */}
                <div className="md:hidden">
                  <div className="space-y-2 text-center">
                    <div>
                      <div className="bg-primary mx-auto flex h-8 w-8 items-center justify-center rounded-full font-bold text-white">
                        {item.number}
                      </div>
                    </div>

                    <div>
                      <Typography
                        variant="heading"
                        as="h3"
                        textColor="default"
                        className="uppercase"
                      >
                        {item.title}
                      </Typography>
                      <Typography variant="paragraph" as="p" className="mt-2">
                        {item.body}
                      </Typography>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Restyled 'Why This Research Began' section — use CTA background */}
        {/* Restyled 'Why This Research Began' section — CTA style */}
        <div className="relative z-10 mt-20 w-full">
          <div
            className="bg-footer-bg"
            style={{
              marginLeft: 'calc(50% - 50vw)',
              marginRight: 'calc(50% - 50vw)',
            }}
          >
            <div className="section-x section-y section-inner mx-auto py-10 text-center md:py-14">
              <div className="mx-auto max-w-[820px]">
                <h3 className="text-foreground mx-auto mb-6 max-w-[820px] text-center text-[22px] leading-[1.2] font-bold tracking-wide uppercase sm:text-[26px] lg:mb-8 lg:text-[32px]">
                  {t('problem.originHeading')}
                </h3>

                <div className="border-border mx-auto mt-2 hidden w-1/2 border-t sm:block" />

                <Typography
                  variant="paragraph"
                  as="p"
                  className="text-foreground/60 mx-auto mt-4 max-w-[720px]"
                >
                  {t('problem.originBody')}
                </Typography>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
