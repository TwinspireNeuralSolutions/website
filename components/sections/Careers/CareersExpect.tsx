'use client'

import { AnimateIn } from '@/components/ui/animate-in'
import { useTranslation } from '@/i18n'

const ITEMS = [
  {
    titleKey: 'joinUsPage.expect1Title',
    descKey: 'joinUsPage.expect1Desc',
    delay: 0,
  },
  {
    titleKey: 'joinUsPage.expect2Title',
    descKey: 'joinUsPage.expect2Desc',
    delay: 0.07,
  },
  {
    titleKey: 'joinUsPage.expect3Title',
    descKey: 'joinUsPage.expect3Desc',
    delay: 0.14,
  },
  {
    titleKey: 'joinUsPage.expect4Title',
    descKey: 'joinUsPage.expect4Desc',
    delay: 0.21,
  },
  {
    titleKey: 'joinUsPage.expect5Title',
    descKey: 'joinUsPage.expect5Desc',
    delay: 0.28,
  },
  {
    titleKey: 'joinUsPage.expect6Title',
    descKey: 'joinUsPage.expect6Desc',
    delay: 0.35,
  },
] as const

/**
 * JoinUsExpect — Six items listing what a team member can expect.
 */
export function CareersExpect() {
  const { t } = useTranslation()

  return (
    <section className="bg-background border-border relative z-10 w-full border-t border-b">
      <div className="section-x section-inner mx-auto py-10 md:py-14">
        <AnimateIn variant="fadeUp">
          <div className="mb-12 text-center lg:mb-16">
            <h2 className="text-primary mb-3 text-[18px] font-bold tracking-[0.08em] uppercase sm:text-[20px] lg:text-[22px]">
              {t('joinUsPage.expectTitle')}
            </h2>
            <div className="bg-primary/30 mx-auto h-px w-12" />
          </div>
        </AnimateIn>

        <div className="grid gap-x-10 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
          {ITEMS.map(({ titleKey, descKey, delay }) => (
            <AnimateIn key={titleKey} variant="fadeUp" delay={delay}>
              <div className="flex flex-col gap-2">
                <h3 className="text-foreground text-[17px] leading-snug font-bold">
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
