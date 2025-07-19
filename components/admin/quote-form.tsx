"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Loader2 } from "lucide-react"
import type { Customer, CreateQuoteData } from "@/types/database"

interface QuoteFormProps {
  customer: Customer
  onQuoteCreated: () => void
  onCancel: () => void
}

export function QuoteForm({ customer, onQuoteCreated, onCancel }: QuoteFormProps) {
  const [formData, setFormData] = useState<Omit<CreateQuoteData, "customer_id">>({
    amount: 0,
    service_description: "",
  })
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError(null)

    try {
      const response = await fetch("/api/admin/quotes", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          customer_id: customer.id,
          amount: formData.amount,
          service_description: formData.service_description,
        }),
      })

      if (!response.ok) {
        throw new Error("Failed to create quote")
      }

      onQuoteCreated()
    } catch (err) {
      setError("Failed to create quote. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const value = e.target.name === "amount" ? Number.parseFloat(e.target.value) || 0 : e.target.value
    setFormData({
      ...formData,
      [e.target.name]: value,
    })
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Create Quote for {customer.name}</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="p-4 bg-muted rounded-lg">
            <h4 className="font-medium">Customer Details</h4>
            <p className="text-sm text-muted-foreground">{customer.email}</p>
            {customer.company && <p className="text-sm text-muted-foreground">{customer.company}</p>}
          </div>

          <div className="space-y-2">
            <Label htmlFor="amount">Quote Amount ($) *</Label>
            <Input
              id="amount"
              name="amount"
              type="number"
              step="0.01"
              min="0"
              value={formData.amount}
              onChange={handleChange}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="service_description">Service Description *</Label>
            <Textarea
              id="service_description"
              name="service_description"
              value={formData.service_description}
              onChange={handleChange}
              rows={4}
              placeholder="Describe the logistics service being quoted..."
              required
            />
          </div>

          {error && (
            <Alert variant="destructive">
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          <div className="flex gap-2">
            <Button type="submit" disabled={isLoading}>
              {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Create Quote & Send Payment Link
            </Button>
            <Button type="button" variant="outline" onClick={onCancel}>
              Cancel
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  )
}
