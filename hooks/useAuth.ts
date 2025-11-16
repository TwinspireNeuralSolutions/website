import { useGetCurrentUser } from '@/services/firebase/queries/useGetCurrentUser'
import { useSignInEmailPassword } from '@/services/firebase/mutations/useSignInEmailPassword'
import { useSignInGoogle } from '@/services/firebase/mutations/useSignInGoogle'
import { useSignInApple } from '@/services/firebase/mutations/useSignInApple'
import { useSignOut } from '@/services/firebase/mutations/useSignOut'

/**
 * Extracts error message from various error types
 */
function extractErrorMessage(error: unknown, defaultMessage: string): string {
  if (error instanceof Error) {
    return error.message || error.name || defaultMessage
  }
  if (typeof error === 'object' && error !== null) {
    const err = error as any
    return err?.message || err?.code || err?.error?.message || defaultMessage
  }
  return defaultMessage
}

/**
 * Creates a wrapper function for sign-in mutations that returns a consistent result format
 */
function createSignInHandler<T extends any[]>(
  mutation: { mutateAsync: (...args: T) => Promise<{ signInResult: any }> },
  defaultErrorMessage: string
) {
  return async (...args: T) => {
    try {
      const result = await mutation.mutateAsync(...args)
      return { success: true as const, data: result.signInResult }
    } catch (error) {
      return {
        success: false as const,
        error: extractErrorMessage(error, defaultErrorMessage),
      }
    }
  }
}

export function useAuth() {
  const { data: user, isLoading } = useGetCurrentUser()

  const signInEmailMutation = useSignInEmailPassword()
  const signInGoogleMutation = useSignInGoogle()
  const signInAppleMutation = useSignInApple()
  const signOutMutation = useSignOut()

  const signInWithEmail = createSignInHandler(
    signInEmailMutation,
    'Sign in failed'
  )
  const signInWithGoogle = createSignInHandler(
    signInGoogleMutation,
    'Google sign in failed'
  )
  const signInWithApple = createSignInHandler(
    signInAppleMutation,
    'Apple sign in failed'
  )

  const signOut = async () => {
    try {
      await signOutMutation.mutateAsync()
      return { success: true as const }
    } catch (error) {
      return {
        success: false as const,
        error: extractErrorMessage(error, 'Sign out failed'),
      }
    }
  }

  const isSigningIn =
    signInEmailMutation.isPending ||
    signInGoogleMutation.isPending ||
    signInAppleMutation.isPending

  return {
    user,
    isAuthenticated: !!user,
    isLoading,
    signInWithEmail,
    signInWithGoogle,
    signInWithApple,
    signOut,
    isSigningIn,
    isSigningOut: signOutMutation.isPending,
    emailSignIn: {
      isLoading: signInEmailMutation.isPending,
      error: signInEmailMutation.error,
    },
    googleSignIn: {
      isLoading: signInGoogleMutation.isPending,
      error: signInGoogleMutation.error,
    },
    appleSignIn: {
      isLoading: signInAppleMutation.isPending,
      error: signInAppleMutation.error,
    },
  }
}
