import Image from 'next/image'
import { H2 } from 'components/Atoms/Typography'
import Slider from 'react-slick'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'

export const Partners = () => {
  const partners = [
    { src: '/partners/dtu.png', alt: 'DTU', name: 'DTU' },
    { src: '/partners/physio.png', alt: 'SF', name: 'SF' },
    { src: '/partners/hui.png', alt: 'HUI', name: 'HUI' },
    { src: '/partners/ai.png', alt: 'AI', name: 'AI' },
    { src: '/partners/gs.png', alt: 'GS', name: 'GS' },
    { src: '/partners/myoact.png', alt: 'MyoAct', name: 'MyoAct' },
    { src: '/partners/wisp.png', alt: 'Wisp', name: 'Wisp' },
  ]

  const settings = {
    dots: false,
    arrows: false,
    infinite: true,
    speed: 4000,
    slidesToShow: 5,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 4000,
    cssEase: 'linear',
    pauseOnHover: false,
    pauseOnFocus: false,
    draggable: false,
    swipe: false,
    touchMove: false,
    waitForAnimate: false,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 4,
          speed: 5000,
          autoplaySpeed: 5000,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 3,
          speed: 5000,
          autoplaySpeed: 5000,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 2,
          speed: 5000,
          autoplaySpeed: 5000,
        },
      },
    ],
  }

  return (
    <section className="bg-[#0802A3] py-20">
      <div className="container mx-auto max-w-7xl px-6">
        <div className="mb-16 text-center">
          <H2 className="m-auto mb-4 text-center text-white">Our Partners</H2>
          <p className="mx-auto max-w-2xl text-gray-200">
            We collaborate with leading organizations to deliver innovative
            solutions
          </p>
        </div>

        <Slider {...settings}>
          {partners.map((partner, index) => (
            <div key={index} className="pointer-events-none px-4">
              <Image
                src={partner.src}
                alt={partner.alt}
                width={140}
                height={80}
                className="h-14 object-contain opacity-70 brightness-0 invert"
              />
            </div>
          ))}
        </Slider>
      </div>
    </section>
  )
}
