import { type NextRequest, NextResponse } from "next/server"
import { getFirestoreAdmin, hasFirebase } from "@/lib/firebaseAdmin"
import { createCheckoutSession } from "@/lib/stripe"
import type { CreateQuoteRequestData } from "@/types/database"

function getRequestId(): string {
  return typeof crypto !== "undefined" && crypto.randomUUID
    ? crypto.randomUUID()
    : `req-${Date.now()}-${Math.random().toString(36).slice(2, 9)}`
}

function hasStripe(): boolean {
  return Boolean(
    process.env.STRIPE_SECRET_KEY && process.env.STRIPE_SECRET_KEY.length > 0
  )
}

export async function POST(request: NextRequest) {
  const requestId = getRequestId()
  try {
    let body: CreateQuoteRequestData
    try {
      body = await request.json()
    } catch {
      return NextResponse.json(
        { error: "Invalid JSON body" },
        { status: 400 }
      )
    }

    const name = typeof body.name === "string" ? body.name.trim() : ""
    const email = typeof body.email === "string" ? body.email.trim() : ""
    const phone = typeof body.phone === "string" ? body.phone.trim() : ""
    const pickup_location =
      typeof body.pickup_location === "string" ? body.pickup_location.trim() : ""
    const dropoff_location =
      typeof body.dropoff_location === "string"
        ? body.dropoff_location.trim()
        : ""
    const notes =
      typeof body.notes === "string" ? body.notes.trim() : undefined

    if (!name || !email || !pickup_location || !dropoff_location) {
      return NextResponse.json(
        { error: "Missing required fields: name, email, pickup_location, dropoff_location" },
        { status: 400 }
      )
    }

    const depositAmount = Number.parseFloat(
      process.env.DEFAULT_DEPOSIT_AMOUNT || "100.00"
    )

    if (!hasFirebase()) {
      return NextResponse.json(
        { error: "Server configuration error (Firebase not configured)" },
        { status: 500 }
      )
    }

    const db = getFirestoreAdmin()
    const id = crypto.randomUUID()
    const createdAt = new Date().toISOString()
    const status = "pending_review"

    const doc: Record<string, unknown> = {
      id,
      full_name: name,
      email,
      phone: phone || null,
      pickup_location,
      dropoff_location,
      notes: notes ?? null,
      createdAt,
      status,
      estimated_amount: depositAmount,
    }

    let checkout_url: string | null = null
    if (hasStripe()) {
      try {
        const session = await createCheckoutSession(
          id,
          depositAmount,
          email,
          `Logistics Service Deposit - Pickup: ${pickup_location} → Dropoff: ${dropoff_location}`,
          "quote_request"
        )
        checkout_url = session.url
        doc.stripe_checkout_url = session.url
        doc.stripe_session_id = session.id
      } catch (stripeErr) {
        console.error(
          `[quote-requests] requestId=${requestId} Stripe error:`,
          stripeErr instanceof Error ? stripeErr.message : stripeErr
        )
      }
    }

    await db.collection("quote_requests").doc(id).set(doc)
    const customerRef = db.collection("customers").doc(email)
    await customerRef.set(
      { name, email, phone: phone || null, createdAt },
      { merge: true }
    )

    try {
      const { sendAdminNotification, sendCustomerConfirmation } = await import("@/lib/email")
      await sendAdminNotification({
        id,
        customer_name: name,
        customer_email: email,
        customer_phone: phone || "Not provided",
        pickup_location,
        dropoff_location,
        notes,
      }).catch((e) =>
        console.error(`[quote-requests] requestId=${requestId} admin email:`, e)
      )
      await sendCustomerConfirmation({
        name,
        email,
        quote_request_id: id,
      }).catch((e) =>
        console.error(`[quote-requests] requestId=${requestId} customer email:`, e)
      )
    } catch (_) {
      // Email optional
    }

    return NextResponse.json({
      ok: true,
      id,
      checkout_url,
      quote_request: {
        id,
        customer_id: email,
        pickup_location,
        dropoff_location,
        notes: notes ?? null,
        status,
        estimated_amount: depositAmount,
        stripe_checkout_url: checkout_url ?? null,
        created_at: createdAt,
        updated_at: createdAt,
        customer: { id: email, name, email, phone: phone || null },
      },
      message:
        "Quote request submitted successfully! Check your email for confirmation.",
    })
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error)
    console.error(`[quote-requests] requestId=${requestId} error:`, message)
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    )
  }
}
