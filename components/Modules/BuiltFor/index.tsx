import Layout from '@/components/Layout'
import { builtForData } from './builtForData'
import { BuiltForCard } from './BuiltForCard'

export const BuiltFor = () => {
  return (
    <Layout
      sectionClassName="bg-white px-4 sm:px-8 md:px-12 lg:px-16"
      className="max-w-[1650px] pt-8 pb-14 sm:pt-10 sm:pb-16 lg:pt-12 lg:pb-20"
    >
      <div className="mx-auto w-full max-w-[1320px]">
        {/* Title */}
        <h2 className="mb-6 text-left text-[20px] leading-[1.1] font-bold tracking-[-0.03em] text-black sm:mb-8 sm:text-[28px] md:text-[32px] lg:mb-9 lg:text-[42px]">
          Built for the People Who Keep
          <br />
          Footballers on the Pitch.
        </h2>

        {/* Cards grid */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:gap-7 lg:grid-cols-3 lg:gap-8">
          {builtForData.map((item) => (
            <BuiltForCard key={item.title} {...item} />
          ))}
        </div>
      </div>
    </Layout>
  )
}
