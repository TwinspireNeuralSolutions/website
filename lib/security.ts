const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const MIN_PASSWORD_LENGTH = 6
const MAX_INPUT_LENGTH = 255

const RATE_LIMIT_CONFIG = {
  MAX_ATTEMPTS: 5,
  WINDOW_MS: 15 * 60 * 1000,
} as const

const FIREBASE_ENV_VARS = [
  'NEXT_PUBLIC_FIREBASE_API_KEY',
  'NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN',
  'NEXT_PUBLIC_FIREBASE_PROJECT_ID',
  'NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET',
  'NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID',
  'NEXT_PUBLIC_FIREBASE_APP_ID',
] as const

export function isValidEmail(email: string): boolean {
  return EMAIL_REGEX.test(email.trim())
}

export function isValidPassword(password: string): boolean {
  return password.length >= MIN_PASSWORD_LENGTH
}

export function sanitizeInput(input: string): string {
  return input.trim().replace(/[<>]/g, '').slice(0, MAX_INPUT_LENGTH)
}

export function formatTimeRemaining(ms: number): string {
  const minutes = Math.ceil(ms / 60000)
  return minutes === 1 ? '1 minute' : `${minutes} minutes`
}

export function validateFirebaseConfig() {
  const missing = FIREBASE_ENV_VARS.filter(
    (key) => !process.env[key] || process.env[key] === ''
  )

  return {
    isValid: missing.length === 0,
    missing: Array.from(missing),
  }
}

interface RateLimitRecord {
  count: number
  timestamp: number
}

class RateLimiter {
  private attempts = new Map<string, RateLimitRecord>()

  isAllowed(identifier: string): boolean {
    const now = Date.now()
    const record = this.attempts.get(identifier)

    if (!record || this.isExpired(record, now)) {
      this.attempts.set(identifier, { count: 1, timestamp: now })
      return true
    }

    if (record.count >= RATE_LIMIT_CONFIG.MAX_ATTEMPTS) {
      return false
    }

    record.count++
    return true
  }

  reset(identifier: string): void {
    this.attempts.delete(identifier)
  }

  getRemainingAttempts(identifier: string): number {
    const record = this.attempts.get(identifier)
    if (!record) return RATE_LIMIT_CONFIG.MAX_ATTEMPTS

    const now = Date.now()
    if (this.isExpired(record, now)) {
      return RATE_LIMIT_CONFIG.MAX_ATTEMPTS
    }

    return Math.max(0, RATE_LIMIT_CONFIG.MAX_ATTEMPTS - record.count)
  }

  getTimeUntilReset(identifier: string): number {
    const record = this.attempts.get(identifier)
    if (!record) return 0

    const now = Date.now()
    const timeLeft = RATE_LIMIT_CONFIG.WINDOW_MS - (now - record.timestamp)
    return Math.max(0, timeLeft)
  }

  private isExpired(record: RateLimitRecord, now: number): boolean {
    return now - record.timestamp > RATE_LIMIT_CONFIG.WINDOW_MS
  }
}

export const authRateLimiter = new RateLimiter()
