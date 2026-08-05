/* eslint-disable */
'use client'

import { useState }      from 'react'
import Link              from 'next/link'
import { Navbar }        from '@/components/ui/navbar'
import { FooterSection } from '@/components/sections/Footer'

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

const GPS = ['Catapult', 'Statsports', 'Bricks', 'Other', 'None yet']

function Field({ label, required, children }: { label: string; required?: boolean; children: React.ReactNode }) {
  return (
    <div>
      <label className="mb-1.5 block text-[12px] font-medium text-white/55">
        {label}{required && <span className="text-primary ml-1">*</span>}
      </label>
      {children}
    </div>
  )
}

const base = 'w-full rounded-lg border border-white/10 bg-white/[0.05] px-4 py-3 text-[14px] text-white placeholder:text-white/25 focus:border-primary/50 focus:outline-none focus:ring-1 focus:ring-primary/20 transition-colors'
const sel  = `${base} appearance-none bg-[#0D1220]`

export default function BookDemoPage() {
  const [form, setForm] = useState({ name:'', email:'', role:'', club:'', league:'', gpsPlatform:'' })
  const [status, setStatus] = useState<'idle'|'submitting'|'success'|'error'>('idle')

  const set = (k: string, v: string) => setForm(f => ({ ...f, [k]: v }))

  const submit = async () => {
    if (!form.name.trim() || !form.email.trim() || !form.role) return
    setStatus('submitting')
    try {
      const res = await fetch('/api/book-demo', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      setStatus(res.ok ? 'success' : 'error')
    } catch { setStatus('error') }
  }

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-[#080C18]">
        <div className="mx-auto max-w-xl px-6 py-28 sm:py-36">

          {status === 'success' ? (
            <div className="py-20 text-center">
              <div className="mx-auto mb-6 flex h-14 w-14 items-center justify-center rounded-full bg-green-500/10 text-green-400 ring-1 ring-green-500/20">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="20 6 9 17 4 12"/></svg>
              </div>
              <h1 className="mb-3 text-2xl font-black text-white">We will be in touch</h1>
              <p className="text-white/50 text-[15px] leading-relaxed">
                Thanks for booking. We will reach out within one business day to confirm a time that works for you.
              </p>
              <Link href="/" className="text-primary mt-8 inline-block text-[13px] hover:underline">
                Back to twinspire.ai
              </Link>
            </div>
          ) : (
            <>
              {/* Header */}
              <div className="mb-12">
                <p className="text-primary mb-3 text-[11px] font-semibold uppercase tracking-widest">Get started</p>
                <h1 className="mb-4 text-4xl font-black tracking-tight text-white sm:text-5xl">
                  Book a Free Demo
                </h1>
                <p className="text-white/45 text-[15px] leading-relaxed">
                  30 minutes. We will walk you through the platform with your specific setup in mind.
                </p>
              </div>

              {/* Form */}
              <div className="space-y-4">

                <div className="grid gap-4 sm:grid-cols-2">
                  <Field label="Full name" required>
                    <input id="dm-name" type="text" className={base} placeholder="Jane Smith"
                      value={form.name} onChange={e => set('name', e.target.value)} />
                  </Field>
                  <Field label="Email" required>
                    <input id="dm-email" type="email" className={base} placeholder="jane@club.com"
                      value={form.email} onChange={e => set('email', e.target.value)} />
                  </Field>
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  <Field label="Your role" required>
                    <div className="relative">
                      <select id="dm-role" className={sel} value={form.role} onChange={e => set('role', e.target.value)}>
                        <option value="" disabled>Select your role</option>
                        {ROLES.map(r => <option key={r} value={r}>{r}</option>)}
                      </select>
                      <svg className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-white/30" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="6 9 12 15 18 9"/></svg>
                    </div>
                  </Field>
                  <Field label="Club or organisation">
                    <input id="dm-club" type="text" className={base} placeholder="Your club"
                      value={form.club} onChange={e => set('club', e.target.value)} />
                  </Field>
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  <Field label="League or level">
                    <input id="dm-league" type="text" className={base} placeholder="e.g. Danish Superliga, U23"
                      value={form.league} onChange={e => set('league', e.target.value)} />
                  </Field>
                  <Field label="GPS platform you currently use">
                    <div className="relative">
                      <select id="dm-gps" className={sel} value={form.gpsPlatform} onChange={e => set('gpsPlatform', e.target.value)}>
                        <option value="" disabled>Select platform</option>
                        {GPS.map(p => <option key={p} value={p}>{p}</option>)}
                      </select>
                      <svg className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-white/30" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="6 9 12 15 18 9"/></svg>
                    </div>
                  </Field>
                </div>

                <div className="pt-2">
                  <button
                    type="button"
                    onClick={submit}
                    disabled={status === 'submitting' || !form.name || !form.email || !form.role}
                    className="bg-primary hover:bg-primary/90 w-full rounded-lg px-6 py-3.5 text-[14px] font-semibold text-white transition-colors disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    {status === 'submitting' ? 'Sending...' : 'Book Demo'}
                  </button>
                  {status === 'error' && (
                    <p className="mt-2 text-center text-[13px] text-red-400">Something went wrong. Please email info@twinspire.ai directly.</p>
                  )}
                </div>

                <p className="pt-1 text-center text-[13px] text-white/30">
                  Applying as a founding partner instead?{' '}
                  <Link href="/#contact" className="text-white/50 underline underline-offset-2 hover:text-white transition-colors">
                    Apply here
                  </Link>
                </p>

              </div>
            </>
          )}
        </div>
      </main>
      <FooterSection />
    </>
  )
}
