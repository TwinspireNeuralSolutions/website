import { BuiltForSection } from '@/components/sections/BuiltFor'
import { ContactSection } from '@/components/sections/Contact'
import { CTASection } from '@/components/sections/CTA'
import { FAQSection } from '@/components/sections/FAQ'
import { FooterSection } from '@/components/sections/Footer'
import { HeroSection } from '@/components/sections/Hero'
import { PartnersSection } from '@/components/sections/Partners'
import { ProductSection } from '@/components/sections/Product'
import { ProblemSection } from '@/components/sections/Problem'
import { ScienceDataTrustSection } from '@/components/sections/ScienceDataTrust'
import { DataEthicsSection } from '@/components/sections/DataEthics'
import { TeamSection } from '@/components/sections/Team'
import { Navbar } from '@/components/ui/navbar'
import { BackgroundVideo } from '@/components/ui/background-video'
import Image from 'next/image'

/**
 * Home Page
 * Composed of page-level section components from components/sections/.
 */
export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        {/* ── Hero + Partners share one continuous background ── */}
        <div className="relative overflow-hidden">
          <Image
            src="/hero/image.png"
            alt=""
            aria-hidden="true"
            fill
            sizes="100vw"
            className="absolute inset-0 object-cover object-[50%_30%] md:object-[55%_10%]"
            priority
          />
          <div className="bg-primary/70 absolute inset-0 z-[1]" />
          <BackgroundVideo
            src="/hero-video.mp4"
            opacity={0.25}
            className="z-[2]"
          />
          <div className="relative z-10">
            <HeroSection />
            <PartnersSection transparentBg />
          </div>
        </div>
        <ProblemSection />
        <ProductSection />
        <ScienceDataTrustSection />
        <BuiltForSection />
        <CTASection />
        <TeamSection />
        <DataEthicsSection />
        <FAQSection />
        <ContactSection />
        <PartnersSection />
      </main>
      <FooterSection />
    </>
  )
}
