import type { Metadata } from "next"
import Link from "next/link"

export const metadata: Metadata = {
  title: "Privacy Policy — How We Handle Your Data",
  description:
    "RapidNexTech's privacy policy. Learn how we collect, use, and protect your personal information when you use our services.",
  alternates: { canonical: "https://rapidnextech.com/privacy" },
  openGraph: {
    title: "Privacy Policy — RapidNexTech",
    description:
      "Learn how we collect, use, and protect your personal information when you use our services.",
    url: "https://rapidnextech.com/privacy",
    type: "website",
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "RapidNexTech Privacy Policy" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Privacy Policy — RapidNexTech",
    description:
      "Learn how we collect, use, and protect your personal information when you use our services.",
    images: ["/og-image.png"],
  },
}

export default function PrivacyPage() {
  return (
    <main className="min-h-screen bg-background">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-20 md:py-28">
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            Privacy Policy
          </h1>
          <p className="text-muted-foreground">
            Last Updated: <span className="font-semibold">March 6, 2026</span>
          </p>
        </div>

        {/* Content */}
        <div className="prose prose-slate dark:prose-invert max-w-none">
          <section className="mb-8">
            <h2 className="text-2xl font-bold text-foreground mb-4">1. Introduction</h2>
            <p className="text-foreground/80 leading-relaxed mb-4">
              RapidNexTech (&quot;we,&quot; &quot;our,&quot; or &quot;us&quot;) is committed to protecting your privacy. 
              This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you 
              visit our website <Link href="/" className="text-primary hover:underline">rapidnextech.com</Link> or 
              use our services.
            </p>
            <p className="text-foreground/80 leading-relaxed">
              By accessing or using our services, you agree to this Privacy Policy. If you do not agree with the 
              terms, please do not access the site or use our services.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-foreground mb-4">2. Information We Collect</h2>
            
            <h3 className="text-xl font-semibold text-foreground mb-3 mt-6">2.1 Personal Information</h3>
            <p className="text-foreground/80 leading-relaxed mb-3">
              We may collect personally identifiable information that you voluntarily provide to us when you:
            </p>
            <ul className="list-disc pl-6 text-foreground/80 mb-4 space-y-2">
              <li>Fill out contact forms or request quotes</li>
              <li>Subscribe to newsletters or updates</li>
              <li>Apply for job positions</li>
              <li>Communicate with us via email, WhatsApp, or other channels</li>
            </ul>
            <p className="text-foreground/80 leading-relaxed mb-4">
              This may include: name, email address, phone number, company name, job title, and any other 
              information you choose to provide.
            </p>

            <h3 className="text-xl font-semibold text-foreground mb-3 mt-6">2.2 Automatically Collected Information</h3>
            <p className="text-foreground/80 leading-relaxed mb-3">
              When you visit our website, we may automatically collect certain information, including:
            </p>
            <ul className="list-disc pl-6 text-foreground/80 mb-4 space-y-2">
              <li>IP address and browser type</li>
              <li>Device information and operating system</li>
              <li>Referring URLs and pages visited</li>
              <li>Date and time of visits</li>
              <li>Cookies and similar tracking technologies</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-foreground mb-4">3. How We Use Your Information</h2>
            <p className="text-foreground/80 leading-relaxed mb-3">
              We use the information we collect to:
            </p>
            <ul className="list-disc pl-6 text-foreground/80 mb-4 space-y-2">
              <li>Respond to your inquiries and provide customer support</li>
              <li>Process service requests and deliver our software solutions</li>
              <li>Send administrative information, updates, and marketing communications</li>
              <li>Improve our website, services, and user experience</li>
              <li>Analyze usage patterns and site performance</li>
              <li>Prevent fraud and enhance security</li>
              <li>Comply with legal obligations</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-foreground mb-4">4. Information Sharing and Disclosure</h2>
            <p className="text-foreground/80 leading-relaxed mb-4">
              We do not sell, trade, or rent your personal information to third parties. We may share your 
              information only in the following circumstances:
            </p>
            <ul className="list-disc pl-6 text-foreground/80 mb-4 space-y-2">
              <li><strong>Service Providers:</strong> With trusted third-party service providers who assist us in 
              operating our website, conducting business, or servicing you (e.g., hosting providers, email services, 
              analytics tools)</li>
              <li><strong>Legal Requirements:</strong> When required by law, subpoena, or other legal process</li>
              <li><strong>Business Transfers:</strong> In connection with a merger, acquisition, or sale of assets</li>
              <li><strong>With Your Consent:</strong> When you explicitly agree to share information</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-foreground mb-4">5. Cookies and Tracking Technologies</h2>
            <p className="text-foreground/80 leading-relaxed mb-4">
              We use cookies and similar tracking technologies to enhance your browsing experience, analyze site 
              traffic, and understand user behavior. You can control cookie preferences through your browser settings, 
              though disabling cookies may limit certain website functionality.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-foreground mb-4">6. Data Security</h2>
            <p className="text-foreground/80 leading-relaxed mb-4">
              We implement appropriate technical and organizational security measures to protect your personal 
              information from unauthorized access, disclosure, alteration, or destruction. However, no method of 
              transmission over the internet or electronic storage is 100% secure, and we cannot guarantee absolute 
              security.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-foreground mb-4">7. Your Rights and Choices</h2>
            <p className="text-foreground/80 leading-relaxed mb-3">
              Depending on your location, you may have the following rights regarding your personal information:
            </p>
            <ul className="list-disc pl-6 text-foreground/80 mb-4 space-y-2">
              <li><strong>Access:</strong> Request access to the personal information we hold about you</li>
              <li><strong>Correction:</strong> Request correction of inaccurate or incomplete information</li>
              <li><strong>Deletion:</strong> Request deletion of your personal information</li>
              <li><strong>Opt-Out:</strong> Unsubscribe from marketing communications at any time</li>
              <li><strong>Data Portability:</strong> Request a copy of your data in a portable format</li>
            </ul>
            <p className="text-foreground/80 leading-relaxed">
              To exercise any of these rights, please contact us at{" "}
              <a href="mailto:privacy@rapidnextech.com" className="text-primary hover:underline">
                privacy@rapidnextech.com
              </a>
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-foreground mb-4">8. Third-Party Links</h2>
            <p className="text-foreground/80 leading-relaxed mb-4">
              Our website may contain links to third-party websites. We are not responsible for the privacy practices 
              or content of these external sites. We encourage you to review the privacy policies of any third-party 
              sites you visit.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-foreground mb-4">9. Children&apos;s Privacy</h2>
            <p className="text-foreground/80 leading-relaxed mb-4">
              Our services are not intended for individuals under the age of 18. We do not knowingly collect personal 
              information from children. If we become aware that we have collected information from a child without 
              parental consent, we will take steps to delete that information.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-foreground mb-4">10. International Data Transfers</h2>
            <p className="text-foreground/80 leading-relaxed mb-4">
              Your information may be transferred to and processed in countries other than your country of residence. 
              These countries may have different data protection laws. By using our services, you consent to such 
              transfers.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-foreground mb-4">11. Changes to This Privacy Policy</h2>
            <p className="text-foreground/80 leading-relaxed mb-4">
              We may update this Privacy Policy from time to time. We will notify you of any changes by posting the 
              new policy on this page and updating the &quot;Last Updated&quot; date. We encourage you to review this 
              policy periodically.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-foreground mb-4">12. Contact Us</h2>
            <p className="text-foreground/80 leading-relaxed mb-4">
              If you have any questions or concerns about this Privacy Policy or our data practices, please contact us:
            </p>
            <div className="bg-muted/50 border border-border rounded-lg p-6">
              <p className="text-foreground font-semibold mb-2">RapidNexTech</p>
              <p className="text-foreground/80">
                Email:{" "}
                <a href="mailto:privacy@rapidnextech.com" className="text-primary hover:underline">
                  privacy@rapidnextech.com
                </a>
              </p>
              <p className="text-foreground/80">
                Website:{" "}
                <Link href="/contact" className="text-primary hover:underline">
                  rapidnextech.com/contact
                </Link>
              </p>
            </div>
          </section>
        </div>

        {/* Back to Home */}
        <div className="mt-12 pt-8 border-t border-border">
          <Link
            href="/"
            className="inline-flex items-center text-primary hover:underline font-medium"
          >
            ← Back to Home
          </Link>
        </div>
      </div>
    </main>
  )
}
