import { describe, it, expect } from 'vitest'
import { isManagerRole, MANAGER_ROLES } from './auth-utils'

describe('isManagerRole', () => {
  it.each(MANAGER_ROLES)('returns true for an allowed role (%s)', (role) => {
    expect(isManagerRole(role)).toBe(true)
  })

  it('returns false for a disallowed role', () => {
    expect(isManagerRole('viewer')).toBe(false)
  })

  it('returns false for an undefined role', () => {
    expect(isManagerRole(undefined)).toBe(false)
  })

  it('returns false for a null role', () => {
    expect(isManagerRole(null)).toBe(false)
  })

  it('returns false for an empty string role', () => {
    expect(isManagerRole('')).toBe(false)
  })
})
