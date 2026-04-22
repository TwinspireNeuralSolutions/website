'use client'

import * as React from 'react'
import Image from 'next/image'
import { Card } from '@/components/ui/card'
import { Typography } from '@/components/ui/typography'
import { cn } from '@/lib/utils'

interface BuiltForCardProps {
  title: string
  description: string
  image: string
  /** Flat black overlay opacity 0–1, used to normalise image brightness */
  overlayOpacity?: number
  className?: string
}

/**
 * BuiltForCard — Full-bleed portrait image card with title and description
 * overlaid at the bottom via a dark gradient scrim.
 *
 * Two overlay layers:
 *  1. Flat full-image black tint at `overlayOpacity` — normalises brightness
 *  2. Bottom gradient scrim — ensures text contrast regardless of image content
 *
 * Layout:
 *  - Card is entirely the photo (4:5 aspect ratio)
 *  - Title (heading) and description paragraph sit inside the bottom scrim
 */
export const BuiltForCard = React.forwardRef<HTMLDivElement, BuiltForCardProps>(
  ({ title, description, image, overlayOpacity = 0, className }, ref) => {
    return (
      <Card
        ref={ref}
        className={cn(
          'group border-border relative w-full overflow-hidden p-0',
          'shadow-sm transition-shadow duration-200 hover:shadow-md',
          className
        )}
      >
        {/* Full-bleed photo */}
        <div className="relative aspect-[4/5] w-full bg-neutral-200">
          <Image
            src={image}
            alt={title}
            fill
            className="object-cover object-center transition-transform duration-300 group-hover:scale-[1.02]"
            sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
          />

          {/* Layer 1: flat full-image tint — normalises image brightness */}
          {overlayOpacity > 0 && (
            <div
              aria-hidden
              className="pointer-events-none absolute inset-0"
              style={{ background: `rgba(0,0,0,${overlayOpacity})` }}
            />
          )}

          {/* Layer 2: bottom gradient scrim — keeps text readable */}
          <div
            aria-hidden
            className="pointer-events-none absolute inset-x-0 bottom-0 h-[72%]"
            style={{
              background:
                'linear-gradient(to top, rgba(0,0,0,0.82) 0%, rgba(0,0,0,0.55) 38%, rgba(0,0,0,0.15) 65%, transparent 100%)',
            }}
          />

          {/* Overlay content — title starts at same position across cards */}
          <div className="absolute inset-x-0 bottom-0 flex flex-col gap-3 px-5 pb-7">
            <Typography
              variant="heading"
              as="h3"
              textColor="white"
              className="text-[17px] leading-[1.15] font-bold tracking-tight whitespace-nowrap sm:text-[18px] lg:text-[20px]"
            >
              {title}
            </Typography>
            <p className="h-[82px] overflow-hidden text-[12px] leading-[1.7] text-white/75 sm:text-[12.5px]">
              {description}
            </p>
          </div>
        </div>
      </Card>
    )
  }
)

BuiltForCard.displayName = 'BuiltForCard'
