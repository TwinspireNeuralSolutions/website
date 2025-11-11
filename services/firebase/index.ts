export { authService } from './auth.service'
export { app, auth } from './config/firebase-config'
export {
  getGoogleProvider,
  getAppleProvider,
  AUTH_CONFIG,
} from './config/auth-config'

export type {
  AuthUser,
  EmailPasswordCredentials,
  SignInResponse,
  AuthState,
} from './types/auth.types'
export { AuthProvider, mapFirebaseUser } from './types/auth.types'

export {
  useCurrentUser,
  useAuthStateSync,
  useIsAuthenticated,
} from './queries/auth-queries'

export {
  useSignInWithEmailPassword,
  useSignInWithGoogle,
  useSignInWithApple,
  useSignOut,
  AUTH_KEYS,
} from './mutations/auth-mutations'
