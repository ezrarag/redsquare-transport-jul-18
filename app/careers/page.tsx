"use client"
import React, { useRef } from "react"
import { useEffect, useState } from "react"
import { supabase } from "@/lib/supabase"

// Color palette from screenshots
const PINK = "#ECA7F7"
const NEON = "#B6FF5C"
const DEEP_GREEN = "#0B3C2D"
const NEON_BG = "#C6FF7F"

const coreValues = [
  {
    icon: (
      <svg width="96" height="96" viewBox="0 0 96 96" fill="none"><circle cx="48" cy="48" r="48" fill={NEON}/><path d="M24 48c0-13.255 10.745-24 24-24s24 10.745 24 24" stroke={DEEP_GREEN} strokeWidth="4" strokeLinecap="round" strokeDasharray="8 8"/></svg>
    ),
    title: "Planet First, Profit Follows",
    desc: "We prioritise planet well-being in every decision, making sustainable choices for a greener tomorrow and long-term profitability.",
  },
  {
    icon: (
      <svg width="96" height="96" viewBox="0 0 96 96" fill="none"><circle cx="48" cy="48" r="48" fill={NEON}/><circle cx="48" cy="48" r="24" fill={DEEP_GREEN}/><path d="M48 24v48M24 48h48" stroke={NEON} strokeWidth="4"/></svg>
    ),
    title: "Thrive Together",
    desc: "We ensure that everyone is nurtured, valued and empowered. We cultivate an ecosystem where you bloom.",
  },
  {
    icon: (
      <svg width="96" height="96" viewBox="0 0 96 96" fill="none"><circle cx="48" cy="48" r="48" fill={NEON}/><rect x="32" y="32" width="32" height="32" rx="8" fill={DEEP_GREEN}/><circle cx="48" cy="48" r="8" fill={NEON}/></svg>
    ),
    title: "Exceptional Craftsmanship",
    desc: "We believe in high quality solutions crafted with precision and excellence that respect your investment.",
  },
  {
    icon: (
      <svg width="96" height="96" viewBox="0 0 96 96" fill="none"><circle cx="48" cy="48" r="48" fill={NEON}/><path d="M48 16a32 32 0 1 1-32 32" stroke={DEEP_GREEN} strokeWidth="8" strokeLinecap="round"/></svg>
    ),
    title: "Forever Evolving",
    desc: "We never stand still, committed to pushing boundaries, always at the forefront of change.",
  },
]

export default function CareersPage() {
  const [jobs, setJobs] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const heroRef = useRef<HTMLDivElement>(null)
  const joinRef = useRef<HTMLDivElement>(null)
  const coreRef = useRef<HTMLDivElement>(null)
  const jobsRef = useRef<HTMLDivElement>(null)
  const sections = [heroRef, joinRef, coreRef, jobsRef]

  useEffect(() => {
    async function fetchJobs() {
      setLoading(true)
      const { data, error } = await supabase.from("jobs").select("*").order("posted_at", { ascending: false })
      if (!error) setJobs(data || [])
      setLoading(false)
    }
    fetchJobs()
  }, [])

  // Smooth scroll handler
  const scrollToSection = (idx: number) => {
    sections[idx]?.current?.scrollIntoView({ behavior: "smooth" })
  }

  return (
    <main className="relative w-full min-h-screen bg-white overflow-x-hidden font-sans">
      {/* Logo top left */}
      <div className="fixed top-6 left-6 z-50">
        <div className="w-12 h-12 rounded-full bg-[#B6FF5C] flex items-center justify-center">
          {/* Placeholder logo */}
          <svg width="32" height="32" viewBox="0 0 32 32" fill="none"><circle cx="16" cy="16" r="16" fill={DEEP_GREEN}/><path d="M8 20c2-4 6-8 8-8s6 4 8 8" stroke={NEON} strokeWidth="2"/></svg>
        </div>
      </div>
      {/* Menu top right */}
      <div className="fixed top-6 right-6 z-50">
        <button className="bg-white rounded-full px-6 py-2 text-lg font-medium shadow border border-[#B6FF5C] text-[#0B3C2D]">Menu +</button>
      </div>
      {/* Contact badge bottom right */}
      <div className="fixed bottom-6 right-6 z-50">
        <div className="rounded-full bg-[#B6FF5C] px-4 py-2 text-[#0B3C2D] font-bold text-sm border-2 border-[#0B3C2D] rotate-[-15deg]">Contact Us →</div>
      </div>
      {/* Slider/Scroll Nav bottom left */}
      <div className="fixed left-6 bottom-6 z-50 flex flex-col items-center gap-2">
        {sections.map((ref, idx) => (
          <button
            key={idx}
            onClick={() => scrollToSection(idx)}
            className={`w-4 h-4 rounded-full border-2 ${idx === 0 ? 'bg-[#B6FF5C]' : 'bg-white'} border-[#B6FF5C] transition-colors`}
            aria-label={`Go to section ${idx + 1}`}
          />
        ))}
        <svg width="24" height="24" fill="none" className="mt-2 animate-bounce"><path d="M6 9l6 6 6-6" stroke={NEON} strokeWidth="2"/></svg>
      </div>

      {/* Hero Section */}
      <div ref={heroRef} style={{ background: PINK }} className="w-full min-h-screen flex flex-col justify-center items-center relative overflow-hidden pb-24">
        <h1 className="text-[clamp(3rem,10vw,8rem)] font-bold text-center" style={{ color: NEON, lineHeight: 1.1, marginTop: '3rem' }}>
          Grow Your<br />Career
        </h1>
        {/* Group photo placeholder */}
        <div className="absolute left-1/2 -translate-x-1/2 bottom-0 flex justify-center z-10">
          <img src="/placeholder-user.jpg" alt="Team" className="rounded-2xl shadow-xl w-[420px] h-[320px] object-cover border-8 border-white" />
        </div>
      </div>

      {/* Join Us Section */}
      <div ref={joinRef} className="w-full min-h-screen flex flex-col justify-center items-center relative py-24 border-t-8 border-[#0B3C2D] bg-white">
        <div className="w-full max-w-5xl mx-auto rounded-3xl overflow-hidden flex flex-col items-center border-8 border-[#0B3C2D]">
          {/* Video placeholder */}
          <div className="w-full aspect-video bg-gray-200 flex items-center justify-center">
            {/* Replace with <video> or iframe as needed */}
            <span className="text-gray-400 text-2xl">[Video Placeholder]</span>
          </div>
        </div>
      </div>

      {/* Core Values Section */}
      <div ref={coreRef} style={{ background: DEEP_GREEN }} className="w-full min-h-screen flex flex-col justify-center items-center py-24">
        <h2 className="text-5xl font-bold mb-16 text-center" style={{ color: NEON }}>Core Values</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-24 w-full max-w-6xl">
          {coreValues.map((val, idx) => (
            <div key={idx} className="flex flex-col md:flex-row items-center text-left p-8 rounded-2xl gap-8" style={{ background: "rgba(255,255,255,0.01)" }}>
              <div className="flex-shrink-0">{val.icon}</div>
              <div>
                <h3 className="text-2xl font-semibold mb-2" style={{ color: NEON }}>{val.title}</h3>
                <p className="text-lg text-[#B6FF5C]/80 max-w-xs">{val.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Current Positions Section */}
      <div ref={jobsRef} style={{ background: DEEP_GREEN }} className="w-full min-h-screen flex flex-col justify-center items-center py-24 border-t border-[#B6FF5C]">
        <h2 className="text-5xl font-bold mb-12 text-left w-full max-w-5xl" style={{ color: NEON }}>Current Positions</h2>
        <div className="w-full max-w-5xl border-t border-[#B6FF5C]">
          {loading ? (
            <div className="text-left text-[#B6FF5C] py-8">Loading jobs...</div>
          ) : jobs.length === 0 ? (
            <div className="text-left text-[#B6FF5C] py-8">No current job openings</div>
          ) : (
            <ul className="space-y-8 py-8">
              {jobs.map((job) => (
                <li key={job.id} className="bg-[#123C2D] rounded-xl p-8 shadow-lg border border-[#B6FF5C]/20">
                  <h3 className="text-2xl font-bold mb-2 text-[#B6FF5C]">{job.title}</h3>
                  <p className="text-lg text-[#B6FF5C]/80 mb-2">{job.location} • {job.employment_type}</p>
                  <p className="text-base text-[#B6FF5C]/70 mb-4">{job.description}</p>
                  <button className="mt-2 px-6 py-2 rounded-full bg-[#B6FF5C] text-[#0B3C2D] font-semibold hover:bg-[#d0ffb0] transition">Apply</button>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>

      {/* Footer */}
      <footer style={{ background: NEON_BG }} className="w-full py-12 flex flex-col items-center text-[#0B3C2D] border-t border-[#B6FF5C]">
        <form className="flex gap-2 mb-4 w-full max-w-md border-b border-[#0B3C2D] pb-2">
          <input type="email" placeholder="your email" className="flex-1 bg-transparent px-4 py-2 text-lg outline-none" />
          <button type="submit" className="px-4 py-2 text-2xl font-bold">→</button>
        </form>
        <div className="mb-2 text-sm">info@brightbiotech.co.uk</div>
        <div className="mb-2 text-xs">Rutherford House Unit 16 Pencroft Way, Manchester, England, M15 6SZ</div>
        <div className="flex gap-4 mt-2">
          <a href="#" aria-label="Instagram" className="hover:opacity-80"><svg width="32" height="32" fill="none" stroke={DEEP_GREEN} strokeWidth="2"><circle cx="16" cy="16" r="15" /></svg></a>
          <a href="#" aria-label="LinkedIn" className="hover:opacity-80"><svg width="32" height="32" fill="none" stroke={DEEP_GREEN} strokeWidth="2"><rect x="6" y="6" width="20" height="20" rx="4" /></svg></a>
        </div>
        <div className="mt-4 text-xs">Copyright © 2025 Your Data Terms and Conditions<br/>Design by Lyon & Lyon</div>
      </footer>
    </main>
  )
} 