"use client"

import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import Image from 'next/image'
import { FullScreenMenu } from '@/components/full-screen-menu'
import { ContactModal } from '@/components/contact-modal'

export default function CareersPage() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isContactModalOpen, setIsContactModalOpen] = useState(false)
  const [currentSection, setCurrentSection] = useState(0)

  const sections = [
    { id: 'hero', title: 'Hero' },
    { id: 'join-us', title: 'Join Us' },
    { id: 'core-values', title: 'Core Values' },
    { id: 'current-positions', title: 'Current Positions' }
  ]

  // Handle scroll to update current section
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + window.innerHeight / 2
      
      sections.forEach((section, index) => {
        const element = document.getElementById(section.id)
        if (element) {
          const rect = element.getBoundingClientRect()
          const elementTop = rect.top + window.scrollY
          const elementBottom = elementTop + rect.height
          
          if (scrollPosition >= elementTop && scrollPosition < elementBottom) {
            setCurrentSection(index)
          }
        }
      })
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <div className="relative">
      {/* Menu button - same as home page */}
      <motion.button
        onClick={() => setIsMenuOpen(true)}
        className="fixed top-6 right-6 z-50 bg-white/90 backdrop-blur-sm rounded-full px-6 py-3 text-sm font-medium text-gray-900 hover:bg-white transition-colors shadow-lg"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        Menu +
      </motion.button>

      {/* Full Screen Menu */}
      <FullScreenMenu isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />

      {/* Contact Modal */}
      <ContactModal isOpen={isContactModalOpen} onClose={() => setIsContactModalOpen(false)} />

      {/* First Section - Hero */}
      <section className="min-h-screen bg-pink-400 relative overflow-hidden" id="hero">
        {/* Background decorative elements */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute bottom-20 left-20 w-64 h-64 border-2 border-lime-400 rounded-full opacity-20"></div>
          <div className="absolute bottom-40 right-40 w-32 h-32 border border-lime-400 rounded-full opacity-30"></div>
          <div className="absolute top-1/2 left-10 w-20 h-20 border border-lime-400 transform rotate-45 opacity-20"></div>
        </div>

        {/* Header */}
        <header className="relative z-10 flex justify-between items-center p-6">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-lime-400 rounded-full flex items-center justify-center">
              <div className="w-4 h-4 bg-pink-400 rounded-full"></div>
            </div>
            <span className="text-lime-400 font-bold text-lg">Logo</span>
          </div>
        </header>

        {/* Main Content */}
        <main className="relative z-10 flex flex-col items-center justify-center min-h-[80vh] px-6">
          {/* Team Photo */}
          <div className="relative max-w-4xl mx-auto flex justify-center items-center">
            <div className="relative">
              <Image
                src="https://gtcyljdmvzaipvimfjhr.supabase.co/storage/v1/object/public/assets-media/careers-page/pexels-rdne-7464721.jpg"
                alt="Team Photo"
                width={700}
                height={500}
                className="rounded-3xl shadow-xl"
              />
              {/* Overlapping text and button */}
              <div className="absolute bottom-6 left-6 right-6 flex justify-between items-end">
                <h2 className="text-4xl md:text-5xl font-bold text-white leading-tight drop-shadow-lg">
                  Join Our Team
                </h2>
                <button 
                  className="bg-lime-400 text-black px-8 py-4 rounded-lg font-bold text-lg hover:bg-lime-300 transition-colors shadow-lg"
                  onClick={() => setIsContactModalOpen(true)}
                >
                  Apply Now
                </button>
              </div>
            </div>
          </div>

          {/* Remove the old call to action since it's now on the card */}
          {/* <div className="mt-4 text-center">
            <button className="bg-lime-400 text-black px-8 py-4 rounded-lg font-bold text-lg hover:bg-lime-300 transition-colors shadow-lg">
              Join Our Team
            </button>
          </div> */}
        </main>

        {/* Floating Contact Button */}
        <div className="fixed bottom-6 right-6 z-30">
          <div className="relative flex items-center justify-center">
            <div className="absolute inset-0 bg-lime-400 rounded-full animate-ping opacity-20"></div>
            <button className="relative bg-lime-400 w-32 h-32 rounded-full flex items-center justify-center shadow-lg hover:bg-lime-300 transition-colors" onClick={() => setIsContactModalOpen(true)}>
              <svg className="absolute w-28 h-28 animate-spin-slow" viewBox="0 0 100 100">
                <defs>
                  <path id="circlePath" d="M50,50 m-40,0 a40,40 0 1,1 80,0 a40,40 0 1,1 -80,0" />
                </defs>
                <text fontSize="12" fill="#222">
                  <textPath xlinkHref="#circlePath">Contact Us • Contact Us • Contact Us • </textPath>
                </text>
              </svg>
              <span className="relative z-10 text-black font-bold text-lg">→</span>
            </button>
          </div>
        </div>
      </section>

      {/* Second Section - Join Us Here */}
      <section className="min-h-screen relative overflow-hidden" id="join-us">
        {/* Background with blur and gradient overlay */}
        <div className="absolute inset-0">
          {/* Blurred background image */}
          <div className="absolute inset-0 bg-gradient-to-br from-pink-500 via-purple-500 to-pink-400 opacity-80"></div>
          {/* Video placeholder in the middle */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-[950px] h-[650px] bg-gray-800 rounded-3xl flex items-center justify-center text-white text-2xl shadow-2xl">
              <div className="text-center">
                <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M8 5v14l11-7z"/>
                  </svg>
                </div>
                Video Placeholder
              </div>
            </div>
          </div>
        </div>

        {/* "Join Us" text overlay - moved to bottom */}
        <div className="relative z-10 flex items-end justify-center min-h-screen pb-20">
          <h2 className="text-8xl md:text-9xl font-bold text-lime-400 leading-none">
            Join Us
          </h2>
        </div>
      </section>

      {/* Left Sidebar - Scroll Indicator & Navigation */}
      <div className="fixed left-6 top-1/2 -translate-y-1/2 z-50 flex flex-col items-center space-y-4">
        {/* Navigation dots */}
        <div className="flex flex-col space-y-3">
          {sections.map((section, index) => (
            <motion.button
              key={index}
              onClick={() => {
                setCurrentSection(index)
                document.getElementById(sections[index].id)?.scrollIntoView({ behavior: 'smooth' })
              }}
              className="flex items-center space-x-3 group"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.9 }}
            >
              <div className={`w-3 h-3 rounded-full border-2 transition-all duration-300 ${
                index === currentSection
                  ? "bg-lime-400 border-lime-400 scale-125"
                  : "bg-transparent border-lime-400/60 hover:border-lime-400 hover:scale-110"
              }`}
              />
              <span className={`text-sm font-medium transition-all duration-300 ${
                index === currentSection
                  ? "text-lime-400 opacity-0"
                  : "text-lime-400/60 opacity-0 group-hover:opacity-100"
              }`}>
                {section.title}
              </span>
            </motion.button>
          ))}
        </div>

        {/* Scroll indicator */}
        <motion.div
          className="mt-8 flex flex-col items-center text-lime-400/60"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
        >
          <div className="w-px h-12 bg-lime-400/30 mb-2" />
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
            <path d="M7 10l5 5 5-5z"/>
          </svg>
        </motion.div>
      </div>

      {/* Core Values Section */}
      <section id="core-values" className="min-h-screen bg-green-900 relative overflow-hidden">
        {/* Header */}
        <header className="relative z-10 flex justify-between items-center p-6">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-lime-400 rounded-full flex items-center justify-center">
              <div className="w-4 h-4 bg-green-900 rounded-full"></div>
            </div>
            <span className="text-lime-400 font-bold text-lg">Logo</span>
          </div>
        </header>

        {/* Main Content */}
        <div className="relative z-10 flex flex-col items-center justify-center min-h-[80vh] px-4">
          <h2 className="text-lime-400 text-5xl font-bold mb-16 text-center">Core Values</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 max-w-6xl w-full">
            {/* Value 1 - Planet First */}
            <div className="flex items-center space-x-6">
              <div className="flex-shrink-0">
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                >
                  <svg width="100" height="100" viewBox="0 0 100 100" fill="none">
                    <circle cx="50" cy="50" r="48" fill="#A3E635" />
                    {/* Latitude lines */}
                    <path d="M10 30 Q50 30 90 30" stroke="#14532D" strokeWidth="2" fill="none" opacity="0.7"/>
                    <path d="M10 50 Q50 50 90 50" stroke="#14532D" strokeWidth="2" fill="none" opacity="0.7"/>
                    <path d="M10 70 Q50 70 90 70" stroke="#14532D" strokeWidth="2" fill="none" opacity="0.7"/>
                    {/* Simplified landmasses */}
                    <path d="M25 35 Q35 25 45 35 Q55 45 65 35 Q75 25 85 35" fill="#14532D" opacity="0.5"/>
                    <path d="M20 55 Q30 45 40 55 Q50 65 60 55 Q70 45 80 55" fill="#14532D" opacity="0.5"/>
                  </svg>
                </motion.div>
              </div>
              <div>
                <h3 className="text-lime-400 text-2xl font-semibold mb-2">Reliability Above All</h3>
                <p className="text-lime-400 text-base">We deliver on time, every time. Our clients trust us because we treat every shipment as a priority, ensuring dependable service from quote to delivery.</p>
              </div>
            </div>

            {/* Value 2 - Thrive Together */}
            <div className="flex items-center space-x-6">
              <div className="flex-shrink-0">
                <motion.div
                  animate={{ 
                    scale: [1, 1.1, 1],
                    rotate: [0, 5, -5, 0]
                  }}
                  transition={{ 
                    duration: 4, 
                    repeat: Infinity, 
                    ease: "easeInOut" 
                  }}
                >
                  <svg width="100" height="100" viewBox="0 0 100 100" fill="none">
                    <circle cx="50" cy="50" r="48" fill="#A3E635" />
                    {/* Interconnected blobs */}
                    <circle cx="35" cy="35" r="8" fill="#14532D" opacity="0.7"/>
                    <circle cx="65" cy="35" r="8" fill="#14532D" opacity="0.7"/>
                    <circle cx="35" cy="65" r="8" fill="#14532D" opacity="0.7"/>
                    <circle cx="65" cy="65" r="8" fill="#14532D" opacity="0.7"/>
                    <circle cx="50" cy="50" r="8" fill="#14532D" opacity="0.7"/>
                    {/* Connection lines */}
                    <path d="M35 35 L50 50 L65 35" stroke="#14532D" strokeWidth="2" opacity="0.5"/>
                    <path d="M35 35 L50 50 L35 65" stroke="#14532D" strokeWidth="2" opacity="0.5"/>
                    <path d="M65 35 L50 50 L65 65" stroke="#14532D" strokeWidth="2" opacity="0.5"/>
                    <path d="M35 65 L50 50 L65 65" stroke="#14532D" strokeWidth="2" opacity="0.5"/>
                  </svg>
                </motion.div>
              </div>
              <div>
                <h3 className="text-lime-400 text-2xl font-semibold mb-2">Customer-Centered Service</h3>
                <p className="text-lime-400 text-base">Every job starts with understanding our customers’ needs. From fast quotes to transparent tracking and support, we make logistics simple and stress-free.</p>
              </div>
            </div>

            {/* Value 3 - Exceptional Craftsmanship */}
            <div className="flex items-center space-x-6">
              <div className="flex-shrink-0 relative">
                <motion.div
                  animate={{ 
                    rotate: [0, 90, 180, 270, 360]
                  }}
                  transition={{ 
                    duration: 8, 
                    repeat: Infinity, 
                    ease: "linear" 
                  }}
                >
                  <svg width="100" height="100" viewBox="0 0 100 100" fill="none">
                    <circle cx="50" cy="50" r="48" fill="#A3E635" />
                    {/* Geometric shapes */}
                    <rect x="30" y="30" width="12" height="12" fill="#14532D" opacity="0.7"/>
                    <circle cx="70" cy="35" r="6" fill="#14532D" opacity="0.7"/>
                    <polygon points="35,70 45,60 55,70" fill="#14532D" opacity="0.7"/>
                    <rect x="60" y="60" width="15" height="15" fill="#14532D" opacity="0.7"/>
                  </svg>
                </motion.div>
                {/* Navigation dots and arrow */}
                <div className="absolute -left-8 top-1/2 transform -translate-y-1/2 flex flex-col items-center space-y-2">
                  <motion.div
                    animate={{ opacity: [0.5, 1, 0.5] }}
                    transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                    className="w-2 h-2 bg-lime-400 rounded-full"
                  />
                  <motion.div
                    animate={{ opacity: [0.5, 1, 0.5] }}
                    transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
                    className="w-2 h-2 bg-lime-400 rounded-full"
                  />
                  <motion.div
                    animate={{ opacity: [0.5, 1, 0.5] }}
                    transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                    className="w-2 h-2 bg-lime-400 rounded-full"
                  />
                  <motion.div
                    animate={{ y: [0, 5, 0] }}
                    transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                    className="mt-2"
                  >
                    <svg className="w-4 h-4 text-lime-400" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M7 10l5 5 5-5z"/>
                    </svg>
                  </motion.div>
                </div>
              </div>
              <div>
                <h3 className="text-lime-400 text-2xl font-semibold mb-2">Innovation in Motion</h3>
                <p className="text-lime-400 text-base">We leverage modern tools and strategies to optimize routes, streamline operations, and reduce costs — giving our customers the edge they need.</p>
              </div>
            </div>

            {/* Value 4 - Forever Evolving */}
            <div className="flex items-center space-x-6">
              <div className="flex-shrink-0">
                <motion.div
                  animate={{ 
                    rotate: [0, 360]
                  }}
                  transition={{ 
                    duration: 12, 
                    repeat: Infinity, 
                    ease: "linear" 
                  }}
                >
                  <svg width="100" height="100" viewBox="0 0 100 100" fill="none">
                    <circle cx="50" cy="50" r="48" fill="#A3E635" />
                    {/* Progress segment */}
                    <path d="M50 50 L50 2 A48 48 0 0 1 98 50 Z" fill="#14532D" opacity="0.7"/>
                  </svg>
                </motion.div>
              </div>
              <div>
                <h3 className="text-lime-400 text-2xl font-semibold mb-2">Integrity & Professionalism</h3>
                <p className="text-lime-400 text-base">Our team is committed to honest communication, fair pricing, and maintaining the highest standards at every step of the process.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Fourth Section - Current Positions */}
      <section id="current-positions" className="min-h-screen bg-green-900 relative overflow-hidden">
        {/* Header */}
        <header className="relative z-10 flex justify-between items-center p-6">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-lime-400 rounded-full flex items-center justify-center">
              <div className="w-4 h-4 bg-green-900 rounded-full"></div>
            </div>
            <span className="text-lime-400 font-bold text-lg">Logo</span>
          </div>
        </header>

        {/* Main Content */}
        <div className="relative z-10 flex flex-col items-center justify-center min-h-[80vh] px-4">
          {/* Title */}
          <div className="text-center mb-12">
            <h2 className="text-6xl md:text-8xl font-bold text-lime-400 leading-tight">
              Current
              <br />
              Positions
            </h2>
          </div>

          {/* No Current Openings Message */}
          <div className="text-center">
            <div className="relative">
              {/* Top line */}
              <div className="w-64 h-px bg-lime-400 mx-auto mb-4"></div>
              
              {/* Message */}
              <p className="text-lime-400 text-xl font-medium">
                No current job openings
              </p>
              
              {/* Bottom line */}
              <div className="w-64 h-px bg-lime-400 mx-auto mt-4"></div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
} 