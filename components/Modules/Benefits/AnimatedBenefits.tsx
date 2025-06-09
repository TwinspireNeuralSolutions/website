import { motion } from 'framer-motion'
import { Check } from 'lucide-react'
import { H2 } from '@/components/Atoms/Typography'

const containerVariants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.13,
      delayChildren: 0.2,
    },
  },
}

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
}

export const AnimatedBenefits = ({
  data,
  key,
  name,
}: {
  data: any
  key: string
  name: string
}) => (
  <motion.div
    key={key}
    className={`flex flex-col items-center ${
      name === 'Sports Teams' ? 'mt-150' : 'mt-50'
    }`}
    initial={{ opacity: 0, x: 120 }}
    animate={{ opacity: 1, x: 0 }}
    exit={{ opacity: 0, x: -120 }}
    transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
  >
    <H2 className="mb-10 text-white">{name}</H2>
    <motion.div
      className="row mt-4 flex flex-wrap gap-2"
      variants={containerVariants}
      initial="hidden"
      animate="show"
      exit="hidden"
    >
      {data?.map(({ title, benefit }: { title: string; benefit: string }) => (
        <motion.div
          key={title}
          variants={itemVariants}
          className={`w-full max-w-md flex-1 basis-[calc(50%-12px)] rounded-xl p-5 text-left shadow-lg ${
            name === 'Sports Teams' ? 'bg-blue-300' : 'bg-[#0802A3]'
          }`}
        >
          <Check className="h-6 w-6 text-white" />
          <h3 className="mb-2 text-xl font-bold text-white">{title}</h3>
          <p className="text-sm text-white/80">{benefit}</p>
        </motion.div>
      ))}
    </motion.div>
  </motion.div>
)
