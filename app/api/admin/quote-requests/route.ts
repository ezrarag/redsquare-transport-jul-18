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

  if (auth.startsWith("Bearer ")) {
    return auth.slice(7).trim() === password
  }
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
      return NextResponse.json({ quote_requests: [] })
    }

    const db = getFirestoreAdmin()
    const snapshot = await db
      .collection("quote_requests")
      .orderBy("createdAt", "desc")
      .get()

    const list = snapshot.docs.map((docSnap) => {
      const d = docSnap.data()
      const id = docSnap.id
      const fullName = d.full_name ?? d.name ?? ""
      const email = d.email ?? ""
      const phone = d.phone ?? null
      const createdAt = d.createdAt ?? docSnap.createTime?.toDate?.()?.toISOString?.() ?? new Date().toISOString()
      return {
        id,
        customer_id: email,
        pickup_location: d.pickup_location ?? "",
        dropoff_location: d.dropoff_location ?? "",
        notes: d.notes ?? null,
        status: d.status ?? "pending_review",
        estimated_amount: d.estimated_amount ?? null,
        stripe_checkout_url: d.stripe_checkout_url ?? null,
        created_at: createdAt,
        updated_at: d.updatedAt ?? createdAt,
        customer: {
          id: email,
          name: fullName,
          email,
          phone,
        },
      }
    })

    return NextResponse.json({ quote_requests: list })
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error)
    console.error("[admin/quote-requests] error:", message)
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    )
  }
}
