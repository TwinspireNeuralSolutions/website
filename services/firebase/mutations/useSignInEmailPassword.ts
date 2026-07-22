import {
  signInWithEmailAndPassword,
  setPersistence,
  browserLocalPersistence,
} from 'firebase/auth'
import { EmailPasswordCredentials, mapFirebaseUser } from '../types/auth.types'
import { handleAuthError } from '../utils/auth-utils'
import { useSignInCore } from './useSignInCore'

export function useSignInEmailPassword() {
  return useSignInCore<EmailPasswordCredentials>({
    acquireCredential: async (auth, credentials) => {
      await setPersistence(auth, browserLocalPersistence)
      const userCredential = await signInWithEmailAndPassword(
        auth,
        credentials.email,
        credentials.password
      )

      return {
        user: mapFirebaseUser(userCredential.user),
        providerId: userCredential.providerId || 'password',
      }
    },
    mapError: handleAuthError,
    logLabel: 'Sign in with email/password',
  })
}
