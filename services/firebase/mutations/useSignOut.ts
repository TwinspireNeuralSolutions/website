import { useMutation, useQueryClient } from '@tanstack/react-query'
import { signOut as firebaseSignOut } from 'firebase/auth'
import { auth } from '../config/firebase-config'
import { AUTH_KEYS } from '../constants/query-keys'
import { handleAuthError } from '../utils/auth-utils'

export async function signOut(): Promise<void> {
  if (!auth) {
    throw new Error('Firebase auth not initialized')
  }

  try {
    await firebaseSignOut(auth)
  } catch (error: any) {
    throw handleAuthError(error)
  }
}

export function useSignOut() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: () => signOut(),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: AUTH_KEYS.currentUser })
      queryClient.invalidateQueries({ queryKey: AUTH_KEYS.authState })
      queryClient.clear()
    },
    onError: (error: Error) => {
      console.error('Sign out failed:', error.message)
    },
  })
}
