"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import type { CarouselSlide } from "@/types/carousel"

interface HeroCarouselProps {
  slides: CarouselSlide[]
  currentSlide: number
  onSlideChange: (index: number) => void
}

export function HeroCarousel({ slides, currentSlide, onSlideChange }: HeroCarouselProps) {
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    setIsLoaded(true)
  }, [])

  const slideVariants = {
    enter: {
      opacity: 0,
      scale: 1.1,
    },
    center: {
      opacity: 1,
      scale: 1,
    },
    exit: {
      opacity: 0,
      scale: 0.9,
    },
  }

  const textVariants = {
    enter: {
      opacity: 0,
      y: 50,
    },
    center: {
      opacity: 1,
      y: 0,
    },
    exit: {
      opacity: 0,
      y: -50,
    },
  }

  if (!isLoaded) {
    return <div className="h-screen bg-gray-900" />
  }

  return (
    <div className="relative h-screen w-full overflow-hidden">
      <AnimatePresence mode="wait">
        <motion.div
          key={currentSlide}
          variants={slideVariants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{
            duration: 1.2,
            ease: [0.25, 0.46, 0.45, 0.94],
          }}
          className="absolute inset-0 h-full w-full"
          style={{
            backgroundImage: `url(${slides[currentSlide]?.backgroundImage})`,
            backgroundColor: slides[currentSlide]?.backgroundColor || "#1a1a1a",
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
          }}
        >
          {/* Overlay for better text readability */}
          <div className="absolute inset-0 bg-black/30" />

          {/* Content */}
          <div className="relative z-10 flex h-full items-center justify-center">
            <motion.div
              variants={textVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{
                duration: 0.8,
                delay: 0.3,
                ease: [0.25, 0.46, 0.45, 0.94],
              }}
              className="text-center px-4"
            >
              <h1
                className="text-4xl md:text-6xl lg:text-7xl font-light tracking-wide mb-4"
                style={{ color: slides[currentSlide]?.textColor || "#ffffff" }}
              >
                {slides[currentSlide]?.title}
              </h1>
              {slides[currentSlide]?.subtitle && (
                <p
                  className="text-lg md:text-xl lg:text-2xl font-light opacity-90 max-w-2xl mx-auto"
                  style={{ color: slides[currentSlide]?.textColor || "#ffffff" }}
                >
                  {slides[currentSlide]?.subtitle}
                </p>
              )}
            </motion.div>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  )
}
