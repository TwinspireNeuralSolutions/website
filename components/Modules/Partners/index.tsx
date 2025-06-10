import Image from 'next/image'

export const Partners = () => {
  return (
    <section
      id="solutions"
      className="custom-shape-divider-top-1748815566 flex w-full flex-col items-center justify-center bg-[#0802A3] p-10 text-white"
    >
      <span className="text-center text-2xl font-bold uppercase">Partners</span>
      <div className="mt-10 flex flex-row flex-wrap justify-center gap-4">
        <Image
          src="/partners/dtu.png"
          alt="DTU"
          width={100}
          height={100}
          className="h-16 w-auto object-contain brightness-90 contrast-125 grayscale"
        />

        <Image
          src="/partners/sf.svg"
          alt="SF"
          width={100}
          height={100}
          className="h-16 w-auto object-contain brightness-99 contrast-100 grayscale"
        />
        <Image
          src="/partners/hui.png"
          alt="HUI"
          width={100}
          height={100}
          className="h-16 w-auto object-contain brightness-65 contrast-60 grayscale"
        />
      </div>
    </section>
  )
}
