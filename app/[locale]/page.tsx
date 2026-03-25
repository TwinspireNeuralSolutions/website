import { AboutSection } from '@/components/sections/About'
import { BuiltForSection } from '@/components/sections/BuiltFor'
import { ContactSection } from '@/components/sections/Contact'
import { FooterSection } from '@/components/sections/Footer'
import { HeroSection } from '@/components/sections/Hero'
import { PartnersSection } from '@/components/sections/Partners'
import { ProductSection } from '@/components/sections/Product'
import { ProblemSection } from '@/components/sections/Problem'
import { ScienceDataTrustSection } from '@/components/sections/ScienceDataTrust'
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
        <ProblemSection />
        <ProductSection />
        <BuiltForSection />
        <ScienceDataTrustSection />
        <AboutSection />
        <TeamSection />
        <ContactSection />
        <PartnersSection />
      </main>
      <FooterSection />
    </>
  )
}
