'use client'
import React, { useRef, useState, useEffect } from 'react'
import Image from 'next/image'
import logoBlack from '@/public/logo-black.png'
import logoWhite from '@/public/logo-white.png'
import { useRouter } from 'next/navigation'

const navItems = [
  { label: 'Home', id: 'home', href: '#home' },
  { label: 'Solutions', id: 'solutions', href: '#solutions' },
  { label: 'About Us', id: 'about', href: '#about' },
]

export default function Navbar() {
  const [activeId, setActiveId] = useState('home')
  const [blueStyle, setBlueStyle] = useState({ left: 0, width: 0, transition: 'none' })
  const [greyStyle, setGreyStyle] = useState({ left: 0, width: 0, opacity: 0, transition: 'none' })
  const navRefs = useRef<(HTMLLIElement | null)[]>([])
  const router = useRouter()
  const [scrolled, setScrolled] = useState(false)

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
      setGreyStyle((prev) => ({ ...prev, transition: 'left 0.3s, width 0.3s, opacity 0.2s' }))
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

  // On click, animate blue underline to clicked item
  const handleClick = (id: string) => {
    setActiveId(id)
    router.push(navItems.find((item) => item.id === id)?.href || '#')
  }

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header
      className={`flex justify-between items-center z-50 mx-auto px-12 transition-all duration-500
          ${scrolled ? 'sticky bg-white top-4 w-[90%] rounded-full' : 'absolute w-full'} 
     `}
    >
      <Image
        src={scrolled ? logoBlack : logoWhite}
        alt="logo"
        width={70}
        height={70}
        className="rounded-full"
      />
      <nav>
        <ul className="flex justify-center relative">
          {navItems.map((item, idx) => (
            <li
              key={item.id}
              ref={(el) => {
                navRefs.current[idx] = el
              }}
              className={`relative px-4 py-2 cursor-pointer ${
                scrolled ? 'text-black' : 'text-white'
              }`}
              onMouseEnter={() => handleMouseEnter(item.id, idx)}
              onMouseLeave={handleMouseLeave}
              onClick={() => handleClick(item.id)}
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
              bottom: '-14px',
              background: '#1e40af', // Tailwind blue-800
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
              bottom: '-14px',
              background: '#9ca3af', // Tailwind gray-400
              borderRadius: '2px',
              transition: greyStyle.transition,
              pointerEvents: 'none',
              zIndex: 5,
              opacity: greyStyle.opacity,
            }}
          />
        </ul>
      </nav>
      <button>buttons</button>
    </header>
  )
}
