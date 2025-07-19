"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { supabase } from "@/lib/supabase"
import type { Customer } from "@/types/database"
import { formatDistanceToNow } from "date-fns"

interface CustomerListProps {
  onSelectCustomer: (customer: Customer) => void
}

export function CustomerList({ onSelectCustomer }: CustomerListProps) {
  const [customers, setCustomers] = useState<Customer[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    fetchCustomers()
  }, [])

  const fetchCustomers = async () => {
    try {
      const { data, error } = await supabase.from("customers").select("*").order("created_at", { ascending: false })

      if (error) throw error
      setCustomers(data || [])
    } catch (error) {
      console.error("Error fetching customers:", error)
    } finally {
      setIsLoading(false)
    }
  }

  if (isLoading) {
    return <div>Loading customers...</div>
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Customer Profiles ({customers.length})</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {customers.map((customer) => (
            <div key={customer.id} className="flex items-center justify-between p-4 border rounded-lg">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <h3 className="font-medium">{customer.name}</h3>
                  {customer.company && <Badge variant="secondary">{customer.company}</Badge>}
                </div>
                <p className="text-sm text-muted-foreground">{customer.email}</p>
                {customer.phone && <p className="text-sm text-muted-foreground">{customer.phone}</p>}
                <p className="text-xs text-muted-foreground">
                  Created {formatDistanceToNow(new Date(customer.created_at))} ago
                </p>
              </div>
              <Button onClick={() => onSelectCustomer(customer)} variant="outline" size="sm">
                Create Quote
              </Button>
            </div>
          ))}
          {customers.length === 0 && (
            <p className="text-center text-muted-foreground py-8">
              No customers found. Customers will appear here after they sign up.
            </p>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
