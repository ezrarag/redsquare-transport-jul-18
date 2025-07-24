import { type NextRequest, NextResponse } from "next/server"
import { supabaseAdmin } from "@/lib/supabase"
import { createCheckoutSession } from "@/lib/stripe"
import { sendAdminNotification, sendCustomerConfirmation } from "@/lib/email"
import type { CreateQuoteRequestData } from "@/types/database"

export async function POST(request: NextRequest) {
  try {
    const body: CreateQuoteRequestData = await request.json()

    // Validate required fields
    if (!body.name || !body.email || !body.pickup_location || !body.dropoff_location) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    // Upsert customer
    const { data: customer, error: customerError } = await supabaseAdmin
      .from("customers")
      .upsert(
        [
          {
            name: body.name,
            email: body.email,
            phone: body.phone,
          },
        ],
        {
          onConflict: "email",
          ignoreDuplicates: false,
        },
      )
      .select()
      .single()

    if (customerError) {
      console.error("Customer upsert error:", customerError)
      return NextResponse.json({ error: "Failed to create customer profile" }, { status: 500 })
    }

    // Create quote request
    const { data: quoteRequest, error: quoteRequestError } = await supabaseAdmin
      .from("quote_requests")
      .insert([
        {
          customer_id: customer.id,
          pickup_location: body.pickup_location,
          dropoff_location: body.dropoff_location,
          notes: body.notes,
          status: "pending_review",
          estimated_amount: Number.parseFloat(process.env.DEFAULT_DEPOSIT_AMOUNT || "100.00"),
        },
      ])
      .select()
      .single()

    if (quoteRequestError) {
      console.error("Quote request error:", quoteRequestError)
      return NextResponse.json({ error: "Failed to create quote request" }, { status: 500 })
    }

    // Create Stripe checkout session for deposit/flat rate
    const depositAmount = Number.parseFloat(process.env.DEFAULT_DEPOSIT_AMOUNT || "100.00")
    const session = await createCheckoutSession(
      quoteRequest.id,
      depositAmount,
      customer.email,
      `Logistics Service Deposit - Pickup: ${body.pickup_location} → Dropoff: ${body.dropoff_location}`,
      "quote_request",
    )

    // Update quote request with Stripe session info
    const { error: updateError } = await supabaseAdmin
      .from("quote_requests")
      .update({
        stripe_checkout_url: session.url,
        stripe_session_id: session.id,
      })
      .eq("id", quoteRequest.id)

    if (updateError) {
      console.error("Failed to update quote request with Stripe info:", updateError)
    }

    // Send admin notification email
    await sendAdminNotification({
      id: quoteRequest.id,
      customer_name: customer.name,
      customer_email: customer.email,
      customer_phone: customer.phone || "Not provided",
      pickup_location: body.pickup_location,
      dropoff_location: body.dropoff_location,
      notes: body.notes,
    })

    // Send customer confirmation email
    await sendCustomerConfirmation({
      name: customer.name,
      email: customer.email,
      quote_request_id: quoteRequest.id,
    })

    return NextResponse.json({
      success: true,
      quote_request: quoteRequest,
      checkout_url: session.url,
      message: "Quote request submitted successfully! Check your email for confirmation.",
    })
  } catch (error) {
    console.error("Error creating quote request:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
