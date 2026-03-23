import Image from 'next/image'
import { Link2 } from 'lucide-react'

interface TeamMemberProps {
  name: string
  role?: string
  image: string
}

export const TeamMember = ({ name, role, image }: TeamMemberProps) => {
  return (
    <article className="relative overflow-hidden rounded-[22px] bg-black">
      <div className="relative h-[220px] w-full overflow-hidden sm:h-[265px] lg:h-[320px]">
        <Image
          src={image}
          alt={name}
          fill
          className="h-full w-full object-cover object-top"
          sizes="(max-width: 639px) calc(100vw - 3rem), (max-width: 1279px) calc(50vw - 3.5rem), 240px"
        />

        <div className="absolute inset-0 bg-black/18" />

        <div className="absolute right-0 bottom-0 left-0 p-3 sm:p-3.5 lg:p-4">
          <div>
            <h3 className="text-[13px] font-semibold whitespace-nowrap text-white sm:text-[16px] lg:text-[20px]">
              {name}
            </h3>
            {role && (
              <p className="text-[8px] tracking-wide text-white/95 uppercase sm:text-[10px] lg:text-[12px]">
                {role}
              </p>
            )}
            <div className="mt-1.5 sm:mt-2.5">
              <div className="inline-flex cursor-pointer items-center justify-center px-0 py-1 text-white transition-all duration-200 hover:scale-105 hover:text-white/80">
                <Link2
                  size={14}
                  strokeWidth={2.4}
                  className="lg:h-[16px] lg:w-[16px]"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </article>
  )
}
