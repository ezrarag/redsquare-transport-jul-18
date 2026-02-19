import { type NextRequest, NextResponse } from "next/server"
import { buildCareersApplyUrl } from "@/lib/site-url"

function parseSize(value: string | null): number {
  const parsed = Number.parseInt(value || "", 10)
  if (!Number.isFinite(parsed)) return 640
  return Math.min(Math.max(parsed, 256), 2400)
}

function parseFormat(value: string | null): "png" | "svg" {
  return value === "svg" ? "svg" : "png"
}

export async function GET(req: NextRequest) {
  try {
    const params = req.nextUrl.searchParams
    const size = parseSize(params.get("size"))
    const format = parseFormat(params.get("format"))
    const asDownload = params.get("download") === "1"

    const targetUrl = buildCareersApplyUrl(req)
    const external = new URL("https://quickchart.io/qr")
    external.searchParams.set("text", targetUrl)
    external.searchParams.set("size", String(size))
    external.searchParams.set("format", format)
    external.searchParams.set("margin", "2")

    const response = await fetch(external.toString(), { cache: "no-store" })
    if (!response.ok) {
      return NextResponse.json(
        { error: "Failed to generate QR code" },
        { status: 502 }
      )
    }

    const data = await response.arrayBuffer()
    const headers = new Headers()
    headers.set(
      "Content-Type",
      format === "svg" ? "image/svg+xml" : "image/png"
    )
    headers.set("Cache-Control", "public, max-age=3600")
    if (asDownload) {
      headers.set(
        "Content-Disposition",
        `attachment; filename="careers-apply-qr.${format}"`
      )
    }

    return new NextResponse(data, {
      status: 200,
      headers,
    })
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error)
    console.error("[careers/qr] error:", message)
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    )
  }
}
