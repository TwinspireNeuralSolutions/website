'use client'

import Image from 'next/image'
import { AnimateIn } from '@/components/ui/animate-in'
import { useTranslation } from '@/i18n'

/**
 * CareersOurTeam — "What does a professional footballer have in common with an engineer?" section.
 */
export function CareersOurTeam() {
  const { t } = useTranslation()

  const title = t('joinUsPage.ourTeamTitle')
  const highlights = ['professional footballer', 'engineer?']
  const escapeRegExp = (s: string) => s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
  const titleParts = title.split(
    new RegExp(`(${highlights.map(escapeRegExp).join('|')})`, 'i')
  )

  return (
    <section className="bg-background relative z-10 w-full">
      <div className="section-x section-inner mx-auto py-16 md:py-24">

        {/* Headline */}
        <AnimateIn variant="fadeUp">
          <h2 className="mb-12 text-center text-[22px] leading-[1.2] tracking-wide uppercase sm:text-[26px] lg:mb-16 lg:text-[32px]">
            {titleParts.map((part, i) =>
              highlights.some((h) => h.toLowerCase() === part.toLowerCase()) ? (
                <span key={i} className="text-primary font-bold">{part}</span>
              ) : (
                <span key={i} className="text-foreground font-bold">{part}</span>
              )
            )}
          </h2>
        </AnimateIn>

        {/* Two-column: text left, image right */}
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-20">

          {/* Left — text */}
          <AnimateIn variant="slideLeft">
            <div className="flex flex-col gap-8 px-4 sm:px-0">
              <p className="text-foreground border-primary border-l-[3px] pl-5 text-[17px] leading-[1.7] font-semibold sm:text-[18px]">
                {t('joinUsPage.ourTeamBody1')}
              </p>
              <p className="text-foreground/70 text-justify text-[14px] leading-[1.9] font-normal [hyphens:auto] [word-spacing:-0.03em] sm:text-[15px]">
                {t('joinUsPage.ourTeamBody2')}
              </p>
              <p className="text-foreground/70 text-justify text-[14px] leading-[1.9] font-normal [hyphens:auto] [word-spacing:-0.03em] sm:text-[15px]">
                {t('joinUsPage.ourTeamBody3')}
              </p>
            </div>
          </AnimateIn>

          {/* Right — founder image */}
          <AnimateIn variant="slideRight">
            <div className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl">
              <Image
                src="/founder.jpg"
                alt="Twinspire founder"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>
          </AnimateIn>

        </div>
      </div>
    </section>
  )
}
