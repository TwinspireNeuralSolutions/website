'use client'

import Layout from '@/components/Layout'
import { Team } from '@/components/Modules'

export default function Home() {
  return (
    <>
      <main id="root" className="max-w-[100vw]">
        {/* Hero section - clean template */}
        <section id="hero" aria-label="Hero" className="w-full py-24 bg-gradient-to-b from-[#080F29] via-[#0F1C42] to-[#11192f]">
          <div className="mx-auto max-w-7xl px-6 text-center">
            <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl">Twinspire Neural Solutions</h1>
            <p className="mt-4 text-lg text-gray-200 max-w-2xl mx-auto">Clean startup landing area, ready for your new design.</p>
          </div>
        </section>

        {/* Add your new sections here */}
        <section id="about" className="w-full py-24">
          <div className="mx-auto max-w-7xl px-6 text-center">
            <h2 className="text-3xl font-bold text-slate-900">About</h2>
            <p className="mt-3 text-gray-600">New design content placeholder.</p>
          </div>
        </section>

        {/* Team section */}
        <Team />

        <section id="contact" className="w-full py-24">
          <div className="mx-auto max-w-7xl px-6 text-center">
            <h2 className="text-3xl font-bold text-slate-900">Contact</h2>
            <p className="mt-3 text-gray-600">Placeholder for contact block.</p>
          </div>
        </section>
      </main>
    </>
  )
}
