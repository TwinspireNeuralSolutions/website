'use client'

import { AnimateIn } from '@/components/ui/animate-in'
import { useTranslation } from '@/i18n'

/**
 * CareersWhoWeAre — "The Problem We're Solving" section.
 */
export function CareersWhoWeAre() {
  const { t } = useTranslation()

  const title = t('joinUsPage.whoWeAreTitle')
  // Highlight "We're" in primary
  const titleParts = title.split(/(We're)/i)

  return (
    <section className="bg-background relative z-10 w-full">
      <div className="section-x section-inner mx-auto py-16 md:py-24">
        {/* Headline */}
        <AnimateIn variant="fadeUp">
          <h2 className="mb-12 text-center text-[22px] leading-[1.2] tracking-wide uppercase sm:text-[26px] lg:mb-16 lg:text-[32px]">
            {titleParts.map((part, i) =>
              /^we're$/i.test(part) ? (
                <span key={i} className="text-primary font-bold">
                  {part}
                </span>
              ) : (
                <span key={i} className="text-foreground font-bold">
                  {part}
                </span>
              )
            )}
          </h2>
        </AnimateIn>

        {/* Two-column: stat left, text right */}
        <div className="grid items-start gap-12 lg:grid-cols-[auto_1fr] lg:gap-20">
          {/* Left — "1 in 5" stat */}
          <AnimateIn variant="slideLeft">
            <div className="flex flex-col items-center lg:items-start">
              <span className="text-primary text-[80px] leading-none font-bold tracking-tight sm:text-[96px]">
                1 in 5
              </span>
              <p className="text-foreground/70 mt-2 max-w-[220px] text-center text-[16px] leading-[1.4] font-normal tracking-tight uppercase sm:text-[18px] lg:text-left">
                Footballers tears the same muscle twice.
              </p>
            </div>
          </AnimateIn>

          {/* Right — text */}
          <AnimateIn variant="slideRight">
            <p className="text-foreground/80 px-4 text-justify text-[15px] leading-[1.9] font-normal [hyphens:auto] [word-spacing:-0.03em] sm:px-0 sm:text-[16px]">
              {t('joinUsPage.problemLead')} {t('joinUsPage.problemPara1')}{' '}
              {t('joinUsPage.problemPara2')}
            </p>
          </AnimateIn>
        </div>
      </div>
    </section>
  )
}
