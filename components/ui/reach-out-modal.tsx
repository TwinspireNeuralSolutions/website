'use client'

import { useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { X, CheckCircle } from 'lucide-react'
import { cn } from '@/lib/utils'
import { useTranslation } from '@/i18n'

interface ReachOutModalProps {
  isOpen: boolean
  onClose: () => void
}

interface FormState {
  name: string
  email: string
  subject: string
  message: string
}

const EMPTY_FORM: FormState = { name: '', email: '', subject: '', message: '' }

const fieldClasses =
  'w-full rounded-lg border border-border bg-neutral-50 px-4 py-2.5 text-[14px] text-foreground ' +
  'placeholder:text-muted-foreground/60 outline-none transition-colors ' +
  'focus:border-primary/50 focus:ring-2 focus:ring-primary/10 focus:bg-white ' +
  'hover:border-border/80'

/**
 * ReachOutModal — Open invitation modal for general interest in joining Twinspire.
 * Submits to /api/reach-out, sends confirmation to sender + notification to team.
 */
export function ReachOutModal({ isOpen, onClose }: ReachOutModalProps) {
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
  const firstFieldRef = useRef<HTMLInputElement>(null)

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
    if (!form.name.trim()) next.name = t('reachOut.errorRequired')
    if (!form.email.trim()) next.email = t('reachOut.errorRequired')
    else if (!isValidEmail(form.email)) next.email = t('reachOut.errorEmail')
    if (!form.subject.trim()) next.subject = t('reachOut.errorRequired')
    if (!form.message.trim()) next.message = t('reachOut.errorRequired')
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!validate()) return

    setIsSubmitting(true)
    setSubmitError('')

    try {
      const res = await fetch('/api/reach-out', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: form.name.trim(),
          email: form.email.trim(),
          subject: form.subject.trim(),
          message: form.message.trim(),
        }),
      })
      if (!res.ok) {
        const json = (await res.json()) as { error?: string }
        setSubmitError(json.error ?? t('reachOut.errorGeneric'))
        return
      }
      setSubmitted(true)
    } catch {
      setSubmitError(t('reachOut.errorGeneric'))
    } finally {
      setIsSubmitting(false)
    }
  }

  if (!mounted) return null

  return createPortal(
    <div
      className="fixed inset-0 z-50 flex items-center justify-center px-4 py-6"
      role="dialog"
      aria-modal="true"
      aria-labelledby="reach-out-modal-title"
    >
      {/* Overlay */}
      <div
        className={cn(
          'absolute inset-0 bg-black/30 backdrop-blur-sm transition-opacity duration-300',
          visible ? 'opacity-100' : 'opacity-0'
        )}
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Panel */}
      <div
        className={cn(
          'relative z-10 max-h-[85vh] w-full max-w-lg overflow-y-auto rounded-2xl bg-white shadow-2xl',
          'transition-all duration-300 ease-out',
          visible ? 'scale-100 opacity-100' : 'scale-95 opacity-0'
        )}
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className="text-muted-foreground hover:text-foreground hover:bg-border/50 absolute top-4 right-4 rounded-lg p-1.5 transition-colors"
          aria-label={t('reachOut.close')}
        >
          <X className="h-4 w-4" />
        </button>

        <div className="px-8 pt-10 pb-8">
          {submitted ? (
            <div className="flex flex-col items-center gap-4 py-4 text-center">
              <div className="bg-primary/10 flex h-14 w-14 items-center justify-center rounded-full">
                <CheckCircle className="text-primary h-7 w-7" />
              </div>
              <h3 className="text-foreground text-[20px] font-bold">
                {t('reachOut.successTitle')}
              </h3>
              <p className="text-muted-foreground text-[14px] leading-[1.8] sm:text-[15px]">
                {t('reachOut.successBody')}
              </p>
              <button
                onClick={onClose}
                className="bg-primary hover:bg-primary-hover mt-2 rounded-lg px-8 py-2.5 text-[14px] font-semibold text-white transition-colors"
              >
                {t('reachOut.close')}
              </button>
            </div>
          ) : (
            <>
              {/* Header */}
              <div className="mb-7">
                <p className="text-primary mb-1 text-[11px] font-semibold tracking-[0.12em] uppercase">
                  {t('reachOut.subtitle')}
                </p>
                <h2
                  id="reach-out-modal-title"
                  className="text-foreground text-[22px] leading-tight font-bold"
                >
                  {t('reachOut.title')}
                </h2>
              </div>

              <form
                onSubmit={handleSubmit}
                noValidate
                className="flex flex-col gap-4"
              >
                {/* Full Name */}
                <div className="flex flex-col gap-1.5">
                  <label
                    htmlFor="reach-out-name"
                    className="text-foreground text-[13px] font-semibold"
                  >
                    {t('reachOut.name')} <span className="text-primary">*</span>
                  </label>
                  <input
                    ref={firstFieldRef}
                    id="reach-out-name"
                    name="name"
                    type="text"
                    autoComplete="name"
                    value={form.name}
                    onChange={handleChange}
                    placeholder={t('reachOut.namePlaceholder')}
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
                    htmlFor="reach-out-email"
                    className="text-foreground text-[13px] font-semibold"
                  >
                    {t('reachOut.email')}{' '}
                    <span className="text-primary">*</span>
                  </label>
                  <input
                    id="reach-out-email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    value={form.email}
                    onChange={handleChange}
                    placeholder={t('reachOut.emailPlaceholder')}
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

                {/* Subject */}
                <div className="flex flex-col gap-1.5">
                  <label
                    htmlFor="reach-out-subject"
                    className="text-foreground text-[13px] font-semibold"
                  >
                    {t('reachOut.subject')}{' '}
                    <span className="text-primary">*</span>
                  </label>
                  <input
                    id="reach-out-subject"
                    name="subject"
                    type="text"
                    value={form.subject}
                    onChange={handleChange}
                    placeholder={t('reachOut.subjectPlaceholder')}
                    className={cn(
                      fieldClasses,
                      errors.subject &&
                        'border-red-400 focus:border-red-400 focus:ring-red-100'
                    )}
                  />
                  {errors.subject && (
                    <p className="text-[12px] text-red-500">{errors.subject}</p>
                  )}
                </div>

                {/* Message */}
                <div className="flex flex-col gap-1.5">
                  <label
                    htmlFor="reach-out-message"
                    className="text-foreground text-[13px] font-semibold"
                  >
                    {t('reachOut.message')}{' '}
                    <span className="text-primary">*</span>
                  </label>
                  <textarea
                    id="reach-out-message"
                    name="message"
                    rows={4}
                    value={form.message}
                    onChange={handleChange}
                    placeholder={t('reachOut.messagePlaceholder')}
                    className={cn(
                      fieldClasses,
                      'resize-none',
                      errors.message &&
                        'border-red-400 focus:border-red-400 focus:ring-red-100'
                    )}
                  />
                  {errors.message && (
                    <p className="text-[12px] text-red-500">{errors.message}</p>
                  )}
                </div>

                {submitError && (
                  <p className="text-[13px] text-red-500">{submitError}</p>
                )}

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="bg-primary hover:bg-primary-hover disabled:bg-primary/60 mt-1 flex w-full items-center justify-center rounded-lg py-3 text-[14px] font-semibold text-white transition-colors"
                >
                  {isSubmitting
                    ? t('reachOut.submitting')
                    : t('reachOut.submit')}
                </button>
              </form>
            </>
          )}
        </div>
      </div>
    </div>,
    document.body
  )
}
