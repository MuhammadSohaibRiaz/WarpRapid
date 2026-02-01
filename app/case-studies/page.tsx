import type { Metadata } from "next"
import PortfolioClient from "./PortfolioClient"
import Script from "next/script"
import { PortfolioCMS } from "@/lib/supabase-cms"

export const metadata: Metadata = {
  title: "Software Case Studies | RapidNexTech Portfolio",
  description:
    "We build production-ready products and automation systems that remove operational drag and scale with your business. Explore our real-world software projects.",
  openGraph: {
    title: "Software Case Studies | RapidNexTech",
    description:
      "Explore real-world software projects built with Next.js, React Native, and AI automation. See how RapidNexTech delivers performance and innovation.",
    url: "https://rapidnextech.com/case-studies",
    siteName: "RapidNexTech",
    images: [
      {
        url: "https://rapidnextech.com/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "RapidNexTech Case Studies",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Software Case Studies | RapidNexTech",
    description:
      "Explore real-world software projects built with Next.js, React Native, and AI automation. See how RapidNexTech delivers performance and innovation.",
    images: ["https://rapidnextech.com/og-image.jpg"],
  },
  alternates: {
    canonical: "https://rapidnextech.com/case-studies",
  },
}

export default async function Portfolio() {
  const projects = await PortfolioCMS.getPublishedProjects()

  // ItemList Schema for better SEO
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    numberOfItems: projects.length,
    itemListElement: projects.map((project, index) => ({
      "@type": "ListItem",
      position: index + 1,
      item: {
        "@type": "CreativeWork",
        name: project.title,
        url: `https://rapidnextech.com/case-studies/${project.slug}`,
        image: project.images[0]?.url,
        description: project.description,
        about: project.category
      }
    }))
  }

  return (
    <>
      <PortfolioClient initialProjects={projects} />
      <Script id="case-studies-collection" type="application/ld+json" strategy="afterInteractive"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
    </>
  )
}
