import type React from "react"
import type { Metadata } from "next"
import "./globals.css"

export const metadata: Metadata = {
  title: "Red Square Transport - Professional Logistics Solutions",
  description: "Reliable shipping and freight services with modern fleet and nationwide coverage",
  generator: "v0.dev",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className="overflow-hidden">{children}</body>
    </html>
  )
}
