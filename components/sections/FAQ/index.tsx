'use client'

import { useState } from 'react'
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

const INITIAL_VISIBLE_ITEMS = 6

/**
 * FAQSection
 *
 * Expand/collapse FAQ list with single-open-item behavior.
 */
export function FAQSection() {
  const { t } = useTranslation()
  const [showAll, setShowAll] = useState(false)
  const [openId, setOpenId] = useState<string | null>(FAQ_ITEMS[0].id)
  const visibleItems = showAll
    ? FAQ_ITEMS
    : FAQ_ITEMS.slice(0, INITIAL_VISIBLE_ITEMS)
  const mid = Math.ceil(visibleItems.length / 2)
  const leftColumnItems = visibleItems.slice(0, mid)
  const rightColumnItems = visibleItems.slice(mid)

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
        <Card className="border-border/80 bg-background overflow-hidden rounded-xl shadow-none">
          <button
            type="button"
            className="flex min-h-11 w-full items-center justify-between gap-4 px-4 py-3 text-left sm:min-h-12 sm:px-5"
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
              className="text-foreground pr-4 text-[13px] leading-[1.45] font-medium sm:text-[14px]"
            >
              {t(item.questionKey)}
            </Typography>
            <span
              aria-hidden
              className={cn(
                'text-primary text-xl leading-none font-light transition-transform duration-200',
                isOpen ? 'rotate-45' : 'rotate-0'
              )}
            >
              +
            </span>
          </button>

          {isOpen && (
            <div
              id={answerId}
              className="border-border/80 border-t px-4 pb-4 sm:px-5 sm:pb-5"
            >
              <Typography
                variant="paragraph"
                as="p"
                textColor="default"
                className="text-foreground/70 text-[12px] leading-[1.7] whitespace-pre-line sm:text-[13px]"
              >
                {t(item.answerKey)}
              </Typography>
            </div>
          )}
        </Card>
      </AnimateIn>
    )
  }

  return (
    <section id="faq" className="bg-muted relative z-10 w-full">
      <div className="section-x section-inner mx-auto pt-10 pb-16 md:pt-12 md:pb-20">
        <AnimateIn variant="fadeUp">
          <div className="mx-auto mb-7 flex max-w-[1080px] flex-col gap-5 text-left sm:mb-8 sm:flex-row sm:items-start sm:justify-between lg:mb-9">
            <div className="max-w-[680px]">
              <Typography
                variant="title"
                as="h2"
                textColor="default"
                className="text-[24px] sm:text-[30px] lg:text-[35px]"
              >
                {t('faq.title')}
              </Typography>
              <Typography
                variant="subtitle"
                as="p"
                textColor="default"
                className="mt-2 max-w-[580px] text-[13px] leading-[1.6] sm:mt-2.5 sm:text-[14px]"
              >
                {t('faq.subtitle')}
              </Typography>
            </div>

            <button
              type="button"
              className="bg-primary text-primary-foreground hover:bg-primary-hover active:bg-primary-active inline-flex h-10 shrink-0 items-center rounded-full px-5 text-[12px] font-medium transition-colors duration-200"
              onClick={() => {
                if (showAll) {
                  const initialIds: string[] = FAQ_ITEMS.slice(
                    0,
                    INITIAL_VISIBLE_ITEMS
                  ).map((item) => item.id)

                  if (openId && !initialIds.includes(openId)) {
                    setOpenId(FAQ_ITEMS[0].id)
                  }
                }

                setShowAll((current) => !current)
              }}
              aria-label={showAll ? t('faq.viewLess') : t('faq.viewAll')}
            >
              {showAll ? t('faq.viewLess') : t('faq.viewAll')}
            </button>
          </div>
        </AnimateIn>

        <div className="mx-auto grid max-w-[1080px] grid-cols-1 gap-4 lg:grid-cols-2 lg:gap-5">
          <div className="flex flex-col gap-3">
            {leftColumnItems.map((item, index) =>
              renderFaqItem(item, index, 0)
            )}
          </div>
          <div className="flex flex-col gap-3">
            {rightColumnItems.map((item, index) =>
              renderFaqItem(item, index, leftColumnItems.length)
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
