import type { NextRequest } from "next/server"

function normalizeBaseUrl(url: string): string {
  return url.replace(/\/+$/, "")
}

function getConfiguredSiteUrl(): string | null {
  const configured =
    process.env.NEXT_PUBLIC_SITE_URL || process.env.SITE_URL || process.env.APP_URL
  if (!configured) return null

  const normalized = configured.startsWith("http")
    ? configured
    : `https://${configured}`
  return normalizeBaseUrl(normalized)
}

export function resolveBaseUrl(req?: NextRequest): string {
  const configured = getConfiguredSiteUrl()
  if (configured) return configured

  const vercel = process.env.VERCEL_URL
  if (vercel && vercel.length > 0) {
    return normalizeBaseUrl(`https://${vercel}`)
  }

  const host = req?.headers.get("x-forwarded-host") || req?.headers.get("host")
  if (host && host.length > 0) {
    const proto = req?.headers.get("x-forwarded-proto") || "https"
    return normalizeBaseUrl(`${proto}://${host}`)
  }

  return "http://localhost:3000"
}

export function buildCareersApplyUrl(req?: NextRequest): string {
  return `${resolveBaseUrl(req)}/careers/apply`
}
