import { useQuery } from '@tanstack/react-query'
import { collection, query, where, getDocs } from 'firebase/firestore'
import { db } from '../config/firebase-config'
import { TwinspireProfile } from '../types/auth.types'
import { PROFILE_KEYS } from '../constants/query-keys'

export async function getUserProfile(
  uid: string
): Promise<TwinspireProfile | null> {
  if (!db) {
    throw new Error('Firebase Firestore not initialized')
  }

  try {
    const profilesRef = collection(db, 'profiles')
    const q = query(profilesRef, where('uid', '==', uid))
    const querySnapshot = await getDocs(q)

    if (!querySnapshot.empty) {
      const doc = querySnapshot.docs[0]
      return {
        uid,
        ...doc.data(),
      } as TwinspireProfile
    }

    return null
  } catch (error: any) {
    console.error(
      'Error fetching user profile from profiles collection:',
      error
    )
    throw new Error(`Failed to fetch user profile: ${error.message}`)
  }
}

export function useGetProfile(uid: string | null | undefined) {
  return useQuery({
    queryKey: PROFILE_KEYS.profile(uid),
    queryFn: () => {
      if (!uid) {
        return null
      }
      return getUserProfile(uid)
    },
    enabled: !!uid,
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
  })
}
