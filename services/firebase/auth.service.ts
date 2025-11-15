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
      // Enhanced error logging for production debugging
      const errorCode = error?.code || error?.name || 'unknown'
      const errorMessage = error?.message || 'Unknown error'

      // Log error details for debugging (sanitized for production)
      if (typeof window !== 'undefined') {
        console.error(`OAuth sign-in error [${providerId}]:`, {
          code: errorCode,
          message: errorMessage,
          // Only log full error in development
          ...(process.env.NODE_ENV === 'development' && { fullError: error }),
        })
      }

      throw this.handleAuthError(error)
    }
  }

  /**
   * Sign in with Google
   * Opens popup for Google authentication
   * Only allows existing users - new users are rejected
   */
  async signInWithGoogle(): Promise<SignInResponse> {
    if (!auth) {
      const error = new Error(
        'Firebase authentication is not initialized. Please refresh the page and try again.'
      )
      error.name = 'auth/not-initialized'
      throw error
    }

    try {
      const provider = getGoogleProvider()
      return await this.signInWithOAuth(provider, 'google.com')
    } catch (error: any) {
      // Re-throw if it's already been handled
      if (error.name && error.name.startsWith('auth/')) {
        throw error
      }
      // Otherwise, handle it
      throw this.handleAuthError(error)
    }
  }

  /**
   * Sign in with Apple
   * Opens popup for Apple authentication
   * Only allows existing users - new users are rejected
   */
  async signInWithApple(): Promise<SignInResponse> {
    if (!auth) {
      const error = new Error(
        'Firebase authentication is not initialized. Please refresh the page and try again.'
      )
      error.name = 'auth/not-initialized'
      throw error
    }

    try {
      const provider = getAppleProvider()
      return await this.signInWithOAuth(provider, 'apple.com')
    } catch (error: any) {
      // Re-throw if it's already been handled
      if (error.name && error.name.startsWith('auth/')) {
        throw error
      }
      // Otherwise, handle it
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
    // Extract error code from various possible locations
    const errorCode =
      error?.code || error?.name || error?.errorCode || 'unknown'

    // Check for nested error objects (common in Firebase)
    const nestedCode = error?.error?.code || error?.error?.message
    const finalErrorCode = nestedCode || errorCode

    const errorMessage =
      AUTH_CONFIG.errorMessages[
        finalErrorCode as keyof typeof AUTH_CONFIG.errorMessages
      ] || AUTH_CONFIG.errorMessages.default

    const customError = new Error(errorMessage)
    customError.name = finalErrorCode

    // Log error details for debugging (sanitized for production)
    if (typeof window !== 'undefined') {
      console.error('Auth error:', {
        code: finalErrorCode,
        message: errorMessage,
        // Only log full error details in development
        ...(process.env.NODE_ENV === 'development' && {
          originalError: error,
          stack: error?.stack,
        }),
      })
    }

    return customError
  }
}

export const authService = new AuthService()
