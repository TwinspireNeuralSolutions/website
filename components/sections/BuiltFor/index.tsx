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
    <section id="built-for" className="relative z-10 w-full bg-white">
      <div className="section-x section-y section-inner mx-auto">
        {/* Heading */}
        <AnimateIn variant="fadeUp">
          <Typography
            variant="title"
            as="h2"
            textColor="default"
            className="mb-10 text-left lg:mb-14"
          >
            <span className="block">{t('builtFor.headingLine1')}</span>
            <span className="block">{t('builtFor.headingLine2')}</span>
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
