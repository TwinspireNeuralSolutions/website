import { initializeApp, getApps, FirebaseApp } from 'firebase/app'
import { getAuth, Auth } from 'firebase/auth'

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY || '',
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN || '',
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID || '',
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET || '',
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID || '',
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID || '',
}

/**
 * Validate Firebase configuration
 */
function validateFirebaseConfig() {
  const requiredFields = [
    'apiKey',
    'authDomain',
    'projectId',
    'storageBucket',
    'messagingSenderId',
    'appId',
  ]

  const missingFields = requiredFields.filter(
    (field) => !firebaseConfig[field as keyof typeof firebaseConfig]
  )

  if (missingFields.length > 0 && process.env.NODE_ENV === 'development') {
    console.warn(
      `Missing Firebase configuration fields: ${missingFields.join(', ')}`
    )
  }
}

/**
 * Initialize Firebase app and auth
 * Ensures single instance (singleton pattern)
 */
let app: FirebaseApp | undefined
let auth: Auth | undefined

export function initializeFirebase() {
  if (typeof window === 'undefined') {
    return { app: undefined, auth: undefined }
  }

  validateFirebaseConfig()

  if (!getApps().length) {
    app = initializeApp(firebaseConfig)
    auth = getAuth(app)
  } else {
    app = getApps()[0]
    auth = getAuth(app)
  }

  return { app, auth }
}

if (typeof window !== 'undefined') {
  initializeFirebase()
}

export { app, auth }
