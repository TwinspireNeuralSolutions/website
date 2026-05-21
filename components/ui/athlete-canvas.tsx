'use client'

import { useEffect, useRef } from 'react'

// ─── Color palette ─────────────────────────────────────────────────────────
const BG = '#0C1628'
const BLUE = '#1433C8'
const BLUE_LIGHT = '#4F7FD4'
const GOLD = '#C9A96E'

// ─── Athlete joint skeleton (normalised 0-1, origin top-left) ───────────────
// Designed for a running pose silhouette
const JOINTS = {
  head: [0.5, 0.08],
  neck: [0.5, 0.13],
  shoulderL: [0.4, 0.2],
  shoulderR: [0.6, 0.2],
  elbowL: [0.32, 0.31],
  elbowR: [0.66, 0.28],
  wristL: [0.26, 0.41],
  wristR: [0.72, 0.36],
  hipL: [0.44, 0.42],
  hipR: [0.56, 0.42],
  kneeL: [0.4, 0.6],
  kneeR: [0.61, 0.57],
  ankleL: [0.38, 0.78],
  ankleR: [0.62, 0.75],
  toeL: [0.34, 0.86],
  toeR: [0.66, 0.83],
} as const

type JointKey = keyof typeof JOINTS

// ─── Triangular mesh faces ───────────────────────────────────────────────────
const FACES: [JointKey, JointKey, JointKey][] = [
  // Torso
  ['shoulderL', 'shoulderR', 'hipR'],
  ['shoulderL', 'hipL', 'hipR'],
  ['neck', 'shoulderL', 'shoulderR'],
  // Left arm
  ['shoulderL', 'elbowL', 'neck'],
  ['elbowL', 'wristL', 'shoulderL'],
  // Right arm
  ['shoulderR', 'elbowR', 'neck'],
  ['elbowR', 'wristR', 'shoulderR'],
  // Left leg
  ['hipL', 'hipR', 'kneeL'],
  ['kneeL', 'hipR', 'kneeR'],
  ['kneeL', 'ankleL', 'hipL'],
  ['ankleL', 'toeL', 'kneeL'],
  // Right leg
  ['hipR', 'kneeR', 'ankleR'],
  ['ankleR', 'toeR', 'kneeR'],
]

// ─── Glowing joint keys ──────────────────────────────────────────────────────
const GLOW_JOINTS: JointKey[] = [
  'shoulderL',
  'shoulderR',
  'hipL',
  'hipR',
  'kneeL',
  'kneeR',
  'ankleL',
  'ankleR',
  'elbowL',
  'elbowR',
]

// ─── Data nodes ──────────────────────────────────────────────────────────────
interface DataNode {
  label: string
  color: string // BLUE or GOLD
  // normalised anchor relative to canvas
  ax: number
  ay: number
}

const DATA_NODES: DataNode[] = [
  { label: 'GPS', color: BLUE, ax: 0.12, ay: 0.18 },
  { label: 'EMG', color: BLUE, ax: 0.88, ay: 0.22 },
  { label: 'Strength', color: BLUE, ax: 0.9, ay: 0.5 },
  { label: 'Physio', color: BLUE, ax: 0.1, ay: 0.55 },
  { label: 'Sleep', color: GOLD, ax: 0.15, ay: 0.78 },
  { label: 'Load', color: GOLD, ax: 0.85, ay: 0.78 },
]

// Body center — particles converge here
const BODY_CENTER: [number, number] = [0.5, 0.44]

// ─── Particle ────────────────────────────────────────────────────────────────
interface Particle {
  nodeIndex: number
  t: number // 0-1 progress along path
  speed: number
}

function hexToRgb(hex: string): [number, number, number] {
  const r = parseInt(hex.slice(1, 3), 16)
  const g = parseInt(hex.slice(3, 5), 16)
  const b = parseInt(hex.slice(5, 7), 16)
  return [r, g, b]
}

function lerp(a: number, b: number, t: number) {
  return a + (b - a) * t
}

// ─── Main component ───────────────────────────────────────────────────────────
interface AthleteCanvasProps {
  className?: string
}

/**
 * AthleteCanvas — Three-layer product hero animation.
 * Layer 1 (deepest): Isfahan-style concentric gold rings rotating slowly.
 * Layer 2: Running athlete built from triangular mesh with pulsing joints.
 * Layer 3: Data nodes with travelling particles flowing into body.
 */
export function AthleteCanvas({ className }: AthleteCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const rafRef = useRef<number>(0)
  const startRef = useRef<number>(0)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    // ── Responsive sizing ──────────────────────────────────────────────────
    let W = 0,
      H = 0

    function resize() {
      if (!canvas) return
      const rect = canvas.getBoundingClientRect()
      W = rect.width
      H = rect.height
      canvas.width = W * devicePixelRatio
      canvas.height = H * devicePixelRatio
      if (ctx) ctx.setTransform(devicePixelRatio, 0, 0, devicePixelRatio, 0, 0)
    }

    const ro = new ResizeObserver(resize)
    ro.observe(canvas)
    resize()

    // ── Helpers ────────────────────────────────────────────────────────────
    function px(nx: number) {
      return nx * W
    }
    function py(ny: number) {
      return ny * H
    }

    function jointPx(key: JointKey): [number, number] {
      const [nx, ny] = JOINTS[key]
      return [px(nx), py(ny)]
    }

    // ── Particles ──────────────────────────────────────────────────────────
    const particles: Particle[] = []
    for (let i = 0; i < DATA_NODES.length; i++) {
      // 4-6 particles per node, staggered offsets
      const count = 4 + Math.floor(Math.random() * 3)
      for (let j = 0; j < count; j++) {
        particles.push({
          nodeIndex: i,
          t: j / count,
          speed: 0.0018 + Math.random() * 0.0012,
        })
      }
    }

    // ── Draw loop ──────────────────────────────────────────────────────────
    function draw(ts: number) {
      if (!ctx) return
      if (!startRef.current) startRef.current = ts
      const elapsed = (ts - startRef.current) / 1000 // seconds

      ctx.clearRect(0, 0, W, H)

      // ━━━━ Layer 1: Isfahan rings ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
      const cx = px(0.5)
      const cy = py(0.44)
      const maxR = Math.min(W, H) * 0.46

      ctx.save()
      ctx.globalAlpha = 0.13
      const [gr, gg, gb] = hexToRgb(GOLD)

      for (let ring = 1; ring <= 7; ring++) {
        const r = (ring / 7) * maxR
        const dir = ring % 2 === 0 ? 1 : -1
        const angle = dir * elapsed * 0.04 + (ring * Math.PI) / 7

        ctx.save()
        ctx.translate(cx, cy)
        ctx.rotate(angle)

        // Concentric circle
        ctx.beginPath()
        ctx.arc(0, 0, r, 0, Math.PI * 2)
        ctx.strokeStyle = `rgb(${gr},${gg},${gb})`
        ctx.lineWidth = 0.5
        ctx.stroke()

        // Star polygon — 6-pointed for inner rings, 8-pointed for outer
        const points = ring <= 3 ? 6 : 8
        const inner = r * 0.82
        ctx.beginPath()
        for (let p = 0; p < points * 2; p++) {
          const a = (p / (points * 2)) * Math.PI * 2 - Math.PI / 2
          const rad = p % 2 === 0 ? r : inner
          const x = Math.cos(a) * rad
          const y = Math.sin(a) * rad
          if (p === 0) ctx.moveTo(x, y)
          else ctx.lineTo(x, y)
        }
        ctx.closePath()
        ctx.strokeStyle = `rgb(${gr},${gg},${gb})`
        ctx.lineWidth = 0.4
        ctx.stroke()

        ctx.restore()
      }
      ctx.restore()

      // ━━━━ Layer 2: Triangular mesh body ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
      const [br, bg, bb] = hexToRgb(BLUE_LIGHT)

      // Faces — faint blue fill, edge lines
      ctx.save()
      ctx.globalAlpha = 1
      for (const [a, b, c] of FACES) {
        const [ax, ay] = jointPx(a)
        const [bx, by] = jointPx(b)
        const [cxp, cyp] = jointPx(c)

        ctx.beginPath()
        ctx.moveTo(ax, ay)
        ctx.lineTo(bx, by)
        ctx.lineTo(cxp, cyp)
        ctx.closePath()
        ctx.fillStyle = `rgba(${br},${bg},${bb},0.06)`
        ctx.fill()
        ctx.strokeStyle = `rgba(${br},${bg},${bb},0.35)`
        ctx.lineWidth = 0.8
        ctx.stroke()
      }
      ctx.restore()

      // Glow joints — pulsing with staggered timing
      ctx.save()
      for (let i = 0; i < GLOW_JOINTS.length; i++) {
        const key = GLOW_JOINTS[i]
        const [jx, jy] = jointPx(key)
        const phase = elapsed * 1.4 + i * 0.55
        const pulse = 0.55 + 0.45 * Math.sin(phase)

        ctx.beginPath()
        ctx.arc(jx, jy, 3.5, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(${br},${bg},${bb},${0.5 + 0.5 * pulse})`
        ctx.fill()

        // Outer ring
        ctx.beginPath()
        ctx.arc(jx, jy, 5.5, 0, Math.PI * 2)
        ctx.strokeStyle = `rgba(${br},${bg},${bb},${0.2 * pulse})`
        ctx.lineWidth = 1
        ctx.stroke()
      }
      ctx.restore()

      // Foot trails
      ctx.save()
      for (const key of ['ankleL', 'ankleR', 'toeL', 'toeR'] as JointKey[]) {
        const [jx, jy] = jointPx(key)
        const trailLen = W * 0.06
        const grad = ctx.createLinearGradient(jx - trailLen, jy, jx, jy)
        grad.addColorStop(0, `rgba(${br},${bg},${bb},0)`)
        grad.addColorStop(1, `rgba(${br},${bg},${bb},0.25)`)
        ctx.beginPath()
        ctx.moveTo(jx - trailLen, jy)
        ctx.lineTo(jx, jy)
        ctx.strokeStyle = grad
        ctx.lineWidth = 1
        ctx.stroke()
      }
      ctx.restore()

      // ━━━━ Layer 3: Data nodes + travelling particles ━━━━━━━━━━━━━━━━━━
      const bodyCx = px(BODY_CENTER[0])
      const bodyCy = py(BODY_CENTER[1])

      // Particles
      for (const p of particles) {
        // Advance
        p.t += p.speed
        if (p.t >= 1) p.t -= 1

        const node = DATA_NODES[p.nodeIndex]
        const nx = px(node.ax)
        const ny = py(node.ay)

        // Curved path: quadratic bezier from node → body center
        // Control point slightly offset
        const cpx = lerp(nx, bodyCx, 0.5) + (node.ax < 0.5 ? 30 : -30)
        const cpy = lerp(ny, bodyCy, 0.5) - 20

        const t = p.t
        const mt = 1 - t
        const x = mt * mt * nx + 2 * mt * t * cpx + t * t * bodyCx
        const y = mt * mt * ny + 2 * mt * t * cpy + t * t * bodyCy

        // Fade in/out: bright at 0.2-0.8, fade at edges
        const fadeT = t < 0.15 ? t / 0.15 : t > 0.85 ? (1 - t) / 0.15 : 1
        const [pr2, pg2, pb2] = hexToRgb(node.color)

        ctx.save()
        ctx.globalAlpha = fadeT * 0.85
        ctx.beginPath()
        ctx.arc(x, y, 1.8, 0, Math.PI * 2)
        ctx.fillStyle = `rgb(${pr2},${pg2},${pb2})`
        ctx.fill()
        ctx.restore()
      }

      // Node labels + dots
      ctx.save()
      for (const node of DATA_NODES) {
        const nx = px(node.ax)
        const ny = py(node.ay)
        const [nr, ng2, nb2] = hexToRgb(node.color)

        // Outer circle
        ctx.beginPath()
        ctx.arc(nx, ny, 7, 0, Math.PI * 2)
        ctx.strokeStyle = `rgba(${nr},${ng2},${nb2},0.5)`
        ctx.lineWidth = 1
        ctx.stroke()

        // Inner dot
        ctx.beginPath()
        ctx.arc(nx, ny, 3.5, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(${nr},${ng2},${nb2},0.9)`
        ctx.fill()

        // Label
        ctx.font = `500 11px "Satoshi", system-ui, sans-serif`
        ctx.fillStyle = `rgba(${nr},${ng2},${nb2},0.85)`
        ctx.textAlign = node.ax < 0.5 ? 'right' : 'left'
        ctx.textBaseline = 'middle'
        const labelX = node.ax < 0.5 ? nx - 12 : nx + 12
        ctx.fillText(node.label, labelX, ny)
      }
      ctx.restore()

      rafRef.current = requestAnimationFrame(draw)
    }

    rafRef.current = requestAnimationFrame(draw)

    return () => {
      cancelAnimationFrame(rafRef.current)
      ro.disconnect()
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className={className}
      aria-hidden="true"
      style={{ display: 'block', width: '100%', height: '100%' }}
    />
  )
}
