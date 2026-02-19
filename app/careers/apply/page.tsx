"use client"

import { FormEvent, useState } from "react"
import Link from "next/link"
import { Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"

type Role = "Driver" | "Dispatcher" | "Broker/Operations"

interface FormState {
  full_name: string
  phone: string
  email: string
  city_state: string
  role: Role
  experience_years: string
  licenses: string
  availability: string
  notes: string
  resume_url: string
}

const initialState: FormState = {
  full_name: "",
  phone: "",
  email: "",
  city_state: "",
  role: "Driver",
  experience_years: "",
  licenses: "",
  availability: "",
  notes: "",
  resume_url: "",
}

export default function CareersApplyPage() {
  const [form, setForm] = useState<FormState>(initialState)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [successId, setSuccessId] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)

  const onSubmit = async (event: FormEvent) => {
    event.preventDefault()
    setError(null)
    setSuccessId(null)
    setIsSubmitting(true)

    try {
      const response = await fetch("/api/careers/applications", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      })

      const data = await response.json().catch(() => null)
      if (!response.ok) {
        setError(data?.error || "Unable to submit application. Please try again.")
        return
      }

      setSuccessId(data?.id || null)
      setForm(initialState)
    } catch {
      setError("Unable to submit application. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <main className="h-screen overflow-y-auto bg-slate-50">
      <div className="mx-auto max-w-3xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="mb-6 flex items-center justify-between gap-3">
          <div>
            <p className="text-sm font-medium uppercase tracking-[0.2em] text-rose-700">Red Square Transport</p>
            <h1 className="text-3xl font-bold tracking-tight text-slate-900">Career Application</h1>
          </div>
          <Button asChild variant="outline">
            <Link href="/careers">Back to Careers</Link>
          </Button>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Apply Now</CardTitle>
            <p className="text-sm text-muted-foreground">
              Fill in your details. Required fields are marked with an asterisk.
            </p>
          </CardHeader>
          <CardContent>
            <form onSubmit={onSubmit} className="space-y-4">
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2 sm:col-span-2">
                  <Label htmlFor="full_name">Full name *</Label>
                  <Input
                    id="full_name"
                    value={form.full_name}
                    onChange={(event) =>
                      setForm((prev) => ({ ...prev, full_name: event.target.value }))
                    }
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="phone">Phone *</Label>
                  <Input
                    id="phone"
                    type="tel"
                    value={form.phone}
                    onChange={(event) =>
                      setForm((prev) => ({ ...prev, phone: event.target.value }))
                    }
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">Email *</Label>
                  <Input
                    id="email"
                    type="email"
                    value={form.email}
                    onChange={(event) =>
                      setForm((prev) => ({ ...prev, email: event.target.value }))
                    }
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="city_state">City, State *</Label>
                  <Input
                    id="city_state"
                    value={form.city_state}
                    onChange={(event) =>
                      setForm((prev) => ({ ...prev, city_state: event.target.value }))
                    }
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label>Role *</Label>
                  <Select
                    value={form.role}
                    onValueChange={(value) =>
                      setForm((prev) => ({ ...prev, role: value as Role }))
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select role" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Driver">Driver</SelectItem>
                      <SelectItem value="Dispatcher">Dispatcher</SelectItem>
                      <SelectItem value="Broker/Operations">Broker/Operations</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="experience_years">Experience (years)</Label>
                  <Input
                    id="experience_years"
                    value={form.experience_years}
                    onChange={(event) =>
                      setForm((prev) => ({ ...prev, experience_years: event.target.value }))
                    }
                  />
                </div>

                <div className="space-y-2 sm:col-span-2">
                  <Label htmlFor="licenses">Licenses / endorsements</Label>
                  <Input
                    id="licenses"
                    placeholder="CDL class, endorsements, certifications"
                    value={form.licenses}
                    onChange={(event) =>
                      setForm((prev) => ({ ...prev, licenses: event.target.value }))
                    }
                  />
                </div>

                <div className="space-y-2 sm:col-span-2">
                  <Label htmlFor="availability">Availability</Label>
                  <Input
                    id="availability"
                    placeholder="Weekdays, nights, weekends, immediate start, etc."
                    value={form.availability}
                    onChange={(event) =>
                      setForm((prev) => ({ ...prev, availability: event.target.value }))
                    }
                  />
                </div>

                <div className="space-y-2 sm:col-span-2">
                  <Label htmlFor="resume_url">Resume URL</Label>
                  <Input
                    id="resume_url"
                    type="url"
                    placeholder="https://..."
                    value={form.resume_url}
                    onChange={(event) =>
                      setForm((prev) => ({ ...prev, resume_url: event.target.value }))
                    }
                  />
                </div>

                <div className="space-y-2 sm:col-span-2">
                  <Label htmlFor="notes">Notes</Label>
                  <Textarea
                    id="notes"
                    className="min-h-[120px]"
                    value={form.notes}
                    onChange={(event) =>
                      setForm((prev) => ({ ...prev, notes: event.target.value }))
                    }
                  />
                </div>
              </div>

              {error && <p className="text-sm font-medium text-red-600">{error}</p>}
              {successId && (
                <p className="text-sm font-medium text-green-700">
                  Application submitted successfully. Reference ID: {successId}
                </p>
              )}

              <Button type="submit" className="w-full sm:w-auto" disabled={isSubmitting}>
                {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                Submit Application
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </main>
  )
}
