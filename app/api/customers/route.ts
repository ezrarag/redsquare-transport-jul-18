import { type NextRequest, NextResponse } from "next/server"
import { getFirestoreAdmin, hasFirebase } from "@/lib/firebaseAdmin"
import type { CreateCustomerData } from "@/types/database"

export async function POST(request: NextRequest) {
  try {
    if (!hasFirebase()) {
      return NextResponse.json(
        { error: "Service unavailable" },
        { status: 503 }
      )
    }
    const body: CreateCustomerData = await request.json()
    const email = typeof body.email === "string" ? body.email.trim() : ""
    const name = typeof body.name === "string" ? body.name.trim() : ""
    if (!email || !name) {
      return NextResponse.json(
        { error: "Email and name are required" },
        { status: 400 }
      )
    }
    const db = getFirestoreAdmin()
    const createdAt = new Date().toISOString()
    const doc = {
      name,
      email,
      phone: body.phone ?? null,
      company: body.company ?? null,
      address: body.address ?? null,
      createdAt,
    }
    await db.collection("customers").doc(email).set(doc, { merge: true })
    return NextResponse.json({
      id: email,
      ...doc,
      created_at: createdAt,
      updated_at: createdAt,
    })
  } catch (error) {
    console.error("Error creating customer:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
