"use client"

import { motion } from "framer-motion"

interface SpinningQuoteButtonProps {
  onClick: () => void
}

export function SpinningQuoteButton({ onClick }: SpinningQuoteButtonProps) {
  return (
    <div className="fixed bottom-6 right-6 z-50">
      <motion.button
        onClick={onClick}
        className="relative w-20 h-20 bg-red-600 rounded-full flex items-center justify-center text-white font-medium text-sm shadow-2xl"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        animate={{ rotate: 360 }}
        transition={{
          rotate: {
            duration: 20,
            repeat: Number.POSITIVE_INFINITY,
            ease: "linear",
          },
          scale: {
            duration: 0.2,
          },
        }}
      >
        {/* Rotating border */}
        <motion.div
          className="absolute inset-0 rounded-full border-2 border-dashed border-white/30"
          animate={{ rotate: -360 }}
          transition={{
            duration: 15,
            repeat: Number.POSITIVE_INFINITY,
            ease: "linear",
          }}
        />

        {/* Button text */}
        <motion.span
          animate={{ rotate: -360 }}
          transition={{
            duration: 20,
            repeat: Number.POSITIVE_INFINITY,
            ease: "linear",
          }}
        >
          Quote
        </motion.span>
      </motion.button>
    </div>
  )
}
