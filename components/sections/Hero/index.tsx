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
        className="absolute inset-0 object-cover object-[50%_30%] md:object-[55%_10%]"
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
        className="absolute inset-0 z-10 flex items-center justify-center px-4 py-6 will-change-transform sm:px-6 sm:py-8 md:px-8 md:py-10 lg:px-10 lg:py-12"
      >
        <div className="mx-auto flex w-full max-w-3xl flex-col items-center gap-2 text-center sm:gap-2 md:gap-2 lg:gap-3">
          {/* ── Headline ── */}
          <AnimateIn variant="fadeUp" immediate>
            <h1 className="text-center text-[18px] leading-[1.15] font-extrabold tracking-wide break-words whitespace-normal text-white/90 uppercase sm:text-[22px] md:text-[28px] md:whitespace-nowrap lg:text-[36px] xl:text-[40px]">
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
              className="mx-auto mt-2 mb-2 max-w-[720px] text-center md:max-w-none"
              as="div"
            >
              <span className="flex flex-wrap justify-center gap-3 text-[12px] tracking-wider text-[#C0BEC7] uppercase md:flex-nowrap">
                {dataTypes.map((d, i) => (
                  <span key={i} className="font-semibold whitespace-nowrap">
                    {d}
                    {i < dataTypes.length - 1 ? '.' : ''}
                  </span>
                ))}
              </span>

              <span className="mt-3 block text-[14px] leading-[1.6] text-white/90">
                {t('hero.valueProp')}
              </span>

              <span className="mt-2 block pt-1 text-[13px] leading-[1.4] font-semibold text-[#C0BEC7] lowercase">
                {t('hero.credibility')}
              </span>
            </Typography>
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
