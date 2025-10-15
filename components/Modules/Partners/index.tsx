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
          <H2 className="m-auto mb-4 text-center text-white">Our Partners</H2>
          <p className="mx-auto max-w-2xl text-gray-200">
            We collaborate with leading organizations to deliver innovative
            solutions
          </p>
        </div>

        <div className="flex items-center justify-items-center gap-8">
          {partners.map((partner, index) => (
            <Image
              key={index}
              src={partner.src}
              alt={partner.alt}
              width={120}
              height={60}
              className="h-14 object-contain opacity-70 brightness-0 invert"
            />
          ))}
        </div>
      </div>
    </section>
  )
}
