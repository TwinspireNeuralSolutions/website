import { useAuth } from './useAuth'
import { useGetProfile } from '@/services/firebase/queries/useGetProfile'
import { TwinspireProfile } from '@/services/firebase/types/auth.types'

/**
 * Hook to check if the current user is a team manager
 * @param profile - Optional profile to check. If not provided, will fetch from useGetProfile
 * @returns boolean indicating if the user is a team manager
 */
export function useIsTeamManager(profile?: TwinspireProfile | null): boolean {
  const { user } = useAuth()
  const { data: fetchedProfile } = useGetProfile(
    profile === undefined ? user?.uid : null
  )

  const profileToCheck = profile !== undefined ? profile : fetchedProfile

  return profileToCheck?.role === 'team-manager'
}
