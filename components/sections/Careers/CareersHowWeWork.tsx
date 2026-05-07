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
    <section className="bg-background border-border relative z-10 w-full border-t border-b">
      <div className="section-x section-inner mx-auto py-16 md:py-24">
        {/* Section label */}
        <AnimateIn variant="fadeUp">
          <div className="mb-12 lg:mb-16">
            <h2 className="text-primary mb-3 text-[18px] font-bold tracking-[0.08em] uppercase sm:text-[20px] lg:text-[22px]">
              {t('joinUsPage.howWeWorkTitle')}
            </h2>
            <div className="bg-primary/30 h-px w-12" />
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
                <p className="text-foreground/65 text-[15px] leading-[1.8]">
                  {t(descKey)}
                </p>
              </div>
            </AnimateIn>
          ))}
        </div>
      </div>
    </section>
  )
}
