import { useMutation, useQueryClient } from '@tanstack/react-query'
import {
  signInWithEmailAndPassword,
  setPersistence,
  browserLocalPersistence,
} from 'firebase/auth'
import { auth } from '../config/firebase-config'
import {
  EmailPasswordCredentials,
  SignInResponse,
  mapFirebaseUser,
} from '../types/auth.types'
import { AUTH_KEYS, PROFILE_KEYS } from '../constants/query-keys'
import { handleAuthError, validateUserProfile } from '../utils/auth-utils'

export function useSignInEmailPassword() {
  const queryClient = useQueryClient()

  return useMutation({
    retry: false,
    mutationFn: async (credentials: EmailPasswordCredentials) => {
      if (!auth) {
        throw new Error(
          'Sign-in service is not ready. Please refresh the page and try again.'
        )
      }

      let signInResult: SignInResponse
      try {
        await setPersistence(auth, browserLocalPersistence)
        const userCredential = await signInWithEmailAndPassword(
          auth,
          credentials.email,
          credentials.password
        )

        signInResult = {
          user: mapFirebaseUser(userCredential.user),
          providerId: userCredential.providerId || 'password',
        }
      } catch (error: any) {
        throw handleAuthError(error)
      }

      const profile = await validateUserProfile(signInResult.user.uid)
      return { signInResult, profile }
    },
    onSuccess: async (data: { signInResult: SignInResponse; profile: any }) => {
      queryClient.invalidateQueries({ queryKey: AUTH_KEYS.currentUser })
      queryClient.invalidateQueries({ queryKey: AUTH_KEYS.authState })

      if (data.profile) {
        queryClient.setQueryData(
          PROFILE_KEYS.profile(data.signInResult.user.uid),
          data.profile
        )
      }
    },
    onError: (error: Error) => {
      // Error is handled by useAuth hook and displayed in UI
      // Only log in development for debugging
      if (process.env.NODE_ENV === 'development') {
        console.error('Sign in with email/password failed:', error.message)
      }
    },
  })
}
