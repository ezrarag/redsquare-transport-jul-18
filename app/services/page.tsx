import Link from "next/link"
import { CheckCircle, MapPin } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function ServicesPage() {
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
            <Link href="/services" className="text-sm font-medium text-foreground">
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
                <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl text-white">Our Services</h1>
                <p className="max-w-[900px] text-white/90 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Comprehensive logistics and transportation solutions tailored to your business needs.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section id="freight" className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 items-center">
              <div className="space-y-4">
                <div className="inline-block rounded-lg bg-red-100 px-3 py-1 text-sm text-red-600">
                  Freight Shipping
                </div>
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                  Reliable Freight Transportation
                </h2>
                <p className="text-muted-foreground md:text-xl">
                  Our modern fleet and experienced drivers ensure your goods arrive safely and on time, every time.
                </p>
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-5 w-5 text-red-600" />
                    <span>Full truckload (FTL) shipping</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-5 w-5 text-red-600" />
                    <span>Less than truckload (LTL) shipping</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-5 w-5 text-red-600" />
                    <span>Expedited shipping options</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-5 w-5 text-red-600" />
                    <span>Temperature-controlled transportation</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-5 w-5 text-red-600" />
                    <span>Nationwide coverage</span>
                  </div>
                </div>
                <div className="flex flex-col sm:flex-row gap-4 pt-4">
                  <Link href="/quote">
                    <Button>Request a Quote</Button>
                  </Link>
                  <Link href="/contact">
                    <Button variant="outline">Contact Us</Button>
                  </Link>
                </div>
              </div>
              <div className="relative h-[400px] w-full overflow-hidden rounded-xl bg-muted">
                <img
                  src="/placeholder.svg?height=400&width=600"
                  alt="Freight truck on highway"
                  className="object-cover w-full h-full"
                />
              </div>
            </div>
          </div>
        </section>

        <section id="logistics" className="w-full py-12 md:py-24 lg:py-32 bg-gray-50">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 items-center">
              <div className="relative h-[400px] w-full overflow-hidden rounded-xl bg-muted order-2 lg:order-1">
                <img
                  src="/placeholder.svg?height=400&width=600"
                  alt="Logistics planning and supply chain"
                  className="object-cover w-full h-full"
                />
              </div>
              <div className="space-y-4 order-1 lg:order-2">
                <div className="inline-block rounded-lg bg-red-100 px-3 py-1 text-sm text-red-600">
                  Logistics Planning
                </div>
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                  Optimize Your Supply Chain
                </h2>
                <p className="text-muted-foreground md:text-xl">
                  Our logistics experts help you streamline operations, reduce costs, and improve efficiency across your
                  entire supply chain.
                </p>
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-5 w-5 text-red-600" />
                    <span>Supply chain optimization</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-5 w-5 text-red-600" />
                    <span>Route planning and optimization</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-5 w-5 text-red-600" />
                    <span>Inventory management</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-5 w-5 text-red-600" />
                    <span>Logistics consulting</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-5 w-5 text-red-600" />
                    <span>Real-time tracking and reporting</span>
                  </div>
                </div>
                <div className="flex flex-col sm:flex-row gap-4 pt-4">
                  <Link href="/quote">
                    <Button>Request a Quote</Button>
                  </Link>
                  <Link href="/contact">
                    <Button variant="outline">Contact Us</Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="warehousing" className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 items-center">
              <div className="space-y-4">
                <div className="inline-block rounded-lg bg-red-100 px-3 py-1 text-sm text-red-600">Warehousing</div>
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                  Secure Storage Solutions
                </h2>
                <p className="text-muted-foreground md:text-xl">
                  Our state-of-the-art warehousing facilities provide secure storage with comprehensive inventory
                  management and distribution services.
                </p>
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-5 w-5 text-red-600" />
                    <span>Short and long-term storage</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-5 w-5 text-red-600" />
                    <span>Climate-controlled facilities</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-5 w-5 text-red-600" />
                    <span>Inventory management systems</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-5 w-5 text-red-600" />
                    <span>Order fulfillment services</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-5 w-5 text-red-600" />
                    <span>Cross-docking capabilities</span>
                  </div>
                </div>
                <div className="flex flex-col sm:flex-row gap-4 pt-4">
                  <Link href="/quote">
                    <Button>Request a Quote</Button>
                  </Link>
                  <Link href="/contact">
                    <Button variant="outline">Contact Us</Button>
                  </Link>
                </div>
              </div>
              <div className="relative h-[400px] w-full overflow-hidden rounded-xl bg-muted">
                <img
                  src="/placeholder.svg?height=400&width=600"
                  alt="Modern warehouse with inventory"
                  className="object-cover w-full h-full"
                />
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
