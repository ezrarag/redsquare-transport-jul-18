import { type NextRequest, NextResponse } from "next/server"
import { getFirestoreAdmin, hasFirebase } from "@/lib/firebaseAdmin"
import type { CreateQuoteData } from "@/types/database"

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

function hasStripe(): boolean {
  return Boolean(
    process.env.STRIPE_SECRET_KEY && process.env.STRIPE_SECRET_KEY.length > 0
  )
}

export async function GET(req: NextRequest) {
  try {
    if (!isAuthorized(req)) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }
    if (!hasFirebase()) {
      return NextResponse.json({ quotes: [] })
    }
    const db = getFirestoreAdmin()
    const snapshot = await db
      .collection("quotes")
      .orderBy("created_at", "desc")
      .get()
    const quotes = snapshot.docs.map((docSnap) => {
      const d = docSnap.data()
      return {
        id: docSnap.id,
        customer_id: d.customer_id,
        amount: d.amount,
        service_description: d.service_description,
        status: d.status ?? "pending",
        stripe_checkout_url: d.stripe_checkout_url ?? null,
        created_at: d.created_at ?? null,
        updated_at: d.updated_at ?? null,
        customer: {
          id: d.customer_id,
          name: d.customer_name ?? "",
          email: d.customer_email ?? d.customer_id,
        },
      }
    })
    return NextResponse.json({ quotes })
  } catch (error) {
    console.error("Error listing quotes:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    if (!hasFirebase()) {
      return NextResponse.json(
        { error: "Firebase not configured" },
        { status: 503 }
      )
    }

    const body: CreateQuoteData = await request.json()

    if (!body.customer_id || !body.amount || !body.service_description) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    const db = getFirestoreAdmin()
    const customerId = body.customer_id
    const customerSnap = await db.collection("customers").doc(customerId).get()

    if (!customerSnap.exists) {
      return NextResponse.json({ error: "Customer not found" }, { status: 404 })
    }

    const customerData = customerSnap.data()
    const customerEmail = (customerData?.email ?? customerSnap.id) as string
    const customerName = (customerData?.name ?? "") as string

    const quoteRef = db.collection("quotes").doc()
    const quoteId = quoteRef.id
    const createdAt = new Date().toISOString()

    const quoteDoc: Record<string, unknown> = {
      id: quoteId,
      customer_id: customerId,
      customer_email: customerEmail,
      customer_name: customerName,
      amount: body.amount,
      service_description: body.service_description,
      status: "pending",
      created_at: createdAt,
      updated_at: createdAt,
    }

    let checkout_url: string | null = null
    if (hasStripe()) {
      try {
        const { createCheckoutSession } = await import("@/lib/stripe")
        const session = await createCheckoutSession(
          quoteId,
          body.amount,
          customerEmail,
          body.service_description,
          "quote"
        )
        checkout_url = session.url
        quoteDoc.stripe_checkout_url = session.url
        quoteDoc.stripe_session_id = session.id
        quoteDoc.status = "sent"
      } catch (e) {
        console.error("Stripe session error:", e)
      }
    }

    await quoteRef.set(quoteDoc)

    return NextResponse.json({
      success: true,
      quote: {
        id: quoteId,
        customer_id: customerId,
        amount: body.amount,
        service_description: body.service_description,
        status: (quoteDoc.status as string) ?? "pending",
        stripe_checkout_url: checkout_url ?? undefined,
        stripe_session_id: quoteDoc.stripe_session_id ?? undefined,
        created_at: createdAt,
        updated_at: createdAt,
        customer: { id: customerId, name: customerName, email: customerEmail },
      },
      checkout_url,
    })
  } catch (error) {
    console.error("Error creating quote:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
