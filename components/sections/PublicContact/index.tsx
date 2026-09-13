'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Typography } from '@/components/ui/typography'
import { AnimateIn } from '@/components/ui/animate-in'
import { useTranslation } from '@/i18n'

interface ContactFormState {
  name: string
  email: string
  role: string
  clubOrClinic: string
  message: string
}

export function PublicContactSection() {
  const { t } = useTranslation()
  const [form, setForm] = useState<ContactFormState>({
    name: '',
    email: '',
    role: '',
    clubOrClinic: '',
    message: '',
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [submitError, setSubmitError] = useState('')

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm((current) => ({ ...current, [event.target.name]: event.target.value }))
  }

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault()
    setIsSubmitting(true)
    setSubmitError('')

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })

      if (!response.ok) {
        const data = (await response.json()) as { error?: string }
        setSubmitError(data.error ?? t('contact.errorMessage'))
        return
      }

      setSubmitted(true)
    } catch {
      setSubmitError(t('contact.errorMessage'))
    } finally {
      setIsSubmitting(false)
    }
  }

  const fieldClasses =
    'h-11 rounded-xl border border-border/30 bg-background px-4 text-[15px] shadow-none ' +
    'placeholder:text-foreground/30 transition-all duration-200 hover:border-border/60 ' +
    'focus-visible:border-primary/50 focus-visible:ring-2 focus-visible:ring-primary/15 focus-visible:ring-offset-0'

  return (
    <section id="contact" className="bg-footer-bg relative z-10 w-full">
      <div className="section-x section-y section-inner mx-auto">
        <div className="mx-auto grid max-w-[1080px] gap-10 lg:grid-cols-[1fr_420px]">
          <AnimateIn variant="slideLeft" className="flex flex-col justify-center">
            <h2 className="mb-4 text-[22px] leading-[1.2] font-bold tracking-wide uppercase sm:text-[28px] lg:text-[32px]">
              {t('contact.title')}
            </h2>
            <p className="text-foreground/80 mb-7 max-w-xl text-[15px] leading-[1.8]">
              {t('contact.subtitle')}
            </p>

            <div className="flex flex-col gap-3 text-[15px]">
              <a
                href={`mailto:${t('contact.emailContact')}`}
                className="text-foreground/80 hover:text-primary w-fit font-medium transition-colors"
              >
                {t('contact.emailContact')}
              </a>
              <span className="text-foreground/70">{t('contact.addressValue')}</span>
              <a
                href="https://www.linkedin.com/company/twinspire"
                target="_blank"
                rel="noopener noreferrer"
                className="text-foreground/80 hover:text-primary w-fit font-medium transition-colors"
              >
                Twinspire
              </a>
            </div>
          </AnimateIn>

          <AnimateIn variant="slideRight">
            <div className="bg-background rounded-2xl p-5 sm:p-6 lg:p-8">
              {submitted ? (
                <div className="flex min-h-[260px] flex-col items-center justify-center text-center">
                  <Typography variant="heading" as="h3">
                    {t('contact.successTitle')}
                  </Typography>
                  <p className="text-foreground/80 mt-3 text-[15px] leading-relaxed">
                    {t('contact.successMessage')}
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-3.5">
                  <Input
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    placeholder={t('contact.name')}
                    required
                    autoComplete="name"
                    className={fieldClasses}
                  />
                  <Input
                    name="clubOrClinic"
                    value={form.clubOrClinic}
                    onChange={handleChange}
                    placeholder={t('contact.clubOrClinic')}
                    autoComplete="organization"
                    className={fieldClasses}
                  />
                  <Input
                    name="role"
                    value={form.role}
                    onChange={handleChange}
                    placeholder={t('contact.role')}
                    className={fieldClasses}
                  />
                  <Input
                    type="email"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    placeholder={t('contact.email')}
                    required
                    autoComplete="email"
                    className={fieldClasses}
                  />
                  <Textarea
                    name="message"
                    value={form.message}
                    onChange={handleChange}
                    placeholder={t('contact.message')}
                    rows={3}
                    className="border-border/30 bg-background min-h-[80px] resize-none rounded-xl border px-4 py-2.5 text-[15px] placeholder:text-foreground/30 focus-visible:border-primary/50 focus-visible:ring-2 focus-visible:ring-primary/15"
                  />

                  {submitError && (
                    <p className="text-[15px] text-red-600" role="alert">
                      {submitError}
                    </p>
                  )}

                  <Button
                    type="submit"
                    variant="primary"
                    size="lg"
                    showIcon
                    disabled={isSubmitting}
                    className="w-full"
                  >
                    {isSubmitting ? t('common.loading') : t('contact.submit')}
                  </Button>
                </form>
              )}
            </div>
          </AnimateIn>
        </div>
      </div>
    </section>
  )
}
