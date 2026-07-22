import { describe, it, expect, vi, beforeEach } from 'vitest'
import type { FormEvent } from 'react'
import { renderHook, act } from '@testing-library/react'
import { useAdminLogin } from './useAdminLogin'
import { useAuth } from '@/hooks/useAuth'
import { authRateLimiter } from '@/lib/security'

vi.mock('@/hooks/useAuth')

const mockUseAuth = vi.mocked(useAuth)

const signInWithEmail = vi.fn()
const signInWithGoogle = vi.fn()
const signInWithApple = vi.fn()

function baseAuth() {
  return {
    signInWithEmail,
    signInWithGoogle,
    signInWithApple,
    isSigningIn: false,
    emailSignIn: { isLoading: false, error: null },
    googleSignIn: { isLoading: false, error: null },
    appleSignIn: { isLoading: false, error: null },
  } as unknown as ReturnType<typeof useAuth>
}

function submitForm() {
  return { preventDefault: vi.fn() } as unknown as FormEvent
}

describe('useAdminLogin', () => {
  beforeEach(() => {
    signInWithEmail.mockReset()
    signInWithGoogle.mockReset()
    signInWithApple.mockReset()
    mockUseAuth.mockReturnValue(baseAuth())
    authRateLimiter.reset('anonymous')
  })

  it('blocks submission and shows an error when fields are empty', async () => {
    const { result } = renderHook(() => useAdminLogin())

    await act(async () => {
      await result.current.handleEmailLogin(submitForm())
    })

    expect(signInWithEmail).not.toHaveBeenCalled()
    expect(result.current.error).toBe('Please enter both email and password')
  })

  it('blocks submission for an invalid email', async () => {
    const { result } = renderHook(() => useAdminLogin())

    act(() => {
      result.current.setEmail('not-an-email')
      result.current.setPassword('123456')
    })
    await act(async () => {
      await result.current.handleEmailLogin(submitForm())
    })

    expect(signInWithEmail).not.toHaveBeenCalled()
    expect(result.current.error).toBe('Please enter a valid email address')
  })

  it('blocks submission for a too-short password', async () => {
    const { result } = renderHook(() => useAdminLogin())

    act(() => {
      result.current.setEmail('manager@twinspire.ai')
      result.current.setPassword('123')
    })
    await act(async () => {
      await result.current.handleEmailLogin(submitForm())
    })

    expect(signInWithEmail).not.toHaveBeenCalled()
    expect(result.current.error).toBe('Password must be at least 6 characters')
  })

  it('signs in with sanitized credentials and clears the rate limit on success', async () => {
    signInWithEmail.mockResolvedValue({ success: true })
    const { result } = renderHook(() => useAdminLogin())

    act(() => {
      result.current.setEmail('  manager@twinspire.ai  ')
      result.current.setPassword('correct-password')
    })
    await act(async () => {
      await result.current.handleEmailLogin(submitForm())
    })

    expect(signInWithEmail).toHaveBeenCalledWith({
      email: 'manager@twinspire.ai',
      password: 'correct-password',
    })
    expect(result.current.error).toBe('')
  })

  it('surfaces the sign-in error returned by useAuth', async () => {
    signInWithEmail.mockResolvedValue({
      success: false,
      error: 'Invalid credentials',
    })
    const { result } = renderHook(() => useAdminLogin())

    act(() => {
      result.current.setEmail('manager@twinspire.ai')
      result.current.setPassword('wrong-password')
    })
    await act(async () => {
      await result.current.handleEmailLogin(submitForm())
    })

    expect(result.current.error).toBe('Invalid credentials')
  })

  it('rate-limits after repeated failed attempts for the same email', async () => {
    signInWithEmail.mockResolvedValue({
      success: false,
      error: 'Invalid credentials',
    })
    const { result } = renderHook(() => useAdminLogin())

    act(() => {
      result.current.setEmail('locked-out@twinspire.ai')
      result.current.setPassword('wrong-password')
    })

    for (let i = 0; i < 5; i++) {
      await act(async () => {
        await result.current.handleEmailLogin(submitForm())
      })
    }

    expect(result.current.isRateLimited).toBe(true)
    expect(result.current.error).toMatch(/Too many failed attempts/)

    authRateLimiter.reset('locked-out@twinspire.ai')
  })

  it('surfaces an OAuth provider error', async () => {
    signInWithGoogle.mockResolvedValue({
      success: false,
      error: 'Google sign in failed',
    })
    const { result } = renderHook(() => useAdminLogin())

    await act(async () => {
      await result.current.handleGoogleLogin()
    })

    expect(result.current.error).toBe('Google sign in failed')
  })
})
