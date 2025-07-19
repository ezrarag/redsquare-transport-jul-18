"use client"

import type React from "react"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { X, Loader2, CheckCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"

interface QuoteModalProps {
  isOpen: boolean
  onClose: () => void
}

interface QuoteFormData {
  name: string
  email: string
  phone: string
  pickup_location: string
  dropoff_location: string
  notes: string
}

export function QuoteModal({ isOpen, onClose }: QuoteModalProps) {
  const [formData, setFormData] = useState<QuoteFormData>({
    name: "",
    email: "",
    phone: "",
    pickup_location: "",
    dropoff_location: "",
    notes: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [checkoutUrl, setCheckoutUrl] = useState<string | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      const response = await fetch("/api/quote-requests", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      })

      if (!response.ok) {
        throw new Error("Failed to submit quote request")
      }

      const result = await response.json()
      setCheckoutUrl(result.checkout_url)
      setIsSuccess(true)
    } catch (error) {
      console.error("Error submitting quote request:", error)
      alert("Failed to submit quote request. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const handleClose = () => {
    setFormData({
      name: "",
      email: "",
      phone: "",
      pickup_location: "",
      dropoff_location: "",
      notes: "",
    })
    setIsSuccess(false)
    setCheckoutUrl(null)
    onClose()
  }

  const handlePayNow = () => {
    if (checkoutUrl) {
      window.open(checkoutUrl, "_blank")
    }
  }

  const modalVariants = {
    closed: {
      opacity: 0,
      scale: 0.95,
    },
    open: {
      opacity: 1,
      scale: 1,
    },
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[90] bg-black/50 backdrop-blur-sm"
            onClick={handleClose}
          />

          {/* Modal */}
          <motion.div
            variants={modalVariants}
            initial="closed"
            animate="open"
            exit="closed"
            transition={{ duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4"
          >
            <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md max-h-[90vh] overflow-y-auto">
              {isSuccess ? (
                // Success State
                <div className="p-6 text-center">
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-2xl font-bold">Quote Submitted!</h2>
                    <button
                      onClick={handleClose}
                      className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center hover:bg-gray-200 transition-colors"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>

                  <CheckCircle className="h-16 w-16 text-green-600 mx-auto mb-4" />

                  <h3 className="text-xl font-semibold mb-2">Thank you!</h3>
                  <p className="text-gray-600 mb-6">
                    Your quote request has been submitted successfully. We've sent a confirmation email with next steps.
                  </p>

                  <div className="space-y-3">
                    <Button onClick={handlePayNow} className="w-full bg-red-600 hover:bg-red-700 text-white">
                      Pay Deposit Now ($100)
                    </Button>
                    <Button onClick={handleClose} variant="outline" className="w-full bg-transparent">
                      I'll Pay Later
                    </Button>
                  </div>

                  <p className="text-sm text-gray-500 mt-4">
                    You can also wait for our detailed quote before making payment.
                  </p>
                </div>
              ) : (
                // Form State
                <>
                  {/* Header */}
                  <div className="flex items-center justify-between p-6 border-b">
                    <h2 className="text-2xl font-bold">Request a Quote</h2>
                    <button
                      onClick={handleClose}
                      className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center hover:bg-gray-200 transition-colors"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>

                  {/* Form */}
                  <form onSubmit={handleSubmit} className="p-6 space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">Full Name *</Label>
                      <Input
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        className="border-gray-200 focus:border-red-500 focus:ring-red-500"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="email">Email Address *</Label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="border-gray-200 focus:border-red-500 focus:ring-red-500"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone Number *</Label>
                      <Input
                        id="phone"
                        name="phone"
                        type="tel"
                        value={formData.phone}
                        onChange={handleChange}
                        required
                        className="border-gray-200 focus:border-red-500 focus:ring-red-500"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="pickup_location">Pickup Location *</Label>
                      <Input
                        id="pickup_location"
                        name="pickup_location"
                        value={formData.pickup_location}
                        onChange={handleChange}
                        required
                        className="border-gray-200 focus:border-red-500 focus:ring-red-500"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="dropoff_location">Dropoff Location *</Label>
                      <Input
                        id="dropoff_location"
                        name="dropoff_location"
                        value={formData.dropoff_location}
                        onChange={handleChange}
                        required
                        className="border-gray-200 focus:border-red-500 focus:ring-red-500"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="notes">Additional Notes</Label>
                      <Textarea
                        id="notes"
                        name="notes"
                        value={formData.notes}
                        onChange={handleChange}
                        rows={3}
                        className="border-gray-200 focus:border-red-500 focus:ring-red-500"
                        placeholder="Tell us about your shipping needs..."
                      />
                    </div>

                    <Button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full bg-red-600 hover:bg-red-700 text-white"
                    >
                      {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                      {isSubmitting ? "Submitting..." : "Submit Quote Request"}
                    </Button>

                    <p className="text-xs text-gray-500 text-center">
                      We'll review your request and send you a detailed quote within 24 hours.
                    </p>
                  </form>
                </>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
