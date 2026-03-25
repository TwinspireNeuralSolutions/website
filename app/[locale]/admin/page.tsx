'use client'

import { useEffect } from 'react'
import { useRouter, useParams } from 'next/navigation'
import Link from 'next/link'
import { useAuth } from '@/hooks/useAuth'
import { useGetProfile } from '@/services/firebase/queries/useGetProfile'
import { useIsTeamManager } from '@/hooks/useIsTeamManager'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { ArrowLeft } from 'lucide-react'
import { LoadingScreen } from '@/app/[locale]/admin/components/LoadingScreen'
import { EmailPasswordForm } from '@/app/[locale]/admin/components/EmailPasswordForm'
import { OAuthButtons } from '@/app/[locale]/admin/components/OAuthButtons'
import { ErrorAlert } from '@/app/[locale]/admin/components/ErrorAlert'
import { useAdminLogin } from '@/app/[locale]/admin/hooks/useAdminLogin'

/**
 * Admin Login Page
 * Handles email/password and OAuth sign-in for team managers.
 * Redirects to /{locale}/admin/dashboard on successful login.
 */
export default function AdminLogin() {
  const router = useRouter()
  const { locale } = useParams<{ locale: string }>()
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
    if (!isAuthLoading && isAuthenticated && user?.uid) {
      if (profile !== undefined && isTeamManager) {
        router.push(`/${locale}/admin/dashboard`)
      }
    }
  }, [
    isAuthenticated,
    isAuthLoading,
    isProfileLoading,
    user,
    profile,
    isTeamManager,
    router,
    locale,
  ])

  const shouldShowLoading =
    isAuthLoading || (isProfileLoading && profile === undefined)

  if (shouldShowLoading) return <LoadingScreen />
  if (isAuthenticated && profile === undefined && !isProfileLoading)
    return <LoadingScreen />

  const isDisabled = isLoading || isRateLimited

  return (
    <>
      <div className="relative z-10 flex min-h-screen items-center justify-center p-4">
        <div className="w-full max-w-md space-y-4">
          <Link href={`/${locale}`}>
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
              <CardDescription className="text-white/70">
                Sign in to upload and manage your team&apos;s data
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
    </>
  )
}
