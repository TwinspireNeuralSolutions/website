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

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <div className="fixed top-0 left-0 w-full flex justify-center z-50 pointer-events-none">
      <header
        className={`
          transition-all duration-500
          ${scrolled ? 'bg-white shadow-lg rounded-full' : 'bg-transparent'}
          flex justify-between items-center mx-auto px-12 pointer-events-auto
        `}
        style={{
          marginTop: scrolled ? '24px' : '0px',
          width: scrolled ? '1400px' : '100%',

          padding: '0 2rem',
          transition: 'all 0.5s cubic-bezier(0.4,0,0.2,1)',
        }}
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
                onClick={() => handleClick(item)}
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
                bottom: '-15px',
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
    </div>
  )
}
