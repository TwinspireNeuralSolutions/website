import { HeroStorySection } from '@/components/sections/Hero/HeroStory'
import { PartnersSection } from '@/components/sections/Partners'
import { PublicProblemSummarySection } from '@/components/sections/PublicProblemSummary'
import { UseCasesSection } from '@/components/sections/UseCases'
import { PublicHowItWorksSection } from '@/components/sections/PublicHowItWorks'
import { ProductSection } from '@/components/sections/Product'
import { BuiltForSection } from '@/components/sections/BuiltFor'
import { TeamSection } from '@/components/sections/Team'
import { DataEthicsSection } from '@/components/sections/DataEthics'
import { PublicFAQSection } from '@/components/sections/PublicFAQ'
import { ContactSection } from '@/components/sections/Contact'
import { FooterSection } from '@/components/sections/Footer'
import { Navbar } from '@/components/ui/navbar'

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <HeroStorySection />
        <PartnersSection />
        <PublicProblemSummarySection />
        <UseCasesSection />
        <PublicHowItWorksSection />
        <ProductSection />
        <BuiltForSection />
        <TeamSection />
        <DataEthicsSection />
        <PublicFAQSection />
        <ContactSection />
      </main>
      <FooterSection />
    </>
  )
}
