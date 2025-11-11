import { useQuery, useQueryClient } from '@tanstack/react-query'
import { useEffect } from 'react'
import { authService } from '../auth.service'
import { mapFirebaseUser, AuthUser } from '../types/auth.types'
import { AUTH_KEYS } from '../mutations/auth-mutations'

/**
 * Hook to get current authenticated user
 * This is a query that can be used anywhere in the app
 */
export function useCurrentUser() {
  return useQuery({
    queryKey: AUTH_KEYS.currentUser,
    queryFn: () => {
      const user = authService.getCurrentUser()
      return user ? mapFirebaseUser(user) : null
    },
    staleTime: Infinity, // User data doesn't go stale
    gcTime: Infinity, // Keep in cache indefinitely
  })
}

/**
 * Hook to subscribe to authentication state changes
 * This keeps the React Query cache in sync with Firebase auth state
 */
export function useAuthStateSync() {
  const queryClient = useQueryClient()

  useEffect(() => {
    const unsubscribe = authService.onAuthStateChange((firebaseUser) => {
      // Update the current user query data
      queryClient.setQueryData<AuthUser | null>(
        AUTH_KEYS.currentUser,
        firebaseUser ? mapFirebaseUser(firebaseUser) : null
      )
    })

    return () => unsubscribe()
  }, [queryClient])
}

/**
 * Hook to check if user is authenticated
 * Returns boolean for easier conditional rendering
 */
export function useIsAuthenticated() {
  const { data: user, isLoading } = useCurrentUser()
  
  return {
    isAuthenticated: !!user,
    isLoading,
    user,
  }
}

