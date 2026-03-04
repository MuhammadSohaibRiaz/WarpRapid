import type { Metadata } from "next"
import { AestheticHero } from "@/components/solutions/aesthetic-clinics/hero-section"
import { ProblemSection } from "@/components/solutions/aesthetic-clinics/problem-section"
import { SolutionSection } from "@/components/solutions/aesthetic-clinics/solution-section"
import { HowItWorksSection } from "@/components/solutions/aesthetic-clinics/how-it-works-section"
import { FeatureDeepDiveSection } from "@/components/solutions/aesthetic-clinics/feature-deep-dive-section"
import { WhoItsForSection } from "@/components/solutions/aesthetic-clinics/who-its-for-section"
import { ROISection } from "@/components/solutions/aesthetic-clinics/roi-section"
import { PricingSection } from "@/components/solutions/aesthetic-clinics/pricing-section"
import { CTASection } from "@/components/solutions/aesthetic-clinics/cta-section"
import { FAQSection } from "@/components/solutions/aesthetic-clinics/faq-section"

export const metadata: Metadata = {
  title: "AI Appointment Automation for Aesthetic Clinics",
  description:
    "We build AI-powered WhatsApp booking systems for aesthetic clinics. Convert more inquiries into confirmed appointments automatically.",
  openGraph: {
    title: "AI Appointment Automation for Aesthetic Clinics | RapidNexTech",
    description:
      "We build AI-powered WhatsApp booking systems for aesthetic clinics. Convert more inquiries into confirmed appointments automatically.",
    type: "website",
    url: "https://rapidnextech.com/solutions/aesthetic-clinics",
  },
  twitter: {
    card: "summary_large_image",
    title: "AI Appointment Automation for Aesthetic Clinics | RapidNexTech",
    description:
      "We build AI-powered WhatsApp booking systems for aesthetic clinics. Convert more inquiries into confirmed appointments automatically.",
  },
  alternates: {
    canonical: "https://rapidnextech.com/solutions/aesthetic-clinics",
  },
}

export default function AestheticClinicsPage() {
  return (
    <main className="bg-background text-foreground">
      <AestheticHero />
      <ProblemSection />
      <SolutionSection />
      <HowItWorksSection />
      <FeatureDeepDiveSection />
      <WhoItsForSection />
      <ROISection />
      <PricingSection />
      <CTASection />
      <FAQSection />
    </main>
  )
}
