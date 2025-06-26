import Image from 'next/image'
import BookTimeModel from './BookTimeModel'
import { H1, H3 } from '@/components/Atoms'

export const ReachOut = () => {
  return (
    <>
      <Image
        src="/shapes/partners-shape-bottom.svg"
        alt="Analytics"
        width={100}
        height={100}
        style={{ width: '100%', rotate: '180deg', marginBottom: '-25px' }}
      />
      <section
        className="flex w-full flex-col items-center justify-center bg-[#0802A3] py-20 text-center text-white"
        id="reach-out"
      >
        <H1>Book Your TNS Intro Call</H1>
        <H3>
          Discover how our AI-driven Twin-AI platform helps teams reduce
          injuries and accelerate athlete recovery.
        </H3>
        <div className="m-auto flex w-full max-w-[1400px] flex-col text-center">
          <BookTimeModel />
        </div>
      </section>
    </>
  )
}
