'use client'
import { Quote } from 'lucide-react'

export const TestimonialCard = ({
  name,
  quote,
}: {
  name: string
  quote: string
}) => {
  return (
    <div className="relative flex h-full w-full flex-col items-center justify-center rounded-3xl bg-gray-100 p-8">
      {/* Top shadow */}
      <div className="pointer-events-none absolute top-0 left-0 z-10 h-4 w-full rounded-t-3xl shadow-[0_-8px_24px_-4px_rgba(8,2,163,0.10)]" />
      {/* Quote icon */}
      <div className="mb-6 flex items-center justify-center">
        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[#0802A3] shadow-md">
          <Quote className="h-8 w-8 text-white" />
        </div>
      </div>
      {/* Quote text */}
      <p className="mb-8 max-w-3xl text-center text-xl leading-relaxed font-medium text-gray-700">
        "{quote}"
      </p>
      {/* Name */}
      <div className="flex w-full flex-col items-center">
        <span className="mt-2 text-lg font-semibold text-gray-900">{name}</span>
        <div className="mt-1 h-1 w-12 rounded-full bg-[#0802A3]" />
      </div>
    </div>
  )
}
