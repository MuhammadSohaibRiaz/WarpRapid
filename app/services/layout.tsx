import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Services — Web Apps, Mobile, AI & Cloud",
  description:
    "Full-stack software development services: custom web apps, mobile apps, AI automation, SaaS platforms, and cloud infrastructure by RapidNexTech.",
  alternates: { canonical: "https://rapidnextech.com/services" },
  openGraph: {
    title: "Services — Web Apps, Mobile, AI & Cloud | RapidNexTech",
    description:
      "Custom web apps, mobile apps, AI automation, SaaS platforms, and cloud infrastructure. See what RapidNexTech can build for you.",
    url: "https://rapidnextech.com/services",
    type: "website",
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "RapidNexTech Services" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Services — Web Apps, Mobile, AI & Cloud | RapidNexTech",
    description:
      "Custom web apps, mobile apps, AI automation, SaaS platforms, and cloud infrastructure. See what RapidNexTech can build for you.",
    images: ["/og-image.png"],
  },
}

export default function ServicesLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
