'use client'

import { useState } from 'react'
import { useTranslations } from 'next-intl'
import Link from 'next/link'

const ROLES = [
  'Head of Performance',
  'Physiotherapist',
  'Coach',
  'Head of Medical',
  'Athletic Director',
  'Player',
  'Personal Trainer',
  'Other',
]

const GPS_PLATFORMS = ['Catapult', 'Statsports', 'Bricks', 'Other', 'None yet']

function CheckIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="20 6 9 17 4 12" />
    </svg>
  )
}

export function BookDemoSection() {
  const t = useTranslations()
  const [form, setForm] = useState({
    name: '', email: '', role: '', club: '', league: '', gpsPlatform: '',
  })
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle')

  const set = (k: string, v: string) => setForm(f => ({ ...f, [k]: v }))

  const handleSubmit = async () => {
    if (!form.name.trim() || !form.email.trim() || !form.role) return
    setStatus('submitting')
    try {
      const res = await fetch('/api/book-demo', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      setStatus(res.ok ? 'success' : 'error')
    } catch {
      setStatus('error')
    }
  }

  const inputCls = 'w-full rounded-lg border border-white/10 bg-white/5 px-4 py-3 text-[14px] text-white placeholder:text-white/30 focus:border-primary/60 focus:outline-none focus:ring-1 focus:ring-primary/30 transition-colors'
  const selectCls = `${inputCls} appearance-none`

  if (status === 'success') {
    return (
      <section id="book-demo" className="bg-background py-24 sm:py-32">
        <div className="mx-auto max-w-lg px-6 text-center">
          <div className="bg-primary/10 border-primary/20 mx-auto mb-6 flex h-14 w-14 items-center justify-center rounded-full border text-primary">
            <CheckIcon />
          </div>
          <h2 className="mb-3 text-2xl font-bold text-white">We will be in touch</h2>
          <p className="text-foreground/60 text-[15px] leading-relaxed">
            Thanks for requesting a demo. We will reach out within one business day to confirm a time.
          </p>
        </div>
      </section>
    )
  }

  return (
    <section id="book-demo" className="bg-background py-24 sm:py-32">
      <div className="mx-auto max-w-2xl px-6">

        {/* Header */}
        <div className="mb-12 text-center">
          <p className="text-primary mb-3 text-[11px] font-semibold uppercase tracking-widest">Get started</p>
          <h2 className="mb-4 text-4xl font-black tracking-tight text-white sm:text-5xl">
            Book a Free Demo
          </h2>
          <p className="text-foreground/55 mx-auto max-w-md text-[15px] leading-relaxed">
            30 minutes. We will walk you through the platform with your setup in mind.
          </p>
        </div>

        {/* Form */}
        <div className="space-y-4">
          {/* Row 1 */}
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className="mb-1.5 block text-[12px] font-medium text-white/60">Full name *</label>
              <input
                type="text"
                className={inputCls}
                placeholder="Jane Smith"
                value={form.name}
                onChange={e => set('name', e.target.value)}
              />
            </div>
            <div>
              <label className="mb-1.5 block text-[12px] font-medium text-white/60">Email *</label>
              <input
                type="email"
                className={inputCls}
                placeholder="jane@club.com"
                value={form.email}
                onChange={e => set('email', e.target.value)}
              />
            </div>
          </div>

          {/* Row 2 */}
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className="mb-1.5 block text-[12px] font-medium text-white/60">Your role *</label>
              <div className="relative">
                <select
                  className={selectCls}
                  value={form.role}
                  onChange={e => set('role', e.target.value)}
                >
                  <option value="" disabled>Select your role</option>
                  {ROLES.map(r => <option key={r} value={r}>{r}</option>)}
                </select>
                <svg className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-white/30" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="6 9 12 15 18 9"/></svg>
              </div>
            </div>
            <div>
              <label className="mb-1.5 block text-[12px] font-medium text-white/60">Club or organisation</label>
              <input
                type="text"
                className={inputCls}
                placeholder="Your club or organisation"
                value={form.club}
                onChange={e => set('club', e.target.value)}
              />
            </div>
          </div>

          {/* Row 3 */}
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className="mb-1.5 block text-[12px] font-medium text-white/60">League or level</label>
              <input
                type="text"
                className={inputCls}
                placeholder="e.g. Danish Superliga, U23"
                value={form.league}
                onChange={e => set('league', e.target.value)}
              />
            </div>
            <div>
              <label className="mb-1.5 block text-[12px] font-medium text-white/60">GPS platform you currently use</label>
              <div className="relative">
                <select
                  className={selectCls}
                  value={form.gpsPlatform}
                  onChange={e => set('gpsPlatform', e.target.value)}
                >
                  <option value="" disabled>Select platform</option>
                  {GPS_PLATFORMS.map(p => <option key={p} value={p}>{p}</option>)}
                </select>
                <svg className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-white/30" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="6 9 12 15 18 9"/></svg>
              </div>
            </div>
          </div>

          {/* Submit */}
          <div className="pt-2">
            <button
              type="button"
              onClick={handleSubmit}
              disabled={status === 'submitting' || !form.name || !form.email || !form.role}
              className="bg-primary hover:bg-primary/90 w-full rounded-lg px-6 py-3.5 text-[14px] font-semibold text-white transition-colors disabled:cursor-not-allowed disabled:opacity-50"
            >
              {status === 'submitting' ? 'Sending...' : 'Book Demo'}
            </button>
            {status === 'error' && (
              <p className="mt-2 text-center text-[13px] text-red-400">Something went wrong. Please try again or email info@twinspire.ai</p>
            )}
          </div>

          {/* Secondary CTA */}
          <p className="pt-1 text-center text-[13px] text-white/35">
            Looking to apply as a founding partner instead?{' '}
            <Link href="#apply" className="text-white/60 underline underline-offset-2 hover:text-white transition-colors">
              Apply here
            </Link>
          </p>
        </div>

      </div>
    </section>
  )
}
