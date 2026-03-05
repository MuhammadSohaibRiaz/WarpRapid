import type { Metadata } from "next"
import Script from "next/script"
import AboutClient from "@/components/about/AboutClient"

export const metadata: Metadata = {
  title: "About Us — Our Mission, Process & Team",
  description:
    "RapidNexTech is a remote-first software engineering team specializing in custom SaaS, AI automation, and scalable web & mobile apps. Learn how we work.",
  alternates: { canonical: "https://rapidnextech.com/about" },
  openGraph: {
    title: "About RapidNexTech — Engineering That Delivers",
    description:
      "A remote-first team building custom software, SaaS platforms, and AI-powered automation for businesses worldwide.",
    url: "https://rapidnextech.com/about",
    type: "website",
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "About RapidNexTech" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "About RapidNexTech — Engineering That Delivers",
    description:
      "A remote-first team building custom software, SaaS platforms, and AI-powered automation for businesses worldwide.",
    images: ["/og-image.png"],
  },
}

export default function AboutPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: "About RapidNexTech",
    url: "https://rapidnextech.com/about",
    description:
      "RapidNexTech is a modern software company specializing in web, mobile, and AI-driven solutions. Learn about our mission, process, and values that drive innovation and performance.",
  }
  return (
    <>
      <AboutClient />
      <Script id="about-jsonld" type="application/ld+json" strategy="afterInteractive"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
    </>
  )
}
