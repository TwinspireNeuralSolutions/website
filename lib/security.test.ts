import { describe, it, expect, beforeEach } from 'vitest'
import {
  isValidEmail,
  isValidPassword,
  sanitizeInput,
  formatTimeRemaining,
  authRateLimiter,
} from './security'

describe('isValidEmail', () => {
  it('accepts a well-formed email', () => {
    expect(isValidEmail('manager@twinspire.ai')).toBe(true)
  })

  it('accepts an email with surrounding whitespace', () => {
    expect(isValidEmail('  manager@twinspire.ai  ')).toBe(true)
  })

  it('rejects an email missing an @', () => {
    expect(isValidEmail('manager.twinspire.ai')).toBe(false)
  })

  it('rejects an email missing a domain', () => {
    expect(isValidEmail('manager@')).toBe(false)
  })

  it('rejects an empty string', () => {
    expect(isValidEmail('')).toBe(false)
  })
})

describe('isValidPassword', () => {
  it('accepts a password at the minimum length', () => {
    expect(isValidPassword('123456')).toBe(true)
  })

  it('rejects a password shorter than the minimum length', () => {
    expect(isValidPassword('12345')).toBe(false)
  })
})

describe('sanitizeInput', () => {
  it('trims surrounding whitespace', () => {
    expect(sanitizeInput('  hello  ')).toBe('hello')
  })

  it('strips angle brackets', () => {
    expect(sanitizeInput('<script>alert(1)</script>')).toBe(
      'scriptalert(1)/script'
    )
  })

  it('truncates to 255 characters', () => {
    const long = 'a'.repeat(300)
    expect(sanitizeInput(long)).toHaveLength(255)
  })
})

describe('formatTimeRemaining', () => {
  it('pluralizes minutes above 1', () => {
    expect(formatTimeRemaining(2 * 60 * 1000)).toBe('2 minutes')
  })

  it('uses singular for exactly 1 minute', () => {
    expect(formatTimeRemaining(60 * 1000)).toBe('1 minute')
  })

  it('rounds up partial minutes', () => {
    expect(formatTimeRemaining(30 * 1000)).toBe('1 minute')
  })
})

describe('authRateLimiter', () => {
  beforeEach(() => {
    authRateLimiter.reset('test-user')
  })

  it('allows attempts under the limit', () => {
    for (let i = 0; i < 5; i++) {
      expect(authRateLimiter.isAllowed('test-user')).toBe(true)
    }
  })

  it('blocks the 6th attempt within the window', () => {
    for (let i = 0; i < 5; i++) {
      authRateLimiter.isAllowed('test-user')
    }
    expect(authRateLimiter.isAllowed('test-user')).toBe(false)
  })

  it('reports remaining attempts', () => {
    expect(authRateLimiter.getRemainingAttempts('test-user')).toBe(5)
    authRateLimiter.isAllowed('test-user')
    expect(authRateLimiter.getRemainingAttempts('test-user')).toBe(4)
  })

  it('resets the count for an identifier', () => {
    authRateLimiter.isAllowed('test-user')
    authRateLimiter.isAllowed('test-user')
    authRateLimiter.reset('test-user')
    expect(authRateLimiter.getRemainingAttempts('test-user')).toBe(5)
  })

  it('tracks identifiers independently', () => {
    for (let i = 0; i < 5; i++) {
      authRateLimiter.isAllowed('test-user')
    }
    expect(authRateLimiter.isAllowed('test-user')).toBe(false)
    expect(authRateLimiter.isAllowed('another-user')).toBe(true)
    authRateLimiter.reset('another-user')
  })
})
