import { getApps, initializeApp, type App, cert } from "firebase-admin/app"
import { getFirestore, type Firestore } from "firebase-admin/firestore"

let app: App | null = null
let _db: Firestore | null = null

function getFirebaseApp(): App {
  if (app) return app
  const existing = getApps()
  if (existing.length > 0) {
    app = existing[0] as App
    return app
  }
  const projectId = process.env.FIREBASE_PROJECT_ID
  const clientEmail = process.env.FIREBASE_CLIENT_EMAIL
  const privateKeyRaw = process.env.FIREBASE_PRIVATE_KEY

  if (!projectId || !clientEmail || !privateKeyRaw || privateKeyRaw === "placeholder") {
    throw new Error(
      "Missing Firebase Admin env: FIREBASE_PROJECT_ID, FIREBASE_CLIENT_EMAIL, FIREBASE_PRIVATE_KEY"
    )
  }

  const privateKey = privateKeyRaw.replace(/\\n/g, "\n")
  app = initializeApp({
    credential: cert({
      projectId,
      clientEmail,
      privateKey,
    }),
  })
  return app
}

export function getFirestoreAdmin(): Firestore {
  if (_db) return _db
  _db = getFirestore(getFirebaseApp())
  return _db
}

export function hasFirebase(): boolean {
  return Boolean(
    process.env.FIREBASE_PROJECT_ID &&
      process.env.FIREBASE_CLIENT_EMAIL &&
      process.env.FIREBASE_PRIVATE_KEY &&
      process.env.FIREBASE_PRIVATE_KEY !== "placeholder"
  )
}
