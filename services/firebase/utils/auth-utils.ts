import { AUTH_CONFIG } from '../config/auth-config'
import { User } from 'firebase/auth'
import { TwinspireProfile } from '../types/auth.types'
import { getUserProfile } from '../queries/useGetProfile'
import { signOut } from '../mutations/useSignOut'

/**
 * Creates an error with a specific name and message
 */
function createAuthError(message: string, name: string): Error {
  const error = new Error(message)
  error.name = name
  return error
}

/**
 * Logs error details in development mode
 */
function logError(
  context: string,
  error: any,
  errorCode: string,
  errorMessage: string
): void {
  if (typeof window !== 'undefined' && process.env.NODE_ENV === 'development') {
    console.error(`${context}:`, {
      code: errorCode,
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
}

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

  logError('Auth error', error, finalErrorCode, errorMessage)

  return createAuthError(errorMessage, finalErrorCode)
}

/**
 * Checks if a user is a new user based on their metadata
 */
export function isNewUser(user: User): boolean {
  return user.metadata.creationTime === user.metadata.lastSignInTime
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

  throw createAuthError(
    AUTH_CONFIG.errorMessages['auth/no-team-account'],
    'auth/no-team-account'
  )
}

/**
 * Handles OAuth popup cancellation errors
 */
export function handlePopupCancellation(error: any): Error | null {
  const cancelCodes = [
    'auth/popup-closed-by-user',
    'auth/cancelled-popup-request',
  ]

  if (cancelCodes.includes(error?.code)) {
    const message =
      AUTH_CONFIG.errorMessages[
        error.code as keyof typeof AUTH_CONFIG.errorMessages
      ] || AUTH_CONFIG.errorMessages['auth/popup-closed-by-user']
    return createAuthError(message, error.code)
  }

  return null
}

/**
 * Handles OAuth sign-in errors with provider-specific logging
 */
export function handleOAuthError(error: any, provider: string): Error {
  const cancelError = handlePopupCancellation(error)
  if (cancelError) {
    return cancelError
  }

  if (error instanceof Error && error.name === 'auth/no-team-account') {
    return error
  }

  const errorCode = error?.code || error?.name || 'unknown'
  const errorMessage = error?.message || String(error) || 'Unknown error'

  logError(`OAuth sign-in error [${provider}]`, error, errorCode, errorMessage)

  if (error.name && error.name.startsWith('auth/')) {
    return error
  }

  return handleAuthError(error)
}

/**
 * Creates a standardized error for auth not initialized
 */
export function createAuthNotInitializedError(): Error {
  return createAuthError(
    'Sign-in service is not ready. Please refresh the page and try again.',
    'auth/not-initialized'
  )
}

/**
 * Validates user profile and handles errors with sign-out if needed
 * @param uid - The user ID to fetch and validate profile for
 * @returns The validated profile
 * @throws Error if profile validation fails (will sign out before throwing)
 */
export async function validateUserProfile(
  uid: string
): Promise<TwinspireProfile> {
  try {
    const profile = await getUserProfile(uid)

    if (!profile || profile.role !== 'team-manager') {
      const error = createAuthError(
        AUTH_CONFIG.profileErrors.unauthorized,
        'auth/no-team-account'
      )
      await signOut()
      throw error
    }

    return profile
  } catch (error) {
    // If it's already a team account error, just sign out and re-throw
    if (error instanceof Error && error.name === 'auth/no-team-account') {
      await signOut()
      throw error
    }

    // For other errors, sign out and throw generic error
    await signOut()
    throw createAuthError(
      'We were unable to verify your account. Please try again. If the problem continues, contact us at info@twinspire.ai for assistance.',
      'auth/profile-verification-failed'
    )
  }
}
