'use client'

import { ReactNode, useEffect } from 'react'
import { useAuth } from '@/hooks/useAuth'
import { useGetProfile } from '@/services/firebase/queries/useGetProfile'
import { useIsTeamManager } from '@/hooks/useIsTeamManager'
import { useRouter } from 'next/navigation'

interface ProtectedRouteProps {
  children: ReactNode
  redirectTo?: string
  loadingComponent?: ReactNode
}

export function ProtectedRoute({
  children,
  redirectTo = '/sign-in',
  loadingComponent,
}: ProtectedRouteProps) {
  const { isAuthenticated, isLoading, user } = useAuth()
  const { data: profile, isLoading: isProfileLoading } = useGetProfile(
    user?.uid
  )
  const isManager = useIsTeamManager(profile)
  const router = useRouter()

  const isCheckingRole = isAuthenticated && isProfileLoading
  const isUnauthorized = isAuthenticated && !isProfileLoading && !isManager

  useEffect(() => {
    if (isLoading) return
    if (!isAuthenticated || isUnauthorized) {
      router.push(redirectTo)
    }
  }, [isAuthenticated, isLoading, isUnauthorized, router, redirectTo])

  if (isLoading || isCheckingRole) {
    return (
      <>
        {loadingComponent || (
          <div className="flex min-h-screen items-center justify-center">
            <div className="text-center">
              <div className="mb-4 h-12 w-12 animate-spin rounded-full border-4 border-gray-200 border-t-blue-600" />
              <p className="text-gray-600">Loading...</p>
            </div>
          </div>
        )}
      </>
    )
  }

  if (!isAuthenticated || isUnauthorized) {
    return null
  }

  return <>{children}</>
}
