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
 * JoinUsHowWeWork — Three value cards describing how the team operates.
 */
export function JoinUsHowWeWork() {
  const { t } = useTranslation()

  return (
    <section className="relative z-10 w-full bg-[#f7f7f8]">
      <div className="section-x section-inner mx-auto py-16 md:py-24">
        <AnimateIn variant="fadeUp">
          <h2 className="text-foreground mb-12 text-center text-[22px] leading-[1.2] font-bold tracking-wide uppercase sm:text-[26px] lg:mb-16 lg:text-[32px]">
            {t('joinUsPage.howWeWorkTitle')}
          </h2>
        </AnimateIn>

        <div className="grid gap-6 sm:grid-cols-3">
          {CARDS.map(({ titleKey, descKey, delay }) => (
            <AnimateIn key={titleKey} variant="fadeUp" delay={delay}>
              <div className="flex h-full flex-col gap-5 rounded-2xl bg-white p-8 shadow-sm">
                <h3 className="text-foreground text-[20px] leading-snug font-bold">
                  {t(titleKey)}
                </h3>
                <p className="text-muted-foreground text-[15px] leading-relaxed">
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
