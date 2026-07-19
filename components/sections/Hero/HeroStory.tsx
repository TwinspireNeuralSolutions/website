'use client'

import { useEffect, useRef, useState, useCallback } from 'react'

/* ─── Final video URLs ──────────────────────────────────────────────── */
const CDN = 'https://d8j0ntlcm91z4.cloudfront.net/user_3FuRw2hgitt1PGTEcm1XpAIA1JT'
const VIDEOS = {
  treadmill: `${CDN}/hf_20260713_133605_be380863-e7de-41a6-a77d-f4934818ee92.mp4`,
  squat:     `${CDN}/hf_20260702_152554_f426a7c4-1df3-4c1f-9bf8-9f201457dde5.mp4`,
  isolation: `${CDN}/hf_20260702_142311_49500eb0-e48e-43a2-830c-9f5ec613fda7.mp4`,
  rehab:     `${CDN}/hf_20260711_155814_2cbae8f0-3f23-4c38-b1a5-de24f99b1fe1.mp4`,
}

type SceneKey = 'treadmill' | 'squat' | 'isolation' | 'rehab'

/* ─── Chart drawing ─────────────────────────────────────────────────── */
interface ChartConfig {
  values:    number[]   // actual data points (7 values, one per day)
  baseline:  number     // personal baseline — shown as dashed line
  min:       number
  max:       number
  colorFn:   (v: number) => string
  zones?:    { from: number; to: number; fill: string }[]
  dangerAt?: number     // optional second dashed line (ACWR 1.5)
  baselineLabel?: string
}

function buildChart(cfg: ChartConfig, frac: number): string {
  const W = 204, H = 46, pL = 3, pR = 3, pT = 6, pB = 4
  const xRange = W - pL - pR
  const yRange = H - pT - pB
  const n = cfg.values.length

  const toX = (i: number) => pL + (i / (n - 1)) * xRange
  const toY = (v: number) => pT + (cfg.max - v) / (cfg.max - cfg.min) * yRange

  const steps = Math.max(2, Math.min(n, Math.round(frac * (n - 1)) + 2))
  const pts = cfg.values.slice(0, steps)
  const lastV = pts[pts.length - 1]
  const col = cfg.colorFn(lastV)
  const yBase = toY(cfg.baseline)

  let svg = ''

  // Zone bands (ACWR only)
  cfg.zones?.forEach(z => {
    const y1 = toY(Math.min(z.to,  cfg.max))
    const y2 = toY(Math.max(z.from, cfg.min))
    svg += `<rect x="${pL}" y="${y1}" width="${xRange}" height="${y2 - y1}" fill="${z.fill}" rx="1"/>`
  })

  // Deviation fill — shaded area between actual line and baseline
  if (pts.length > 1) {
    let fillPath = `M${toX(0)},${yBase}`
    pts.forEach((v, i) => { fillPath += ` L${toX(i)},${toY(v)}` })
    fillPath += ` L${toX(pts.length - 1)},${yBase} Z`
    svg += `<path d="${fillPath}" fill="${col}" opacity="0.13"/>`
  }

  // Danger threshold dashed line (ACWR 1.5)
  if (cfg.dangerAt !== undefined) {
    const yD = toY(cfg.dangerAt)
    svg += `<line x1="${pL}" y1="${yD}" x2="${W - pR}" y2="${yD}" stroke="rgba(239,68,68,0.5)" stroke-width="0.8" stroke-dasharray="3,3"/>`
    svg += `<text x="${W - pR - 1}" y="${yD - 2}" font-size="5.5" fill="rgba(239,68,68,0.6)" text-anchor="end">${cfg.dangerAt}</text>`
  }

  // Dashed baseline
  svg += `<line x1="${pL}" y1="${yBase}" x2="${W - pR}" y2="${yBase}" stroke="rgba(100,200,255,0.75)" stroke-width="1" stroke-dasharray="5,3"/>`
  if (cfg.baselineLabel) {
    svg += `<text x="${pL + 2}" y="${yBase - 2.5}" font-size="5.5" fill="rgba(100,200,255,0.75)">${cfg.baselineLabel}</text>`
  }

  // Actual data line
  if (pts.length > 1) {
    let d = `M${toX(0)},${toY(pts[0])}`
    pts.forEach((v, i) => { if (i > 0) d += ` L${toX(i)},${toY(v)}` })
    svg += `<path d="${d}" fill="none" stroke="${col}" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/>`
    svg += `<circle cx="${toX(pts.length - 1)}" cy="${toY(lastV)}" r="2.8" fill="${col}"/>`
  }

  return svg
}

/* ─── Colour functions ──────────────────────────────────────────────── */
const acwrColor  = (v: number) => v >= 1.5 ? '#EF4444' : v >= 1.3 ? '#F59E0B' : v < 0.6 ? '#64D2FF' : '#22C55E'
const recColor   = (v: number, base = 74) => (base - v) > 20 ? '#EF4444' : (base - v) > 10 ? '#F59E0B' : '#22C55E'
const hrvColor   = (v: number, base = 65) => (base - v) > 14 ? '#EF4444' : (base - v) > 7 ? '#F59E0B' : v > base ? '#22C55E' : '#00A8FF'

/* ─── Scene definitions ─────────────────────────────────────────────── */
interface Scene {
  key:       SceneKey
  duration:  number
  eyebrow:   string
  headline:  [string, string]
  sub?:      string
  redTint?:  boolean
  showAlert?: boolean
  alertText?: string
  showDays?: boolean
  // Chart data — 7 daily values across the scene duration
  acwr: number[]
  rec:  number[]
  hrv:  number[]
}

const REC_BASELINE = 74
const HRV_BASELINE = 65

const SCENES: Scene[] = [
  {
    key: 'treadmill', duration: 7000,
    eyebrow: 'Club data · Week 3',
    headline: ['Two streams.', 'Neither connected.'],
    sub: 'GPS at the club. Whoop at home. Two separate worlds — neither aware of the other.',
    // Metrics start calm, gently drifting toward warning — deviation just beginning
    acwr: [1.05, 1.11, 1.18, 1.25, 1.32, 1.38, 1.44],
    rec:  [74,   73,   72,   70,   68,   66,   63],
    hrv:  [68,   67,   66,   64,   63,   61,   59],
  },
  {
    key: 'squat', duration: 7000,
    eyebrow: 'Personal data · Week 6',
    headline: ['The signal existed.', 'Nobody saw it.'],
    sub: 'In the Whoop. In the 6am HRV. In the rest-day recovery scores. Unread.',
    // Metrics now deep into warning/danger — gap between actual and baseline growing
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
    // All metrics flatline at critical — maximum deviation
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
    // Metrics rebuild slowly — deviation gap closes toward baseline
    acwr: [0.08, 0.17, 0.27, 0.38, 0.48, 0.57, 0.67],
    rec:  [30,   37,   45,   53,   59,   65,   70],
    hrv:  [44,   47,   51,   55,   59,   62,   65],
  },
]

/* ─── Utility ───────────────────────────────────────────────────────── */
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
}

function MetricCard({ label, sublabel, value, status, colorClass, chartSvg }: MetricCardProps) {
  return (
    <div style={{
      background: 'rgba(2,6,36,0.9)',
      border: `1px solid ${colorClass === 'crit' ? 'rgba(239,68,68,0.6)' : colorClass === 'warn' ? 'rgba(245,158,11,0.55)' : colorClass === 'good' ? 'rgba(34,197,94,0.5)' : 'rgba(0,168,255,0.22)'}`,
      borderRadius: 12,
      padding: '10px 13px',
      width: 228,
      backdropFilter: 'blur(8px)',
      WebkitBackdropFilter: 'blur(8px)',
      transition: 'border-color 0.5s',
    }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 6 }}>
        <div>
          <div style={{ fontSize: 8, letterSpacing: '0.09em', textTransform: 'uppercase', color: 'rgba(122,142,192,0.85)', lineHeight: 1.35 }}>{label}</div>
          <div style={{ fontSize: 6.5, color: 'rgba(122,142,192,0.55)', letterSpacing: '0.06em', marginTop: 1 }}>{sublabel}</div>
        </div>
        <div style={{
          fontFamily: "'Barlow Condensed', sans-serif",
          fontSize: 22, fontWeight: 900, lineHeight: 1,
          color: colorClass === 'crit' ? '#EF4444' : colorClass === 'warn' ? '#F59E0B' : colorClass === 'good' ? '#22C55E' : '#fff',
          transition: 'color 0.5s',
          marginLeft: 8,
          whiteSpace: 'nowrap',
        }}>{value}</div>
      </div>
      <svg
        width="204" height="46"
        style={{ display: 'block', overflow: 'visible' }}
        dangerouslySetInnerHTML={{ __html: chartSvg }}
      />
      <div style={{ fontSize: 8, color: 'rgba(122,142,192,0.65)', marginTop: 5 }}>{status}</div>
    </div>
  )
}

/* ─── Main component ────────────────────────────────────────────────── */
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

    // Video management
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
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => { startScene(0); return clearTimers }, []) // eslint-disable-line react-hooks/exhaustive-deps

  const handleDot = (idx: number) => {
    setSceneIdx(idx)
    startScene(idx)
  }

  // Derive chart data from scene + frac
  const steps = Math.max(2, Math.min(7, Math.round(frac * 6) + 2))
  const acwrPts = scene.acwr.slice(0, steps)
  const recPts  = scene.rec.slice(0, steps)
  const hrvPts  = scene.hrv.slice(0, steps)

  const acwrNow = acwrPts[acwrPts.length - 1]
  const recNow  = recPts[recPts.length - 1]
  const hrvNow  = hrvPts[hrvPts.length - 1]

  const acwrCls = acwrNow >= 1.5 ? 'crit' : acwrNow >= 1.3 ? 'warn' : acwrNow < 0.6 ? 'good' : ''
  const recCls  = (REC_BASELINE - recNow) > 20 ? 'crit' : (REC_BASELINE - recNow) > 10 ? 'warn' : recNow >= REC_BASELINE ? 'good' : ''
  const hrvCls  = (HRV_BASELINE - hrvNow) > 14 ? 'crit' : (HRV_BASELINE - hrvNow) > 7 ? 'warn' : hrvNow > HRV_BASELINE ? 'good' : ''

  const acwrStatus = acwrNow >= 1.5 ? 'High risk zone (>1.5)' : acwrNow >= 1.3 ? 'Caution — above optimal window' : acwrNow < 0.6 ? 'Rebuilding — controlled load' : 'Optimal window (0.8–1.3)'
  const recDelta   = REC_BASELINE - recNow
  const recStatus  = recDelta > 20 ? `↓ ${Math.round(recDelta)} pts below personal baseline` : recDelta > 10 ? `↓ ${Math.round(recDelta)} pts — monitoring` : recNow >= REC_BASELINE ? 'Restored to personal baseline' : 'Approaching baseline'
  const hrvDelta   = HRV_BASELINE - hrvNow
  const hrvStatus  = hrvDelta > 14 ? `↓ ${Math.round(hrvDelta)}ms — significant suppression` : hrvDelta > 7 ? `↓ ${Math.round(hrvDelta)}ms — mild suppression` : hrvNow > HRV_BASELINE ? `↑ ${Math.round(-hrvDelta)}ms above mean` : `↓ ${Math.round(hrvDelta)}ms from personal mean`

  const acwrSvg = buildChart({ values: acwrPts, baseline: 1.0, min: 0.4, max: 2.1, colorFn: acwrColor, dangerAt: 1.5, baselineLabel: '1.0 equilibrium', zones: [{ from: 0.8, to: 1.3, fill: 'rgba(34,197,94,0.07)' }, { from: 1.3, to: 1.5, fill: 'rgba(245,158,11,0.07)' }, { from: 1.5, to: 2.5, fill: 'rgba(239,68,68,0.06)' }] }, frac)
  const recSvg  = buildChart({ values: recPts, baseline: REC_BASELINE, min: 20, max: 90, colorFn: (v) => recColor(v), baselineLabel: `baseline ${REC_BASELINE}` }, frac)
  const hrvSvg  = buildChart({ values: hrvPts, baseline: HRV_BASELINE, min: 36, max: 80, colorFn: (v) => hrvColor(v), baselineLabel: `${HRV_BASELINE}ms mean` }, frac)

  const day = scene.showDays ? Math.round(lerp(1, 28, frac)) : null

  return (
    <section style={{
      position: 'relative', width: '100%', height: '100svh', minHeight: 620,
      overflow: 'hidden', background: '#020818',
      fontFamily: "'Inter', system-ui, sans-serif",
    }}>

      {/* ── Videos ── */}
      {SCENES.map(s => (
        <video key={s.key}
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

      {/* ── Overlays ── */}
      <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to right,rgba(2,8,24,0.8) 0%,rgba(2,8,24,0.35) 52%,rgba(2,8,24,0.08) 100%)' }} />
      <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top,rgba(2,8,24,0.82) 0%,transparent 46%)' }} />
      <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom,rgba(2,8,24,0.55) 0%,transparent 22%)' }} />
      {scene.redTint && <div style={{ position: 'absolute', inset: 0, background: 'rgba(55,5,5,0.22)', transition: 'opacity 1.2s' }} />}

      {/* ── Wordmark ── */}
      <div style={{ position: 'absolute', top: 28, left: 32, fontFamily: "'Barlow Condensed',sans-serif", fontWeight: 900, fontSize: 18, letterSpacing: '0.07em', color: 'rgba(255,255,255,0.92)', fontStyle: 'italic', opacity: textVisible ? 1 : 0, transition: 'opacity 0.8s' }}>
        TWINSPIRE
      </div>

      {/* ── Day counter ── */}
      {day !== null && (
        <div style={{ position: 'absolute', top: 64, right: 32, textAlign: 'right', opacity: textVisible ? 1 : 0, transition: 'opacity 0.8s' }}>
          <div style={{ fontFamily: "'Barlow Condensed',sans-serif", fontSize: 58, fontWeight: 900, color: '#fff', lineHeight: 1 }}>Day {day}</div>
          <div style={{ fontSize: 10, color: 'rgba(122,142,192,0.7)', letterSpacing: '0.12em', textTransform: 'uppercase', marginTop: 3 }}>Rehabilitation</div>
        </div>
      )}

      {/* ── Headline ── */}
      <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', paddingBottom: '11vh', opacity: textVisible ? 1 : 0, transition: 'opacity 0.9s', pointerEvents: 'none' }}>
        <p style={{ fontSize: 11, color: 'rgba(0,168,255,0.82)', letterSpacing: '0.16em', textTransform: 'uppercase', marginBottom: 14 }}>{scene.eyebrow}</p>
        <h1 style={{ fontFamily: "'Barlow Condensed',sans-serif", fontSize: 'clamp(52px,7vw,86px)', fontWeight: 900, lineHeight: 1, letterSpacing: '-0.02em', color: '#fff', textAlign: 'center', margin: '0 0 14px' }}>
          {scene.headline[0]}<br />
          <span style={{ color: scene.key === 'rehab' ? '#00A8FF' : '#fff' }}>{scene.headline[1]}</span>
        </h1>
        {scene.sub && <p style={{ fontSize: 14, color: 'rgba(170,190,230,0.68)', maxWidth: 480, textAlign: 'center', lineHeight: 1.65, fontStyle: 'italic', margin: 0 }}>{scene.sub}</p>}
      </div>

      {/* ── HUD ── */}
      <div style={{ position: 'absolute', bottom: 44, left: 28, display: 'flex', flexDirection: 'column', gap: 7 }}>
        <MetricCard
          label="ACWR" sublabel="Acute : Chronic Workload Ratio"
          value={acwrNow.toFixed(2)} status={acwrStatus} colorClass={acwrCls}
          chartSvg={acwrSvg}
        />
        <MetricCard
          label="Recovery Score" sublabel={`vs personal baseline  — — — —  ${REC_BASELINE}`}
          value={String(Math.round(recNow))} status={recStatus} colorClass={recCls}
          chartSvg={recSvg}
        />
        <MetricCard
          label="Morning HRV" sublabel={`personal wearable  — — — —  ${HRV_BASELINE}ms`}
          value={`${Math.round(hrvNow)}ms`} status={hrvStatus} colorClass={hrvCls}
          chartSvg={hrvSvg}
        />
      </div>

      {/* ── Alert card ── */}
      <div style={{
        position: 'absolute', bottom: 44, right: 28,
        background: 'rgba(2,6,32,0.94)',
        border: '1.5px solid rgba(239,68,68,0.7)',
        borderRadius: 14, padding: '16px 18px', maxWidth: 248,
        backdropFilter: 'blur(10px)', WebkitBackdropFilter: 'blur(10px)',
        opacity: alertVisible ? 1 : 0,
        transform: alertVisible ? 'translateY(0) scale(1)' : 'translateY(10px) scale(0.95)',
        transition: 'opacity 0.45s, transform 0.45s',
        pointerEvents: 'none',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 9, marginBottom: 9 }}>
          <div style={{ width: 30, height: 30, borderRadius: '50%', background: 'rgba(239,68,68,0.12)', border: '1px solid rgba(239,68,68,0.4)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#EF4444" strokeWidth="2.5"><path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>
          </div>
          <span style={{ fontSize: 11, fontWeight: 600, color: '#EF4444', letterSpacing: '0.05em' }}>Individual Threshold Exceeded</span>
        </div>
        <p style={{ fontSize: 11, color: 'rgba(200,210,235,0.82)', lineHeight: 1.55, margin: 0 }}>{scene.alertText}</p>
      </div>

      {/* ── Scene dots ── */}
      <div style={{ position: 'absolute', bottom: 20, left: '50%', transform: 'translateX(-50%)', display: 'flex', gap: 8, alignItems: 'center' }}>
        {SCENES.map((s, i) => (
          <button key={s.key} onClick={() => handleDot(i)} aria-label={s.eyebrow}
            style={{ height: 6, borderRadius: 3, border: 'none', cursor: 'pointer', padding: 0, width: i === sceneIdx ? 22 : 6, background: i === sceneIdx ? '#00A8FF' : 'rgba(255,255,255,0.22)', transition: 'width 0.3s, background 0.3s' }}
          />
        ))}
      </div>

      {/* ── Progress bar ── */}
      <div style={{ position: 'absolute', bottom: 0, left: 0, height: 2, background: '#00A8FF', width: `${frac * 100}%`, transition: 'width 0.1s linear' }} />
    </section>
  )
}
