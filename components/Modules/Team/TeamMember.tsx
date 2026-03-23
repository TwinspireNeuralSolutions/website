import Image from 'next/image'
import { Link2 } from 'lucide-react'

interface TeamMemberProps {
  name: string
  role?: string
  image: string
}

export const TeamMember = ({ name, role, image }: TeamMemberProps) => {
  return (
    <article className="relative overflow-hidden rounded-lg bg-black">
      <div className="relative h-[360px] w-full overflow-hidden">
        <Image
          src={image}
          alt={name}
          fill
          className="h-full w-full object-cover"
          sizes="(max-width: 768px) 100vw, (max-width: 1600px) 50vw, 25vw"
        />

        <div className="absolute inset-0 bg-black/30" />

        <div className="absolute right-0 bottom-0 left-0 p-5">
          <div>
            <h3 className="text-xl leading-tight font-bold text-white">
              {name}
            </h3>
            {role && (
              <p className="text-sm tracking-wider text-[#f2fff8] uppercase">
                {role}
              </p>
            )}
            <div className="mt-3 inline-flex items-center justify-center rounded-full border border-white/70 bg-black/20 p-2 text-white shadow-sm">
              <Link2 size={16} strokeWidth={2} />
            </div>
          </div>
        </div>
      </div>
    </article>
  )
}
