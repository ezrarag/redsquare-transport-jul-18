export interface Customer {
  id: string
  name: string
  email: string
  phone?: string
  company?: string
  address?: string
  created_at: string
  updated_at: string
}

export interface QuoteRequest {
  id: string
  customer_id: string
  pickup_location: string
  dropoff_location: string
  notes?: string
  status: "pending_review" | "quoted" | "paid" | "cancelled"
  estimated_amount?: number
  stripe_checkout_url?: string
  stripe_session_id?: string
  stripe_payment_intent_id?: string
  created_at: string
  updated_at: string
  customer?: Customer
}

export interface Quote {
  id: string
  customer_id: string
  amount: number
  service_description: string
  status: "pending" | "sent" | "paid"
  stripe_checkout_url?: string
  stripe_session_id?: string
  stripe_payment_intent_id?: string
  created_at: string
  updated_at: string
  customer?: Customer
}

export interface CreateCustomerData {
  name: string
  email: string
  phone?: string
  company?: string
  address?: string
}

export interface CreateQuoteRequestData {
  name: string
  email: string
  phone: string
  pickup_location: string
  dropoff_location: string
  notes?: string
}

export interface CreateQuoteData {
  customer_id: string
  amount: number
  service_description: string
}
