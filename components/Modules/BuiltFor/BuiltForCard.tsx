import Image from 'next/image'
import type { BuiltForItem } from './builtForData'

export const BuiltForCard = ({ title, description, image }: BuiltForItem) => {
  return (
    <div className="group relative h-[450px] w-full overflow-hidden rounded-2xl">
      <Image
        src={image}
        alt={title}
        fill
        className="object-cover object-top transition-transform duration-500 group-hover:scale-105"
      />

      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />

      {/* Text content */}
      <div className="absolute inset-x-0 bottom-0 flex flex-col gap-1 p-3 sm:gap-2 sm:p-4 md:p-5">
        <h3 className="text-sm font-bold text-white sm:text-base md:text-lg">{title}</h3>
        <p className="text-xs leading-relaxed text-white/85 sm:text-sm">{description}</p>
      </div>
    </div>
  )
}
