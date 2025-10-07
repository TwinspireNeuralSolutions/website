'use client'
import Image from 'next/image'
import { useState, useEffect } from 'react'
import { H3, AnimatedHeadline, H1 } from 'components/Atoms'
import Layout from 'components/Layout'
import {
  Navbar,
  Partners,
  Footer,
  Reviews,
  Twinspire,
  Benefits,
  Process,
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
          className="relative h-screen w-full max-w-[100vw] overflow-hidden bg-black"
        >
          <Navbar />

          {/* Load video conditionally */}
          {shouldLoadVideo && (
            <video
              autoPlay
              muted
              loop
              playsInline
              aria-label="Background hero video showcasing Twinspire platform"
              className={`absolute left-0 top-0 h-full w-full object-cover grayscale transition-opacity duration-500 ${
                videoLoaded ? 'opacity-100' : 'opacity-0'
              }`}
              onLoadedData={() => setVideoLoaded(true)}
              preload="metadata"
            >
              <source src="/hero-video.mp4" type="video/mp4" />
            </video>
          )}

          <Layout
            sectionClassName="h-screen flex items-center"
            className="relative flex flex-col items-center text-white"
          >
            <AnimatedHeadline />
            <H3 className="mx-auto max-w-4xl px-4 text-center">
              AI-Driven Insights for Stronger, Smarter Recovery and Performance
            </H3>
          </Layout>
        </section>
        {/* Section  Partners */}
        <Partners />

        {/* Section Our Mission */}
        <Layout
          className="flex flex-col items-center justify-center"
          aria-labelledby="mission-heading"
        >
          <div className="flex w-full flex-col flex-wrap items-center justify-center gap-[40px] md:flex-row">
            <div className="flex w-full min-w-[300px] max-w-full flex-1 justify-center md:justify-end">
              <Image
                src={TNSLogo}
                alt="Twinspire logo - AI-powered rehabilitation and injury prevention platform"
                width={500}
                height={500}
                className="h-auto min-w-[200px] max-w-full object-contain object-right md:object-center"
                priority
              />
            </div>
            <div className="w-full min-w-[300px] max-w-[800px] flex-1 text-left">
              <H1 color="black" id="mission-heading">
                Our Mission
              </H1>
              <p className="mt-5">
                Recovery today is reactive. We're changing that. Injury is one
                of the biggest threats to performance — whether you're a
                professional athlete or a patient in rehabilitation. Yet,
                recovery still relies heavily on subjective feedback, incomplete
                data, and outdated tools.
              </p>
              <ul className="mt-4 list-disc pl-6">
                <li>
                  Over 30% of athletes suffer injuries each year, many of which
                  are preventable.
                </li>
                <li>
                  Reinjury rates remain high due to limited real-time insight
                  and poor monitoring.
                </li>
                <li>
                  Physiotherapists and coaches often lack objective,
                  personalized data to guide and adjust treatment or training.
                </li>
              </ul>
              <p className="mt-4">
                At Twinspire, we believe recovery should be proactive, precise,
                and tailored to each individual. That's why we're building
                intelligent digital twins to make performance and rehab
                measurable, transparent, and adaptive — every step of the way.
              </p>
            </div>
          </div>
        </Layout>
        {/* Section About */}
        <Twinspire />

        {/* Section Solutions */}
        <Benefits />

        <Process />

        <Services />

        {/* Section Reviews */}
        <Reviews />

        <ReachOut />
      </main>
      <Footer className="bg-neutral-900" />
    </>
  )
}
