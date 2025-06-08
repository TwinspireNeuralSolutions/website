import { H1, H2, H3 } from '@/components'
import Image from 'next/image'
import Layout from '@/components/Layout'
import { definitions } from './definitions'

export const TwinAI = () => {
  return (
    <Layout
      id="about"
      className="flex flex-col items-center justify-center"
      // sectionClassName="h-screen overflow-hidden"
    >
      <H1 className="mb-10 text-center text-4xl font-bold uppercase">
        Digital Twins for Sport & Rehab
      </H1>
      <div className="w-full flex-row border-t border-gray-200">
        {definitions.map((definition, index) => (
          <div
            key={index}
            className={`${index === 0 ? 'mt-0' : 'mt-40'} flex flex-row gap-40 py-20`}
          >
            <div className="max-w-xl">
              <H3 className="text-gray-600">{definition.subTitle}</H3>
              <H2 className="mb-2">{definition.title}</H2>
              <p className="mt-6">{definition.description}</p>
            </div>
            <div className="relative flex h-[340px] w-[340px] items-center justify-center">
              <div className="absolute h-full w-full rounded-xl bg-indigo-100" />
              <Image
                src={definition.image}
                alt="AI Illustration"
                width={240}
                height={240}
                className="absolute mt-15 ml-15 h-full w-full rounded-xl object-cover"
              />
            </div>
          </div>
        ))}
      </div>
    </Layout>
  )
}
