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
        // Disable automatic refetching for auth queries
        refetchOnWindowFocus: false,
        refetchOnMount: false,
        refetchOnReconnect: false,
        retry: 1,
        staleTime: 5 * 60 * 1000, // 5 minutes
      },
      mutations: {
        retry: 1,
      },
    },
  })
}

/**
 * Auth state synchronization component
 * This component subscribes to Firebase auth state changes
 * and keeps React Query cache in sync
 */
function AuthStateListener() {
  useAuthStateSync()
  return null
}

export function AuthProvider({ children }: { children: ReactNode }) {
  // Create query client in state to ensure it's stable across renders
  const [queryClient] = useState(() => createQueryClient())

  return (
    <QueryClientProvider client={queryClient}>
      <AuthStateListener />
      {children}
      {/* Remove in production or based on environment variable */}
      {process.env.NODE_ENV === 'development' && (
        <ReactQueryDevtools initialIsOpen={false} />
      )}
    </QueryClientProvider>
  )
}
