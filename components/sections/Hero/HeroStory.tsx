/* eslint-disable */
'use client'

import { useEffect, useRef, useState, useCallback } from 'react'

const VIDEOS = {
  treadmill: '/hero/treadmill.mp4',
  squat:     '/hero/squat.mp4',
  isolation: '/hero/isolation.mp4',
  rehab:     '/hero/rehab.mp4',
}

type SceneKey = 'treadmill' | 'squat' | 'isolation' | 'rehab'

const REC_BASE = 74
const HRV_BASE = 65

interface Scene {
  key:        SceneKey
  duration:   number
  eyebrow:    string
  headline:   [string, string]
  sub?:       string
  redTint?:   boolean
  showAlert?: boolean
  alertText?: string
  showDays?:  boolean
  acwr: number[]
  rec:  number[]
  hrv:  number[]
}

const SCENES: Scene[] = [
  {
    key: 'treadmill', duration: 7000,
    eyebrow: 'Club data · Week 3',
    headline: ['Two streams.', 'Neither connected.'],
    sub: 'GPS at the club. Whoop at home. Two separate worlds.',
    acwr: [1.05, 1.11, 1.18, 1.25, 1.32, 1.38, 1.44],
    rec:  [74, 73, 72, 70, 68, 66, 63],
    hrv:  [68, 67, 66, 64, 63, 61, 59],
  },
  {
    key: 'squat', duration: 7000,
    eyebrow: 'Personal data · Week 6',
    headline: ['The signal existed.', 'Nobody saw it.'],
    sub: 'In the Whoop. In the 6am HRV. Unread.',
    acwr: [1.44, 1.52, 1.59, 1.65, 1.72, 1.78, 1.82],
    rec:  [63, 59, 56, 53, 50, 47, 44],
    hrv:  [59, 56, 53, 51, 49, 47, 45],
  },
  {
    key: 'isolation', duration: 5500,
    eyebrow: 'The gap.',
    headline: ['The data existed.', 'Nothing connected it.'],
    redTint: true, showAlert: true,
    alertText: 'Individual threshold exceeded. ACWR 1.82. Recovery 30pts below personal baseline. Pattern detectable 6 sessions prior.',
    acwr: [1.82, 1.82, 1.82, 1.82, 1.82, 1.82, 1.82],
    rec:  [44, 44, 43, 43, 43, 43, 43],
    hrv:  [45, 44, 44, 44, 44, 44, 44],
  },
  {
    key: 'rehab', duration: 9000,
    eyebrow: 'The connection.',
    headline: ['Club data. Personal data.', 'One individual model.'],
    sub: "Twinspire connects both streams. Your platform doesn't need to change.",
    showDays: true,
    acwr: [0.08, 0.17, 0.27, 0.38, 0.48, 0.57, 0.67],
    rec:  [30, 37, 45, 53, 59, 65, 70],
    hrv:  [44, 47, 51, 55, 59, 62, 65],
  },
]

/* ── Helpers ── */
function lerp(a: number, b: number, t: number) { return a + (b - a) * t }
function easeInOut(x: number) { return x < 0.5 ? 2 * x * x : 1 - Math.pow(-2 * x + 2, 2) / 2 }
function clamp(v: number, lo: number, hi: number) { return Math.max(lo, Math.min(hi, v)) }

function acwrCol(v: number) { return v >= 1.5 ? '#EF4444' : v >= 1.3 ? '#F59E0B' : v < 0.6 ? '#64D2FF' : '#22C55E' }
function recCol(v: number) { return (REC_BASE - v) > 20 ? '#EF4444' : (REC_BASE - v) > 10 ? '#F59E0B' : '#22C55E' }
function hrvCol(v: number) { return (HRV_BASE - v) > 14 ? '#EF4444' : (HRV_BASE - v) > 7 ? '#F59E0B' : v > HRV_BASE ? '#22C55E' : '#00A8FF' }

/* ── Chart builder — returns SVG inner HTML ── */
function buildLine(
  vals: number[], baseline: number, min: number, max: number,
  col: string, steps: number, showZones?: boolean
): string {
  const W = 200, H = 38, pL = 2, pR = 2, pT = 4, pB = 4
  const xR = W - pL - pR, yR = H - pT - pB
  const n  = vals.length
  const toX = (i: number) => pL + (i / (n - 1)) * xR
  const toY = (v: number) => pT + (max - v) / (max - min) * yR
  const pts = vals.slice(0, steps)
  const yB  = toY(baseline)
  let s = ''

  if (showZones) {
    s += `<rect x="${pL}" y="${toY(1.3)}" width="${xR}" height="${toY(0.8)-toY(1.3)}" fill="rgba(34,197,94,0.06)"/>`
    s += `<rect x="${pL}" y="${toY(1.5)}" width="${xR}" height="${toY(1.3)-toY(1.5)}" fill="rgba(245,158,11,0.06)"/>`
    s += `<line x1="${pL}" y1="${toY(1.5)}" x2="${W-pR}" y2="${toY(1.5)}" stroke="rgba(239,68,68,0.3)" stroke-width="0.6" stroke-dasharray="2,3"/>`
  }

  // Dashed baseline
  s += `<line x1="${pL}" y1="${yB}" x2="${W-pR}" y2="${yB}" stroke="rgba(255,255,255,0.3)" stroke-width="0.8" stroke-dasharray="4,3"/>`

  if (pts.length > 1) {
    // Deviation fill
    let fp = `M${toX(0)},${yB}`
    pts.forEach((v, i) => { fp += ` L${toX(i)},${toY(v)}` })
    fp += ` L${toX(pts.length - 1)},${yB} Z`
    s += `<path d="${fp}" fill="${col}" opacity="0.1"/>`
    // Line
    let lp = `M${toX(0)},${toY(pts[0])}`
    pts.forEach((v, i) => { if (i > 0) lp += ` L${toX(i)},${toY(v)}` })
    s += `<path d="${lp}" fill="none" stroke="${col}" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>`
    // End dot
    s += `<circle cx="${toX(pts.length-1)}" cy="${toY(pts[pts.length-1])}" r="2.5" fill="${col}"/>`
  }
  return s
}

/* ── Main component ── */
export function HeroStorySection() {
  const [sceneIdx, setSceneIdx] = useState(0)

  // Refs for video elements
  const videoRefs = useRef<Record<SceneKey, HTMLVideoElement | null>>({
    treadmill: null, squat: null, isolation: null, rehab: null,
  })

  // Refs for direct DOM animation (no React state re-renders)
  const eyebrowRef   = useRef<HTMLParagraphElement>(null)
  const headlineRef  = useRef<HTMLHeadingElement>(null)
  const subRef       = useRef<HTMLParagraphElement>(null)
  const textWrapRef  = useRef<HTMLDivElement>(null)
  const alertRef     = useRef<HTMLDivElement>(null)
  const alertTextRef = useRef<HTMLParagraphElement>(null)
  const dayRef       = useRef<HTMLDivElement>(null)
  const dayNumRef    = useRef<HTMLDivElement>(null)
  const redTintRef   = useRef<HTMLDivElement>(null)
  const dotsRef      = useRef<HTMLDivElement>(null)
  const progressRef  = useRef<HTMLDivElement>(null)

  // Metric DOM refs [0=ACWR, 1=Recovery, 2=HRV]
  const mValRef    = useRef<(HTMLSpanElement | null)[]>([null, null, null])
  const mStatusRef = useRef<(HTMLSpanElement | null)[]>([null, null, null])
  const mSvgRef    = useRef<(SVGSVGElement | null)[]>([null, null, null])
  const mRowRef    = useRef<(HTMLDivElement | null)[]>([null, null, null])

  const rafRef    = useRef<number | null>(null)
  const timersRef = useRef<ReturnType<typeof setTimeout>[]>([])
  const startRef  = useRef(0)

  const clearTimers = () => {
    timersRef.current.forEach(clearTimeout)
    timersRef.current = []
    if (rafRef.current) cancelAnimationFrame(rafRef.current)
  }

  const startScene = useCallback((idx: number) => {
    clearTimers()
    setSceneIdx(idx)
    startRef.current = performance.now()
    const sd = SCENES[idx]

    // Videos — set opacity directly (animation is DOM-driven, not React state)
    Object.entries(videoRefs.current).forEach(([key, el]) => {
      if (!el) return
      if (key === sd.key) {
        el.style.opacity = '1'
        el.currentTime = 0
        el.play().catch(() => {})
      } else {
        el.style.opacity = '0'
        el.pause()
        el.currentTime = 0
      }
    })

    // Red tint
    if (redTintRef.current) redTintRef.current.style.opacity = sd.redTint ? '1' : '0'

    // Text (fade out, update, fade in)
    if (textWrapRef.current) textWrapRef.current.style.opacity = '0'
    if (alertRef.current) {
      alertRef.current.style.opacity = '0'
      alertRef.current.style.transform = 'translateX(-50%) translateY(8px) scale(0.96)'
    }
    if (dayRef.current) dayRef.current.style.opacity = '0'

    timersRef.current.push(setTimeout(() => {
      if (eyebrowRef.current)  eyebrowRef.current.textContent  = sd.eyebrow
      if (headlineRef.current) headlineRef.current.innerHTML   =
        `${sd.headline[0]}<br/><span style="color:${idx === 3 ? '#00A8FF' : '#fff'}">${sd.headline[1]}</span>`
      if (subRef.current)      subRef.current.textContent      = sd.sub ?? ''
      if (textWrapRef.current) textWrapRef.current.style.opacity = '1'
      if (sd.showDays && dayRef.current) dayRef.current.style.opacity = '1'
    }, 500))

    if (sd.showAlert && alertTextRef.current) {
      alertTextRef.current.textContent = sd.alertText ?? ''
      timersRef.current.push(setTimeout(() => {
        if (alertRef.current) {
          alertRef.current.style.opacity = '1'
          alertRef.current.style.transform = 'translateX(-50%) translateY(0) scale(1)'
        }
      }, 2000))
    }

    // Dots
    if (dotsRef.current) {
      Array.from(dotsRef.current.children).forEach((dot, i) => {
        const el = dot as HTMLElement
        el.style.width    = i === idx ? '22px' : '6px'
        el.style.background = i === idx ? '#00A8FF' : 'rgba(255,255,255,0.22)'
      })
    }

    // Next scene
    timersRef.current.push(setTimeout(() => startScene((idx + 1) % SCENES.length), sd.duration))

    // Animation loop — direct DOM, no setState
    const tick = (now: number) => {
      const rawF = clamp((now - startRef.current) / sd.duration, 0, 1)
      const f    = easeInOut(rawF)

      // Progress bar
      if (progressRef.current) progressRef.current.style.width = `${rawF * 100}%`

      // Day counter
      if (sd.showDays && dayNumRef.current) {
        dayNumRef.current.textContent = `Day ${Math.round(lerp(1, 28, f))}`
      }

      // Metric updates
      const steps = Math.max(2, Math.min(7, Math.round(f * 6) + 2))

      // ACWR
      const acwrNow = lerp(sd.acwr[0], sd.acwr[sd.acwr.length - 1], f)
      const acwrPts = sd.acwr.slice(0, steps)
      const aC = acwrCol(acwrNow)
      const aSt = acwrNow >= 1.5 ? 'High risk zone (>1.5)' : acwrNow >= 1.3 ? 'Caution — above optimal' : acwrNow < 0.6 ? 'Rebuilding' : 'Optimal (0.8–1.3)'
      if (mValRef.current[0])    { mValRef.current[0]!.textContent = acwrNow.toFixed(2); mValRef.current[0]!.style.color = aC }
      if (mStatusRef.current[0]) mStatusRef.current[0]!.textContent = aSt
      if (mSvgRef.current[0])    mSvgRef.current[0]!.innerHTML = buildLine(acwrPts, 1.0, 0.4, 2.1, aC, steps, true)
      if (mRowRef.current[0])    mRowRef.current[0]!.style.borderBottomColor = `${aC}55`

      // Recovery
      const recNow = lerp(sd.rec[0], sd.rec[sd.rec.length - 1], f)
      const recPts = sd.rec.slice(0, steps)
      const rC = recColor(recNow)
      const rDelta = Math.round(REC_BASE - recNow)
      const rSt = rDelta > 20 ? `↓ ${rDelta} pts below baseline` : rDelta > 10 ? `↓ ${rDelta} pts — monitoring` : recNow >= REC_BASE ? 'Baseline restored' : 'Returning to baseline'
      if (mValRef.current[1])    { mValRef.current[1]!.textContent = String(Math.round(recNow)); mValRef.current[1]!.style.color = rC }
      if (mStatusRef.current[1]) mStatusRef.current[1]!.textContent = rSt
      if (mSvgRef.current[1])    mSvgRef.current[1]!.innerHTML = buildLine(recPts, REC_BASE, 20, 90, rC, steps)
      if (mRowRef.current[1])    mRowRef.current[1]!.style.borderBottomColor = `${rC}55`

      // HRV
      const hrvNow = lerp(sd.hrv[0], sd.hrv[sd.hrv.length - 1], f)
      const hrvPts = sd.hrv.slice(0, steps)
      const hC = hrvColor(hrvNow)
      const hDelta = Math.round(HRV_BASE - hrvNow)
      const hSt = hDelta > 14 ? `↓ ${hDelta}ms — significant` : hDelta > 7 ? `↓ ${hDelta}ms — mild suppression` : hrvNow > HRV_BASE ? `↑ ${Math.round(-hDelta)}ms above mean` : 'Within personal norms'
      if (mValRef.current[2])    { mValRef.current[2]!.textContent = `${Math.round(hrvNow)}ms`; mValRef.current[2]!.style.color = hC }
      if (mStatusRef.current[2]) mStatusRef.current[2]!.textContent = hSt
      if (mSvgRef.current[2])    mSvgRef.current[2]!.innerHTML = buildLine(hrvPts, HRV_BASE, 36, 80, hC, steps)
      if (mRowRef.current[2])    mRowRef.current[2]!.style.borderBottomColor = `${hC}55`

      if (rawF < 1) rafRef.current = requestAnimationFrame(tick)
    }
    rafRef.current = requestAnimationFrame(tick)

  }, []) // eslint-disable-line

  function recColor(v: number) { return recCol(v) }
  function hrvColor(v: number) { return hrvCol(v) }

  useEffect(() => { startScene(0); return clearTimers }, []) // eslint-disable-line

  const handleDot = (idx: number) => startScene(idx)

  /* ── Metric column ── */
  const metricCol = (i: number, label: string, sublabel: string, initVal: string) => (
    <div
      ref={el => { mRowRef.current[i] = el }}
      style={{
        flex: '1 1 0', minWidth: 0,
        borderBottom: '1px solid rgba(255,255,255,0.15)',
        paddingBottom: 10,
        transition: 'border-color 0.5s',
      }}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 2 }}>
        <div>
          <div style={{ fontSize: 9, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.45)' }}>{label}</div>
          <div style={{ fontSize: 7, color: 'rgba(255,255,255,0.28)', letterSpacing: '0.06em', marginTop: 1 }}>{sublabel}</div>
        </div>
        <span
          ref={el => { mValRef.current[i] = el }}
          style={{
            fontFamily: "'Barlow Condensed', sans-serif",
            fontSize: 26, fontWeight: 900, color: '#fff',
            lineHeight: 1, transition: 'color 0.4s',
          }}
        >
          {initVal}
        </span>
      </div>
      <svg
        ref={el => { mSvgRef.current[i] = el }}
        width="200" height="38"
        style={{ display: 'block', width: '100%', overflow: 'visible', margin: '4px 0' }}
      />
      <span
        ref={el => { mStatusRef.current[i] = el }}
        style={{ fontSize: 9, color: 'rgba(255,255,255,0.4)' }}
      />
    </div>
  )

  return (
    <section style={{
      position: 'relative', width: '100%', height: '100svh', minHeight: 620,
      overflow: 'hidden', background: '#020818',
      fontFamily: "'Inter', system-ui, sans-serif",
    }}>

      {/* Videos */}
      {SCENES.map((s, si) => (
        <video
          key={s.key}
          ref={el => { videoRefs.current[s.key] = el }}
          src={VIDEOS[s.key]}
          muted playsInline preload="auto"
          style={{
            position: 'absolute', inset: 0, width: '100%', height: '100%',
            objectFit: 'cover',
            opacity: si === 0 ? 1 : 0,
            transition: 'opacity 1.4s ease',
          }}
          onLoad={e => {
            // Keep correct video visible after re-renders
            const el = e.currentTarget
            const correct = SCENES[sceneIdx]?.key === s.key
            el.style.opacity = correct ? '1' : '0'
          }}
        />
      ))}

      {/* Overlays */}
      <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to right,rgba(2,8,24,0.65) 0%,rgba(2,8,24,0.22) 55%,rgba(2,8,24,0.05) 100%)' }} />
      <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top,rgba(2,8,24,0.92) 0%,transparent 52%)' }} />
      <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom,rgba(2,8,24,0.45) 0%,transparent 18%)' }} />
      <div ref={redTintRef} style={{ position: 'absolute', inset: 0, background: 'rgba(55,5,5,0.22)', opacity: 0, transition: 'opacity 1.2s' }} />

      {/* Day counter */}
      <div ref={dayRef} style={{ position: 'absolute', top: 28, right: 28, textAlign: 'right', opacity: 0, transition: 'opacity 0.8s' }}>
        <div ref={dayNumRef} style={{ fontFamily: "'Barlow Condensed',sans-serif", fontSize: 52, fontWeight: 900, color: '#fff', lineHeight: 1 }}>Day 1</div>
        <div style={{ fontSize: 9, color: 'rgba(255,255,255,0.4)', letterSpacing: '0.12em', textTransform: 'uppercase', marginTop: 2 }}>Rehabilitation</div>
      </div>

      {/* Hero text */}
      <div
        ref={textWrapRef}
        style={{
          position: 'absolute', top: 0, left: 0, right: 0,
          height: '52%',
          display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
          padding: '0 24px',
          opacity: 0, transition: 'opacity 0.9s',
          pointerEvents: 'none',
        }}
      >
        <p ref={eyebrowRef} style={{ fontSize: 11, color: 'rgba(0,168,255,0.82)', letterSpacing: '0.16em', textTransform: 'uppercase', marginBottom: 14 }} />
        <h1
          ref={headlineRef}
          style={{
            fontFamily: "'Barlow Condensed',sans-serif",
            fontSize: 'clamp(46px,6.5vw,80px)',
            fontWeight: 900, lineHeight: 1, letterSpacing: '-0.02em',
            color: '#fff', textAlign: 'center', margin: '0 0 14px',
          }}
        />
        <p ref={subRef} style={{ fontSize: 14, color: 'rgba(170,190,230,0.65)', maxWidth: 460, textAlign: 'center', lineHeight: 1.65, fontStyle: 'italic', margin: 0 }} />
      </div>

      {/* Alert card — centred, above metrics */}
      <div
        ref={alertRef}
        style={{
          position: 'absolute',
          bottom: 'calc(44px + 90px + 28px)',
          left: '50%',
          transform: 'translateX(-50%) translateY(8px) scale(0.96)',
          background: 'rgba(6,2,20,0.88)',
          border: '1px solid rgba(239,68,68,0.6)',
          borderRadius: 10, padding: '12px 16px',
          width: 'min(460px, calc(100% - 48px))',
          backdropFilter: 'blur(12px)',
          opacity: 0,
          transition: 'opacity 0.45s, transform 0.45s',
          pointerEvents: 'none',
          display: 'flex', alignItems: 'flex-start', gap: 10,
        }}
      >
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#EF4444" strokeWidth="2.5" style={{ flexShrink: 0, marginTop: 1 }}>
          <path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z"/>
          <line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/>
        </svg>
        <p ref={alertTextRef} style={{ fontSize: 11, color: 'rgba(220,210,240,0.85)', lineHeight: 1.55, margin: 0 }} />
      </div>

      {/* Metrics row — minimal, broadcast-style */}
      <div
        style={{
          position: 'absolute',
          bottom: 44, left: 28, right: 28,
          display: 'flex', gap: 28,
        }}
      >
        {metricCol(0, 'ACWR',           'Acute : Chronic Workload',      '1.05')}
        {metricCol(1, 'Recovery Score', `vs baseline  ╌  ${REC_BASE}`,   '74')}
        {metricCol(2, 'Morning HRV',    `personal wearable  ╌  ${HRV_BASE}ms`, '68ms')}
      </div>

      {/* Scene dots */}
      <div
        ref={dotsRef}
        style={{ position: 'absolute', bottom: 18, left: '50%', transform: 'translateX(-50%)', display: 'flex', gap: 8 }}
      >
        {SCENES.map((s, i) => (
          <button
            key={s.key}
            onClick={() => handleDot(i)}
            aria-label={s.eyebrow}
            style={{
              height: 5, borderRadius: 3, border: 'none', cursor: 'pointer', padding: 0,
              width: i === 0 ? '22px' : '5px',
              background: i === 0 ? '#00A8FF' : 'rgba(255,255,255,0.2)',
              transition: 'width 0.3s, background 0.3s',
            }}
          />
        ))}
      </div>

      {/* Progress bar */}
      <div ref={progressRef} style={{ position: 'absolute', bottom: 0, left: 0, height: 2, background: '#00A8FF', width: '0%' }} />
    </section>
  )
}
