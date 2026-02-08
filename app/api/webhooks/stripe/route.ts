import { type NextRequest, NextResponse } from "next/server"
import { stripe } from "@/lib/stripe"
import { getFirestoreAdmin, hasFirebase } from "@/lib/firebaseAdmin"
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
      case "checkout.session.completed": {
        const session = event.data.object
        const metadata = session.metadata
        const type = metadata?.type || "quote"
        if (!hasFirebase()) {
          console.warn("Stripe webhook: Firebase not configured, skipping document update")
          break
        }
        const db = getFirestoreAdmin()

        if (type === "quote_request" && metadata?.quote_request_id) {
          const quoteRequestId = metadata.quote_request_id
          const ref = db.collection("quote_requests").doc(quoteRequestId)
          const snap = await ref.get()
          if (snap.exists) {
            await ref.update({
              status: "paid",
              stripe_payment_intent_id: session.payment_intent as string,
              updatedAt: new Date().toISOString(),
            })
            const data = snap.data()
            try {
              const { sendPaymentConfirmation } = await import("@/lib/email")
              await sendPaymentConfirmation({
                name: (data?.full_name ?? data?.name ?? "") as string,
                email: (data?.email ?? "") as string,
                amount: (data?.estimated_amount as number) ?? 0,
                quote_request_id: quoteRequestId,
              })
            } catch (e) {
              console.error("Payment confirmation email failed:", e)
            }
          }
        } else if (type === "quote" && metadata?.quote_id) {
          const quoteId = metadata.quote_id
          const ref = db.collection("quotes").doc(quoteId)
          const snap = await ref.get()
          if (snap.exists) {
            await ref.update({
              status: "paid",
              stripe_payment_intent_id: session.payment_intent as string,
              updated_at: new Date().toISOString(),
            })
            const data = snap.data()
            try {
              const { sendPaymentConfirmation } = await import("@/lib/email")
              await sendPaymentConfirmation({
                name: (data?.customer_name ?? "") as string,
                email: (data?.customer_email ?? "") as string,
                amount: (data?.amount as number) ?? 0,
                quote_request_id: quoteId,
              })
            } catch (e) {
              console.error("Payment confirmation email failed:", e)
            }
          }
        }
        break
      }
      default:
        console.log(`Unhandled event type: ${event.type}`)
    }

    return NextResponse.json({ received: true })
  } catch (error) {
    console.error("Error processing webhook:", error)
    return NextResponse.json({ error: "Webhook processing failed" }, { status: 500 })
  }
}
