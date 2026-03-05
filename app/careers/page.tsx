import Link from "next/link"
import { Button } from "@/components/ui/button"
import FadeInSection from "@/components/careers/FadeInSection"
import FeaturesGrid from "@/components/careers/FeaturesGrid"
import CareerPathways from "@/components/careers/CareerPathways"
import HiringProcess from "@/components/careers/HiringProcess"
import OpenRoles from "@/components/careers/OpenRoles"
import LifeSection from "@/components/careers/LifeSection"
import FinalCTA from "@/components/careers/FinalCTA"
import SectionHeader from "@/components/careers/SectionHeader"
import AnimatedSVG from "@/components/careers/AnimatedSVG"

export const metadata = {
  title: "Careers — Join Our Remote Engineering Team",
  description:
    "Join RapidNexTech - a remote-first team building custom software, SaaS platforms, and AI automation. Discover open roles, culture, and growth opportunities.",
  alternates: { canonical: "https://rapidnextech.com/careers" },
  openGraph: {
    title: "Careers at RapidNexTech — Build What Matters",
    description:
      "Join a remote-first engineering team working on custom software, SaaS, and AI. See open roles and our culture.",
    url: "https://rapidnextech.com/careers",
    type: "website",
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "RapidNexTech Careers" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Careers at RapidNexTech — Build What Matters",
    description:
      "Join a remote-first engineering team working on custom software, SaaS, and AI. See open roles and our culture.",
    images: ["/og-image.png"],
  },
}

export default function CareersPage() {
  return (
    <main className="min-h-screen">
      {/* 🧭 Hero Section */}
      <section id="open-roles" className="relative min-h-[60vh] flex items-center pt-24 pb-12 overflow-hidden">
        {/* Subtle Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-purple-500/5 mix-blend-overlay" />

        <div className="container mx-auto px-6 grid md:grid-cols-2 gap-12 items-center relative z-10">
          <div className="space-y-8">
            <h1 className="text-5xl md:text-7xl font-bold tracking-tight leading-[1.1] theme-gradient-text bg-clip-text text-transparent">
              Join the <br /> RapidNexTech Team
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground leading-relaxed max-w-lg">
              We build technology that moves fast — and so do our people.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link href="#open-roles">
                <Button className="h-12 px-8 text-lg rounded-full bg-primary text-white hover:bg-primary/90 shadow-lg shadow-primary/20 transition-all hover:scale-105">
                  Join our Pipeline
                </Button>
              </Link>
              <a href="mailto:info@rapidnextech.com">
                <Button variant="outline" className="h-12 px-8 text-lg rounded-full border-2 hover:bg-muted/50 transition-all">
                  Send Your CV
                </Button>
              </a>
            </div>
          </div>
          <div className="relative hidden md:block">
            <AnimatedSVG
              src="/careers-hero-hiring.svg"
              alt="Hiring illustration"
            />
          </div>
        </div>
      </section>

      {/* 🌟 Why Work With Us */}
      <FeaturesGrid />

      {/* 🚀 Career Pathways */}
      <CareerPathways />

      {/* 🧭 Hiring Process */}
      <HiringProcess />

      {/* 💼 Open Roles */}
      <OpenRoles />

      {/* 🌍 Life at RapidNexTech */}
      <LifeSection />

      {/* ✉️ Final Call-To-Action */}
      <FinalCTA />
    </main>
  )
}
