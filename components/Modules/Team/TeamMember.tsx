import Image from 'next/image'

interface TeamMemberProps {
  name: string
  role?: string
  image: string
}

export const TeamMember = ({ name, role, image }: TeamMemberProps) => {
  return (
    <article className="group overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
      <div className="relative h-[240px] w-full overflow-hidden">
        <Image
          src={image}
          alt={name}
          fill
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          sizes="(max-width: 768px) 100vw, (max-width: 1600px) 50vw, 25vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
        <div className="absolute right-0 bottom-0 left-0 p-4">
          <h3 className="text-center text-base font-semibold text-white drop-shadow-lg">
            {name}
          </h3>
          {role && (
            <p className="text-center text-xs text-gray-100 opacity-90">
              {role}
            </p>
          )}
        </div>
      </div>
    </article>
  )
}
