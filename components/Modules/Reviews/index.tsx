'use client'

import React from 'react'
import Slider from 'react-slick'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'

const testimonials = [
  {
    id: 1,
    name: 'Alice Smith',
    quote: 'This is amazing solution, makes our life easier and better',
  },
  {
    id: 2,
    name: 'Bob Johnson',
    quote: 'This is amazing solution, makes our life easier and better',
  },
  {
    id: 3,
    name: 'Carol Perez',
    quote: 'This is amazing solution, makes our life easier and better',
  },
  {
    id: 4,
    name: 'Dave Riley',
    quote: 'This is amazing solution, makes our life easier and better',
  },
  {
    id: 5,
    name: 'Eve Kwon',
    quote: 'This is amazing solution, makes our life easier and better',
  },
]

const TestimonialCard = ({ name, quote }: { name: string; quote: string }) => (
  <div className="px-3">
    <div className="flex min-h-[260px] flex-col items-center rounded-[32px] bg-[#03036f] px-8 py-10 text-center shadow-xl shadow-gray-300/50">
      {/* Avatar placeholder */}
      <div className="mb-8 h-16 w-16 shrink-0 rounded-full bg-white" />

      {/* Person name */}
      <h3 className="mb-4 text-xl font-bold tracking-wide text-white uppercase">
        {name}
      </h3>

      {/* Quote */}
      <p className="max-w-xs text-sm leading-relaxed font-semibold text-white">
        &ldquo;{quote}&rdquo;
      </p>
    </div>
  </div>
)

export const Reviews = () => {
  const settings = {
    dots: true,
    infinite: true,
    slidesToShow: 3,
    slidesToScroll: 1,
    speed: 600,
    arrows: false,
    autoplay: true,
    autoplaySpeed: 2500,
    cssEase: 'linear',
    appendDots: (dots: React.ReactNode) => (
      <div className="pt-16">
        <ul className="flex justify-center">{dots}</ul>
      </div>
    ),
    customPaging: () => <div className="h-3 w-3 rounded-full bg-gray-300" />,
    responsive: [
      {
        breakpoint: 1024,
        settings: { slidesToShow: 2 },
      },
      {
        breakpoint: 640,
        settings: { slidesToShow: 1 },
      },
    ],
  }

  return (
    <section className="flex h-screen w-full">
      <div className="m-auto flex w-full max-w-[1400px] flex-col text-center">
        <h1 className="mb-20 text-8xl font-bold uppercase">
          WHAT PEOPLE <br /> SAY
          <span className="text-[#0802A3]">ABOUT US?</span>
        </h1>
        <div className="mx-auto max-w-6xl">
          <Slider {...settings}>
            {testimonials.map((t) => (
              <TestimonialCard key={t.id} {...t} />
            ))}
          </Slider>

          {/* Activate black dot for current slide */}
          <style jsx global>{`
            .slick-dots li.slick-active div {
              background: #000;
            }
          `}</style>
        </div>
      </div>
    </section>
  )
}
