import type { Metadata } from "next"
import Script from "next/script"
import AboutClient from "@/components/about/AboutClient"

export const metadata: Metadata = {
  title: "About RapidXTech | Innovative Software Development Company",
  description:
    "RapidXTech is a modern software company specializing in web, mobile, and AI-driven solutions. Learn about our mission, process, and values that drive innovation and performance.",
  alternates: { canonical: "https://rapidnextech.com/about" },
  openGraph: {
    title: "About RapidXTech",
    description:
      "We build high‑performance apps and platforms using modern frameworks and clean, scalable code.",
    url: "https://rapidnextech.com/about",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "About RapidXTech",
    description:
      "We build high‑performance apps and platforms using modern frameworks and clean, scalable code.",
  },
}

export default function AboutPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: "About RapidXTech",
    url: "https://rapidnextech.com/about",
    description:
      "RapidXTech is a modern software company specializing in web, mobile, and AI-driven solutions. Learn about our mission, process, and values that drive innovation and performance.",
  }
  return (
    <>
      <AboutClient />
      <Script id="about-jsonld" type="application/ld+json" strategy="afterInteractive"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
    </>
  )
}
