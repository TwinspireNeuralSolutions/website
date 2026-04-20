'use client'

import React from 'react'
import { Typography } from '@/components/ui/typography'
import { AnimateIn } from '@/components/ui/animate-in'
import { useTranslation } from '@/i18n'

export function ProductSection() {
  const { t } = useTranslation()
  const questions = [
    'Are workflows operationally usable for staff?',
    'Do data pipelines provide sufficient quality and continuity?',
    'Do the signals support meaningful individualized modeling in practice?',
  ]

  // helper: highlight last word in a headline
  function highlightLastWord(s: string) {
    const parts = String(s).trim().split(' ')
    if (parts.length === 0) return s
    const last = parts.pop()
    return (
      <>
        {parts.join(' ')}{' '}
        {last && <span className="text-primary font-bold">{last}</span>}
      </>
    )
  }

  return (
    <section id="product" className="bg-primary relative z-10 w-full">
      <div className="section-x section-inner mx-auto py-12">
        <div className="border-border w-full rounded-xl border bg-white p-6 shadow-lg sm:p-8 md:p-10">
          <div className="space-y-12">
            {/* Part 1 — top (two-column info card like Part 2) */}
            <AnimateIn variant="fadeUp" className="flex flex-col gap-6">
              <h2 className="text-foreground mx-auto max-w-[820px] text-center text-[22px] leading-[1.2] font-bold tracking-wide uppercase sm:text-[26px] lg:text-[32px]">
                {highlightLastWord(t('product.headline1'))}
              </h2>

              <div className="bg-muted/30 rounded-2xl p-6 md:p-8">
                <div className="grid grid-cols-1 gap-6 md:grid-cols-2 md:gap-10">
                  <div>
                    <div className="flex items-center gap-3">
                      <span
                        className="bg-primary block h-0.5 w-12"
                        aria-hidden
                      />
                      <h5 className="text-primary/90 text-sm font-semibold tracking-wider uppercase">
                        Framework
                      </h5>
                    </div>
                    <p className="text-foreground/75 mt-3 text-justify text-[15px] leading-[1.8] md:text-[16px]">
                      {(() => {
                        const sentences = String(t('product.p1'))
                          .split('.')
                          .map((s) => s.trim())
                          .filter(Boolean)
                        const left =
                          sentences
                            .slice(0, Math.ceil(sentences.length / 2))
                            .join('. ') + '.'
                        return left
                      })()}
                    </p>
                  </div>

                  <div>
                    <div className="flex items-center gap-3">
                      <span
                        className="bg-primary block h-0.5 w-12"
                        aria-hidden
                      />
                      <h5 className="text-primary/90 text-sm font-semibold tracking-wider uppercase">
                        Modeling
                      </h5>
                    </div>
                    <p className="text-foreground/75 mt-3 text-justify text-[15px] leading-[1.8] md:text-[16px]">
                      {(() => {
                        const sentences = String(t('product.p1'))
                          .split('.')
                          .map((s) => s.trim())
                          .filter(Boolean)
                        const right = sentences
                          .slice(Math.ceil(sentences.length / 2))
                          .join('. ')
                        return right ? right + '.' : ''
                      })()}
                    </p>
                  </div>
                </div>
              </div>
            </AnimateIn>

            {/* Part 2 — bottom (two-column info card + research questions) */}
            <AnimateIn
              variant="fadeUp"
              delay={0.08}
              className="flex flex-col gap-6"
            >
              <h3 className="text-foreground mx-auto max-w-[820px] text-center text-[22px] leading-[1.2] font-bold tracking-wide uppercase sm:text-[26px] lg:text-[32px]">
                {highlightLastWord(t('product.headline2'))}
              </h3>

              <div className="bg-muted/30 rounded-2xl p-6 md:p-8">
                <div className="grid grid-cols-1 gap-6 md:grid-cols-2 md:gap-10">
                  {/* Left column */}
                  <div>
                    <div className="flex items-center gap-3">
                      <span
                        className="bg-primary block h-0.5 w-12"
                        aria-hidden
                      />
                      <h5 className="text-primary/90 text-sm font-semibold tracking-wider uppercase">
                        Integration
                      </h5>
                    </div>
                    <p className="text-foreground/75 mt-3 text-justify text-[15px] leading-[1.8] md:text-[16px]">
                      {(() => {
                        const sentences = String(t('product.p2'))
                          .split('.')
                          .map((s) => s.trim())
                          .filter(Boolean)
                        const left =
                          sentences
                            .slice(0, Math.ceil(sentences.length / 2))
                            .join('. ') + '.'
                        return left
                      })()}
                    </p>
                  </div>

                  {/* Right column */}
                  <div>
                    <div className="flex items-center gap-3">
                      <span
                        className="bg-primary block h-0.5 w-12"
                        aria-hidden
                      />
                      <h5 className="text-primary/90 text-sm font-semibold tracking-wider uppercase">
                        Real-world validation
                      </h5>
                    </div>
                    <p className="text-foreground/75 mt-3 text-justify text-[15px] leading-[1.8] md:text-[16px]">
                      {(() => {
                        const sentences = String(t('product.p2'))
                          .split('.')
                          .map((s) => s.trim())
                          .filter(Boolean)
                        const right = sentences
                          .slice(Math.ceil(sentences.length / 2))
                          .join('. ')
                        return right ? right + '.' : ''
                      })()}
                    </p>
                  </div>
                </div>
              </div>

              {/* Research questions box */}
              <div className="border-border bg-muted/40 mt-4 flex flex-col gap-4 rounded-2xl border p-6 sm:p-8 md:p-10">
                <Typography
                  variant="heading"
                  as="h4"
                  textColor="default"
                  className="text-center"
                >
                  Current Research Questions
                </Typography>
                <ol className="mx-auto flex max-w-3xl flex-col gap-3">
                  {questions.map((q, i) => (
                    <li key={i} className="flex gap-4">
                      <span className="text-primary mt-0.5 text-[14px] leading-[1.8] font-bold tabular-nums sm:text-[15px]">
                        {String(i + 1).padStart(2, '0')}
                      </span>
                      <p className="text-foreground/75 text-justify text-[15px] leading-[1.8] md:text-[16px]">
                        {q}
                      </p>
                    </li>
                  ))}
                </ol>
              </div>
            </AnimateIn>
          </div>
        </div>
      </div>
    </section>
  )
}
