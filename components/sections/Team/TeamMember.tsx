'use client'

import * as React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Card } from '@/components/ui/card'
import { Typography } from '@/components/ui/typography'
import { cn } from '@/lib/utils'
import type { TeamMemberData } from './teamData'

interface TeamMemberProps extends TeamMemberData {
  readBioLabel?: string
  className?: string
}

/**
 * TeamMember — Full-bleed image card with name, role, and LinkedIn
 * overlaid at the bottom via a dark gradient scrim.
 *
 * Founders with a description get a "Read bio →" pill button that opens a modal.
 */
export const TeamMember = React.forwardRef<HTMLDivElement, TeamMemberProps>(
  (
    { name, role, description, image, linkedin, readBioLabel, className },
    ref
  ) => {
    const dialogRef = React.useRef<HTMLDialogElement>(null)

    return (
      <>
        <Card
          ref={ref}
          className={cn(
            'group border-border relative w-full overflow-hidden p-0',
            'shadow-sm transition-shadow duration-200 hover:shadow-md',
            className
          )}
        >
          {/* Full-bleed photo */}
          <div className="bg-muted relative aspect-[3/4] w-full">
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
              className="pointer-events-none absolute inset-x-0 bottom-0 h-[60%]"
              style={{
                background:
                  'linear-gradient(to top, rgba(0,0,0,0.80) 0%, rgba(0,0,0,0.45) 50%, transparent 100%)',
              }}
            />

            {/* Overlay content */}
            <div className="absolute inset-x-0 bottom-0 flex flex-col gap-0.5 px-3 pt-2 pb-3 sm:px-4 sm:pb-4">
              <Typography
                variant="heading"
                as="p"
                textColor="white"
                className="text-[9px] leading-tight tracking-wide whitespace-nowrap sm:text-[11px] md:text-[13px]"
              >
                {name}
              </Typography>
              <Typography
                variant="paragraph"
                as="p"
                textColor="white"
                className="truncate text-[10px] leading-snug opacity-60 sm:text-[11px]"
              >
                {role}
              </Typography>

              {/* LinkedIn + Read bio row */}
              <div className="mt-1.5 flex items-center gap-2 sm:mt-2">
                {linkedin && (
                  <Link
                    href={linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`${name} on LinkedIn`}
                    className="inline-flex items-center justify-center rounded-full p-0.5 text-white/75 transition-colors duration-150 hover:text-white focus-visible:ring-2 focus-visible:ring-white focus-visible:outline-none"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="15"
                      height="15"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      aria-hidden="true"
                    >
                      <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                    </svg>
                  </Link>
                )}

                {description && readBioLabel && (
                  <button
                    type="button"
                    onClick={() => dialogRef.current?.showModal()}
                    className="ml-auto rounded-full border border-white/40 px-2.5 py-0.5 text-[10px] font-medium text-white/80 transition-colors duration-150 hover:border-white hover:text-white focus-visible:ring-2 focus-visible:ring-white focus-visible:outline-none"
                  >
                    {readBioLabel}
                  </button>
                )}

                {!linkedin && !description && (
                  <div className="h-[20px]" aria-hidden />
                )}
              </div>
            </div>
          </div>
        </Card>

        {/* Description modal — onClick closes on backdrop click; Escape is handled natively by <dialog> */}
        {description && (
          <dialog
            ref={dialogRef}
            onClick={(e) => {
              // eslint-disable-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-noninteractive-element-interactions
              if (e.target === e.currentTarget) dialogRef.current?.close()
            }}
            className="fixed inset-0 z-50 m-auto max-h-[90vh] w-[92vw] max-w-lg border-none bg-transparent p-0 backdrop:bg-black/50 backdrop:backdrop-blur-sm"
          >
            <div className="bg-background relative flex max-h-[90vh] flex-col overflow-hidden rounded-2xl shadow-xl">
              {/* Close button — top-right corner */}
              <button
                type="button"
                onClick={() => dialogRef.current?.close()}
                aria-label="Close"
                className="border-border/40 hover:bg-foreground/5 absolute top-3 right-3 z-10 flex h-8 w-8 items-center justify-center rounded-full border bg-white/80 backdrop-blur-sm transition-all duration-150 focus-visible:ring-2 focus-visible:ring-black focus-visible:outline-none"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <path d="M18 6 6 18" />
                  <path d="m6 6 12 12" />
                </svg>
              </button>

              {/* Profile header */}
              <div className="flex items-start gap-4 px-5 pt-5 pr-14 pb-0 sm:gap-5 sm:px-6 sm:pt-6 sm:pr-14">
                {/* Avatar */}
                <div className="bg-muted relative h-20 w-20 shrink-0 overflow-hidden rounded-xl sm:h-24 sm:w-24">
                  <Image
                    src={image}
                    alt={name}
                    fill
                    className="object-cover object-top"
                    sizes="96px"
                  />
                </div>

                {/* Name, role, LinkedIn */}
                <div className="flex min-w-0 flex-1 flex-col gap-1 pt-1">
                  <Typography
                    variant="heading"
                    as="h3"
                    className="truncate text-[16px] leading-tight sm:text-[18px]"
                  >
                    {name}
                  </Typography>
                  <Typography
                    variant="paragraph"
                    as="p"
                    textColor="muted"
                    className="text-[12px] leading-snug sm:text-[13px]"
                  >
                    {role}
                  </Typography>
                  {linkedin && (
                    <Link
                      href={linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-primary hover:text-primary-hover mt-1 inline-flex w-fit items-center gap-1.5 text-[12px] font-medium transition-colors sm:text-[13px]"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="13"
                        height="13"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        aria-hidden="true"
                      >
                        <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                      </svg>
                      LinkedIn
                    </Link>
                  )}
                </div>
              </div>

              {/* Divider */}
              <div className="border-border/30 mx-5 mt-4 border-t sm:mx-6" />

              {/* Description body — scrollable */}
              <div className="overflow-y-auto px-5 pt-4 pb-6 sm:px-6 sm:pb-7">
                <Typography
                  variant="paragraph"
                  as="p"
                  textColor="muted"
                  className="text-justify text-[13px] leading-relaxed sm:text-[14px] sm:leading-[1.7]"
                >
                  {description}
                </Typography>
              </div>
            </div>
          </dialog>
        )}
      </>
    )
  }
)

TeamMember.displayName = 'TeamMember'
