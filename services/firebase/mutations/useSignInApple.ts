import { useMutation, useQueryClient } from '@tanstack/react-query'
import { signInWithPopup } from 'firebase/auth'
import { auth } from '../config/firebase-config'
import { getAppleProvider } from '../config/auth-config'
import { SignInResponse, mapFirebaseUser } from '../types/auth.types'
import { AUTH_KEYS, PROFILE_KEYS } from '../constants/query-keys'
import {
  createAuthNotInitializedError,
  handleOAuthError,
  isNewUser,
  handleNewUserRejection,
  validateUserProfile,
} from '../utils/auth-utils'

export function useSignInApple() {
  const queryClient = useQueryClient()

  return useMutation({
    retry: false,
    mutationFn: async () => {
      if (!auth) {
        throw createAuthNotInitializedError()
      }

      let signInResult: SignInResponse
      try {
        const provider = getAppleProvider()
        const userCredential = await signInWithPopup(auth, provider)

        if (isNewUser(userCredential.user)) {
          await handleNewUserRejection(userCredential.user)
        }

        signInResult = {
          user: mapFirebaseUser(userCredential.user),
          providerId: userCredential.user.providerId || 'apple.com',
        }
      } catch (error: any) {
        throw handleOAuthError(error, 'apple.com')
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
        console.error('Sign in with Apple failed:', error.message)
      }
    },
  })
}
