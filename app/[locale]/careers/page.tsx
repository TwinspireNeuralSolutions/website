'use client'

import { useEffect } from 'react'
import { Navbar } from '@/components/ui/navbar'
import { FooterSection } from '@/components/sections/Footer'
import { PartnersSection } from '@/components/sections/Partners'
import {
  CareersHero,
  CareersWhoWeAre,
  CareersHowWeWork,
  CareersRoles,
} from '@/components/sections/Careers'

/**
 * Careers page — hero + culture sections + open roles.
 */
export default function CareersPage() {
  // Scroll to hash section on mount (e.g. arriving from /careers/:id back button)
  useEffect(() => {
    const hash = window.location.hash
    if (!hash) return
    const el = document.getElementById(hash.slice(1))
    if (el) {
      const timer = setTimeout(
        () => el.scrollIntoView({ behavior: 'smooth' }),
        120
      )
      return () => clearTimeout(timer)
    }
  }, [])

  return (
    <>
      <Navbar />
      <main>
        {/* ── Hero ── */}
        <CareersHero />

        {/* ── Partners ── */}
        <PartnersSection />

        {/* ── Who We Are ── */}
        <CareersWhoWeAre />

        {/* ── How We Work ── */}
        <CareersHowWeWork />

        {/* ── Open Roles ── */}
        <CareersRoles />

        {/* ── Partners ── */}
        <PartnersSection />
      </main>
      <FooterSection />
    </>
  )
}
