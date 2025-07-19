'use client'

import React, { useState } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'

import { H1 } from '@/components'

import { TestimonialCard } from './TestimonialCard'
import { testimonials } from './definitions'
import SwiperCore from 'swiper/core'
import { Autoplay, FreeMode } from 'swiper/modules'

SwiperCore.use([Autoplay, FreeMode])

import 'swiper/css'
import 'swiper/css/free-mode'
import 'swiper/css/autoplay'

export const Reviews = () => {
  const settings = {
    slidesPerView: 1,
    spaceBetween: 16,
    centeredSlides: true,
    loop: true,
    freeMode: true,
    autoplay: {
      delay: 0,
      disableOnInteraction: false,
      pauseOnMouseEnter: true,
    },
    speed: 20000,
    allowTouchMove: true,
    className: 'mySwiper',
    breakpoints: {
      768: {
        slidesPerView: 2,
      },
    },
  }

  return (
    <section className="flex min-h-[600px] max-w-[100vw] py-24">
      <div className="m-auto flex w-full flex-col items-center justify-center">
        <H1 className="mb-20 text-center" color="black">
          WHAT PEOPLE <br /> SAY{' '}
          <span className="text-[#0802A3]">ABOUT US?</span>
        </H1>
        <div className="m-0 w-full">
          <Swiper {...settings}>
            {testimonials.map((t, idx) => (
              <SwiperSlide key={t.id} className="h-auto">
                <TestimonialCard key={t.id} {...t} />
              </SwiperSlide>
            ))}
          </Swiper>
          <style jsx global>{`
            .slick-dots li.slick-active div {
              background: #000;
            }
            .swiper-slide {
              height: auto !important;
            }
            .swiper-wrapper {
              align-items: stretch;
            }
          `}</style>
        </div>
      </div>
    </section>
  )
}
