import Link from "next/link"
import { MapPin, Phone, Mail, Clock, ChevronDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

export default function Contact() {
  return (
    <div className="flex flex-col min-h-screen">
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className="flex items-center gap-2 hover:opacity-80 transition-opacity">
                <div className="h-8 w-8 bg-red-600 rounded-sm"></div>
                <span className="text-xl font-bold">Red Square Transport</span>
                <ChevronDown className="h-4 w-4" />
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start" className="w-48">
              <DropdownMenuItem asChild>
                <Link href="/" className="w-full">
                  Home
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href="/services" className="w-full">
                  Services
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href="/about" className="w-full">
                  About Us
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href="/contact" className="w-full">
                  Contact
                </Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
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
                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-white">Contact Us</h1>
                <p className="max-w-[900px] text-white/90 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Get in touch with our team to discuss your logistics needs. We're here to help you find the perfect
                  transportation solution.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-2 lg:gap-12">
              <div className="space-y-6">
                <div className="space-y-4">
                  <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">Get in Touch</h2>
                  <p className="text-muted-foreground md:text-xl">
                    Ready to streamline your logistics? Contact us today and let's discuss how we can help your business
                    succeed.
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
                      <p className="text-muted-foreground">
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
                      <p className="text-muted-foreground">
                        Main: (555) 123-4567
                        <br />
                        Toll-Free: 1-800-RED-SQUARE
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
                      <p className="text-muted-foreground">
                        General: info@redsquaretransport.com
                        <br />
                        Sales: sales@redsquaretransport.com
                        <br />
                        Support: support@redsquaretransport.com
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
                      <p className="text-muted-foreground">
                        Monday - Friday: 7:00 AM - 7:00 PM EST
                        <br />
                        Saturday: 8:00 AM - 4:00 PM EST
                        <br />
                        Sunday: Emergency calls only
                        <br />
                        24/7 dispatch available
                      </p>
                    </CardContent>
                  </Card>
                </div>
              </div>
              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Send us a Message</CardTitle>
                    <p className="text-muted-foreground">
                      Fill out the form below and we'll get back to you within 24 hours.
                    </p>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="firstName">First Name</Label>
                        <Input id="firstName" placeholder="John" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="lastName">Last Name</Label>
                        <Input id="lastName" placeholder="Doe" />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input id="email" type="email" placeholder="john@company.com" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone Number</Label>
                      <Input id="phone" type="tel" placeholder="(555) 123-4567" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="company">Company Name</Label>
                      <Input id="company" placeholder="Your Company Inc." />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="subject">Subject</Label>
                      <Input id="subject" placeholder="How can we help you?" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="message">Message</Label>
                      <Textarea
                        id="message"
                        placeholder="Tell us about your logistics needs..."
                        className="min-h-[120px]"
                      />
                    </div>
                    <Button className="w-full">Send Message</Button>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>

        <section className="w-full py-12 md:py-24 lg:py-32 bg-gray-50">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">Find Us</h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Visit our headquarters or one of our regional offices across the country.
                </p>
              </div>
            </div>
            <div className="mx-auto max-w-5xl py-12">
              <div className="aspect-video w-full overflow-hidden rounded-xl bg-muted">
                <div className="flex h-full items-center justify-center">
                  <p className="text-muted-foreground">Interactive Map Placeholder</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="w-full py-12 md:py-24 lg:py-32 bg-red-600">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-white">Ready to Get Started?</h2>
                <p className="max-w-[900px] text-white/90 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Don't wait - get a personalized quote for your logistics needs today.
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/quote">
                  <Button size="lg" className="bg-white text-red-600 hover:bg-gray-100">
                    Request a Quote
                  </Button>
                </Link>
                <Link href="/services">
                  <Button
                    size="lg"
                    variant="outline"
                    className="border-white text-white hover:bg-white/10 bg-transparent"
                  >
                    View Services
                  </Button>
                </Link>
              </div>
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
                  <Phone className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm text-muted-foreground">(555) 123-4567</span>
                </li>
                <li className="flex items-center gap-2">
                  <Mail className="h-4 w-4 text-muted-foreground" />
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
