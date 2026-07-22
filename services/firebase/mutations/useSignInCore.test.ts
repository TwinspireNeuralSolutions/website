import { describe, it, expect, vi, beforeEach } from 'vitest'
import { renderHook, waitFor, act } from '@testing-library/react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import React from 'react'
import { useSignInCore } from './useSignInCore'
import { validateUserProfile } from '../utils/auth-utils'
import type * as AuthUtils from '../utils/auth-utils'
import { AUTH_KEYS, PROFILE_KEYS } from '../constants/query-keys'

const mockAuthState = vi.hoisted(() => ({ auth: {} as unknown }))

vi.mock('../config/firebase-config', () => {
  return {
    get auth() {
      return mockAuthState.auth
    },
  }
})

vi.mock('../utils/auth-utils', async (importOriginal) => {
  const actual = (await importOriginal()) as typeof AuthUtils
  return {
    ...actual,
    validateUserProfile: vi.fn(),
  }
})

const mockValidateUserProfile = vi.mocked(validateUserProfile)

function renderWithClient(hook: () => ReturnType<typeof useSignInCore>) {
  const queryClient = new QueryClient()
  const wrapper = ({ children }: { children: React.ReactNode }) =>
    React.createElement(QueryClientProvider, { client: queryClient }, children)
  const { result } = renderHook(hook, { wrapper })
  return { result, queryClient }
}

describe('useSignInCore', () => {
  beforeEach(() => {
    mockAuthState.auth = {}
    mockValidateUserProfile.mockReset()
  })

  it('throws a not-initialized error when auth is unavailable', async () => {
    mockAuthState.auth = undefined
    const acquireCredential = vi.fn()

    const { result } = renderWithClient(() =>
      useSignInCore({
        acquireCredential,
        mapError: (e) => e,
        logLabel: 'test',
      })
    )

    await act(async () => {
      await expect(result.current.mutateAsync(undefined)).rejects.toThrow(
        'Sign-in service is not ready. Please refresh the page and try again.'
      )
    })

    expect(acquireCredential).not.toHaveBeenCalled()
  })

  it('passes an acquisition error through mapError', async () => {
    const rawError = new Error('popup closed')
    const acquireCredential = vi.fn().mockRejectedValue(rawError)
    const mapError = vi.fn().mockReturnValue(new Error('mapped failure'))

    const { result } = renderWithClient(() =>
      useSignInCore({ acquireCredential, mapError, logLabel: 'test' })
    )

    await act(async () => {
      await expect(result.current.mutateAsync(undefined)).rejects.toThrow(
        'mapped failure'
      )
    })

    expect(mapError).toHaveBeenCalledWith(rawError)
  })

  it('seeds the query cache with the profile on success', async () => {
    const signInResult = {
      user: { uid: 'user-1' } as any,
      providerId: 'password',
    }
    const profile = { uid: 'user-1', role: 'team-manager' }
    mockValidateUserProfile.mockResolvedValue(profile as any)
    const acquireCredential = vi.fn().mockResolvedValue(signInResult)

    const { result, queryClient } = renderWithClient(() =>
      useSignInCore({
        acquireCredential,
        mapError: (e) => e,
        logLabel: 'test',
      })
    )
    const invalidateSpy = vi.spyOn(queryClient, 'invalidateQueries')

    await act(async () => {
      await result.current.mutateAsync(undefined)
    })

    await waitFor(() => {
      expect(queryClient.getQueryData(PROFILE_KEYS.profile('user-1'))).toEqual(
        profile
      )
    })
    expect(mockValidateUserProfile).toHaveBeenCalledWith('user-1')
    expect(invalidateSpy).toHaveBeenCalledWith({
      queryKey: AUTH_KEYS.currentUser,
    })
    expect(invalidateSpy).toHaveBeenCalledWith({
      queryKey: AUTH_KEYS.authState,
    })
  })
})
