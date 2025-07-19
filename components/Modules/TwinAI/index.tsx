'use client'

import { H1, H2, H3 } from 'components'
import Image from 'next/image'
import Layout from 'components/Layout'
import { definitions } from './definitions'
import { motion, AnimatePresence } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { useMediaQuery } from '@/hooks/useMediaQuery'

export const TwinAI = () => (
  <Layout
    id="twin-ai"
    className="flex flex-col items-center justify-center pt-0"
  >
    <div className="flex w-full justify-center border-b border-gray-200 bg-white text-center">
      <H1 color="black">TWINSPIRE</H1>
    </div>
    <div className="relative flex w-full flex-col">
      {definitions.map((definition, index) => (
        <AnimatedRow key={index} definition={definition} index={index} />
      ))}
    </div>
  </Layout>
)

function AnimatedRow({
  definition,
  index,
}: {
  definition: any
  index: number
}) {
  const { isMobile } = useMediaQuery()
  const [ref, inView] = useInView({
    threshold: 0.5,
    triggerOnce: false,
    rootMargin: '-35% 0px 0% 0px',
  })

  return (
    <div
      ref={ref}
      className={`${
        index === 0 ? 'mt-0' : 'mt-5'
      } flex flex-row flex-wrap items-center gap-10 py-20 ${
        index === definitions.length - 1
          ? 'sticky top-[200px] z-10 bg-white'
          : ''
      }`}
    >
      <AnimatePresence>
        {/* Left: Text */}
        <motion.div
          key="text"
          initial={{ y: 0, opacity: 1 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 0, opacity: 0 }}
          transition={{ duration: 0.2, ease: [0.42, 0, 0.58, 1] }}
          className="max-w-xl flex-1"
        >
          <H3 className="text-gray-600">{definition.subTitle}</H3>
          <H2 className="mb-2">{definition.title}</H2>
          <p className="mt-6">{definition.description}</p>
        </motion.div>

        {/* Right: Sticky image */}
        <motion.div
          key="img"
          initial={{ y: 0, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 0, opacity: 0 }}
          transition={{
            duration: 0.2,
            ease: [0.42, 0, 0.58, 1],
          }}
          className="flex flex-1 justify-center"
        >
          <div
            className={`sticky top-[160px] flex items-center justify-center ${
              isMobile ? 'h-[240px] w-[240px]' : 'h-[340px] w-[340px]'
            }`}
          >
            <div
              className={`absolute rounded-xl bg-blue-200 ${
                isMobile ? 'h-[240px] w-[240px]' : 'h-[340px] w-[340px]'
              }`}
            />
            <Image
              src={definition.image}
              alt="AI Illustration"
              width={isMobile ? 240 : 340}
              height={isMobile ? 240 : 340}
              className="absolute top-8 left-8 h-full w-full rounded-xl object-cover shadow-xl"
            />
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  )
}
