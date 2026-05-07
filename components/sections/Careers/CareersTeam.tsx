'use client'

import { AnimateIn } from '@/components/ui/animate-in'
import { useTranslation } from '@/i18n'

/**
 * JoinUsTeam — Team description, text-only layout.
 */
export function CareersTeam() {
  const { t } = useTranslation()

  return (
    <section className="bg-background relative z-10 w-full">
      <div className="section-x section-inner mx-auto pt-6 pb-4 md:pt-8 md:pb-6">
        <AnimateIn variant="fadeUp">
          <div className="mx-auto flex max-w-3xl flex-col gap-4">
            <h2 className="text-primary mb-3 text-[18px] font-bold tracking-[0.08em] uppercase sm:text-[20px] lg:text-[22px]">
              {t('joinUsPage.teamTitle')}
            </h2>
            <div className="bg-primary/30 mb-6 h-px w-12" />
            <p className="text-foreground/70 text-[16px] leading-[1.8] sm:text-[18px]">
              {t('joinUsPage.teamBody')}
            </p>
          </div>
        </AnimateIn>
      </div>
    </section>
  )
}
