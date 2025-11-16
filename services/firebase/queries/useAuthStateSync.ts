import { useQueryClient } from '@tanstack/react-query'
import { useEffect } from 'react'
import { onAuthStateChanged } from 'firebase/auth'
import { auth } from '../config/firebase-config'
import { mapFirebaseUser, AuthUser } from '../types/auth.types'
import { AUTH_KEYS } from '../constants/query-keys'

function onAuthStateChange(callback: (user: any) => void): () => void {
  if (!auth) {
    throw new Error('Firebase auth not initialized')
  }

  return onAuthStateChanged(auth, callback)
}

export function useAuthStateSync() {
  const queryClient = useQueryClient()

  useEffect(() => {
    const unsubscribe = onAuthStateChange((firebaseUser) => {
      const authUser = firebaseUser ? mapFirebaseUser(firebaseUser) : null

      queryClient.setQueryData<AuthUser | null>(AUTH_KEYS.currentUser, authUser)

      // Clear profile cache when user logs out
      if (!authUser) {
        queryClient.removeQueries({
          queryKey: ['profile'],
        })
      }
    })

    return () => unsubscribe()
  }, [queryClient])
}
