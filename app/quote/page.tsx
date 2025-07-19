"use client"

import type React from "react"

import Link from "next/link"
import { MapPin, Package, TruckIcon } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { useState } from "react"

export default function QuotePage() {
  const [formData, setFormData] = useState({
    // Contact Information
    name: "",
    email: "",
    phone: "",
    company: "",

    // Shipment Details
    pickupAddress: "",
    pickupCity: "",
    pickupState: "",
    pickupZip: "",
    deliveryAddress: "",
    deliveryCity: "",
    deliveryState: "",
    deliveryZip: "",

    // Freight Details
    freightType: "",
    weight: "",
    dimensions: "",
    value: "",

    // Service Options
    serviceType: "",
    deliveryDate: "",
    specialRequirements: "",

    // Additional Services
    insurance: false,
    tracking: false,
    expedited: false,
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle form submission here
    console.log("Quote request submitted:", formData)
    alert("Thank you for your quote request! We will get back to you within 24 hours with a detailed quote.")
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const handleSelectChange = (name: string, value: string) => {
    setFormData({
      ...formData,
      [name]: value,
    })
  }

  const handleCheckboxChange = (name: string, checked: boolean) => {
    setFormData({
      ...formData,
      [name]: checked,
    })
  }

  return (
    <div className="flex flex-col min-h-screen">
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 bg-red-600 rounded-sm"></div>
            <Link href="/">
              <span className="text-xl font-bold">Red Square Transport</span>
            </Link>
          </div>
          <nav className="hidden md:flex gap-6">
            <Link href="/" className="text-sm font-medium text-muted-foreground hover:text-foreground">
              Home
            </Link>
            <Link href="/services" className="text-sm font-medium text-muted-foreground hover:text-foreground">
              Services
            </Link>
            <Link href="/about" className="text-sm font-medium text-muted-foreground hover:text-foreground">
              About Us
            </Link>
            <Link href="/contact" className="text-sm font-medium text-muted-foreground hover:text-foreground">
              Contact
            </Link>
          </nav>
          <div>
            <Link href="/quote">
              <Button>Request a Quote</Button>
            </Link>
          </div>
        </div>
      </header>
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32 bg-red-600">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl text-white">Request a Quote</h1>
                <p className="max-w-[900px] text-white/90 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Get a customized quote for your logistics needs. Fill out the form below and we'll get back to you
                  within 24 hours.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <form onSubmit={handleSubmit} className="max-w-4xl mx-auto space-y-8">
              {/* Contact Information */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="text-red-600"
                    >
                      <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                      <circle cx="9" cy="7" r="4" />
                      <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
                      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                    </svg>
                    Contact Information
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">Full Name *</Label>
                      <Input id="name" name="name" value={formData.name} onChange={handleChange} required />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email *</Label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone *</Label>
                      <Input
                        id="phone"
                        name="phone"
                        type="tel"
                        value={formData.phone}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="company">Company</Label>
                      <Input id="company" name="company" value={formData.company} onChange={handleChange} />
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Pickup Information */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <MapPin className="h-6 w-6 text-red-600" />
                    Pickup Location
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="pickupAddress">Address *</Label>
                    <Input
                      id="pickupAddress"
                      name="pickupAddress"
                      value={formData.pickupAddress}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="pickupCity">City *</Label>
                      <Input
                        id="pickupCity"
                        name="pickupCity"
                        value={formData.pickupCity}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="pickupState">State *</Label>
                      <Input
                        id="pickupState"
                        name="pickupState"
                        value={formData.pickupState}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="pickupZip">ZIP Code *</Label>
                      <Input
                        id="pickupZip"
                        name="pickupZip"
                        value={formData.pickupZip}
                        onChange={handleChange}
                        required
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Delivery Information */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="text-red-600"
                    >
                      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                      <circle cx="12" cy="10" r="3" />
                    </svg>
                    Delivery Location
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="deliveryAddress">Address *</Label>
                    <Input
                      id="deliveryAddress"
                      name="deliveryAddress"
                      value={formData.deliveryAddress}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="deliveryCity">City *</Label>
                      <Input
                        id="deliveryCity"
                        name="deliveryCity"
                        value={formData.deliveryCity}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="deliveryState">State *</Label>
                      <Input
                        id="deliveryState"
                        name="deliveryState"
                        value={formData.deliveryState}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="deliveryZip">ZIP Code *</Label>
                      <Input
                        id="deliveryZip"
                        name="deliveryZip"
                        value={formData.deliveryZip}
                        onChange={handleChange}
                        required
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Freight Details */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Package className="h-6 w-6 text-red-600" />
                    Freight Details
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="freightType">Freight Type *</Label>
                      <Select onValueChange={(value) => handleSelectChange("freightType", value)}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select freight type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="general">General Freight</SelectItem>
                          <SelectItem value="hazmat">Hazardous Materials</SelectItem>
                          <SelectItem value="refrigerated">Refrigerated</SelectItem>
                          <SelectItem value="oversized">Oversized/Heavy</SelectItem>
                          <SelectItem value="automotive">Automotive</SelectItem>
                          <SelectItem value="electronics">Electronics</SelectItem>
                          <SelectItem value="other">Other</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="weight">Weight (lbs) *</Label>
                      <Input
                        id="weight"
                        name="weight"
                        type="number"
                        value={formData.weight}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="dimensions">Dimensions (L x W x H) *</Label>
                      <Input
                        id="dimensions"
                        name="dimensions"
                        placeholder="e.g., 48 x 40 x 36 inches"
                        value={formData.dimensions}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="value">Declared Value ($)</Label>
                      <Input id="value" name="value" type="number" value={formData.value} onChange={handleChange} />
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Service Options */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <TruckIcon className="h-6 w-6 text-red-600" />
                    Service Options
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="serviceType">Service Type *</Label>
                      <Select onValueChange={(value) => handleSelectChange("serviceType", value)}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select service type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="ltl">Less Than Truckload (LTL)</SelectItem>
                          <SelectItem value="ftl">Full Truckload (FTL)</SelectItem>
                          <SelectItem value="expedited">Expedited</SelectItem>
                          <SelectItem value="white-glove">White Glove</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="deliveryDate">Preferred Delivery Date</Label>
                      <Input
                        id="deliveryDate"
                        name="deliveryDate"
                        type="date"
                        value={formData.deliveryDate}
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="specialRequirements">Special Requirements</Label>
                    <Textarea
                      id="specialRequirements"
                      name="specialRequirements"
                      rows={3}
                      placeholder="Any special handling requirements, delivery instructions, etc."
                      value={formData.specialRequirements}
                      onChange={handleChange}
                    />
                  </div>
                </CardContent>
              </Card>

              {/* Additional Services */}
              <Card>
                <CardHeader>
                  <CardTitle>Additional Services</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="insurance"
                      checked={formData.insurance}
                      onCheckedChange={(checked) => handleCheckboxChange("insurance", checked as boolean)}
                    />
                    <Label htmlFor="insurance">Additional Insurance Coverage</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="tracking"
                      checked={formData.tracking}
                      onCheckedChange={(checked) => handleCheckboxChange("tracking", checked as boolean)}
                    />
                    <Label htmlFor="tracking">Real-time Tracking</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="expedited"
                      checked={formData.expedited}
                      onCheckedChange={(checked) => handleCheckboxChange("expedited", checked as boolean)}
                    />
                    <Label htmlFor="expedited">Expedited Service</Label>
                  </div>
                </CardContent>
              </Card>

              <div className="flex justify-center">
                <Button type="submit" size="lg" className="w-full md:w-auto">
                  Submit Quote Request
                </Button>
              </div>
            </form>
          </div>
        </section>

        <section className="w-full py-12 md:py-24 lg:py-32 bg-gray-50">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">What Happens Next?</h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Here's what you can expect after submitting your quote request.
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl items-center gap-6 py-12 lg:grid-cols-3">
              <Card>
                <CardContent className="p-6 flex flex-col items-center text-center space-y-4">
                  <div className="rounded-full bg-red-100 p-3">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="32"
                      height="32"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="text-red-600"
                    >
                      <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" />
                      <polyline points="14,2 14,8 20,8" />
                      <line x1="16" y1="13" x2="8" y2="13" />
                      <line x1="16" y1="17" x2="8" y2="17" />
                      <polyline points="10,9 9,9 8,9" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold">1. Review</h3>
                  <p className="text-muted-foreground">
                    Our logistics experts review your requirements and calculate the best shipping solution.
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6 flex flex-col items-center text-center space-y-4">
                  <div className="rounded-full bg-red-100 p-3">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="32"
                      height="32"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="text-red-600"
                    >
                      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold">2. Contact</h3>
                  <p className="text-muted-foreground">
                    We'll contact you within 24 hours with a detailed quote and answer any questions.
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6 flex flex-col items-center text-center space-y-4">
                  <div className="rounded-full bg-red-100 p-3">
                    <TruckIcon className="h-8 w-8 text-red-600" />
                  </div>
                  <h3 className="text-xl font-bold">3. Ship</h3>
                  <p className="text-muted-foreground">
                    Once approved, we'll schedule your shipment and keep you updated throughout the process.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
      </main>
      <footer className="w-full border-t py-6 md:py-0">
        <div className="container flex flex-col md:flex-row justify-between gap-4 md:gap-8 md:py-8">
          <div className="flex flex-col gap-2 md:w-1/3">
            <div className="flex items-center gap-2">
              <div className="h-8 w-8 bg-red-600 rounded-sm"></div>
              <span className="text-xl font-bold">Red Square Transport</span>
            </div>
            <p className="text-sm text-muted-foreground">
              Professional logistics and transportation services for businesses nationwide.
            </p>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-8">
            <div className="space-y-3">
              <h4 className="font-medium">Company</h4>
              <ul className="space-y-2">
                <li>
                  <Link href="/about" className="text-sm text-muted-foreground hover:text-foreground">
                    About Us
                  </Link>
                </li>
                <li>
                  <Link href="/careers" className="text-sm text-muted-foreground hover:text-foreground">
                    Careers
                  </Link>
                </li>
                <li>
                  <Link href="/news" className="text-sm text-muted-foreground hover:text-foreground">
                    News
                  </Link>
                </li>
              </ul>
            </div>
            <div className="space-y-3">
              <h4 className="font-medium">Services</h4>
              <ul className="space-y-2">
                <li>
                  <Link href="/services#freight" className="text-sm text-muted-foreground hover:text-foreground">
                    Freight Shipping
                  </Link>
                </li>
                <li>
                  <Link href="/services#logistics" className="text-sm text-muted-foreground hover:text-foreground">
                    Logistics Planning
                  </Link>
                </li>
                <li>
                  <Link href="/services#warehousing" className="text-sm text-muted-foreground hover:text-foreground">
                    Warehousing
                  </Link>
                </li>
              </ul>
            </div>
            <div className="space-y-3">
              <h4 className="font-medium">Contact</h4>
              <ul className="space-y-2">
                <li className="flex items-center gap-2">
                  <MapPin className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm text-muted-foreground">123 Logistics Way, Transport City, TC 12345</span>
                </li>
                <li className="flex items-center gap-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="text-muted-foreground"
                  >
                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                  </svg>
                  <span className="text-sm text-muted-foreground">(555) 123-4567</span>
                </li>
                <li className="flex items-center gap-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="text-muted-foreground"
                  >
                    <rect width="20" height="16" x="2" y="4" rx="2" />
                    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                  </svg>
                  <span className="text-sm text-muted-foreground">info@redsquaretransport.com</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div className="container flex flex-col md:flex-row justify-between items-center border-t mt-8 pt-6">
          <p className="text-xs text-muted-foreground">
            © {new Date().getFullYear()} Red Square Transport. All rights reserved.
          </p>
          <div className="flex gap-4 mt-4 md:mt-0">
            <Link href="/privacy" className="text-xs text-muted-foreground hover:text-foreground">
              Privacy Policy
            </Link>
            <Link href="/terms" className="text-xs text-muted-foreground hover:text-foreground">
              Terms of Service
            </Link>
          </div>
        </div>
      </footer>
    </div>
  )
}
