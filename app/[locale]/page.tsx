import { ContactSection } from '@/components/sections/Contact'
import { FooterSection } from '@/components/sections/Footer'
import { HeroSection } from '@/components/sections/Hero'
import { PartnersSection } from '@/components/sections/Partners'
import { TeamSection } from '@/components/sections/Team'
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
        {/* Placeholder — replace with real section components as they are built. */}
        <div className="bg-background min-h-screen" />
        <TeamSection />
        <ContactSection />
        <PartnersSection />
      </main>
      <FooterSection />
    </>
  )
}
