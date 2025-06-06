import Image from 'next/image'
import { H1, Button, ProcessSteps, ServicesRowExpand, H3 } from '@/components'

import {
  Navbar,
  Partners,
  Footer,
  Reviews,
  TwinAI,
  Benefits,
} from '@/components/Modules'
import Layout from '@/components/Layout'

export default function Home() {
  return (
    <>
      <Navbar />

      <main>
        {/* Section 1: Hero Section */}
        <section id="home" className="relative h-screen w-full overflow-hidden">
          <video
            autoPlay
            muted
            loop
            playsInline
            className="absolute top-0 left-0 h-full w-full object-cover grayscale"
          >
            <source src="/hero-veido.mp4" type="video/mp4" />
          </video>
          <Layout
            sectionClassName="h-screen flex items-center"
            className="relative flex flex-col items-center text-white"
          >
            <H1 className="mb-4 text-center">Sport Reimagined with Twin-AI</H1>
            <H3>
              AI-Driven Insights for Stronger, Smarter Recovery and Performance
            </H3>
            <div className="mt-20 flex flex-row gap-4">
              <Button color="white">Apply as a Team</Button>
              <Button color="blue">Apply as a Therapist</Button>
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

        <section className="m-auto h-screen max-w-[1400px]">
          <div className="flex h-full items-center justify-between">
            <h1 className="mb-20 flex-1 text-left text-8xl font-bold uppercase">
              Who can benefit and how?
            </h1>
            <div className="h-[60%]">
              <ProcessSteps />
            </div>
            <div className="flex flex-1 flex-col justify-center gap-4">
              <h2 className="text-4xl font-bold">Data Acquisition</h2>
              <p className="max-w-sm text-sm">
                TNS integrates with a variety of devices and sensor fusion is
                used to combine the multiple sources, for example:Bio-mechanical
                data such as pose tracking Physiological data from wearables
                (HR, HRV, Emg) Tests conducted by therapists Third party devices
                (Apple, whoop, fitbit...) Fully customizable to match the needs
                customer
              </p>
            </div>
          </div>
        </section>
        <section className="flex h-screen w-full bg-neutral-900 text-white">
          <div className="m-auto flex w-full max-w-[1400px] flex-col text-center">
            <h1 className="mb-20 text-8xl font-bold uppercase">
              Our Services!
            </h1>
            <ServicesRowExpand className="flex-1" />
          </div>
        </section>

        {/* Section 5 - Reviews */}
        {/* <Reviews /> */}

        <Image
          src="/shapes/partners-shape-bottom.svg"
          alt="Analytics"
          width={100}
          height={100}
          style={{ width: '100%', rotate: '180deg' }}
        />
        <section className="flex h-200 w-full bg-[#0802A3] text-white">
          <div className="m-auto flex w-full max-w-[1400px] flex-col text-center">
            <h1 className="mb-20 text-8xl font-bold uppercase">Reach Out!</h1>
          </div>
        </section>
      </main>
      <Footer className="bg-neutral-900" />
    </>
  )
}
