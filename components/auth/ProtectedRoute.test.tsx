import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen, waitFor } from '@testing-library/react'
import { ProtectedRoute } from './ProtectedRoute'
import { useAuth } from '@/hooks/useAuth'
import { useGetProfile } from '@/services/firebase/queries/useGetProfile'
import { useIsTeamManager } from '@/hooks/useIsTeamManager'
import { useRouter } from 'next/navigation'

vi.mock('@/hooks/useAuth')
vi.mock('@/services/firebase/queries/useGetProfile')
vi.mock('@/hooks/useIsTeamManager')
vi.mock('next/navigation')

const mockUseAuth = vi.mocked(useAuth)
const mockUseGetProfile = vi.mocked(useGetProfile)
const mockUseIsTeamManager = vi.mocked(useIsTeamManager)
const mockUseRouter = vi.mocked(useRouter)

const push = vi.fn()

function setAuthState({
  isAuthenticated,
  isLoading = false,
  isProfileLoading = false,
  isManager = false,
}: {
  isAuthenticated: boolean
  isLoading?: boolean
  isProfileLoading?: boolean
  isManager?: boolean
}) {
  mockUseAuth.mockReturnValue({
    isAuthenticated,
    isLoading,
    user: isAuthenticated ? { uid: 'user-1' } : null,
  } as ReturnType<typeof useAuth>)
  mockUseGetProfile.mockReturnValue({
    data: null,
    isLoading: isProfileLoading,
  } as ReturnType<typeof useGetProfile>)
  mockUseIsTeamManager.mockReturnValue(isManager)
}

describe('ProtectedRoute', () => {
  beforeEach(() => {
    push.mockClear()
    mockUseRouter.mockReturnValue({ push } as unknown as ReturnType<
      typeof useRouter
    >)
  })

  it('renders children for an authenticated team manager', () => {
    setAuthState({ isAuthenticated: true, isManager: true })

    render(
      <ProtectedRoute>
        <div>Dashboard content</div>
      </ProtectedRoute>
    )

    expect(screen.getByText('Dashboard content')).toBeInTheDocument()
    expect(push).not.toHaveBeenCalled()
  })

  it('shows a loading state while auth is resolving', () => {
    setAuthState({ isAuthenticated: false, isLoading: true })

    render(
      <ProtectedRoute>
        <div>Dashboard content</div>
      </ProtectedRoute>
    )

    expect(screen.queryByText('Dashboard content')).not.toBeInTheDocument()
    expect(screen.getByText('Loading...')).toBeInTheDocument()
  })

  it('redirects to the default path when unauthenticated', async () => {
    setAuthState({ isAuthenticated: false })

    render(
      <ProtectedRoute>
        <div>Dashboard content</div>
      </ProtectedRoute>
    )

    await waitFor(() => expect(push).toHaveBeenCalledWith('/sign-in'))
    expect(screen.queryByText('Dashboard content')).not.toBeInTheDocument()
  })

  it('redirects an authenticated non-manager to the given redirectTo', async () => {
    setAuthState({ isAuthenticated: true, isManager: false })

    render(
      <ProtectedRoute redirectTo="/en/admin">
        <div>Dashboard content</div>
      </ProtectedRoute>
    )

    await waitFor(() => expect(push).toHaveBeenCalledWith('/en/admin'))
    expect(screen.queryByText('Dashboard content')).not.toBeInTheDocument()
  })
})
