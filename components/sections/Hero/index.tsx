'use client'

import Image from 'next/image'
import { useEffect, useRef } from 'react'
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
  const contentRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    let raf: number
    const onScroll = () => {
      raf = requestAnimationFrame(() => {
        if (!contentRef.current) return
        const y = window.scrollY
        contentRef.current.style.transform = `translateY(${-y * 0.35}px)`
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
    <section className="sticky top-0 z-0 h-svh min-h-[500px] w-full overflow-hidden sm:min-h-[600px]">
      {/* ── Layer 1: Background image ── */}
      <Image
        src="/hero/image.png"
        alt="Football player kicking ball in stadium"
        fill
        sizes="100vw"
        className="absolute inset-0 object-cover object-[50%_20%] md:object-[55%_0%]"
        priority
        quality={90}
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
        className="absolute inset-0 z-10 flex items-center justify-center px-5 py-16 will-change-transform sm:px-8 sm:py-20 md:px-10 md:py-24 lg:px-12 lg:py-28"
      >
        <div className="mx-auto flex w-full max-w-3xl flex-col items-center gap-2 text-center sm:gap-2.5 md:gap-3 lg:gap-4">
          {/* ── Headline ── */}
          <AnimateIn variant="fadeUp" immediate>
            <h1 className="text-[18px] leading-[1.15] font-extrabold tracking-wide text-white/90 uppercase sm:text-[22px] md:text-[28px] md:whitespace-nowrap lg:text-[36px] xl:text-[40px]">
              {t('hero.headlineLine1Start')}
              <span className="text-white">
                {t('hero.headlineLine1Highlight')}
              </span>
              <br />
              {t('hero.headlineLine2Start')}
              <span className="text-white">
                {t('hero.headlineLine2Highlight')}
              </span>
            </h1>
          </AnimateIn>

          {/* ── Data tags ── */}
          <AnimateIn variant="fadeUp" delay={0.1} immediate>
            <p className="text-[10px] font-bold tracking-[0.25em] text-white/70 uppercase md:text-[11px]">
              {t('hero.dataTypes')}
            </p>
          </AnimateIn>

          {/* ── Value proposition ── */}
          <AnimateIn variant="fadeUp" delay={0.2} immediate>
            <p className="mx-auto -mt-1 -mb-1 max-w-[260px] text-[10px] leading-[1.6] text-white/90 sm:max-w-[320px] sm:text-[11px] md:max-w-[420px] md:text-xs md:leading-[1.7] lg:max-w-[500px] lg:text-sm">
              {t('hero.valueProp')}
            </p>
          </AnimateIn>

          {/* ── Credibility ── */}
          <AnimateIn variant="fadeUp" delay={0.3} immediate>
            <p className="text-[8px] font-medium tracking-wide text-white/60 italic sm:text-[9px] md:text-[11px] lg:text-xs">
              {t('hero.credibility')}
            </p>
          </AnimateIn>

          {/* ── CTA ── */}
          <AnimateIn variant="fadeUp" delay={0.4} immediate>
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
          </AnimateIn>
        </div>
      </div>
    </section>
  )
}
