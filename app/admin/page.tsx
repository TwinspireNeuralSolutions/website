'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { useAuth } from '@/hooks/useAuth'
import { useGetProfile } from '@/services/firebase/queries/useGetProfile'
import { useIsTeamManager } from '@/hooks/useIsTeamManager'
import { Button } from '@/components/ui/button'
import { HeroBackground } from '@/components/Atoms'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { ArrowLeft } from 'lucide-react'
import { LoadingScreen } from './components/LoadingScreen'
import { EmailPasswordForm } from './components/EmailPasswordForm'
import { OAuthButtons } from './components/OAuthButtons'
import { ErrorAlert } from './components/ErrorAlert'
import { useAdminLogin } from './hooks/useAdminLogin'

export default function AdminLogin() {
  const router = useRouter()
  const { user, isAuthenticated, isLoading: isAuthLoading } = useAuth()
  const { data: profile, isLoading: isProfileLoading } = useGetProfile(
    user?.uid
  )
  const isTeamManager = useIsTeamManager(profile)

  const {
    email,
    password,
    error,
    isRateLimited,
    isLoading,
    emailSignIn,
    googleSignIn,
    appleSignIn,
    setEmail,
    setPassword,
    handleEmailLogin,
    handleGoogleLogin,
    handleAppleLogin,
  } = useAdminLogin()

  useEffect(() => {
    // Only redirect when auth is loaded and we have a user
    if (!isAuthLoading && isAuthenticated && user?.uid) {
      // If profile data is available (even if null), proceed with redirect
      // profile !== undefined means the query has returned a value
      if (profile !== undefined && isTeamManager) {
        router.push('/admin/dashboard')
      }
      // If profile is still loading (profile === undefined), wait for it
    }
  }, [
    isAuthenticated,
    isAuthLoading,
    isProfileLoading,
    user,
    profile,
    isTeamManager,
    router,
  ])

  // Show loading if auth is loading OR if profile is loading (but only if we don't have cached data)
  const shouldShowLoading =
    isAuthLoading || (isProfileLoading && profile === undefined)

  if (shouldShowLoading) return <LoadingScreen />
  if (isAuthenticated && profile === undefined && !isProfileLoading)
    return <LoadingScreen />

  const isDisabled = isLoading || isRateLimited

  return (
    <HeroBackground>
      <div className="relative z-10 flex min-h-screen items-center justify-center p-4">
        <div className="w-full max-w-md space-y-4">
          <Link href="/">
            <Button
              variant="ghost"
              className="group text-white hover:bg-transparent hover:text-white"
            >
              <ArrowLeft className="mr-2 h-4 w-4 transition-transform duration-200 group-hover:-translate-x-1" />
              Back to Home
            </Button>
          </Link>

          <Card className="w-full border-white/20 bg-white/10 backdrop-blur-sm">
            <CardHeader className="space-y-1">
              <CardTitle className="text-2xl font-bold text-white">
                Team Manager Login
              </CardTitle>
              <CardDescription className="text-gray-200">
                Sign in to upload and manage your team's data
              </CardDescription>
            </CardHeader>

            <CardContent>
              <EmailPasswordForm
                email={email}
                password={password}
                isLoading={emailSignIn.isLoading}
                isDisabled={isDisabled}
                hasError={!!error}
                onEmailChange={setEmail}
                onPasswordChange={setPassword}
                onSubmit={handleEmailLogin}
              />

              <ErrorAlert message={error} />

              <OAuthButtons
                isGoogleLoading={googleSignIn.isLoading}
                isAppleLoading={appleSignIn.isLoading}
                isDisabled={isDisabled}
                onGoogleClick={handleGoogleLogin}
                onAppleClick={handleAppleLogin}
              />
            </CardContent>
          </Card>
        </div>
      </div>
    </HeroBackground>
  )
}
