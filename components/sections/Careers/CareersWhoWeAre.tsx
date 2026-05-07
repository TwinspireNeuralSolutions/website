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
      <div className="section-x section-inner mx-auto py-16 md:py-24">
        {/* ── Problem ── */}
        <AnimateIn variant="fadeUp">
          <div className="mb-16 md:mb-20">
            <h2 className="text-primary mb-3 text-[18px] font-bold tracking-[0.08em] uppercase sm:text-[20px] lg:text-[22px]">
              {t('joinUsPage.whoWeAreTitle')}
            </h2>
            <div className="bg-primary/30 mb-6 h-px w-12" />
            <p className="text-foreground/75 text-[16px] leading-[1.9] sm:text-[17px]">
              {t('joinUsPage.problemBody')}
            </p>
          </div>
        </AnimateIn>

        {/* ── Our Team ── */}
        <AnimateIn variant="fadeUp" delay={0.1}>
          <div>
            <h2 className="text-primary mb-3 text-[18px] font-bold tracking-[0.08em] uppercase sm:text-[20px] lg:text-[22px]">
              {t('joinUsPage.ourTeamTitle')}
            </h2>
            <div className="bg-primary/30 mb-6 h-px w-12" />
            <p className="text-foreground/75 text-[16px] leading-[1.9] sm:text-[17px]">
              {t('joinUsPage.ourTeamBody1')}
            </p>
            <p className="text-foreground/75 mt-5 text-[16px] leading-[1.9] sm:text-[17px]">
              {t('joinUsPage.ourTeamBody2')}
            </p>
            <p className="text-foreground/75 mt-5 text-[16px] leading-[1.9] sm:text-[17px]">
              {t('joinUsPage.ourTeamBody3')}
            </p>

            {/* Quote */}
            <AnimateIn variant="fadeUp" delay={0.15}>
              <blockquote className="border-primary/20 mt-10 border-l-2 pl-5">
                <p className="text-foreground/60 text-[15px] leading-[1.8] italic sm:text-[16px]">
                  &ldquo;{t('joinUsPage.ourTeamQuote')}&rdquo;
                </p>
              </blockquote>
            </AnimateIn>
          </div>
        </AnimateIn>
      </div>
    </section>
  )
}
