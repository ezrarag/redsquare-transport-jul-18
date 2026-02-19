import Link from "next/link"
import Image from "next/image"
import { ArrowRight, CheckCircle2, QrCode } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

const roles = [
  {
    title: "Driver",
    bullets: [
      "Operate safely with on-time deliveries.",
      "Communicate clearly with dispatch and customers.",
      "Keep logs and equipment in top condition.",
    ],
  },
  {
    title: "Dispatcher",
    bullets: [
      "Coordinate routes, timing, and driver assignments.",
      "Track loads and keep customers informed.",
      "Handle exceptions quickly and professionally.",
    ],
  },
  {
    title: "Broker/Operations",
    bullets: [
      "Source and manage carrier capacity.",
      "Negotiate rates and monitor margins.",
      "Support day-to-day logistics operations.",
    ],
  },
]

export default function CareersPage() {
  return (
    <main className="h-screen overflow-y-auto bg-slate-950 text-slate-100">
      <section className="border-b border-slate-800 bg-gradient-to-br from-rose-700 via-rose-800 to-slate-950">
        <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8">
          <p className="text-sm font-semibold uppercase tracking-[0.25em] text-rose-200">
            Careers at Red Square Transport
          </p>
          <h1 className="mt-3 text-4xl font-bold tracking-tight sm:text-5xl">
            Drive Growth With a Team That Moves Fast
          </h1>
          <p className="mt-4 max-w-2xl text-base text-slate-200 sm:text-lg">
            We are hiring dependable people across operations. Choose your role,
            submit your application, and we will follow up quickly.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Button asChild className="bg-lime-400 text-black hover:bg-lime-300">
              <Link href="/careers/apply">
                Apply Now <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button asChild variant="outline" className="border-slate-400 text-slate-100 hover:bg-slate-800">
              <Link href="/careers/qr">Download QR</Link>
            </Button>
          </div>
        </div>
      </section>

      <section className="mx-auto grid max-w-6xl gap-6 px-4 py-10 sm:px-6 md:grid-cols-2 lg:grid-cols-3 lg:px-8">
        {roles.map((role) => (
          <Card key={role.title} className="border-slate-800 bg-slate-900 text-slate-100">
            <CardHeader>
              <CardTitle>{role.title}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {role.bullets.map((bullet) => (
                <div key={bullet} className="flex items-start gap-2 text-sm text-slate-300">
                  <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-lime-400" />
                  <span>{bullet}</span>
                </div>
              ))}
            </CardContent>
          </Card>
        ))}
      </section>

      <section className="mx-auto max-w-6xl px-4 pb-14 sm:px-6 lg:px-8">
        <Card className="border-slate-800 bg-slate-900 text-slate-100">
          <CardContent className="grid items-center gap-6 p-6 md:grid-cols-[1fr_auto]">
            <div>
              <div className="flex items-center gap-2 text-base font-semibold text-lime-300">
                <QrCode className="h-5 w-5" />
                Quick Apply QR
              </div>
              <p className="mt-2 text-sm text-slate-300">
                Put this QR on trucks, flyers, or recruiting banners so applicants can
                open the form instantly.
              </p>
              <div className="mt-4 flex flex-wrap gap-3">
                <Button asChild size="sm">
                  <Link href="/careers/apply">Open Application</Link>
                </Button>
                <Button asChild size="sm" variant="outline" className="border-slate-600 text-slate-100 hover:bg-slate-800">
                  <Link href="/careers/qr">Download Print Assets</Link>
                </Button>
              </div>
            </div>
            <Link
              href="/careers/qr"
              className="rounded-xl border border-slate-700 bg-white p-3 transition hover:scale-[1.01]"
              aria-label="Open careers QR page"
            >
              <Image
                src="/api/careers/qr?format=png&size=512"
                alt="QR code to careers application"
                width={180}
                height={180}
                className="h-[180px] w-[180px]"
              />
            </Link>
          </CardContent>
        </Card>
      </section>
    </main>
  )
}
