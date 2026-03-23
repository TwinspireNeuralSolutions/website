'use client'

import Image from 'next/image'

const partners = [
  { src: '/partners/ai.png', alt: 'Alexandra Institute' },
  { src: '/partners/physio.png', alt: 'DIF Innovation Lab' },
  { src: '/partners/dtu.png', alt: 'DTU' },
  { src: '/partners/myoact.png', alt: 'myoact' },
  { src: '/partners/gs.png', alt: 'DTU Skylab' },
  { src: '/partners/wisp.png', alt: 'Beyond Beta' },
]

const navLinks = ['Problem', 'Solution', 'WHo For', 'GDPR']

export const FooterSection = () => {
  return (
    <footer className="w-full">
      {/* Partner logos bar */}
      <div className="w-full bg-[#8B7FC7] px-4 py-4 sm:px-8 sm:py-5 md:px-12 md:py-6">
        <div className="mx-auto flex max-w-[1400px] flex-wrap items-center justify-center gap-6 sm:gap-8 md:gap-10 lg:gap-14">
          {partners.map((p) => (
            <div key={p.alt} className="flex items-center">
              <Image
                src={p.src}
                alt={p.alt}
                width={120}
                height={40}
                className="h-6 w-auto brightness-0 invert opacity-90 sm:h-7 md:h-8 lg:h-9"
              />
            </div>
          ))}
        </div>
      </div>

      {/* Main footer content */}
      <div className="w-full bg-[#E8E5F0] px-4 sm:px-8 md:px-12">
        <div className="mx-auto max-w-[1400px] pb-6 pt-8 sm:pb-8 sm:pt-10 md:pt-12 lg:pt-14">
          {/* Navigation links */}
          <nav className="mb-8 flex flex-wrap items-center justify-center gap-2 sm:mb-10 md:mb-12 lg:mb-14">
            {navLinks.map((link, i) => (
              <div key={link} className="flex items-center gap-2">
                <a
                  href={`#${link.toLowerCase().replace(/\s/g, '-')}`}
                  className="text-sm font-medium text-slate-700 transition-colors hover:text-slate-900 sm:text-base md:text-lg"
                >
                  {link}
                </a>
                {i < navLinks.length - 1 && (
                  <span className="text-slate-400">•</span>
                )}
              </div>
            ))}
          </nav>

          {/* TWINSPIRE watermark */}
          <div className="mb-2 select-none text-center sm:mb-3 md:mb-4">
            <h2 className="text-[48px] font-black leading-none tracking-tight text-[#D5D2DE] sm:text-[72px] md:text-[100px] lg:text-[140px] xl:text-[170px]">
              TWINSPIRE
            </h2>
          </div>

          {/* Spaced subtitle */}
          <div className="mb-6 select-none text-center sm:mb-8 md:mb-10">
            <p className="text-[10px] font-medium tracking-[0.3em] text-slate-500 sm:text-xs sm:tracking-[0.4em] md:text-sm md:tracking-[0.5em] lg:text-base lg:tracking-[0.6em]">
              N &nbsp;W &nbsp;U &nbsp;R &nbsp;A &nbsp;L &nbsp;&nbsp;&nbsp;&nbsp; N &nbsp;W &nbsp;T &nbsp;W &nbsp;O &nbsp;R &nbsp;K &nbsp;&nbsp;&nbsp;&nbsp; S &nbsp;O &nbsp;L &nbsp;U &nbsp;T &nbsp;I &nbsp;O &nbsp;N
            </p>
          </div>

          {/* Bottom bar */}
          <div className="flex items-center justify-between border-t border-slate-300/50 pt-4">
            <p className="text-xs text-slate-500 sm:text-sm">
              @ All right reserved.
            </p>
            <a
              href="https://www.linkedin.com/company/twinspire-neural-solutions"
              target="_blank"
              rel="noopener noreferrer"
              className="flex h-7 w-7 items-center justify-center rounded text-slate-400 transition-colors hover:text-slate-700"
              aria-label="LinkedIn"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
                <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
