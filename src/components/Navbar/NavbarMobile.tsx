import { Button, LanguageSelect, MenuToggle } from '../atoms'

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
    <div className="flex h-full w-full flex-col md:hidden">
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
      {isMenuOpen && (
        <div
          className={`mt-10 flex flex-1 flex-col justify-start transition-all duration-500 ${
            isMenuOpen ? 'h-full' : 'h-0'
          }`}
        >
          <ul className="flex flex-col gap-2">
            {navItems.map((item) => (
              <li key={item.id}>{item.label}</li>
            ))}
          </ul>
        </div>
      )}
      {isMenuOpen && (
        <div className="mt-10 mb-10 flex flex-1 items-center justify-between gap-2">
          <LanguageSelect
            textColor={scrolled || isMenuOpen ? 'text-black' : 'text-white'}
          />

          {/* Book a call button */}
          <Button>Book a call</Button>
        </div>
      )}
    </div>
  )
}

export default NavbarMobile
