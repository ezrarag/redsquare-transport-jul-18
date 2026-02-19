import { type NextRequest, NextResponse } from "next/server"
import {
  appendCareerApplication,
  isValidCareerRole,
} from "@/lib/career-application-store"

interface CareerApplicationBody {
  full_name?: unknown
  phone?: unknown
  email?: unknown
  city_state?: unknown
  role?: unknown
  experience_years?: unknown
  licenses?: unknown
  availability?: unknown
  notes?: unknown
  resume_url?: unknown
}

function asString(value: unknown): string {
  return typeof value === "string" ? value.trim() : ""
}

export async function POST(request: NextRequest) {
  try {
    let body: CareerApplicationBody
    try {
      body = (await request.json()) as CareerApplicationBody
    } catch {
      return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 })
    }

    const full_name = asString(body.full_name)
    const phone = asString(body.phone)
    const email = asString(body.email)
    const city_state = asString(body.city_state)
    const role = asString(body.role)

    if (!full_name || !phone || !email || !city_state || !role) {
      return NextResponse.json(
        {
          error:
            "Missing required fields: full_name, phone, email, city_state, role",
        },
        { status: 400 }
      )
    }

    if (!isValidCareerRole(role)) {
      return NextResponse.json(
        { error: "Invalid role. Must be Driver, Dispatcher, or Broker/Operations." },
        { status: 400 }
      )
    }

    const inserted = await appendCareerApplication({
      full_name,
      phone,
      email,
      city_state,
      role,
      experience_years: asString(body.experience_years),
      licenses: asString(body.licenses),
      availability: asString(body.availability),
      notes: asString(body.notes),
      resume_url: asString(body.resume_url),
    })

    return NextResponse.json({ ok: true, id: inserted.id })
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error)
    console.error("[careers/applications] error:", message)
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    )
  }
}
