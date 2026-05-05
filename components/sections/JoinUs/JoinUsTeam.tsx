'use client'

import Image from 'next/image'
import { AnimateIn } from '@/components/ui/animate-in'
import { useTranslation } from '@/i18n'

/**
 * JoinUsTeam — Single team photo left, title + description right.
 */
export function JoinUsTeam() {
  const { t } = useTranslation()

  return (
    <section className="bg-background relative z-10 w-full">
      <div className="section-x section-inner mx-auto pt-6 pb-4 md:pt-8 md:pb-6">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          {/* Text */}
          <AnimateIn variant="slideLeft">
            <div className="flex flex-col gap-6">
              <h2 className="text-foreground text-[22px] leading-[1.2] font-bold tracking-wide uppercase sm:text-[26px] lg:text-[32px]">
                {t('joinUsPage.teamTitle')}
              </h2>
              <p className="text-foreground/70 text-[16px] leading-[1.8] sm:text-[18px]">
                {t('joinUsPage.teamBody')}
              </p>
            </div>
          </AnimateIn>

          {/* Image */}
          <AnimateIn variant="slideRight">
            <div className="relative h-[320px] w-full sm:h-[420px]">
              <Image
                src="/ourTeam/teamwork.png"
                alt="Twinspire team"
                fill
                className="object-contain object-center"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>
          </AnimateIn>
        </div>
      </div>
    </section>
  )
}
