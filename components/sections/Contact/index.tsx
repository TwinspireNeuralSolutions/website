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
        <AnimateIn variant="scaleUp" duration={0.6}>
          <div className="border-border/40 bg-background mx-auto w-full max-w-[1060px] rounded-2xl border p-4 sm:p-6 lg:p-8">
            <div className="flex flex-col gap-8 sm:gap-10 lg:flex-row lg:items-stretch lg:justify-between lg:gap-10">
              {/* ── Left: Title + description + contact info ── */}
              <AnimateIn
                variant="slideLeft"
                delay={0.2}
                duration={0.6}
                className="order-1 flex flex-1 flex-col lg:order-1"
              >
                <h2
                  id="contact-heading"
                  className="mb-3 text-[22px] leading-[1.2] tracking-wide uppercase sm:mb-5 sm:text-[26px] lg:mb-6 lg:text-[32px]"
                >
                  <span className="text-foreground font-bold">
                    {t('contact.title')}
                  </span>
                  <br />
                  <span className="text-primary font-bold">
                    {t('contact.titleAccent')}
                  </span>
                </h2>

                <p className="text-foreground/55 mb-4 max-w-md text-[13px] leading-relaxed sm:mb-6 sm:text-[15px]">
                  {t('contact.subtitle')}
                </p>

                {/* Contact info — visible on desktop, hidden on mobile (shown below form) */}
                <div className="mt-auto hidden grid-cols-1 gap-1 sm:grid-cols-2 lg:grid">
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
                variant="slideRight"
                delay={0.3}
                duration={0.6}
                className="order-2 w-full lg:order-2 lg:w-[380px] lg:shrink-0"
              >
                <div className="bg-foreground/[0.02] border-t-primary flex h-full flex-col overflow-hidden rounded-2xl border-t-[3px] p-5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg sm:p-6 lg:p-8">
                  <AnimateIn variant="fadeDown" delay={0.4} duration={0.5}>
                    <h3 className="text-foreground/30 mb-1 text-center text-[16px] font-semibold tracking-wide uppercase">
                      {t('contact.formTitle')}
                    </h3>
                    <div className="border-border/20 mx-auto mb-5 w-10 border-t" />
                  </AnimateIn>
                  {submitted ? (
                    <AnimateIn variant="scaleUp" delay={0.1} duration={0.5}>
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
                    </AnimateIn>
                  ) : (
                    <form
                      onSubmit={handleSubmit}
                      noValidate
                      className="flex flex-1 flex-col gap-3.5"
                    >
                      <AnimateIn variant="fadeUp" delay={0.45} duration={0.4}>
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
                      </AnimateIn>

                      <AnimateIn variant="fadeUp" delay={0.55} duration={0.4}>
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
                      </AnimateIn>

                      <AnimateIn variant="fadeUp" delay={0.65} duration={0.4}>
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
                      </AnimateIn>

                      <AnimateIn variant="fadeUp" delay={0.75} duration={0.4}>
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
                      </AnimateIn>

                      {submitError && (
                        <p className="text-[13px] text-red-600" role="alert">
                          {submitError}
                        </p>
                      )}

                      <AnimateIn variant="fadeUp" delay={0.85} duration={0.4}>
                        <Button
                          type="submit"
                          variant="primary"
                          size="lg"
                          showIcon
                          disabled={isSubmitting}
                          className="mt-auto w-full"
                        >
                          {isSubmitting
                            ? t('common.loading')
                            : t('contact.submit')}
                        </Button>
                      </AnimateIn>
                    </form>
                  )}
                </div>
              </AnimateIn>

              {/* ── Mobile-only: Contact info below form ── */}
              <AnimateIn
                variant="fadeUp"
                delay={0.4}
                duration={0.5}
                className="order-3 lg:hidden"
              >
                <div className="grid grid-cols-1 gap-1 sm:grid-cols-2">
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
            </div>
          </div>
        </AnimateIn>
      </div>
    </section>
  )
}
