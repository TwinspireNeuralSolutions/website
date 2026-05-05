export type JobId = 'physio' | 'engineering'
export type JobBadge = 'science' | 'engineering'

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
