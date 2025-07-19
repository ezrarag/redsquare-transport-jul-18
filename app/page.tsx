import Link from "next/link"
import { ArrowRight, CheckCircle, Globe, MapPin, TruckIcon } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 bg-red-600 rounded-sm"></div>
            <span className="text-xl font-bold">Red Square Transport</span>
          </div>
          <nav className="hidden md:flex gap-6">
            <Link href="/" className="text-sm font-medium text-foreground">
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
            <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 items-center">
              <div className="space-y-4">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-white">
                  Reliable Logistics Solutions for Your Business
                </h1>
                <p className="text-white/90 md:text-xl">
                  Professional shipping and freight services with a commitment to reliability, efficiency, and customer
                  satisfaction.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Link href="/quote">
                    <Button size="lg" className="bg-white text-red-600 hover:bg-gray-100">
                      Request a Quote
                    </Button>
                  </Link>
                  <Link href="/services">
                    <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
                      Our Services
                    </Button>
                  </Link>
                </div>
              </div>
              <div className="relative h-[350px] w-full overflow-hidden rounded-xl bg-muted">
                <img
                  src="/placeholder.svg?height=350&width=600"
                  alt="Logistics truck on highway"
                  className="object-cover w-full h-full"
                />
              </div>
            </div>
          </div>
        </section>

        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">Our Services</h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Comprehensive logistics and transportation solutions tailored to your business needs.
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl items-center gap-6 py-12 lg:grid-cols-3">
              <Card className="border-2 hover:border-red-600 transition-all">
                <CardContent className="p-6 flex flex-col items-center text-center space-y-4">
                  <div className="rounded-full bg-red-100 p-3">
                    <TruckIcon className="h-8 w-8 text-red-600" />
                  </div>
                  <h3 className="text-xl font-bold">Freight Shipping</h3>
                  <p className="text-muted-foreground">
                    Reliable transportation of goods across the country with our modern fleet of vehicles.
                  </p>
                  <Link href="/services#freight" className="text-red-600 flex items-center gap-1 hover:underline">
                    Learn more <ArrowRight className="h-4 w-4" />
                  </Link>
                </CardContent>
              </Card>
              <Card className="border-2 hover:border-red-600 transition-all">
                <CardContent className="p-6 flex flex-col items-center text-center space-y-4">
                  <div className="rounded-full bg-red-100 p-3">
                    <Globe className="h-8 w-8 text-red-600" />
                  </div>
                  <h3 className="text-xl font-bold">Logistics Planning</h3>
                  <p className="text-muted-foreground">
                    Comprehensive logistics solutions to optimize your supply chain and reduce costs.
                  </p>
                  <Link href="/services#logistics" className="text-red-600 flex items-center gap-1 hover:underline">
                    Learn more <ArrowRight className="h-4 w-4" />
                  </Link>
                </CardContent>
              </Card>
              <Card className="border-2 hover:border-red-600 transition-all">
                <CardContent className="p-6 flex flex-col items-center text-center space-y-4">
                  <div className="rounded-full bg-red-100 p-3">
                    <MapPin className="h-8 w-8 text-red-600" />
                  </div>
                  <h3 className="text-xl font-bold">Warehousing</h3>
                  <p className="text-muted-foreground">
                    Secure storage facilities with inventory management and distribution services.
                  </p>
                  <Link href="/services#warehousing" className="text-red-600 flex items-center gap-1 hover:underline">
                    Learn more <ArrowRight className="h-4 w-4" />
                  </Link>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        <section className="w-full py-12 md:py-24 lg:py-32 bg-gray-50">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 items-center">
              <div className="space-y-4">
                <div className="inline-block rounded-lg bg-red-100 px-3 py-1 text-sm text-red-600">Why Choose Us</div>
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                  Trusted by Businesses Nationwide
                </h2>
                <p className="text-muted-foreground md:text-xl">
                  With our modern fleet, experienced team, and commitment to excellence, we deliver reliable logistics
                  solutions that help your business thrive.
                </p>
                <div className="grid grid-cols-2 gap-4 pt-4">
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-5 w-5 text-red-600" />
                    <span className="font-medium">99.8% On-time Delivery</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-5 w-5 text-red-600" />
                    <span className="font-medium">24/7 Customer Support</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-5 w-5 text-red-600" />
                    <span className="font-medium">Nationwide Coverage</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-5 w-5 text-red-600" />
                    <span className="font-medium">Modern Fleet</span>
                  </div>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="flex flex-col items-center justify-center space-y-2 border rounded-lg p-6 bg-white">
                  <div className="text-4xl font-bold text-red-600">150+</div>
                  <p className="text-muted-foreground text-center">Vehicles in our fleet</p>
                </div>
                <div className="flex flex-col items-center justify-center space-y-2 border rounded-lg p-6 bg-white">
                  <div className="text-4xl font-bold text-red-600">48</div>
                  <p className="text-muted-foreground text-center">States covered</p>
                </div>
                <div className="flex flex-col items-center justify-center space-y-2 border rounded-lg p-6 bg-white">
                  <div className="text-4xl font-bold text-red-600">500+</div>
                  <p className="text-muted-foreground text-center">Happy clients</p>
                </div>
                <div className="flex flex-col items-center justify-center space-y-2 border rounded-lg p-6 bg-white">
                  <div className="text-4xl font-bold text-red-600">15+</div>
                  <p className="text-muted-foreground text-center">Years of experience</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">What Our Clients Say</h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Don't just take our word for it. Here's what our clients have to say about our services.
                </p>
              </div>
            </div>
            <div className="mx-auto max-w-5xl py-12">
              <Tabs defaultValue="tab1" className="w-full">
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="tab1">ABC Manufacturing</TabsTrigger>
                  <TabsTrigger value="tab2">XYZ Retail</TabsTrigger>
                  <TabsTrigger value="tab3">123 Distribution</TabsTrigger>
                </TabsList>
                <TabsContent value="tab1" className="p-6 border rounded-lg mt-6">
                  <div className="flex flex-col gap-4">
                    <div className="flex items-center gap-2">
                      <div className="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center font-bold text-gray-600">
                        AM
                      </div>
                      <div>
                        <h4 className="font-bold">Alex Miller</h4>
                        <p className="text-sm text-muted-foreground">Operations Director, ABC Manufacturing</p>
                      </div>
                    </div>
                    <p className="italic">
                      "Red Square Transport has been instrumental in streamlining our logistics operations. Their
                      reliable service and attention to detail have helped us reduce delivery times by 20%."
                    </p>
                    <div className="flex gap-1">
                      {[...Array(5)].map((_, i) => (
                        <svg
                          key={i}
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="16"
                          viewBox="0 0 24 24"
                          fill="#dc2626"
                          stroke="#dc2626"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="lucide lucide-star"
                        >
                          <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                        </svg>
                      ))}
                    </div>
                  </div>
                </TabsContent>
                <TabsContent value="tab2" className="p-6 border rounded-lg mt-6">
                  <div className="flex flex-col gap-4">
                    <div className="flex items-center gap-2">
                      <div className="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center font-bold text-gray-600">
                        SJ
                      </div>
                      <div>
                        <h4 className="font-bold">Sarah Johnson</h4>
                        <p className="text-sm text-muted-foreground">Supply Chain Manager, XYZ Retail</p>
                      </div>
                    </div>
                    <p className="italic">
                      "We've been working with Red Square Transport for over 5 years now. Their consistent reliability
                      and excellent customer service make them our go-to logistics partner."
                    </p>
                    <div className="flex gap-1">
                      {[...Array(5)].map((_, i) => (
                        <svg
                          key={i}
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="16"
                          viewBox="0 0 24 24"
                          fill="#dc2626"
                          stroke="#dc2626"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="lucide lucide-star"
                        >
                          <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                        </svg>
                      ))}
                    </div>
                  </div>
                </TabsContent>
                <TabsContent value="tab3" className="p-6 border rounded-lg mt-6">
                  <div className="flex flex-col gap-4">
                    <div className="flex items-center gap-2">
                      <div className="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center font-bold text-gray-600">
                        DP
                      </div>
                      <div>
                        <h4 className="font-bold">David Parker</h4>
                        <p className="text-sm text-muted-foreground">CEO, 123 Distribution</p>
                      </div>
                    </div>
                    <p className="italic">
                      "Red Square Transport's logistics planning services have transformed our distribution network.
                      Their expertise and dedication to customer satisfaction are unmatched in the industry."
                    </p>
                    <div className="flex gap-1">
                      {[...Array(5)].map((_, i) => (
                        <svg
                          key={i}
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="16"
                          viewBox="0 0 24 24"
                          fill="#dc2626"
                          stroke="#dc2626"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="lucide lucide-star"
                        >
                          <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                        </svg>
                      ))}
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </section>

        <section className="w-full py-12 md:py-24 lg:py-32 bg-red-600">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-white">Ready to Get Started?</h2>
                <p className="max-w-[900px] text-white/90 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Let us help you streamline your logistics operations and reduce costs.
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/quote">
                  <Button size="lg" className="bg-white text-red-600 hover:bg-gray-100">
                    Request a Quote
                  </Button>
                </Link>
                <Link href="/contact">
                  <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
                    Contact Us
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
