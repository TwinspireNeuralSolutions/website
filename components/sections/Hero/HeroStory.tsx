/* eslint-disable */
'use client'

import { useEffect, useRef, useState, useCallback } from 'react'

/* ─── Video sources ─────────────────────────────────────────────────── */
/* Download MP4s from Higgsfield and place in /public/hero/             */
const VIDEOS = {
  treadmill: '/hero/treadmill.mp4',
  squat:     '/hero/squat.mp4',
  isolation: '/hero/isolation.mp4',
  rehab:     '/hero/rehab.mp4',
}

type SceneKey = 'treadmill' | 'squat' | 'isolation' | 'rehab'

/* ─── Chart ─────────────────────────────────────────────────────────── */
interface ChartConfig {
  values:    number[]
  baseline:  number
  min:       number
  max:       number
  colorFn:   (v: number) => string
  zones?:    { from: number; to: number; fill: string }[]
  dangerAt?: number
  baselineLabel?: string
}

function buildChart(cfg: ChartConfig, frac: number): string {
  const W = 180, H = 44, pL = 3, pR = 3, pT = 6, pB = 4
  const xR = W - pL - pR
  const yR = H - pT - pB
  const n  = cfg.values.length
  const toX = (i: number) => pL + (i / (n - 1)) * xR
  const toY = (v: number) => pT + (cfg.max - v) / (cfg.max - cfg.min) * yR
  const steps = Math.max(2, Math.min(n, Math.round(frac * (n - 1)) + 2))
  const pts   = cfg.values.slice(0, steps)
  const lastV = pts[pts.length - 1]
  const col   = cfg.colorFn(lastV)
  const yBase = toY(cfg.baseline)
  let svg = ''

  cfg.zones?.forEach(z => {
    const y1 = toY(Math.min(z.to,   cfg.max))
    const y2 = toY(Math.max(z.from, cfg.min))
    svg += `<rect x="${pL}" y="${y1}" width="${xR}" height="${y2 - y1}" fill="${z.fill}" rx="1"/>`
  })

  if (pts.length > 1) {
    let fp = `M${toX(0)},${yBase}`
    pts.forEach((v, i) => { fp += ` L${toX(i)},${toY(v)}` })
    fp += ` L${toX(pts.length - 1)},${yBase} Z`
    svg += `<path d="${fp}" fill="${col}" opacity="0.13"/>`
  }

  if (cfg.dangerAt !== undefined) {
    const yD = toY(cfg.dangerAt)
    svg += `<line x1="${pL}" y1="${yD}" x2="${W - pR}" y2="${yD}" stroke="rgba(239,68,68,0.5)" stroke-width="0.8" stroke-dasharray="3,3"/>`
    svg += `<text x="${W - pR - 1}" y="${yD - 2}" font-size="5" fill="rgba(239,68,68,0.6)" text-anchor="end">${cfg.dangerAt}</text>`
  }

  svg += `<line x1="${pL}" y1="${yBase}" x2="${W - pR}" y2="${yBase}" stroke="rgba(100,200,255,0.75)" stroke-width="1" stroke-dasharray="5,3"/>`
  if (cfg.baselineLabel) {
    svg += `<text x="${pL + 2}" y="${yBase - 2.5}" font-size="5" fill="rgba(100,200,255,0.75)">${cfg.baselineLabel}</text>`
  }

  if (pts.length > 1) {
    let d = `M${toX(0)},${toY(pts[0])}`
    pts.forEach((v, i) => { if (i > 0) d += ` L${toX(i)},${toY(v)}` })
    svg += `<path d="${d}" fill="none" stroke="${col}" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/>`
    svg += `<circle cx="${toX(pts.length - 1)}" cy="${toY(lastV)}" r="2.8" fill="${col}"/>`
  }
  return svg
}

const acwrColor = (v: number) => v >= 1.5 ? '#EF4444' : v >= 1.3 ? '#F59E0B' : v < 0.6 ? '#64D2FF' : '#22C55E'
const recColor  = (v: number, base = 74) => (base - v) > 20 ? '#EF4444' : (base - v) > 10 ? '#F59E0B' : '#22C55E'
const hrvColor  = (v: number, base = 65) => (base - v) > 14 ? '#EF4444' : (base - v) > 7  ? '#F59E0B' : v > base ? '#22C55E' : '#00A8FF'

/* ─── Scene data ────────────────────────────────────────────────────── */
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

const REC_BASE = 74
const HRV_BASE = 65

const SCENES: Scene[] = [
  {
    key: 'treadmill', duration: 7000,
    eyebrow: 'Club data · Week 3',
    headline: ['Two streams.', 'Neither connected.'],
    sub: 'GPS at the club. Whoop at home. Two separate worlds — neither aware of the other.',
    acwr: [1.05, 1.11, 1.18, 1.25, 1.32, 1.38, 1.44],
    rec:  [74,   73,   72,   70,   68,   66,   63],
    hrv:  [68,   67,   66,   64,   63,   61,   59],
  },
  {
    key: 'squat', duration: 7000,
    eyebrow: 'Personal data · Week 6',
    headline: ['The signal existed.', 'Nobody saw it.'],
    sub: 'In the Whoop. In the 6am HRV. In the rest-day recovery scores. Unread.',
    acwr: [1.44, 1.52, 1.59, 1.65, 1.72, 1.78, 1.82],
    rec:  [63,   59,   56,   53,   50,   47,   44],
    hrv:  [59,   56,   53,   51,   49,   47,   45],
  },
  {
    key: 'isolation', duration: 5500,
    eyebrow: 'The gap.',
    headline: ['The data existed.', 'Nothing connected it.'],
    redTint: true, showAlert: true,
    alertText: 'Individual threshold exceeded. ACWR 1.82. Recovery 30pts below personal baseline. Pattern detectable 6 sessions prior — across both club and personal data.',
    acwr: [1.82, 1.82, 1.82, 1.82, 1.82, 1.82, 1.82],
    rec:  [44,   44,   43,   43,   43,   43,   43],
    hrv:  [45,   44,   44,   44,   44,   44,   44],
  },
  {
    key: 'rehab', duration: 9000,
    eyebrow: 'The connection.',
    headline: ['Club data. Personal data.', 'One individual model.'],
    sub: "Twinspire connects both streams. Your platform doesn't need to change.",
    showDays: true,
    acwr: [0.08, 0.17, 0.27, 0.38, 0.48, 0.57, 0.67],
    rec:  [30,   37,   45,   53,   59,   65,   70],
    hrv:  [44,   47,   51,   55,   59,   62,   65],
  },
]

/* ─── Helpers ───────────────────────────────────────────────────────── */
function lerp(a: number, b: number, t: number) { return a + (b - a) * t }
function easeInOut(x: number) { return x < 0.5 ? 2 * x * x : 1 - Math.pow(-2 * x + 2, 2) / 2 }
function clamp(v: number, a: number, b: number) { return Math.max(a, Math.min(b, v)) }

/* ─── Metric card ───────────────────────────────────────────────────── */
interface MetricCardProps {
  label: string
  sublabel: string
  value: string
  status: string
  colorClass: string
  chartSvg: string
  chartW?: number
}

function MetricCard({ label, sublabel, value, status, colorClass, chartSvg, chartW = 180 }: MetricCardProps) {
  const borderCol =
    colorClass === 'crit' ? 'rgba(239,68,68,0.6)' :
    colorClass === 'warn' ? 'rgba(245,158,11,0.55)' :
    colorClass === 'good' ? 'rgba(34,197,94,0.5)' :
    'rgba(0,168,255,0.22)'
  const valCol =
    colorClass === 'crit' ? '#EF4444' :
    colorClass === 'warn' ? '#F59E0B' :
    colorClass === 'good' ? '#22C55E' : '#fff'

  return (
    <div
      style={{
        background: 'rgba(2,6,36,0.88)',
        border: `1px solid ${borderCol}`,
        borderRadius: 12,
        padding: '10px 13px',
        backdropFilter: 'blur(8px)',
        WebkitBackdropFilter: 'blur(8px)',
        transition: 'border-color 0.5s',
        flex: '1 1 0',
        minWidth: 0,
      }}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 6 }}>
        <div>
          <div style={{ fontSize: 8, letterSpacing: '0.09em', textTransform: 'uppercase', color: 'rgba(122,142,192,0.85)', lineHeight: 1.35 }}>{label}</div>
          <div style={{ fontSize: 6.5, color: 'rgba(122,142,192,0.55)', letterSpacing: '0.06em', marginTop: 1 }}>{sublabel}</div>
        </div>
        <div
          style={{
            fontFamily: "'Barlow Condensed', sans-serif",
            fontSize: 22, fontWeight: 900, lineHeight: 1,
            color: valCol,
            transition: 'color 0.5s',
            marginLeft: 8,
            whiteSpace: 'nowrap',
          }}
        >
          {value}
        </div>
      </div>
      <svg
        width={chartW}
        height="44"
        style={{ display: 'block', overflow: 'visible', width: '100%' }}
        dangerouslySetInnerHTML={{ __html: chartSvg }}
      />
      <div style={{ fontSize: 8, color: 'rgba(122,142,192,0.65)', marginTop: 5 }}>{status}</div>
    </div>
  )
}

/* ─── Main ──────────────────────────────────────────────────────────── */
export function HeroStorySection() {
  const [sceneIdx,     setSceneIdx]     = useState(0)
  const [frac,         setFrac]         = useState(0)
  const [alertVisible, setAlertVisible] = useState(false)
  const [textVisible,  setTextVisible]  = useState(false)

  const rafRef    = useRef<number | null>(null)
  const startRef  = useRef(performance.now())
  const timersRef = useRef<ReturnType<typeof setTimeout>[]>([])
  const videoRefs = useRef<Record<SceneKey, HTMLVideoElement | null>>({
    treadmill: null, squat: null, isolation: null, rehab: null,
  })

  const scene = SCENES[sceneIdx]

  const clearTimers = () => {
    timersRef.current.forEach(clearTimeout)
    timersRef.current = []
    if (rafRef.current) cancelAnimationFrame(rafRef.current)
  }

  const startScene = useCallback((idx: number) => {
    clearTimers()
    setFrac(0)
    setAlertVisible(false)
    setTextVisible(false)
    startRef.current = performance.now()

    Object.entries(videoRefs.current).forEach(([key, el]) => {
      if (!el) return
      if (key === SCENES[idx].key) { el.currentTime = 0; el.play().catch(() => {}) }
      else { el.pause(); el.currentTime = 0 }
    })

    const sd = SCENES[idx]
    timersRef.current.push(setTimeout(() => setTextVisible(true), 500))
    if (sd.showAlert) timersRef.current.push(setTimeout(() => setAlertVisible(true), 2000))
    timersRef.current.push(setTimeout(() => startScene((idx + 1) % SCENES.length), sd.duration))

    const tick = (now: number) => {
      const f = clamp((now - startRef.current) / sd.duration, 0, 1)
      setFrac(easeInOut(f))
      if (f < 1) rafRef.current = requestAnimationFrame(tick)
    }
    rafRef.current = requestAnimationFrame(tick)
  }, []) // eslint-disable-line

  useEffect(() => { startScene(0); return clearTimers }, []) // eslint-disable-line

  const handleDot = (idx: number) => { setSceneIdx(idx); startScene(idx) }

  /* Derived chart values */
  const steps     = Math.max(2, Math.min(7, Math.round(frac * 6) + 2))
  const acwrPts   = scene.acwr.slice(0, steps)
  const recPts    = scene.rec.slice(0, steps)
  const hrvPts    = scene.hrv.slice(0, steps)
  const acwrNow   = acwrPts[acwrPts.length - 1]
  const recNow    = recPts[recPts.length - 1]
  const hrvNow    = hrvPts[hrvPts.length - 1]

  const acwrCls = acwrNow >= 1.5 ? 'crit' : acwrNow >= 1.3 ? 'warn' : acwrNow < 0.6 ? 'good' : ''
  const recCls  = (REC_BASE - recNow) > 20 ? 'crit' : (REC_BASE - recNow) > 10 ? 'warn' : recNow >= REC_BASE ? 'good' : ''
  const hrvCls  = (HRV_BASE - hrvNow) > 14 ? 'crit' : (HRV_BASE - hrvNow) > 7  ? 'warn' : hrvNow > HRV_BASE ? 'good' : ''

  const acwrStatus = acwrNow >= 1.5 ? 'High risk zone (>1.5)' : acwrNow >= 1.3 ? 'Caution — above optimal' : acwrNow < 0.6 ? 'Rebuilding' : 'Optimal (0.8–1.3)'
  const recDelta   = REC_BASE - recNow
  const recStatus  = recDelta > 20 ? `↓ ${Math.round(recDelta)} pts below baseline` : recDelta > 10 ? `↓ ${Math.round(recDelta)} pts — monitoring` : recNow >= REC_BASE ? 'Baseline restored' : 'Approaching baseline'
  const hrvDelta   = HRV_BASE - hrvNow
  const hrvStatus  = hrvDelta > 14 ? `↓ ${Math.round(hrvDelta)}ms suppressed` : hrvDelta > 7 ? `↓ ${Math.round(hrvDelta)}ms mild suppression` : hrvNow > HRV_BASE ? `↑ ${Math.round(-hrvDelta)}ms above mean` : `Within personal norms`

  const acwrSvg = buildChart({
    values: acwrPts, baseline: 1.0, min: 0.4, max: 2.1,
    colorFn: acwrColor, dangerAt: 1.5, baselineLabel: '1.0',
    zones: [
      { from: 0.8, to: 1.3, fill: 'rgba(34,197,94,0.07)' },
      { from: 1.3, to: 1.5, fill: 'rgba(245,158,11,0.07)' },
      { from: 1.5, to: 2.5, fill: 'rgba(239,68,68,0.06)' },
    ],
  }, frac)
  const recSvg = buildChart({ values: recPts, baseline: REC_BASE, min: 20, max: 90, colorFn: (v) => recColor(v), baselineLabel: `${REC_BASE}` }, frac)
  const hrvSvg = buildChart({ values: hrvPts, baseline: HRV_BASE, min: 36, max: 80, colorFn: (v) => hrvColor(v), baselineLabel: `${HRV_BASE}ms` }, frac)

  const day = scene.showDays ? Math.round(lerp(1, 28, frac)) : null

  return (
    <section
      style={{
        position: 'relative', width: '100%', height: '100svh', minHeight: 620,
        overflow: 'hidden', background: '#020818',
        fontFamily: "'Inter', system-ui, sans-serif",
      }}
    >
      {/* Videos */}
      {SCENES.map(s => (
        <video
          key={s.key}
          ref={el => { videoRefs.current[s.key] = el }}
          src={VIDEOS[s.key]}
          muted playsInline loop={false} preload="auto"
          style={{
            position: 'absolute', inset: 0, width: '100%', height: '100%',
            objectFit: 'cover',
            opacity: s.key === scene.key ? 1 : 0,
            transition: 'opacity 1.4s ease',
          }}
        />
      ))}

      {/* Overlays */}
      <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to right,rgba(2,8,24,0.65) 0%,rgba(2,8,24,0.25) 55%,rgba(2,8,24,0.05) 100%)' }} />
      <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top,rgba(2,8,24,0.9) 0%,transparent 50%)' }} />
      <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom,rgba(2,8,24,0.5) 0%,transparent 20%)' }} />
      {scene.redTint && <div style={{ position: 'absolute', inset: 0, background: 'rgba(55,5,5,0.22)', transition: 'opacity 1.2s' }} />}

      {/* Wordmark */}
      <div style={{ position: 'absolute', top: 28, left: 32, fontFamily: "'Barlow Condensed',sans-serif", fontWeight: 900, fontSize: 18, letterSpacing: '0.07em', color: 'rgba(255,255,255,0.92)', fontStyle: 'italic', opacity: textVisible ? 1 : 0, transition: 'opacity 0.8s' }}>
        TWINSPIRE
      </div>

      {/* Day counter */}
      {day !== null && (
        <div style={{ position: 'absolute', top: 64, right: 32, textAlign: 'right', opacity: textVisible ? 1 : 0, transition: 'opacity 0.8s' }}>
          <div style={{ fontFamily: "'Barlow Condensed',sans-serif", fontSize: 56, fontWeight: 900, color: '#fff', lineHeight: 1 }}>Day {day}</div>
          <div style={{ fontSize: 10, color: 'rgba(122,142,192,0.7)', letterSpacing: '0.12em', textTransform: 'uppercase', marginTop: 3 }}>Rehabilitation</div>
        </div>
      )}

      {/* ── Hero text — upper portion ── */}
      <div
        style={{
          position: 'absolute', top: 0, left: 0, right: 0,
          height: '55%',
          display: 'flex', flexDirection: 'column',
          alignItems: 'center', justifyContent: 'center',
          padding: '0 24px',
          opacity: textVisible ? 1 : 0, transition: 'opacity 0.9s',
          pointerEvents: 'none',
        }}
      >
        <p style={{ fontSize: 11, color: 'rgba(0,168,255,0.82)', letterSpacing: '0.16em', textTransform: 'uppercase', marginBottom: 14 }}>{scene.eyebrow}</p>
        <h1
          style={{
            fontFamily: "'Barlow Condensed',sans-serif",
            fontSize: 'clamp(48px,6.5vw,82px)',
            fontWeight: 900, lineHeight: 1, letterSpacing: '-0.02em',
            color: '#fff', textAlign: 'center', margin: '0 0 14px',
          }}
        >
          {scene.headline[0]}<br />
          <span style={{ color: scene.key === 'rehab' ? '#00A8FF' : '#fff' }}>{scene.headline[1]}</span>
        </h1>
        {scene.sub && (
          <p style={{ fontSize: 14, color: 'rgba(170,190,230,0.68)', maxWidth: 480, textAlign: 'center', lineHeight: 1.65, fontStyle: 'italic', margin: 0 }}>
            {scene.sub}
          </p>
        )}
      </div>

      {/* ── Alert card — above metrics row ── */}
      <div
        style={{
          position: 'absolute',
          bottom: 130, left: '50%',
          background: 'rgba(2,6,32,0.94)',
          border: '1.5px solid rgba(239,68,68,0.7)',
          borderRadius: 14, padding: '14px 18px',
          width: 'min(480px, calc(100% - 48px))',
          backdropFilter: 'blur(10px)', WebkitBackdropFilter: 'blur(10px)',
          opacity: alertVisible ? 1 : 0,
          transform: alertVisible ? 'translateX(-50%) translateY(0) scale(1)' : 'translateX(-50%) translateY(8px) scale(0.96)',
          transition: 'opacity 0.45s, transform 0.45s',
          pointerEvents: 'none',
          display: 'flex', alignItems: 'flex-start', gap: 10,
        }}
      >
        <div style={{ width: 28, height: 28, borderRadius: '50%', background: 'rgba(239,68,68,0.12)', border: '1px solid rgba(239,68,68,0.4)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, marginTop: 1 }}>
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#EF4444" strokeWidth="2.5">
            <path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z"/>
            <line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/>
          </svg>
        </div>
        <div>
          <div style={{ fontSize: 11, fontWeight: 600, color: '#EF4444', letterSpacing: '0.05em', marginBottom: 4 }}>Individual Threshold Exceeded</div>
          <p style={{ fontSize: 11, color: 'rgba(200,210,235,0.82)', lineHeight: 1.55, margin: 0 }}>{scene.alertText}</p>
        </div>
      </div>

      {/* ── Metrics row — horizontal, pinned to bottom ── */}
      <div
        style={{
          position: 'absolute',
          bottom: 44,
          left: 24, right: 24,
          display: 'flex', gap: 10,
          opacity: textVisible ? 1 : 0, transition: 'opacity 0.9s',
        }}
      >
        <MetricCard
          label="ACWR"
          sublabel="Acute : Chronic Workload Ratio"
          value={acwrNow.toFixed(2)}
          status={acwrStatus}
          colorClass={acwrCls}
          chartSvg={acwrSvg}
        />
        <MetricCard
          label="Recovery Score"
          sublabel={`vs personal baseline  ╌╌  ${REC_BASE}`}
          value={String(Math.round(recNow))}
          status={recStatus}
          colorClass={recCls}
          chartSvg={recSvg}
        />
        <MetricCard
          label="Morning HRV"
          sublabel={`personal wearable  ╌╌  ${HRV_BASE}ms`}
          value={`${Math.round(hrvNow)}ms`}
          status={hrvStatus}
          colorClass={hrvCls}
          chartSvg={hrvSvg}
        />
      </div>

      {/* Scene dots */}
      <div style={{ position: 'absolute', bottom: 20, left: '50%', transform: 'translateX(-50%)', display: 'flex', gap: 8, alignItems: 'center' }}>
        {SCENES.map((s, i) => (
          <button
            key={s.key}
            onClick={() => handleDot(i)}
            aria-label={s.eyebrow}
            style={{ height: 6, borderRadius: 3, border: 'none', cursor: 'pointer', padding: 0, width: i === sceneIdx ? 22 : 6, background: i === sceneIdx ? '#00A8FF' : 'rgba(255,255,255,0.22)', transition: 'width 0.3s, background 0.3s' }}
          />
        ))}
      </div>

      {/* Progress bar */}
      <div style={{ position: 'absolute', bottom: 0, left: 0, height: 2, background: '#00A8FF', width: `${frac * 100}%`, transition: 'width 0.1s linear' }} />
    </section>
  )
}
