"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { ChevronDown, ArrowRight } from "lucide-react"
import Link from "next/link"

const sections = [
  {
    id: "freight",
    title: "Freight Transportation",
    subtitle: "Reliable cargo delivery nationwide",
    content: "Our modern fleet and experienced drivers ensure your cargo reaches its destination safely and on time, every time.",
    features: ["Full Truckload (FTL)", "Less Than Truckload (LTL)", "Expedited Shipping", "Temperature Controlled"]
  },
  {
    id: "logistics",
    title: "Logistics Planning",
    subtitle: "Strategic supply chain solutions",
    content: "Optimize your supply chain with our comprehensive logistics planning services designed to reduce costs and improve efficiency.",
    features: ["Route Optimization", "Inventory Management", "Just-in-Time Delivery", "Real-time Tracking"]
  },
  {
    id: "warehousing",
    title: "Secure Warehousing",
    subtitle: "State-of-the-art storage facilities",
    content: "Advanced security systems and climate control for all your storage needs with professional warehouse management.",
    features: ["24/7 Security", "Climate Control", "Dedicated Staff", "Inventory Management"]
  },
  {
    id: "technology",
    title: "Our Technology",
    subtitle: "Innovative logistics solutions",
    content: "Cutting-edge technology and systems that provide real-time visibility and control over your shipments.",
    features: ["Real-time Tracking", "Automated Systems", "Data Analytics", "Mobile Applications"]
  },
  {
    id: "support",
    title: "Customer Support",
    subtitle: "Dedicated service excellence",
    content: "Our experienced team provides personalized support and solutions tailored to your specific business needs.",
    features: ["24/7 Support", "Dedicated Account Managers", "Custom Solutions", "Performance Monitoring"]
  }
]

export default function Services() {
  const [currentSection, setCurrentSection] = useState(0)
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const scrollToSection = (index: number) => {
    const sectionId = sections[index].id
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
    setCurrentSection(index)
  }

  const scrollToNext = () => {
    const nextIndex = (currentSection + 1) % sections.length
    scrollToSection(nextIndex)
  }

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY
      const windowHeight = window.innerHeight
      const sectionIndex = Math.round(scrollPosition / windowHeight)
      if (sectionIndex >= 0 && sectionIndex < sections.length) {
        setCurrentSection(sectionIndex)
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <div className="relative min-h-screen bg-[#1a4d3a] text-[#BBFD6A] overflow-hidden">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 flex justify-between items-center p-6">
        {/* Logo */}
        <div className="flex items-center gap-2">
          <div className="h-8 w-8 bg-[#BBFD6A] rounded-sm"></div>
          <span className="text-xl font-bold text-[#BBFD6A]">redsquare transport</span>
        </div>

        {/* Menu Button */}
        <motion.button
          onClick={() => setIsMenuOpen(true)}
          className="bg-black rounded-full px-6 py-3 text-sm font-medium text-white hover:bg-gray-800 transition-colors"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Menu +
        </motion.button>
      </header>

      {/* Main Content */}
      <main className="relative">
        {sections.map((section, index) => (
          <section
            key={section.id}
            id={section.id}
            className="h-screen flex items-center justify-center px-8"
          >
            <div className="text-center max-w-4xl mx-auto">
              <motion.h1
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="text-6xl md:text-8xl font-bold mb-6 text-[#BBFD6A]"
              >
                {section.title}
              </motion.h1>
              
              <motion.p
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="text-xl md:text-2xl text-[#BBFD6A]/80 mb-8"
              >
                {section.subtitle}
              </motion.p>

              <motion.p
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.6 }}
                className="text-lg md:text-xl text-[#BBFD6A]/70 mb-12 max-w-2xl mx-auto"
              >
                {section.content}
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.8 }}
                className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto"
              >
                {section.features.map((feature, featureIndex) => (
                  <div
                    key={featureIndex}
                    className="bg-[#BBFD6A]/10 rounded-lg p-4 border border-[#BBFD6A]/20"
                  >
                    <p className="text-sm font-medium text-[#BBFD6A]">{feature}</p>
                  </div>
                ))}
              </motion.div>
            </div>
          </section>
        ))}
      </main>

      {/* Vertical Navigation Dots */}
      <div className="fixed bottom-6 left-6 z-50">
        <div className="flex flex-col items-center space-y-2">
          {sections.map((_, index) => (
            <motion.button
              key={index}
              onClick={() => scrollToSection(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                index === currentSection 
                  ? 'bg-[#BBFD6A] scale-125' 
                  : 'bg-[#BBFD6A]/40 hover:bg-[#BBFD6A]/60'
              }`}
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 0.9 }}
            />
          ))}
          <motion.button
            onClick={scrollToNext}
            className="mt-4 text-[#BBFD6A] hover:text-[#BBFD6A]/80 transition-colors"
            whileHover={{ y: -2 }}
          >
            <ChevronDown className="w-6 h-6" />
          </motion.button>
        </div>
      </div>

      {/* Contact Button */}
      <div className="fixed bottom-6 right-6 z-50">
        <Link href="/contact">
          <motion.div
            className="w-16 h-16 bg-[#BBFD6A] rounded-full flex items-center justify-center text-[#1a4d3a] hover:bg-[#BBFD6A]/90 transition-colors cursor-pointer"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <ArrowRight className="w-6 h-6" />
          </motion.div>
        </Link>
      </div>

      {/* URL Display */}
      <div className="fixed bottom-6 left-1/2 transform -translate-x-1/2 z-50">
        <p className="text-white text-sm opacity-60">
          redsquaretransport.com
        </p>
      </div>
    </div>
  )
}