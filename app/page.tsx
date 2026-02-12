"use client"

import { motion } from "framer-motion"
import { Button } from "../components/ui/button"
import dynamic from "next/dynamic"

// Loading skeleton for sections
const SectionLoader = () => (
  <div className="min-h-[40vh] flex items-center justify-center">
    <div className="animate-pulse w-full max-w-4xl mx-auto px-4">
      <div className="h-8 bg-gray-200/20 rounded w-1/2 mb-4 mx-auto"></div>
      <div className="h-4 bg-gray-200/20 rounded w-3/4 mx-auto"></div>
    </div>
  </div>
)

// Dynamic imports for performance (code splitting) - with loading states
const StatsSection = dynamic(() => import("../components/stats-section").then(mod => mod.StatsSection), { loading: SectionLoader })
const CompanyCarousel = dynamic(() => import("../components/company-carousel").then(mod => mod.CompanyCarousel), { loading: SectionLoader })
const ServicesBento = dynamic(() => import("../components/services-bento").then(mod => mod.ServicesBento), { loading: SectionLoader })
const ScrollSection = dynamic(() => import("../components/scroll-section").then(mod => mod.ScrollSection), { loading: SectionLoader })
const TestimonialsSection = dynamic(() => import("../components/testimonials-section").then(mod => mod.TestimonialsSection), { loading: SectionLoader })
const ProcessSection = dynamic(() => import("../components/process-section").then(mod => mod.ProcessSection), { loading: SectionLoader })
const FeaturedWorkSection = dynamic(() => import("../components/featured-work").then(mod => mod.FeaturedWorkSection), { loading: SectionLoader })

import { ParticleBackground } from "../components/particle-background"
import { MeshGradient } from "../components/mesh-gradient"
import { TypewriterText } from "../components/typewriter-text"
import { TiltButton } from "../components/tilt-button"
import Link from "next/link"
import { ProjectCTA } from "../components/shared/ProjectCTA"

export default function Home() {
  return (
    <div className="bg-transparent theme-transition">
      <section className="min-h-screen relative flex items-center justify-center overflow-hidden pt-16 md:pt-24">
        {/* Enhanced Animated background */}
        <div className="absolute inset-0">
          {/* Mesh Gradient */}
          <MeshGradient />

          {/* Grid Pattern - Optimized (No CSS Mask) */}
          <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center opacity-[0.08] pointer-events-none" />

          {/* Fade Gradient Overlay (Cheaper than mask) */}
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-background/90 pointer-events-none" />

          {/* Particle System - Absolute positioned helps browser culling */}
          <ParticleBackground particleCount={15} />
        </div>
        {/* Hero content - Visible immediately in static HTML */}
        <div className="relative z-10 text-center px-4 animate-fade-in-up">
          <div>
            <h1 className="text-5xl md:text-7xl font-bold bg-clip-text text-transparent theme-gradient-text mb-6 theme-transition leading-tight flex items-center justify-center">
              <TypewriterText
                texts={[
                  "Custom Software That Solves Real Business Problems",
                  "Build Scalable Solutions That Drive Growth",
                  "Transform Ideas Into Production-Ready Apps",
                ]}
                typingSpeed={80}
                deletingSpeed={40}
                pauseDuration={3000}
              />
            </h1>
            <p className="text-xl md:text-2xl theme-text mb-12 max-w-3xl mx-auto theme-transition opacity-70">
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
                  className="border-2 border-primary bg-transparent text-primary px-8 py-4 text-lg font-bold hover:bg-primary/5 transition-colors"
                  tiltIntensity={12}
                >
                  View Case Studies
                </TiltButton>
              </Link>
            </div>

            {/* Mobile Scroll Indicator - Just below CTA */}
            <div className="mt-6 md:hidden animate-float">
              <span className="theme-text text-xs theme-transition opacity-60">Scroll to explore</span>
            </div>
          </div>
        </div>

        {/* Desktop Scroll Indicator - Absolutely at bottom, hidden on short screens to avoid overlap */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10 hidden md:block lg:block animate-float h-[600px]:hidden">
          <span className="theme-text text-sm theme-transition opacity-70">Scroll to explore</span>
        </div>


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

      {/* 9. Final CTA */}
      <ProjectCTA />
    </div>
  )
}
