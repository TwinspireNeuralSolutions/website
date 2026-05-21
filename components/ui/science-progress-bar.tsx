'use client'

import React, { useEffect, useRef } from 'react'

type Props = { className?: string }

export function ScienceProgressBar({ className }: Props) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const canvasEl = canvas as HTMLCanvasElement
    const ctx = canvasEl.getContext('2d')!
    let raf = 0
    let width = 0
    let height = 0
    let progress = 0

    function resize() {
      const dpr = Math.max(1, window.devicePixelRatio || 1)
      width = canvasEl.clientWidth
      height = canvasEl.clientHeight
      canvasEl.width = Math.floor(width * dpr)
      canvasEl.height = Math.floor(height * dpr)
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
    }

    const ro = new ResizeObserver(() => {
      ctx.setTransform(1, 0, 0, 1, 0, 0)
      resize()
    })
    ro.observe(canvasEl)

    function render() {
      ctx.clearRect(0, 0, width, height)

      const barW = width * 0.9
      const barH = Math.max(8, height * 0.18)
      const x = (width - barW) / 2
      const y = (height - barH) / 2

      // background track
      ctx.fillStyle = 'rgba(255,255,255,0.08)'
      roundRect(ctx, x, y, barW, barH, barH / 2)
      ctx.fill()

      // animated progress
      progress += 0.003
      if (progress > 1.2) progress = 0
      const p = Math.min(1, progress)
      const fillW = barW * p
      ctx.fillStyle = '#7ad0ff'
      roundRect(ctx, x, y, fillW, barH, barH / 2)
      ctx.fill()

      raf = requestAnimationFrame(render)
    }

    function roundRect(
      ctx: CanvasRenderingContext2D,
      x: number,
      y: number,
      w: number,
      h: number,
      r: number
    ) {
      ctx.beginPath()
      ctx.moveTo(x + r, y)
      ctx.arcTo(x + w, y, x + w, y + h, r)
      ctx.arcTo(x + w, y + h, x, y + h, r)
      ctx.arcTo(x, y + h, x, y, r)
      ctx.arcTo(x, y, x + w, y, r)
      ctx.closePath()
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

export default ScienceProgressBar
