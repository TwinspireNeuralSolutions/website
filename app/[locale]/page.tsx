import { HeroStorySection }   from '@/components/sections/Hero/HeroStory'
import { PartnersSection }    from '@/components/sections/Partners'
import { ProblemSection }     from '@/components/sections/Problem'
import { ScienceDataTrustSection } from '@/components/sections/ScienceDataTrust'
import { ProductSection }     from '@/components/sections/Product'
import { BuiltForSection }    from '@/components/sections/BuiltFor'
import { TeamSection }        from '@/components/sections/Team'
import { DataEthicsSection }  from '@/components/sections/DataEthics'
import { FAQSection }         from '@/components/sections/FAQ'
import { CTASection }         from '@/components/sections/CTA'
import { ContactSection }     from '@/components/sections/Contact'
import { FooterSection }      from '@/components/sections/Footer'
import { Navbar }             from '@/components/ui/navbar'

/**
 * Page structure — post ECSS 2026 + Roxane feedback:
 *
 * Hero            Four-act story (overtraining → gap → injury → rehab)
 * Partners        Sensor and platform integration logos
 * Problem         The Gap — two data streams, neither connected
 * ScienceDataTrust  Repurposed: Martin ECSS checklist — what a decision
 *                 support system actually is, honest about validation gap
 * Product         How It Works — club data + personal data, one model
 *                 Athletic Passport featured prominently within
 * BuiltFor        Physiotherapists · Coaches · Footballers
 * Team            Founders, team, DTU credibility — restored per Roxane
 * DataEthics      GDPR, ownership, explainability by design
 * FAQ             Restored — covers validation stage, passport, XAI, GDPR
 * CTA             Apply to Join the Validation Cohort (honest stage framing)
 * Contact         Short call, no commitment
 */
export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <HeroStorySection />
        <PartnersSection />
        <ProblemSection />
        <ScienceDataTrustSection />
        <ProductSection />
        <BuiltForSection />
        <TeamSection />
        <DataEthicsSection />
        <FAQSection />
        <CTASection />
        <ContactSection />
      </main>
      <FooterSection />
    </>
  )
}
