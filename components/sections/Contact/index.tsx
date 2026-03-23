'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Typography } from '@/components/ui/typography'
import { useTranslation } from '@/i18n'

interface ContactFormState {
  name: string
  email: string
  role: string
  clubOrClinic: string
  message: string
}

/**
 * ContactSection — "Join Our Founding Pilot Cohort" contact form.
 *
 * Split layout: form on the left, contact info on the right.
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
    message: '',
  })

  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    // TODO: wire up to backend / email service
    console.log(form)
    setIsSubmitting(false)
  }

  /**
   * Borderless glass input — no outline, soft white/blur fill blends into the
   * lavender section background. Focus adds a faint primary tint only.
   */
  const glassField =
    'h-11 rounded-xl border-0 bg-white/60 px-4 shadow-none backdrop-blur-md ' +
    'placeholder:text-foreground/30 transition-all duration-200 ' +
    'focus-visible:bg-white/80 focus-visible:ring-0 focus-visible:ring-offset-0'

  return (
    <section
      id="contact"
      aria-labelledby="contact-heading"
      className="bg-footer-bg w-full"
    >
      <div className="section-x section-y section-inner mx-auto">
        <Typography
          id="contact-heading"
          variant="title"
          as="h2"
          className="mb-12 sm:mb-14 lg:mb-16"
        >
          {t('contact.title')}
        </Typography>

        <div className="flex flex-col gap-12 md:flex-row md:gap-0">
          {/* ── Form ── */}
          <form
            onSubmit={handleSubmit}
            noValidate
            className="flex flex-1 flex-col gap-6"
          >
            {/* Name + Email */}
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div className="flex flex-col gap-1.5">
                <Label
                  htmlFor="contact-name"
                  className="text-foreground/50 text-xs font-medium"
                >
                  {t('contact.name')}
                </Label>
                <Input
                  id="contact-name"
                  type="text"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  placeholder={t('contact.namePlaceholder')}
                  required
                  autoComplete="name"
                  className={glassField}
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <Label
                  htmlFor="contact-email"
                  className="text-foreground/50 text-xs font-medium"
                >
                  {t('contact.email')}
                </Label>
                <Input
                  id="contact-email"
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  placeholder={t('contact.emailPlaceholder')}
                  required
                  autoComplete="email"
                  className={glassField}
                />
              </div>
            </div>

            {/* Role + Club or Clinic */}
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div className="flex flex-col gap-1.5">
                <Label
                  htmlFor="contact-role"
                  className="text-foreground/50 text-xs font-medium"
                >
                  {t('contact.role')}
                </Label>
                <Input
                  id="contact-role"
                  type="text"
                  name="role"
                  value={form.role}
                  onChange={handleChange}
                  placeholder={t('contact.rolePlaceholder')}
                  required
                  className={glassField}
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <Label
                  htmlFor="contact-clubOrClinic"
                  className="text-foreground/50 text-xs font-medium"
                >
                  {t('contact.clubOrClinic')}
                </Label>
                <Input
                  id="contact-clubOrClinic"
                  type="text"
                  name="clubOrClinic"
                  value={form.clubOrClinic}
                  onChange={handleChange}
                  placeholder={t('contact.clubOrClinicPlaceholder')}
                  autoComplete="organization"
                  className={glassField}
                />
              </div>
            </div>

            {/* Message */}
            <div className="flex flex-col gap-1.5">
              <Label
                htmlFor="contact-message"
                className="text-foreground/50 text-xs font-medium"
              >
                {t('contact.message')}
              </Label>
              <Textarea
                id="contact-message"
                name="message"
                value={form.message}
                onChange={handleChange}
                rows={5}
                placeholder={t('contact.messagePlaceholder')}
                className="placeholder:text-foreground/30 resize-none rounded-xl border-0 bg-white/60 px-4 py-3 shadow-none backdrop-blur-md transition-all duration-200 focus-visible:bg-white/80 focus-visible:ring-0 focus-visible:ring-offset-0"
              />
            </div>

            <Button
              type="submit"
              variant="primary"
              size="lg"
              disabled={isSubmitting}
              className="mt-2 w-full"
            >
              {isSubmitting ? t('common.loading') : t('contact.submit')}
            </Button>
          </form>

          {/* ── Contact info ── */}
          <div className="flex flex-col gap-10 md:w-[260px] md:shrink-0 md:pl-12 lg:w-[300px] lg:pl-16">
            <div>
              <p className="text-foreground/50 mb-2 text-xs font-medium">
                {t('contact.address')}
              </p>
              <p className="text-foreground/80 text-[15px] font-medium">
                {t('contact.addressValue')}
              </p>
            </div>

            <div>
              <p className="text-foreground/50 mb-2 text-xs font-medium">
                {t('contact.contactInfo')}
              </p>
              <p className="text-foreground/80 text-[15px] font-medium">
                {t('contact.phone')}
              </p>
              <p className="text-foreground/80 text-[15px] font-medium">
                {t('contact.emailContact')}
              </p>
            </div>

            {/* LinkedIn */}
            <a
              href="https://www.linkedin.com/company/twinspire-neural-solutions"
              target="_blank"
              rel="noopener noreferrer"
              className="text-foreground/35 hover:text-foreground/70 transition-colors duration-200"
              aria-label={t('footer.linkedinLabel')}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="currentColor"
                aria-hidden="true"
              >
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
