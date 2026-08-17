/* eslint-disable */
'use client'

import { useEffect, useRef, useState, useCallback } from 'react'

const VIDEO_SRC = '/hero/isolation.mp4'

type SceneKey = 'setup' | 'payoff'

interface Scene {
  key:      SceneKey
  duration: number
  eyebrow:  string
  headline: [string, string]
  sub?:     string
}

const SCENES: Scene[] = [
  {
    key: 'setup', duration: 8000,
    eyebrow: 'The gap',
    headline: ['Many streams.', 'None connected.'],
    sub: 'Your club captures training load. Your players measure sleep and recovery at home. Two separate worlds that have never been properly connected.',
  },
  {
    key: 'payoff', duration: 10000,
    eyebrow: 'The connection',
    headline: ['Club data · Personal data.', 'One individual model.'],
    sub: 'Twinspire combines both into one individual model per player and alerts you before a deviation becomes an injury.',
  },
]

function easeInOut(x: number) {
  return x < 0.5 ? 2 * x * x : 1 - Math.pow(-2 * x + 2, 2) / 2
}
function clamp(v: number, lo: number, hi: number) {
  return Math.max(lo, Math.min(hi, v))
}

export function HeroStorySection() {
  const [sceneIdx, setSceneIdx] = useState(0)

  const videoRef     = useRef<HTMLVideoElement>(null)
  const textWrapRef  = useRef<HTMLDivElement>(null)
  const eyebrowRef   = useRef<HTMLParagraphElement>(null)
  const headlineRef  = useRef<HTMLHeadingElement>(null)
  const subRef       = useRef<HTMLParagraphElement>(null)
  const progressRef  = useRef<HTMLDivElement>(null)
  const dotsRef      = useRef<HTMLDivElement>(null)

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

    // Video loops freely — never reset currentTime, text cycles independently
    if (videoRef.current) {
      videoRef.current.play().catch(() => {})
    }

    // Text fade
    if (textWrapRef.current) textWrapRef.current.style.opacity = '0'
    timersRef.current.push(setTimeout(() => {
      if (eyebrowRef.current)  eyebrowRef.current.textContent  = sd.eyebrow
      if (headlineRef.current) headlineRef.current.innerHTML   =
        `${sd.headline[0]}<br/><span style="color:${idx === 1 ? '#00A8FF' : '#fff'}">${sd.headline[1]}</span>`
      if (subRef.current)      subRef.current.textContent      = sd.sub ?? ''
      if (textWrapRef.current) textWrapRef.current.style.opacity = '1'
    }, 600))

    // Dots
    if (dotsRef.current) {
      Array.from(dotsRef.current.children).forEach((dot, i) => {
        const el = dot as HTMLElement
        el.style.width      = i === idx ? '22px' : '6px'
        el.style.background = i === idx ? '#00A8FF' : 'rgba(255,255,255,0.22)'
      })
    }

    // Next scene
    timersRef.current.push(setTimeout(() => startScene((idx + 1) % SCENES.length), sd.duration))

    // Progress bar
    const tick = (now: number) => {
      const rawF = clamp((now - startRef.current) / sd.duration, 0, 1)
      if (progressRef.current) progressRef.current.style.width = `${rawF * 100}%`
      if (rawF < 1) rafRef.current = requestAnimationFrame(tick)
    }
    rafRef.current = requestAnimationFrame(tick)
  }, [])

  useEffect(() => { startScene(0); return clearTimers }, [])

  const handleDot = (idx: number) => startScene(idx)

  return (
    <section style={{
      position: 'relative', width: '100%', height: '100svh', minHeight: 620,
      overflow: 'hidden', background: '#080C18',
      fontFamily: "'Inter', system-ui, sans-serif",
    }}>

      {/* Single looping video */}
      <video
        ref={videoRef}
        src={VIDEO_SRC}
        muted playsInline loop preload="auto"
        style={{
          position: 'absolute', inset: 0, width: '100%', height: '100%',
          objectFit: 'cover', opacity: 1,
        }}
      />

      {/* Overlays */}
      <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to right,rgba(8,12,24,0.72) 0%,rgba(8,12,24,0.28) 60%,rgba(8,12,24,0.05) 100%)' }} />
      <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top,rgba(8,12,24,0.95) 0%,transparent 55%)' }} />
      <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom,rgba(8,12,24,0.45) 0%,transparent 18%)' }} />

      {/* Hero text — centred, held */}
      <div
        ref={textWrapRef}
        style={{
          position: 'absolute', inset: 0,
          display: 'flex', flexDirection: 'column',
          alignItems: 'center', justifyContent: 'center',
          padding: '0 24px',
          opacity: 0, transition: 'opacity 0.9s',
          pointerEvents: 'none',
        }}
      >
        <p ref={eyebrowRef} style={{
          fontSize: 11, color: 'rgba(0,168,255,0.82)',
          letterSpacing: '0.16em', textTransform: 'uppercase',
          marginBottom: 16,
        }} />
        <h1
          ref={headlineRef}
          style={{
            fontFamily: "'Barlow Condensed', sans-serif",
            fontSize: 'clamp(48px,6.5vw,82px)',
            fontWeight: 900, lineHeight: 1.02, letterSpacing: '-0.02em',
            color: '#fff', textAlign: 'center', margin: '0 0 18px',
          }}
        />
        <p ref={subRef} style={{
          fontSize: 15, color: 'rgba(200,215,240,0.72)',
          maxWidth: 520, textAlign: 'center',
          lineHeight: 1.65, margin: 0,
        }} />

        {/* CTAs */}
        <div style={{ display: 'flex', gap: 12, marginTop: 32, pointerEvents: 'all' }}>
          <a
            href="/en/book-demo"
            style={{
              background: '#0802A3', color: '#fff',
              padding: '12px 24px', borderRadius: 6,
              fontSize: 14, fontWeight: 600, textDecoration: 'none',
              transition: 'background 0.15s',
            }}
            onMouseEnter={e => (e.currentTarget.style.background = '#0610c4')}
            onMouseLeave={e => (e.currentTarget.style.background = '#0802A3')}
          >
            Book a Demo
          </a>
          <a
            href="#problem"
            style={{
              background: 'rgba(255,255,255,0.08)', color: 'rgba(255,255,255,0.85)',
              padding: '12px 24px', borderRadius: 6, border: '1px solid rgba(255,255,255,0.18)',
              fontSize: 14, fontWeight: 500, textDecoration: 'none',
              transition: 'background 0.15s',
            }}
            onMouseEnter={e => (e.currentTarget.style.background = 'rgba(255,255,255,0.14)')}
            onMouseLeave={e => (e.currentTarget.style.background = 'rgba(255,255,255,0.08)')}
          >
            See how it works
          </a>
        </div>
      </div>

      {/* Scene dots */}
      <div
        ref={dotsRef}
        style={{
          position: 'absolute', bottom: 22, left: '50%',
          transform: 'translateX(-50%)', display: 'flex', gap: 8,
        }}
      >
        {SCENES.map((s, i) => (
          <button
            key={s.key}
            onClick={() => handleDot(i)}
            aria-label={s.eyebrow}
            style={{
              height: 5, borderRadius: 3, border: 'none', cursor: 'pointer', padding: 0,
              width: i === 0 ? '22px' : '5px',
              background: i === 0 ? '#00A8FF' : 'rgba(255,255,255,0.22)',
              transition: 'width 0.3s, background 0.3s',
            }}
          />
        ))}
      </div>

      {/* Progress bar */}
      <div ref={progressRef} style={{
        position: 'absolute', bottom: 0, left: 0,
        height: 2, background: '#00A8FF', width: '0%',
      }} />
    </section>
  )
}
