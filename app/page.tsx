'use client'
import Image from 'next/image'
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
  return (
    <>
      <main id="root">
        {/* Section Hero Section */}
        <section id="home" className="relative h-screen w-full overflow-hidden">
          <Navbar />
          <video
            autoPlay
            muted
            loop
            playsInline
            className="absolute top-0 left-0 h-full w-full object-cover grayscale"
          >
            <source src="/hero-video.mp4" type="video/mp4" />
          </video>
          <Layout
            sectionClassName="h-screen flex items-center"
            className="relative flex flex-col items-center text-white"
          >
            <AnimatedHeadline />
            <H3>
              AI-Driven Insights for Stronger, Smarter Recovery and Performance
            </H3>
          </Layout>
        </section>
        {/* Section  Partners */}
        <Partners />
        <Image
          src="/shapes/partners-shape-bottom.svg"
          alt="Analytics"
          width={100}
          height={100}
          style={{ width: '100%' }}
        />

        {/* Section Our Mission */}
        <Layout className="flex flex-col items-center justify-center">
          <div className="flex w-full flex-col flex-wrap items-center justify-center gap-[40px] md:flex-row">
            <div className="flex w-full max-w-full min-w-[300px] flex-1 justify-center md:justify-end">
              <Image
                src={TNSLogo}
                alt="TNS Logo"
                width={500}
                height={500}
                className="h-auto max-w-full min-w-[200px] object-contain object-right md:object-center"
              />
            </div>
            <div className="w-full max-w-[800px] min-w-[300px] flex-1 text-left">
              <H1 color="black">Our Mission</H1>
              <p className="mt-5">
                Recovery today is reactive. We're changing that.Injury is one of
                the biggest threats to performance — whether you're a
                professional athlete or a patient in rehabilitation. Yet,
                recovery still relies heavily on subjective feedback, incomplete
                data, and outdated tools.
                <ul className="list-disc pl-6">
                  <li>
                    Over 30% of athletes suffer injuries each year, many of
                    which are preventable.
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
