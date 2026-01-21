import type React from "react"
import "./globals.css"
import type { Metadata } from "next"
import { Inter, Space_Grotesk } from "next/font/google"
import Header from "@/components/Header"
import { Footer } from "@/components/Footer"
import ProgressBar from "./components/ProgressBar"
import { ThemeProvider } from "../components/theme-provider"
import { ThemeContextProvider } from "@/context/theme-context"
import { AuthProvider } from "@/context/auth-context"
import Script from "next/script"
import { Suspense } from "react"

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  preload: true,
})

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space",
  display: "swap",
})

// Enhanced SEO metadata
export const metadata: Metadata = {
  metadataBase: new URL("https://rapidnextech.com"),
  title: {
    default: "RapidNexTech - Innovative Software Development Company",
    template: "%s | RapidNexTech",
  },
  description:
    "RapidNexTech delivers cutting-edge software solutions in web development, mobile apps, and enterprise systems. Transform your business with our expert development team.",
  keywords: [
    "software development",
    "web development",
    "mobile app development",
    "UI/UX design",
    "enterprise solutions",
    "custom software",
    "React development",
    "Node.js development",
    "full-stack development",
    "digital transformation",
    "startup solutions",
    "e-commerce development",
    "API development",
    "cloud solutions",
    "DevOps services",
  ],
  authors: [{ name: "RapidNexTech Team", url: "https://rapidnextech.com" }],
  creator: "RapidNexTech",
  publisher: "RapidNexTech",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://rapidnextech.com",
    siteName: "RapidNexTech",
    title: "RapidNexTech - Innovative Software Development Company",
    description:
      "Transform your business with cutting-edge software solutions. Expert web development, mobile apps, and enterprise systems.",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "RapidNexTech - Software Development Company",
        type: "image/jpeg",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "RapidNexTech - Innovative Software Development Company",
    description:
      "Transform your business with cutting-edge software solutions. Expert web development, mobile apps, and enterprise systems.",
    images: ["/og-image.jpg"],
    creator: "@RapidNexTech",
    site: "@RapidNexTech",
  },
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: "verification_token",
    yandex: "verification_token",
    yahoo: "verification_token",
    other: {
      me: ["mailto:contact@rapidnextech.com"],
    },
  },
  alternates: {
    canonical: "https://rapidnextech.com",
    languages: {
      "en-US": "https://rapidnextech.com",
    },
  },
  category: "technology",
  generator: 'v0.app'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning className="light-mode" data-theme-color="blue">
      <head>
        {/* Preload critical resources */}
        <link rel="preload" href="/grid.svg" as="image" type="image/svg+xml" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />

        {/* DNS prefetch for external resources */}
        <link rel="dns-prefetch" href="//fonts.googleapis.com" />
        <link rel="dns-prefetch" href="//fonts.gstatic.com" />

        {/* Favicon and app icons */}
        <link rel="icon" href="/favicon.ico?v=2" sizes="any" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png?v=2" />
        <link rel="manifest" href="/manifest.json?v=2" />

        {/* Theme and viewport */}
        <meta name="theme-color" content="#1e3a8a" media="(prefers-color-scheme: light)" />
        <meta name="theme-color" content="#1e40af" media="(prefers-color-scheme: dark)" />
        <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover" />

        {/* Performance hints */}
        <meta httpEquiv="x-dns-prefetch-control" content="on" />
      </head>
      <body className={`${inter.className} ${spaceGrotesk.variable} theme-transition antialiased`}>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
          <ThemeContextProvider>
            <AuthProvider>
              <div className="flex flex-col min-h-screen relative overflow-hidden theme-bg theme-transition">
                <Suspense fallback={null}>
                  <ProgressBar />
                </Suspense>
                <Header />
                <div aria-hidden className="h-12 md:h-16" />
                <main className="flex-grow z-10" role="main">
                  {children}
                </main>
                <Footer />
              </div>
            </AuthProvider>
          </ThemeContextProvider>
        </ThemeProvider>

        {/* Enhanced structured data */}
        <Script
          id="organization-schema"
          type="application/ld+json"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              "@id": "https://rapidnextech.com/#organization",
              name: "RapidNexTech",
              url: "https://rapidnextech.com",
              logo: {
                "@type": "ImageObject",
                url: "https://rapidnextech.com/logo.png",
                width: 200,
                height: 60,
              },
              description:
                "Innovative software development company specializing in web development, mobile apps, and enterprise solutions.",
              foundingDate: "2020",
              address: {
                "@type": "PostalAddress",
                addressCountry: "US",
              },
              contactPoint: {
                "@type": "ContactPoint",
                telephone: "+1-234-567-8900",
                contactType: "customer service",
                availableLanguage: ["English"],
                areaServed: "Worldwide",
              },
              sameAs: [
                "https://twitter.com/RapidNexTech",
                "https://facebook.com/RapidNexTech",
                "https://github.com/RapidNexTech",
                "https://linkedin.com/company/RapidNexTech",
              ],
              serviceType: [
                "Software Development",
                "Web Development",
                "Mobile App Development",
                "UI/UX Design",
                "Enterprise Solutions",
              ],
            }),
          }}
        />

        {/* Website schema */}
        <Script
          id="website-schema"
          type="application/ld+json"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebSite",
              "@id": "https://rapidnextech.com/#website",
              url: "https://rapidnextech.com",
              name: "RapidNexTech",
              description: "Innovative software development company",
              publisher: {
                "@id": "https://rapidnextech.com/#organization",
              },
              potentialAction: {
                "@type": "SearchAction",
                target: {
                  "@type": "EntryPoint",
                  urlTemplate: "https://rapidnextech.com/search?q={search_term_string}",
                },
                "query-input": "required name=search_term_string",
              },
            }),
          }}
        />

        {/* Performance monitoring */}
        <Script
          id="performance-observer"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              if ('PerformanceObserver' in window) {
                const observer = new PerformanceObserver((list) => {
                  for (const entry of list.getEntries()) {
                    if (entry.entryType === 'largest-contentful-paint') {
                      console.log('LCP:', entry.startTime);
                    }
                    if (entry.entryType === 'first-input') {
                      console.log('FID:', entry.processingStart - entry.startTime);
                    }
                    if (entry.entryType === 'layout-shift') {
                      if (!entry.hadRecentInput) {
                        console.log('CLS:', entry.value);
                      }
                    }
                  }
                });
                observer.observe({entryTypes: ['largest-contentful-paint', 'first-input', 'layout-shift']});
              }
            `,
          }}
        />
      </body>
    </html>
  )
}
