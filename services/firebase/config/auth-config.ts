import { AuthProvider } from 'firebase/auth'
import { GoogleAuthProvider, OAuthProvider } from 'firebase/auth'

/**
 * Google OAuth provider configuration
 */
export function getGoogleProvider(): AuthProvider {
  const provider = new GoogleAuthProvider()
  
  // Add custom parameters if needed
  provider.setCustomParameters({
    prompt: 'select_account', // Force account selection
  })

  // Request additional scopes if needed
  provider.addScope('profile')
  provider.addScope('email')

  return provider
}

/**
 * Apple OAuth provider configuration
 */
export function getAppleProvider(): AuthProvider {
  const provider = new OAuthProvider('apple.com')
  
  // Add custom parameters if needed
  provider.addScope('email')
  provider.addScope('name')
  
  // Set language
  provider.setCustomParameters({
    locale: 'en',
  })

  return provider
}

/**
 * Authentication configuration constants
 */
export const AUTH_CONFIG = {
  // Persistence type (defaults to 'local' for remember me functionality)
  persistence: 'local' as const,
  
  // Session timeout (optional - Firebase handles this)
  sessionTimeout: 3600000, // 1 hour in milliseconds
  
  // Redirect URLs (for OAuth flows)
  redirectUrls: {
    success: '/',
    error: '/auth/error',
  },
  
  // Error messages for sign-in only (no sign-up, no password reset)
  errorMessages: {
    'auth/user-not-found': 'No account found with this email. Please contact support.',
    'auth/wrong-password': 'Incorrect password. Please try again.',
    'auth/invalid-email': 'Invalid email address format.',
    'auth/user-disabled': 'This account has been disabled. Please contact support.',
    'auth/too-many-requests': 'Too many failed attempts. Please try again later.',
    'auth/network-request-failed': 'Network error. Please check your connection.',
    'auth/popup-closed-by-user': 'Sign-in cancelled. Please try again.',
    'auth/cancelled-popup-request': 'Sign-in cancelled. Please try again.',
    'auth/popup-blocked': 'Popup blocked by browser. Please allow popups and try again.',
    'auth/account-exists-with-different-credential': 'An account already exists with this email using a different sign-in method.',
    'auth/invalid-credential': 'Invalid credentials. Please check your email and password.',
    'auth/operation-not-allowed': 'This sign-in method is not enabled. Please contact support.',
    default: 'An error occurred during sign-in. Please try again.',
  },
} as const

