import { HeroSection } from '@/components/sections/Hero'
import { PartnersSection } from '@/components/sections/Partners'
import { Navbar } from '@/components/ui/navbar'

/**
 * Home Page
 * Composed of page-level section components from components/sections/.
 */
export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <HeroSection />
        <PartnersSection />
        {/* Placeholder — gives the page scroll depth so the glass navbar triggers.
            Replace with real section components as they are built. */}
        <div className="bg-background min-h-screen" />
      </main>
    </>
  )
}
