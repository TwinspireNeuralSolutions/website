'use client'

import { motion } from 'framer-motion'

export const MenuToggle = ({
  isOpen,
  onToggle,
  color,
}: {
  isOpen: boolean
  onToggle: () => void
  color: string
}) => {
  return (
    <button
      aria-label="Menu toggle"
      className={`relative flex h-8 w-8 items-center justify-center md:hidden`}
      onClick={onToggle}
    >
      <motion.span
        animate={isOpen ? { rotate: 45, y: 0 } : { rotate: 0, y: -6 }}
        transition={{ duration: 0.2 }}
        className="absolute h-0.5 w-6 rounded-full"
        style={{ backgroundColor: color }}
      />
      <motion.span
        animate={isOpen ? { opacity: 0 } : { opacity: 1, y: 0 }}
        transition={{ duration: 0.2 }}
        className="absolute h-0.5 w-6 rounded-full"
        style={{ backgroundColor: color }}
      />
      <motion.span
        animate={isOpen ? { rotate: -45, y: 0 } : { rotate: 0, y: 6 }}
        transition={{ duration: 0.2 }}
        className="absolute h-0.5 w-6 rounded-full"
        style={{ backgroundColor: color }}
      />
    </button>
  )
}
