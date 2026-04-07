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

/**
 * FAQSection
 *
 * Expand/collapse FAQ list with single-open-item behavior.
 */
export function FAQSection() {
  const { t } = useTranslation()
  const [openId, setOpenId] = useState<string | null>(FAQ_ITEMS[0].id)

  return (
    <section id="faq" className="bg-muted relative z-10 w-full">
      <div className="section-x section-y section-inner mx-auto">
        <AnimateIn variant="fadeUp">
          <div className="mx-auto mb-8 max-w-[900px] text-left lg:mb-12">
            <Typography variant="title" as="h2" textColor="default">
              {t('faq.title')}
            </Typography>
            <Typography
              variant="subtitle"
              as="p"
              textColor="default"
              className="mt-3 max-w-[720px]"
            >
              {t('faq.subtitle')}
            </Typography>
          </div>
        </AnimateIn>

        <div className="mx-auto flex max-w-[900px] flex-col gap-3 sm:gap-4">
          {FAQ_ITEMS.map((item, index) => {
            const isOpen = openId === item.id
            const answerId = `faq-answer-${item.id}`

            return (
              <AnimateIn key={item.id} variant="fadeUp" delay={index * 0.04}>
                <Card className="border-border overflow-hidden rounded-2xl bg-white shadow-sm">
                  <button
                    type="button"
                    className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left sm:px-6 sm:py-5"
                    onClick={() =>
                      setOpenId((current) =>
                        current === item.id ? null : item.id
                      )
                    }
                    aria-expanded={isOpen}
                    aria-controls={answerId}
                  >
                    <Typography
                      variant="heading"
                      as="h3"
                      textColor="default"
                      className="text-foreground"
                    >
                      {t(item.questionKey)}
                    </Typography>
                    <span
                      aria-hidden
                      className={cn(
                        'text-primary text-xl leading-none font-semibold transition-transform duration-200',
                        isOpen ? 'rotate-45' : 'rotate-0'
                      )}
                    >
                      +
                    </span>
                  </button>

                  {isOpen && (
                    <div
                      id={answerId}
                      className="border-border border-t px-5 py-4 sm:px-6 sm:py-5"
                    >
                      <Typography
                        variant="paragraph"
                        as="p"
                        textColor="default"
                        className="text-foreground/75 whitespace-pre-line"
                      >
                        {t(item.answerKey)}
                      </Typography>
                    </div>
                  )}
                </Card>
              </AnimateIn>
            )
          })}
        </div>
      </div>
    </section>
  )
}
