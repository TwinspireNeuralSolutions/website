'use client'

import { ReactNode, useEffect } from 'react'
import { useAuth } from '@/hooks/useAuth'
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
  const { isAuthenticated, isLoading } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.push(redirectTo)
    }
  }, [isAuthenticated, isLoading, router, redirectTo])

  if (isLoading) {
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

  if (!isAuthenticated) {
    return null
  }

  return <>{children}</>
}
