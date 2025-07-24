"use client"

import type React from "react"

import { useState } from "react"
import { CustomerList } from "@/components/admin/customer-list"
import { QuoteForm } from "@/components/admin/quote-form"
import { QuoteList } from "@/components/admin/quote-list"
import { QuoteRequestList } from "@/components/admin/quote-request-list"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import type { Customer } from "@/types/database"

export default function AdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [password, setPassword] = useState("")
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(null)
  const [refreshKey, setRefreshKey] = useState(0)

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    // Temporary hardcoded authentication - replace with real auth later
    if (password === "admin123") {
      setIsAuthenticated(true)
    } else {
      alert("Invalid password")
    }
  }

  const handleQuoteCreated = () => {
    setSelectedCustomer(null)
    setRefreshKey((prev) => prev + 1) // Trigger refresh of lists
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle>Admin Login</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleLogin} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              <Button type="submit" className="w-full">
                Login
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
          <p className="text-gray-600 mt-2">Manage customers, quote requests, and quotes</p>
        </div>

        <Tabs defaultValue="quote-requests" className="space-y-8">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="quote-requests">Quote Requests</TabsTrigger>
            <TabsTrigger value="customers">Customers & Quotes</TabsTrigger>
            <TabsTrigger value="quotes">Admin Quotes</TabsTrigger>
          </TabsList>

          <TabsContent value="quote-requests">
            <QuoteRequestList key={refreshKey} />
          </TabsContent>

          <TabsContent value="customers" className="space-y-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div>
                {selectedCustomer ? (
                  <QuoteForm
                    customer={selectedCustomer}
                    onQuoteCreated={handleQuoteCreated}
                    onCancel={() => setSelectedCustomer(null)}
                  />
                ) : (
                  <CustomerList onSelectCustomer={setSelectedCustomer} />
                )}
              </div>
              <div>
                <QuoteList key={refreshKey} />
              </div>
            </div>
          </TabsContent>

          <TabsContent value="quotes">
            <QuoteList key={refreshKey} />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
