'use client'

import { ReactNode } from 'react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { useAuthStateSync } from '@/services/firebase/queries/useAuthStateSync'
import { useState } from 'react'

/**
 * Query client configuration with optimized defaults
 */
function createQueryClient() {
  return new QueryClient({
    defaultOptions: {
      queries: {
        refetchOnWindowFocus: false,
        refetchOnMount: false,
        refetchOnReconnect: false,
        retry: 1,
        staleTime: 5 * 60 * 1000,
      },
      mutations: {
        retry: 1,
      },
    },
  })
}

/**
 * Auth state synchronization component
 * Subscribes to Firebase auth state changes and keeps React Query cache in sync
 */
function AuthStateListener() {
  useAuthStateSync()
  return null
}

/**
 * AuthProvider — wraps the app with React Query and Firebase auth state sync.
 */
export function AuthProvider({ children }: { children: ReactNode }) {
  const [queryClient] = useState(() => createQueryClient())

  return (
    <QueryClientProvider client={queryClient}>
      <AuthStateListener />
      {children}
      {process.env.NODE_ENV === 'development' && (
        <ReactQueryDevtools initialIsOpen={false} />
      )}
    </QueryClientProvider>
  )
}
