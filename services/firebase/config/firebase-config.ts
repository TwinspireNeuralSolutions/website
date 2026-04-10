import { initializeApp, getApps, FirebaseApp } from 'firebase/app'
import { getAuth, Auth } from 'firebase/auth'
import { getFirestore, Firestore } from 'firebase/firestore'

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY || '',
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN || '',
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID || '',
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET || '',
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID || '',
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID || '',
}

let hasLoggedMissingConfig = false

/**
 * Validate Firebase configuration
 */
function validateFirebaseConfig(): boolean {
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

  if (missingFields.length > 0) {
    const errorMessage = `Missing Firebase configuration fields: ${missingFields.join(', ')}`

    if (typeof window !== 'undefined' && !hasLoggedMissingConfig) {
      hasLoggedMissingConfig = true
      console.warn(
        `Firebase is not configured. Auth features are disabled until NEXT_PUBLIC_FIREBASE_* variables are set. ${errorMessage}`
      )
    }

    return false
  }

  return true
}

/**
 * Initialize Firebase app and auth
 * Ensures single instance (singleton pattern)
 */
let app: FirebaseApp | undefined
let auth: Auth | undefined
let db: Firestore | undefined

export function initializeFirebase() {
  if (typeof window === 'undefined') {
    return { app: undefined, auth: undefined, db: undefined }
  }

  const isConfigValid = validateFirebaseConfig()
  if (!isConfigValid) {
    return { app: undefined, auth: undefined, db: undefined }
  }

  if (!getApps().length) {
    app = initializeApp(firebaseConfig)
    auth = getAuth(app)
    db = getFirestore(app, process.env.NEXT_PUBLIC_FIREBASE_DB_NAME || '')
  } else {
    app = getApps()[0]
    auth = getAuth(app)
    db = getFirestore(app, process.env.NEXT_PUBLIC_FIREBASE_DB_NAME || '')
  }

  return { app, auth, db }
}

if (typeof window !== 'undefined') {
  initializeFirebase()
}

export { app, auth, db }
