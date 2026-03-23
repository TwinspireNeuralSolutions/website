import Image from 'next/image'
import { Link2 } from 'lucide-react'

interface TeamMemberProps {
  name: string
  role?: string
  image: string
}

export const TeamMember = ({ name, role, image }: TeamMemberProps) => {
  return (
    <article className="relative w-full max-w-[248px] overflow-hidden rounded-[22px] bg-black">
      <div className="relative h-[250px] w-full overflow-hidden sm:h-[250px] lg:h-[250px]">
        <Image
          src={image}
          alt={name}
          fill
          className="h-full w-full object-cover object-top"
          sizes="248px"
        />

        <div className="absolute inset-0 bg-black/18" />

        <div className="absolute right-0 bottom-0 left-0 p-3">
          <div className="min-w-0">
            <h3 className="truncate text-[14px] font-semibold whitespace-nowrap text-white">
              {name}
            </h3>
            {role && (
              <p className="text-[9px] tracking-wide text-white/95 uppercase">
                {role}
              </p>
            )}
            <div className="mt-1.5">
              <div className="inline-flex cursor-pointer items-center justify-center px-0 py-1 text-white transition-all duration-200 hover:scale-105 hover:text-white/80">
                <Link2 size={14} strokeWidth={2.4} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </article>
  )
}
