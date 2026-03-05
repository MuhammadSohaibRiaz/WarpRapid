import type { Metadata } from "next"
import ContactClient from "./ContactClient"
import Script from "next/script"

export const metadata: Metadata = {
    title: "Contact Us — Start Your Project",
    description:
        "Get in touch with RapidNexTech for custom software, SaaS, or AI automation projects. We respond within 24 hours. Email, WhatsApp, or visit us in Sheikhupura.",
    alternates: { canonical: "https://rapidnextech.com/contact" },
    openGraph: {
        title: "Contact RapidNexTech — Let's Build Together",
        description:
            "Ready to start your project? Reach out for a free consultation on custom software, SaaS, or AI automation.",
        url: "https://rapidnextech.com/contact",
        type: "website",
        images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "Contact RapidNexTech" }],
    },
    twitter: {
        card: "summary_large_image",
        title: "Contact RapidNexTech — Let's Build Together",
        description:
            "Ready to start your project? Reach out for a free consultation on custom software, SaaS, or AI automation.",
        images: ["/og-image.png"],
    },
}

export default function ContactPage() {
    const jsonLd = {
        "@context": "https://schema.org",
        "@type": "ContactPage",
        name: "Contact RapidNexTech",
        url: "https://rapidnextech.com/contact",
        description: "Get in touch with RapidNexTech for your next software project.",
        mainEntity: {
            "@type": "Organization",
            name: "RapidNexTech",
            telephone: "+92 325 4848 523",
            email: "contact@rapidnextech.com",
            address: {
                "@type": "PostalAddress",
                streetAddress: "9C-C Y Block Main Market, Housing Colony",
                addressLocality: "Sheikhupura",
                addressRegion: "Punjab",
                addressCountry: "PK",
            },
        },
    }

    return (
        <>
            <ContactClient />
            <Script
                id="contact-jsonld"
                type="application/ld+json"
                strategy="afterInteractive"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />
        </>
    )
}
