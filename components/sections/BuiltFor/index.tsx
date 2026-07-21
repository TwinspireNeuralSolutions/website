'use client'

import { Typography } from '@/components/ui/typography'
import {
  AnimateIn,
  StaggerContainer,
  StaggerItem,
} from '@/components/ui/animate-in'
import { useTranslation } from '@/i18n'
import { BuiltForCard } from './BuiltForCard'

/**
 * BuiltForSection — "Built for the People Who Keep Footballers on the Pitch."
 *
 * Three full-bleed portrait image cards (same pattern as TeamMember) each
 * representing a core audience: Footballers, Coaches & Performance Staff,
 * and Physiotherapists.
 *
 * Grid collapses to single column on mobile, 3 columns on md+.
 */
export function BuiltForSection() {
  const { t } = useTranslation()

  const cards = [
    {
      image: '/fotballers.jpg',
      overlayOpacity: 0.35,
      title: t('builtFor.footballers.title'),
      description: t('builtFor.footballers.description'),
    },
    {
      image: '/coaches.jpg',
      overlayOpacity: 0.65,
      title: t('builtFor.coaches.title'),
      description: t('builtFor.coaches.description'),
    },
    {
      image: '/physio.png',
      overlayOpacity: 0.6,
      title: t('builtFor.physio.title'),
      description: t('builtFor.physio.description'),
    },
  ]

  return (
    <section id="built-for" className="bg-background relative z-10 w-full">
      <div className="section-x section-y section-inner relative mx-auto !pt-0">
        {/* Heading + Subtitle */}
        <AnimateIn variant="headingReveal">
          <h2 className="mb-4 text-center text-[22px] leading-[1.2] tracking-wide uppercase sm:text-[26px] lg:mb-6 lg:text-[32px]">
            <span className="text-foreground font-bold">
              {t('builtFor.heading')}
            </span>{' '}
            <span className="text-primary font-bold">
              {t('builtFor.headingAccent')}
            </span>
          </h2>
        </AnimateIn>

        <AnimateIn variant="fadeUp">
          <Typography
            variant="subtitle"
            as="p"
            textColor="muted"
            className="mx-auto mb-10 max-w-[720px] text-center lg:mb-14"
          >
            {t('builtFor.subtitle')}
          </Typography>
        </AnimateIn>

        {/* Cards grid: 1 col mobile → 3 col md+ */}
        <StaggerContainer
          className="grid grid-cols-1 gap-6 md:grid-cols-3 md:gap-8"
          stagger={0.12}
        >
          {cards.map((card) => (
            <StaggerItem key={card.title}>
              <BuiltForCard
                title={card.title}
                description={card.description}
                image={card.image}
                overlayOpacity={card.overlayOpacity}
              />
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>
  )
}
