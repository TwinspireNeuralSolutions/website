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
            <h2 className="mb-3 text-[22px] leading-[1.2] font-bold tracking-wide uppercase sm:text-[26px] lg:text-[32px]">
              {t('joinUsPage.teamTitle')}
            </h2>
            <div className="bg-primary mb-6 h-[3px] w-12 rounded-full" />
            <p className="text-foreground/70 text-[14px] leading-[1.8] font-normal sm:text-[15px]">
              {t('joinUsPage.teamBody')}
            </p>
          </div>
        </AnimateIn>
      </div>
    </section>
  )
}
