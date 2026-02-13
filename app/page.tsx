"use client"

import dynamic from "next/dynamic"
import { HeroSection } from "../components/hero-section"
import { ProjectCTA } from "../components/shared/ProjectCTA"

// Loading skeleton for below-the-fold sections
const SectionLoader = () => (
  <div className="min-h-[40vh] flex items-center justify-center">
    <div className="animate-pulse w-full max-w-4xl mx-auto px-4">
      <div className="h-8 bg-gray-200/20 rounded w-1/2 mb-4 mx-auto"></div>
      <div className="h-4 bg-gray-200/20 rounded w-3/4 mx-auto"></div>
    </div>
  </div>
)

// Dynamic imports for below-the-fold sections (code splitting)
const StatsSection = dynamic(() => import("../components/stats-section").then(mod => mod.StatsSection), { loading: SectionLoader })
const CompanyCarousel = dynamic(() => import("../components/company-carousel").then(mod => mod.CompanyCarousel), { loading: SectionLoader })
const ServicesBento = dynamic(() => import("../components/services-bento").then(mod => mod.ServicesBento), { loading: SectionLoader })
const ScrollSection = dynamic(() => import("../components/scroll-section").then(mod => mod.ScrollSection), { loading: SectionLoader })
const TestimonialsSection = dynamic(() => import("../components/testimonials-section").then(mod => mod.TestimonialsSection), { loading: SectionLoader })
const ProcessSection = dynamic(() => import("../components/process-section").then(mod => mod.ProcessSection), { loading: SectionLoader })
const FeaturedWorkSection = dynamic(() => import("../components/featured-work").then(mod => mod.FeaturedWorkSection), { loading: SectionLoader })

export default function Home() {
  return (
    <div className="bg-transparent theme-transition">
      {/* 1. Hero — Lightweight client component, no canvas/framer-motion overhead */}
      <HeroSection />

      {/* 2. Trusted By / Client Carousel */}
      <CompanyCarousel />

      {/* 3. Key Achievements / Metrics */}
      <StatsSection />

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
