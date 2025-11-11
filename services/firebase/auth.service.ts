import {
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut as firebaseSignOut,
  onAuthStateChanged,
  User as FirebaseUser,
  setPersistence,
  browserLocalPersistence,
  UserCredential,
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
   * Sign in with Google
   * Opens popup for Google authentication
   */
  async signInWithGoogle(): Promise<SignInResponse> {
    if (!auth) {
      throw new Error('Firebase auth not initialized')
    }

    try {
      const provider = getGoogleProvider()
      const userCredential = await signInWithPopup(auth, provider)

      return {
        user: mapFirebaseUser(userCredential.user),
        providerId: userCredential.providerId || 'google.com',
      }
    } catch (error: any) {
      throw this.handleAuthError(error)
    }
  }

  /**
   * Sign in with Apple
   * Opens popup for Apple authentication
   */
  async signInWithApple(): Promise<SignInResponse> {
    if (!auth) {
      throw new Error('Firebase auth not initialized')
    }

    try {
      const provider = getAppleProvider()
      const userCredential = await signInWithPopup(auth, provider)

      return {
        user: mapFirebaseUser(userCredential.user),
        providerId: userCredential.providerId || 'apple.com',
      }
    } catch (error: any) {
      throw this.handleAuthError(error)
    }
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

// Export singleton instance
export const authService = new AuthService()
