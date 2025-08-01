import Image from 'next/image'
import { H2 } from 'components/Atoms/Typography'

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

  return (
    <section className="bg-[#0802A3] py-20">
      <div className="container mx-auto max-w-7xl px-6">
        <div className="mb-16 text-center">
          <H2 className="m-auto mb-4 text-center text-4xl font-bold text-white">
            Our Partners
          </H2>
          <p className="mx-auto max-w-2xl text-lg text-gray-200">
            We collaborate with leading organizations to deliver innovative
            solutions
          </p>
        </div>

        <div className="grid grid-cols-2 items-center justify-items-center gap-8 md:grid-cols-3 lg:grid-cols-7">
          {partners.map((partner, index) => (
            <div
              key={index}
              className="group flex h-16 w-full items-center justify-center transition-all duration-300 hover:scale-110 sm:h-20"
            >
              <Image
                src={partner.src}
                alt={partner.alt}
                width={120}
                height={60}
                className="h-12 w-auto max-w-full object-contain opacity-70 brightness-0 invert transition-all duration-300 group-hover:opacity-100 group-hover:brightness-100 group-hover:invert-0 sm:h-16"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
