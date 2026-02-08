import { NextRequest, NextResponse } from "next/server"

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url)
    const raw = searchParams.get("q")
    const q = (typeof raw === "string" ? raw : "").trim()

    if (q.length < 2) {
      return NextResponse.json({ cities: [] })
    }

    return NextResponse.json({ cities: [] })
  } catch (err) {
    const message = err instanceof Error ? err.message : "Unknown error"
    console.error("[cities] error:", message)
    return NextResponse.json(
      { error: "Internal server error", cities: [] },
      { status: 500 }
    )
  }
}
