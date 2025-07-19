"use client"

import { motion } from "framer-motion"
import { ChevronDown } from "lucide-react"

interface VerticalNavigationProps {
  slides: Array<{ id: string; title: string }>
  currentSlide: number
  onSlideChange: (index: number) => void
}

export function VerticalNavigation({ slides, currentSlide, onSlideChange }: VerticalNavigationProps) {
  return (
    <div className="fixed left-6 top-1/2 -translate-y-1/2 z-50 flex flex-col items-center space-y-4">
      {/* Navigation dots */}
      <div className="flex flex-col space-y-3">
        {slides.map((_, index) => (
          <motion.button
            key={index}
            onClick={() => onSlideChange(index)}
            className={`w-3 h-3 rounded-full border-2 transition-all duration-300 ${
              index === currentSlide
                ? "bg-white border-white scale-125"
                : "bg-transparent border-white/60 hover:border-white hover:scale-110"
            }`}
            whileHover={{ scale: 1.2 }}
            whileTap={{ scale: 0.9 }}
          />
        ))}
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="mt-8 flex flex-col items-center text-white/60"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
      >
        <div className="w-px h-12 bg-white/30 mb-2" />
        <ChevronDown className="w-4 h-4" />
      </motion.div>
    </div>
  )
}
