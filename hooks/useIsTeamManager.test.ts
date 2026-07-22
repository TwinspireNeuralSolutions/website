import { describe, it, expect, vi, beforeEach } from 'vitest'
import { renderHook } from '@testing-library/react'
import { useIsTeamManager } from './useIsTeamManager'
import { useAuth } from './useAuth'
import { useGetProfile } from '@/services/firebase/queries/useGetProfile'

vi.mock('./useAuth')
vi.mock('@/services/firebase/queries/useGetProfile')

const mockUseAuth = vi.mocked(useAuth)
const mockUseGetProfile = vi.mocked(useGetProfile)

function mockProfile(data: unknown) {
  mockUseGetProfile.mockReturnValue({ data } as ReturnType<
    typeof useGetProfile
  >)
}

describe('useIsTeamManager', () => {
  beforeEach(() => {
    mockUseAuth.mockReturnValue({
      user: { uid: 'user-1' },
    } as ReturnType<typeof useAuth>)
  })

  it.each(['team-manager', 'team', 'manager'])(
    'returns true for an allowed role (%s), fetching its own profile',
    (role) => {
      mockProfile({ uid: 'user-1', role })
      const { result } = renderHook(() => useIsTeamManager())
      expect(result.current).toBe(true)
    }
  )

  it('returns false for a disallowed role', () => {
    mockProfile({ uid: 'user-1', role: 'viewer' })
    const { result } = renderHook(() => useIsTeamManager())
    expect(result.current).toBe(false)
  })

  it('returns false when the profile has no role', () => {
    mockProfile({ uid: 'user-1' })
    const { result } = renderHook(() => useIsTeamManager())
    expect(result.current).toBe(false)
  })

  it('returns false when there is no profile yet', () => {
    mockProfile(null)
    const { result } = renderHook(() => useIsTeamManager())
    expect(result.current).toBe(false)
  })

  it('uses an explicitly passed profile instead of fetching one', () => {
    mockProfile({ uid: 'user-1', role: 'viewer' })
    const { result } = renderHook(() =>
      useIsTeamManager({ uid: 'user-1', role: 'manager' })
    )
    expect(result.current).toBe(true)
  })

  it('treats an explicitly passed null profile as not a manager', () => {
    mockProfile({ uid: 'user-1', role: 'manager' })
    const { result } = renderHook(() => useIsTeamManager(null))
    expect(result.current).toBe(false)
  })
})
