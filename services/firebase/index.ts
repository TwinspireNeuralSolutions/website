/**
 * Firebase Authentication Service - Main Export File
 * 
 * This file provides convenient exports for all authentication-related
 * functionality. Import from here for cleaner code.
 * 
 * @example
 * ```tsx
 * // Instead of multiple imports:
 * import { authService } from '@/services/firebase/auth.service'
 * import { useSignInWithGoogle } from '@/services/firebase/mutations/auth-mutations'
 * 
 * // Use single import:
 * import { authService, useSignInWithGoogle } from '@/services/firebase'
 * ```
 */

// Core service
export { authService } from './auth.service'

// Firebase config
export { app, auth } from './config/firebase-config'

// Auth configuration
export { getGoogleProvider, getAppleProvider, AUTH_CONFIG } from './config/auth-config'

// Types
export type {
  AuthUser,
  EmailPasswordCredentials,
  SignInResponse,
  AuthState,
} from './types/auth.types'
export { AuthProvider, mapFirebaseUser } from './types/auth.types'

// Queries
export {
  useCurrentUser,
  useAuthStateSync,
  useIsAuthenticated,
} from './queries/auth-queries'

// Mutations
export {
  useSignInWithEmailPassword,
  useSignInWithGoogle,
  useSignInWithApple,
  useSignOut,
  AUTH_KEYS,
} from './mutations/auth-mutations'
