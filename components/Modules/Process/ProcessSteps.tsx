'use client'

import { motion } from 'framer-motion'
import { Cpu, Database } from 'lucide-react'

export const ProcessSteps = ({ activeStep }: { activeStep: number }) => {
  // Helper for node color
  const nodeColor = (step: number) =>
    activeStep === step ? '#3b82f6' : '#e5e7eb' // Tailwind blue-500 or gray-200

  return (
    <div className="relative flex min-h-[60vh] flex-col items-center justify-between py-8">
      {/* Top Node: pill with 3 CPUs */}
      <motion.div
        animate={{ scale: 1 }}
        transition={{ duration: 0.6 }}
        className="relative flex items-center justify-center gap-4 rounded-full px-6 py-4"
        style={{ backgroundColor: nodeColor(0) }}
      >
        <Cpu className="h-5 w-5 text-black" />
        <Cpu className="h-5 w-5 text-black" />
        <Cpu className="h-5 w-5 text-black" />
        <div
          className="absolute bottom-[-8px] left-1/2 -translate-x-1/2"
          style={{
            borderTop: `10px solid ${nodeColor(0)}`,
            borderRight: '10px solid transparent',
            borderLeft: '10px solid transparent',
            width: 0,
            height: 0,
          }}
        />
      </motion.div>

      {/* Line */}
      <motion.div
        className="w-1 bg-gray-200"
        style={{ flexGrow: 1, minHeight: 30, borderRadius: 2 }}
      />

      {/* Middle Node */}
      <motion.div
        animate={{ scale: 1 }}
        transition={{ duration: 0.6 }}
        className="relative flex h-16 w-16 items-center justify-center rounded-full"
        style={{ backgroundColor: nodeColor(1) }}
      >
        <Cpu className="h-6 w-6 text-black" />
        <div
          className="absolute top-[-8px] left-1/2 -translate-x-1/2"
          style={{
            borderRight: '10px solid transparent',
            borderBottom: `10px solid ${nodeColor(1)}`,
            borderLeft: '10px solid transparent',
            width: 0,
            height: 0,
          }}
        />
        <div
          className="absolute bottom-[-8px] left-1/2 -translate-x-1/2"
          style={{
            borderTop: `10px solid ${nodeColor(1)}`,
            borderRight: '10px solid transparent',
            borderLeft: '10px solid transparent',
            width: 0,
            height: 0,
          }}
        />
      </motion.div>

      {/* Line */}
      <motion.div
        className="w-1 bg-gray-200"
        style={{ flexGrow: 1, minHeight: 30, borderRadius: 2 }}
      />

      {/* Bottom Node */}
      <motion.div
        animate={{ scale: 1 }}
        transition={{ duration: 0.6 }}
        className="relative flex h-16 w-16 items-center justify-center rounded-full"
        style={{ backgroundColor: nodeColor(2) }}
      >
        <Database className="h-6 w-6 text-black" />
        <div
          className="absolute top-[-8px] left-1/2 -translate-x-1/2"
          style={{
            borderRight: '10px solid transparent',
            borderBottom: `10px solid ${nodeColor(2)}`,
            borderLeft: '10px solid transparent',
            width: 0,
            height: 0,
          }}
        />
      </motion.div>
    </div>
  )
}
