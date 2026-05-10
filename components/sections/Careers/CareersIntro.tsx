'use client'

import { AnimateIn } from '@/components/ui/animate-in'
import { useTranslation } from '@/i18n'

/**
 * JoinUsStatement — Large bold pull-quote shown immediately below the hero.
 */
export function CareersIntro() {
  const { t } = useTranslation()

  return (
    <section className="bg-background border-border w-full border-b">
      <div className="section-x section-inner mx-auto py-10 md:py-14">
        <AnimateIn variant="fadeUp">
          <p className="text-foreground mx-auto max-w-3xl text-center text-[22px] leading-[1.4] font-bold sm:text-[28px] lg:text-[34px]">
            {t('joinUs.heroSubtitle')}
          </p>
        </AnimateIn>
      </div>
    </section>
  )
}
