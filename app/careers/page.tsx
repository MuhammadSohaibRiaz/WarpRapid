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
  title: "Careers at RapidXTech | Join Our Remote Software Team",
  description:
    "Join RapidXTech — a remote-first, innovation-driven team building next-gen web, mobile, and AI solutions. Discover open roles, culture, and growth opportunities.",
  alternates: {
    canonical: "https://rapidnextech.com/careers",
  },
  openGraph: {
    title: "Careers at RapidXTech | Join Our Remote Software Team",
    description:
      "Discover how you can grow with RapidXTech — where technology meets impact.",
    url: "https://rapidnextech.com/careers",
    type: "website",
    images: [
      {
        url: "https://rapidnextech.com/og-careers.jpg",
        width: 1200,
        height: 630,
        alt: "RapidXTech Careers",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Careers at RapidXTech | Join Our Remote Software Team",
    description:
      "Be part of RapidXTech’s remote-first, high-performance engineering team.",
    images: ["https://rapidnextech.com/og-careers.jpg"],
  },
}

export default function CareersPage() {
  return (
    <main className="min-h-screen">
      {/* 🧭 Hero Section */}
      <FadeInSection className="container mx-auto px-6 py-24 md:py-32">
        <div className="grid md:grid-cols-2 gap-10 items-center min-h-[60vh] md:min-h-[70vh]">
          <div>
            <h1 className="text-4xl md:text-5xl font-semibold tracking-tight">
              Join the RapidXTech Team
            </h1>
            <p className="mt-4 text-muted-foreground text-lg">
              We build technology that moves fast — and so do our people.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <a href="#open-roles" className="btn-primary">
                View Open Roles
              </a>
              <a href="mailto:info@rapidnextech.com" className="btn-outline">
                Send Your CV
              </a>
            </div>
          </div>
          <div className="relative">
            <AnimatedSVG
              src="/careers-hero-hiring.svg"
              alt="Hiring illustration"
            />
          </div>
        </div>
      </FadeInSection>

      {/* 🌟 Why Work With Us */}
      <FeaturesGrid />

      {/* 🚀 Career Pathways */}
      <CareerPathways />

      {/* 🧭 Hiring Process */}
      <HiringProcess />

      {/* 💼 Open Roles */}
      <OpenRoles />

      {/* 🌍 Life at RapidXTech */}
      <LifeSection />

      {/* ✉️ Final Call-To-Action */}
      <FinalCTA />
    </main>
  )
}
