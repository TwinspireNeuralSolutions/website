import { AuthProvider } from 'firebase/auth'
import { GoogleAuthProvider, OAuthProvider } from 'firebase/auth'

export function getGoogleProvider(): AuthProvider {
  const provider = new GoogleAuthProvider()

  provider.setCustomParameters({
    prompt: 'select_account',
  })

  provider.addScope('profile')
  provider.addScope('email')

  return provider
}

export function getAppleProvider(): AuthProvider {
  const provider = new OAuthProvider('apple.com')

  provider.addScope('email')
  provider.addScope('name')

  provider.setCustomParameters({
    locale: 'en',
  })

  return provider
}

export const AUTH_CONFIG = {
  persistence: 'local' as const,
  sessionTimeout: 3600000,
  redirectUrls: {
    success: '/',
    error: '/auth/error',
  },
  errorMessages: {
    'auth/user-not-found':
      'No account found with this email. Please contact support.',
    'auth/wrong-password': 'Incorrect password. Please try again.',
    'auth/invalid-email': 'Invalid email address format.',
    'auth/user-disabled':
      'This account has been disabled. Please contact support.',
    'auth/too-many-requests':
      'Too many failed attempts. Please try again later.',
    'auth/network-request-failed':
      'Network error. Please check your connection.',
    'auth/popup-closed-by-user': 'Sign-in cancelled. Please try again.',
    'auth/cancelled-popup-request': 'Sign-in cancelled. Please try again.',
    'auth/popup-blocked':
      'Popup blocked by browser. Please allow popups and try again.',
    'auth/account-exists-with-different-credential':
      'An account already exists with this email using a different sign-in method.',
    'auth/invalid-credential':
      'Invalid credentials. Please check your email and password.',
    'auth/operation-not-allowed':
      'This sign-in method is not enabled. Please contact support.',
    default: 'An error occurred during sign-in. Please try again.',
  },
} as const
