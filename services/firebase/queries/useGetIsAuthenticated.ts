import { useGetCurrentUser } from './useGetCurrentUser'

export function useGetIsAuthenticated() {
  const { data: user, isLoading } = useGetCurrentUser()

  return {
    isAuthenticated: !!user,
    isLoading,
    user,
  }
}

