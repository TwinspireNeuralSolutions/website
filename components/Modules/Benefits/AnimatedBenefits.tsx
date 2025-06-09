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
    <div className="flex w-full flex-col justify-center gap-2">
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
  const inView = useInView(ref, { amount: 0.1 }) // animate in when 10% is visible

  return (
    <motion.div
      ref={ref}
      variants={itemVariants}
      initial="hidden"
      animate={inView ? 'show' : 'hidden'}
      exit="hidden"
      className={`min-h-[120px] w-full flex-1 basis-[calc(50%-12px)] rounded-xl p-5 text-left shadow-lg ${name === 'Sports Teams' ? 'bg-blue-300' : 'bg-[#0802A3]'}`}
    >
      <CheckIcon className="h-6 w-6 text-white" />
      <h3 className="mb-2 text-xl font-bold text-white">{title}</h3>
      <p className="text-sm text-white/80">{benefit}</p>
    </motion.div>
  )
}
