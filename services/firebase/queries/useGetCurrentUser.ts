import { useQuery } from '@tanstack/react-query'
import { auth } from '../config/firebase-config'
import { mapFirebaseUser } from '../types/auth.types'
import { AUTH_KEYS } from '../constants/query-keys'

function getCurrentUser() {
  if (!auth) {
    throw new Error('Firebase auth not initialized')
  }

  return auth.currentUser
}

export function useGetCurrentUser() {
  return useQuery({
    queryKey: AUTH_KEYS.currentUser,
    queryFn: () => {
      const user = getCurrentUser()
      return user ? mapFirebaseUser(user) : null
    },
    staleTime: Infinity,
    gcTime: Infinity,
  })
}
