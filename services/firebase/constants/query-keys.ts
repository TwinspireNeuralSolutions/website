/**
 * Query keys for Firebase queries
 * Centralized location for all query keys to ensure consistency
 */

export const AUTH_KEYS = {
  currentUser: ['auth', 'currentUser'] as const,
  authState: ['auth', 'state'] as const,
}

export const PROFILE_KEYS = {
  profile: (uid: string | null | undefined) =>
    ['profile', 'twinspire', uid] as const,
}
