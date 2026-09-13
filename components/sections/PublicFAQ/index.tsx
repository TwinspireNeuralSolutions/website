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
    id: 'whatDataDoesTwinspireUse',
    questionKey: 'faq.items.whatDataDoesTwinspireUse.question',
    answerKey: 'faq.items.whatDataDoesTwinspireUse.answer',
  },
  {
    id: 'isTwinspireGdprCompliant',
    questionKey: 'faq.items.isTwinspireGdprCompliant.question',
    answerKey: 'faq.items.isTwinspireGdprCompliant.answer',
  },
  {
    id: 'howToGetStarted',
    questionKey: 'faq.items.howToGetStarted.question',
    answerKey: 'faq.items.howToGetStarted.answer',
  },
] as const

export function PublicFAQSection() {
  const { t } = useTranslation()
  const [openId, setOpenId] = useState<string | null>(FAQ_ITEMS[0].id)

  return (
    <section id="faq" className="bg-muted relative z-10 w-full">
      <div className="section-x section-inner mx-auto pt-10 pb-16 md:pt-12 md:pb-20">
        <AnimateIn variant="fadeUp">
          <div className="mb-8 max-w-[680px]">
            <h2 className="text-foreground text-[22px] leading-[1.2] font-bold tracking-wide uppercase sm:text-[28px] lg:text-[32px]">
              {t('faq.title')}
            </h2>
            <p className="text-foreground/80 mt-3 max-w-[580px] text-[15px] leading-[1.8]">
              {t('faq.subtitle')}
            </p>
          </div>
        </AnimateIn>

        <div className="grid grid-cols-1 gap-3 lg:grid-cols-2 lg:gap-4">
          {FAQ_ITEMS.map((item, index) => {
            const isOpen = openId === item.id
            const answerId = `faq-answer-${item.id}`
            return (
              <AnimateIn key={item.id} variant="fadeUp" delay={index * 0.04}>
                <Card className="border-border/80 bg-background overflow-hidden rounded-xl shadow-none">
                  <button
                    type="button"
                    className="flex min-h-12 w-full items-center justify-between gap-4 px-5 py-3 text-left"
                    onClick={() => setOpenId(isOpen ? null : item.id)}
                    aria-expanded={isOpen}
                    aria-controls={answerId}
                  >
                    <Typography
                      variant="heading"
                      as="h3"
                      textColor="default"
                      className="text-[15px] font-medium"
                    >
                      {t(item.questionKey)}
                    </Typography>
                    <span
                      aria-hidden
                      className={cn(
                        'text-primary text-xl leading-none font-light transition-transform duration-300',
                        isOpen ? 'rotate-45' : 'rotate-0'
                      )}
                    >
                      +
                    </span>
                  </button>

                  <div
                    id={answerId}
                    aria-hidden={!isOpen}
                    className={cn(
                      'grid overflow-hidden transition-all duration-300',
                      isOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'
                    )}
                  >
                    <div className="min-h-0">
                      <div className="border-border/80 border-t px-5 pt-3 pb-5">
                        <Typography
                          variant="paragraph"
                          as="p"
                          textColor="default"
                          className="text-foreground/80 text-[15px] leading-[1.7]"
                        >
                          {t(item.answerKey)}
                        </Typography>
                      </div>
                    </div>
                  </div>
                </Card>
              </AnimateIn>
            )
          })}
        </div>
      </div>
    </section>
  )
}
