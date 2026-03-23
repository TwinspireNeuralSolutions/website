'use client'

import { useState } from 'react'
import Layout from '@/components/Layout'

export const JoinCohort = () => {
  const [form, setForm] = useState({
    name: '',
    email: '',
    role: '',
    clubOrClinic: '',
    message: '',
  })

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log(form)
  }

  const inputClass =
    'w-full rounded-lg bg-white px-4 py-3 text-sm text-slate-900 outline-none placeholder:text-slate-400 focus:ring-2 focus:ring-slate-300'

  return (
    <Layout
      sectionClassName="bg-[#E8E5F0] !py-0"
      className="py-4 sm:py-6 md:py-8 lg:py-10"
    >
      <h2 className="mb-8 text-[22px] leading-[1.1] font-bold tracking-[-0.02em] text-slate-900 sm:mb-10 sm:text-[28px] md:text-[34px] lg:mb-12 lg:text-[42px]">
        Join Our Founding Pilot Cohort.
      </h2>

      <div className="flex flex-col gap-10 md:flex-row md:gap-12 lg:gap-16">
        {/* Form */}
        <form onSubmit={handleSubmit} className="flex flex-1 flex-col gap-5">
          {/* Name + Email row */}
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
            <div className="flex flex-col gap-1.5">
              <label className="text-[11px] font-medium tracking-wide text-slate-500">
                Name
              </label>
              <input
                type="text"
                name="name"
                value={form.name}
                onChange={handleChange}
                placeholder="Jane Smith"
                required
                className={inputClass}
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-[11px] font-medium tracking-wide text-slate-500">
                Email
              </label>
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                placeholder="jane@frame.com"
                required
                className={inputClass}
              />
            </div>
          </div>

          {/* Role + Club or Clinic row */}
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
            <div className="flex flex-col gap-1.5">
              <label className="text-[11px] font-medium tracking-wide text-slate-500">
                Role
              </label>
              <input
                type="text"
                name="role"
                value={form.role}
                onChange={handleChange}
                placeholder="Role"
                required
                className={inputClass}
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-[11px] font-medium tracking-wide text-slate-500">
                Club or Clinic
              </label>
              <input
                type="text"
                name="clubOrClinic"
                value={form.clubOrClinic}
                onChange={handleChange}
                placeholder="Club or Clinic"
                className={inputClass}
              />
            </div>
          </div>

          {/* Message */}
          <div className="flex flex-col gap-1.5">
            <label className="text-[11px] font-medium tracking-wide text-slate-500">
              Message
            </label>
            <textarea
              name="message"
              value={form.message}
              onChange={handleChange}
              rows={6}
              placeholder="message"
              className="min-h-[120px] w-full resize rounded-lg bg-white px-4 py-3 text-sm text-slate-900 outline-none placeholder:text-slate-400 focus:ring-2 focus:ring-slate-300"
            />
          </div>

          <button
            type="submit"
            className="mt-2 w-full rounded-lg bg-[#1a1a5e] py-3.5 text-sm font-semibold tracking-wide text-white transition-colors hover:bg-[#15154d]"
          >
            Submit
          </button>
        </form>

        {/* Contact info */}
        <div className="flex flex-col gap-8 md:w-[240px] md:shrink-0 md:pt-6 lg:w-[280px]">
          <div>
            <h3 className="mb-1 text-lg font-bold text-slate-900 sm:text-xl">
              Adress
            </h3>
            <p className="text-base leading-relaxed text-slate-600">
              Copenhagen, Denmark
            </p>
          </div>
          <div>
            <h3 className="mb-1 text-lg font-bold text-slate-900 sm:text-xl">
              Contact Information
            </h3>
            <p className="text-base leading-relaxed text-slate-600">
              +45 2020 4040
            </p>
            <p className="text-base leading-relaxed text-slate-600">
              info@twinspire.ai
            </p>
          </div>
          {/* LinkedIn icon */}
          <a
            href="https://www.linkedin.com/company/twinspire-neural-solutions"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-1 flex h-8 w-8 items-center justify-center rounded border border-slate-400 text-slate-500 transition-colors hover:text-slate-900"
            aria-label="LinkedIn"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="currentColor"
            >
              <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
            </svg>
          </a>
        </div>
      </div>
    </Layout>
  )
}
