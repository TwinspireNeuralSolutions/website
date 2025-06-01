import { MenuToggle } from '../atoms'

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
          className={`flex flex-1 flex-col items-center justify-center transition-all duration-500 ${
            isMenuOpen ? 'h-full' : 'h-0'
          }`}
        >
          <ul>
            {navItems.map((item) => (
              <li key={item.id}>{item.label}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  )
}

export default NavbarMobile
