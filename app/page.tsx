"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { HeroCarousel } from "@/components/hero-carousel"
import { VerticalNavigation } from "@/components/vertical-navigation"
import { SpinningQuoteButton } from "@/components/spinning-quote-button"
import { FullScreenMenu } from "@/components/full-screen-menu"
import { QuoteModal } from "@/components/quote-modal"
import type { CarouselSlide } from "@/types/carousel"

const slides: CarouselSlide[] = [
  {
    id: "logistics",
    title: "Red Square Transportation",
    subtitle: "Professional shipping and freight services",
    backgroundVideo:
      "https://firebasestorage.googleapis.com/v0/b/readyaimgo-clients-temp.firebasestorage.app/o/redsquaretransportation%2F6169116-uhd_3840_2160_25fps.mp4?alt=media&token=091436a0-91ee-4228-9e18-b9a7dd83ee2f",
    backgroundColor: "#dc2626",
    textColor: "#ffffff",
  },
  {
    id: "freight",
    title: "Freight Excellence",
    subtitle: "Modern fleet, experienced drivers, on-time delivery",
    backgroundVideo:
      "https://firebasestorage.googleapis.com/v0/b/readyaimgo-clients-temp.firebasestorage.app/o/redsquaretransportation%2F6169116-uhd_3840_2160_25fps.mp4?alt=media&token=091436a0-91ee-4228-9e18-b9a7dd83ee2f",
    backgroundColor: "#1f2937",
    textColor: "#ffffff",
  },
  {
    id: "warehousing",
    title: "Secure Warehousing",
    subtitle: "State-of-the-art storage and distribution facilities",
    backgroundVideo:
      "https://firebasestorage.googleapis.com/v0/b/readyaimgo-clients-temp.firebasestorage.app/o/redsquaretransportation%2F6169116-uhd_3840_2160_25fps.mp4?alt=media&token=091436a0-91ee-4228-9e18-b9a7dd83ee2f",
    backgroundColor: "#374151",
    textColor: "#ffffff",
  },
  {
    id: "planning",
    title: "Strategic Planning",
    subtitle: "Optimize your supply chain with our expertise",
    backgroundVideo:
      "https://firebasestorage.googleapis.com/v0/b/readyaimgo-clients-temp.firebasestorage.app/o/redsquaretransportation%2F6169116-uhd_3840_2160_25fps.mp4?alt=media&token=091436a0-91ee-4228-9e18-b9a7dd83ee2f",
    backgroundColor: "#059669",
    textColor: "#ffffff",
  },
]

export default function Home() {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isQuoteModalOpen, setIsQuoteModalOpen] = useState(false)

  return (
    <div className="relative h-screen w-full overflow-hidden">
      {/* Menu button */}
      <motion.button
        onClick={() => setIsMenuOpen(true)}
        className="fixed top-6 right-6 z-50 bg-white/90 backdrop-blur-sm rounded-full px-6 py-3 text-sm font-medium text-gray-900 hover:bg-white transition-colors shadow-lg"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        Menu +
      </motion.button>

      {/* Hero Carousel */}
      <HeroCarousel slides={slides} currentSlide={currentSlide} onSlideChange={setCurrentSlide} />

      {/* Vertical Navigation */}
      <VerticalNavigation slides={slides} currentSlide={currentSlide} onSlideChange={setCurrentSlide} />

      {/* Spinning Quote Button */}
      <SpinningQuoteButton onClick={() => setIsQuoteModalOpen(true)} />

      {/* Full Screen Menu */}
      <FullScreenMenu isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />

      {/* Quote Modal */}
      <QuoteModal isOpen={isQuoteModalOpen} onClose={() => setIsQuoteModalOpen(false)} />
    </div>
  )
}
