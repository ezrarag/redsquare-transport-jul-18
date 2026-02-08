import { promises as fs } from "fs"
import path from "path"

export interface StoredQuoteRequest {
  id: string
  name: string
  email: string
  phone: string
  pickup_location: string
  dropoff_location: string
  notes?: string
  status: string
  estimated_amount?: number
  stripe_checkout_url?: string | null
  created_at: string
  customer?: { id: string; name: string; email: string; phone?: string }
}

const FILENAME = "quote-requests.json"

function getDataDir(): string {
  if (process.env.QUOTE_REQUESTS_DATA_DIR) {
    return process.env.QUOTE_REQUESTS_DATA_DIR
  }
  if (typeof process.env.VERCEL === "string" && process.env.VERCEL === "1") {
    return "/tmp"
  }
  return path.join(process.cwd(), "data")
}

function getFilePath(): string {
  return path.join(getDataDir(), FILENAME)
}

async function ensureDir(dir: string): Promise<void> {
  try {
    await fs.mkdir(dir, { recursive: true })
  } catch {
    // ignore
  }
}

async function readAll(): Promise<StoredQuoteRequest[]> {
  const filePath = getFilePath()
  try {
    const raw = await fs.readFile(filePath, "utf-8")
    const data = JSON.parse(raw) as { quote_requests?: StoredQuoteRequest[] }
    return Array.isArray(data.quote_requests) ? data.quote_requests : []
  } catch {
    return []
  }
}

export async function appendQuoteRequest(
  payload: Omit<StoredQuoteRequest, "id" | "created_at" | "status">
): Promise<{ id: string }> {
  const dir = getDataDir()
  await ensureDir(dir)
  const filePath = getFilePath()
  const all = await readAll()
  const id = crypto.randomUUID()
  const created_at = new Date().toISOString()
  const record: StoredQuoteRequest = {
    ...payload,
    id,
    status: "pending_review",
    created_at,
    customer: {
      id: crypto.randomUUID(),
      name: payload.name,
      email: payload.email,
      phone: payload.phone,
    },
  }
  all.unshift(record)
  await fs.writeFile(
    filePath,
    JSON.stringify({ quote_requests: all }, null, 2),
    "utf-8"
  )
  return { id }
}

export async function listQuoteRequests(): Promise<StoredQuoteRequest[]> {
  return readAll()
}
