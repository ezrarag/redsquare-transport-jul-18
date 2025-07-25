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
    title: "Reliable Logistics Solutions",
    subtitle: "Professional shipping and freight services nationwide",
    backgroundVideo:
      "https://gtcyljdmvzaipvimfjhr.supabase.co/storage/v1/object/public/assets-media/homepage-carousel/6169114-uhd_3840_2160_25fps.mp4",
    backgroundColor: "#dc2626",
    textColor: "#ffffff",
  },
  {
    id: "freight",
    title: "Freight Excellence",
    subtitle: "Modern fleet, experienced drivers, on-time delivery",
    backgroundVideo: "https://gtcyljdmvzaipvimfjhr.supabase.co/storage/v1/object/public/assets-media/homepage-carousel/4157778-hd_1920_1080_24fps.mp4",
    backgroundColor: "#1f2937",
    textColor: "#ffffff",
  },
  {
    id: "warehousing",
    title: "Secure Warehousing",
    subtitle: "State-of-the-art storage and distribution facilities",
    backgroundVideo: "https://gtcyljdmvzaipvimfjhr.supabase.co/storage/v1/object/public/assets-media/homepage-carousel/9856370-hd_1920_1080_30fps.mp4",
    backgroundColor: "#374151",
    textColor: "#ffffff",
  },
  {
    id: "planning",
    title: "Strategic Planning",
    subtitle: "Optimize your supply chain with our expertise",
    backgroundVideo: "https://gtcyljdmvzaipvimfjhr.supabase.co/storage/v1/object/public/assets-media/homepage-carousel/6561844-uhd_3840_2160_25fps.mp4",
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
