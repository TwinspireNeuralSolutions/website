'use client'

import { useInView } from 'react-intersection-observer'
import { motion } from 'framer-motion'
import { Cpu, Database } from 'lucide-react'

export const ProcessSteps = () => {
  // useInView will flip `inView` to true once this component scrolls into viewport
  const { ref, inView } = useInView({ triggerOnce: true })

  // Timing/delay offsets for the animation
  const lineDuration = 0.8
  const nodeScaleDuration = 0.6

  return (
    <div
      ref={ref}
      className="relative flex h-full flex-col items-center justify-start"
    >
      {/* ─── TOP NODE (pill with 3 icons + downward triangle) ─── */}
      <motion.div
        initial={{ scale: 0 }}
        animate={inView ? { scale: 1 } : { scale: 0 }}
        transition={{ duration: nodeScaleDuration }}
        className="relative flex items-center justify-center gap-4 rounded-full bg-gray-200 px-6 py-4"
      >
        {/* Three CPU icons inside the pill */}
        <Cpu className="h-5 w-5 text-black" />
        <Cpu className="h-5 w-5 text-black" />
        <Cpu className="h-5 w-5 text-black" />

        {/* Downward-pointing triangle (merging into pill) */}
        <div className="absolute bottom-[-8px] left-1/2 -translate-x-1/2 border-t-[10px] border-r-[10px] border-l-[10px] border-t-gray-200 border-r-transparent border-l-transparent" />
      </motion.div>

      {/* ─── LINE from TopNode triangle to MiddleNode top-triangle ─── */}
      <motion.svg
        width="2"
        height="120"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={
          inView ? { pathLength: 1, opacity: 1 } : { pathLength: 0, opacity: 0 }
        }
        transition={{ duration: lineDuration, delay: nodeScaleDuration * 0.5 }}
      >
        <motion.line
          x1="1"
          y1="0"
          x2="1"
          y2="120"
          stroke="#E5E7EB" /* gray-600 */
          strokeWidth="2"
          initial={{ pathLength: 0 }}
          animate={inView ? { pathLength: 1 } : { pathLength: 0 }}
          transition={{
            duration: lineDuration,
            delay: nodeScaleDuration * 0.5,
          }}
        />
      </motion.svg>

      {/* ─── MIDDLE NODE (circle with CPU icon + top & bottom triangles) ─── */}
      <motion.div
        initial={{ scale: 0 }}
        animate={inView ? { scale: 1 } : { scale: 0 }}
        transition={{ duration: nodeScaleDuration, delay: lineDuration * 0.5 }}
        className="relative flex h-16 w-16 items-center justify-center rounded-full bg-gray-200"
      >
        {/* CPU icon in middle */}
        <Cpu className="h-6 w-6 text-black" />

        {/* Upward-pointing triangle at top of circle */}
        <div className="absolute top-[-8px] left-1/2 h-0 w-0 -translate-x-1/2 border-r-[10px] border-b-[10px] border-l-[10px] border-r-transparent border-b-gray-200 border-l-transparent" />

        {/* Downward-pointing triangle at bottom of circle */}
        <div className="absolute bottom-[-8px] left-1/2 h-0 w-0 -translate-x-1/2 border-t-[10px] border-r-[10px] border-l-[10px] border-t-gray-200 border-r-transparent border-l-transparent" />
      </motion.div>

      {/* ─── LINE from MiddleNode bottom-triangle to BottomNode top-triangle ─── */}
      <motion.svg
        width="2"
        height="120"
        className="mb-[-2px]"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={
          inView ? { pathLength: 1, opacity: 1 } : { pathLength: 0, opacity: 0 }
        }
        transition={{
          duration: lineDuration,
          delay: nodeScaleDuration + lineDuration * 0.5,
        }}
      >
        <motion.line
          x1="1"
          y1="0"
          x2="1"
          y2="120"
          stroke="#E5E7EB" /* gray-600 */
          strokeWidth="2"
          initial={{ pathLength: 0 }}
          animate={inView ? { pathLength: 1 } : { pathLength: 0 }}
          transition={{
            duration: lineDuration,
            delay: nodeScaleDuration + lineDuration * 0.5,
          }}
        />
      </motion.svg>

      {/* ─── BOTTOM NODE (circle with DB icon + top triangle) ─── */}
      <motion.div
        initial={{ scale: 0 }}
        animate={inView ? { scale: 1 } : { scale: 0 }}
        transition={{
          duration: nodeScaleDuration,
          delay: nodeScaleDuration + lineDuration + lineDuration * 0.5,
        }}
        className="relative flex h-16 w-16 items-center justify-center rounded-full bg-gray-200"
      >
        {/* Database icon in circle */}
        <Database className="h-6 w-6 text-black" />

        {/* Upward-pointing triangle at top of circle */}
        <div className="absolute top-[-8px] left-1/2 h-0 w-0 -translate-x-1/2 border-r-[10px] border-b-[10px] border-l-[10px] border-r-transparent border-b-gray-200 border-l-transparent" />
      </motion.div>
    </div>
  )
}
