"use client"

import { motion, AnimatePresence } from "framer-motion"
import { X, MapPin, Phone, Mail, Clock } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { useState } from "react"

interface ContactModalProps {
  isOpen: boolean
  onClose: () => void
}

export function ContactModal({ isOpen, onClose }: ContactModalProps) {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    company: "",
    subject: "",
    message: ""
  })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Here you would typically send the form data to your backend
    console.log("Contact form submitted:", formData)
    // Reset form
    setFormData({
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      company: "",
      subject: "",
      message: ""
    })
    onClose()
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[200] bg-black/50 backdrop-blur-sm"
          onClick={onClose}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-[201] flex items-center justify-center p-4"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
              {/* Header */}
              <div className="flex items-center justify-between p-6 border-b">
                <div className="flex items-center gap-3">
                  <div className="h-8 w-8 bg-red-600 rounded-sm"></div>
                  <h2 className="text-2xl font-bold text-gray-900">Contact Us</h2>
                </div>
                <button
                  onClick={onClose}
                  className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              <div className="p-6">
                <div className="grid gap-6 lg:grid-cols-2 lg:gap-12">
                  {/* Contact Information */}
                  <div className="space-y-6">
                    <div className="space-y-4">
                      <h3 className="text-xl font-semibold text-gray-900">Get in Touch</h3>
                      <p className="text-gray-600">
                        Ready to join our team? Contact us today and let's discuss how you can be part of our mission.
                      </p>
                    </div>
                    <div className="space-y-4">
                      <Card>
                        <CardHeader className="pb-3">
                          <CardTitle className="flex items-center gap-2 text-lg">
                            <MapPin className="h-5 w-5 text-red-600" />
                            Our Location
                          </CardTitle>
                        </CardHeader>
                        <CardContent>
                          <p className="text-gray-600">
                            123 Logistics Way
                            <br />
                            Transport City, TC 12345
                            <br />
                            United States
                          </p>
                        </CardContent>
                      </Card>
                      <Card>
                        <CardHeader className="pb-3">
                          <CardTitle className="flex items-center gap-2 text-lg">
                            <Phone className="h-5 w-5 text-red-600" />
                            Phone
                          </CardTitle>
                        </CardHeader>
                        <CardContent>
                          <p className="text-gray-600">
                            Main: (555) 123-4567
                            <br />
                            HR: (555) 123-4569
                            <br />
                            Emergency: (555) 123-4568
                          </p>
                        </CardContent>
                      </Card>
                      <Card>
                        <CardHeader className="pb-3">
                          <CardTitle className="flex items-center gap-2 text-lg">
                            <Mail className="h-5 w-5 text-red-600" />
                            Email
                          </CardTitle>
                        </CardHeader>
                        <CardContent>
                          <p className="text-gray-600">
                            Careers: careers@redsquaretransport.com
                            <br />
                            HR: hr@redsquaretransport.com
                            <br />
                            General: info@redsquaretransport.com
                          </p>
                        </CardContent>
                      </Card>
                      <Card>
                        <CardHeader className="pb-3">
                          <CardTitle className="flex items-center gap-2 text-lg">
                            <Clock className="h-5 w-5 text-red-600" />
                            Business Hours
                          </CardTitle>
                        </CardHeader>
                        <CardContent>
                          <p className="text-gray-600">
                            Monday - Friday: 7:00 AM - 7:00 PM EST
                            <br />
                            Saturday: 8:00 AM - 4:00 PM EST
                            <br />
                            Sunday: Emergency calls only
                          </p>
                        </CardContent>
                      </Card>
                    </div>
                  </div>

                  {/* Contact Form */}
                  <div className="space-y-6">
                    <Card>
                      <CardHeader>
                        <CardTitle>Send us a Message</CardTitle>
                        <p className="text-gray-600">
                          Fill out the form below and we'll get back to you within 24 hours.
                        </p>
                      </CardHeader>
                      <CardContent>
                        <form onSubmit={handleSubmit} className="space-y-4">
                          <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                              <Label htmlFor="firstName">First Name</Label>
                              <Input
                                id="firstName"
                                name="firstName"
                                value={formData.firstName}
                                onChange={handleInputChange}
                                placeholder="John"
                                required
                              />
                            </div>
                            <div className="space-y-2">
                              <Label htmlFor="lastName">Last Name</Label>
                              <Input
                                id="lastName"
                                name="lastName"
                                value={formData.lastName}
                                onChange={handleInputChange}
                                placeholder="Doe"
                                required
                              />
                            </div>
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="email">Email</Label>
                            <Input
                              id="email"
                              name="email"
                              type="email"
                              value={formData.email}
                              onChange={handleInputChange}
                              placeholder="john@company.com"
                              required
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="phone">Phone Number</Label>
                            <Input
                              id="phone"
                              name="phone"
                              type="tel"
                              value={formData.phone}
                              onChange={handleInputChange}
                              placeholder="(555) 123-4567"
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="company">Company Name</Label>
                            <Input
                              id="company"
                              name="company"
                              value={formData.company}
                              onChange={handleInputChange}
                              placeholder="Your Company Inc."
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="subject">Subject</Label>
                            <Input
                              id="subject"
                              name="subject"
                              value={formData.subject}
                              onChange={handleInputChange}
                              placeholder="Career inquiry or general question"
                              required
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="message">Message</Label>
                            <Textarea
                              id="message"
                              name="message"
                              value={formData.message}
                              onChange={handleInputChange}
                              placeholder="Tell us about your interest in joining our team..."
                              className="min-h-[120px]"
                              required
                            />
                          </div>
                          <div className="flex gap-3 pt-4">
                            <Button type="submit" className="flex-1">
                              Send Message
                            </Button>
                            <Button type="button" variant="outline" onClick={onClose}>
                              Cancel
                            </Button>
                          </div>
                        </form>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
} 