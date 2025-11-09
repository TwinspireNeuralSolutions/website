'use client'
import { Button } from '@/components/Atoms/Button'
import { MenuToggle } from '@/components/Atoms/MenuToggle'
import { useRouter } from 'next/navigation'
import Image from 'next/image'

const NavbarMobile = ({
  isMenuOpen,
  scrolled,
  setIsMenuOpen,
  navItems,
  activeId,
  setActiveId,
}: {
  isMenuOpen: boolean
  scrolled: boolean
  setIsMenuOpen: (isMenuOpen: boolean) => void
  navItems: { label: string; id: string; href: string; tagline: string }[]
  activeId: string
  setActiveId: (id: string) => void
}) => {
  const router = useRouter()

  const handleClick = (item: { id: string; href: string }) => {
    setActiveId(item.id)
    setIsMenuOpen(false) // Close menu after clicking

    // Smooth scroll to section
    const section = document.getElementById(item.id)
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' })
    }

    // Update the URL hash (without jumping)
    window.history.replaceState(null, '', `${item.href}`)
  }

  return (
    <div className="flex h-full w-full flex-col p-4 md:hidden">
      <div className="flex w-full items-center justify-between">
        <Image
          src={scrolled || isMenuOpen ? '/logo-black.png' : '/logo-white.png'}
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
        <ul className="flex flex-col gap-4">
          {navItems.map((item) => (
            <li key={item.id}>
              <button
                onClick={() => handleClick(item)}
                className={`w-full rounded-lg px-4 py-3 text-left transition-all duration-200 ${
                  activeId === item.id
                    ? 'bg-[#0802A3] font-semibold text-white'
                    : scrolled || isMenuOpen
                      ? 'text-black hover:bg-gray-100'
                      : 'text-white hover:bg-white/10'
                }`}
              >
                {item.label}
              </button>
            </li>
          ))}
        </ul>

        {/* Bottom section with language select and button */}
        <div className="flex items-center justify-between gap-2">
          {/* <LanguageSelect
            textColor={scrolled || isMenuOpen ? 'text-black' : 'text-white'}
          /> */}

          {/* Book a call button */}
          <Button onClick={() => router.push('/#reach-out')}>
            Book a Demo
          </Button>
        </div>
      </div>
    </div>
  )
}

export default NavbarMobile
