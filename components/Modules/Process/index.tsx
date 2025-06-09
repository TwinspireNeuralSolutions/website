import Layout from 'components/Layout'
import { H2 } from 'components'

import { processDefinitions } from './definitions'
import { ProcessSteps } from './ProcessSteps'

export const Process = () => {
  return (
    <Layout id="process" className="flex h-screen items-center justify-center">
      <h1 className="mb-20 flex-1 text-left text-8xl font-bold uppercase">
        How Twinspire Delivers Actionable Insights
      </h1>
      <div className="h-[60%] flex-1">
        <ProcessSteps />
      </div>
      <div className="flex flex-1 flex-col justify-center gap-4">
        {processDefinitions.map(({ title, description }, index) => (
          <div key={index}>
            <H2>{title}</H2>
            <p className="max-w-sm text-sm">{description}</p>
          </div>
        ))}
      </div>
    </Layout>
  )
}
