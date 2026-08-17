import { HeroStorySection }        from '@/components/sections/Hero/HeroStory'
import { PartnersSection }         from '@/components/sections/Partners'
import { ProblemSection }          from '@/components/sections/Problem'
import { UseCasesSection }         from '@/components/sections/UseCases'
import { ScienceDataTrustSection } from '@/components/sections/ScienceDataTrust'
import { ProductSection }          from '@/components/sections/Product'
import { BuiltForSection }         from '@/components/sections/BuiltFor'
import { TeamSection }             from '@/components/sections/Team'
import { DataEthicsSection }       from '@/components/sections/DataEthics'
import { FAQSection }              from '@/components/sections/FAQ'
import { ContactSection }          from '@/components/sections/Contact'
import { FooterSection }           from '@/components/sections/Footer'
import { Navbar }                  from '@/components/ui/navbar'

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <HeroStorySection />
        <PartnersSection />
        <ProblemSection />
        <UseCasesSection />
        <ScienceDataTrustSection />
        <ProductSection />
        <BuiltForSection />
        <TeamSection />
        <DataEthicsSection />
        <FAQSection />
        <ContactSection />
      </main>
      <FooterSection />
    </>
  )
}
