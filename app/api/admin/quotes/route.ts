import { type NextRequest, NextResponse } from "next/server"
import { supabaseAdmin } from "@/lib/supabase"
import { createCheckoutSession } from "@/lib/stripe"
import type { CreateQuoteData } from "@/types/database"

export async function POST(request: NextRequest) {
  try {
    const body: CreateQuoteData = await request.json()

    // Validate required fields
    if (!body.customer_id || !body.amount || !body.service_description) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    // Get customer details
    const { data: customer, error: customerError } = await supabaseAdmin
      .from("customers")
      .select("*")
      .eq("id", body.customer_id)
      .single()

    if (customerError || !customer) {
      return NextResponse.json({ error: "Customer not found" }, { status: 404 })
    }

    // Create quote in database
    const { data: quote, error: quoteError } = await supabaseAdmin
      .from("quotes")
      .insert([
        {
          customer_id: body.customer_id,
          amount: body.amount,
          service_description: body.service_description,
          status: "pending",
        },
      ])
      .select()
      .single()

    if (quoteError) {
      return NextResponse.json({ error: "Failed to create quote" }, { status: 500 })
    }

    // Create Stripe checkout session
    const session = await createCheckoutSession(quote.id, body.amount, customer.email, body.service_description)

    // Update quote with Stripe session info
    const { error: updateError } = await supabaseAdmin
      .from("quotes")
      .update({
        stripe_checkout_url: session.url,
        stripe_session_id: session.id,
        status: "sent",
      })
      .eq("id", quote.id)

    if (updateError) {
      console.error("Failed to update quote with Stripe info:", updateError)
    }

    // TODO: Send email to customer with payment link
    // This can be implemented using Supabase Edge Functions or a service like Resend

    return NextResponse.json({
      success: true,
      quote: quote,
      checkout_url: session.url,
    })
  } catch (error) {
    console.error("Error creating quote:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
