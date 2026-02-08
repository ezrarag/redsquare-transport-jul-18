"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ExternalLink } from "lucide-react"
import type { QuoteRequest } from "@/types/database"
import { formatDistanceToNow } from "date-fns"

interface QuoteRequestListProps {
  adminToken?: string
}

export function QuoteRequestList({ adminToken }: QuoteRequestListProps) {
  const [quoteRequests, setQuoteRequests] = useState<QuoteRequest[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    if (adminToken) {
      fetchQuoteRequests()
    } else {
      setIsLoading(false)
    }
  }, [adminToken])

  const fetchQuoteRequests = async () => {
    if (!adminToken) return
    try {
      const res = await fetch("/api/admin/quote-requests", {
        headers: { Authorization: `Bearer ${adminToken}` },
      })
      if (!res.ok) {
        setQuoteRequests([])
        return
      }
      const data = await res.json()
      setQuoteRequests(data.quote_requests || [])
    } catch (error) {
      console.error("Error fetching quote requests:", error)
      setQuoteRequests([])
    } finally {
      setIsLoading(false)
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "pending_review":
        return "secondary"
      case "quoted":
        return "default"
      case "paid":
        return "default"
      case "cancelled":
        return "destructive"
      default:
        return "secondary"
    }
  }

  if (isLoading) {
    return <div>Loading quote requests...</div>
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Quote Requests ({quoteRequests.length})</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {quoteRequests.map((request) => (
            <div key={request.id} className="flex items-center justify-between p-4 border rounded-lg">
              <div className="space-y-1 flex-1">
                <div className="flex items-center gap-2">
                  <h3 className="font-medium">{request.customer?.name}</h3>
                  <Badge variant={getStatusColor(request.status)}>
                    {request.status.replace("_", " ").toUpperCase()}
                  </Badge>
                  {request.estimated_amount && <Badge variant="outline">${request.estimated_amount.toFixed(2)}</Badge>}
                </div>
                <p className="text-sm text-muted-foreground">{request.customer?.email}</p>
                <p className="text-sm text-muted-foreground">
                  {request.pickup_location} → {request.dropoff_location}
                </p>
                {request.notes && <p className="text-sm text-muted-foreground italic">"{request.notes}"</p>}
                <p className="text-xs text-muted-foreground">
                  Created {formatDistanceToNow(new Date(request.created_at))} ago
                </p>
              </div>
              <div className="flex gap-2">
                {request.stripe_checkout_url && (
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => window.open(request.stripe_checkout_url, "_blank")}
                  >
                    <ExternalLink className="h-4 w-4 mr-2" />
                    Payment Link
                  </Button>
                )}
              </div>
            </div>
          ))}
          {quoteRequests.length === 0 && (
            <p className="text-center text-muted-foreground py-8">
              No quote requests found. Requests will appear here when customers submit the quote form.
            </p>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
