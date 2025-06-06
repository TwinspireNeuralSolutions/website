import Image from 'next/image'
import { H1 } from '@/components'
import Layout from '@/components/Layout'
import { sportTeamDefinitions, physioDefinitions } from './definitions'

import InjuryGif from '@/public/illustrations/injury.gif'

export const Benefits = () => {
  const benefits = [...sportTeamDefinitions, ...physioDefinitions]

  console.log(benefits)
  return (
    <Layout
      sectionClassName="h-screen bg-neutral-900 overflow-y-auto"
      className="flex h-full items-start justify-between"
    >
      <div className="flex h-full flex-1 flex-col text-white">
        <H1>Benefits for Teams</H1>
        <Image src={InjuryGif} alt="Injury" width={350} height={350} />
        <div className="flex h-full w-full flex-1 flex-row items-end gap-2">
          <span className={`h-[6px] w-full flex-1 rounded-full bg-white`} />
          <span className={`h-[6px] w-full flex-1 rounded-full bg-gray-500`} />
        </div>
      </div>
      <div className="flex flex-1 flex-col items-center justify-center gap-4 text-center text-white">
        {sportTeamDefinitions.map(({ title, benefit }, index) => (
          <div
            key={index}
            className="items-left flex flex-col justify-center text-left"
          >
            <h2 className="mt-6 mb-2 text-2xl font-bold">{title}</h2>
            <p className="max-w-sm text-sm">{benefit}</p>
          </div>
        ))}
      </div>
    </Layout>
  )
}
