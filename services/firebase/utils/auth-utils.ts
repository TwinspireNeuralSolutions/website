import { AUTH_CONFIG } from '../config/auth-config'
import { User } from 'firebase/auth'
import { TwinspireProfile } from '../types/auth.types'
import {
  validateTeamManagerProfile,
  isProfileValidationError,
} from './profile-validation'
import { getUserProfile } from '../queries/useGetProfile'
import { signOut } from '../mutations/useSignOut'

/**
 * Handles authentication errors and maps them to user-friendly error messages
 */
export function handleAuthError(error: any): Error {
  const errorCode = error?.code || error?.name || error?.errorCode || 'unknown'
  const nestedCode = error?.error?.code || error?.error?.message
  const finalErrorCode = nestedCode || errorCode

  const errorMessage =
    AUTH_CONFIG.errorMessages[
      finalErrorCode as keyof typeof AUTH_CONFIG.errorMessages
    ] || AUTH_CONFIG.errorMessages.default

  const customError = new Error(errorMessage)
  customError.name = finalErrorCode

  if (typeof window !== 'undefined' && process.env.NODE_ENV === 'development') {
    console.error('Auth error:', {
      code: finalErrorCode,
      message: errorMessage,
      originalError:
        error instanceof Error
          ? {
              name: error.name,
              message: error.message,
              stack: error.stack,
            }
          : error,
    })
  }

  return customError
}

/**
 * Checks if a user is a new user based on their metadata
 */
export function isNewUser(user: User): boolean {
  const creationTime = user.metadata.creationTime
  const lastSignInTime = user.metadata.lastSignInTime
  return creationTime === lastSignInTime
}

/**
 * Handles new user rejection by deleting the account and throwing an error
 */
export async function handleNewUserRejection(user: User): Promise<never> {
  try {
    await user.delete()
  } catch (deleteError: any) {
    if (process.env.NODE_ENV === 'development') {
      console.error('Failed to delete new user account:', deleteError)
    }
  }

  const error = new Error(AUTH_CONFIG.errorMessages['auth/no-team-account'])
  error.name = 'auth/no-team-account'
  throw error
}

/**
 * Handles OAuth popup cancellation errors
 */
export function handlePopupCancellation(error: any): Error | null {
  if (
    error?.code === 'auth/popup-closed-by-user' ||
    error?.code === 'auth/cancelled-popup-request'
  ) {
    const cancelError = new Error(
      AUTH_CONFIG.errorMessages[
        error.code as keyof typeof AUTH_CONFIG.errorMessages
      ] || AUTH_CONFIG.errorMessages['auth/popup-closed-by-user']
    )
    cancelError.name = error.code
    return cancelError
  }
  return null
}

/**
 * Handles OAuth sign-in errors with provider-specific logging
 */
export function handleOAuthError(error: any, provider: string): Error {
  // Handle popup cancellation
  const cancelError = handlePopupCancellation(error)
  if (cancelError) {
    return cancelError
  }

  // Handle new user rejection
  if (error instanceof Error && error.name === 'auth/no-team-account') {
    return error
  }

  const errorCode = error?.code || error?.name || 'unknown'
  const errorMessage = error?.message || String(error) || 'Unknown error'

  if (typeof window !== 'undefined' && process.env.NODE_ENV === 'development') {
    console.error(`OAuth sign-in error [${provider}]:`, {
      code: errorCode,
      message: errorMessage,
      error:
        error instanceof Error
          ? {
              name: error.name,
              message: error.message,
              stack: error.stack,
            }
          : error,
    })
  }

  // Don't retry on auth errors
  if (error.name && error.name.startsWith('auth/')) {
    return error
  }

  return handleAuthError(error)
}

/**
 * Creates a standardized error for auth not initialized
 */
export function createAuthNotInitializedError(): Error {
  const error = new Error(
    'Sign-in service is not ready. Please refresh the page and try again.'
  )
  error.name = 'auth/not-initialized'
  return error
}

/**
 * Validates user profile and handles errors with sign-out if needed
 * This is a common pattern used across all sign-in methods
 * @param uid - The user ID to fetch and validate profile for
 * @returns The validated profile
 * @throws Error if profile validation fails (will sign out before throwing)
 */
export async function validateUserProfile(
  uid: string
): Promise<TwinspireProfile> {
  try {
    const profile = await getUserProfile(uid)
    validateTeamManagerProfile(profile)
    return profile
  } catch (error) {
    if (isProfileValidationError(error)) {
      await signOut()
      throw error
    }
    await signOut()
    throw new Error(
      'We were unable to verify your account. Please try again. If the problem continues, contact us at info@twinspire.ai for assistance.'
    )
  }
}
