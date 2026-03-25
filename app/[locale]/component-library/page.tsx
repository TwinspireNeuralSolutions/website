'use client'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Typography } from '@/components/ui/typography'
import { Label } from '@/components/ui/label'
import { LanguageSelector } from '@/components/ui/language-selector'
import { ThemeToggle } from '@/components/ui/theme-toggle'
import { useTranslation } from '@/i18n'
import Link from 'next/link'
import { useParams } from 'next/navigation'
import { ArrowLeft } from 'lucide-react'

/**
 * Component Library — Showcase of all reusable UI components.
 *
 * This page serves as a living style guide for the design system.
 * All components are built with shadcn/ui + Tailwind CSS and
 * follow the project's design tokens (colors, spacing, typography).
 *
 * Visit /{locale}/component-library to preview all components.
 */
export default function ComponentLibraryPage() {
  const { t } = useTranslation()
  const { locale } = useParams<{ locale: string }>()

  return (
    <div className="bg-background min-h-screen px-4 py-12">
      <div className="mx-auto max-w-4xl space-y-16">
        {/* Header */}
        <header className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link href={`/${locale}`}>
                <Button variant="ghost" size="sm" className="gap-1">
                  <ArrowLeft className="h-4 w-4" />
                  Home
                </Button>
              </Link>
              <Typography variant="title">
                {t('componentLibrary.title')}
              </Typography>
            </div>
            <div className="flex items-center gap-2">
              <LanguageSelector />
              <ThemeToggle />
            </div>
          </div>
          <Typography variant="subtitle" textColor="muted">
            {t('componentLibrary.subtitle')}
          </Typography>
        </header>

        {/* ===== BUTTONS ===== */}
        <section className="space-y-6">
          <Typography variant="heading">
            {t('componentLibrary.buttons')}
          </Typography>
          <div className="rounded-xl border border-neutral-200 p-6 dark:border-neutral-700">
            <div className="flex flex-wrap items-center gap-4">
              <Button variant="primary" showIcon>
                {t('componentLibrary.primaryButton')}
              </Button>
              <Button variant="primary">
                {t('componentLibrary.primaryButton')}
              </Button>
              <Button variant="white" showIcon>
                {t('componentLibrary.whiteButton')}
              </Button>
              <Button variant="white">
                {t('componentLibrary.whiteButton')}
              </Button>
              <Button variant="outline">Outline</Button>
              <Button variant="ghost">Ghost</Button>
              <Button variant="destructive">Destructive</Button>
              <Button variant="link">Link</Button>
              <Button variant="secondary">Secondary</Button>
            </div>

            {/* Sizes */}
            <div className="mt-6 flex flex-wrap items-center gap-4">
              <Button variant="primary" size="sm" showIcon>
                Small
              </Button>
              <Button variant="primary" size="default" showIcon>
                Default
              </Button>
              <Button variant="primary" size="lg" showIcon>
                Large
              </Button>
            </div>

            {/* States */}
            <div className="mt-6 flex flex-wrap items-center gap-4">
              <Button variant="primary" disabled>
                Disabled Primary
              </Button>
              <Button variant="white" disabled>
                Disabled White
              </Button>
            </div>
          </div>
        </section>

        {/* ===== TYPOGRAPHY ===== */}
        <section className="space-y-6">
          <Typography variant="heading">
            {t('componentLibrary.typography')}
          </Typography>
          <div className="space-y-4 rounded-xl border border-neutral-200 p-6 dark:border-neutral-700">
            <Typography variant="title">
              {t('componentLibrary.title40')}
            </Typography>
            <Typography variant="subtitle">
              {t('componentLibrary.subtitle16')}
            </Typography>
            <Typography variant="heading">
              {t('componentLibrary.heading16')}
            </Typography>
            <Typography variant="paragraph">
              {t('componentLibrary.paragraph12')}
            </Typography>
            <Typography variant="subtitle" textColor="muted">
              Subtitle — muted color
            </Typography>
            <Typography variant="paragraph" textColor="muted">
              Paragraph — muted color
            </Typography>
          </div>
        </section>

        {/* ===== INPUTS ===== */}
        <section className="space-y-6">
          <Typography variant="heading">
            {t('componentLibrary.inputs')}
          </Typography>
          <div className="space-y-6 rounded-xl border border-neutral-200 p-6 dark:border-neutral-700">
            {/* Text Input */}
            <div className="space-y-2">
              <Label htmlFor="demo-input">
                {t('componentLibrary.inputLabel')}
              </Label>
              <Input
                id="demo-input"
                type="text"
                placeholder={t('componentLibrary.inputPlaceholder')}
              />
            </div>

            {/* Email Input */}
            <div className="space-y-2">
              <Label htmlFor="demo-email">Email Input</Label>
              <Input
                id="demo-email"
                type="email"
                placeholder="email@example.com"
              />
            </div>

            {/* Password Input */}
            <div className="space-y-2">
              <Label htmlFor="demo-password">Password Input</Label>
              <Input
                id="demo-password"
                type="password"
                placeholder="Enter your password"
              />
            </div>

            {/* Disabled Input */}
            <div className="space-y-2">
              <Label htmlFor="demo-disabled">Disabled Input</Label>
              <Input
                id="demo-disabled"
                type="text"
                placeholder="This is disabled"
                disabled
              />
            </div>

            {/* Textarea */}
            <div className="space-y-2">
              <Label htmlFor="demo-textarea">
                {t('componentLibrary.textareaLabel')}
              </Label>
              <Textarea
                id="demo-textarea"
                placeholder={t('componentLibrary.textareaPlaceholder')}
                rows={4}
              />
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}
