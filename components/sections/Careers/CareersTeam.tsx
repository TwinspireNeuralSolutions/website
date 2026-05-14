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
      <div className="section-x section-inner mx-auto py-10 md:py-14">
        <AnimateIn variant="fadeUp">
          <div className="mx-auto flex max-w-3xl flex-col gap-4">
            <h2 className="mb-6 text-center text-[22px] leading-[1.2] tracking-wide uppercase sm:text-[26px] lg:mb-8 lg:text-[32px]">
              <span className="text-foreground font-bold">
                {t('joinUsPage.teamTitle')}
              </span>
            </h2>
            <p className="text-foreground/70 text-[14px] leading-[1.8] font-normal sm:text-[15px]">
              {t('joinUsPage.teamBody')}
            </p>
          </div>
        </AnimateIn>
      </div>
    </section>
  )
}
