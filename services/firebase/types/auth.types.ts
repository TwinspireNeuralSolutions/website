import { User as FirebaseUser } from 'firebase/auth'

/**
 * Supported authentication providers
 */
export enum AuthProvider {
  EMAIL_PASSWORD = 'email_password',
  GOOGLE = 'google',
  APPLE = 'apple',
}

/**
 * Extended user type with additional metadata
 */
export interface AuthUser {
  uid: string
  email: string | null
  displayName: string | null
  photoURL: string | null
  provider: AuthProvider | null
  emailVerified: boolean
  metadata: {
    creationTime?: string
    lastSignInTime?: string
  }
}

/**
 * Sign-in credentials for email/password
 */
export interface EmailPasswordCredentials {
  email: string
  password: string
}

/**
 * Authentication state
 */
export interface AuthState {
  user: AuthUser | null
  loading: boolean
  error: Error | null
}

/**
 * Sign-in response
 */
export interface SignInResponse {
  user: AuthUser
  providerId: string
}

/**
 * Convert Firebase User to AuthUser
 */
export function mapFirebaseUser(firebaseUser: FirebaseUser): AuthUser {
  // Determine which provider was used
  let provider: AuthProvider | null = null
  if (firebaseUser.providerData.length > 0) {
    const providerId = firebaseUser.providerData[0].providerId
    switch (providerId) {
      case 'password':
        provider = AuthProvider.EMAIL_PASSWORD
        break
      case 'google.com':
        provider = AuthProvider.GOOGLE
        break
      case 'apple.com':
        provider = AuthProvider.APPLE
        break
    }
  }

  return {
    uid: firebaseUser.uid,
    email: firebaseUser.email,
    displayName: firebaseUser.displayName,
    photoURL: firebaseUser.photoURL,
    provider,
    emailVerified: firebaseUser.emailVerified,
    metadata: {
      creationTime: firebaseUser.metadata.creationTime,
      lastSignInTime: firebaseUser.metadata.lastSignInTime,
    },
  }
}

