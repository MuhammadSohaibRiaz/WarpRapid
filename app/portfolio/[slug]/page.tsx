import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { PortfolioCMS } from "@/lib/supabase-cms"
import ProjectDetailClient from "./ProjectDetailClient"
import Script from "next/script"

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const project = await PortfolioCMS.getProjectBySlug(params.slug)
  if (!project) return { title: "Case Study | RapidXTech" }
  const title = `${project.title} Case Study | RapidXTech`
  const description = project.long_description || project.description || "Software case study by RapidXTech"
  const url = `https://rapidxtech.com/portfolio/${params.slug}`
  const image = project.images?.[0]?.url || "https://rapidxtech.com/og-image.jpg"
  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: "article",
      url,
      images: [{ url: image }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [image],
    },
    alternates: { canonical: url },
  }
}

export default async function ProjectDetailPage({ params }: { params: { slug: string } }) {
  const data = await PortfolioCMS.getProjectBySlug(params.slug)
  if (!data) return notFound()
  const url = `https://rapidxtech.com/portfolio/${params.slug}`
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CaseStudy",
    name: `${data.title} Case Study`,
    description: data.long_description || data.description,
    url,
    author: { "@type": "Organization", name: "RapidXTech" },
    publisher: {
      "@type": "Organization",
      name: "RapidXTech",
      logo: { "@type": "ImageObject", url: "https://rapidxtech.com/logo.png" },
    },
  }
  return (
    <>
      <ProjectDetailClient project={data} />
      <Script id="case-study-jsonld" type="application/ld+json" strategy="afterInteractive"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
    </>
  )
}
