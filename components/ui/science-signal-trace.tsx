'use client'

import React, { useEffect, useRef } from 'react'

type Props = {
  className?: string
}

export function ScienceSignalTrace({ className }: Props) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const canvasEl = canvas as HTMLCanvasElement
    const ctx = canvasEl.getContext('2d')!
    let raf = 0
    let width = 0
    let height = 0
    const start = performance.now()

    function resize() {
      const dpr = Math.max(1, window.devicePixelRatio || 1)
      width = canvasEl.clientWidth
      height = canvasEl.clientHeight
      canvasEl.width = Math.floor(width * dpr)
      canvasEl.height = Math.floor(height * dpr)
      ctx.scale(dpr, dpr)
    }

    const ro = new ResizeObserver(() => {
      ctx.setTransform(1, 0, 0, 1, 0, 0)
      resize()
    })
    ro.observe(canvasEl)

    // generate a smooth waveform path function
    function wave(x: number, t: number) {
      const k = 0.018
      return (
        height / 2 +
        Math.sin((x * k + t * 0.004) * 2 * Math.PI) * (height / 6) +
        Math.sin((x * k * 0.6 + t * 0.006) * 2 * Math.PI) * (height / 18)
      )
    }

    function render(now: number) {
      const t = now - start
      ctx.clearRect(0, 0, width, height)

      // background subtle grid
      ctx.fillStyle = 'rgba(255,255,255,0.02)'
      ctx.fillRect(0, 0, width, height)

      // waveform
      ctx.lineWidth = 2
      ctx.strokeStyle = '#ffffff'
      ctx.beginPath()
      const step = Math.max(2, width / 200)
      for (let x = 0; x <= width; x += step) {
        const y = wave(x, t)
        if (x === 0) ctx.moveTo(x, y)
        else ctx.lineTo(x, y)
      }
      ctx.stroke()

      // moving dot along waveform
      const speed = 0.06 // pixels per ms
      const px = ((t * speed) % (width + 120)) - 60
      const py = wave(px, t)
      ctx.fillStyle = '#00ffc2'
      ctx.beginPath()
      ctx.arc(px, py, 5, 0, Math.PI * 2)
      ctx.fill()

      raf = requestAnimationFrame(render)
    }

    resize()
    raf = requestAnimationFrame(render)

    return () => {
      cancelAnimationFrame(raf)
      ro.disconnect()
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className={className}
      style={{ width: '100%', height: '100%', display: 'block' }}
      aria-hidden
    />
  )
}

export default ScienceSignalTrace
