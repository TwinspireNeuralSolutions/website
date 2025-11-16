'use client'
import React, { useRef, useState, useEffect } from 'react'

import { Button } from '@/components/Atoms/Button'

import Image from 'next/image'
import { useRouter } from 'next/navigation'

export default function NavbarDesktop({
  navItems,
  scrolled,
  activeId,
  setActiveId,
}: {
  navItems: { label: string; id: string; href: string; tagline: string }[]
  scrolled: boolean
  activeId: string
  setActiveId: (id: string) => void
}) {
  const [blueStyle, setBlueStyle] = useState({
    left: 0,
    width: 0,
    transition: 'none',
  })
  const [greyStyle, setGreyStyle] = useState({
    left: 0,
    width: 0,
    opacity: 0,
    transition: 'none',
  })
  const navRefs = useRef<(HTMLLIElement | null)[]>([])
  const router = useRouter()

  // Set blue underline on initial load and when activeId changes
  useEffect(() => {
    const idx = navItems.findIndex((item) => item.id === activeId)
    const el = navRefs.current[idx]
    if (el) {
      setBlueStyle({
        left: el.offsetLeft,
        width: el.offsetWidth,
        transition: 'none',
      })
      setGreyStyle({
        left: el.offsetLeft,
        width: el.offsetWidth,
        opacity: 0,
        transition: 'none',
      })
    }
    // After first render, enable transition for future moves
    setTimeout(() => {
      setBlueStyle((prev) => ({ ...prev, transition: 'left 0.3s, width 0.3s' }))
      setGreyStyle((prev) => ({
        ...prev,
        transition: 'left 0.3s, width 0.3s, opacity 0.2s',
      }))
    }, 50)
    // eslint-disable-next-line
  }, [activeId, navRefs.current.length])

  // On hover, animate grey underline to hovered item and show it
  const handleMouseEnter = (id: string, idx: number) => {
    const el = navRefs.current[idx]
    if (el) {
      setGreyStyle({
        left: el.offsetLeft,
        width: el.offsetWidth,
        opacity: 1,
        transition: 'left 0.3s, width 0.3s, opacity 0.2s',
      })
    }
  }

  // On mouse leave, animate grey underline back to active item and hide it
  const handleMouseLeave = () => {
    const idx = navItems.findIndex((item) => item.id === activeId)
    const el = navRefs.current[idx]
    if (el) {
      setGreyStyle({
        left: el.offsetLeft,
        width: el.offsetWidth,
        opacity: 0,
        transition: 'left 0.3s, width 0.3s, opacity 0.2s',
      })
    }
  }

  const handleClick = (item: { id: string; href: string }) => {
    setActiveId(item.id)
    router.push(item.href)

    // Smooth scroll to section
    const section = document.getElementById(item.id)
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' })
    }

    // Optionally update the URL hash (without jumping)
    window.history.replaceState(null, '', `${item.href}`)
  }

  return (
    <div className="hidden w-full items-center justify-between px-5 md:flex">
      <div className="flex flex-1 justify-start">
        <Image
          src={scrolled ? '/logo-black.png' : '/logo-white.png'}
          alt="logo"
          width={70}
          height={70}
          className="min-w-[50px] rounded-full"
        />
      </div>
      <nav className="flex flex-1 justify-center">
        <ul className="relative flex justify-center">
          {navItems.map((item, idx) => (
            <li
              key={item.id}
              ref={(el) => {
                navRefs.current[idx] = el
              }}
              className={`relative cursor-pointer px-4 py-2 ${
                scrolled ? 'text-black' : 'text-white'
              }`}
              onMouseEnter={() => handleMouseEnter(item.id, idx)}
              onMouseLeave={handleMouseLeave}
              onClick={() => handleClick(item)}
              title={item.tagline}
            >
              {item.label}
            </li>
          ))}
          {/* Blue underline (active) */}
          <div
            className="absolute"
            style={{
              left: blueStyle.left,
              width: blueStyle.width,
              height: '4px',
              bottom: '-15px',
              background: '#060e96',
              borderRadius: '2px',
              transition: blueStyle.transition,
              pointerEvents: 'none',
              zIndex: 10,
            }}
          />
          {/* Grey underline (hover, underneath blue) */}
          <div
            className="absolute"
            style={{
              left: greyStyle.left,
              width: greyStyle.width,
              height: '4px',
              bottom: '-15px',
              background: '#9ca3af',
              borderRadius: '2px',
              transition: greyStyle.transition,
              pointerEvents: 'none',
              zIndex: 5,
              opacity: greyStyle.opacity,
            }}
          />
        </ul>
      </nav>
      <div className="flex flex-1 items-center justify-end gap-3">
        {/* <LanguageSelect textColor={scrolled ? 'text-black' : 'text-white'} /> */}
        {/* Book a call button */}
        <Button
          onClick={() => router.push('/#reach-out')}
          className="px-4 py-1.5 text-sm"
        >
          Book Demo
        </Button>
        {/* Team Manager Login button */}
        <Button
          onClick={() => router.push('/admin')}
          color={scrolled ? 'blue' : 'white'}
          className="px-4 py-1.5 text-sm"
        >
          Team Login
        </Button>
      </div>
    </div>
  )
}
