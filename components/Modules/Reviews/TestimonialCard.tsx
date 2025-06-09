'use client'
import Image from 'next/image'
import avatar from '@/public/avatar.jpg'

export const TestimonialCard = ({
  name,
  image,
  quote,
  active,
}: {
  name: string
  image: string
  quote: string
  active: boolean
}) => {
  return (
    <div
      className={`relative m-0 flex h-[250px] flex-col items-center justify-center rounded-3xl bg-blue-300 p-4`}
    >
      {image ? (
        <Image
          src={avatar}
          alt={name}
          className="h-20 w-20 rounded-full object-cover"
          width={40}
          height={40}
        />
      ) : (
        <div className="flex h-20 w-20 items-center justify-center rounded-full bg-white text-2xl font-bold">
          {name.charAt(0)}
        </div>
      )}

      <div className="flex w-full flex-col pt-10">
        <h3 className={`text-center text-2xl font-bold uppercase`}>{name}</h3>
        <p className={`text-center text-sm font-medium`}>{`“${quote}”`}</p>
      </div>
    </div>
  )
}
