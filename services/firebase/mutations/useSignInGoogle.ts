import { signInWithPopup } from 'firebase/auth'
import { getGoogleProvider } from '../config/auth-config'
import { mapFirebaseUser } from '../types/auth.types'
import {
  handleOAuthError,
  isNewUser,
  handleNewUserRejection,
} from '../utils/auth-utils'
import { useSignInCore } from './useSignInCore'

export function useSignInGoogle() {
  return useSignInCore({
    acquireCredential: async (auth) => {
      const provider = getGoogleProvider()
      const userCredential = await signInWithPopup(auth, provider)

      if (isNewUser(userCredential.user)) {
        await handleNewUserRejection(userCredential.user)
      }

      return {
        user: mapFirebaseUser(userCredential.user),
        providerId: userCredential.user.providerId || 'google.com',
      }
    },
    mapError: (error) => handleOAuthError(error, 'google.com'),
    logLabel: 'Sign in with Google',
  })
}
