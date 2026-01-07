import type { Metadata } from "next"
import PortfolioClient from "./PortfolioClient"
import Script from "next/script"

export const metadata: Metadata = {
  title: "Software Case Studies | RapidXTech Portfolio",
  description:
    "Explore RapidXTech’s software case studies — real-world projects that showcase innovation, scalability, and measurable impact. Discover how we’ve helped startups and enterprises achieve digital transformation.",
  openGraph: {
    title: "Software Case Studies | RapidXTech",
    description:
      "Explore real-world software projects built with Next.js, React Native, and AI automation. See how RapidXTech delivers performance and innovation.",
url: "https://rapidnextech.com/case-studies",
    siteName: "RapidXTech",
    images: [
      {
        url: "https://rapidnextech.com/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "RapidXTech Case Studies",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Software Case Studies | RapidXTech",
    description:
      "Explore real-world software projects built with Next.js, React Native, and AI automation. See how RapidXTech delivers performance and innovation.",
    images: ["https://rapidnextech.com/og-image.jpg"],
  },
  alternates: {
canonical: "https://rapidnextech.com/case-studies",
  },
}

export default async function Portfolio() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "Software Case Studies | RapidXTech",
url: "https://rapidnextech.com/case-studies",
    description:
      "Explore RapidXTech’s software case studies — real-world projects that showcase innovation, scalability, and measurable impact.",
    about: { "@type": "Organization", name: "RapidXTech" },
  }
  return (
    <>
      <PortfolioClient />
      <Script id="case-studies-collection" type="application/ld+json" strategy="afterInteractive"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
    </>
  )
}
