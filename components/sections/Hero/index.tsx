'use client'

import Image from 'next/image'
import { useEffect, useRef } from 'react'
import { BackgroundVideo } from '@/components/ui/background-video'
import { Button } from '@/components/ui/button'
import { AnimateIn } from '@/components/ui/animate-in'
import { Typography } from '@/components/ui/typography'
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
  const dataTypes = t('hero.dataTypes')
    .split('.')
    .map((s) => s.trim())
    .filter(Boolean)
  const contentRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    let raf: number
    const onScroll = () => {
      raf = requestAnimationFrame(() => {
        if (!contentRef.current) return
        const y = window.scrollY
        // Apply parallax only on md+ screens to avoid large shifts on small devices
        if (window.innerWidth >= 768) {
          contentRef.current.style.transform = `translateY(${-y * 0.35}px)`
          contentRef.current.style.opacity = String(
            Math.max(0, 1 - y / (window.innerHeight * 0.85))
          )
        } else {
          contentRef.current.style.transform = 'none'
          contentRef.current.style.opacity = '1'
        }
      })
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => {
      window.removeEventListener('scroll', onScroll)
      cancelAnimationFrame(raf)
    }
  }, [])

  return (
    <section className="sticky top-0 z-0 min-h-screen w-full overflow-hidden">
      {/* ── Layer 1: Background image ── */}
      <Image
        src="/hero/image.png"
        alt="Football player kicking ball in stadium"
        fill
        sizes="100vw"
        className="absolute inset-0 object-cover object-[50%_20%] sm:object-[50%_25%] md:object-[55%_10%]"
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
        className="absolute inset-0 z-10 flex items-center justify-center px-4 py-6 will-change-transform sm:px-6 md:px-8 lg:px-10"
      >
        <div
          data-hero-container
          className="mx-auto flex w-full max-w-4xl flex-col items-center gap-8 px-4 text-center sm:-translate-y-2 sm:transform sm:gap-10 sm:px-6 md:-translate-y-3 md:transform md:gap-12 md:px-8 lg:translate-y-6 lg:transform lg:gap-3 lg:px-0"
        >
          {/* ── Headline ── */}
          <AnimateIn variant="fadeUp" immediate>
            <h1 className="mb-2 w-full max-w-[320px] text-[18px] leading-[1.08] font-extrabold tracking-tight break-words text-white/95 uppercase sm:mb-2 sm:max-w-[560px] sm:text-[20px] md:mb-2 md:max-w-[720px] md:text-[24px] lg:mb-1 lg:text-[30px] xl:text-[36px]">
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

          {/* (Deduplicated) */}
          {/* ── Data tags + Value proposition (single paragraph) ── */}
          <AnimateIn variant="fadeUp" delay={0.15} immediate>
            <Typography
              variant="paragraph"
              textColor="white"
              className="mx-auto mt-2 mb-4 max-w-[720px] text-center sm:mt-3 sm:mb-4 md:mt-4 md:mb-4 md:max-w-none lg:mt-4"
              as="p"
            >
              <span className="mb-4 flex flex-wrap justify-center gap-2 text-[12px] tracking-wider text-[#C0BEC7] uppercase sm:mb-6 md:mb-6 lg:mb-2">
                {dataTypes.map((d, i) => (
                  <span key={i} className="font-semibold whitespace-nowrap">
                    {d}
                    {i < dataTypes.length - 1 ? '.' : ''}
                  </span>
                ))}
              </span>

              <span className="mx-auto mt-4 block max-w-[340px] px-4 text-[16px] leading-[1.6] font-medium break-words whitespace-normal text-white sm:mt-5 sm:max-w-[560px] sm:px-0 md:mt-6 md:max-w-[720px] lg:mt-2">
                {t('hero.valueProp')}
              </span>

              <span className="mx-auto mt-5 block pt-1 text-[13px] leading-[1.4] font-semibold text-[#C0BEC7] lowercase sm:mt-6 md:mt-2 md:mt-6 lg:mt-2">
                {t('hero.credibility')}
              </span>
            </Typography>
          </AnimateIn>

          {/* ── CTA ── */}
          <AnimateIn variant="fadeUp" delay={0.4} immediate>
            <div className="mt-4 flex w-full justify-center sm:mt-6 sm:w-auto">
              <Button
                className="w-full max-w-[520px] sm:w-auto"
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
    </section>
  )
}
