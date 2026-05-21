import React, { useEffect, useRef } from 'react'

const BG = '#0C1628'
const PRIMARY = '#1433C8'
const PRIMARY_LIGHT = '#4F7FD4'
const GOLD = '#C9A96E'
// const TEXT = '#FFFFFF' (unused)

function resizeCanvas(canvas: HTMLCanvasElement) {
  const dpr = Math.max(1, window.devicePixelRatio || 1)
  const width = canvas.clientWidth
  const height = canvas.clientHeight
  canvas.width = Math.floor(width * dpr)
  canvas.height = Math.floor(height * dpr)
  const ctx = canvas.getContext('2d')
  if (ctx) ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
}

export function ProductCanvas({ className }: { className?: string }) {
  const ref = useRef<HTMLCanvasElement | null>(null)

  useEffect(() => {
    const canvas = ref.current!
    if (!canvas) return
    const ctx = canvas.getContext('2d')!
    let raf = 0

    function onResize() {
      resizeCanvas(canvas)
    }

    onResize()
    window.addEventListener('resize', onResize)

    const center = () => ({
      x: canvas.clientWidth / 2,
      y: canvas.clientHeight / 2,
    })

    // simple triangular 'figure' normalized points and triangles
    const pts = [
      { x: 0, y: -0.55 }, // head top
      { x: -0.12, y: -0.28 }, // left shoulder
      { x: 0.12, y: -0.28 }, // right shoulder
      { x: -0.18, y: 0.12 }, // left hip
      { x: 0.18, y: 0.12 }, // right hip
      { x: -0.06, y: 0.45 }, // left knee
      { x: 0.06, y: 0.45 }, // right knee
      { x: -0.06, y: 0.78 }, // left ankle
      { x: 0.06, y: 0.78 }, // right ankle
    ]

    const triangles = [
      [0, 1, 2],
      [1, 3, 4],
      [2, 4, 3],
      [1, 2, 4],
      [3, 5, 6],
      [4, 6, 5],
      [5, 7, 8],
    ]

    // nodes: shoulder, knee, hip, ankle, elbow approximated
    const nodesIdx = [1, 2, 3, 4, 5, 6]
    const nodeColors = [PRIMARY, PRIMARY, PRIMARY, PRIMARY, GOLD, GOLD]

    // data node positions around figure (normalized)
    const dataNodes = [
      { x: -0.65, y: -0.45, label: 'GPS', color: PRIMARY },
      { x: -0.9, y: 0.05, label: 'EMG', color: PRIMARY },
      { x: -0.65, y: 0.5, label: 'Strength', color: PRIMARY },
      { x: 0.9, y: -0.25, label: 'Physio', color: PRIMARY },
      { x: 0.85, y: 0.25, label: 'Sleep', color: GOLD },
      { x: 0.9, y: 0.6, label: 'Load', color: GOLD },
    ]

    const particles: any[] = []
    for (let i = 0; i < 60; i++) particles.push(Math.random())

    const t0 = performance.now()

    function drawRings(time: number) {
      const c = center()
      const maxR = Math.min(canvas.clientWidth, canvas.clientHeight) * 0.45
      ctx.save()
      ctx.translate(c.x, c.y)
      for (let i = 0; i < 4; i++) {
        const r = (i + 1) * (maxR / 4)
        const angle = time * 0.00002 * (i % 2 === 0 ? 1 : -1)
        ctx.save()
        ctx.rotate(angle)
        ctx.strokeStyle = GOLD
        ctx.globalAlpha = 0.12
        ctx.lineWidth = 1 + i * 0.6
        ctx.beginPath()
        ctx.arc(0, 0, r, 0, Math.PI * 2)
        ctx.stroke()
        // simple star polygon marks
        const spikes = 12
        for (let s = 0; s < spikes; s++) {
          const a = (s / spikes) * Math.PI * 2
          const x = Math.cos(a) * r
          const y = Math.sin(a) * r
          ctx.fillStyle = GOLD
          ctx.globalAlpha = 0.08
          ctx.fillRect(x - 1, y - 1, 2, 2)
        }
        ctx.restore()
      }
      ctx.restore()
    }

    function drawFigure(time: number) {
      const c = center()
      const scale = Math.min(canvas.clientWidth, canvas.clientHeight) * 0.6
      ctx.save()
      ctx.translate(c.x, c.y - scale * 0.05)
      // draw triangles
      ctx.lineWidth = 1
      for (const tri of triangles) {
        ctx.beginPath()
        const p0 = pts[tri[0]]
        ctx.moveTo(p0.x * scale, p0.y * scale)
        for (let k = 1; k < tri.length; k++) {
          const p = pts[tri[k]]
          ctx.lineTo(p.x * scale, p.y * scale)
        }
        ctx.closePath()
        ctx.fillStyle = PRIMARY_LIGHT
        ctx.globalAlpha = 0.06
        ctx.fill()
        ctx.strokeStyle = PRIMARY
        ctx.globalAlpha = 0.12
        ctx.stroke()
      }

      // nodes
      nodesIdx.forEach((idx, i) => {
        const p = pts[idx]
        const x = p.x * scale
        const y = p.y * scale
        const pulse = 0.9 + 0.3 * Math.sin(time / 300 + i)
        const r = 6 * pulse
        ctx.beginPath()
        ctx.fillStyle = nodeColors[i]
        ctx.globalAlpha = 0.9
        ctx.fillRect(x - r / 2, y - r / 2, r, r)
      })

      // foot trails (simple lines trailing backward)
      ctx.beginPath()
      ctx.strokeStyle = PRIMARY_LIGHT
      ctx.globalAlpha = 0.08
      ctx.lineWidth = 2
      // left foot
      ctx.moveTo(pts[7].x * scale, pts[7].y * scale)
      ctx.lineTo(pts[7].x * scale - 12, pts[7].y * scale + 6)
      ctx.stroke()
      // right foot
      ctx.beginPath()
      ctx.moveTo(pts[8].x * scale, pts[8].y * scale)
      ctx.lineTo(pts[8].x * scale + 12, pts[8].y * scale + 6)
      ctx.stroke()

      ctx.restore()
    }

    function drawDataNodes(time: number) {
      const c = center()
      const scale = Math.min(canvas.clientWidth, canvas.clientHeight) * 0.6
      ctx.save()
      ctx.translate(c.x, c.y - scale * 0.05)

      dataNodes.forEach((dn, di) => {
        const x = dn.x * scale + 0
        const y = dn.y * scale + 0
        // connecting line to center
        ctx.beginPath()
        ctx.moveTo(x, y)
        ctx.lineTo(0, 0)
        ctx.strokeStyle = dn.color
        ctx.globalAlpha = 0.08
        ctx.lineWidth = 1
        ctx.stroke()

        // floating node
        ctx.beginPath()
        ctx.fillStyle = dn.color
        ctx.globalAlpha = 0.9
        ctx.arc(x, y, 6, 0, Math.PI * 2)
        ctx.fill()

        // particles along line
        for (let p = 0; p < 3; p++) {
          const phase = (time / 1000 + p * 0.3 + di) % 1
          const px = x + (0 - x) * phase
          const py = y + (0 - y) * phase
          ctx.beginPath()
          ctx.fillStyle = dn.color
          ctx.globalAlpha = 0.6
          ctx.arc(px, py, 2, 0, Math.PI * 2)
          ctx.fill()
        }
      })

      ctx.restore()
    }

    function frame(now: number) {
      const t = now - t0
      ctx.clearRect(0, 0, canvas.clientWidth, canvas.clientHeight)
      // background
      ctx.fillStyle = BG
      ctx.fillRect(0, 0, canvas.clientWidth, canvas.clientHeight)

      drawRings(now)
      drawFigure(now)
      drawDataNodes(now)

      raf = requestAnimationFrame(frame)
    }

    raf = requestAnimationFrame(frame)

    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('resize', onResize)
    }
  }, [])

  return (
    <canvas
      ref={ref}
      className={className}
      style={{ width: '100%', height: '100%', display: 'block' }}
      aria-hidden
    />
  )
}

export default ProductCanvas
