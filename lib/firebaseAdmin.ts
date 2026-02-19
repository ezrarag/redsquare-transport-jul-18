type FirebaseApp = unknown
type FirestoreDoc = {
  id: string
  data: () => Record<string, unknown>
  createTime?: { toDate?: () => Date }
}
type FirestoreSnap = {
  docs: FirestoreDoc[]
}
type Firestore = {
  collection: (name: string) => {
    doc: (id?: string) => {
      id: string
      set: (data: unknown, options?: unknown) => Promise<unknown>
      get: () => Promise<unknown>
    }
    orderBy: (field: string, direction?: "asc" | "desc") => {
      get: () => Promise<FirestoreSnap>
    }
    get: () => Promise<FirestoreSnap>
  }
}

let app: FirebaseApp | null = null
let _db: Firestore | null = null

interface FirebaseAdminModules {
  getApps: () => FirebaseApp[]
  initializeApp: (options: unknown) => FirebaseApp
  cert: (options: unknown) => unknown
  getFirestore: (app: FirebaseApp) => Firestore
}

function loadFirebaseAdminModules(): FirebaseAdminModules {
  let runtimeRequire: NodeRequire
  try {
    runtimeRequire = (0, eval)("require") as NodeRequire
  } catch {
    throw new Error("Unable to load runtime require for Firebase Admin")
  }

  try {
    const appMod = runtimeRequire("firebase-admin/app") as {
      getApps: FirebaseAdminModules["getApps"]
      initializeApp: FirebaseAdminModules["initializeApp"]
      cert: FirebaseAdminModules["cert"]
    }
    const firestoreMod = runtimeRequire("firebase-admin/firestore") as {
      getFirestore: FirebaseAdminModules["getFirestore"]
    }
    return {
      getApps: appMod.getApps,
      initializeApp: appMod.initializeApp,
      cert: appMod.cert,
      getFirestore: firestoreMod.getFirestore,
    }
  } catch {
    throw new Error(
      "firebase-admin is not installed. Run your package manager install to add dependencies."
    )
  }
}

function getFirebaseApp(): FirebaseApp {
  if (app) return app
  const { getApps, initializeApp, cert } = loadFirebaseAdminModules()
  const existing = getApps()
  if (existing.length > 0) {
    app = existing[0] as FirebaseApp
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
  const { getFirestore } = loadFirebaseAdminModules()
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
