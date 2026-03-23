'use client'

import Image from 'next/image'
import Slider from 'react-slick'
import 'slick-carousel/slick/slick.css'

const partners = [
  { src: '/partners/ai.png', alt: 'Alexandra Institute' },
  { src: '/partners/dtu.png', alt: 'DTU' },
  { src: '/partners/myoact.png', alt: 'Myoact' },
  { src: '/partners/beyond-beta.png', alt: 'Beyond Beta' },
  { src: '/partners/dif.png', alt: 'DIF Innovation Lab' },
  { src: '/partners/skylab.png', alt: 'DTU Skylab' },
]

const sliderSettings = {
  infinite: true,
  autoplay: true,
  autoplaySpeed: 0,
  speed: 6000,
  cssEase: 'linear',
  slidesToShow: 6,
  slidesToScroll: 1,
  arrows: false,
  dots: false,
  pauseOnHover: false,
  swipe: false,
  draggable: false,
  responsive: [
    { breakpoint: 1280, settings: { slidesToShow: 6 } },
    { breakpoint: 1024, settings: { slidesToShow: 5 } },
    { breakpoint: 768, settings: { slidesToShow: 4 } },
    { breakpoint: 480, settings: { slidesToShow: 2 } },
  ],
}

/**
 * PartnersSection — Smooth infinite partner logo carousel.
 * All logos share the same fixed bounding box (object-contain) and
 * identical filter treatment: brightness-0 invert opacity-45.
 */
export function PartnersSection() {
  return (
    <section
      aria-label="Our partners"
      className="bg-partners-bg w-full overflow-hidden py-5 md:py-6"
    >
      <div
        style={{
          maskImage:
            'linear-gradient(to right, transparent 0%, black 8%, black 92%, transparent 100%)',
          WebkitMaskImage:
            'linear-gradient(to right, transparent 0%, black 8%, black 92%, transparent 100%)',
        }}
      >
        <Slider {...sliderSettings}>
          {partners.map((p) => (
            <div key={p.alt}>
              {/* Fixed-size box — object-contain ensures every logo, wide or tall,
                  fills the same space without distortion */}
              <div className="flex items-center justify-center px-2">
                <div className="relative h-8 w-full">
                  <Image
                    src={p.src}
                    alt={p.alt}
                    fill
                    sizes="160px"
                    className="object-contain opacity-[0.45] brightness-0 invert"
                  />
                </div>
              </div>
            </div>
          ))}
        </Slider>
      </div>
    </section>
  )
}
