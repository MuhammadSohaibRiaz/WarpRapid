import type { Metadata } from "next"
import ContactClient from "./ContactClient"
import Script from "next/script"

export const metadata: Metadata = {
    title: "Contact Us | RapidNexTech",
    description:
        "Get in touch with RapidNexTech for your next software project. We respond within 24 hours. Email, WhatsApp, or visit our office in Sheikhupura.",
    alternates: { canonical: "https://rapidnextech.com/contact" },
    openGraph: {
        title: "Contact RapidNexTech",
        description:
            "Ready to start your project? Contact our team for a free consultation.",
        url: "https://rapidnextech.com/contact",
        type: "website",
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
