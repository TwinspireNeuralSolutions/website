import {
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut as firebaseSignOut,
  onAuthStateChanged,
  User as FirebaseUser,
  setPersistence,
  browserLocalPersistence,
  UserCredential,
  AuthProvider,
} from 'firebase/auth'
import { auth } from './config/firebase-config'
import {
  getGoogleProvider,
  getAppleProvider,
  AUTH_CONFIG,
} from './config/auth-config'
import {
  EmailPasswordCredentials,
  SignInResponse,
  mapFirebaseUser,
} from './types/auth.types'

/**
 * Core Authentication Service
 * Handles all Firebase authentication operations
 * SIGN-IN ONLY - No account creation or password reset
 */
class AuthService {
  /**
   * Sign in with email and password
   * Only works for existing accounts
   */
  async signInWithEmailPassword(
    credentials: EmailPasswordCredentials
  ): Promise<SignInResponse> {
    if (!auth) {
      throw new Error('Firebase auth not initialized')
    }

    try {
      // Set persistence to local (remember user)
      await setPersistence(auth, browserLocalPersistence)

      const userCredential: UserCredential = await signInWithEmailAndPassword(
        auth,
        credentials.email,
        credentials.password
      )

      return {
        user: mapFirebaseUser(userCredential.user),
        providerId: userCredential.providerId || 'password',
      }
    } catch (error: any) {
      throw this.handleAuthError(error)
    }
  }

  /**
   * Generic OAuth sign-in handler
   * Handles popup authentication and enforces login-only (no signup)
   * @private
   */
  private async signInWithOAuth(
    provider: AuthProvider,
    providerId: string
  ): Promise<SignInResponse> {
    if (!auth) {
      throw new Error('Firebase auth not initialized')
    }

    try {
      const userCredential = await signInWithPopup(auth, provider)

      // Check if this is a new user (OAuth providers auto-create accounts)
      const isNewUser =
        userCredential.user.metadata.creationTime ===
        userCredential.user.metadata.lastSignInTime

      if (isNewUser) {
        // Delete the newly created account
        await userCredential.user.delete()
        // Throw custom error for no team account
        const error = new Error(
          AUTH_CONFIG.errorMessages['auth/no-team-account']
        )
        error.name = 'auth/no-team-account'
        throw error
      }

      return {
        user: mapFirebaseUser(userCredential.user),
        providerId: userCredential.providerId || providerId,
      }
    } catch (error: any) {
      throw this.handleAuthError(error)
    }
  }

  /**
   * Sign in with Google
   * Opens popup for Google authentication
   * Only allows existing users - new users are rejected
   */
  async signInWithGoogle(): Promise<SignInResponse> {
    const provider = getGoogleProvider()
    return this.signInWithOAuth(provider, 'google.com')
  }

  /**
   * Sign in with Apple
   * Opens popup for Apple authentication
   * Only allows existing users - new users are rejected
   */
  async signInWithApple(): Promise<SignInResponse> {
    const provider = getAppleProvider()
    return this.signInWithOAuth(provider, 'apple.com')
  }

  /**
   * Sign out current user
   */
  async signOut(): Promise<void> {
    if (!auth) {
      throw new Error('Firebase auth not initialized')
    }

    try {
      await firebaseSignOut(auth)
    } catch (error: any) {
      throw this.handleAuthError(error)
    }
  }

  /**
   * Subscribe to authentication state changes
   * Returns unsubscribe function
   */
  onAuthStateChange(callback: (user: FirebaseUser | null) => void): () => void {
    if (!auth) {
      throw new Error('Firebase auth not initialized')
    }

    return onAuthStateChanged(auth, callback)
  }

  /**
   * Get current authenticated user
   */
  getCurrentUser(): FirebaseUser | null {
    if (!auth) {
      throw new Error('Firebase auth not initialized')
    }

    return auth.currentUser
  }

  /**
   * Handle authentication errors with user-friendly messages
   */
  private handleAuthError(error: any): Error {
    const errorCode = error.code || 'unknown'
    const errorMessage =
      AUTH_CONFIG.errorMessages[
        errorCode as keyof typeof AUTH_CONFIG.errorMessages
      ] || AUTH_CONFIG.errorMessages.default

    const customError = new Error(errorMessage)
    customError.name = errorCode

    // Only log in development to avoid exposing sensitive info
    if (process.env.NODE_ENV === 'development') {
      console.error('Auth error:', errorCode)
    }

    return customError
  }
}

export const authService = new AuthService()
