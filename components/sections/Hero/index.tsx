'use client'

import {
  MapPin,
  Zap,
  ClipboardList,
  Ruler,
  Activity,
  Brain,
} from 'lucide-react'
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
    <section className="relative min-h-[600px] w-full sm:min-h-[680px] md:h-[80vh] md:min-h-[700px] lg:h-svh">
      {/* ── Bottom vignette ── */}
      <div className="from-primary/55 absolute inset-0 z-[3] bg-gradient-to-t via-transparent to-transparent" />

      {/* ── UI content ── */}
      <div className="absolute inset-0 z-10 flex items-center justify-center px-6 pt-16 pb-6 sm:px-10 sm:pt-20 sm:pb-8 md:px-8 md:pt-20 md:pb-10 lg:px-10 lg:pt-20 lg:pb-12">
        <div className="mx-auto flex w-full max-w-5xl flex-col items-center gap-0 text-center">
          {/* ── Headline ── */}
          <AnimateIn variant="fadeUp" immediate>
            <h1 className="mb-6 text-center text-[24px] leading-[1.2] font-extrabold tracking-wide break-words whitespace-normal text-white uppercase sm:mb-12 sm:text-[36px] md:mb-10 md:text-[32px] md:whitespace-nowrap lg:mb-6 lg:text-[38px] xl:text-[44px]">
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
            <p className="mx-auto mb-5 max-w-2xl px-2 text-sm leading-relaxed text-white/90 sm:mb-10 sm:text-base md:mb-6 md:text-lg lg:mb-4 lg:text-base">
              {t('hero.valueProp')}
            </p>
          </AnimateIn>

          {/* ── Credibility subtext ── */}
          <AnimateIn variant="fadeUp" delay={0.32} immediate>
            <p className="mb-6 text-sm text-white/90 sm:mb-12 sm:text-base md:text-lg lg:mb-5 lg:text-base">
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
