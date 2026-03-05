import type { Metadata } from "next"
import Script from "next/script"
import BlogClient from "./BlogClient"
import { BlogCMS } from "@/lib/supabase-cms"

export const metadata: Metadata = {
  title: "Insights & Articles — Software, AI & SaaS",
  description:
    "Expert articles on custom software development, AI automation, SaaS architecture, and digital transformation. Stay ahead with RapidNexTech's engineering blog.",
  alternates: { canonical: "https://rapidnextech.com/blog" },
  openGraph: {
    title: "RapidNexTech Insights — Software, AI & SaaS Articles",
    description:
      "Expert articles on custom software development, AI automation, and modern engineering practices.",
    url: "https://rapidnextech.com/blog",
    type: "website",
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "RapidNexTech Blog" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "RapidNexTech Insights — Software, AI & SaaS Articles",
    description:
      "Expert articles on custom software development, AI automation, and modern engineering practices.",
    images: ["/og-image.png"],
  },
}

export default async function BlogPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Blog",
    name: "RapidNexTech Insights",
    url: "https://rapidnextech.com/blog",
    description:
      "Explore the latest insights on software development, AI, Next.js, and digital transformation.",
    publisher: {
      "@type": "Organization",
      name: "RapidNexTech",
      logo: {
        "@type": "ImageObject",
        url: "https://rapidnextech.com/logo.png",
      },
    },
  }

  // Server-side fetch so the blog index is prerendered with content,
  // avoiding an extra Supabase round trip in the browser.
  const posts = await BlogCMS.getPublishedBlogPosts()

  return (
    <>
      <BlogClient initialPosts={posts} />
      <Script
        id="blog-jsonld"
        type="application/ld+json"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
    </>
  )
}
