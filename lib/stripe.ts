import Stripe from "stripe"

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2024-06-20",
})

export const createCheckoutSession = async (
  id: string,
  amount: number,
  customerEmail: string,
  serviceDescription: string,
  type: "quote" | "quote_request" = "quote",
) => {
  const session = await stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    line_items: [
      {
        price_data: {
          currency: "usd",
          product_data: {
            name: "Red Square Transport Service",
            description: serviceDescription,
          },
          unit_amount: Math.round(amount * 100), // Convert to cents
        },
        quantity: 1,
      },
    ],
    mode: "payment",
    success_url: `${process.env.NEXT_PUBLIC_APP_URL}/payment/success?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${process.env.NEXT_PUBLIC_APP_URL}/payment/cancel`,
    customer_email: customerEmail,
    metadata: {
      [type === "quote_request" ? "quote_request_id" : "quote_id"]: id,
      type: type,
    },
  })

  return session
}
