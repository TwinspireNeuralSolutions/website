import { useState, useCallback } from 'react'
import { useAuth } from '@/hooks/useAuth'
import {
  isValidEmail,
  isValidPassword,
  sanitizeInput,
  authRateLimiter,
  formatTimeRemaining,
} from '@/lib/security'

export function useAdminLogin() {
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

  const validateInputs = useCallback((email: string, password: string) => {
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
  }, [])

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

      try {
        const result = await auth.signInWithEmail({
          email: sanitizedEmail,
          password: sanitizedPassword,
        })

        if (result.success) {
          authRateLimiter.reset(sanitizedEmail)
          // Redirect will be handled by the page component based on profile role
        } else {
          setError(result.error || 'Sign-in failed')
          checkRateLimit()
        }
      } catch (error) {
        const errorMessage =
          error instanceof Error
            ? error.message
            : 'Sign-in failed. Please try again.'
        setError(errorMessage)
        checkRateLimit()
      }
    },
    [email, password, validateInputs, checkRateLimit, auth]
  )

  const handleOAuthLogin = useCallback(
    async (provider: 'google' | 'apple') => {
      // Prevent multiple simultaneous attempts
      const isProviderLoading =
        provider === 'google'
          ? auth.googleSignIn.isLoading
          : auth.appleSignIn.isLoading

      if (isProviderLoading || isRateLimited) {
        if (isRateLimited) {
          setError(
            `Too many attempts. Please try again in ${formatTimeRemaining(rateLimitTime)}.`
          )
        }
        return
      }

      setError('')

      try {
        const signIn =
          provider === 'google' ? auth.signInWithGoogle : auth.signInWithApple
        const result = await signIn()

        if (result.success) {
          // Redirect will be handled by the page component based on profile role
        } else {
          setError(result.error || `${provider} sign-in failed`)
        }
      } catch (error) {
        const errorMessage =
          error instanceof Error
            ? error.message
            : `${provider} sign-in failed. Please try again.`
        setError(errorMessage)
      }
    },
    [isRateLimited, rateLimitTime, auth]
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
