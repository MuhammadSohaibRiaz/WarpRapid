import type { Metadata } from "next"
import BlogClient from "./BlogClient"
import Script from "next/script"

export const metadata: Metadata = {
    title: "Insights & Articles | RapidNexTech Blog",
    description:
        "Explore the latest insights on software development, AI, Next.js, and digital transformation. Stay ahead with RapidNexTech's tech articles.",
    alternates: { canonical: "https://rapidnextech.com/blog" },
    openGraph: {
        title: "RapidNexTech Insights",
        description:
            "Expert articles on web development, mobile apps, and enterprise software.",
        url: "https://rapidnextech.com/blog",
        type: "website",
    },
}

export default function BlogPage() {
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

    return (
        <>
            <BlogClient />
            <Script
                id="blog-jsonld"
                type="application/ld+json"
                strategy="afterInteractive"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />
        </>
    )
}
