import { motion } from 'framer-motion'
import { Check } from 'lucide-react'

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

export const AnimatedBenefits = ({ data }: { data: any }) => (
  <motion.div
    className="mt-100 flex flex-col items-center"
    initial={{ opacity: 0, x: 120 }}
    animate={{ opacity: 1, x: 0 }}
    exit={{ opacity: 0, x: -120 }}
    transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
  >
    <motion.div
      className="mt-4 flex flex-col gap-6"
      variants={containerVariants}
      initial="hidden"
      animate="show"
      exit="hidden"
    >
      {data?.map(({ title, benefit }: { title: string; benefit: string }) => (
        <motion.div
          key={title}
          variants={itemVariants}
          className="w-full max-w-md rounded-xl bg-black/40 p-5 text-left shadow-lg"
        >
          <Check className="h-6 w-6 text-white" />
          <h3 className="mb-2 text-xl font-bold text-white">{title}</h3>
          <p className="text-sm text-white/80">{benefit}</p>
        </motion.div>
      ))}
    </motion.div>
  </motion.div>
)
