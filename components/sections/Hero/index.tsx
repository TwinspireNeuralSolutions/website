'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useParams } from 'next/navigation'
import { BackgroundVideo } from '@/components/ui/background-video'
import { Button } from '@/components/ui/button'
import { AnimateIn } from '@/components/ui/animate-in'
import { useTranslation } from '@/i18n'

/**
 * HeroSection — Full-viewport split hero.
 *
 * Desktop layout (5 layers, bottom → top):
 *   1. Solid primary-blue base fills entire viewport
 *   2. Full-viewport ambient video (z-1) — visible on BOTH sides
 *   3. Football player image clipped to the right ~42% via diagonal polygon
 *      with a short gradient at its left edge blending into blue
 *   4. Bottom vignette for audience-tag readability
 *   5. UI chrome — navbar + headline + CTA + audience tags
 *
 * Mobile layout:
 *   Full-bleed image + light left→right overlay (shows the image)
 *   + a second ambient video at lower opacity layered over the image
 */
export function HeroSection() {
  const { t } = useTranslation()
  const { locale } = useParams<{ locale: string }>()

  return (
    <section className="relative h-svh min-h-[600px] w-full overflow-hidden">
      {/* ── Layer 1: Primary blue base ── */}
      <div className="bg-primary absolute inset-0" />

      {/* ── Layer 2: Ambient video — full-viewport ──
           Visible on the solid blue left AND the image right side.
           Desktop: 0.20 opacity for clear motion effect.            */}
      <BackgroundVideo src="/hero-video.mp4" opacity={0.4} className="z-[1]" />

      {/* ══════════ MOBILE ══════════
           Full-bleed image behind a light gradient overlay so the
           player stays visible. A secondary video adds texture.    */}
      <div className="absolute inset-0 z-[2] md:hidden">
        {/* Full-bleed player image — centered slightly right and from top */}
        <Image
          src="/hero-image.jpg"
          alt="Football player kicking ball in stadium"
          fill
          className="object-cover object-[55%_0%]"
          priority
          quality={90}
        />
        {/* Low-opacity primary wash — image stays fully visible */}
        <div className="bg-primary/45 absolute inset-0" />
        {/* Subtle video texture over the image */}
        <BackgroundVideo
          src="/hero-video.mp4"
          opacity={0.3}
          className="z-[3]"
        />
      </div>

      {/* ══════════ DESKTOP ══════════
           Image is 70% wide, pinned to the right.
           Diagonal clip keeps the angled split line.
           Edge gradient blends left into the primary blue panel.    */}
      <div
        className="absolute top-0 right-0 bottom-0 z-[2] hidden w-[70%] md:block"
        style={{ clipPath: 'polygon(35% 0%, 100% 0%, 100% 100%, 20% 100%)' }}
      >
        <Image
          src="/hero-image.jpg"
          alt="Football player kicking ball in stadium"
          fill
          className="object-cover object-[36%_0%]"
          priority
          quality={100}
        />
        {/* Edge blend — solid blue → transparent in ~22% */}
        <div
          className="absolute inset-0"
          style={{
            background:
              'linear-gradient(106deg, #0802A3 0%, rgba(8,2,163,0.55) 8%, rgba(8,2,163,0.08) 16%, transparent 22%)',
          }}
        />
      </div>

      {/* ── Layer 4: Bottom vignette ── */}
      <div className="from-primary/45 absolute inset-0 z-[3] bg-gradient-to-t via-transparent to-transparent" />

      {/* ── Layer 5: UI content ── */}
      <div className="absolute inset-0 z-10 flex flex-col px-5 py-5 sm:px-10 sm:py-8 md:px-14 md:py-10 lg:px-20 lg:py-12">
        {/* ── Hero text + CTA — vertically centred ── */}
        <div className="flex flex-1 flex-col justify-center">
          {/*
            Max-width keeps text well within the blue panel on all breakpoints:
              - xs/sm  (<640px): full bleed (image behind, gradient overlay)
              - md     (768px):  max 380px  — comfortably left of the diagonal
              - lg     (1024px): max 460px
              - xl+    (1280px+): max 560px
          */}
          {/*
            Container tracks the blue panel at every breakpoint:
              mobile/sm : up to 85vw  — full bleed, text over image
              md (768px): 52vw ≈ 399px — just inside diagonal
              lg (1024px): 50vw ≈ 512px
              xl (1280px): 48vw ≈ 614px
            h1 uses CSS clamp so it scales continuously and always
            fits in exactly 2 lines without hard breakpoint jumps.
          */}
          <div className="w-full max-w-[85vw] sm:max-w-[80vw] md:max-w-[52vw] lg:max-w-[50vw] xl:max-w-[48vw]">
            <AnimateIn variant="fadeUp" immediate>
              <h1
                className="mb-4 font-sans font-bold tracking-tight text-white"
                style={{
                  fontSize: 'clamp(1.9rem, 3.2vw, 4.5rem)',
                  lineHeight: 1.05,
                }}
              >
                <span className="block">{t('hero.headlineLine1')}</span>
                <span className="block">{t('hero.headlineLine2')}</span>
              </h1>
            </AnimateIn>
            <AnimateIn variant="fadeUp" delay={0.15} immediate>
              <p className="mb-8 max-w-[280px] font-sans text-sm leading-relaxed text-white/70 sm:max-w-[320px] sm:text-base md:max-w-[340px] md:text-base lg:max-w-[400px] lg:text-lg">
                {t('hero.subtitle')}
              </p>
            </AnimateIn>
            <AnimateIn variant="fadeUp" delay={0.3} immediate>
              <Link href={`/${locale}/admin`}>
                <Button variant="white" size="lg" showIcon>
                  {t('hero.cta')}
                </Button>
              </Link>
            </AnimateIn>
          </div>
        </div>

        {/* ── Audience tags ── */}
        <AnimateIn variant="fadeIn" delay={0.5} immediate>
          <div className="flex items-center gap-2 text-xs sm:gap-3 sm:text-sm">
            <span className="font-medium text-white/90">
              {t('hero.audienceAthletes')}
            </span>
            <span className="text-white/30">•</span>
            <span className="font-medium text-white/90">
              {t('hero.audienceCoaches')}
            </span>
            <span className="text-white/30">•</span>
            <span className="font-medium text-white/90">
              {t('hero.audiencePhysio')}
            </span>
          </div>
        </AnimateIn>
      </div>
    </section>
  )
}
