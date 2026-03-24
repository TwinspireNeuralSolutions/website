'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useRef } from 'react'
import { useParams } from 'next/navigation'
import { BackgroundVideo } from '@/components/ui/background-video'
import { Button } from '@/components/ui/button'
import { AnimateIn } from '@/components/ui/animate-in'
import { useTranslation } from '@/i18n'

/**
 * HeroSection — Full-viewport sticky hero with parallax text.
 *
 * The section is sticky (z-0). As the user scrolls, sections below
 * rise up and cover the hero from the bottom. The text content
 * drifts upward at ~35% of scroll speed — so it's the last thing
 * to disappear, staying readable for longer.
 */
export function HeroSection() {
  const { t } = useTranslation()
  const { locale } = useParams<{ locale: string }>()
  const contentRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    let raf: number
    const onScroll = () => {
      raf = requestAnimationFrame(() => {
        if (!contentRef.current) return
        const y = window.scrollY
        // Text drifts up at 35% of scroll speed — last to be covered
        contentRef.current.style.transform = `translateY(${-y * 0.35}px)`
        // Subtle fade as it exits
        contentRef.current.style.opacity = String(
          Math.max(0, 1 - y / (window.innerHeight * 0.85))
        )
      })
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => {
      window.removeEventListener('scroll', onScroll)
      cancelAnimationFrame(raf)
    }
  }, [])

  return (
    <section className="sticky top-0 z-0 h-svh min-h-[600px] w-full overflow-hidden">
      {/* ── Layer 1: Full-bleed player image ── */}
      <Image
        src="/hero-image.jpg"
        alt="Football player kicking ball in stadium"
        fill
        className="absolute inset-0 object-cover object-[55%_0%]"
        priority
        quality={95}
      />

      {/* ── Layer 2: Primary blue wash ── */}
      <div className="bg-primary/55 absolute inset-0 z-[1]" />

      {/* ── Layer 3: Ambient video texture ── */}
      <BackgroundVideo src="/hero-video.mp4" opacity={0.25} className="z-[2]" />

      {/* ── Layer 4: Bottom vignette ── */}
      <div className="from-primary/45 absolute inset-0 z-[3] bg-gradient-to-t via-transparent to-transparent" />

      {/* ── Layer 5: UI content — parallax drift on scroll ── */}
      <div
        ref={contentRef}
        className="absolute inset-0 z-10 flex flex-col px-5 py-5 will-change-transform sm:px-10 sm:py-8 md:px-14 md:py-10 lg:px-20 lg:py-12"
      >
        {/* ── Hero text + CTA — vertically centred ── */}
        <div className="flex flex-1 flex-col justify-center">
          <div className="w-full max-w-[85vw] sm:max-w-[540px] md:max-w-[600px] lg:max-w-[680px] xl:max-w-[760px]">
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
