import Image from 'next/image'
import { H1, Button, H3, AnimatedHeadline } from 'components/Atoms'
import { ServicesRowExpand } from 'components/ServicesRowExpand'
import Layout from 'components/Layout'
import {
  Navbar,
  Partners,
  Footer,
  Reviews,
  TwinAI,
  Benefits,
  Process,
} from 'components/Modules'

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
            <AnimatedHeadline />
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

        <Process />

        <Layout
          id="services"
          className="flex h-screen w-full bg-neutral-900 text-white"
          sectionClassName="bg-neutral-900"
        >
          <div className="m-auto flex h-full w-full max-w-[1400px] flex-col text-center">
            <H1 className="mb-10 md:mb-20">Our Services!</H1>
            <ServicesRowExpand />
          </div>
        </Layout>

        {/* Section 5 - Reviews */}
        <Reviews />

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
