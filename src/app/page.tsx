import Image from 'next/image'
import {
  Heading,
  Button,
  Navbar,
  ProcessSteps,
  ServicesRowExpand,
  Footer,
  TestimonialSlider,
} from '@/components'

import { Partners } from '@/components/Sections'

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
          <div className="relative flex h-screen w-full flex-col items-center justify-center text-white">
            <Heading className="mb-4 text-center">
              TWINPSIRE <br /> Neural Solutions
            </Heading>
            <h2 className="mt-6text-center text-2xl">
              Predicting Performance, Preventing Failures
            </h2>
            <div className="mt-20 flex flex-row gap-4">
              <Button color="white">Apply as a Team</Button>
              <Button color="blue">Apply as a Therapist</Button>
            </div>
          </div>
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
        <section
          id="about"
          className="flex w-full flex-col items-center justify-center p-10"
        >
          <h1 className="mb-10 text-center text-4xl font-bold uppercase">
            About Twinpsire
          </h1>
          <div className="grid max-w-4xl grid-cols-1 gap-10 md:grid-cols-2">
            {/* Top Left: Image */}
            <div className="flex flex-col items-center">
              <Image
                src="/shapes/shape-1.svg"
                alt="Analytics"
                width={400}
                height={400}
              />
            </div>
            {/* Top Right: Text */}
            <div className="flex flex-col justify-center">
              <p className="font-medium">
                The Twinspire platform enables{' '}
                <b>dynamic personalization of training programs</b>,
                continuously adapting to the user's physical performance and
                objective recovery data. Feedback and recommendations evolve in
                real time — tailored to each user's needs, progress, and risk
                profile.
              </p>
            </div>
            {/* Bottom Left: Text */}
            <div className="flex flex-col justify-center">
              <p>
                The <b>voice-based interface</b> allows hands-free coaching and
                real-time interaction via headset during physical training. This
                enhances usability in active training environments where manual
                or visual interfaces are impractical.
              </p>
            </div>
            {/* Bottom Right: Image */}
            <div className="flex flex-col items-center">
              <Image
                src="/shapes/shape-2.svg"
                alt="Analytics"
                width={400}
                height={400}
              />
            </div>
            {/* Bottom Left: Image */}
            <div className="flex flex-col items-center">
              <Image
                src="/shapes/shape-3.svg"
                alt="Analytics"
                width={400}
                height={400}
              />
            </div>
            {/* Bottom Right: Text */}
            <div className="flex flex-col justify-center">
              <p>
                At the foundation of the platform is a uniquely{' '}
                <b>robust privacy and security architecture</b>, ensuring that
                all sensitive health data is handled in full compliance with
                GDPR and leading standards for secure, ethical AI.
              </p>
            </div>
          </div>
        </section>
        {/* Section 4 - Solutions */}
        <section
          id="solutions"
          className="flex h-screen items-center justify-center bg-neutral-900 p-40 text-white"
        >
          <div className="flex max-w-[1400px] items-center justify-center">
            <div className="flex flex-1 flex-col items-start justify-between">
              <h1 className="mb-20 text-left text-8xl font-bold uppercase">
                Who can benefit and how?
              </h1>
              <div className="flex w-full max-w-[300px] flex-row gap-2">
                <span className="h-[6px] w-full flex-1 rounded-full bg-white" />
                <span className="h-[6px] w-full flex-1 rounded-full bg-gray-500" />
                <span className="h-[6px] w-full flex-1 rounded-full bg-gray-500" />
              </div>
            </div>
            <div className="flex flex-1 flex-row items-center justify-center gap-4 text-center">
              <div className="flex flex-col items-center justify-center">
                <Image
                  src="/illustrations/injury.gif"
                  alt="Analytics"
                  width={400}
                  height={400}
                />

                <h2 className="mt-6 mb-2 text-2xl font-bold">For Athletes</h2>
                <p className="max-w-sm text-sm">
                  We empower athletes to make return-to-play decisions based on
                  bio-mechanical and physiological data
                </p>
              </div>
            </div>
          </div>
        </section>
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
                used to combine the multiple sources, for
                example: Bio-mechanical data such as pose tracking Physiological
                data from wearables (HR, HRV, Emg) Tests conducted by therapists
                Third party devices (Apple, whoop, fitbit...) Fully customizable
                to match the needs customer 
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

        <section className="flex h-screen w-full">
          <div className="m-auto flex w-full max-w-[1400px] flex-col text-center">
            <h1 className="mb-20 text-8xl font-bold uppercase">
              WHAT PEOPLE <br /> SAY
              <span className="text-[#0802A3]">ABOUT US?</span>
            </h1>
            <TestimonialSlider />
          </div>
        </section>
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
