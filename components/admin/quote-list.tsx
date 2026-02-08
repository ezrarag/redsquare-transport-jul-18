"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ExternalLink } from "lucide-react"
import type { Quote } from "@/types/database"
import { formatDistanceToNow } from "date-fns"

interface QuoteListProps {
  adminToken?: string
}

export function QuoteList({ adminToken }: QuoteListProps) {
  const [quotes, setQuotes] = useState<Quote[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    if (adminToken) fetchQuotes()
    else setIsLoading(false)
  }, [adminToken])

  const fetchQuotes = async () => {
    if (!adminToken) return
    try {
      const res = await fetch("/api/admin/quotes", {
        headers: { Authorization: `Bearer ${adminToken}` },
      })
      if (!res.ok) {
        setQuotes([])
        return
      }
      const data = await res.json()
      setQuotes(data.quotes || [])
    } catch (error) {
      console.error("Error fetching quotes:", error)
    } finally {
      setIsLoading(false)
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "pending":
        return "secondary"
      case "sent":
        return "default"
      case "paid":
        return "default"
      default:
        return "secondary"
    }
  }

  if (isLoading) {
    return <div>Loading quotes...</div>
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Quotes ({quotes.length})</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {quotes.map((quote) => (
            <div key={quote.id} className="flex items-center justify-between p-4 border rounded-lg">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <h3 className="font-medium">${quote.amount.toFixed(2)}</h3>
                  <Badge variant={getStatusColor(quote.status)}>{quote.status.toUpperCase()}</Badge>
                </div>
                <p className="text-sm text-muted-foreground">
                  {quote.customer?.name} ({quote.customer?.email})
                </p>
                <p className="text-sm text-muted-foreground">{quote.service_description}</p>
                <p className="text-xs text-muted-foreground">
                  Created {formatDistanceToNow(new Date(quote.created_at))} ago
                </p>
              </div>
              {quote.stripe_checkout_url && (
                <Button variant="outline" size="sm" onClick={() => window.open(quote.stripe_checkout_url, "_blank")}>
                  <ExternalLink className="h-4 w-4 mr-2" />
                  Payment Link
                </Button>
              )}
            </div>
          ))}
          {quotes.length === 0 && (
            <p className="text-center text-muted-foreground py-8">No quotes found. Create your first quote above.</p>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
