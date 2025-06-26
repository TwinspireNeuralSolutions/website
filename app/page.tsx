'use client'
import Image from 'next/image'
import { Button, H3, AnimatedHeadline } from 'components/Atoms'
import Layout from 'components/Layout'
import {
  Navbar,
  Partners,
  Footer,
  Reviews,
  TwinAI,
  Benefits,
  Process,
  Services,
  ReachOut,
} from 'components/Modules'

export default function Home() {
  return (
    <>
      <main id="root">
        {/* Section 1: Hero Section */}
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
            <div className="mt-20 flex flex-row flex-wrap justify-center gap-4">
              <Button color="white" className="white-space-nowrap">
                Apply as a Team
              </Button>
              <Button color="blue" className="white-space-nowrap">
                Apply as a Therapist
              </Button>
            </div>
          </Layout>
        </section>
        {/* Section 2 - Partners */}
        <Partners />
        <Image
          src="/shapes/partners-shape-bottom.svg"
          alt="Analytics"
          width={100}
          height={100}
          style={{ width: '100%' }}
        />
        {/* Section 3 - About */}
        <TwinAI />
        {/* Section 4 - Solutions */}
        <Benefits />

        <Process />

        <Services />

        {/* Section 5 - Reviews */}
        <Reviews />

        <ReachOut />
      </main>
      <Footer className="bg-neutral-900" />
    </>
  )
}
