'use client'

import { motion } from 'framer-motion'
import {
  Cpu,
  Database,
  LayoutDashboard,
  HardDrive,
  FileText,
} from 'lucide-react'

export const ProcessSteps = ({ activeStep }: { activeStep: number }) => {
  // Helper for node color
  const nodeColor = (step: number) =>
    activeStep === step ? '#0802A3' : '#e5e7eb' // Tailwind blue-500 or gray-200

  const cpuColor = (step: number) =>
    activeStep === step ? 'text-white' : 'text-black'

  return (
    <div className="relative flex h-auto flex-row items-center justify-between py-8 md:h-[60vh] md:flex-col">
      {/* Top Node: pill with 3 CPUs */}
      <motion.div
        animate={{ scale: 1 }}
        transition={{ duration: 0.6 }}
        className="relative flex items-center justify-center gap-4 rounded-full px-6 py-4"
        style={{ backgroundColor: nodeColor(0) }}
      >
        <HardDrive className={`h-5 w-5 ${cpuColor(0)}`} />
        <Database className={`h-5 w-5 ${cpuColor(0)}`} />
        <FileText className={`h-5 w-5 ${cpuColor(0)}`} />
        <div
          className="md-rotate-0 absolute right-[-13px] rotate-270 md:bottom-[-8px] md:left-1/2 md:-translate-x-1/2 md:rotate-0"
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
      <motion.div className="h-1 w-1 flex-grow bg-gray-200 md:h-auto md:w-1" />

      {/* Middle Node */}
      <motion.div
        animate={{ scale: 1 }}
        transition={{ duration: 0.6 }}
        className="relative flex h-16 w-16 items-center justify-center rounded-full"
        style={{ backgroundColor: nodeColor(1) }}
      >
        <Cpu className={`h-6 w-6 ${cpuColor(1)}`} />
        <div
          className="md-rotate-0 absolute left-[-13px] rotate-270 md:top-[-8px] md:left-1/2 md:-translate-x-1/2 md:rotate-0"
          style={{
            borderRight: '10px solid transparent',
            borderBottom: `10px solid ${nodeColor(1)}`,
            borderLeft: '10px solid transparent',
            width: 0,
            height: 0,
          }}
        />
        <div
          className="md-rotate-0 absolute right-[-13px] rotate-270 md:bottom-[-8px] md:left-1/2 md:-translate-x-1/2 md:rotate-0"
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
      <motion.div className="h-1 w-1 flex-grow bg-gray-200 md:h-auto md:w-1" />

      {/* Bottom Node */}
      <motion.div
        animate={{ scale: 1 }}
        transition={{ duration: 0.6 }}
        className="relative flex h-16 w-16 items-center justify-center rounded-full"
        style={{ backgroundColor: nodeColor(2) }}
      >
        <LayoutDashboard className={`h-6 w-6 ${cpuColor(2)}`} />
        <div
          className="md-rotate-0 absolute left-[-13px] rotate-270 md:top-[-8px] md:left-1/2 md:-translate-x-1/2 md:rotate-0"
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
