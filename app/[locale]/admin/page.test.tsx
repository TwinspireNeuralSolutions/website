import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen, waitFor, fireEvent } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import AdminLogin from './page'
import { useAuth } from '@/hooks/useAuth'
import { useGetProfile } from '@/services/firebase/queries/useGetProfile'
import { useIsTeamManager } from '@/hooks/useIsTeamManager'
import { useRouter, useParams } from 'next/navigation'
import { authRateLimiter } from '@/lib/security'

vi.mock('@/hooks/useAuth')
vi.mock('@/services/firebase/queries/useGetProfile')
vi.mock('@/hooks/useIsTeamManager')
vi.mock('next/navigation')

const mockUseAuth = vi.mocked(useAuth)
const mockUseGetProfile = vi.mocked(useGetProfile)
const mockUseIsTeamManager = vi.mocked(useIsTeamManager)
const mockUseRouter = vi.mocked(useRouter)
const mockUseParams = vi.mocked(useParams)

const push = vi.fn()
const signInWithEmail = vi.fn()

function mockAuth({
  isAuthenticated = false,
  isLoading = false,
}: { isAuthenticated?: boolean; isLoading?: boolean } = {}) {
  mockUseAuth.mockReturnValue({
    user: isAuthenticated ? { uid: 'user-1' } : null,
    isAuthenticated,
    isLoading,
    signInWithEmail,
    signInWithGoogle: vi.fn(),
    signInWithApple: vi.fn(),
    isSigningIn: false,
    emailSignIn: { isLoading: false, error: null },
    googleSignIn: { isLoading: false, error: null },
    appleSignIn: { isLoading: false, error: null },
  } as unknown as ReturnType<typeof useAuth>)
}

describe('AdminLogin', () => {
  beforeEach(() => {
    push.mockClear()
    signInWithEmail.mockReset()
    mockUseRouter.mockReturnValue({ push } as unknown as ReturnType<
      typeof useRouter
    >)
    mockUseParams.mockReturnValue({ locale: 'en' })
    mockUseGetProfile.mockReturnValue({
      data: null,
      isLoading: false,
    } as ReturnType<typeof useGetProfile>)
    mockUseIsTeamManager.mockReturnValue(false)
    mockAuth()
    authRateLimiter.reset('anonymous')
  })

  it('renders the email/password login form', () => {
    render(<AdminLogin />)

    expect(screen.getByLabelText('Email address')).toBeInTheDocument()
    expect(screen.getByLabelText('Password')).toBeInTheDocument()
    expect(
      screen.getByRole('button', { name: 'Sign in with email' })
    ).toBeInTheDocument()
  })

  it('shows a validation error and does not sign in when the form is empty', async () => {
    // The email/password inputs are `required`, so a real button click would
    // be blocked by native HTML5 constraint validation before the app's own
    // validation ever runs. Dispatch the submit event directly to exercise
    // useAdminLogin's validation logic, same as it would for e.g. an
    // autofilled-then-cleared field.
    render(<AdminLogin />)

    fireEvent.submit(screen.getByLabelText('Email address').closest('form')!)

    expect(signInWithEmail).not.toHaveBeenCalled()
    await waitFor(() =>
      expect(
        screen.getByText('Please enter both email and password')
      ).toBeInTheDocument()
    )
  })

  it('shows the sign-in error returned by useAuth', async () => {
    signInWithEmail.mockResolvedValue({
      success: false,
      error: 'Invalid credentials',
    })
    const user = userEvent.setup()
    render(<AdminLogin />)

    await user.type(
      screen.getByLabelText('Email address'),
      'manager@twinspire.ai'
    )
    await user.type(screen.getByLabelText('Password'), 'wrong-password')
    await user.click(screen.getByRole('button', { name: 'Sign in with email' }))

    await waitFor(() =>
      expect(screen.getByText('Invalid credentials')).toBeInTheDocument()
    )
  })

  it('redirects to the dashboard once an authenticated manager profile resolves', async () => {
    mockAuth({ isAuthenticated: true })
    mockUseGetProfile.mockReturnValue({
      data: { uid: 'user-1', role: 'team-manager' },
      isLoading: false,
    } as ReturnType<typeof useGetProfile>)
    mockUseIsTeamManager.mockReturnValue(true)

    render(<AdminLogin />)

    await waitFor(() =>
      expect(push).toHaveBeenCalledWith('/en/admin/dashboard')
    )
  })
})
