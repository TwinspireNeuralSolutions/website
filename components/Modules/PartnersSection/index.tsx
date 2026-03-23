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

export const PartnersSection = () => {
  return (
    <section className="w-full">
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
    </section>
  )
}
