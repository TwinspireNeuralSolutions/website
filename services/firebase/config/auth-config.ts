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
      "We couldn't find a team account with this email. If you're a team manager and need access, please contact us at info@twinspire.ai to set up your team account.",
    'auth/wrong-password':
      'Incorrect password. Please check your password and try again.',
    'auth/invalid-email': 'Please enter a valid email address.',
    'auth/user-disabled':
      'This account has been disabled. Please contact us at info@twinspire.ai for assistance.',
    'auth/too-many-requests':
      'Too many sign-in attempts. Please wait a few minutes and try again.',
    'auth/network-request-failed':
      'Unable to connect. Please check your internet connection and try again.',
    'auth/popup-closed-by-user':
      'Sign-in was cancelled. Please try again when ready.',
    'auth/cancelled-popup-request':
      'Sign-in was cancelled. Please try again when ready.',
    'auth/popup-blocked':
      'Your browser blocked the sign-in window. Please allow popups for this site and try again.',
    'auth/account-exists-with-different-credential':
      'An account with this email already exists using a different sign-in method. Please use the original sign-in method you used to create your account.',
    'auth/invalid-credential':
      'The email or password you entered is incorrect. Please check your credentials and try again.',
    'auth/operation-not-allowed':
      'Sign-in with Google or Apple is currently unavailable. Please contact us at info@twinspire.ai for assistance.',
    'auth/unauthorized-domain':
      'Sign-in is not available from this location. Please contact us at info@twinspire.ai for assistance.',
    'auth/invalid-api-key':
      "We're experiencing a technical issue. Please refresh the page and try again. If the problem persists, contact us at info@twinspire.ai.",
    'auth/app-not-authorized':
      "We're experiencing a technical issue. Please refresh the page and try again. If the problem persists, contact us at info@twinspire.ai.",
    'auth/configuration-not-found':
      "We're experiencing a technical issue. Please refresh the page and try again. If the problem persists, contact us at info@twinspire.ai.",
    'auth/domain-config-required':
      "We're experiencing a technical issue. Please refresh the page and try again. If the problem persists, contact us at info@twinspire.ai.",
    'auth/not-initialized':
      'Sign-in service is not ready. Please refresh the page and try again.',
    'auth/no-team-account':
      'This account is not authorized for team manager access. Only team managers can sign in. If you are a team manager and cannot sign in, please contact us at info@twinspire.ai for assistance.',
    default:
      'Something went wrong during sign-in. Please try again. If the problem continues, contact us at info@twinspire.ai.',
  },
  profileErrors: {
    unauthorized:
      'This account is not authorized for team manager access. Only team managers can sign in. If you are a team manager and cannot sign in, please contact us at info@twinspire.ai for assistance.',
  },
} as const
