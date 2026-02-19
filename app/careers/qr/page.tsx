import Link from "next/link"
import Image from "next/image"
import { Download, ExternalLink } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function CareersQrPage() {
  return (
    <main className="h-screen overflow-y-auto bg-slate-50">
      <div className="mx-auto max-w-3xl space-y-6 px-4 py-10 sm:px-6 lg:px-8">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-rose-700">Recruiting QR</p>
          <h1 className="text-3xl font-bold tracking-tight text-slate-900">Careers Apply QR Code</h1>
          <p className="mt-2 text-sm text-slate-600">
            This QR code points to the production careers application URL and is optimized for print.
          </p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Preview</CardTitle>
          </CardHeader>
          <CardContent className="space-y-5">
            <div className="inline-block rounded-xl border bg-white p-4">
              <Image
                src="/api/careers/qr?format=png&size=1200"
                alt="QR code for careers application"
                width={320}
                height={320}
                className="h-auto w-full max-w-[320px]"
              />
            </div>

            <div className="flex flex-wrap gap-3">
              <Button asChild>
                <a href="/api/careers/qr?format=png&size=2000&download=1">
                  <Download className="mr-2 h-4 w-4" />
                  Download PNG (Print)
                </a>
              </Button>
              <Button asChild variant="outline">
                <a href="/api/careers/qr?format=svg&size=2000&download=1">
                  <Download className="mr-2 h-4 w-4" />
                  Download SVG
                </a>
              </Button>
              <Button asChild variant="secondary">
                <Link href="/careers/apply">
                  <ExternalLink className="mr-2 h-4 w-4" />
                  Open Application
                </Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </main>
  )
}
