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

/**
 * ContactSection -- Split layout.
 *
 * LEFT:  Title + subtitle + contact info (email, phone, address, LinkedIn).
 * RIGHT: Elevated form card with stacked fields + CTA button.
 */
export function ContactSection() {
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
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitError('')

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })

      if (!res.ok) {
        const data = (await res.json()) as { error?: string }
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
    'h-11 rounded-xl border border-border/30 bg-background px-4 shadow-none text-[14px] ' +
    'placeholder:text-foreground/30 placeholder:text-[14px] transition-all duration-200 ' +
    'hover:border-border/60 ' +
    'focus-visible:border-primary/50 focus-visible:ring-2 focus-visible:ring-primary/15 focus-visible:ring-offset-0'

  const isValidEmail = (email: string) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)

  const CheckIcon = () => (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="absolute top-1/2 right-3 -translate-y-1/2 text-green-500"
      aria-hidden="true"
    >
      <path d="M20 6L9 17l-5-5" />
    </svg>
  )

  return (
    <section
      id="contact"
      aria-labelledby="contact-heading"
      className="bg-footer-bg relative z-10 w-full"
    >
      <div className="section-x section-y section-inner mx-auto overflow-hidden">
        <div className="mx-auto w-full max-w-[1080px]">

          {/* ── Two-column: contact info left, form right ── */}
          <div className="flex flex-col gap-8 sm:gap-10 lg:flex-row lg:items-stretch lg:justify-between lg:gap-10">

            {/* Left: Title + subtitle + contact info */}
            <AnimateIn
              variant="slideLeft"
              delay={0.2}
              duration={0.6}
              className="order-1 flex flex-1 flex-col lg:order-1"
            >
                <h2
                  id="contact-heading"
                  className="mb-4 text-[22px] leading-[1.2] font-bold tracking-wide uppercase sm:text-[26px] lg:mb-5 lg:text-[32px]"
                >
                  <span className="text-foreground">{t('contact.title')}</span>{' '}
                  <span className="text-primary">{t('contact.titleAccent')}</span>
                </h2>

                <p className="text-foreground/70 mb-8 text-[14px] leading-[1.8] sm:text-[15px]">
                  {t('contact.subtitle')}
                </p>

                <div className="flex flex-col gap-1">
                  {/* Email */}
                  <div className="hover:bg-foreground/5 flex items-center gap-3 rounded-lg px-2 py-1.5 transition-colors duration-200">
                    <div className="bg-primary flex h-7 w-7 items-center justify-center rounded-full">
                      <svg
                        width="12"
                        height="12"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="text-background shrink-0"
                        aria-hidden="true"
                      >
                        <rect width="20" height="16" x="2" y="4" rx="2" />
                        <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                      </svg>
                    </div>
                    <span className="text-foreground/60 text-[15px] font-medium">
                      {t('contact.emailContact')}
                    </span>
                  </div>

                  {/* Phone */}
                  <a
                    href={`tel:${t('contact.phone')}`}
                    className="hover:bg-foreground/5 flex items-center gap-3 rounded-lg px-2 py-1.5 transition-colors duration-200"
                  >
                    <div className="bg-primary flex h-7 w-7 items-center justify-center rounded-full">
                      <svg
                        width="12"
                        height="12"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="text-background shrink-0"
                        aria-hidden="true"
                      >
                        <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                      </svg>
                    </div>
                    <span className="text-foreground/60 hover:text-foreground text-[15px] font-medium transition-colors duration-200">
                      {t('contact.phone')}
                    </span>
                  </a>

                  {/* Address */}
                  <a
                    href="https://maps.google.com/?q=Copenhagen,+Denmark"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:bg-foreground/5 flex items-center gap-3 rounded-lg px-2 py-1.5 transition-colors duration-200"
                  >
                    <div className="bg-primary flex h-7 w-7 items-center justify-center rounded-full">
                      <svg
                        width="12"
                        height="12"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="text-background shrink-0"
                        aria-hidden="true"
                      >
                        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                        <circle cx="12" cy="10" r="3" />
                      </svg>
                    </div>
                    <span className="text-foreground/60 hover:text-foreground text-[15px] font-medium transition-colors duration-200">
                      {t('contact.addressValue')}
                    </span>
                  </a>

                  {/* LinkedIn */}
                  <a
                    href="https://www.linkedin.com/company/twinspire-neural-solutions"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:bg-foreground/5 flex items-center gap-3 rounded-lg px-2 py-1.5 transition-colors duration-200"
                    aria-label={t('footer.linkedinLabel')}
                  >
                    <div className="bg-primary flex h-7 w-7 items-center justify-center rounded-full">
                      <svg
                        width="12"
                        height="12"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        className="text-background shrink-0"
                        aria-hidden="true"
                      >
                        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                      </svg>
                    </div>
                    <span className="text-foreground/60 hover:text-foreground text-[15px] font-medium transition-colors duration-200">
                      Twinspire Neural Solutions
                    </span>
                  </a>

                  {/* Instagram */}
                  <a
                    href="https://www.instagram.com/twinspire.ai/tagged/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:bg-foreground/5 flex items-center gap-3 rounded-lg px-2 py-1.5 transition-colors duration-200"
                    aria-label="Twinspire on Instagram"
                  >
                    <div className="bg-primary flex h-7 w-7 items-center justify-center rounded-full">
                      <svg
                        width="12"
                        height="12"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="text-background shrink-0"
                        aria-hidden="true"
                      >
                        <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                        <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                        <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
                      </svg>
                    </div>
                    <span className="text-foreground/60 hover:text-foreground text-[15px] font-medium transition-colors duration-200">
                      twinspire
                    </span>
                  </a>
                </div>
            </AnimateIn>

              {/* Right: Form */}
              <div className="order-2 w-full lg:order-2 lg:w-[420px] lg:shrink-0">
                <div className="bg-background flex h-full flex-col overflow-hidden rounded-2xl p-5 sm:p-6 lg:p-8">
                  {submitted ? (
                    <div className="flex min-h-[260px] flex-col items-center justify-center gap-4 text-center">
                      <div
                        className="bg-primary flex h-14 w-14 items-center justify-center rounded-full"
                        aria-hidden="true"
                      >
                        <svg
                          width="24"
                          height="24"
                          viewBox="0 0 22 22"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M4.5 11.5L9 16L17.5 7"
                            stroke="white"
                            strokeWidth="2.2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      </div>
                      <Typography
                        variant="heading"
                        as="h3"
                        className="text-[18px] font-bold"
                      >
                        {t('contact.successTitle')}
                      </Typography>
                      <p className="text-foreground/60 text-[14px] leading-relaxed">
                        {t('contact.successMessage')}
                      </p>
                    </div>
                  ) : (
                    <>
                      <h3 className="text-foreground/30 mb-3 text-center text-[16px] font-semibold tracking-wide">
                        {t('contact.formTitle')}
                      </h3>
                      <form
                        onSubmit={handleSubmit}
                        noValidate
                        className="flex flex-1 flex-col gap-3.5"
                      >
                        <div className="relative">
                          <Input
                            id="contact-name"
                            type="text"
                            name="name"
                            value={form.name}
                            onChange={handleChange}
                            placeholder={t('contact.name')}
                            required
                            autoComplete="name"
                            aria-label={t('contact.name')}
                            className={fieldClasses}
                          />
                          {form.name.trim().length >= 2 && <CheckIcon />}
                        </div>

                        <div className="relative">
                          <Input
                            id="contact-clubOrClinic"
                            type="text"
                            name="clubOrClinic"
                            value={form.clubOrClinic}
                            onChange={handleChange}
                            placeholder={t('contact.clubOrClinic')}
                            autoComplete="organization"
                            aria-label={t('contact.clubOrClinic')}
                            className={fieldClasses}
                          />
                          {form.clubOrClinic.trim().length >= 2 && (
                            <CheckIcon />
                          )}
                        </div>

                        <div className="relative">
                          <Input
                            id="contact-role"
                            type="text"
                            name="role"
                            value={form.role}
                            onChange={handleChange}
                            placeholder={t('contact.role')}
                            aria-label={t('contact.role')}
                            className={fieldClasses}
                          />
                          {form.role.trim().length >= 2 && <CheckIcon />}
                        </div>

                        <div className="relative">
                          <Input
                            id="contact-email"
                            type="email"
                            name="email"
                            value={form.email}
                            onChange={handleChange}
                            placeholder={t('contact.email')}
                            required
                            autoComplete="email"
                            aria-label={t('contact.email')}
                            className={fieldClasses}
                          />
                          {isValidEmail(form.email) && <CheckIcon />}
                        </div>

                        <Textarea
                          id="contact-message"
                          name="message"
                          value={form.message}
                          onChange={handleChange}
                          placeholder={t('contact.message')}
                          aria-label={t('contact.message')}
                          rows={3}
                          className={
                            'border-border/30 bg-background min-h-[80px] resize-none rounded-xl border px-4 py-2.5 text-[14px] ' +
                            'placeholder:text-foreground/30 transition-all duration-200 placeholder:text-[14px]' +
                            'hover:border-border/60' +
                            'focus-visible:border-primary/50 focus-visible:ring-primary/15 focus-visible:ring-2 focus-visible:ring-offset-0'
                          }
                        />

                        {submitError && (
                          <p className="text-[13px] text-red-600" role="alert">
                            {submitError}
                          </p>
                        )}

                        <div>
                          <Button
                            type="submit"
                            variant="primary"
                            size="lg"
                            showIcon
                            iconPosition="absolute"
                            disabled={isSubmitting}
                            className="mt-auto w-full"
                          >
                            {isSubmitting
                              ? t('common.loading')
                              : t('contact.submit')}
                          </Button>
                        </div>
                      </form>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
      </div>
    </section>
  )
}
