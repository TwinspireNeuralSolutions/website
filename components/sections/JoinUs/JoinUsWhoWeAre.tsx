'use client'

import { AnimateIn } from '@/components/ui/animate-in'
import { useTranslation } from '@/i18n'

/**
 * JoinUsWhoWeAre — Centred layout: large heading + body paragraphs.
 */
export function JoinUsWhoWeAre() {
  const { t } = useTranslation()

  return (
    <section className="bg-background relative z-10 w-full">
      <div className="section-x section-inner mx-auto py-16 md:py-20">
        <div className="mx-auto max-w-3xl text-center">
          <AnimateIn variant="fadeUp">
            <h2 className="text-foreground mb-10 text-center text-[22px] leading-[1.2] font-bold tracking-wide uppercase sm:text-[26px] lg:mb-8 lg:text-[32px]">
              {t('joinUsPage.whoWeAreTitle')}
            </h2>
          </AnimateIn>
          <AnimateIn variant="fadeUp" delay={0.1}>
            <div className="flex flex-col gap-7">
              <p className="text-foreground/70 text-[16px] leading-[1.9] sm:text-[18px]">
                {t('joinUsPage.intro.p1')}
              </p>
            </div>
          </AnimateIn>
        </div>
      </div>
    </section>
  )
}
