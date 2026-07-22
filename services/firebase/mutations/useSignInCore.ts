import { useMutation, useQueryClient } from '@tanstack/react-query'
import { Auth } from 'firebase/auth'
import { auth } from '../config/firebase-config'
import { SignInResponse, TwinspireProfile } from '../types/auth.types'
import { AUTH_KEYS, PROFILE_KEYS } from '../constants/query-keys'
import {
  createAuthNotInitializedError,
  validateUserProfile,
} from '../utils/auth-utils'

interface SignInCoreConfig<TVariables> {
  /** Acquires the Firebase credential for this provider and maps it to a SignInResponse */
  acquireCredential: (
    auth: Auth,
    variables: TVariables
  ) => Promise<SignInResponse>
  /** Maps a raw Firebase/acquisition error to a user-facing Error */
  mapError: (error: any) => Error
  /** Label used in the dev-only console.error on mutation failure */
  logLabel: string
}

/**
 * Shared lifecycle for all sign-in mutations: guards on Firebase readiness, delegates
 * credential acquisition and error mapping to the caller, validates the resulting
 * profile, and seeds the TanStack Query cache on success.
 */
export function useSignInCore<TVariables = void>({
  acquireCredential,
  mapError,
  logLabel,
}: SignInCoreConfig<TVariables>) {
  const queryClient = useQueryClient()

  return useMutation({
    retry: false,
    mutationFn: async (variables: TVariables) => {
      if (!auth) {
        throw createAuthNotInitializedError()
      }

      let signInResult: SignInResponse
      try {
        signInResult = await acquireCredential(auth, variables)
      } catch (error: any) {
        throw mapError(error)
      }

      const profile = await validateUserProfile(signInResult.user.uid)
      return { signInResult, profile }
    },
    onSuccess: async (data: {
      signInResult: SignInResponse
      profile: TwinspireProfile
    }) => {
      queryClient.invalidateQueries({ queryKey: AUTH_KEYS.currentUser })
      queryClient.invalidateQueries({ queryKey: AUTH_KEYS.authState })

      if (data.profile) {
        queryClient.setQueryData(
          PROFILE_KEYS.profile(data.signInResult.user.uid),
          data.profile
        )
      }
    },
    onError: (error: Error) => {
      if (process.env.NODE_ENV === 'development') {
        console.error(`${logLabel} failed:`, error.message)
      }
    },
  })
}
