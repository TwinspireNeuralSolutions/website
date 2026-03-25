'use client'

import Image from 'next/image'
import { Typography } from '@/components/ui/typography'
import { AnimateIn } from '@/components/ui/animate-in'
import { useTranslation } from '@/i18n'

/**
 * AboutSection — "This Started With One Injury. Then a Second."
 *
 * Two-column layout on desktop:
 *   Left  (~55%): Large bold headline + three italic body paragraphs
 *   Right (~45%): Portrait photo of Pouya on the football pitch
 *
 * Stacks single-column on mobile (text above, image below).
 */
export function AboutSection() {
  const { t } = useTranslation()

  return (
    <section
      id="about"
      aria-labelledby="about-heading"
      className="bg-background relative z-10 w-full"
    >
      <div className="section-x section-y section-inner mx-auto">
        <div className="flex flex-col gap-10 md:flex-row md:items-center md:gap-16 lg:gap-20">
          {/* ── Left: text ── */}
          <AnimateIn
            variant="slideLeft"
            className="flex flex-col gap-6 md:flex-1"
          >
            <Typography
              id="about-heading"
              variant="title"
              as="h2"
              className="text-[32px] leading-[1.1] sm:text-[40px] lg:text-[48px]"
            >
              {t('about.headline')}
            </Typography>

            <div className="flex flex-col gap-5">
              <p className="text-foreground/65 text-[15px] leading-[1.75] italic sm:text-base">
                {t('about.p1')}
              </p>
              <p className="text-foreground/65 text-[15px] leading-[1.75] italic sm:text-base">
                {t('about.p2')}
              </p>
              <p className="text-foreground/65 text-[15px] leading-[1.75] italic sm:text-base">
                {t('about.p3')}
              </p>
            </div>
          </AnimateIn>

          {/* ── Right: image ── */}
          <AnimateIn
            variant="slideRight"
            delay={0.15}
            className="relative w-full overflow-hidden rounded-2xl shadow-md md:w-[42%] md:shrink-0 lg:w-[40%]"
          >
            <Image
              src="/founder.jpg"
              alt={t('about.imageAlt')}
              width={700}
              height={933}
              className="h-auto w-full object-cover"
              sizes="(max-width: 768px) 100vw, 42vw"
            />
          </AnimateIn>
        </div>
      </div>
    </section>
  )
}
