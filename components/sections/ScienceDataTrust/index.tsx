'use client'

import React from 'react'
import { Typography } from '@/components/ui/typography'
import { AnimateIn } from '@/components/ui/animate-in'
import { useTranslation } from '@/i18n'
import { cn } from '@/lib/utils'

/* ────────────────────────────────────────────────────────────────────────────
 * Pillar icons — used both as small badge icons and as large card icons.
 * Accept className so they can scale to any container size.
 * ──────────────────────────────────────────────────────────────────────────── */

function ModelingIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={cn('h-7 w-7', className)}
      aria-hidden="true"
    >
      <circle cx="8" cy="10" r="2.5" stroke="currentColor" strokeWidth="1.5" />
      <circle cx="8" cy="22" r="2.5" stroke="currentColor" strokeWidth="1.5" />
      <circle cx="16" cy="8" r="2.5" stroke="currentColor" strokeWidth="1.5" />
      <circle cx="16" cy="16" r="2.5" stroke="currentColor" strokeWidth="1.5" />
      <circle cx="16" cy="24" r="2.5" stroke="currentColor" strokeWidth="1.5" />
      <circle cx="24" cy="12" r="2.5" stroke="currentColor" strokeWidth="1.5" />
      <circle cx="24" cy="20" r="2.5" stroke="currentColor" strokeWidth="1.5" />
      <line
        x1="10.5"
        y1="10"
        x2="13.5"
        y2="8"
        stroke="currentColor"
        strokeWidth="1"
        opacity="0.5"
      />
      <line
        x1="10.5"
        y1="10"
        x2="13.5"
        y2="16"
        stroke="currentColor"
        strokeWidth="1"
        opacity="0.5"
      />
      <line
        x1="10.5"
        y1="22"
        x2="13.5"
        y2="16"
        stroke="currentColor"
        strokeWidth="1"
        opacity="0.5"
      />
      <line
        x1="10.5"
        y1="22"
        x2="13.5"
        y2="24"
        stroke="currentColor"
        strokeWidth="1"
        opacity="0.5"
      />
      <line
        x1="18.5"
        y1="8"
        x2="21.5"
        y2="12"
        stroke="currentColor"
        strokeWidth="1"
        opacity="0.5"
      />
      <line
        x1="18.5"
        y1="16"
        x2="21.5"
        y2="12"
        stroke="currentColor"
        strokeWidth="1"
        opacity="0.5"
      />
      <line
        x1="18.5"
        y1="16"
        x2="21.5"
        y2="20"
        stroke="currentColor"
        strokeWidth="1"
        opacity="0.5"
      />
      <line
        x1="18.5"
        y1="24"
        x2="21.5"
        y2="20"
        stroke="currentColor"
        strokeWidth="1"
        opacity="0.5"
      />
    </svg>
  )
}

function SignalsIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={cn('h-7 w-7', className)}
      aria-hidden="true"
    >
      <polyline
        points="4,20 8,20 10,12 14,24 18,8 22,22 24,16 28,16"
        stroke="currentColor"
        strokeWidth="1.5"
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <line
        x1="4"
        y1="26"
        x2="28"
        y2="26"
        stroke="currentColor"
        strokeWidth="1"
        opacity="0.3"
      />
      <line
        x1="4"
        y1="6"
        x2="28"
        y2="6"
        stroke="currentColor"
        strokeWidth="1"
        opacity="0.3"
      />
    </svg>
  )
}

function ValidationIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={cn('h-7 w-7', className)}
      aria-hidden="true"
    >
      <path
        d="M16 3L5 8v7c0 7.18 4.7 13.89 11 16 6.3-2.11 11-8.82 11-16V8L16 3z"
        stroke="currentColor"
        strokeWidth="1.5"
        fill="none"
        strokeLinejoin="round"
      />
      <polyline
        points="11,16 14.5,19.5 21,13"
        stroke="currentColor"
        strokeWidth="1.8"
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

/* ────────────────────────────────────────────────────────────────────────────
 * SVG diagram illustrations for each step
 * ──────────────────────────────────────────────────────────────────────────── */

/**
 * Modeling diagram — four signal-type input nodes (EMG waveform, GPS track,
 * clinical bar chart, 18-month timeline) feeding into a neural-network
 * adaptive model at the centre.
 */
function ModelingDiagram() {
  return (
    <div className="border-border w-full overflow-hidden rounded-2xl border bg-transparent p-4">
      <img
        src="/science/1.png"
        alt="Modeling illustration"
        className="w-full rounded-xl object-contain"
      />
      {/* Original SVG retained as hidden fallback */}
      <svg
        viewBox="0 0 540 280"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="hidden"
        aria-hidden="true"
      >
        {/* Connection lines */}
        <path
          d="M125,48 C190,48 226,112 222,140"
          stroke="#c4c3d8"
          strokeWidth="1.2"
        />
        <path
          d="M415,48 C350,48 314,112 318,140"
          stroke="#0802A3"
          strokeWidth="1.6"
        />
        <path
          d="M125,232 C190,232 226,168 222,140"
          stroke="#c4c3d8"
          strokeWidth="1.2"
        />
        <path
          d="M415,232 C350,232 314,168 318,140"
          stroke="#0802A3"
          strokeWidth="1.6"
        />

        {/* TL node: EMG Signal */}
        <rect
          x="5"
          y="22"
          width="120"
          height="52"
          rx="6"
          fill="white"
          stroke="#e0e0ea"
          strokeWidth="1"
        />
        <polyline
          points="12,48 20,48 25,37 31,59 36,35 43,59 48,48 80,48"
          stroke="#0802A3"
          strokeWidth="1.5"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <text
          x="90"
          y="43"
          fill="#1a1a2e"
          fontSize="7"
          fontFamily="sans-serif"
          fontWeight="600"
        >
          EMG
        </text>
        <text x="90" y="55" fill="#777" fontSize="6" fontFamily="sans-serif">
          Muscle Signal
        </text>

        {/* TR node: GPS Movement */}
        <rect
          x="415"
          y="22"
          width="120"
          height="52"
          rx="6"
          fill="white"
          stroke="#e0e0ea"
          strokeWidth="1"
        />
        <polyline
          points="422,48 430,48 435,37 441,59 446,35 453,59 458,48 520,48"
          stroke="#0802A3"
          strokeWidth="1.5"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <text
          x="498"
          y="43"
          fill="#1a1a2e"
          fontSize="7"
          fontFamily="sans-serif"
          fontWeight="600"
        >
          GPS
        </text>
        <text x="498" y="55" fill="#777" fontSize="6" fontFamily="sans-serif">
          Movement
        </text>

        {/* BL node: Clinical Assessment */}
        <rect
          x="5"
          y="206"
          width="120"
          height="52"
          rx="6"
          fill="white"
          stroke="#e0e0ea"
          strokeWidth="1"
        />
        <rect
          x="14"
          y="238"
          width="9"
          height="8"
          rx="1"
          fill="#0802A3"
          opacity="0.25"
        />
        <rect
          x="27"
          y="232"
          width="9"
          height="14"
          rx="1"
          fill="#0802A3"
          opacity="0.55"
        />
        <rect x="40" y="226" width="9" height="20" rx="1" fill="#0802A3" />
        <rect
          x="53"
          y="230"
          width="9"
          height="16"
          rx="1"
          fill="#0802A3"
          opacity="0.65"
        />
        <rect
          x="66"
          y="236"
          width="9"
          height="10"
          rx="1"
          fill="#0802A3"
          opacity="0.35"
        />
        <text
          x="90"
          y="227"
          fill="#1a1a2e"
          fontSize="7"
          fontFamily="sans-serif"
          fontWeight="600"
        >
          Clinical
        </text>
        <text x="90" y="239" fill="#777" fontSize="6" fontFamily="sans-serif">
          Assessment
        </text>

        {/* BR node: 18-Month Dataset */}
        <rect
          x="415"
          y="206"
          width="120"
          height="52"
          rx="6"
          fill="white"
          stroke="#e0e0ea"
          strokeWidth="1"
        />
        <line
          x1="422"
          y1="232"
          x2="522"
          y2="232"
          stroke="#e0e0ea"
          strokeWidth="1"
        />
        <line
          x1="422"
          y1="227"
          x2="422"
          y2="237"
          stroke="#c4c3d8"
          strokeWidth="1"
        />
        <line
          x1="522"
          y1="227"
          x2="522"
          y2="237"
          stroke="#c4c3d8"
          strokeWidth="1"
        />
        <circle cx="422" cy="232" r="3.5" fill="#0802A3" />
        <circle cx="442" cy="232" r="3.5" fill="#0802A3" />
        <circle cx="462" cy="232" r="3.5" fill="#0802A3" />
        <circle cx="482" cy="232" r="3" fill="#0802A3" opacity="0.7" />
        <circle cx="502" cy="232" r="2.5" fill="#0802A3" opacity="0.45" />
        <circle cx="522" cy="232" r="2" fill="#0802A3" opacity="0.25" />
        <text
          x="472"
          y="220"
          textAnchor="middle"
          fill="#1a1a2e"
          fontSize="7"
          fontFamily="sans-serif"
          fontWeight="600"
        >
          18 Months
        </text>
        <text
          x="472"
          y="252"
          textAnchor="middle"
          fill="#777"
          fontSize="6"
          fontFamily="sans-serif"
        >
          Real-World Data
        </text>

        {/* Centre: Adaptive Neural Model */}
        <circle cx="270" cy="140" r="48" fill="#0f0f12" />
        <circle cx="250" cy="118" r="2.5" fill="white" opacity="0.55" />
        <circle cx="250" cy="130" r="2.5" fill="white" opacity="0.55" />
        <circle cx="250" cy="142" r="2.5" fill="white" opacity="0.55" />
        <circle cx="250" cy="154" r="2.5" fill="white" opacity="0.4" />
        <circle cx="268" cy="124" r="2.5" fill="white" opacity="0.8" />
        <circle cx="268" cy="138" r="2.5" fill="white" opacity="0.8" />
        <circle cx="268" cy="152" r="2.5" fill="white" opacity="0.7" />
        <circle cx="287" cy="131" r="3" fill="white" />
        <circle cx="287" cy="147" r="3" fill="white" opacity="0.85" />
        {/* L1 → L2 */}
        <line
          x1="253"
          y1="118"
          x2="265"
          y2="124"
          stroke="white"
          strokeWidth="0.6"
          opacity="0.25"
        />
        <line
          x1="253"
          y1="118"
          x2="265"
          y2="138"
          stroke="white"
          strokeWidth="0.6"
          opacity="0.25"
        />
        <line
          x1="253"
          y1="130"
          x2="265"
          y2="124"
          stroke="white"
          strokeWidth="0.6"
          opacity="0.25"
        />
        <line
          x1="253"
          y1="130"
          x2="265"
          y2="138"
          stroke="white"
          strokeWidth="0.6"
          opacity="0.25"
        />
        <line
          x1="253"
          y1="130"
          x2="265"
          y2="152"
          stroke="white"
          strokeWidth="0.6"
          opacity="0.25"
        />
        <line
          x1="253"
          y1="142"
          x2="265"
          y2="138"
          stroke="white"
          strokeWidth="0.6"
          opacity="0.25"
        />
        <line
          x1="253"
          y1="142"
          x2="265"
          y2="152"
          stroke="white"
          strokeWidth="0.6"
          opacity="0.25"
        />
        <line
          x1="253"
          y1="154"
          x2="265"
          y2="152"
          stroke="white"
          strokeWidth="0.6"
          opacity="0.25"
        />
        {/* L2 → L3 */}
        <line
          x1="271"
          y1="124"
          x2="284"
          y2="131"
          stroke="white"
          strokeWidth="0.6"
          opacity="0.25"
        />
        <line
          x1="271"
          y1="124"
          x2="284"
          y2="147"
          stroke="white"
          strokeWidth="0.6"
          opacity="0.25"
        />
        <line
          x1="271"
          y1="138"
          x2="284"
          y2="131"
          stroke="white"
          strokeWidth="0.6"
          opacity="0.25"
        />
        <line
          x1="271"
          y1="138"
          x2="284"
          y2="147"
          stroke="white"
          strokeWidth="0.6"
          opacity="0.25"
        />
        <line
          x1="271"
          y1="152"
          x2="284"
          y2="131"
          stroke="white"
          strokeWidth="0.6"
          opacity="0.25"
        />
        <line
          x1="271"
          y1="152"
          x2="284"
          y2="147"
          stroke="white"
          strokeWidth="0.6"
          opacity="0.25"
        />
      </svg>
    </div>
  )
}

/**
 * Signals diagram — multiple waveform streams converging into a correlation matrix,
 * representing cross-signal analysis across partner data streams.
 */
function SignalsDiagram() {
  return (
    <div className="border-border w-full overflow-hidden rounded-2xl border bg-transparent p-4">
      <img
        src="/science/2.png"
        alt="Signals illustration"
        className="h-56 w-full rounded-xl object-cover sm:h-64 md:h-72"
      />
      <svg
        viewBox="0 0 540 280"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="hidden"
        aria-hidden="true"
      >
        {/* Signal stream 1 — Performance */}
        <rect
          x="5"
          y="30"
          width="140"
          height="44"
          rx="6"
          fill="white"
          stroke="#e0e0ea"
          strokeWidth="1"
        />
        <polyline
          points="14,52 26,42 38,56 50,44 62,50 74,40 86,54 98,46"
          stroke="#0802A3"
          strokeWidth="1.5"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <text
          x="108"
          y="49"
          fill="#1a1a2e"
          fontSize="6.5"
          fontFamily="sans-serif"
          fontWeight="600"
        >
          Performance
        </text>
        <text x="108" y="59" fill="#777" fontSize="5.5" fontFamily="sans-serif">
          Monitoring
        </text>

        {/* Signal stream 2 — Rehab */}
        <rect
          x="5"
          y="118"
          width="140"
          height="44"
          rx="6"
          fill="white"
          stroke="#e0e0ea"
          strokeWidth="1"
        />
        <polyline
          points="14,140 30,130 46,148 62,132 78,144 94,136"
          stroke="#0802A3"
          strokeWidth="1.5"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
          opacity="0.7"
        />
        <text
          x="108"
          y="137"
          fill="#1a1a2e"
          fontSize="6.5"
          fontFamily="sans-serif"
          fontWeight="600"
        >
          Rehab
        </text>
        <text
          x="108"
          y="147"
          fill="#777"
          fontSize="5.5"
          fontFamily="sans-serif"
        >
          Environment
        </text>

        {/* Signal stream 3 — Neuromuscular */}
        <rect
          x="5"
          y="206"
          width="140"
          height="44"
          rx="6"
          fill="white"
          stroke="#e0e0ea"
          strokeWidth="1"
        />
        <polyline
          points="14,228 22,228 26,218 32,238 36,216 42,238 46,228 60,228"
          stroke="#0802A3"
          strokeWidth="1.5"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
          opacity="0.5"
        />
        <text
          x="108"
          y="225"
          fill="#1a1a2e"
          fontSize="6.5"
          fontFamily="sans-serif"
          fontWeight="600"
        >
          Neuro
        </text>
        <text
          x="108"
          y="235"
          fill="#777"
          fontSize="5.5"
          fontFamily="sans-serif"
        >
          Muscular
        </text>

        {/* Connection lines to centre */}
        <path
          d="M145,52 C200,52 240,110 255,130"
          stroke="#c4c3d8"
          strokeWidth="1.2"
        />
        <path
          d="M145,140 C200,140 240,140 255,140"
          stroke="#0802A3"
          strokeWidth="1.6"
        />
        <path
          d="M145,228 C200,228 240,170 255,150"
          stroke="#c4c3d8"
          strokeWidth="1.2"
        />

        {/* Centre: Correlation matrix */}
        <rect x="250" y="100" width="80" height="80" rx="8" fill="#0f0f12" />
        {/* Grid cells */}
        <rect
          x="260"
          y="110"
          width="14"
          height="14"
          rx="2"
          fill="white"
          opacity="0.9"
        />
        <rect
          x="278"
          y="110"
          width="14"
          height="14"
          rx="2"
          fill="white"
          opacity="0.4"
        />
        <rect
          x="296"
          y="110"
          width="14"
          height="14"
          rx="2"
          fill="white"
          opacity="0.2"
        />
        <rect
          x="260"
          y="128"
          width="14"
          height="14"
          rx="2"
          fill="white"
          opacity="0.4"
        />
        <rect
          x="278"
          y="128"
          width="14"
          height="14"
          rx="2"
          fill="white"
          opacity="0.85"
        />
        <rect
          x="296"
          y="128"
          width="14"
          height="14"
          rx="2"
          fill="white"
          opacity="0.5"
        />
        <rect
          x="260"
          y="146"
          width="14"
          height="14"
          rx="2"
          fill="white"
          opacity="0.2"
        />
        <rect
          x="278"
          y="146"
          width="14"
          height="14"
          rx="2"
          fill="white"
          opacity="0.5"
        />
        <rect
          x="296"
          y="146"
          width="14"
          height="14"
          rx="2"
          fill="white"
          opacity="0.75"
        />
        <text
          x="290"
          y="176"
          textAnchor="middle"
          fill="white"
          fontSize="5.5"
          fontFamily="sans-serif"
          letterSpacing="0.5"
          opacity="0.6"
        >
          CORRELATION
        </text>

        {/* Output connections */}
        <path
          d="M330,130 C360,120 390,90 420,80"
          stroke="#0802A3"
          strokeWidth="1.4"
        />
        <path
          d="M330,140 C360,140 390,140 420,140"
          stroke="#0802A3"
          strokeWidth="1.6"
        />
        <path
          d="M330,150 C360,160 390,190 420,200"
          stroke="#0802A3"
          strokeWidth="1.4"
        />

        {/* Output nodes */}
        <rect
          x="420"
          y="60"
          width="110"
          height="40"
          rx="6"
          fill="white"
          stroke="#e0e0ea"
          strokeWidth="1"
        />
        <text
          x="475"
          y="77"
          textAnchor="middle"
          fill="#1a1a2e"
          fontSize="6.5"
          fontFamily="sans-serif"
          fontWeight="600"
        >
          Strongest Signals
        </text>
        <text
          x="475"
          y="89"
          textAnchor="middle"
          fill="#777"
          fontSize="5.5"
          fontFamily="sans-serif"
        >
          Identified
        </text>

        <rect
          x="420"
          y="120"
          width="110"
          height="40"
          rx="6"
          fill="white"
          stroke="#e0e0ea"
          strokeWidth="1"
        />
        <text
          x="475"
          y="137"
          textAnchor="middle"
          fill="#1a1a2e"
          fontSize="6.5"
          fontFamily="sans-serif"
          fontWeight="600"
        >
          Explanatory
        </text>
        <text
          x="475"
          y="149"
          textAnchor="middle"
          fill="#777"
          fontSize="5.5"
          fontFamily="sans-serif"
        >
          Power Ranked
        </text>

        <rect
          x="420"
          y="182"
          width="110"
          height="40"
          rx="6"
          fill="white"
          stroke="#e0e0ea"
          strokeWidth="1"
        />
        <text
          x="475"
          y="199"
          textAnchor="middle"
          fill="#1a1a2e"
          fontSize="6.5"
          fontFamily="sans-serif"
          fontWeight="600"
        >
          Research
        </text>
        <text
          x="475"
          y="211"
          textAnchor="middle"
          fill="#777"
          fontSize="5.5"
          fontFamily="sans-serif"
        >
          Collaborations
        </text>
      </svg>
    </div>
  )
}

/**
 * Validation diagram — a phased pipeline showing methodological validation,
 * scientific uncertainty resolution, and deployment readiness.
 */
function ValidationDiagram() {
  return (
    <div className="border-border w-full overflow-hidden rounded-2xl border bg-transparent p-4">
      <img
        src="/science/3.png"
        alt="Validation illustration"
        className="h-56 w-full rounded-xl object-cover sm:h-64 md:h-72"
      />
      <svg
        viewBox="0 0 540 280"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="hidden"
        aria-hidden="true"
      >
        {/* Phase 1: Methodology */}
        <rect
          x="20"
          y="90"
          width="140"
          height="100"
          rx="10"
          fill="white"
          stroke="#e0e0ea"
          strokeWidth="1"
        />
        <circle cx="90" cy="130" r="20" fill="#0f0f12" />
        <polyline
          points="80,130 87,137 100,124"
          stroke="white"
          strokeWidth="2"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <text
          x="90"
          y="168"
          textAnchor="middle"
          fill="#1a1a2e"
          fontSize="7"
          fontFamily="sans-serif"
          fontWeight="600"
        >
          Methodology
        </text>
        <text
          x="90"
          y="179"
          textAnchor="middle"
          fill="#777"
          fontSize="5.5"
          fontFamily="sans-serif"
        >
          Validation
        </text>

        {/* Arrow 1→2 */}
        <line
          x1="164"
          y1="140"
          x2="196"
          y2="140"
          stroke="#0802A3"
          strokeWidth="1.5"
        />
        <polygon points="196,136 204,140 196,144" fill="#0802A3" />

        {/* Phase 2: Uncertainty */}
        <rect
          x="200"
          y="90"
          width="140"
          height="100"
          rx="10"
          fill="white"
          stroke="#e0e0ea"
          strokeWidth="1"
        />
        <circle cx="270" cy="130" r="20" fill="#0f0f12" />
        {/* Magnifying glass */}
        <circle
          cx="266"
          cy="127"
          r="8"
          stroke="white"
          strokeWidth="1.5"
          fill="none"
        />
        <line
          x1="272"
          y1="133"
          x2="278"
          y2="139"
          stroke="white"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
        <text
          x="270"
          y="168"
          textAnchor="middle"
          fill="#1a1a2e"
          fontSize="7"
          fontFamily="sans-serif"
          fontWeight="600"
        >
          Uncertainty
        </text>
        <text
          x="270"
          y="179"
          textAnchor="middle"
          fill="#777"
          fontSize="5.5"
          fontFamily="sans-serif"
        >
          Resolution
        </text>

        {/* Arrow 2→3 */}
        <line
          x1="344"
          y1="140"
          x2="376"
          y2="140"
          stroke="#0802A3"
          strokeWidth="1.5"
        />
        <polygon points="376,136 384,140 376,144" fill="#0802A3" />

        {/* Phase 3: Deployment */}
        <rect
          x="380"
          y="90"
          width="140"
          height="100"
          rx="10"
          fill="white"
          stroke="#e0e0ea"
          strokeWidth="1"
        />
        <circle cx="450" cy="130" r="20" fill="#0f0f12" />
        {/* Shield icon */}
        <path
          d="M450,115 L440,120 L440,128 C440,134 444,139 450,141 C456,139 460,134 460,128 L460,120 Z"
          stroke="white"
          strokeWidth="1.5"
          fill="none"
          strokeLinejoin="round"
        />
        <text
          x="450"
          y="168"
          textAnchor="middle"
          fill="#1a1a2e"
          fontSize="7"
          fontFamily="sans-serif"
          fontWeight="600"
        >
          Risk Reduction
        </text>
        <text
          x="450"
          y="179"
          textAnchor="middle"
          fill="#777"
          fontSize="5.5"
          fontFamily="sans-serif"
        >
          & Deployment
        </text>

        {/* Progress bar */}
        <rect x="60" y="220" width="420" height="6" rx="3" fill="#e0e0ea" />
        <rect x="60" y="220" width="160" height="6" rx="3" fill="#0802A3" />
        <circle
          cx="220"
          cy="223"
          r="5"
          fill="#0802A3"
          stroke="white"
          strokeWidth="2"
        />
        <text
          x="270"
          y="246"
          textAnchor="middle"
          fill="#777"
          fontSize="6"
          fontFamily="sans-serif"
        >
          Current Phase
        </text>

        {/* Phase labels along progress bar */}
        <text
          x="60"
          y="258"
          fill="#1a1a2e"
          fontSize="5.5"
          fontFamily="sans-serif"
          fontWeight="600"
        >
          Research
        </text>
        <text
          x="250"
          y="258"
          textAnchor="middle"
          fill="#1a1a2e"
          fontSize="5.5"
          fontFamily="sans-serif"
          fontWeight="600"
        >
          Validation
        </text>
        <text
          x="460"
          y="258"
          textAnchor="middle"
          fill="#999"
          fontSize="5.5"
          fontFamily="sans-serif"
        >
          Applied Deployment
        </text>
      </svg>
    </div>
  )
}

/* ────────────────────────────────────────────────────────────────────────────
 * Down-arrow connector between steps
 * ──────────────────────────────────────────────────────────────────────────── */

function StepConnector() {
  return (
    <div className="flex justify-center py-6 sm:py-8" aria-hidden="true">
      <svg
        width="18"
        height="24"
        viewBox="0 0 18 24"
        fill="none"
        className="text-primary"
      >
        <path
          d="M9 2v18M4 16l5 5 5-5"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </div>
  )
}

/* ────────────────────────────────────────────────────────────────────────────
 * Checkmark bullet
 * ──────────────────────────────────────────────────────────────────────────── */

function CheckBullet({ text }: { text: string }) {
  return (
    <li className="text-foreground/60 flex items-center gap-2.5 text-[13px] sm:text-[14px]">
      <svg
        className="text-primary/60 h-4 w-4 shrink-0"
        viewBox="0 0 16 16"
        fill="none"
        aria-hidden="true"
      >
        <path
          d="M4 8l3 3 5-5"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
      {text}
    </li>
  )
}

/* ────────────────────────────────────────────────────────────────────────────
 * Step block — alternating text / illustration layout
 * ──────────────────────────────────────────────────────────────────────────── */

interface StepBlockProps {
  number: string
  badgeIcon: React.ReactNode
  diagram: React.ReactNode
  title: string
  body: string
  bullets: string[]
  reverse?: boolean
  delay?: number
}

function StepBlock({
  number,
  badgeIcon,
  diagram,
  title,
  body,
  bullets,
  reverse,
  delay = 0,
}: StepBlockProps) {
  return (
    <div
      className={cn(
        'flex flex-col gap-8 md:flex-row md:items-stretch md:gap-12 lg:gap-20',
        reverse && 'md:flex-row-reverse'
      )}
    >
      {/* ── Text side ── */}
      <div className="flex min-w-0 flex-1 flex-col justify-center gap-4">
        {/* Large step number */}
        <span className="text-primary/15 text-[52px] leading-none font-bold sm:text-[60px] lg:text-[72px]">
          {number}
        </span>

        {/* Title without badge icon */}
        <div className="flex items-center gap-3">
          <Typography
            variant="heading"
            as="h3"
            textColor="default"
            className="text-[18px] sm:text-[20px]"
          >
            {title}
          </Typography>
        </div>

        {/* Description */}
        <Typography
          variant="paragraph"
          textColor="default"
          className="text-justify"
        >
          {body}
        </Typography>

        {/* Bullet points */}
        <ul className="mt-1 flex flex-col gap-2">
          {bullets.map((b) => (
            <CheckBullet key={b} text={b} />
          ))}
        </ul>
      </div>

      {/* ── Diagram side (no hover scale) ── */}
      <div className="flex min-w-0 flex-1 items-center overflow-hidden">
        {diagram}
      </div>
    </div>
  )
}

/**
 * ScienceDataTrustSection — Alternating step layout (inspired by "How it works" pattern)
 * with numbered pillar blocks, illustration cards with decorative blobs,
 * down-arrow connectors, research questions panel, and data trust block.
 */
export function ScienceDataTrustSection() {
  const { t } = useTranslation()

  const steps: Omit<StepBlockProps, 'delay'>[] = [
    {
      number: '01',
      badgeIcon: <ModelingIcon className="h-5 w-5" />,
      diagram: <ModelingDiagram />,
      title: t('product.science.pillars.modeling.title'),
      body: 'Most systems describe load. Twinspire is being developed to model individual response. The research draws on adaptive systems and individualized state estimation to understand how each athlete responds over time.',
      bullets: [],
      reverse: false,
    },
    {
      number: '02',
      badgeIcon: <SignalsIcon className="h-5 w-5" />,
      diagram: <SignalsDiagram />,
      title: t('product.science.pillars.signals.title'),
      body: 'The goal is to establish a personalized reference state and detect meaningful deviations from it. The methodology investigates how multimodal data can be used to model evolving physiological and neuromuscular dynamics.',
      bullets: [],
      reverse: true,
    },
    {
      number: '03',
      badgeIcon: <ValidationIcon className="h-5 w-5" />,
      diagram: <ValidationDiagram />,
      title: t('product.science.pillars.validation.title'),
      body: 'The current phase focuses on validating the approach and resolving key uncertainties before broader deployment.',
      bullets: [],
      reverse: false,
    },
  ]

  const questions = [
    'How early can deviations from baseline be detected?',
    'What data is required to establish a reliable individualized model?',
    'How do missing data and changing contexts affect robustness?',
    'Can compensation patterns be identified before symptoms emerge?',
  ]

  return (
    <section
      id="science"
      aria-label="Science and data trust"
      className="bg-background relative z-10 w-full"
    >
      <div className="section-x section-y section-inner mx-auto flex flex-col">
        {/* ── Section header ── */}
        <div className="flex flex-col gap-4 pt-16 sm:pt-20 md:pt-24">
          <h2 className="mb-4 text-center text-[22px] leading-[1.2] tracking-wide uppercase sm:text-[26px] lg:mb-6 lg:text-[32px]">
            <span className="text-foreground font-bold">
              {t('product.science.heading')}
            </span>{' '}
            <span className="text-primary font-bold">
              {t('product.science.headingAccent')}
            </span>
          </h2>
        </div>

        {/* ── Alternating step blocks ── */}
        <div className="flex flex-col pt-12 pb-0 sm:pt-16 md:pt-20">
          {steps.map((step) => (
            <div key={step.number} className="mb-10 lg:mb-12">
              <StepBlock {...step} delay={0.05} />
            </div>
          ))}
        </div>

        {/* ── Research questions ── */}
        <AnimateIn variant="fadeUp" delay={0.15}>
          <div className="border-border bg-muted/40 mb-12 flex flex-col gap-6 rounded-2xl border p-6 sm:mb-16 sm:p-8 md:p-10">
            <Typography variant="heading" as="h3" textColor="default">
              {t('product.science.researchTitle')}
            </Typography>
            <ol className="flex flex-col gap-4">
              {questions.map((question, index) => (
                <li key={index} className="flex gap-4">
                  <span className="text-primary mt-0.5 text-[14px] leading-[1.8] font-bold tabular-nums sm:text-[15px]">
                    {String(index + 1).padStart(2, '0')}
                  </span>
                  <Typography variant="paragraph" textColor="default">
                    {question}
                  </Typography>
                </li>
              ))}
            </ol>
          </div>
        </AnimateIn>
      </div>
    </section>
  )
}
