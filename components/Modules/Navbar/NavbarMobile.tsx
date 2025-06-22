import { Button, LanguageSelect, MenuToggle } from 'components'

import Image from 'next/image'
import logoBlack from '@/public/logo-black.png'
import logoWhite from '@/public/logo-white.png'

const NavbarMobile = ({
  isMenuOpen,
  scrolled,
  setIsMenuOpen,
  navItems,
}: {
  isMenuOpen: boolean
  scrolled: boolean
  setIsMenuOpen: (isMenuOpen: boolean) => void
  navItems: { label: string; id: string; href: string }[]
}) => {
  return (
    <div className="flex h-full w-full flex-col p-4 md:hidden">
      <div className="flex w-full items-center justify-between">
        <Image
          src={scrolled || isMenuOpen ? logoBlack : logoWhite}
          alt="logo"
          width={70}
          height={70}
          className="rounded-full"
        />

        <MenuToggle
          onToggle={() => setIsMenuOpen(!isMenuOpen)}
          isOpen={isMenuOpen}
          color={scrolled || isMenuOpen ? 'black' : 'white'}
        />
      </div>

      {/* Menu content container with overflow hidden */}
      <div
        className={`mt-10 flex flex-1 flex-col justify-between overflow-hidden transition-all duration-500 ${
          isMenuOpen ? 'h-full opacity-100' : 'h-0 opacity-0'
        }`}
      >
        {/* Navigation items */}
        <ul className="flex flex-col gap-2">
          {navItems.map((item) => (
            <li key={item.id}>{item.label}</li>
          ))}
        </ul>

        {/* Bottom section with language select and button */}
        <div className="flex items-center justify-between gap-2">
          <LanguageSelect
            textColor={scrolled || isMenuOpen ? 'text-black' : 'text-white'}
          />

          {/* Book a call button */}
          <Button>Book a call</Button>
        </div>
      </div>
    </div>
  )
}

export default NavbarMobile
