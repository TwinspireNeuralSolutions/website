import {
  useCurrentUser,
  useIsAuthenticated,
} from '@/services/firebase/queries/auth-queries'
import {
  useSignInWithEmailPassword,
  useSignInWithGoogle,
  useSignInWithApple,
  useSignOut,
} from '@/services/firebase/mutations/auth-mutations'
import { EmailPasswordCredentials } from '@/services/firebase/types/auth.types'

export function useAuth() {
  const { data: user, isLoading: isLoadingUser } = useCurrentUser()
  const { isAuthenticated, isLoading: isCheckingAuth } = useIsAuthenticated()

  const signInEmailMutation = useSignInWithEmailPassword()
  const signInGoogleMutation = useSignInWithGoogle()
  const signInAppleMutation = useSignInWithApple()
  const signOutMutation = useSignOut()

  const signInWithEmail = async (credentials: EmailPasswordCredentials) => {
    try {
      const result = await signInEmailMutation.mutateAsync(credentials)
      return { success: true, data: result }
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Sign in failed',
      }
    }
  }

  const signInWithGoogle = async () => {
    try {
      const result = await signInGoogleMutation.mutateAsync()
      return { success: true, data: result }
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Google sign in failed',
      }
    }
  }

  const signInWithApple = async () => {
    try {
      const result = await signInAppleMutation.mutateAsync()
      return { success: true, data: result }
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Apple sign in failed',
      }
    }
  }

  const signOut = async () => {
    try {
      await signOutMutation.mutateAsync()
      return { success: true }
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Sign out failed',
      }
    }
  }

  return {
    user,
    isAuthenticated,
    isLoading: isLoadingUser || isCheckingAuth,
    signInWithEmail,
    signInWithGoogle,
    signInWithApple,
    signOut,
    isSigningIn:
      signInEmailMutation.isPending ||
      signInGoogleMutation.isPending ||
      signInAppleMutation.isPending,
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
