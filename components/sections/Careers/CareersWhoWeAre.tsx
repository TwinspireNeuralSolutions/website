'use client'

import { AnimateIn } from '@/components/ui/animate-in'
import { useTranslation } from '@/i18n'

/**
 * CareersWhoWeAre — "The Problem We're Solving" + "Our Team" sections.
 */
export function CareersWhoWeAre() {
  const { t } = useTranslation()

  return (
    <section className="bg-background relative z-10 w-full">
      <div className="section-x section-inner mx-auto pt-16 pb-0 md:pt-24">
        {/* ── Problem ── */}
        <AnimateIn variant="fadeUp">
          <div className="mb-16 md:mb-20">
            <h2 className="mb-3 text-[22px] leading-[1.2] font-bold tracking-wide uppercase sm:text-[26px] lg:text-[32px]">
              {t('joinUsPage.whoWeAreTitle')}
            </h2>
            <div className="bg-primary mb-8 h-[3px] w-12 rounded-full" />

            {/* Lead — the hook */}
            <p className="text-foreground mb-5 text-[17px] leading-[1.7] font-semibold sm:text-[19px]">
              {t('joinUsPage.problemLead')}
            </p>

            {/* Body paragraphs */}
            <div className="space-y-3">
              <p className="text-foreground/70 text-justify text-[14px] leading-[1.8] font-normal [hyphens:auto] sm:text-[15px]">
                {t('joinUsPage.problemPara1')}
              </p>
              <p className="text-foreground/70 text-justify text-[14px] leading-[1.8] font-normal [hyphens:auto] sm:text-[15px]">
                {t('joinUsPage.problemPara2')}
              </p>
            </div>
          </div>
        </AnimateIn>

        {/* Section separator */}
        <div className="border-border border-t" />

        {/* ── Our Team ── */}
        <AnimateIn variant="fadeUp" delay={0.1}>
          <div className="pt-16 md:pt-20">
            {/* Question headline */}
            <h2 className="mb-3 text-[22px] leading-[1.2] font-bold tracking-wide uppercase sm:text-[26px] lg:text-[32px]">
              {t('joinUsPage.ourTeamTitle')}
            </h2>
            <div className="bg-primary mb-6 h-[3px] w-12 rounded-full" />

            {/* Lead paragraph */}
            <p className="text-foreground mb-5 text-[17px] leading-[1.7] font-semibold sm:text-[18px]">
              {t('joinUsPage.ourTeamBody1')}
            </p>

            {/* Detail paragraphs — 2-col on large */}
            <div className="grid gap-10 lg:grid-cols-2">
              <div className="py-2">
                <p className="text-foreground/70 text-justify text-[14px] leading-[1.8] font-normal [hyphens:auto] sm:text-[15px]">
                  {t('joinUsPage.ourTeamBody2')}
                </p>
              </div>
              <div className="py-2">
                <p className="text-foreground/70 text-justify text-[14px] leading-[1.8] font-normal [hyphens:auto] sm:text-[15px]">
                  {t('joinUsPage.ourTeamBody3')}
                </p>
              </div>
            </div>

            {/* Pull quote */}
            <AnimateIn variant="fadeUp" delay={0.15}>
              <div className="bg-primary/5 border-primary/15 mt-10 rounded-xl border p-8 text-center">
                <p className="text-primary text-[14px] leading-[1.8] font-normal italic sm:text-[15px]">
                  &ldquo;{t('joinUsPage.ourTeamQuote')}&rdquo;
                </p>
              </div>
            </AnimateIn>
          </div>
        </AnimateIn>
      </div>
    </section>
  )
}
