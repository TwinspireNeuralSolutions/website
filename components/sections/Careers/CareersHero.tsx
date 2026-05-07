'use client'

import Image from 'next/image'
import { BackgroundVideo } from '@/components/ui/background-video'
import { Button } from '@/components/ui/button'
import { AnimateIn } from '@/components/ui/animate-in'
import { useTranslation } from '@/i18n'

/**
 * JoinUsHero — Static hero with team background, large title, subtitle and CTA.
 */
export function CareersHero() {
  const { t } = useTranslation()

  return (
    <section className="relative min-h-[420px] w-full overflow-hidden sm:min-h-[500px]">
      {/* ── Layer 1: Background image ── */}
      <Image
        src="/hero/image.png"
        alt="Twinspire — Join Us"
        fill
        sizes="100vw"
        className="absolute inset-0 object-cover object-[50%_10%] md:object-[55%_0%]"
        priority
        quality={90}
      />

      {/* ── Layer 2: Primary blue wash ── */}
      <div className="bg-primary/55 absolute inset-0 z-[1]" />

      {/* ── Layer 3: Ambient video texture ── */}
      <BackgroundVideo src="/hero-video.mp4" opacity={0.25} className="z-[2]" />

      {/* ── Layer 4: Bottom vignette ── */}
      <div className="from-primary/45 absolute inset-0 z-[3] bg-gradient-to-t via-transparent to-transparent" />

      {/* ── UI content ── */}
      <div className="absolute inset-0 z-10 flex items-center justify-center px-6 pt-20 pb-10 sm:px-10 md:px-16">
        <div className="mx-auto flex w-full max-w-5xl flex-col items-center gap-2 text-center">
          {/* ── Headline ── */}
          <AnimateIn variant="fadeUp" immediate>
            <h1 className="text-[22px] leading-tight font-extrabold tracking-wide text-white uppercase sm:text-[28px] md:text-[34px] lg:text-[40px]">
              {t('nav.joinUs')}
            </h1>
          </AnimateIn>

          {/* ── Subtitle ── */}
          <AnimateIn variant="fadeUp" delay={0.15} immediate>
            <p className="text-[14px] leading-[1.5] text-white/90 sm:text-[16px] md:text-[18px]">
              {t('joinUs.heroSubtitle')}
            </p>
          </AnimateIn>

          {/* ── CTA ── */}
          <AnimateIn variant="fadeUp" delay={0.4} immediate>
            <div className="mt-5">
              <Button
                variant="white"
                size="lg"
                showIcon
                onClick={() =>
                  document
                    .getElementById('open-roles')
                    ?.scrollIntoView({ behavior: 'smooth' })
                }
              >
                {t('joinUsPage.heroCta')}
              </Button>
            </div>
          </AnimateIn>
        </div>
      </div>
    </section>
  )
}
