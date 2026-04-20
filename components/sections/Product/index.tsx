'use client'

import React, { useState } from 'react'
import Image from 'next/image'
import { Typography } from '@/components/ui/typography'
import { AnimateIn } from '@/components/ui/animate-in'
import { Button } from '@/components/ui/button'
import { X } from 'lucide-react'
import { useTranslation } from '@/i18n'

/**
 * ProductSection
 *
 * Layout principle:
 *   - First text block always sits on a white background.
 *   - Second text block ("Athletic Passport") always sits on the lavender (#e6e6f3) background.
 *   - The product mockup image straddles the white/lavender boundary:
 *       desktop → image is vertically centred at the exact midpoint of the section
 *       mobile  → image sits between the two text blocks in a half-white / half-lavender band
 *
 * Mobile:  white band (text1) → gradient band (image) → lavender band (text2)
 * Desktop: absolute half-white / half-lavender bg; left col has two equal flex-1 halves;
 *          right col has image centred → it straddles the midpoint.
 */
export function ProductSection() {
  const { t } = useTranslation()
  const [isOpen, setIsOpen] = useState(false)
  const [activeKey, setActiveKey] = useState<'p1' | 'p2' | null>(null)

  function openModal(key: 'p1' | 'p2') {
    setActiveKey(key)
    setIsOpen(true)
  }

  function closeModal() {
    setIsOpen(false)
    setActiveKey(null)
  }

  return (
    <section id="product" className="relative z-10 w-full overflow-hidden">
      {/* ── MOBILE layout (hidden on lg+) ──────────────────────────────── */}
      <div className="lg:hidden">
        {/* White band: first text */}
        <div className="bg-white">
          <div className="section-x section-inner mx-auto pt-20 pb-10">
            <AnimateIn variant="fadeUp" className="flex flex-col gap-5">
              <Typography variant="title" as="h2" textColor="default">
                {t('product.headline1')}
              </Typography>
              <div>
                <p className="text-foreground/65 line-clamp-3 text-[15px] leading-[1.8] sm:text-base">
                  {t('product.p1')}
                </p>
                <div className="mt-2">
                  <Button
                    variant="secondary"
                    size="sm"
                    onClick={() => openModal('p1')}
                    aria-expanded={isOpen && activeKey === 'p1'}
                  >
                    {t('product.readMore')}
                  </Button>
                </div>
              </div>
            </AnimateIn>
          </div>
        </div>

        {/* Gradient band: image straddles white → lavender */}
        <div
          className="w-full overflow-hidden"
          style={{
            background: 'linear-gradient(to bottom, #ffffff 50%, #e6e6f3 50%)',
          }}
        >
          <div className="section-x section-inner mx-auto">
            <Image
              src="/product/product-mockup.png"
              alt={t('product.mockupAlt')}
              width={1400}
              height={1100}
              className="h-[60vh] w-full object-contain drop-shadow-xl"
              sizes="100vw"
              priority
            />
          </div>
        </div>

        {/* Lavender band: second text */}
        <div className="bg-[#e6e6f3]">
          <div className="section-x section-inner mx-auto pt-10 pb-20">
            <AnimateIn
              variant="fadeUp"
              delay={0.1}
              className="flex flex-col gap-5"
            >
              <Typography variant="title" as="h3" textColor="default">
                {t('product.headline2')}
              </Typography>
              <div>
                <p className="text-foreground/65 line-clamp-3 text-[15px] leading-[1.8] sm:text-base">
                  {t('product.p2')}
                </p>
                <div className="mt-2">
                  <Button
                    variant="secondary"
                    size="sm"
                    onClick={() => openModal('p2')}
                    aria-expanded={isOpen && activeKey === 'p2'}
                  >
                    {t('product.readMore')}
                  </Button>
                </div>
              </div>
            </AnimateIn>
          </div>
        </div>
      </div>

      {/* ── DESKTOP layout (hidden below lg) ───────────────────────────── */}
      <div className="relative hidden min-h-[70vh] lg:block">
        {/* Absolute background: top half white, bottom half lavender */}
        <div className="absolute inset-0 flex flex-col" aria-hidden>
          <div className="flex-1 bg-white" />
          <div className="flex-1 bg-[#e6e6f3]" />
        </div>

        {/* Content on top */}
        <div className="section-x section-inner relative mx-auto flex min-h-[70vh] gap-16">
          {/* Left column: two equal flex-1 halves — midpoint aligns with bg boundary */}
          <div className="flex w-[50%] flex-col">
            {/* First text — white half, text pushed to bottom of its half */}
            <AnimateIn
              variant="fadeUp"
              className="flex flex-1 flex-col justify-end gap-5 pt-20 pb-12"
            >
              <Typography variant="title" as="h2" textColor="default">
                {t('product.headline1')}
              </Typography>
              <div>
                <p className="text-foreground/65 line-clamp-3 text-[15px] leading-[1.8] sm:text-base">
                  {t('product.p1')}
                </p>
                <div className="mt-2">
                  <Button
                    variant="secondary"
                    size="sm"
                    onClick={() => openModal('p1')}
                    aria-expanded={isOpen && activeKey === 'p1'}
                  >
                    {t('product.readMore')}
                  </Button>
                </div>
              </div>
            </AnimateIn>

            {/* Second text — lavender half, text pushed to top of its half */}
            <AnimateIn
              variant="fadeUp"
              delay={0.1}
              className="flex flex-1 flex-col justify-start gap-5 pt-12 pb-20"
            >
              <Typography variant="title" as="h3" textColor="default">
                {t('product.headline2')}
              </Typography>
              <div>
                <p className="text-foreground/65 line-clamp-3 text-[15px] leading-[1.8] sm:text-base">
                  {t('product.p2')}
                </p>
                <div className="mt-2">
                  <Button
                    variant="secondary"
                    size="sm"
                    onClick={() => openModal('p2')}
                    aria-expanded={isOpen && activeKey === 'p2'}
                  >
                    {t('product.readMore')}
                  </Button>
                </div>
              </div>
            </AnimateIn>
          </div>

          {/* Right column: image centred vertically = exactly at the white/lavender boundary */}
          <div className="flex flex-1 items-center justify-center py-8">
            <Image
              src="/product/product-mockup.png"
              alt={t('product.mockupAlt')}
              width={1300}
              height={1000}
              className="h-auto max-h-[85vh] w-full object-contain drop-shadow-2xl"
              sizes="50vw"
              priority
            />
          </div>
        </div>
      </div>

      {/* Modal */}
      {isOpen && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center px-4"
        >
          <div
            className="fixed inset-0 bg-black/50 backdrop-blur-sm"
            onClick={closeModal}
            aria-hidden
          />

          <div className="relative z-10 w-full max-w-3xl rounded-xl bg-white p-6 shadow-lg">
            <div className="flex w-full items-start justify-between gap-4">
              <Typography variant="heading" as="h3" textColor="default">
                {activeKey === 'p1'
                  ? t('product.headline1')
                  : t('product.headline2')}
              </Typography>
              <div>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={closeModal}
                  aria-label={t('product.close')}
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            </div>

            <div className="text-foreground/85 mt-4 max-h-[70vh] overflow-y-auto text-sm leading-7">
              {activeKey === 'p1' && (
                <p className="whitespace-pre-line">{t('product.p1')}</p>
              )}
              {activeKey === 'p2' && (
                <div className="flex flex-col gap-3">
                  {String(t('product.p2'))
                    .split('?')
                    .map((s) => s.trim())
                    .filter(Boolean)
                    .map((q, i) => (
                      <p key={i} className="whitespace-pre-line">
                        {q.endsWith('?') ? q : q + '?'}
                      </p>
                    ))}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </section>
  )
}
