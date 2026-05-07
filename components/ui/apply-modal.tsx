'use client'

import { useEffect, useRef, useState } from 'react'
import { X, Upload, CheckCircle, Loader2 } from 'lucide-react'
import { cn } from '@/lib/utils'
import { useTranslation } from '@/i18n'

interface ApplyModalProps {
  jobTitle: string
  jobId: string
  isOpen: boolean
  onClose: () => void
}

interface FormState {
  name: string
  email: string
  phone: string
  linkedin: string
  message: string
  cv: File | null
}

const EMPTY_FORM: FormState = {
  name: '',
  email: '',
  phone: '',
  linkedin: '',
  message: '',
  cv: null,
}

const fieldClasses =
  'w-full rounded-lg border border-border bg-neutral-50 px-4 py-2.5 text-[14px] text-foreground ' +
  'placeholder:text-muted-foreground/60 outline-none transition-colors ' +
  'focus:border-primary/50 focus:ring-2 focus:ring-primary/10 focus:bg-white ' +
  'hover:border-border/80'

/**
 * ApplyModal — Job application modal with file upload.
 * Submits to /api/apply, sends notification to recruiter + confirmation to applicant.
 */
export function ApplyModal({
  jobTitle,
  jobId,
  isOpen,
  onClose,
}: ApplyModalProps) {
  const { t } = useTranslation()
  const [form, setForm] = useState<FormState>(EMPTY_FORM)
  const [errors, setErrors] = useState<
    Partial<Record<keyof FormState, string>>
  >({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [submitError, setSubmitError] = useState('')
  const [mounted, setMounted] = useState(false)
  const [visible, setVisible] = useState(false)
  const dialogRef = useRef<HTMLDivElement>(null)
  const firstFieldRef = useRef<HTMLInputElement>(null)

  // Animate in/out; focus first field on open; reset on close
  useEffect(() => {
    if (isOpen) {
      setMounted(true)
      requestAnimationFrame(() => requestAnimationFrame(() => setVisible(true)))
      setTimeout(() => firstFieldRef.current?.focus(), 80)
      document.body.style.overflow = 'hidden'
    } else {
      setVisible(false)
      document.body.style.overflow = ''
      setTimeout(() => {
        setMounted(false)
        setForm(EMPTY_FORM)
        setErrors({})
        setSubmitted(false)
        setSubmitError('')
      }, 320)
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [isOpen])

  // Close on Escape
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    document.addEventListener('keydown', handler)
    return () => document.removeEventListener('keydown', handler)
  }, [onClose])

  const isValidEmail = (v: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v)

  function validate(): boolean {
    const next: Partial<Record<keyof FormState, string>> = {}
    if (!form.name.trim()) next.name = t('apply.errorRequired')
    if (!form.email.trim()) next.email = t('apply.errorRequired')
    else if (!isValidEmail(form.email)) next.email = t('apply.errorEmail')
    if (!form.phone.trim()) next.phone = t('apply.errorRequired')
    if (!form.linkedin.trim()) next.linkedin = t('apply.errorRequired')
    if (!form.message.trim()) next.message = t('apply.errorRequired')
    if (!form.cv) next.cv = t('apply.errorRequired')
    setErrors(next)
    return Object.keys(next).length === 0
  }

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target
    setForm((prev) => ({ ...prev, [name]: value }))
    if (errors[name as keyof FormState]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }))
    }
  }

  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] ?? null
    setForm((prev) => ({ ...prev, cv: file }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!validate()) return

    setIsSubmitting(true)
    setSubmitError('')

    try {
      const data = new FormData()
      data.set('name', form.name.trim())
      data.set('email', form.email.trim())
      data.set('phone', form.phone.trim())
      data.set('linkedin', form.linkedin.trim())
      data.set('message', form.message.trim())
      data.set('jobTitle', jobTitle)
      data.set('jobId', jobId)
      if (form.cv) data.set('cv', form.cv)

      const res = await fetch('/api/apply', { method: 'POST', body: data })
      if (!res.ok) {
        const json = (await res.json()) as { error?: string }
        setSubmitError(json.error ?? t('apply.errorGeneric'))
        return
      }
      setSubmitted(true)
    } catch {
      setSubmitError(t('apply.errorGeneric'))
    } finally {
      setIsSubmitting(false)
    }
  }

  if (!mounted) return null

  return (
    /* Backdrop */
    <div
      className="fixed inset-0 z-50 flex items-end justify-center sm:pb-8"
      role="dialog"
      aria-modal="true"
      aria-labelledby="apply-modal-title"
    >
      {/* Overlay */}
      <div
        className={cn(
          'absolute inset-0 bg-black/40 backdrop-blur-sm transition-opacity duration-300',
          visible ? 'opacity-100' : 'opacity-0'
        )}
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Panel */}
      <div
        ref={dialogRef}
        className={cn(
          'relative z-10 max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-t-2xl bg-white shadow-2xl sm:rounded-2xl',
          'transition-transform duration-300 ease-out',
          visible ? 'translate-y-0' : 'translate-y-full'
        )}
      >
        {/* Header */}
        <div className="bg-primary flex shrink-0 items-start justify-between px-6 py-5 sm:px-8">
          <div>
            <p className="mb-1 text-[11px] font-medium tracking-[0.1em] text-white/70 uppercase">
              {t('apply.applyingFor')}
            </p>
            <h2
              id="apply-modal-title"
              className="text-[18px] leading-snug font-bold text-white sm:text-[20px]"
            >
              {jobTitle}
            </h2>
          </div>
          <button
            onClick={onClose}
            className="mt-0.5 ml-4 shrink-0 p-1.5 text-white/70 transition-colors hover:bg-white/15 hover:text-white"
            aria-label={t('apply.close')}
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Body */}
        <div className="px-6 py-6 sm:px-8 sm:py-8">
          {submitted ? (
            /* Success state */
            <div className="flex flex-col items-center gap-4 py-6 text-center">
              <div className="bg-primary/10 flex h-16 w-16 items-center justify-center rounded-full">
                <CheckCircle className="text-primary h-8 w-8" />
              </div>
              <h3 className="text-foreground text-[20px] font-bold">
                {t('apply.successTitle')}
              </h3>
              <p className="text-muted-foreground text-[14px] leading-[1.8] sm:text-[15px]">
                {t('apply.successBody')}
              </p>
              <button
                onClick={onClose}
                className="bg-primary hover:bg-primary-hover mt-2 rounded-lg px-8 py-2.5 text-[14px] font-semibold text-white transition-colors"
              >
                {t('apply.close')}
              </button>
            </div>
          ) : (
            <form
              onSubmit={handleSubmit}
              noValidate
              className="flex flex-col gap-5"
            >
              {/* Full Name */}
              <div className="flex flex-col gap-1.5">
                <label
                  htmlFor="apply-name"
                  className="text-foreground text-[13px] font-semibold"
                >
                  {t('apply.name')} <span className="text-primary">*</span>
                </label>
                <input
                  ref={firstFieldRef}
                  id="apply-name"
                  name="name"
                  type="text"
                  autoComplete="name"
                  value={form.name}
                  onChange={handleChange}
                  placeholder={t('apply.namePlaceholder')}
                  className={cn(
                    fieldClasses,
                    errors.name &&
                      'border-red-400 focus:border-red-400 focus:ring-red-100'
                  )}
                />
                {errors.name && (
                  <p className="text-[12px] text-red-500">{errors.name}</p>
                )}
              </div>

              {/* Email */}
              <div className="flex flex-col gap-1.5">
                <label
                  htmlFor="apply-email"
                  className="text-foreground text-[13px] font-semibold"
                >
                  {t('apply.email')} <span className="text-primary">*</span>
                </label>
                <input
                  id="apply-email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  value={form.email}
                  onChange={handleChange}
                  placeholder={t('apply.emailPlaceholder')}
                  className={cn(
                    fieldClasses,
                    errors.email &&
                      'border-red-400 focus:border-red-400 focus:ring-red-100'
                  )}
                />
                {errors.email && (
                  <p className="text-[12px] text-red-500">{errors.email}</p>
                )}
              </div>

              {/* Phone */}
              <div className="flex flex-col gap-1.5">
                <label
                  htmlFor="apply-phone"
                  className="text-foreground text-[13px] font-semibold"
                >
                  {t('apply.phone')} <span className="text-primary">*</span>
                </label>
                <input
                  id="apply-phone"
                  name="phone"
                  type="tel"
                  autoComplete="tel"
                  value={form.phone}
                  onChange={handleChange}
                  placeholder={t('apply.phonePlaceholder')}
                  className={cn(
                    fieldClasses,
                    errors.phone &&
                      'border-red-400 focus:border-red-400 focus:ring-red-100'
                  )}
                />
                {errors.phone && (
                  <p className="text-[12px] text-red-500">{errors.phone}</p>
                )}
              </div>

              {/* LinkedIn */}
              <div className="flex flex-col gap-1.5">
                <label
                  htmlFor="apply-linkedin"
                  className="text-foreground text-[13px] font-semibold"
                >
                  {t('apply.linkedin')} <span className="text-primary">*</span>
                </label>
                <input
                  id="apply-linkedin"
                  name="linkedin"
                  type="url"
                  autoComplete="url"
                  value={form.linkedin}
                  onChange={handleChange}
                  placeholder={t('apply.linkedinPlaceholder')}
                  className={cn(
                    fieldClasses,
                    errors.linkedin &&
                      'border-red-400 focus:border-red-400 focus:ring-red-100'
                  )}
                />
                {errors.linkedin && (
                  <p className="text-[12px] text-red-500">{errors.linkedin}</p>
                )}
              </div>

              {/* Message */}
              <div className="flex flex-col gap-1.5">
                <label
                  htmlFor="apply-message"
                  className="text-foreground text-[13px] font-semibold"
                >
                  {t('apply.message')} <span className="text-primary">*</span>
                </label>
                <textarea
                  id="apply-message"
                  name="message"
                  rows={4}
                  value={form.message}
                  onChange={handleChange}
                  placeholder={t('apply.messagePlaceholder')}
                  className={cn(
                    fieldClasses,
                    'resize-none leading-[1.6]',
                    errors.message &&
                      'border-red-400 focus:border-red-400 focus:ring-red-100'
                  )}
                />
                {errors.message && (
                  <p className="text-[12px] text-red-500">{errors.message}</p>
                )}
              </div>

              {/* CV upload */}
              <div className="flex flex-col gap-1.5">
                <label
                  htmlFor="apply-cv"
                  className="text-foreground text-[13px] font-semibold"
                >
                  {t('apply.cv')} <span className="text-primary">*</span>
                </label>
                <label
                  htmlFor="apply-cv"
                  className={cn(
                    'border-border flex cursor-pointer items-center gap-3 rounded-lg border border-dashed',
                    'hover:border-primary/40 hover:bg-primary/[0.02] bg-neutral-50 px-4 py-3 transition-colors'
                  )}
                >
                  <Upload
                    className="text-muted-foreground h-4 w-4 shrink-0"
                    aria-hidden
                  />
                  <span
                    className={cn(
                      'text-[13px]',
                      form.cv
                        ? 'text-foreground font-medium'
                        : 'text-muted-foreground'
                    )}
                  >
                    {form.cv ? form.cv.name : t('apply.cvPlaceholder')}
                  </span>
                  <input
                    id="apply-cv"
                    name="cv"
                    type="file"
                    accept=".pdf,.doc,.docx"
                    onChange={handleFile}
                    className="sr-only"
                  />
                </label>
                <p className="text-muted-foreground text-[11px]">
                  {t('apply.cvHint')}
                </p>
                {errors.cv && (
                  <p className="text-[12px] text-red-500">{errors.cv}</p>
                )}
              </div>

              {/* Server error */}
              {submitError && (
                <p className="rounded-lg bg-red-50 px-4 py-3 text-[13px] text-red-600">
                  {submitError}
                </p>
              )}

              {/* Submit */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="bg-primary hover:bg-primary-hover mt-1 flex w-full items-center justify-center gap-2 rounded-lg py-3.5 text-[15px] font-semibold text-white transition-colors disabled:opacity-60"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" aria-hidden />
                    {t('apply.submitting')}
                  </>
                ) : (
                  t('apply.submit')
                )}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  )
}
