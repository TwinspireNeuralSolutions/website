'use client'

import Image from 'next/image'
import { BackgroundVideo } from '@/components/ui/background-video'
import { Button } from '@/components/ui/button'
import { AnimateIn } from '@/components/ui/animate-in'
import { useTranslation } from '@/i18n'

/**
 * HeroSection â€” Full-viewport professional hero.
 * Left-anchored content, background image revealed on the right,
 * directional gradient, headline, data pills, CTA, and stats strip.
 */
export function HeroSection() {
  const { t } = useTranslation()

  const dataPills = [
    {
      label: t('hero.pill.gps'),
      icon: (
        <svg
          className="h-3.5 w-3.5 flex-shrink-0"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
          />
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
          />
        </svg>
      ),
    },
    {
      label: t('hero.pill.strength'),
      icon: (
        <svg
          className="h-3.5 w-3.5 flex-shrink-0"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M13 10V3L4 14h7v7l9-11h-7z"
          />
        </svg>
      ),
    },
    {
      label: t('hero.pill.physio'),
      icon: (
        <svg
          className="h-3.5 w-3.5 flex-shrink-0"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
          />
        </svg>
      ),
    },
    {
      label: t('hero.pill.biomech'),
      icon: (
        <svg
          className="h-3.5 w-3.5 flex-shrink-0"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
          />
        </svg>
      ),
    },
    {
      label: t('hero.pill.neuro'),
      icon: (
        <svg
          className="h-3.5 w-3.5 flex-shrink-0"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
          />
        </svg>
      ),
    },
  ]

  return (
    <section className="relative h-svh min-h-[600px] w-full overflow-hidden">
      {/* ── Background image — anchored right ── */}
      <Image
        src="/hero/image.png"
        alt="Football player kicking ball in stadium"
        fill
        sizes="100vw"
        className="absolute inset-0 object-cover object-center"
        priority
        quality={90}
      />

      {/* ── Directional overlay: opaque left → transparent right ── */}
      <div
        className="from-primary via-primary/85 to-primary/20 absolute inset-0 z-[1] bg-gradient-to-r"
        aria-hidden="true"
      />

      {/* â”€â”€ Subtle bottom vignette â”€â”€ */}
      <div
        className="absolute inset-0 z-[2] bg-gradient-to-t from-black/40 via-transparent to-transparent"
        aria-hidden="true"
      />

      {/* â”€â”€ Ambient video texture â”€â”€ */}
      <BackgroundVideo src="/hero-video.mp4" opacity={0.12} className="z-[3]" />

      {/* â”€â”€ Content â”€â”€ */}
      <div className="absolute inset-0 z-10 flex flex-col items-center justify-center">
        <div className="mx-auto w-full max-w-4xl px-6 pt-20 pb-10 sm:px-10 lg:px-16">
          <div className="flex flex-col items-center text-center">
            {/* Headline */}
            <AnimateIn variant="fadeUp" immediate>
              <h1 className="text-[22px] leading-[1.2] font-extrabold tracking-tight text-white uppercase sm:text-[28px] md:text-[34px] lg:text-[40px] xl:text-[46px]">
                {t('hero.headlineLine1Start')}
                {t('hero.headlineLine1Highlight')}{' '}
                {t('hero.headlineLine2Start')}
                {t('hero.headlineLine2Highlight')}
              </h1>
            </AnimateIn>

            {/* Data pills */}
            <AnimateIn variant="fadeUp" delay={0.1} immediate>
              <div className="mt-6 flex flex-wrap justify-center gap-2">
                {dataPills.map((pill, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-1.5 rounded-full border border-white/20 bg-white/8 px-3 py-1.5 text-white/85 backdrop-blur-sm transition-all duration-200 hover:border-white/40 hover:bg-white/15"
                  >
                    {pill.icon}
                    <span className="text-xs font-medium">{pill.label}</span>
                  </div>
                ))}
              </div>
            </AnimateIn>

            {/* Value proposition + credibility */}
            <AnimateIn variant="fadeUp" delay={0.2} immediate>
              <p className="mx-auto mt-6 max-w-md text-sm leading-relaxed text-white/65 sm:text-base lg:text-[17px]">
                {t('hero.valueProp')} {t('hero.credibility')}
              </p>
            </AnimateIn>

            {/* CTA */}
            <AnimateIn variant="fadeUp" delay={0.3} immediate>
              <div className="mt-8">
                <Button
                  variant="white"
                  size="lg"
                  showIcon
                  onClick={() =>
                    document
                      .getElementById('contact')
                      ?.scrollIntoView({ behavior: 'smooth' })
                  }
                >
                  {t('hero.cta')}
                </Button>
              </div>
            </AnimateIn>
          </div>
        </div>
      </div>
    </section>
  )
}
