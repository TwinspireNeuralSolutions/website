'use client'

import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { AnimateIn } from '@/components/ui/animate-in'
import { Typography } from '@/components/ui/typography'
import { Card } from '@/components/ui/card'
import { useTranslation } from '@/i18n'
import { cn } from '@/lib/utils'

const FAQ_ITEMS = [
  {
    id: 'whatIsTwinspire',
    questionKey: 'faq.items.whatIsTwinspire.question',
    answerKey: 'faq.items.whatIsTwinspire.answer',
  },
  {
    id: 'whatProblemDoesTwinspireSolve',
    questionKey: 'faq.items.whatProblemDoesTwinspireSolve.question',
    answerKey: 'faq.items.whatProblemDoesTwinspireSolve.answer',
  },
  {
    id: 'whoIsTwinspireFor',
    questionKey: 'faq.items.whoIsTwinspireFor.question',
    answerKey: 'faq.items.whoIsTwinspireFor.answer',
  },
  {
    id: 'howDoesTwinspireWork',
    questionKey: 'faq.items.howDoesTwinspireWork.question',
    answerKey: 'faq.items.howDoesTwinspireWork.answer',
  },
  {
    id: 'whatIsAthleticPassport',
    questionKey: 'faq.items.whatIsAthleticPassport.question',
    answerKey: 'faq.items.whatIsAthleticPassport.answer',
  },
  {
    id: 'isTwinspireDashboard',
    questionKey: 'faq.items.isTwinspireDashboard.question',
    answerKey: 'faq.items.isTwinspireDashboard.answer',
  },
  {
    id: 'whatIsDigitalTwin',
    questionKey: 'faq.items.whatIsDigitalTwin.question',
    answerKey: 'faq.items.whatIsDigitalTwin.answer',
  },
  {
    id: 'whatDataDoesTwinspireUse',
    questionKey: 'faq.items.whatDataDoesTwinspireUse.question',
    answerKey: 'faq.items.whatDataDoesTwinspireUse.answer',
  },
  {
    id: 'whoOwnsData',
    questionKey: 'faq.items.whoOwnsData.question',
    answerKey: 'faq.items.whoOwnsData.answer',
  },
  {
    id: 'isTwinspireGdprCompliant',
    questionKey: 'faq.items.isTwinspireGdprCompliant.question',
    answerKey: 'faq.items.isTwinspireGdprCompliant.answer',
  },
  {
    id: 'whereIsTwinspireBased',
    questionKey: 'faq.items.whereIsTwinspireBased.question',
    answerKey: 'faq.items.whereIsTwinspireBased.answer',
  },
  {
    id: 'howToGetStarted',
    questionKey: 'faq.items.howToGetStarted.question',
    answerKey: 'faq.items.howToGetStarted.answer',
  },
] as const

/** Easing curve matching the rest of the design system */
const EASE: [number, number, number, number] = [0.25, 0.1, 0.25, 1]

/**
 * FAQSection
 *
 * Expand/collapse FAQ list with single-open-item behavior.
 * Uses Framer Motion AnimatePresence for a smooth height:auto accordion —
 * the same technique used by Linear and Stripe for premium feel.
 */
export function FAQSection() {
  const { t } = useTranslation()
  const [openId, setOpenId] = useState<string | null>(FAQ_ITEMS[0].id)
  const mid = Math.ceil(FAQ_ITEMS.length / 2)
  const leftColumnItems = FAQ_ITEMS.slice(0, mid)
  const rightColumnItems = FAQ_ITEMS.slice(mid)

  const renderFaqItem = (
    item: (typeof FAQ_ITEMS)[number],
    index: number,
    delayOffset = 0
  ) => {
    const isOpen = openId === item.id
    const answerId = `faq-answer-${item.id}`

    return (
      <AnimateIn
        key={item.id}
        variant="fadeUp"
        delay={(index + delayOffset) * 0.04}
      >
        <Card
          className={cn(
            'border-border/80 bg-background overflow-hidden rounded-xl shadow-none transition-shadow duration-200',
            isOpen && 'shadow-sm'
          )}
        >
          {/* Trigger */}
          <button
            type="button"
            className="group flex min-h-11 w-full items-center justify-between gap-4 px-4 py-3 text-left sm:min-h-12 sm:px-5"
            onClick={() =>
              setOpenId((current) => (current === item.id ? null : item.id))
            }
            aria-expanded={isOpen}
            aria-controls={answerId}
          >
            <Typography
              variant="heading"
              as="h3"
              textColor="default"
              className={cn(
                'pr-4 text-[13px] leading-[1.45] font-medium transition-colors duration-200 sm:text-[14px]',
                isOpen ? 'text-brand-blue' : 'text-foreground'
              )}
            >
              {t(item.questionKey)}
            </Typography>

            {/* Animated expand/collapse icon — chevron rotates to × */}
            <motion.span
              aria-hidden
              animate={{ rotate: isOpen ? 45 : 0 }}
              transition={{ duration: 0.25, ease: EASE }}
              className="text-brand-blue flex h-5 w-5 shrink-0 items-center justify-center text-xl font-light leading-none"
            >
              +
            </motion.span>
          </button>

          {/* Answer — Framer Motion height:auto accordion */}
          <AnimatePresence initial={false}>
            {isOpen && (
              <motion.div
                id={answerId}
                key={answerId}
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.32, ease: EASE }}
                className="overflow-hidden"
                aria-hidden={!isOpen}
              >
                <div className="border-border/80 border-t px-4 pt-3 pb-4 sm:px-5 sm:pt-3.5 sm:pb-5">
                  <Typography
                    variant="paragraph"
                    as="p"
                    textColor="default"
                    className="text-foreground/70 text-[14px] leading-[1.8] whitespace-pre-line sm:text-[15px]"
                  >
                    {t(item.answerKey)}
                  </Typography>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </Card>
      </AnimateIn>
    )
  }

  return (
    <section id="faq" className="bg-muted relative z-10 w-full">
      <div className="section-x section-inner mx-auto pt-10 pb-16 md:pt-12 md:pb-20">
        <AnimateIn variant="scaleUp" duration={0.6}>
          {/* Header */}
          <AnimateIn variant="headingReveal" delay={0.15}>
            <div className="mb-7 text-left sm:mb-8 lg:mb-9">
              <div className="max-w-[680px]">
                <h2 className="text-foreground text-[22px] leading-[1.2] font-bold tracking-wide uppercase sm:text-[26px] lg:text-[32px]">
                  {t('faq.title')}
                </h2>
                <p className="text-foreground/70 mt-3 max-w-[580px] text-[14px] leading-[1.8] sm:mt-4 sm:text-[15px]">
                  {t('faq.subtitle')}
                </p>
              </div>
            </div>
          </AnimateIn>

          {/* FAQ grid */}
          <div className="grid grid-cols-1 gap-4 lg:grid-cols-2 lg:gap-5">
            <AnimateIn variant="slideLeft" delay={0.2} duration={0.6}>
              <div className="flex flex-col gap-3">
                {leftColumnItems.map((item, index) =>
                  renderFaqItem(item, index, 0)
                )}
              </div>
            </AnimateIn>
            <AnimateIn variant="slideRight" delay={0.3} duration={0.6}>
              <div className="flex flex-col gap-3">
                {rightColumnItems.map((item, index) =>
                  renderFaqItem(item, index, leftColumnItems.length)
                )}
              </div>
            </AnimateIn>
          </div>
        </AnimateIn>
      </div>
    </section>
  )
}

