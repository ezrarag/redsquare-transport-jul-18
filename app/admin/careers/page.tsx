"use client"

import type React from "react"
import { useMemo, useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

type CareerRole = "Driver" | "Dispatcher" | "Broker/Operations"

interface CareerApplication {
  id: string
  full_name: string
  phone: string
  email: string
  city_state: string
  role: CareerRole
  experience_years: string | null
  licenses: string | null
  availability: string | null
  notes: string | null
  resume_url: string | null
  created_at: string
}

export default function AdminCareersPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [password, setPassword] = useState("")
  const [adminToken, setAdminToken] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [applications, setApplications] = useState<CareerApplication[]>([])
  const [selectedId, setSelectedId] = useState<string | null>(null)

  const selectedApplication = useMemo(
    () => applications.find((item) => item.id === selectedId) || null,
    [applications, selectedId]
  )

  const fetchApplications = async (token: string) => {
    setIsLoading(true)
    try {
      const response = await fetch("/api/admin/career-applications", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })

      if (!response.ok) {
        setApplications([])
        return false
      }

      const data = await response.json()
      const rows = Array.isArray(data?.career_applications)
        ? data.career_applications
        : []
      setApplications(rows)
      setSelectedId(rows[0]?.id || null)
      return true
    } catch {
      setApplications([])
      return false
    } finally {
      setIsLoading(false)
    }
  }

  const handleLogin = async (event: React.FormEvent) => {
    event.preventDefault()
    const ok = await fetchApplications(password)
    if (!ok) {
      alert("Invalid password")
      return
    }

    setAdminToken(password)
    setIsAuthenticated(true)
  }

  if (!isAuthenticated) {
    return (
      <main className="h-screen overflow-y-auto bg-gray-50 p-4">
        <div className="mx-auto flex min-h-full w-full max-w-md items-center justify-center">
          <Card className="w-full">
            <CardHeader>
              <CardTitle>Admin - Career Applications</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleLogin} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="password">Password</Label>
                  <Input
                    id="password"
                    type="password"
                    value={password}
                    onChange={(event) => setPassword(event.target.value)}
                    required
                  />
                </div>
                <Button type="submit" className="w-full" disabled={isLoading}>
                  {isLoading ? "Checking..." : "Login"}
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </main>
    )
  }

  return (
    <main className="h-screen overflow-y-auto bg-gray-50 p-4">
      <div className="mx-auto max-w-7xl space-y-5">
        <div className="flex items-center justify-between gap-3">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Career Applications</h1>
            <p className="text-sm text-gray-600">Newest submissions appear first.</p>
          </div>
          <Button
            variant="outline"
            onClick={() => {
              void fetchApplications(adminToken)
            }}
            disabled={isLoading}
          >
            Refresh
          </Button>
        </div>

        <div className="grid gap-4 lg:grid-cols-[1.15fr_0.85fr]">
          <Card>
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <table className="w-full min-w-[760px] text-left text-sm">
                  <thead className="bg-gray-100 text-gray-600">
                    <tr>
                      <th className="px-4 py-3 font-medium">Date</th>
                      <th className="px-4 py-3 font-medium">Name</th>
                      <th className="px-4 py-3 font-medium">Role</th>
                      <th className="px-4 py-3 font-medium">Phone</th>
                      <th className="px-4 py-3 font-medium">Email</th>
                      <th className="px-4 py-3 font-medium">City/State</th>
                    </tr>
                  </thead>
                  <tbody>
                    {applications.map((application) => (
                      <tr
                        key={application.id}
                        onClick={() => setSelectedId(application.id)}
                        className={`cursor-pointer border-t transition hover:bg-gray-50 ${
                          selectedId === application.id ? "bg-red-50" : ""
                        }`}
                      >
                        <td className="whitespace-nowrap px-4 py-3">
                          {new Date(application.created_at).toLocaleString()}
                        </td>
                        <td className="px-4 py-3 font-medium text-gray-900">{application.full_name}</td>
                        <td className="whitespace-nowrap px-4 py-3">{application.role}</td>
                        <td className="whitespace-nowrap px-4 py-3">{application.phone}</td>
                        <td className="px-4 py-3">{application.email}</td>
                        <td className="px-4 py-3">{application.city_state}</td>
                      </tr>
                    ))}
                    {applications.length === 0 && (
                      <tr>
                        <td colSpan={6} className="px-4 py-8 text-center text-gray-500">
                          No applications found.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Application Detail</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-sm">
              {selectedApplication ? (
                <>
                  <Detail label="Submitted" value={new Date(selectedApplication.created_at).toLocaleString()} />
                  <Detail label="Name" value={selectedApplication.full_name} />
                  <Detail label="Role" value={selectedApplication.role} />
                  <Detail label="Phone" value={selectedApplication.phone} />
                  <Detail label="Email" value={selectedApplication.email} />
                  <Detail label="City / State" value={selectedApplication.city_state} />
                  <Detail label="Experience" value={selectedApplication.experience_years || "-"} />
                  <Detail label="Licenses" value={selectedApplication.licenses || "-"} />
                  <Detail label="Availability" value={selectedApplication.availability || "-"} />
                  <Detail label="Resume URL" value={selectedApplication.resume_url || "-"} />
                  <Detail label="Notes" value={selectedApplication.notes || "-"} />
                </>
              ) : (
                <p className="text-gray-500">Select an application to view details.</p>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </main>
  )
}

function Detail({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="font-medium text-gray-700">{label}</p>
      <p className="mt-0.5 break-words text-gray-900">{value}</p>
    </div>
  )
}
