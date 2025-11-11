import { useMutation, useQueryClient } from '@tanstack/react-query'
import { authService } from '../auth.service'
import { EmailPasswordCredentials, SignInResponse } from '../types/auth.types'

/**
 * Query keys for authentication
 */
export const AUTH_KEYS = {
  currentUser: ['auth', 'currentUser'] as const,
  authState: ['auth', 'state'] as const,
}

/**
 * Sign in with email and password mutation
 */
export function useSignInWithEmailPassword() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (credentials: EmailPasswordCredentials) =>
      authService.signInWithEmailPassword(credentials),
    onSuccess: (data: SignInResponse) => {
      // Invalidate and refetch user data
      queryClient.invalidateQueries({ queryKey: AUTH_KEYS.currentUser })
      queryClient.invalidateQueries({ queryKey: AUTH_KEYS.authState })
    },
    onError: (error: Error) => {
      console.error('Sign in with email/password failed:', error.message)
    },
  })
}

/**
 * Sign in with Google mutation
 */
export function useSignInWithGoogle() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: () => authService.signInWithGoogle(),
    onSuccess: (data: SignInResponse) => {
      // Invalidate and refetch user data
      queryClient.invalidateQueries({ queryKey: AUTH_KEYS.currentUser })
      queryClient.invalidateQueries({ queryKey: AUTH_KEYS.authState })
    },
    onError: (error: Error) => {
      console.error('Sign in with Google failed:', error.message)
    },
  })
}

/**
 * Sign in with Apple mutation
 */
export function useSignInWithApple() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: () => authService.signInWithApple(),
    onSuccess: (data: SignInResponse) => {
      // Invalidate and refetch user data
      queryClient.invalidateQueries({ queryKey: AUTH_KEYS.currentUser })
      queryClient.invalidateQueries({ queryKey: AUTH_KEYS.authState })
    },
    onError: (error: Error) => {
      console.error('Sign in with Apple failed:', error.message)
    },
  })
}

/**
 * Sign out mutation
 */
export function useSignOut() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: () => authService.signOut(),
    onSuccess: () => {
      // Clear all queries on sign out
      queryClient.invalidateQueries({ queryKey: AUTH_KEYS.currentUser })
      queryClient.invalidateQueries({ queryKey: AUTH_KEYS.authState })

      // Optionally clear all cached data
      queryClient.clear()
    },
    onError: (error: Error) => {
      console.error('Sign out failed:', error.message)
    },
  })
}
