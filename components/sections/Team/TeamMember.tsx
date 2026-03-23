'use client'

import * as React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Card } from '@/components/ui/card'
import { Typography } from '@/components/ui/typography'
import { cn } from '@/lib/utils'
import type { TeamMemberData } from './teamData'

interface TeamMemberProps extends TeamMemberData {
  className?: string
}

/**
 * TeamMember — Full-bleed image card with name, role, and LinkedIn
 * overlaid at the bottom via a dark gradient scrim.
 *
 * Layout:
 *  - Card is entirely the photo (4:5 aspect ratio)
 *  - Bottom gradient (transparent → black/70) provides contrast for white text
 *  - Name (heading), role (paragraph), and LinkedIn icon sit inside the scrim
 *  - LinkedIn icon is keyboard-accessible with aria-label
 */
export const TeamMember = React.forwardRef<HTMLDivElement, TeamMemberProps>(
  ({ name, role, image, linkedin, className }, ref) => {
    return (
      <Card
        ref={ref}
        className={cn(
          'group border-border relative w-full max-w-[200px] overflow-hidden p-0',
          'shadow-sm transition-shadow duration-200 hover:shadow-md',
          className
        )}
      >
        {/* Full-bleed photo */}
        <div className="relative aspect-[4/5] w-full bg-neutral-200">
          <Image
            src={image}
            alt={name}
            fill
            className="object-cover object-top transition-transform duration-300 group-hover:scale-[1.02]"
            sizes="(max-width: 480px) 45vw, (max-width: 768px) 28vw, (max-width: 1280px) 18vw, 200px"
          />

          {/* Dark gradient scrim at bottom for text readability */}
          <div
            aria-hidden
            className="pointer-events-none absolute inset-x-0 bottom-0 h-[55%]"
            style={{
              background:
                'linear-gradient(to top, rgba(0,0,0,0.75) 0%, rgba(0,0,0,0.4) 50%, transparent 100%)',
            }}
          />

          {/* Overlay content */}
          <div className="absolute inset-x-0 bottom-0 flex flex-col gap-0.5 px-4 pt-2 pb-4">
            <Typography
              variant="heading"
              as="p"
              textColor="white"
              className="truncate leading-tight"
            >
              {name}
            </Typography>
            <Typography
              variant="paragraph"
              as="p"
              textColor="white"
              className="truncate opacity-75"
            >
              {role}
            </Typography>

            {/* LinkedIn link */}
            {linkedin ? (
              <Link
                href={linkedin}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`${name} on LinkedIn`}
                className="mt-2 inline-flex w-fit items-center justify-center rounded-full p-1 text-white/80 transition-colors duration-150 hover:text-white focus-visible:ring-2 focus-visible:ring-white focus-visible:outline-none"
              >
                {/* LinkedIn icon */}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                </svg>
              </Link>
            ) : (
              // Placeholder spacer so cards without LinkedIn stay the same height
              <div className="mt-2 h-[34px]" aria-hidden />
            )}
          </div>
        </div>
      </Card>
    )
  }
)

TeamMember.displayName = 'TeamMember'
