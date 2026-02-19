import { type NextRequest, NextResponse } from "next/server"
import { listCareerApplications } from "@/lib/career-application-store"

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

    const career_applications = await listCareerApplications()
    return NextResponse.json({ career_applications })
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error)
    console.error("[admin/career-applications] error:", message)
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    )
  }
}
