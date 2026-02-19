import { promises as fs } from "fs"
import path from "path"
import { getFirestoreAdmin, hasFirebase } from "@/lib/firebaseAdmin"

export type CareerRole = "Driver" | "Dispatcher" | "Broker/Operations"

export interface StoredCareerApplication {
  id: string
  full_name: string
  phone: string
  email: string
  city_state: string
  role: CareerRole
  experience_years: string | null
  licenses: string | null
  availability: string | null
  notes: string | null
  resume_url: string | null
  created_at: string
}

export interface CreateCareerApplicationInput {
  full_name: string
  phone: string
  email: string
  city_state: string
  role: CareerRole
  experience_years?: string
  licenses?: string
  availability?: string
  notes?: string
  resume_url?: string
}

const FILENAME = "career-applications.json"

function getDataDir(): string {
  if (process.env.CAREER_APPLICATIONS_DATA_DIR) {
    return process.env.CAREER_APPLICATIONS_DATA_DIR
  }
  if (typeof process.env.VERCEL === "string" && process.env.VERCEL === "1") {
    return "/tmp"
  }
  return path.join(process.cwd(), "data")
}

function getFilePath(): string {
  return path.join(getDataDir(), FILENAME)
}

function normalizeOptional(value?: string): string | null {
  if (typeof value !== "string") return null
  const trimmed = value.trim()
  return trimmed.length > 0 ? trimmed : null
}

async function ensureDir(dir: string): Promise<void> {
  try {
    await fs.mkdir(dir, { recursive: true })
  } catch {
    // ignore
  }
}

async function readAllFromFile(): Promise<StoredCareerApplication[]> {
  const filePath = getFilePath()
  try {
    const raw = await fs.readFile(filePath, "utf-8")
    const data = JSON.parse(raw) as {
      career_applications?: StoredCareerApplication[]
    }
    return Array.isArray(data.career_applications)
      ? data.career_applications
      : []
  } catch {
    return []
  }
}

function toStoredRecord(payload: CreateCareerApplicationInput): StoredCareerApplication {
  return {
    id: crypto.randomUUID(),
    full_name: payload.full_name.trim(),
    phone: payload.phone.trim(),
    email: payload.email.trim(),
    city_state: payload.city_state.trim(),
    role: payload.role,
    experience_years: normalizeOptional(payload.experience_years),
    licenses: normalizeOptional(payload.licenses),
    availability: normalizeOptional(payload.availability),
    notes: normalizeOptional(payload.notes),
    resume_url: normalizeOptional(payload.resume_url),
    created_at: new Date().toISOString(),
  }
}

async function appendToFirebase(
  record: StoredCareerApplication
): Promise<{ id: string }> {
  const db = getFirestoreAdmin()
  await db.collection("career_applications").doc(record.id).set(record)
  return { id: record.id }
}

async function listFromFirebase(): Promise<StoredCareerApplication[]> {
  const db = getFirestoreAdmin()
  const snapshot = await db
    .collection("career_applications")
    .orderBy("created_at", "desc")
    .get()

  return snapshot.docs.map((docSnap) => {
    const d = docSnap.data() as Partial<StoredCareerApplication>
    return {
      id: d.id ?? docSnap.id,
      full_name: d.full_name ?? "",
      phone: d.phone ?? "",
      email: d.email ?? "",
      city_state: d.city_state ?? "",
      role: (d.role as CareerRole) ?? "Driver",
      experience_years: d.experience_years ?? null,
      licenses: d.licenses ?? null,
      availability: d.availability ?? null,
      notes: d.notes ?? null,
      resume_url: d.resume_url ?? null,
      created_at:
        d.created_at ??
        docSnap.createTime?.toDate?.()?.toISOString?.() ??
        new Date().toISOString(),
    }
  })
}

async function appendToFile(record: StoredCareerApplication): Promise<{ id: string }> {
  const dir = getDataDir()
  await ensureDir(dir)
  const filePath = getFilePath()
  const all = await readAllFromFile()
  all.unshift(record)
  await fs.writeFile(
    filePath,
    JSON.stringify({ career_applications: all }, null, 2),
    "utf-8"
  )
  return { id: record.id }
}

export async function appendCareerApplication(
  payload: CreateCareerApplicationInput
): Promise<{ id: string; storage: "firebase" | "file" }> {
  const record = toStoredRecord(payload)

  if (hasFirebase()) {
    const inserted = await appendToFirebase(record)
    return { id: inserted.id, storage: "firebase" }
  }

  const inserted = await appendToFile(record)
  return { id: inserted.id, storage: "file" }
}

export async function listCareerApplications(): Promise<StoredCareerApplication[]> {
  if (hasFirebase()) {
    return listFromFirebase()
  }
  return readAllFromFile()
}

export function isValidCareerRole(value: string): value is CareerRole {
  return value === "Driver" || value === "Dispatcher" || value === "Broker/Operations"
}
