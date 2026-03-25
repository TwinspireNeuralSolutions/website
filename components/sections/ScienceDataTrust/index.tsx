'use client'

import { Typography } from '@/components/ui/typography'
import { AnimateIn } from '@/components/ui/animate-in'
import { useTranslation } from '@/i18n'

/**
 * Science SVG — four signal-type input nodes (EMG waveform, GPS track,
 * clinical bar chart, 18-month timeline) feeding into a neural-network
 * adaptive model at the centre.
 */
function ScienceDiagram() {
  return (
    <div className="bg-muted border-border w-full overflow-hidden rounded-2xl border p-4">
      <svg
        viewBox="0 0 540 280"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full"
        aria-hidden="true"
      >
        {/* ── Connection lines ── */}
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

        {/* ── TL node: EMG Signal ── */}
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

        {/* ── TR node: GPS Movement ── */}
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
        <path
          d="M422,50 C432,38 442,60 452,44 C462,32 474,56 488,42"
          stroke="#0802A3"
          strokeWidth="1.5"
          fill="none"
          strokeLinecap="round"
        />
        <circle cx="422" cy="50" r="2.5" fill="#0802A3" />
        <circle cx="488" cy="42" r="2.5" fill="#0802A3" />
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

        {/* ── BL node: Clinical Assessment ── */}
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

        {/* ── BR node: 18-Month Dataset ── */}
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

        {/* ── Centre: Adaptive Neural Model ── */}
        <circle cx="270" cy="140" r="48" fill="#0f0f12" />
        {/* Neural net — 3 layers: 4 · 3 · 2 nodes */}
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
 * Trust SVG — three concentric permission rings: Athlete (full control,
 * innermost dark circle) → Club (aggregate view, middle ring) →
 * External (no access, outer dashed ring).
 */
function TrustDiagram() {
  return (
    <div className="bg-muted border-border w-full overflow-hidden rounded-2xl border p-4">
      <svg
        viewBox="0 0 540 280"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full"
        aria-hidden="true"
      >
        {/* ── Outer ring: External — No Access ── */}
        <circle
          cx="270"
          cy="140"
          r="122"
          fill="#f4f4f8"
          stroke="#dddde8"
          strokeWidth="1"
          strokeDasharray="5 4"
        />

        {/* X marks at outer boundary compass points */}
        <line
          x1="264"
          y1="14"
          x2="276"
          y2="26"
          stroke="#c8c8d8"
          strokeWidth="1.4"
          strokeLinecap="round"
        />
        <line
          x1="276"
          y1="14"
          x2="264"
          y2="26"
          stroke="#c8c8d8"
          strokeWidth="1.4"
          strokeLinecap="round"
        />
        <line
          x1="264"
          y1="254"
          x2="276"
          y2="266"
          stroke="#c8c8d8"
          strokeWidth="1.4"
          strokeLinecap="round"
        />
        <line
          x1="276"
          y1="254"
          x2="264"
          y2="266"
          stroke="#c8c8d8"
          strokeWidth="1.4"
          strokeLinecap="round"
        />
        <line
          x1="142"
          y1="134"
          x2="154"
          y2="146"
          stroke="#c8c8d8"
          strokeWidth="1.4"
          strokeLinecap="round"
        />
        <line
          x1="154"
          y1="134"
          x2="142"
          y2="146"
          stroke="#c8c8d8"
          strokeWidth="1.4"
          strokeLinecap="round"
        />
        <line
          x1="386"
          y1="134"
          x2="398"
          y2="146"
          stroke="#c8c8d8"
          strokeWidth="1.4"
          strokeLinecap="round"
        />
        <line
          x1="398"
          y1="134"
          x2="386"
          y2="146"
          stroke="#c8c8d8"
          strokeWidth="1.4"
          strokeLinecap="round"
        />

        {/* External label (top of outer ring) */}
        <text
          x="270"
          y="34"
          textAnchor="middle"
          fill="#b0b0c8"
          fontSize="7"
          fontFamily="sans-serif"
          fontWeight="600"
        >
          External
        </text>
        <text
          x="270"
          y="46"
          textAnchor="middle"
          fill="#c0c0d4"
          fontSize="5.5"
          fontFamily="sans-serif"
        >
          No Access — Never Shared
        </text>

        {/* ── Middle ring: Club — Aggregate View ── */}
        <circle
          cx="270"
          cy="140"
          r="88"
          fill="#eaeaf2"
          stroke="#d4d4e4"
          strokeWidth="1"
        />

        {/* Club label (above inner circle) */}
        <text
          x="270"
          y="75"
          textAnchor="middle"
          fill="#555570"
          fontSize="7"
          fontFamily="sans-serif"
          fontWeight="600"
        >
          Club View
        </text>
        <text
          x="270"
          y="87"
          textAnchor="middle"
          fill="#777790"
          fontSize="5.5"
          fontFamily="sans-serif"
        >
          Aggregate Only — Athlete Permitted
        </text>

        {/* ── Inner circle: Athlete — Full Control ── */}
        <circle cx="270" cy="140" r="52" fill="#0f0f12" />

        {/* Padlock (centred at 270, 128) */}
        <path
          d="M260,124 L260,116 Q260,106 270,106 Q280,106 280,116 L280,124"
          stroke="white"
          strokeWidth="2"
          fill="none"
          strokeLinecap="round"
        />
        <rect x="254" y="123" width="32" height="22" rx="4" fill="white" />
        <circle cx="270" cy="131" r="3.5" fill="#0f0f12" />
        <rect
          x="268.5"
          y="133.5"
          width="3"
          height="6"
          rx="1.5"
          fill="#0f0f12"
        />

        {/* "ATHLETE" label inside inner circle */}
        <text
          x="270"
          y="158"
          textAnchor="middle"
          fill="white"
          fontSize="6"
          fontFamily="sans-serif"
          letterSpacing="1"
          opacity="0.65"
        >
          ATHLETE
        </text>

        {/* ── Left callout ── */}
        <text
          x="10"
          y="128"
          fill="#555570"
          fontSize="7"
          fontFamily="sans-serif"
          fontWeight="600"
        >
          GDPR-Compliant
        </text>
        <text
          x="10"
          y="140"
          fill="#777790"
          fontSize="6"
          fontFamily="sans-serif"
        >
          EU Servers
        </text>
        <line
          x1="104"
          y1="134"
          x2="182"
          y2="140"
          stroke="#c4c4d8"
          strokeWidth="1"
          strokeDasharray="3 2"
        />

        {/* ── Right callout ── */}
        <text
          x="440"
          y="128"
          fill="#555570"
          fontSize="7"
          fontFamily="sans-serif"
          fontWeight="600"
        >
          Athlete Owned
        </text>
        <text
          x="440"
          y="140"
          fill="#777790"
          fontSize="6"
          fontFamily="sans-serif"
        >
          Full Control
        </text>
        <line
          x1="436"
          y1="134"
          x2="322"
          y2="140"
          stroke="#c4c4d8"
          strokeWidth="1"
          strokeDasharray="3 2"
        />
      </svg>
    </div>
  )
}

/**
 * ScienceDataTrustSection — Two editorial numbered blocks with alternating layout:
 * Block 01 (Science) text left / diagram right — Block 02 (Trust) diagram left / text right.
 */
export function ScienceDataTrustSection() {
  const { t } = useTranslation()

  const bullets = [
    t('product.trust.bullet1'),
    t('product.trust.bullet2'),
    t('product.trust.bullet3'),
  ]

  return (
    <section
      id="product"
      aria-label="Science and data trust"
      className="bg-background relative z-10 w-full"
    >
      <div className="section-x section-y section-inner mx-auto flex flex-col">
        {/* ── Block 01: Science — text LEFT · diagram RIGHT ── */}
        <AnimateIn variant="fadeUp">
          <div className="border-border flex flex-col gap-6 border-t py-12 md:flex-row md:items-start md:gap-12 md:py-16">
            <div className="flex flex-1 flex-col gap-8 md:flex-row md:items-start md:gap-10">
              {/* Text — left on desktop */}
              <div className="flex flex-col gap-4 md:w-[44%] md:shrink-0">
                <Typography
                  variant="title"
                  as="h2"
                  textColor="default"
                  className="text-[22px] leading-[1.1] tracking-[-0.025em] sm:text-[28px] lg:text-[32px]"
                >
                  {t('product.science.heading')}
                </Typography>
                <p className="text-foreground/65 text-[14px] leading-[1.75] sm:text-[15px]">
                  {t('product.science.body')}
                </p>
              </div>
              {/* Diagram — right on desktop */}
              <div className="flex-1">
                <ScienceDiagram />
              </div>
            </div>
          </div>
        </AnimateIn>

        {/* ── Block 02: Trust — diagram LEFT · text RIGHT ── */}
        <AnimateIn variant="fadeUp" delay={0.1}>
          <div className="border-border flex flex-col gap-6 border-t py-12 md:flex-row md:items-start md:gap-12 md:py-16">
            <div className="flex flex-1 flex-col gap-8 md:flex-row-reverse md:items-start md:gap-10">
              {/* Text — right on desktop (first in DOM = right with flex-row-reverse) */}
              <div className="flex flex-col gap-4 md:w-[44%] md:shrink-0">
                <Typography
                  variant="title"
                  as="h2"
                  textColor="default"
                  className="text-[22px] leading-[1.1] tracking-[-0.025em] sm:text-[28px] lg:text-[32px]"
                >
                  {t('product.trust.heading')}
                </Typography>
                <p className="text-foreground/65 text-[14px] leading-[1.75] sm:text-[15px]">
                  {t('product.trust.body')}
                </p>
                <ul className="mt-2 flex flex-col gap-2">
                  {bullets.map((item) => (
                    <li
                      key={item}
                      className="text-foreground/65 flex items-center gap-3 text-[13px] sm:text-[14px]"
                    >
                      <span
                        className="bg-primary h-px w-4 shrink-0"
                        aria-hidden="true"
                      />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
              {/* Diagram — left on desktop (second in DOM = left with flex-row-reverse) */}
              <div className="flex-1">
                <TrustDiagram />
              </div>
            </div>
          </div>
        </AnimateIn>

        {/* ── Bottom rule ── */}
        <div className="border-border border-t" aria-hidden="true" />
      </div>
    </section>
  )
}
