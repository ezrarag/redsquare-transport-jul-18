import { type NextRequest, NextResponse } from "next/server"
import { stripe } from "@/lib/stripe"
import { supabaseAdmin } from "@/lib/supabase"
import { sendPaymentConfirmation } from "@/lib/email"
import { headers } from "next/headers"

export async function POST(request: NextRequest) {
  const body = await request.text()
  const signature = headers().get("stripe-signature")

  if (!signature) {
    return NextResponse.json({ error: "No signature provided" }, { status: 400 })
  }

  let event

  try {
    event = stripe.webhooks.constructEvent(body, signature, process.env.STRIPE_WEBHOOK_SECRET!)
  } catch (err) {
    console.error("Webhook signature verification failed:", err)
    return NextResponse.json({ error: "Invalid signature" }, { status: 400 })
  }

  try {
    switch (event.type) {
      case "checkout.session.completed":
        const session = event.data.object
        const metadata = session.metadata
        const type = metadata?.type || "quote"

        if (type === "quote_request" && metadata?.quote_request_id) {
          // Handle quote request payment
          const quoteRequestId = metadata.quote_request_id

          // Update quote request status to paid
          const { data: quoteRequest, error: updateError } = await supabaseAdmin
            .from("quote_requests")
            .update({
              status: "paid",
              stripe_payment_intent_id: session.payment_intent as string,
            })
            .eq("id", quoteRequestId)
            .select(`
              *,
              customer:customers(*)
            `)
            .single()

          if (updateError) {
            console.error("Failed to update quote request status:", updateError)
          } else if (quoteRequest?.customer) {
            // Send payment confirmation email
            await sendPaymentConfirmation({
              name: quoteRequest.customer.name,
              email: quoteRequest.customer.email,
              amount: quoteRequest.estimated_amount || 0,
              quote_request_id: quoteRequest.id,
            })
          }
        } else if (type === "quote" && metadata?.quote_id) {
          // Handle admin-created quote payment (existing logic)
          const quoteId = metadata.quote_id

          const { data: quote, error: updateError } = await supabaseAdmin
            .from("quotes")
            .update({
              status: "paid",
              stripe_payment_intent_id: session.payment_intent as string,
            })
            .eq("id", quoteId)
            .select(`
              *,
              customer:customers(*)
            `)
            .single()

          if (updateError) {
            console.error("Failed to update quote status:", updateError)
          } else if (quote?.customer) {
            // Send payment confirmation email for admin quotes
            await sendPaymentConfirmation({
              name: quote.customer.name,
              email: quote.customer.email,
              amount: quote.amount,
              quote_request_id: quote.id,
            })
          }
        }
        break

      default:
        console.log(`Unhandled event type: ${event.type}`)
    }

    return NextResponse.json({ received: true })
  } catch (error) {
    console.error("Error processing webhook:", error)
    return NextResponse.json({ error: "Webhook processing failed" }, { status: 500 })
  }
}
