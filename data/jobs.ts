export type JobId = 'physio' | 'engineering'
export type JobBadge =
  | 'science'
  | 'engineering'
  | 'product'
  | 'design'
  | 'data'
  | 'marketing'
  | 'operations'

export interface JobConfig {
  id: JobId
  badge: JobBadge
}

export const JOBS: readonly JobConfig[] = [
  { id: 'physio', badge: 'science' },
  { id: 'engineering', badge: 'engineering' },
] as const

export function getJob(id: string): JobConfig | undefined {
  return JOBS.find((j) => j.id === id)
}
