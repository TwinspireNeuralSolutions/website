'use client'

import { useEffect, useRef } from 'react'
import { useReducedMotion } from 'framer-motion'

// ECG waveform function — returns normalised amplitude (-1 to 1) for position t (0–1)
function ecgAmplitude(t: number): number {
  const p = ((t % 1) + 1) % 1

  if (p < 0.18) return Math.sin(p * Math.PI * 4) * 0.06 // flat baseline noise
  if (p < 0.24) return Math.sin(((p - 0.18) / 0.06) * Math.PI) * 0.18 // P wave
  if (p < 0.32) return 0 // PR segment
  if (p < 0.35) return -((p - 0.32) / 0.03) * 0.25 // Q dip
  if (p < 0.39) return -0.25 + ((p - 0.35) / 0.04) * 1.25 // R rise
  if (p < 0.44) return 1.0 - ((p - 0.39) / 0.05) * 1.35 // R fall → S
  if (p < 0.49) return -0.35 + ((p - 0.44) / 0.05) * 0.35 // S recovery
  if (p < 0.65) return Math.sin(((p - 0.49) / 0.16) * Math.PI) * 0.28 // T wave
  return Math.sin(((p - 0.65) / 0.35) * Math.PI * 0.4) * 0.04 // back to flat
}

interface EcgDividerProps {
  /** Overall container height in px. Defaults to 48. */
  height?: number
  /** Colour of the ECG line. Defaults to the primary brand blue. */
  color?: string
  /** Line opacity 0–1. Defaults to 0.12. */
  opacity?: number
  /** How many complete ECG cycles are visible at once. Defaults to 3. */
  cycles?: number
  /** Scroll speed in pixels-per-frame. Defaults to 0.6. */
  speed?: number
}

/**
 * EcgDivider — Full-width canvas animation that looks like a slowly scrolling
 * ECG / muscle-signal trace. Used between page sections to signal that the
 * system is still running. Always animating, very low opacity.
 */
export function EcgDivider({
  height = 32,
  color = '#0802a3',
  opacity = 0.07,
  cycles = 4,
  speed = 0.4,
}: EcgDividerProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const offsetRef = useRef(0)
  const rafRef = useRef<number | null>(null)
  const prefersReduced = useReducedMotion()

  useEffect(() => {
    if (prefersReduced) return

    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let animating = true

    const draw = () => {
      if (!animating) return

      const w = canvas.width
      const h = canvas.height
      const mid = h / 2
      const amplitude = h * 0.38

      ctx.clearRect(0, 0, w, h)
      ctx.strokeStyle = color
      ctx.globalAlpha = opacity
      ctx.lineWidth = 0.8
      ctx.lineCap = 'round'
      ctx.lineJoin = 'round'

      ctx.beginPath()
      for (let x = 0; x <= w; x++) {
        // Map x + scrollOffset to normalised position in ECG cycle
        const t = ((x + offsetRef.current) / w) * cycles
        const y = mid - ecgAmplitude(t) * amplitude
        if (x === 0) {
          ctx.moveTo(x, y)
        } else {
          ctx.lineTo(x, y)
        }
      }
      ctx.stroke()

      offsetRef.current += speed
      rafRef.current = requestAnimationFrame(draw)
    }

    const resizeObserver = new ResizeObserver(() => {
      canvas.width = canvas.offsetWidth
      canvas.height = canvas.offsetHeight
    })
    resizeObserver.observe(canvas)
    canvas.width = canvas.offsetWidth || 1200
    canvas.height = canvas.offsetHeight || height

    rafRef.current = requestAnimationFrame(draw)

    return () => {
      animating = false
      if (rafRef.current !== null) cancelAnimationFrame(rafRef.current)
      resizeObserver.disconnect()
    }
  }, [color, opacity, cycles, speed, height, prefersReduced])

  if (prefersReduced) {
    return <div className="w-full" style={{ height }} aria-hidden="true" />
  }

  return (
    <div
      aria-hidden="true"
      className="relative w-full overflow-hidden"
      style={{ height }}
    >
      <canvas
        ref={canvasRef}
        className="absolute inset-0 h-full w-full"
        style={{ display: 'block' }}
      />
    </div>
  )
}
