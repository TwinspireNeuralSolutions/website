'use client'

import { useEffect } from 'react'
import { Navbar } from '@/components/ui/navbar'
import { FooterSection } from '@/components/sections/Footer'
import { PartnersSection } from '@/components/sections/Partners'
import {
  JoinUsHero,
  JoinUsWhoWeAre,
  JoinUsHowWeWork,
  JoinUsExpect,
  JoinUsLocation,
  JoinUsTeam,
  JoinUsRoles,
} from '@/components/sections/JoinUs'

/**
 * Join Us page — hero + 6 culture sections + searchable open roles.
 */
export default function JoinUsPage() {
  // Scroll to hash section on mount (e.g. arriving from /careers/:id back button)
  useEffect(() => {
    const hash = window.location.hash
    if (!hash) return
    const el = document.getElementById(hash.slice(1))
    if (el) {
      // Small delay lets the page layout settle before scrolling
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
        <JoinUsHero />

        {/* ── Partners ── */}
        <PartnersSection />

        {/* ── Who We Are ── */}
        <JoinUsWhoWeAre />

        {/* ── How We Work ── */}
        <JoinUsHowWeWork />

        {/* ── Our Team ── */}
        <JoinUsTeam />

        {/* ── What You Can Expect ── */}
        <JoinUsExpect />

        {/* ── Based in Copenhagen ── */}
        <JoinUsLocation />

        {/* ── Open Roles ── */}
        <JoinUsRoles />
      </main>
      <PartnersSection />
      <FooterSection />
    </>
  )
}
