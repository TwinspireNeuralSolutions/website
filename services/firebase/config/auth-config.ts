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
      "We couldn't find a team account with this email. Please contact us at support@yourcompany.com to set up your team account.",
    'auth/wrong-password': 'Incorrect password. Please try again.',
    'auth/invalid-email': 'Invalid email address format.',
    'auth/user-disabled':
      'This account has been disabled. Please contact support.',
    'auth/too-many-requests':
      'Too many failed attempts. Please try again later.',
    'auth/network-request-failed':
      'Network error. Please check your connection and try again.',
    'auth/popup-closed-by-user': 'Sign-in cancelled. Please try again.',
    'auth/cancelled-popup-request': 'Sign-in cancelled. Please try again.',
    'auth/popup-blocked':
      'Popup blocked by browser. Please allow popups and try again.',
    'auth/account-exists-with-different-credential':
      'An account already exists with this email using a different sign-in method.',
    'auth/invalid-credential':
      'Invalid credentials. Please check your email and password.',
    'auth/operation-not-allowed':
      'OAuth sign-in (Google/Apple) is not enabled. Please contact support.',
    'auth/unauthorized-domain':
      'This domain is not authorized for sign-in. Please contact support.',
    'auth/invalid-api-key':
      'Authentication configuration error. Please contact support.',
    'auth/app-not-authorized':
      'This app is not authorized. Please contact support.',
    'auth/configuration-not-found':
      'Authentication configuration error. Please contact support.',
    'auth/domain-config-required':
      'Domain configuration required. Please contact support.',
    'auth/not-initialized':
      'Authentication service is not ready. Please refresh the page and try again.',
    'auth/no-team-account':
      "You don't have a team account yet. Please reach out to us at support@yourcompany.com to get your team set up and gain access to the admin portal.",
    default: 'An error occurred during sign-in. Please try again.',
  },
} as const
