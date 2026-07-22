import { signInWithPopup } from 'firebase/auth'
import { getAppleProvider } from '../config/auth-config'
import { mapFirebaseUser } from '../types/auth.types'
import {
  handleOAuthError,
  isNewUser,
  handleNewUserRejection,
} from '../utils/auth-utils'
import { useSignInCore } from './useSignInCore'

export function useSignInApple() {
  return useSignInCore({
    acquireCredential: async (auth) => {
      const provider = getAppleProvider()
      const userCredential = await signInWithPopup(auth, provider)

      if (isNewUser(userCredential.user)) {
        await handleNewUserRejection(userCredential.user)
      }

      return {
        user: mapFirebaseUser(userCredential.user),
        providerId: userCredential.user.providerId || 'apple.com',
      }
    },
    mapError: (error) => handleOAuthError(error, 'apple.com'),
    logLabel: 'Sign in with Apple',
  })
}
