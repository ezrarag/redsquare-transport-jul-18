"use client"

import { motion, AnimatePresence } from "framer-motion"
import { X, ArrowRight, Instagram, Linkedin } from "lucide-react"
import Link from "next/link"
import { useState } from "react"

interface FullScreenMenuProps {
  isOpen: boolean
  onClose: () => void
}

const menuItems = [
  { 
    label: "Homepage", 
    href: "/",
    illustration: "home"
  },
  { 
    label: "Services", 
    href: "/services",
    illustration: "tech"
  },
  { 
    label: "About", 
    href: "/about",
    illustration: "mission"
  },
  { 
    label: "Careers", 
    href: "/careers",
    illustration: "careers"
  },
  { 
    label: "Information", 
    href: "/contact",
    illustration: "info"
  },
  { 
    label: "Contact", 
    href: "/contact",
    illustration: "contact"
  },
]

export function FullScreenMenu({ isOpen, onClose }: FullScreenMenuProps) {
  const [hoveredItem, setHoveredItem] = useState<string | null>(null)

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

  const getIllustration = (type: string) => {
    switch (type) {
      case 'home':
        return (
          <div className="w-full h-full flex items-center justify-center">
            <div className="relative">
              {/* Glass bottle */}
              <div className="w-32 h-48 bg-white/20 rounded-t-full border-2 border-green-800 relative">
                <div className="absolute top-2 left-1/2 transform -translate-x-1/2 w-8 h-8 bg-green-800 rounded-full"></div>
                <div className="absolute top-12 left-1/2 transform -translate-x-1/2 text-green-800 text-sm font-bold">red square</div>
                <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 w-16 h-8 bg-purple-800 rounded-full opacity-60"></div>
              </div>
              {/* Leaf shapes */}
              <div className="absolute -top-4 -left-8 w-16 h-20 bg-green-800 rounded-full transform rotate-45 opacity-60"></div>
              <div className="absolute -bottom-4 -right-8 w-20 h-16 bg-green-800 rounded-full transform -rotate-12 opacity-60"></div>
            </div>
          </div>
        )
      case 'tech':
        return (
          <div className="w-full h-full flex items-center justify-center">
            <div className="relative">
              {/* Tech bottle */}
              <div className="w-32 h-48 bg-white/20 rounded-t-full border-2 border-green-800 relative">
                <div className="absolute top-2 left-1/2 transform -translate-x-1/2 w-8 h-8 bg-green-800 rounded-full"></div>
                <div className="absolute top-12 left-1/2 transform -translate-x-1/2 text-green-800 text-sm font-bold">transoirtation</div>
                <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 w-16 h-8 bg-blue-800 rounded-full opacity-60"></div>
              </div>
              {/* Circuit patterns */}
              <div className="absolute -top-4 -left-8 w-16 h-20 bg-blue-800 rounded-full transform rotate-45 opacity-60"></div>
              <div className="absolute -bottom-4 -right-8 w-20 h-16 bg-blue-800 rounded-full transform -rotate-12 opacity-60"></div>
            </div>
          </div>
        )
      case 'mission':
        return (
          <div className="w-full h-full flex items-center justify-center">
            <div className="relative">
              {/* Mission bottle */}
              <div className="w-32 h-48 bg-white/20 rounded-t-full border-2 border-green-800 relative">
                <div className="absolute top-2 left-1/2 transform -translate-x-1/2 w-8 h-8 bg-green-800 rounded-full"></div>
                <div className="absolute top-12 left-1/2 transform -translate-x-1/2 text-green-800 text-sm font-bold">our mission</div>
                <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 w-16 h-8 bg-orange-800 rounded-full opacity-60"></div>
              </div>
              {/* Team shapes */}
              <div className="absolute -top-4 -left-8 w-16 h-20 bg-orange-800 rounded-full transform rotate-45 opacity-60"></div>
              <div className="absolute -bottom-4 -right-8 w-20 h-16 bg-orange-800 rounded-full transform -rotate-12 opacity-60"></div>
            </div>
          </div>
        )
      case 'careers':
        return (
          <div className="w-full h-full flex items-center justify-center">
            <div className="relative">
              {/* Careers bottle */}
              <div className="w-32 h-48 bg-white/20 rounded-t-full border-2 border-green-800 relative">
                <div className="absolute top-2 left-1/2 transform -translate-x-1/2 w-8 h-8 bg-green-800 rounded-full"></div>
                <div className="absolute top-12 left-1/2 transform -translate-x-1/2 text-green-800 text-sm font-bold">join us</div>
                <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 w-16 h-8 bg-pink-800 rounded-full opacity-60"></div>
              </div>
              {/* Growth shapes */}
              <div className="absolute -top-4 -left-8 w-16 h-20 bg-pink-800 rounded-full transform rotate-45 opacity-60"></div>
              <div className="absolute -bottom-4 -right-8 w-20 h-16 bg-pink-800 rounded-full transform -rotate-12 opacity-60"></div>
            </div>
          </div>
        )
      case 'info':
        return (
          <div className="w-full h-full flex items-center justify-center">
            <div className="relative">
              {/* Info bottle */}
              <div className="w-32 h-48 bg-white/20 rounded-t-full border-2 border-green-800 relative">
                <div className="absolute top-2 left-1/2 transform -translate-x-1/2 w-8 h-8 bg-green-800 rounded-full"></div>
                <div className="absolute top-12 left-1/2 transform -translate-x-1/2 text-green-800 text-sm font-bold">learn more</div>
                <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 w-16 h-8 bg-teal-800 rounded-full opacity-60"></div>
              </div>
              {/* Info shapes */}
              <div className="absolute -top-4 -left-8 w-16 h-20 bg-teal-800 rounded-full transform rotate-45 opacity-60"></div>
              <div className="absolute -bottom-4 -right-8 w-20 h-16 bg-teal-800 rounded-full transform -rotate-12 opacity-60"></div>
            </div>
          </div>
        )
      case 'contact':
        return (
          <div className="w-full h-full flex items-center justify-center">
            <div className="relative">
              {/* Contact bottle */}
              <div className="w-32 h-48 bg-white/20 rounded-t-full border-2 border-green-800 relative">
                <div className="absolute top-2 left-1/2 transform -translate-x-1/2 w-8 h-8 bg-green-800 rounded-full"></div>
                <div className="absolute top-12 left-1/2 transform -translate-x-1/2 text-green-800 text-sm font-bold">get in touch</div>
                <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 w-16 h-8 bg-indigo-800 rounded-full opacity-60"></div>
              </div>
              {/* Contact shapes */}
              <div className="absolute -top-4 -left-8 w-16 h-20 bg-indigo-800 rounded-full transform rotate-45 opacity-60"></div>
              <div className="absolute -bottom-4 -right-8 w-20 h-16 bg-indigo-800 rounded-full transform -rotate-12 opacity-60"></div>
            </div>
          </div>
        )
      default:
        return null
    }
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
          className="fixed inset-0 z-[100] bg-[#99FF33]"
        >
          {/* Close button */}
          <motion.button
            onClick={onClose}
            className="absolute top-6 right-6 w-12 h-12 bg-transparent border-2 border-green-800 rounded-full flex items-center justify-center hover:bg-green-800 hover:text-white transition-colors"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <X className="w-6 h-6 text-green-800" />
          </motion.button>

          {/* Logo */}
          <div className="absolute top-6 left-6 flex items-center gap-2">
            <div className="h-8 w-8 bg-red-800 rounded-sm"></div>
            <span className="text-xl font-bold text-green-800">redsquare transport</span>
          </div>

          {/* Main content container */}
          <div className="flex items-center justify-center h-full px-12">
            {/* Left side - Illustration */}
            <div className="flex-1 flex items-center justify-center">
              <motion.div
                key={hoveredItem || 'default'}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3 }}
                className="w-64 h-64"
              >
                {getIllustration(hoveredItem || 'home')}
              </motion.div>
            </div>

            {/* Right side - Menu items */}
            <div className="flex-1 flex items-center justify-center">
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
                    className="mb-6"
                    onMouseEnter={() => setHoveredItem(item.illustration)}
                    onMouseLeave={() => setHoveredItem(null)}
                  >
                    <Link
                      href={item.href}
                      onClick={onClose}
                      className="text-2xl font-medium text-green-800 hover:text-green-900 transition-colors duration-300 block"
                    >
                      {item.label}
                    </Link>
                  </motion.div>
                ))}
              </nav>
            </div>
          </div>

          {/* Bottom left - Subscribe form */}
          <div className="absolute bottom-6 left-6">
            <div className="text-green-800">
              <p className="text-lg font-medium mb-2">Subscribe for Updates</p>
              <div className="flex items-center space-x-2">
                <input
                  type="email"
                  placeholder="your email"
                  className="bg-transparent border-b-2 border-green-800 outline-none text-green-800 placeholder-green-800/70 w-32"
                />
                <button className="text-green-800 hover:text-green-900 transition-colors">
                  <ArrowRight className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>

          {/* Bottom right - Social media */}
          <div className="absolute bottom-6 right-6 flex space-x-4">
            <button className="w-10 h-10 border-2 border-green-800 rounded-full flex items-center justify-center text-green-800 hover:bg-green-800 hover:text-white transition-colors">
              <Instagram className="w-5 h-5" />
            </button>
            <button className="w-10 h-10 border-2 border-green-800 rounded-full flex items-center justify-center text-green-800 hover:bg-green-800 hover:text-white transition-colors">
              <Linkedin className="w-5 h-5" />
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
