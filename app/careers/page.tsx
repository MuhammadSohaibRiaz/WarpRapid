import FadeInSection from "@/components/careers/FadeInSection"
import FeaturesGrid from "@/components/careers/FeaturesGrid"
import CareerPathways from "@/components/careers/CareerPathways"
import HiringProcess from "@/components/careers/HiringProcess"
import OpenRoles from "@/components/careers/OpenRoles"
import LifeSection from "@/components/careers/LifeSection"
import FinalCTA from "@/components/careers/FinalCTA"
import SectionHeader from "@/components/careers/SectionHeader"
import AnimatedSVG from "@/components/careers/AnimatedSVG"
import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Careers at RapidXTech | Join Our Remote Software Team",
  description:
    "Join RapidXTech — a remote-first, innovation-driven team building next-gen web, mobile, and AI solutions. Discover open roles, culture, and growth opportunities.",
  openGraph: {
    title: "Careers at RapidXTech | Join Our Remote Software Team",
    description:
      "Discover how you can grow with RapidXTech — where technology meets impact.",
    url: "https://rapidxtech.com/careers",
    type: "website",
  },
  alternates: { canonical: "https://rapidxtech.com/careers" },
}

export default function CareersPage() {
 

  return (
    <main className="min-h-screen">

      {/* Rest of your page */}
      <FadeInSection className="container mx-auto px-6 py-24 md:py-32">
        <div className="grid md:grid-cols-2 gap-10 items-center min-h-[60vh]">
          <div>
            <h1 className="text-4xl md:text-5xl font-semibold">
              Join the RapidXTech Team
            </h1>
            <p className="mt-4 text-muted-foreground text-lg">
              We build technology that moves fast — and so do our people.
            </p>
          </div>
          <AnimatedSVG src="/careers-hero-hiring.svg" alt="Hiring" />
        </div>
      </FadeInSection>

      <FeaturesGrid />
      <CareerPathways />
      <HiringProcess />
      <OpenRoles />
      <LifeSection />
      <FinalCTA />
    </main>
  )
}