"use client"

import { motion, useScroll, useTransform } from "framer-motion"
import { Button } from "../components/ui/button"
import dynamic from "next/dynamic"

// Dynamic imports for performance (code splitting)
const StatsSection = dynamic(() => import("../components/stats-section").then(mod => mod.StatsSection))
const CompanyCarousel = dynamic(() => import("../components/company-carousel").then(mod => mod.CompanyCarousel))
const ServicesBento = dynamic(() => import("../components/services-bento").then(mod => mod.ServicesBento))
const ScrollSection = dynamic(() => import("../components/scroll-section").then(mod => mod.ScrollSection))
const TestimonialsSection = dynamic(() => import("../components/testimonials-section").then(mod => mod.TestimonialsSection))
const ProcessSection = dynamic(() => import("../components/process-section").then(mod => mod.ProcessSection))
const FeaturedWorkSection = dynamic(() => import("../components/featured-work").then(mod => mod.FeaturedWorkSection))

import { ParticleBackground } from "../components/particle-background"
import { MeshGradient } from "../components/mesh-gradient"
import { TypewriterText } from "../components/typewriter-text"
import { TiltButton } from "../components/tilt-button"
import Link from "next/link"
import { useRef } from "react"

export default function Home() {
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  })

  // Simplified transforms for better performance
  const opacity = useTransform(scrollYProgress, [0, 0.4], [1, 0])
  const y = useTransform(scrollYProgress, [0, 0.4], [0, 50])

  return (
    <div className="bg-transparent theme-transition">
      <section ref={containerRef} className="min-h-screen relative flex items-center justify-center overflow-hidden">
        {/* Enhanced Animated background */}
        <div className="absolute inset-0">
          {/* Mesh Gradient */}
          <MeshGradient />

          {/* Grid Pattern - Optimized (No CSS Mask) */}
          <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center opacity-20 pointer-events-none" />

          {/* Fade Gradient Overlay (Cheaper than mask) */}
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-background/90 pointer-events-none" />

          {/* Particle System - Absolute positioned helps browser culling */}
          <ParticleBackground particleCount={15} />
        </div>

        <motion.div style={{ opacity, y }} className="relative z-10 text-center px-4 will-change-[transform,opacity]">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
            <h1 className="text-5xl md:text-7xl font-bold bg-clip-text text-transparent theme-gradient-text mb-6 theme-transition leading-tight grid place-items-center">
              {/* Ghost Element to Reserve Height (Prevents Layout Shift) */}
              <span className="col-start-1 row-start-1 invisible opacity-0 pointer-events-none select-none">
                Custom Software That Solves Real Business Problems
              </span>

              {/* Actual Animated Text */}
              <span className="col-start-1 row-start-1">
                <TypewriterText
                  texts={[
                    "Custom Software That Solves Real Business Problems",
                    "Build Scalable Solutions That Drive Growth",
                    "Transform Ideas Into Production-Ready Apps",
                  ]}
                  className="bg-clip-text text-transparent theme-gradient-text"
                  typingSpeed={80}
                  deletingSpeed={40}
                  pauseDuration={3000}
                />
              </span>
            </h1>
            <p className="text-xl md:text-2xl theme-text mb-12 max-w-3xl mx-auto theme-transition">
              We help companies automate operations, launch products, and scale with confidence.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link href="/contact">
                <TiltButton
                  className="bg-gradient-to-r from-primary via-purple-500 to-pink-500 text-white px-8 py-4 text-lg font-bold shadow-2xl shadow-primary/30"
                  tiltIntensity={12}
                >
                  Discuss Your Project
                </TiltButton>
              </Link>
              <Link href="/case-studies">
                <TiltButton
                  className="border-2 border-primary bg-background/50 backdrop-blur-sm text-primary px-8 py-4 text-lg font-bold hover:bg-primary/10"
                  tiltIntensity={12}
                >
                  View Case Studies
                </TiltButton>
              </Link>
            </div>

            <motion.div
              className="mt-8"
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
            >
              <span className="theme-text text-sm theme-transition opacity-70">Scroll to explore</span>
            </motion.div>
          </motion.div>
        </motion.div>


      </section>

      {/* 2. Trusted By / Client Carousel */}
      <CompanyCarousel />

      {/* 3. Key Achievements / Metrics */}
      <StatsSection />

      {/* 4. Our Services */}
      {/* 4. Our Services */}
      <ServicesBento />

      {/* 5. Why Choose RapidNexTech */}
      <ScrollSection />

      {/* 6. Featured Work / Portfolio Preview */}
      <FeaturedWorkSection />

      {/* 7. Client Testimonials */}
      <TestimonialsSection />

      {/* 8. Our Process */}
      <ProcessSection />

      {/* 8. Final CTA */}
      <section className="py-32 theme-bg relative theme-transition">
        <div className="container mx-auto px-4 text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-8"
          >
            <h2 className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent theme-gradient-text theme-transition">
              Ready to Transform Your Business?
            </h2>
            <p className="text-xl theme-text max-w-2xl mx-auto theme-transition">
              Partner with RapidNexTech to build innovative software solutions that drive growth and efficiency
            </p>
            <Link href="/contact">
              <Button
                size="lg"
                className="bg-gradient-to-r theme-gradient-text text-white hover:opacity-90 transform hover:-translate-y-1 transition-all duration-200 theme-transition"
              >
                Start Your Project
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
