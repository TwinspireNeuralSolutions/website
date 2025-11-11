import { useState, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/hooks/useAuth'
import {
  isValidEmail,
  isValidPassword,
  sanitizeInput,
  authRateLimiter,
  formatTimeRemaining,
} from '@/lib/security'

export function useAdminLogin() {
  const router = useRouter()
  const auth = useAuth()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [isRateLimited, setIsRateLimited] = useState(false)
  const [rateLimitTime, setRateLimitTime] = useState(0)

  const checkRateLimit = useCallback(() => {
    const identifier = email || 'anonymous'
    const allowed = authRateLimiter.isAllowed(identifier)

    if (!allowed) {
      const timeLeft = authRateLimiter.getTimeUntilReset(identifier)
      setIsRateLimited(true)
      setRateLimitTime(timeLeft)
      setError(
        `Too many failed attempts. Please try again in ${formatTimeRemaining(timeLeft)}.`
      )
      return false
    }

    setIsRateLimited(false)
    return true
  }, [email])

  const validateInputs = useCallback(
    (email: string, password: string) => {
      if (!email || !password) {
        setError('Please enter both email and password')
        return false
      }

      if (!isValidEmail(email)) {
        setError('Please enter a valid email address')
        return false
      }

      if (!isValidPassword(password)) {
        setError('Password must be at least 6 characters')
        return false
      }

      return true
    },
    []
  )

  const handleEmailLogin = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault()
      setError('')

      const sanitizedEmail = sanitizeInput(email)
      const sanitizedPassword = sanitizeInput(password)

      if (!validateInputs(sanitizedEmail, sanitizedPassword)) {
        return
      }

      if (!checkRateLimit()) {
        return
      }

      const result = await auth.signInWithEmail({
        email: sanitizedEmail,
        password: sanitizedPassword,
      })

      if (result.success) {
        authRateLimiter.reset(sanitizedEmail)
        router.push('/admin/dashboard')
      } else {
        setError(result.error || 'Sign-in failed')
        checkRateLimit()
      }
    },
    [email, password, validateInputs, checkRateLimit, auth, router]
  )

  const handleOAuthLogin = useCallback(
    async (provider: 'google' | 'apple') => {
      setError('')

      if (isRateLimited) {
        setError(
          `Too many attempts. Please try again in ${formatTimeRemaining(rateLimitTime)}.`
        )
        return
      }

      const signIn =
        provider === 'google' ? auth.signInWithGoogle : auth.signInWithApple
      const result = await signIn()

      if (result.success) {
        router.push('/admin/dashboard')
      } else {
        setError(result.error || `${provider} sign-in failed`)
      }
    },
    [isRateLimited, rateLimitTime, auth, router]
  )

  return {
    email,
    password,
    error,
    isRateLimited,
    isLoading: auth.isSigningIn,
    emailSignIn: auth.emailSignIn,
    googleSignIn: auth.googleSignIn,
    appleSignIn: auth.appleSignIn,
    setEmail,
    setPassword,
    handleEmailLogin,
    handleGoogleLogin: () => handleOAuthLogin('google'),
    handleAppleLogin: () => handleOAuthLogin('apple'),
  }
}

