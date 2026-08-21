'use client'

import { useState, useRef, useEffect } from 'react'
import Link from 'next/link'
import { Navbar } from '@/components/ui/navbar'
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

/* ── Custom dropdown ─────────────────────────────────────────── */
function Select({
  id,
  value,
  onChange,
  options,
  placeholder,
}: {
  id: string
  value: string
  onChange: (v: string) => void
  options: string[]
  placeholder: string
}) {
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    function close(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false)
    }
    document.addEventListener('mousedown', close)
    return () => document.removeEventListener('mousedown', close)
  }, [])

  return (
    <div ref={ref} className="relative">
      <button
        id={id}
        type="button"
        onClick={() => setOpen((o) => !o)}
        className="border-border bg-background hover:border-foreground/30 focus:border-primary/50 flex w-full items-center justify-between rounded-[6px] border px-4 py-3 text-left text-[15px] transition-colors focus:outline-none"
      >
        <span className={value ? 'text-foreground' : 'text-foreground/40'}>
          {value || placeholder}
        </span>
        <svg
          className={`text-foreground/40 h-4 w-4 flex-shrink-0 transition-transform ${open ? 'rotate-180' : ''}`}
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        >
          <polyline points="6 9 12 15 18 9" />
        </svg>
      </button>

      {open && (
        <div className="border-border bg-background absolute top-full right-0 left-0 z-50 mt-1 overflow-hidden rounded-[6px] border shadow-xl">
          {options.map((opt) => (
            <button
              key={opt}
              type="button"
              onClick={() => {
                onChange(opt)
                setOpen(false)
              }}
              className={`hover:bg-muted block w-full px-4 py-2.5 text-left text-[15px] transition-colors ${
                value === opt
                  ? 'text-primary font-medium'
                  : 'text-foreground/80'
              }`}
            >
              {opt}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}

/* ── Field wrapper ───────────────────────────────────────────── */
function Field({
  label,
  required,
  children,
}: {
  label: string
  required?: boolean
  children: React.ReactNode
}) {
  return (
    <div>
      <label className="text-foreground/80 mb-1.5 block text-[12px] font-medium">
        {label}
        {required && <span className="text-primary ml-1">*</span>}
      </label>
      {children}
    </div>
  )
}

const base =
  'w-full rounded-[6px] border border-border bg-background px-4 py-3 text-[15px] text-foreground placeholder:text-foreground/40 focus:border-primary/50 focus:outline-none focus:ring-1 focus:ring-primary/20 transition-colors'

/* ── Page ────────────────────────────────────────────────────── */
export default function BookDemoPage() {
  const [form, setForm] = useState({
    name: '',
    email: '',
    role: '',
    club: '',
    league: '',
    gpsPlatform: '',
  })
  const [status, setStatus] = useState<
    'idle' | 'submitting' | 'success' | 'error'
  >('idle')

  const set = (k: string, v: string) => setForm((f) => ({ ...f, [k]: v }))

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
    } catch {
      setStatus('error')
    }
  }

  return (
    <>
      <Navbar />
      <main className="bg-background min-h-screen">
        <div className="mx-auto max-w-xl px-6 py-28 sm:py-36">
          {status === 'success' ? (
            <div className="py-20 text-center">
              <div className="mx-auto mb-6 flex h-14 w-14 items-center justify-center rounded-full bg-green-500/10 text-green-400 ring-1 ring-green-500/20">
                <svg
                  width="22"
                  height="22"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                >
                  <polyline points="20 6 9 17 4 12" />
                </svg>
              </div>
              <h1 className="text-foreground mb-3 text-2xl font-black">
                We will be in touch
              </h1>
              <p className="text-foreground/80 text-[15px] leading-relaxed">
                Thanks for booking. We will reach out within one business day to
                confirm a time.
              </p>
              <Link
                href="/"
                className="text-primary mt-8 inline-block text-[15px] hover:underline"
              >
                Back to twinspire.ai
              </Link>
            </div>
          ) : (
            <>
              <div className="mb-12">
                <p className="text-primary mb-3 text-[11px] font-semibold tracking-widest uppercase">
                  Get started
                </p>
                <h1 className="text-foreground mb-4 text-4xl font-black tracking-tight sm:text-5xl">
                  Book a Free Demo
                </h1>
                <p className="text-foreground/80 text-[15px] leading-relaxed">
                  30 minutes. We will walk you through the platform with your
                  specific setup in mind.
                </p>
              </div>

              <div className="space-y-4">
                <div className="grid gap-4 sm:grid-cols-2">
                  <Field label="Full name" required>
                    <input
                      id="dm-name"
                      type="text"
                      className={base}
                      placeholder="Jane Smith"
                      value={form.name}
                      onChange={(e) => set('name', e.target.value)}
                    />
                  </Field>
                  <Field label="Email" required>
                    <input
                      id="dm-email"
                      type="email"
                      className={base}
                      placeholder="jane@club.com"
                      value={form.email}
                      onChange={(e) => set('email', e.target.value)}
                    />
                  </Field>
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  <Field label="Your role" required>
                    <Select
                      id="dm-role"
                      value={form.role}
                      onChange={(v) => set('role', v)}
                      options={ROLES}
                      placeholder="Select your role"
                    />
                  </Field>
                  <Field label="Club or organisation">
                    <input
                      id="dm-club"
                      type="text"
                      className={base}
                      placeholder="Your club"
                      value={form.club}
                      onChange={(e) => set('club', e.target.value)}
                    />
                  </Field>
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  <Field label="League or level">
                    <input
                      id="dm-league"
                      type="text"
                      className={base}
                      placeholder="e.g. Danish Superliga, U23"
                      value={form.league}
                      onChange={(e) => set('league', e.target.value)}
                    />
                  </Field>
                  <Field label="GPS platform you currently use">
                    <Select
                      id="dm-gps"
                      value={form.gpsPlatform}
                      onChange={(v) => set('gpsPlatform', v)}
                      options={GPS}
                      placeholder="Select platform"
                    />
                  </Field>
                </div>

                <div className="pt-2">
                  <button
                    type="button"
                    onClick={submit}
                    disabled={
                      status === 'submitting' ||
                      !form.name ||
                      !form.email ||
                      !form.role
                    }
                    className="bg-primary hover:bg-primary/90 w-full rounded-lg px-6 py-3.5 text-[15px] font-semibold text-white transition-colors disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    {status === 'submitting' ? 'Sending...' : 'Book Demo'}
                  </button>
                  {status === 'error' && (
                    <p className="mt-2 text-center text-[15px] text-red-400">
                      Something went wrong. Please email info@twinspire.ai
                      directly.
                    </p>
                  )}
                </div>

                <p className="text-foreground/60 pt-1 text-center text-[15px]">
                  Applying as a founding partner instead?{' '}
                  <Link
                    href="/#contact"
                    className="text-foreground/70 hover:text-foreground underline underline-offset-2 transition-colors"
                  >
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
