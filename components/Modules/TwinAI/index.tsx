'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { H1, H2, H3 } from 'components'
import Image from 'next/image'
import Layout from 'components/Layout'
import { twinspireDefinitions } from './definitions'

const sectionVariants = {
  hidden: { opacity: 0, y: 60 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: [0.22, 1, 0.36, 1], // Custom easing for smooth animation
    },
  },
}

const imageVariants = {
  hidden: { opacity: 0, scale: 0.9, rotate: -5 },
  visible: {
    opacity: 1,
    scale: 1,
    rotate: 0,
    transition: {
      duration: 0.9,
      ease: [0.22, 1, 0.36, 1],
      delay: 0.2,
    },
  },
}

function TwinspireSection({
  tag,
  title,
  description,
  image,
  alt,
  index,
}: {
  tag: string
  title: string
  description: string
  image: any
  alt: string
  index: number
}) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: false, amount: 0.3 })

  return (
    <motion.div
      ref={ref}
      variants={sectionVariants}
      initial="hidden"
      animate={inView ? 'visible' : 'hidden'}
      className={`${index === 0 ? 'mt-0' : 'mt-5'} flex flex-row flex-wrap items-center gap-10 py-20`}
    >
      {/* Left: Text */}
      <motion.div
        className="max-w-xl flex-1"
        variants={sectionVariants}
        initial="hidden"
        animate={inView ? 'visible' : 'hidden'}
      >
        <H3 className="text-gray-600">{tag}</H3>
        <H2 className="mb-2">{title}</H2>
        <div
          className="mt-4 text-base leading-relaxed"
          dangerouslySetInnerHTML={{ __html: description }}
        />
      </motion.div>

      {/* Right: Image */}
      <div className="flex flex-1 justify-center">
        <motion.div
          variants={imageVariants}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          className="sticky top-[160px] flex h-[340px] w-[340px] items-center justify-center"
        >
          <div className="absolute h-[340px] w-[340px] rounded-xl bg-gradient-to-r from-purple-200 to-blue-200" />
          <Image
            src={image}
            alt={alt}
            width={340}
            height={340}
            className="absolute top-8 left-8 h-full w-full rounded-xl object-cover shadow-xl"
          />
        </motion.div>
      </div>
    </motion.div>
  )
}

export const Twinspire = () => (
  <Layout
    id="platform"
    className="flex flex-col items-center justify-center pt-0"
  >
    <div className="flex w-full justify-center bg-white text-center">
      <H1 color="black">TWINSPIRE</H1>
    </div>
    <div className="relative flex w-full flex-col pb-20">
      {twinspireDefinitions.map((section, index) => (
        <TwinspireSection key={index} {...section} index={index} />
      ))}
    </div>
  </Layout>
)
