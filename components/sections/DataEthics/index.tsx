'use client'

import { useState } from 'react'
import { Typography } from '@/components/ui/typography'
import { AnimateIn } from '@/components/ui/animate-in'
import { useTranslation } from '@/i18n'
import { highlightLastWord } from '@/lib/utils'

/** Shield with check — Core Principles */
function ShieldCheckIcon() {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="text-primary"
      aria-hidden="true"
    >
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      <path d="m9 12 2 2 4-4" />
    </svg>
  )
}

/** Scale/balance — Governance & Compliance */
function ScaleIcon() {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="text-primary"
      aria-hidden="true"
    >
      <path d="M12 3v19" />
      <path d="M5 8h14" />
      <path d="M5 8l-2 8h6L5 8z" />
      <path d="M19 8l-2 8h6l-4-8z" />
      <path d="M10 3h4" />
    </svg>
  )
}

/** Alert triangle — Research Disclaimer */
function AlertTriangleIcon() {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="text-primary"
      aria-hidden="true"
    >
      <path d="M10.29 3.86 1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
      <line x1="12" y1="9" x2="12" y2="13" />
      <line x1="12" y1="17" x2="12.01" y2="17" />
    </svg>
  )
}

interface CardData {
  icon: React.ReactNode
  titleKey:
    | 'dataEthics.card1Title'
    | 'dataEthics.card2Title'
    | 'dataEthics.card3Title'
  bodyKey: 'dataEthics.card1' | 'dataEthics.card2' | 'dataEthics.card3'
}

/**
 * DataEthicsSection — Data & Research Ethics governance section.
 *
 * Clean layout:
 *   - Section label
 *   - Bold headline
 *   - 3 cards with icon + title + body
 */
export function DataEthicsSection() {
  const { t } = useTranslation()
  const [expandedCards, setExpandedCards] = useState<Record<number, boolean>>(
    {}
  )

  const toggleCard = (index: number) => {
    setExpandedCards((prev) => ({ ...prev, [index]: !prev[index] }))
  }

  const cards: CardData[] = [
    {
      icon: <ShieldCheckIcon />,
      titleKey: 'dataEthics.card1Title',
      bodyKey: 'dataEthics.card1',
    },
    {
      icon: <ScaleIcon />,
      titleKey: 'dataEthics.card2Title',
      bodyKey: 'dataEthics.card2',
    },
    {
      icon: <AlertTriangleIcon />,
      titleKey: 'dataEthics.card3Title',
      bodyKey: 'dataEthics.card3',
    },
  ]

  return (
    <section
      id="data-ethics"
      aria-labelledby="data-ethics-heading"
      className="bg-background relative z-10 w-full"
    >
      <div className="section-x section-inner mx-auto pt-10 pb-16 md:pt-12 md:pb-20">
        {/* ── Top divider ── */}
        <div
          className="border-border mb-8 border-t sm:mb-10 lg:mb-16"
          aria-hidden="true"
        />

        {/* ── Heading (match Team section style) ── */}
        <AnimateIn variant="fadeUp">
          <h2
            className="mb-4 text-center text-[22px] leading-[1.2] tracking-wide uppercase sm:text-[26px] lg:mb-6 lg:text-[32px]"
            id="data-ethics-heading"
          >
            <span className="text-foreground font-bold">
              {t('dataEthics.heading')}
            </span>{' '}
            <span className="text-primary font-bold">
              {t('dataEthics.headingAccent1')} {t('dataEthics.headingAccent2')}
            </span>
          </h2>
        </AnimateIn>

        {/* ── Subtitle ── */}
        <AnimateIn variant="fadeUp" delay={0.06}>
          <Typography
            variant="subtitle"
            as="p"
            textColor="muted"
            className="mx-auto mb-10 max-w-[720px] text-center lg:mb-14"
          >
            {t('dataEthics.description')}
          </Typography>
        </AnimateIn>

        {/* ── 3-card grid ── */}
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 sm:items-start sm:gap-10 lg:grid-cols-3 lg:gap-12">
          {cards.map((card, i) => {
            const isExpanded = expandedCards[i] ?? false
            const isShortCard = i === 2

            return (
              <AnimateIn
                key={t(card.titleKey)}
                variant="fadeUp"
                delay={i * 0.08}
              >
                <div className="bg-muted/30 flex flex-col gap-4 rounded-xl p-6 sm:min-h-[14rem] sm:p-7">
                  <Typography variant="heading" as="h3" textColor="default">
                    {highlightLastWord(t(card.titleKey))}
                  </Typography>
                  <p
                    className={`text-foreground/70 text-[14px] leading-[1.8] sm:text-[15px] ${!isShortCard && !isExpanded ? 'line-clamp-3' : ''}`}
                  >
                    {t(card.bodyKey)}
                  </p>
                  {!isShortCard && (
                    <button
                      type="button"
                      onClick={() => toggleCard(i)}
                      className="text-primary mt-auto self-start text-[13px] font-medium transition-colors duration-150 hover:underline"
                    >
                      {isExpanded
                        ? t('dataEthics.readLess')
                        : t('dataEthics.readMore')}
                    </button>
                  )}
                </div>
              </AnimateIn>
            )
          })}
        </div>
      </div>
    </section>
  )
}
