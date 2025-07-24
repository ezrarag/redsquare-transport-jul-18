"use client"

import { motion, AnimatePresence } from "framer-motion"
import { X } from "lucide-react"
import Link from "next/link"

interface FullScreenMenuProps {
  isOpen: boolean
  onClose: () => void
}

const menuItems = [
  { label: "Home", href: "/" },
  { label: "Services", href: "/services" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
  { label: "Customer Signup", href: "/signup" },
  { label: "Admin", href: "/admin" },
  { label: "Careers", href: "/careers" },
]

export function FullScreenMenu({ isOpen, onClose }: FullScreenMenuProps) {
  const menuVariants = {
    closed: {
      opacity: 0,
      scale: 0.95,
    },
    open: {
      opacity: 1,
      scale: 1,
    },
  }

  const itemVariants = {
    closed: {
      opacity: 0,
      y: 50,
    },
    open: {
      opacity: 1,
      y: 0,
    },
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          variants={menuVariants}
          initial="closed"
          animate="open"
          exit="closed"
          transition={{ duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="fixed inset-0 z-[100] bg-white"
        >
          {/* Close button */}
          <motion.button
            onClick={onClose}
            className="absolute top-6 right-6 w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center hover:bg-gray-200 transition-colors"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <X className="w-6 h-6" />
          </motion.button>

          {/* Logo */}
          <div className="absolute top-6 left-6 flex items-center gap-2">
            <div className="h-8 w-8 bg-red-600 rounded-sm"></div>
            <span className="text-xl font-bold">Red Square Transport</span>
          </div>

          {/* Menu items */}
          <div className="flex items-center justify-center h-full">
            <nav className="text-center">
              {menuItems.map((item, index) => (
                <motion.div
                  key={item.href}
                  variants={itemVariants}
                  initial="closed"
                  animate="open"
                  transition={{
                    duration: 0.5,
                    delay: index * 0.1,
                    ease: [0.25, 0.46, 0.45, 0.94],
                  }}
                  className="mb-8"
                >
                  <Link
                    href={item.href}
                    onClick={onClose}
                    className="text-4xl md:text-6xl font-light text-gray-900 hover:text-red-600 transition-colors duration-300 block"
                  >
                    {item.label}
                  </Link>
                </motion.div>
              ))}
            </nav>
          </div>

          {/* Footer info */}
          <div className="absolute bottom-6 left-6 text-sm text-gray-500">
            <p>Professional logistics solutions</p>
            <p>info@redsquaretransport.com</p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
