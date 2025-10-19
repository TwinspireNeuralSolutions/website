'use client'
import Image from 'next/image'
import { useState, useEffect } from 'react'
import { H3, AnimatedHeadline, H1 } from 'components/Atoms'
import Layout from 'components/Layout'
import {
  Navbar,
  Partners,
  Footer,
  Twinspire,
  Process,
  Benefits,
  Services,
  ReachOut,
} from 'components/Modules'

import TNSLogo from '@/public/tns-logo-black.png'

export default function Home() {
  const [shouldLoadVideo, setShouldLoadVideo] = useState(false)
  const [videoLoaded, setVideoLoaded] = useState(false)

  useEffect(() => {
    // Load video after a short delay or when user scrolls
    const timer = setTimeout(() => setShouldLoadVideo(true), 100)
    return () => clearTimeout(timer)
  }, [])

  return (
    <>
      <main id="root" className="max-w-[100vw]">
        {/* Section Hero Section */}
        <section
          id="home"
          aria-label="Hero Section"
          className="relative h-screen w-full max-w-[100vw] overflow-hidden bg-gradient-to-br from-[#0a0a2e] via-[#16213e] to-[#0f3460]"
        >
          <Navbar />

          {/* Animated background particles effect */}
          <div className="absolute inset-0 overflow-hidden opacity-20">
            <div className="absolute top-1/4 left-1/4 h-96 w-96 animate-pulse rounded-full bg-purple-500 blur-3xl"></div>
            <div className="animation-delay-2000 absolute top-1/3 right-1/4 h-96 w-96 animate-pulse rounded-full bg-blue-500 blur-3xl"></div>
            <div className="animation-delay-4000 absolute bottom-1/4 left-1/3 h-96 w-96 animate-pulse rounded-full bg-indigo-500 blur-3xl"></div>
          </div>

          {/* Load video conditionally */}
          {shouldLoadVideo && (
            <video
              autoPlay
              muted
              loop
              playsInline
              aria-label="Background hero video showcasing Twinspire platform"
              className={`absolute top-0 left-0 h-full w-full object-cover opacity-30 mix-blend-overlay transition-opacity duration-500 ${
                videoLoaded ? 'opacity-30' : 'opacity-0'
              }`}
              onLoadedData={() => setVideoLoaded(true)}
              preload="metadata"
            >
              <source src="/hero-video.mp4" type="video/mp4" />
            </video>
          )}

          {/* Glassmorphism overlay */}
          {/* <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/20 to-black/40"></div> */}

          <Layout
            sectionClassName="h-screen flex items-center"
            className="relative z-10 flex flex-col items-center text-white"
          >
            <AnimatedHeadline />

            <H3 className="mx-auto mt-6 max-w-4xl px-4 text-center text-xl leading-relaxed text-gray-200 md:text-2xl">
              AI-Driven Insights for Stronger, Smarter Recovery and Performance
            </H3>

            {/* Floating scroll indicator */}
            <div className="absolute -bottom-30 left-1/2 -translate-x-1/2">
              <div className="flex flex-col items-center gap-2 text-white/60">
                <span className="text-xs tracking-wider uppercase">Scroll</span>
                <div className="h-12 w-6 rounded-full border-2 border-white/30">
                  <div className="mx-auto mt-2 h-2 w-1 animate-bounce rounded-full bg-white/60"></div>
                </div>
              </div>
            </div>
          </Layout>
        </section>
        {/* Section  Partners */}
        <Partners />

        {/* Section Our Mission */}
        <Layout className="py-24" aria-labelledby="mission-heading">
          <div className="flex w-full flex-col flex-wrap items-center justify-center gap-12 md:flex-row md:gap-16">
            {/* Logo */}
            <div className="flex w-full max-w-full min-w-[300px] flex-1 justify-center md:justify-end">
              <Image
                src={TNSLogo}
                alt="Twinspire logo - AI-powered rehabilitation and injury prevention platform"
                width={400}
                height={400}
                className="h-auto max-w-full min-w-[150px] object-contain object-right md:object-center"
                priority
              />
            </div>

            {/* Content */}
            <div className="w-full max-w-[800px] min-w-[300px] flex-1">
              <H1 color="black" id="mission-heading" className="mb-8 text-left">
                Our Mission
              </H1>

              <div className="space-y-6 text-gray-700">
                <p className="text-xl font-bold text-gray-900">
                  Recovery today is reactive — we&apos;re making it intelligent.
                </p>

                <p>
                  Injury remains one of the biggest threats to performance —
                  whether you&apos;re an elite athlete or a patient on the path
                  to rehabilitation. Yet recovery still relies on{' '}
                  <strong>subjective feedback, incomplete data</strong>, and{' '}
                  <strong>outdated tools</strong> that fail to feedback,
                  incomplete data, and outdated tools that fail to capture what
                  truly matters: how the body is responding in real time.
                </p>

                <ul className="list-disc space-y-2 pl-6">
                  <li>
                    Every year, <strong>over 30% of athletes</strong> experience
                    injuries that could have been prevented.
                  </li>
                  <li>
                    <strong>Reinjury rates remain high</strong>, driven by poor
                    monitoring and lack of individualized insight.
                  </li>
                  <li>
                    <strong>Physiotherapists and coaches</strong> still lack the
                    objective, real-time data needed to guide and adapt
                    treatment or training.
                  </li>
                </ul>

                <p>
                  At <strong>Twinspire Neural Solutions</strong>, we believe
                  recovery should be{' '}
                  <strong>proactive, precise, and personal</strong>. <br />{' '}
                  That&apos;s why we&apos;re developing AI-powered{' '}
                  <strong>digital twins</strong> — intelligent models that
                  mirror each athlete&apos;s unique physiology, allowing
                  performance and rehabilitation to be measured, tracked, and
                  optimized with scientific precision.
                  <br />
                  <br />
                  <strong>
                    From reactive to predictive. From subjective to data-driven.
                    From injury to insight.
                  </strong>
                </p>
              </div>
            </div>
          </div>
        </Layout>
        {/* Section Platform */}
        <Twinspire />

        {/* Section Science */}
        <section id="science" className="bg-white">
          <Layout className="flex flex-col items-center justify-center">
            <H1 color="black">Science</H1>
            <div className="mt-8 max-w-4xl space-y-6 text-center">
              <p className="text-lg">
                Built on biomechanics, neuroscience, and AI research from DTU.
              </p>
              <p>
                In collaboration with leading research clinics and universities,
                we&apos;re transforming human performance science into
                actionable insights that empower physiotherapists, coaches, and
                athletes alike.
              </p>
            </div>
          </Layout>
        </section>

        {/* Section Solutions */}
        <Benefits />

        <Process />

        <Services />

        {/* Section Security */}
        <section id="security" className="bg-white py-20">
          <Layout className="flex flex-col items-center justify-center">
            <H1 color="black">Data Security & Compliance</H1>
            <div className="mt-8 max-w-4xl space-y-6 text-center">
              <p className="text-lg">
                At Twinspire, data integrity and privacy are not add-ons —
                they&apos;re part of our foundation.
              </p>
              <p>
                We operate in full compliance with GDPR, ISO data security
                standards, and emerging AI ethics frameworks, ensuring that
                every data point we process is handled with absolute
                confidentiality.
              </p>
              <p>
                All information is encrypted at rest and in transit, and user
                access is strictly controlled through secure authentication
                protocols.
              </p>
              <p>
                In partnership with The Alexandra Institute and DTU Health Tech,
                we&apos;re implementing a security-first architecture that
                guarantees both scientific rigor and user protection.
              </p>
              <p>
                Your data never leaves approved EU data centers and is processed
                only for authorized, transparent purposes.
              </p>
              <p className="font-semibold">
                Trust is earned through design—and we build for trust.
              </p>
            </div>
          </Layout>
        </section>

        {/* Section About */}
        <section id="about" className="bg-neutral-900 py-20 text-white">
          <Layout className="flex flex-col items-center justify-center">
            <H1>Our Story</H1>
            <div className="mt-8 max-w-4xl space-y-6 text-center">
              <p className="text-lg">
                Twinspire began with a moment that changed everything.
              </p>
              <p>
                After years of competing as a professional footballer, our
                founder Pouya Tobias Strand Nikoui suffered a muscle injury that
                sidelined him for most of the season. After months of
                rehabilitation, the injury returned. Not from physical weakness,
                but from informational blindness — the absence of objective,
                physiological insight.
              </p>
              <p>
                That realization made one thing clear: across sports and
                rehabilitation alike, recovery is still reactive, not
                intelligent.
              </p>
              <p>
                Determined to change that, Pouya combined his background in
                elite sport with his engineering studies at DTU, specializing in
                AI, control systems, and biomechanics. His research led to a
                patented method for creating digital twins of human physiology —
                intelligent models that learn from wearable and sensor data to
                track recovery in real time.
              </p>
              <p>
                What started as a personal problem has evolved into a mission
                shared by engineers, physiotherapists, and data scientists: to
                make recovery measurable, predictive, and personal — for
                everyone from professional athletes to rehabilitation patients.
              </p>
              <p className="font-semibold">
                Twinspire Neural Solutions was built not just to monitor
                performance, but to understand it.
              </p>
              <H1 className="mt-16">Our Team</H1>
              <p>
                Twinspire brings together experts in AI development, sports
                science, and data engineering, working in close collaboration
                with DTU and industry partners such as MyoAct and leading
                physiotherapy clinics.
              </p>
              <p>
                Our interdisciplinary approach allows us to merge academic
                excellence with real-world impact, empowering coaches,
                physiotherapists, and athletes to make smarter decisions based
                on objective data.
              </p>
              <p className="font-semibold">
                We believe the future of recovery is predictive — and we&apos;re
                building it.
              </p>
            </div>
          </Layout>
        </section>

        <ReachOut />
      </main>
      <Footer className="bg-neutral-900" />
    </>
  )
}
