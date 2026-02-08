import { type NextRequest, NextResponse } from "next/server"
import { getFirestoreAdmin, hasFirebase } from "@/lib/firebaseAdmin"

function getAdminPassword(): string {
  const env = process.env.ADMIN_PASSWORD
  if (env && env.length > 0) return env
  if (process.env.NODE_ENV === "development") return "admin123"
  return ""
}

function isAuthorized(req: NextRequest): boolean {
  const password = getAdminPassword()
  if (!password) return false
  const auth = req.headers.get("authorization")
  if (!auth) return false
  if (auth.startsWith("Bearer ")) return auth.slice(7).trim() === password
  if (auth.startsWith("Basic ")) {
    try {
      const decoded = Buffer.from(auth.slice(6), "base64").toString("utf-8")
      const [, pass] = decoded.split(":")
      return pass === password
    } catch {
      return false
    }
  }
  return false
}

export async function GET(req: NextRequest) {
  try {
    if (!isAuthorized(req)) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }
    if (!hasFirebase()) {
      return NextResponse.json({ customers: [] })
    }
    const db = getFirestoreAdmin()
    const snapshot = await db
      .collection("customers")
      .orderBy("createdAt", "desc")
      .get()
    const customers = snapshot.docs.map((docSnap) => {
      const d = docSnap.data()
      const createdAt = d.createdAt ?? docSnap.createTime?.toDate?.()?.toISOString?.() ?? new Date().toISOString()
      return {
        id: docSnap.id,
        name: d.name ?? "",
        email: d.email ?? docSnap.id,
        phone: d.phone ?? null,
        company: d.company ?? null,
        address: d.address ?? null,
        created_at: createdAt,
        updated_at: createdAt,
      }
    })
    return NextResponse.json({ customers })
  } catch (error) {
    console.error("Error listing customers:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
