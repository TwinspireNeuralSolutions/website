'use client'
import React, { useState, useEffect } from 'react'
import { useMediaQuery } from '@/hooks/useMediaQuery'

const navItems = [
  { label: 'Home', id: 'home', href: '#home' },
  { label: 'Twin-AI', id: 'twin-ai', href: '#twin-ai' },
  { label: 'Benefits', id: 'benefits', href: '#benefits' },
  { label: 'Process', id: 'process', href: '#process' },
  { label: 'Services', id: 'services', href: '#services' },
]

import NavbarDesktop from './NavbarDesktop'
import NavbarMobile from './NavbarMobile'

export const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const { isMobile } = useMediaQuery()

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <div
      className={`pointer-events-none fixed top-0 left-0 z-50 flex ${
        isMobile && isMenuOpen ? 'h-full' : 'h-[70px]'
      } w-full justify-center`}
    >
      <header
        className={`w-full transition-all duration-500 md:max-w-[1440px] ${scrolled || isMenuOpen ? 'm-4 rounded-[35px] bg-white shadow-lg' : 'bg-transparent'} pointer-events-auto flex flex-row items-center justify-between`}
        style={{
          height: isMenuOpen ? 'calc(100vh - 32px)' : '70px',
          transition: 'all 0.5s cubic-bezier(0.4,0,0.2,1)',
        }}
      >
        <NavbarDesktop navItems={navItems} scrolled={scrolled} />
        <NavbarMobile
          isMenuOpen={isMenuOpen}
          scrolled={scrolled}
          setIsMenuOpen={setIsMenuOpen}
          navItems={navItems}
        />
      </header>
    </div>
  )
}
