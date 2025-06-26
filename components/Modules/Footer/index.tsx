'use client'

import React from 'react'
import { Twitter, Facebook, Instagram } from 'lucide-react'
import Image from 'next/image'
import logoWhite from '@/public/logo-white.png'

export const Footer = ({ className }: { className: string }) => {
  // Navigation items
  const navItems = ['HOME', 'SOLUTIONS', 'ABOUT US', 'CONTACT US']

  return (
    <footer className={`w-full ${className} text-white`} id="footer">
      {/* Main content row: Logo + Icons on left, Nav links on right */}
      <div className="mx-auto flex max-w-7xl flex-col justify-between px-6 py-10 md:flex-row">
        {/* ─── Left Side ─── Logo Placeholder + Social Icons */}
        <div className="flex flex-col items-start space-y-6">
          {/* Logo placeholder */}
          <div>
            <Image src={logoWhite} alt="Logo" width={200} height={200} />
          </div>

          {/* Social icons row */}
          <div className="flex space-x-4">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-300">
              <Twitter size={16} className="text-gray-700" />
            </div>
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-300">
              <Facebook size={16} className="text-gray-700" />
            </div>
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-300">
              <Instagram size={16} className="text-gray-700" />
            </div>
          </div>
        </div>

        {/* ─── Right Side ─── Navigation Links with “wipe” hover effect */}
        <nav className="mt-8 flex flex-col space-y-4 md:mt-0">
          {navItems.map((text) => (
            <a
              key={text}
              href="#"
              className="group relative inline-block overflow-hidden"
            >
              <span
                className={`/* 1) Make the text itself transparent and clip the background to it */ /* 2) Define a two-color vertical gradient: white on top, gray on bottom */ /* 3) Make the gradient twice as tall as the text so only one color shows at a time */ /* 4) Start the gradient “scrolled down” so the gray half is */ /* 5) Animate changes to background-position over 300ms */ /* 6) On hover, move background to top so the white half shows */ visible bg-[linear-gradient(to_bottom,white_50%,#9ca3af_50%)] bg-[length:100%_200%] bg-clip-text bg-[position:0_100%] text-6xl leading-tight font-semibold text-transparent transition-[background-position] duration-800 ease-in-out group-hover:bg-[position:0_0]`}
              >
                {text}
              </span>
            </a>
          ))}
        </nav>
      </div>

      {/* Bottom bar: Privacy Policy & Terms of Use */}
      <div className="mt-8 flex items-center justify-between border-t border-gray-700 px-6 py-4">
        {/* Copyright text */}
        <div className="text-sm text-gray-300">
          © 2025 TWIN SPIRE NEURAL SOLUTIONS. All rights reserved.
        </div>
      </div>
    </footer>
  )
}
