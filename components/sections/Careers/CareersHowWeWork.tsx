'use client'

import { AnimateIn } from '@/components/ui/animate-in'
import { useTranslation } from '@/i18n'

const CARDS = [
  {
    titleKey: 'joinUsPage.hww1Title',
    descKey: 'joinUsPage.hww1Desc',
    delay: 0,
  },
  {
    titleKey: 'joinUsPage.hww2Title',
    descKey: 'joinUsPage.hww2Desc',
    delay: 0.09,
  },
  {
    titleKey: 'joinUsPage.hww3Title',
    descKey: 'joinUsPage.hww3Desc',
    delay: 0.18,
  },
] as const

/**
 * CareersHowWeWork — Three value items describing how the team operates.
 */
export function CareersHowWeWork() {
  const { t } = useTranslation()

  return (
    <section className="bg-background relative z-10 w-full">
      <div className="section-x section-inner mx-auto pt-16 pb-6 md:pt-24 md:pb-8">
        <div className="border-border mb-16 border-t md:mb-20" />
        {/* Section label */}
        <AnimateIn variant="fadeUp">
          <div className="mb-12 lg:mb-16">
            <h2 className="mb-3 text-[22px] leading-[1.2] font-bold tracking-wide uppercase sm:text-[26px] lg:text-[32px]">
              {t('joinUsPage.howWeWorkTitle')}
            </h2>
            <div className="bg-primary h-[3px] w-12 rounded-full" />
          </div>
        </AnimateIn>

        {/* Cards */}
        <div className="grid gap-8 sm:grid-cols-3 sm:gap-10">
          {CARDS.map(({ titleKey, descKey, delay }) => (
            <AnimateIn key={titleKey} variant="fadeUp" delay={delay}>
              <div className="flex flex-col gap-4">
                <h3 className="text-foreground text-[17px] leading-snug font-bold">
                  {t(titleKey)}
                </h3>
                <p className="text-foreground/70 text-justify text-[14px] leading-[1.8] font-normal [hyphens:auto] sm:text-[15px]">
                  {t(descKey)}
                </p>
              </div>
            </AnimateIn>
          ))}
        </div>
        <div className="border-border mt-16 border-t md:mt-20" />
      </div>
    </section>
  )
}
