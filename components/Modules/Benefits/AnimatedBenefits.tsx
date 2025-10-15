'use client'

import { H2 } from 'components'
import { motion, useInView } from 'framer-motion'
import { CheckIcon } from 'lucide-react'
import { useRef } from 'react'

const itemVariants = {
  hidden: { opacity: 0, x: 90, y: 32, scale: 0.98 },
  show: {
    opacity: 1,
    x: 0,
    y: 0,
    scale: 1,
    transition: {
      type: 'spring',
      stiffness: 350,
      damping: 23,
    },
  },
  exit: {
    opacity: 0,
    x: -90,
    y: -32,
    scale: 0.98,
    transition: { duration: 0.35 },
  },
}

export const AnimatedBenefits = ({
  data = [],
  name = '',
  className = '',
}: {
  data: { title: string; benefit: string }[]
  name: string
  className?: string
}) => (
  <div className={`flex flex-col items-center ${className}`}>
    <H2 className="mb-10 text-3xl font-bold text-white">{name}</H2>
    <div className="flex w-full flex-col justify-center gap-3">
      {data.map(({ title, benefit }) => (
        <BenefitCard key={title} title={title} benefit={benefit} name={name} />
      ))}
    </div>
  </div>
)

function BenefitCard({
  title,
  benefit,
  name,
}: {
  title: string
  benefit: string
  name: string
}) {
  const ref = useRef(null)
  const inView = useInView(ref, { amount: 0.1 })

  return (
    <motion.div
      ref={ref}
      variants={itemVariants}
      initial="hidden"
      animate={inView ? 'show' : 'hidden'}
      exit="hidden"
      className="min-h-[120px] w-full rounded-lg bg-white/5 backdrop-blur-lg"
    >
      <div className="flex h-full flex-col p-6">
        <div className="flex items-start gap-4">
          <div className="rounded-full bg-[#0802A3] p-2">
            <CheckIcon className="h-4 w-4 text-white" />
          </div>
          <div className="space-y-2">
            <h3 className="font-medium text-white">{title}</h3>
            <p className="text-sm text-white/70">{benefit}</p>
          </div>
        </div>
      </div>
    </motion.div>
  )
}
