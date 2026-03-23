'use client'

import Layout from '@/components/Layout'

export const ApplyForFounding = () => {
  return (
    <section className="bg-[#E8E5F0]">
      <Layout
        sectionClassName="!py-0"
        className="flex w-full items-center justify-center"
      >
        <div className="mx-auto flex w-full max-w-[920px] flex-col items-center px-5 py-10 text-center sm:px-6 sm:py-12 md:px-8 md:py-14">
          <h2 className="max-w-[320px] text-[24px] leading-[1.08] font-medium tracking-[0.01em] text-[#221D9C] sm:max-w-[560px] sm:text-[34px] md:max-w-[760px] md:text-[46px] lg:max-w-[860px] lg:text-[54px]">
            <span className="block">Ready to See What Your Squad&apos;s</span>
            <span className="block">Data Is Actually Telling You?</span>
          </h2>

          <p className="mt-5 max-w-[285px] text-[12px] leading-[1.55] font-medium text-[#221D9C] sm:mt-7 sm:max-w-[470px] sm:text-[14px] md:max-w-[580px] md:text-[16px] lg:text-[17px]">
            We are onboarding founding partners across the Nordics this quarter.
            Clubs that join now shape the product, get priority access, and
            preferred pricing.
            <br />
            71 athletes. 2 active clubs. 18 months of real data.
          </p>

          <div className="mt-6 flex w-full items-center justify-center sm:mt-8 md:mt-10">
            <a
              href="#apply"
              className="inline-flex items-center gap-2 rounded-full bg-[#1F179A] py-1.5 pr-1.5 pl-4 text-[10px] font-semibold text-white transition-colors hover:bg-[#19137f] sm:gap-3 sm:pl-6 sm:text-[12px] md:py-2 md:pr-2 md:pl-8 md:text-[15px]"
            >
              <span>Apply for the Founding Cohort</span>
              <span className="flex h-6 w-6 items-center justify-center rounded-full bg-white text-[#1F179A] sm:h-8 sm:w-8 md:h-10 md:w-10">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M7 17 17 7" />
                  <path d="M8 7h9v9" />
                </svg>
              </span>
            </a>
          </div>
        </div>
      </Layout>
    </section>
  )
}
