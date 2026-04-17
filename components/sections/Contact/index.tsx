'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Typography } from '@/components/ui/typography'
import { AnimateIn } from '@/components/ui/animate-in'
import { useTranslation } from '@/i18n'

interface ContactFormState {
  name: string
  email: string
  role: string
  clubOrClinic: string
}

/**
 * ContactSection — Split layout inspired by modern SaaS contact blocks.
 *
 * LEFT:  Title + subtitle description + contact info row (phone · address · email) with icons.
 * RIGHT: Elevated form card with stacked fields + CTA button.
 *
 * Uses the `footer-bg` lavender design token as the section background
 * to create a seamless visual transition into the footer.
 */
export function ContactSection() {
  const { t } = useTranslation()

  const [form, setForm] = useState<ContactFormState>({
    name: '',
    email: '',
    role: '',
    clubOrClinic: '',
  })

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [submitError, setSubmitError] = useState('')

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
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
    'h-12 rounded-xl border border-border/40 bg-background px-4 shadow-none ' +
    'placeholder:text-foreground/35 transition-all duration-200 ' +
    'focus-visible:border-primary/40 focus-visible:ring-1 focus-visible:ring-primary/20 focus-visible:ring-offset-0'

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
      <div className="section-x section-y section-inner mx-auto">
        <div className="border-border/40 bg-background rounded-2xl border p-8 sm:p-10 lg:p-12">
          <div className="flex flex-col gap-12 lg:flex-row lg:items-stretch lg:justify-between lg:gap-16">
            {/* ── Left: Title + description + contact info ── */}
            <AnimateIn variant="fadeUp" className="flex flex-1 flex-col">
              <h2
                id="contact-heading"
                className="mb-5 text-[28px] leading-tight font-bold tracking-wide uppercase sm:mb-6 sm:text-[32px]"
              >
                {t('contact.title')}
              </h2>

              <p className="text-foreground/55 mb-6 max-w-md text-[15px] leading-relaxed sm:mb-8">
                {t('contact.subtitle')}
              </p>

              {/* Contact info */}
              <div className="flex flex-col gap-0">
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

                {/* Address */}
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
                      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                      <circle cx="12" cy="10" r="3" />
                    </svg>
                  </div>
                  <span className="text-foreground/60 text-[15px] font-medium">
                    {t('contact.addressValue')}
                  </span>
                </div>

                {/* LinkedIn on new line */}
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
              </div>
            </AnimateIn>

            {/* ── Right: Form card ── */}
            <AnimateIn
              variant="fadeUp"
              delay={0.15}
              className="w-full lg:w-[420px] lg:shrink-0"
            >
              <div className="bg-foreground/[0.03] rounded-2xl p-8 sm:p-10">
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
                  <form
                    onSubmit={handleSubmit}
                    noValidate
                    className="flex flex-col gap-4"
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
                      {form.clubOrClinic.trim().length >= 2 && <CheckIcon />}
                    </div>

                    <div className="relative">
                      <Input
                        id="contact-role"
                        type="text"
                        name="role"
                        value={form.role}
                        onChange={handleChange}
                        placeholder={t('contact.role')}
                        required
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

                    {submitError && (
                      <p className="text-[13px] text-red-600" role="alert">
                        {submitError}
                      </p>
                    )}

                    <Button
                      type="submit"
                      variant="primary"
                      size="lg"
                      showIcon
                      disabled={isSubmitting}
                      className="mt-2 w-full"
                    >
                      {isSubmitting ? t('common.loading') : t('contact.submit')}
                    </Button>
                  </form>
                )}
              </div>
            </AnimateIn>
          </div>
        </div>
      </div>
    </section>
  )
}
