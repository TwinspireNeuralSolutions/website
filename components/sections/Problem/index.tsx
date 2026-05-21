'use client'

import { Typography } from '@/components/ui/typography'
import {
  AnimateIn,
  StaggerContainer,
  StaggerItem,
} from '@/components/ui/animate-in'
import { useTranslation } from '@/i18n'

export function ProblemSection() {
  const { t } = useTranslation()

  const items = [
    {
      key: 'one',
      number: '1',
      side: 'left',
      title: t('problem.block1Title'),
      body: t('problem.p1'),
    },
    {
      key: 'two',
      number: '2',
      side: 'right',
      title: t('problem.block2Title'),
      body: t('problem.p2'),
    },
    {
      key: 'three',
      number: '3',
      side: 'left',
      title: t('problem.block3Title'),
      body: t('problem.p3'),
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
        <AnimateIn variant="headingReveal">
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

        {/* Cards — 1 left, 2 right, 3 left */}
        <div className="mx-auto my-10 mt-14 max-w-7xl">
          <StaggerContainer
            className="flex flex-col gap-10"
            stagger={0.15}
            delayChildren={0.05}
          >
            {items.map((item) => (
              <StaggerItem
                key={item.key}
                className={item.side === 'right' ? 'flex justify-end' : 'flex justify-start'}
              >
                <div className={`flex flex-col gap-4 border-l border-[#1433C8]/40 pt-1 pl-3 w-full sm:w-1/2`}>
                  <span className="text-primary text-[10px] font-semibold tracking-[0.25em] uppercase opacity-50">
                    {item.number}
                  </span>
                  <Typography
                    variant="heading"
                    as="h3"
                    textColor="default"
                    className="uppercase"
                  >
                    {item.title}
                  </Typography>
                  <Typography
                    variant="paragraph"
                    as="p"
                    className="text-foreground/60 text-justify leading-[1.8] [hyphens:auto]"
                  >
                    {item.body}
                  </Typography>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
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
              <AnimateIn variant="fadeUp">
                <div className="mx-auto max-w-[820px]">
                  <h3 className="text-foreground mx-auto mb-6 max-w-[820px] text-center text-[22px] leading-[1.2] font-bold tracking-wide uppercase sm:text-[26px] lg:mb-8 lg:text-[32px]">
                    {t('problem.originHeading')}
                  </h3>

                  <div className="border-border mx-auto mt-2 hidden w-1/2 border-t sm:block" />

                  <Typography
                    variant="paragraph"
                    as="p"
                    className="text-foreground/70 mx-auto mt-4 max-w-[720px]"
                  >
                    {t('problem.originBody')}
                  </Typography>
                </div>
              </AnimateIn>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
