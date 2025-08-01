'use client'
import React, { useState, useEffect } from 'react'
import { useMediaQuery } from '@/hooks/useMediaQuery'

export const navItems = [
  { label: 'Home', id: 'home', href: '#home' },
  { label: 'Twinspire', id: 'twinspire', href: '#twinspire' },
  { label: 'Benefits', id: 'benefits', href: '#benefits' },
  { label: 'Process', id: 'process', href: '#process' },
  { label: 'Services', id: 'services', href: '#services' },
]

import NavbarDesktop from './NavbarDesktop'
import NavbarMobile from './NavbarMobile'

export const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [activeId, setActiveId] = useState('home')
  const { isMobile } = useMediaQuery()

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)

      // Get all sections
      const sections = navItems.map((item) => document.getElementById(item.id))

      // Find which section is currently in view
      const scrollPosition = window.scrollY + window.innerHeight / 2

      let currentSection = 'home'
      sections.forEach((section, index) => {
        if (section) {
          const sectionTop = section.offsetTop
          const sectionBottom = sectionTop + section.offsetHeight

          if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
            currentSection = navItems[index].id
          }
        }
      })

      setActiveId(currentSection)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <div
      className={`pointer-events-none fixed top-0 left-0 z-50 flex max-w-[100vw] ${
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
        <NavbarDesktop
          navItems={navItems}
          scrolled={scrolled}
          activeId={activeId}
          setActiveId={setActiveId}
        />
        <NavbarMobile
          isMenuOpen={isMenuOpen}
          scrolled={scrolled}
          setIsMenuOpen={setIsMenuOpen}
          navItems={navItems}
          activeId={activeId}
          setActiveId={setActiveId}
        />
      </header>
    </div>
  )
}
