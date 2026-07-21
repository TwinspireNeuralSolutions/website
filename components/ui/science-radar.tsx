'use client'

import React, { useEffect, useRef, useState } from 'react'

type Props = { className?: string }

export function ScienceRadar({ className }: Props) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const canvasEl = canvas as HTMLCanvasElement
    const ctx = canvasEl.getContext('2d')!
    let raf = 0
    let width = 0
    let height = 0
    let rotation = 0
    let drawProgress = 0

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

    const axes = 6
    const center = () => ({ x: width / 2, y: height / 2 })
    const radius = () => Math.min(width, height) * 0.38

    function render(now: number) {
      ctx.clearRect(0, 0, width, height)
      const c = center()

      // gentle rotation
      rotation += 0.0008 * (visible ? 1 : 0)

      // draw spokes
      ctx.lineWidth = 1
      ctx.strokeStyle = 'rgba(255,255,255,0.12)'
      for (let i = 0; i < axes; i++) {
        const a = (i / axes) * Math.PI * 2 + rotation
        const x = c.x + Math.cos(a) * radius()
        const y = c.y + Math.sin(a) * radius()
        ctx.beginPath()
        ctx.moveTo(c.x, c.y)
        ctx.lineTo(x, y)
        ctx.stroke()
      }

      // draw polygon slowly when visible
      const points: { x: number; y: number }[] = []
      for (let i = 0; i < axes; i++) {
        const a = (i / axes) * Math.PI * 2 + rotation
        const r = radius() * (0.4 + 0.6 * ((i + 1) / axes))
        points.push({ x: c.x + Math.cos(a) * r, y: c.y + Math.sin(a) * r })
      }

      // increment draw progress toward 1 when visible
      if (visible) drawProgress = Math.min(1, drawProgress + 0.01)
      else drawProgress = Math.max(0, drawProgress - 0.02)

      // stroke polygon with progressive reveal
      ctx.strokeStyle = '#00e0ff'
      ctx.lineWidth = 2
      ctx.beginPath()
      for (let i = 0; i < points.length; i++) {
        const p = points[i]
        if (i === 0) ctx.moveTo(p.x, p.y)
        else ctx.lineTo(p.x, p.y)
      }
      ctx.closePath()
      // use globalAlpha for reveal
      ctx.save()
      ctx.globalAlpha = drawProgress
      ctx.stroke()
      ctx.restore()

      // subtle filled ghost
      ctx.fillStyle = 'rgba(0,224,255,0.06)'
      ctx.beginPath()
      for (let i = 0; i < points.length; i++) {
        const p = points[i]
        if (i === 0) ctx.moveTo(p.x, p.y)
        else ctx.lineTo(p.x, p.y)
      }
      ctx.closePath()
      ctx.fill()

      raf = requestAnimationFrame(render)
    }

    resize()
    raf = requestAnimationFrame(render)

    return () => {
      cancelAnimationFrame(raf)
      ro.disconnect()
    }
  }, [visible])

  // Intersection observer to trigger draw when scrolled into view
  useEffect(() => {
    const el = canvasRef.current
    if (!el) return
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => setVisible(e.isIntersecting))
      },
      { threshold: 0.2 }
    )
    io.observe(el)
    return () => io.disconnect()
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

export default ScienceRadar
