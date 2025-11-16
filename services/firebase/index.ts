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
  TwinspireProfile,
  UserWithProfile,
} from './types/auth.types'
export { AuthProvider, mapFirebaseUser } from './types/auth.types'

export { useGetCurrentUser } from './queries/useGetCurrentUser'
export { useGetIsAuthenticated } from './queries/useGetIsAuthenticated'
export { useAuthStateSync } from './queries/useAuthStateSync'
export { useGetProfile } from './queries/useGetProfile'

export { useSignInEmailPassword } from './mutations/useSignInEmailPassword'
export { useSignInGoogle } from './mutations/useSignInGoogle'
export { useSignInApple } from './mutations/useSignInApple'
export { useSignOut } from './mutations/useSignOut'

export { AUTH_KEYS, PROFILE_KEYS } from './constants/query-keys'
