// Lazy-load Resend only when sending (avoids build-time init when RESEND_API_KEY is missing)
async function getResend(): Promise<InstanceType<typeof import("resend").Resend> | null> {
  const key = process.env.RESEND_API_KEY
  if (!key) return null
  try {
    const { Resend } = await import("resend")
    return new Resend(key)
  } catch {
    return null
  }
}

export async function sendAdminNotification(quoteRequest: {
  id: string
  customer_name: string
  customer_email: string
  customer_phone: string
  pickup_location: string
  dropoff_location: string
  notes?: string
}) {
  try {
    const resend = await getResend()
    if (!resend || !process.env.ADMIN_EMAIL) {
      return { success: false, error: "Email not configured" }
    }
    const { data, error } = await resend.emails.send({
      from: "Red Square Transport <noreply@redsquaretransport.com>",
      to: [process.env.ADMIN_EMAIL],
      subject: "New Quote Request Received",
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #dc2626;">New Quote Request</h2>
          
          <div style="background: #f9fafb; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3>Customer Information</h3>
            <p><strong>Name:</strong> ${quoteRequest.customer_name}</p>
            <p><strong>Email:</strong> ${quoteRequest.customer_email}</p>
            <p><strong>Phone:</strong> ${quoteRequest.customer_phone}</p>
          </div>

          <div style="background: #f9fafb; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3>Shipping Details</h3>
            <p><strong>Pickup Location:</strong> ${quoteRequest.pickup_location}</p>
            <p><strong>Dropoff Location:</strong> ${quoteRequest.dropoff_location}</p>
            ${quoteRequest.notes ? `<p><strong>Notes:</strong> ${quoteRequest.notes}</p>` : ""}
          </div>

          <div style="margin: 30px 0;">
            <a href="${process.env.NEXT_PUBLIC_APP_URL}/admin" 
               style="background: #dc2626; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; display: inline-block;">
              Review in Admin Dashboard
            </a>
          </div>

          <p style="color: #6b7280; font-size: 14px;">
            Quote Request ID: ${quoteRequest.id}
          </p>
        </div>
      `,
    })

    if (error) {
      console.error("Failed to send admin notification:", error)
      return { success: false, error }
    }

    return { success: true, data }
  } catch (error) {
    console.error("Email service error:", error)
    return { success: false, error }
  }
}

export async function sendCustomerConfirmation(customer: {
  name: string
  email: string
  quote_request_id: string
}) {
  try {
    const resend = await getResend()
    if (!resend) return { success: false, error: "Email not configured" }
    const { data, error } = await resend.emails.send({
      from: "Red Square Transport <noreply@redsquaretransport.com>",
      to: [customer.email],
      subject: "Quote Request Received - Red Square Transport",
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <div style="text-align: center; margin-bottom: 30px;">
            <h1 style="color: #dc2626;">Red Square Transport</h1>
          </div>

          <h2>Thank you for your quote request!</h2>
          
          <p>Dear ${customer.name},</p>
          
          <p>We've received your quote request and our team will review it shortly. You can expect to hear back from us within 24 hours with a detailed quote.</p>

          <div style="background: #fef2f2; border-left: 4px solid #dc2626; padding: 20px; margin: 20px 0;">
            <h3 style="margin-top: 0; color: #dc2626;">What happens next?</h3>
            <ol style="margin: 0;">
              <li>Our logistics experts review your requirements</li>
              <li>We prepare a customized quote for your shipment</li>
              <li>You'll receive an email with pricing and payment options</li>
              <li>Once approved, we schedule your pickup</li>
            </ol>
          </div>

          <p>If you have any questions in the meantime, please don't hesitate to contact us:</p>
          <ul>
            <li>Phone: (555) 123-4567</li>
            <li>Email: info@redsquaretransport.com</li>
          </ul>

          <p>Thank you for choosing Red Square Transport!</p>
          
          <p style="color: #6b7280; font-size: 14px; margin-top: 30px;">
            Reference ID: ${customer.quote_request_id}
          </p>
        </div>
      `,
    })

    if (error) {
      console.error("Failed to send customer confirmation:", error)
      return { success: false, error }
    }

    return { success: true, data }
  } catch (error) {
    console.error("Email service error:", error)
    return { success: false, error }
  }
}

export async function sendPaymentConfirmation(customer: {
  name: string
  email: string
  amount: number
  quote_request_id: string
}) {
  try {
    const resend = await getResend()
    if (!resend) return { success: false, error: "Email not configured" }
    const { data, error } = await resend.emails.send({
      from: "Red Square Transport <noreply@redsquaretransport.com>",
      to: [customer.email],
      subject: "Payment Confirmed - Red Square Transport",
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <div style="text-align: center; margin-bottom: 30px;">
            <h1 style="color: #dc2626;">Red Square Transport</h1>
          </div>

          <h2 style="color: #059669;">Payment Confirmed!</h2>
          
          <p>Dear ${customer.name},</p>
          
          <p>Thank you for your payment of <strong>$${customer.amount.toFixed(2)}</strong>. Your logistics service has been confirmed and we'll be in touch soon with pickup details.</p>

          <div style="background: #f0fdf4; border-left: 4px solid #059669; padding: 20px; margin: 20px 0;">
            <h3 style="margin-top: 0; color: #059669;">Next Steps</h3>
            <p>Our operations team will contact you within 24 hours to:</p>
            <ul style="margin: 0;">
              <li>Confirm pickup and delivery details</li>
              <li>Provide tracking information</li>
              <li>Answer any questions about your shipment</li>
            </ul>
          </div>

          <p>If you need immediate assistance, please contact us:</p>
          <ul>
            <li>Phone: (555) 123-4567</li>
            <li>Email: info@redsquaretransport.com</li>
          </ul>

          <p>Thank you for choosing Red Square Transport!</p>
          
          <p style="color: #6b7280; font-size: 14px; margin-top: 30px;">
            Reference ID: ${customer.quote_request_id}
          </p>
        </div>
      `,
    })

    if (error) {
      console.error("Failed to send payment confirmation:", error)
      return { success: false, error }
    }

    return { success: true, data }
  } catch (error) {
    console.error("Email service error:", error)
    return { success: false, error }
  }
}
