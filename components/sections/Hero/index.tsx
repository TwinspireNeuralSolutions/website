'use client'

import Image from 'next/image'
import {
  MapPin,
  Zap,
  ClipboardList,
  Ruler,
  Activity,
  Brain,
} from 'lucide-react'
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
const DATA_PILLS = [
  { icon: MapPin, key: 'hero.pill.gps' },
  { icon: Zap, key: 'hero.pill.strength' },
  { icon: ClipboardList, key: 'hero.pill.physio' },
  { icon: Ruler, key: 'hero.pill.biomechanical' },
  { icon: Activity, key: 'hero.pill.neuromuscular' },
  { icon: Brain, key: 'hero.pill.cognitive' },
] as const

export function HeroSection() {
  const { t } = useTranslation()

  return (
    <section className="relative h-svh min-h-[500px] w-full overflow-hidden sm:min-h-[600px]">
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
      <div className="bg-primary/70 absolute inset-0 z-[1]" />

      {/* ── Layer 3: Ambient video texture ── */}
      <BackgroundVideo src="/hero-video.mp4" opacity={0.25} className="z-[2]" />

      {/* ── Layer 4: Bottom vignette ── */}
      <div className="from-primary/55 absolute inset-0 z-[3] bg-gradient-to-t via-transparent to-transparent" />

      {/* ── Layer 5: UI content — parallax drift on scroll ── */}
      <div className="absolute inset-0 z-10 flex items-center justify-center px-8 py-6 sm:px-10 sm:py-8 md:px-8 md:py-10 lg:px-10 lg:py-12">
        <div className="mx-auto flex w-full max-w-5xl flex-col items-center gap-0 pt-16 text-center sm:pt-20 md:pt-24 lg:pt-28">
          {/* ── Headline ── */}
          <AnimateIn variant="fadeUp" immediate>
            <h1 className="mb-10 text-center text-[28px] leading-[1.15] font-extrabold tracking-wide break-words whitespace-normal text-white uppercase sm:mb-12 sm:text-[32px] md:text-[38px] md:whitespace-nowrap lg:mb-6 lg:text-[44px] xl:text-[50px]">
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

          {/* ── Data pills — 2×3 icon grid, hidden mobile+sm, visible md+ ── */}
          <AnimateIn variant="fadeUp" delay={0.15} immediate>
            <div className="mb-10 hidden flex-wrap justify-center gap-2 md:mb-12 md:flex md:gap-2.5 lg:mb-5">
              {DATA_PILLS.map(({ icon: Icon, key }) => (
                <span
                  key={key}
                  className="flex items-center gap-2 rounded-full border border-white/30 bg-white/10 px-3 py-2 text-xs text-white/90 uppercase backdrop-blur-sm"
                >
                  <Icon size={13} className="shrink-0 opacity-80" />
                  {t(key)}
                </span>
              ))}
            </div>
          </AnimateIn>

          {/* ── Value proposition ── */}
          <AnimateIn variant="fadeUp" delay={0.25} immediate>
            <p className="mx-auto mb-6 max-w-2xl px-2 text-base leading-relaxed text-white/90 sm:mb-8 sm:text-lg lg:mb-4 lg:text-base">
              {t('hero.valueProp')}
            </p>
          </AnimateIn>

          {/* ── Credibility subtext ── */}
          <AnimateIn variant="fadeUp" delay={0.32} immediate>
            <p className="mb-8 text-base text-white/90 sm:mb-10 sm:text-lg lg:mb-5 lg:text-base">
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
