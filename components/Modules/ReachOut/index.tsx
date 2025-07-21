import Image from 'next/image'
import BookTimeModel from './BookTimeModel'
import { H1, H3 } from '@/components/Atoms'
import Layout from '@/components/Layout'

export const ReachOut = () => {
  return (
    <Layout
      sectionClassName="bg-[#0802A3]"
      className="flex min-h-screen flex-wrap items-start justify-center"
    >
      <Image
        src="/shapes/partners-shape-bottom.svg"
        alt="Analytics"
        width={100}
        height={100}
        style={{ width: '100%', rotate: '180deg', marginBottom: '-25px' }}
      />
      <section className="align-center flex w-full flex-col items-center justify-center py-20 text-center text-white">
        <div className="m-0-auto max-w-[800px] text-center">
          <H1>Get Involved</H1>
          <H3 className="mx-auto">
            Join the movement to transform sports performance and injury
            prevention.
          </H3>
          <p className="mt-8">
            Whether you're a coach, athletic trainer, sports scientist, or team
            manager — Twinspire is actively building a network of
            forward-thinking sports professionals who want to revolutionize how
            teams approach athlete health and performance optimization.
          </p>
        </div>

        <div className="m-auto mt-20 flex w-full max-w-[1400px] flex-col text-center">
          <BookTimeModel />
        </div>
      </section>
    </Layout>
  )
}
