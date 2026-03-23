'use client'

import Image from 'next/image'

const partners = [
  { src: '/partners/ai.png', alt: 'Alexandra Institute' },
  { src: '/partners/dif.png', alt: 'DIF Innovation Lab' },
  { src: '/partners/dtu.png', alt: 'DTU' },
  { src: '/partners/myoact.png', alt: 'myoact' },
  { src: '/partners/skylab.png', alt: 'DTU Skylab' },
  { src: '/partners/beyond-beta.png', alt: 'Beyond Beta' },
]

const navLinks = ['Problem', 'Solution', 'WHo For', 'GDPR']

export const FooterSection = () => {
  return (
    <footer className="w-full">
      {/* Partner logos bar */}
      <div className="w-full bg-[#8B7FC7] px-6 py-4 sm:px-10 sm:py-5 md:px-14 md:py-6">
        <div className="grid grid-cols-2 items-center gap-4 sm:grid-cols-3 md:gap-6 lg:grid-cols-6">
          {partners.map((p) => (
            <div key={p.alt} className="flex items-center justify-center">
              <Image
                src={p.src}
                alt={p.alt}
                width={140}
                height={48}
                className="h-7 w-auto opacity-90 brightness-0 invert sm:h-8 md:h-9 lg:h-10"
              />
            </div>
          ))}
        </div>
      </div>

      {/* Main footer content */}
      <div className="w-full bg-[#E8E5F0] px-4 sm:px-8 md:px-12">
        <div className="mx-auto max-w-[1400px] pt-8 pb-6 sm:pt-10 sm:pb-8 md:pt-12 lg:pt-14">
          {/* Navigation links */}
          <nav className="mb-8 flex flex-wrap items-center justify-center gap-2 sm:mb-10 md:mb-12 lg:mb-14">
            {navLinks.map((link, i) => (
              <div key={link} className="flex items-center gap-2">
                <a
                  href={`#${link.toLowerCase().replace(/\s/g, '-')}`}
                  className="text-sm font-semibold text-[#6A6A6A] transition-colors hover:text-[#6A6A6A] sm:text-base md:text-lg"
                >
                  {link}
                </a>
                {i < navLinks.length - 1 && (
                  <span className="text-[#6A6A6A]">•</span>
                )}
              </div>
            ))}
          </nav>

          {/* TWINSPIRE watermark */}
          <div className="mb-2 text-center select-none sm:mb-3 md:mb-4">
            <h2 className="text-[36px] leading-none font-black tracking-normal text-[#D5D2DE] sm:text-[50px] md:text-[70px] lg:text-[100px] xl:text-[120px]">
              TWINSPIRE
            </h2>
          </div>

          {/* Spaced subtitle */}
          <div className="mb-6 text-center select-none sm:mb-8 md:mb-10">
            <p className="text-[8px] font-bold tracking-[0.5em] whitespace-nowrap text-[#6A6A6A] sm:text-[10px] sm:tracking-[0.7em] md:text-xs md:tracking-[0.9em] lg:text-sm lg:tracking-[1em]">
              NEURAL &nbsp;&nbsp;&nbsp;&nbsp; NETWORK &nbsp;&nbsp;&nbsp;&nbsp;
              SOLUTION
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
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
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
