import type { Metadata } from "next"
import Link from "next/link"

export const metadata: Metadata = {
  title: "Terms of Service — Legal Agreement",
  description:
    "RapidNexTech's terms of service. Read our legal agreement covering the use of our website and software development services.",
  alternates: { canonical: "https://rapidnextech.com/terms" },
  openGraph: {
    title: "Terms of Service — RapidNexTech",
    description:
      "Read our legal agreement covering the use of our website and software development services.",
    url: "https://rapidnextech.com/terms",
    type: "website",
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "RapidNexTech Terms of Service" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Terms of Service — RapidNexTech",
    description:
      "Read our legal agreement covering the use of our website and software development services.",
    images: ["/og-image.png"],
  },
}

export default function TermsPage() {
  return (
    <main className="min-h-screen bg-background">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-20 md:py-28">
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            Terms of Service
          </h1>
          <p className="text-muted-foreground">
            Last Updated: <span className="font-semibold">March 6, 2026</span>
          </p>
        </div>

        {/* Content */}
        <div className="prose prose-slate dark:prose-invert max-w-none">
          <section className="mb-8">
            <h2 className="text-2xl font-bold text-foreground mb-4">1. Agreement to Terms</h2>
            <p className="text-foreground/80 leading-relaxed mb-4">
              By accessing or using the RapidNexTech website (&quot;Site&quot;) or services (&quot;Services&quot;), 
              you agree to be bound by these Terms of Service (&quot;Terms&quot;). If you do not agree to these Terms, 
              you may not access or use our Site or Services.
            </p>
            <p className="text-foreground/80 leading-relaxed">
              These Terms constitute a legally binding agreement between you and RapidNexTech (&quot;we,&quot; 
              &quot;our,&quot; or &quot;us&quot;).
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-foreground mb-4">2. Description of Services</h2>
            <p className="text-foreground/80 leading-relaxed mb-4">
              RapidNexTech provides custom software development services, including but not limited to:
            </p>
            <ul className="list-disc pl-6 text-foreground/80 mb-4 space-y-2">
              <li>Web application development (SaaS, CRM, ERP, etc.)</li>
              <li>Mobile app development (iOS, Android, React Native)</li>
              <li>AI automation and integration services</li>
              <li>Cloud infrastructure setup and management</li>
              <li>Custom software solutions for businesses</li>
            </ul>
            <p className="text-foreground/80 leading-relaxed">
              The specific scope, deliverables, timelines, and pricing for each project will be outlined in a 
              separate Statement of Work (SOW) or Service Agreement.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-foreground mb-4">3. Use of the Site</h2>
            
            <h3 className="text-xl font-semibold text-foreground mb-3 mt-6">3.1 Permitted Use</h3>
            <p className="text-foreground/80 leading-relaxed mb-4">
              You may use our Site for lawful purposes only. You agree not to use the Site:
            </p>
            <ul className="list-disc pl-6 text-foreground/80 mb-4 space-y-2">
              <li>In any way that violates applicable laws or regulations</li>
              <li>To transmit harmful code, viruses, or malicious software</li>
              <li>To engage in unauthorized data scraping or automated access</li>
              <li>To impersonate any person or entity</li>
              <li>To interfere with or disrupt the Site or servers</li>
            </ul>

            <h3 className="text-xl font-semibold text-foreground mb-3 mt-6">3.2 Account Security</h3>
            <p className="text-foreground/80 leading-relaxed mb-4">
              If you create an account or access any client portal, you are responsible for maintaining the 
              confidentiality of your login credentials and for all activities that occur under your account.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-foreground mb-4">4. Service Agreements and Payments</h2>
            
            <h3 className="text-xl font-semibold text-foreground mb-3 mt-6">4.1 Project Engagement</h3>
            <p className="text-foreground/80 leading-relaxed mb-4">
              All software development projects require a signed Service Agreement or Statement of Work that outlines:
            </p>
            <ul className="list-disc pl-6 text-foreground/80 mb-4 space-y-2">
              <li>Project scope and deliverables</li>
              <li>Timeline and milestones</li>
              <li>Pricing and payment terms</li>
              <li>Intellectual property rights</li>
              <li>Confidentiality and data handling</li>
            </ul>

            <h3 className="text-xl font-semibold text-foreground mb-3 mt-6">4.2 Payment Terms</h3>
            <p className="text-foreground/80 leading-relaxed mb-4">
              Unless otherwise specified in the Service Agreement:
            </p>
            <ul className="list-disc pl-6 text-foreground/80 mb-4 space-y-2">
              <li>Setup fees are due upfront before project commencement</li>
              <li>Monthly fees are due on the 1st of each month</li>
              <li>Milestone-based payments are due within 7 days of invoice</li>
              <li>Late payments may incur a 1.5% monthly interest charge</li>
              <li>All fees are non-refundable unless otherwise stated</li>
            </ul>

            <h3 className="text-xl font-semibold text-foreground mb-3 mt-6">4.3 Cancellation and Refunds</h3>
            <p className="text-foreground/80 leading-relaxed mb-4">
              Cancellation policies vary by service type and will be specified in your Service Agreement. Generally:
            </p>
            <ul className="list-disc pl-6 text-foreground/80 mb-4 space-y-2">
              <li>Setup fees are non-refundable once work has commenced</li>
              <li>Monthly subscriptions can be cancelled with 30 days notice</li>
              <li>Custom development fees are non-refundable for completed milestones</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-foreground mb-4">5. Intellectual Property Rights</h2>
            
            <h3 className="text-xl font-semibold text-foreground mb-3 mt-6">5.1 Ownership of Deliverables</h3>
            <p className="text-foreground/80 leading-relaxed mb-4">
              Upon full payment, you will own the custom code and deliverables created specifically for your project, 
              as outlined in your Service Agreement. However, RapidNexTech retains ownership of:
            </p>
            <ul className="list-disc pl-6 text-foreground/80 mb-4 space-y-2">
              <li>Pre-existing code, frameworks, and libraries</li>
              <li>Generalized tools, templates, and methodologies</li>
              <li>Our proprietary processes and know-how</li>
            </ul>

            <h3 className="text-xl font-semibold text-foreground mb-3 mt-6">5.2 Site Content</h3>
            <p className="text-foreground/80 leading-relaxed mb-4">
              All content on this Site, including text, graphics, logos, images, code, and design, is the property 
              of RapidNexTech and protected by copyright and trademark laws. You may not copy, reproduce, distribute, 
              or create derivative works without our written permission.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-foreground mb-4">6. Confidentiality</h2>
            <p className="text-foreground/80 leading-relaxed mb-4">
              Both parties agree to keep confidential any proprietary or sensitive information shared during the 
              course of the engagement. This includes but is not limited to:
            </p>
            <ul className="list-disc pl-6 text-foreground/80 mb-4 space-y-2">
              <li>Business strategies, financial data, and trade secrets</li>
              <li>Technical specifications and source code</li>
              <li>Customer data and user information</li>
            </ul>
            <p className="text-foreground/80 leading-relaxed">
              Confidentiality obligations survive the termination of any Service Agreement.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-foreground mb-4">7. Warranties and Disclaimers</h2>
            
            <h3 className="text-xl font-semibold text-foreground mb-3 mt-6">7.1 Service Warranty</h3>
            <p className="text-foreground/80 leading-relaxed mb-4">
              We warrant that our Services will be performed in a professional and workmanlike manner consistent with 
              industry standards. Any warranty claims must be reported within 30 days of delivery.
            </p>

            <h3 className="text-xl font-semibold text-foreground mb-3 mt-6">7.2 Site Disclaimer</h3>
            <p className="text-foreground/80 leading-relaxed mb-4">
              THE SITE AND ALL CONTENT ARE PROVIDED &quot;AS IS&quot; AND &quot;AS AVAILABLE&quot; WITHOUT WARRANTIES 
              OF ANY KIND, EITHER EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO WARRANTIES OF MERCHANTABILITY, 
              FITNESS FOR A PARTICULAR PURPOSE, OR NON-INFRINGEMENT.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-foreground mb-4">8. Limitation of Liability</h2>
            <p className="text-foreground/80 leading-relaxed mb-4">
              TO THE MAXIMUM EXTENT PERMITTED BY LAW, RAPIDNEXTECH SHALL NOT BE LIABLE FOR:
            </p>
            <ul className="list-disc pl-6 text-foreground/80 mb-4 space-y-2">
              <li>Indirect, incidental, special, consequential, or punitive damages</li>
              <li>Loss of profits, revenue, data, or business opportunities</li>
              <li>Service interruptions or delays caused by third-party providers</li>
            </ul>
            <p className="text-foreground/80 leading-relaxed mb-4">
              OUR TOTAL LIABILITY FOR ANY CLAIMS ARISING FROM OUR SERVICES SHALL NOT EXCEED THE AMOUNT PAID BY YOU 
              FOR THE SPECIFIC SERVICE GIVING RISE TO THE CLAIM IN THE 12 MONTHS PRECEDING THE CLAIM.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-foreground mb-4">9. Indemnification</h2>
            <p className="text-foreground/80 leading-relaxed mb-4">
              You agree to indemnify and hold harmless RapidNexTech and its affiliates, officers, employees, and 
              agents from any claims, damages, losses, liabilities, and expenses (including legal fees) arising from:
            </p>
            <ul className="list-disc pl-6 text-foreground/80 mb-4 space-y-2">
              <li>Your use of our Site or Services</li>
              <li>Your violation of these Terms</li>
              <li>Your infringement of any third-party rights</li>
              <li>Content or data you provide to us</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-foreground mb-4">10. Third-Party Services</h2>
            <p className="text-foreground/80 leading-relaxed mb-4">
              Our Services may integrate with or rely on third-party platforms (e.g., cloud hosting, payment 
              processors, APIs). We are not responsible for the availability, performance, or policies of these 
              third-party services.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-foreground mb-4">11. Dispute Resolution</h2>
            
            <h3 className="text-xl font-semibold text-foreground mb-3 mt-6">11.1 Governing Law</h3>
            <p className="text-foreground/80 leading-relaxed mb-4">
              These Terms shall be governed by and construed in accordance with the laws of Pakistan, without regard 
              to conflict of law principles.
            </p>

            <h3 className="text-xl font-semibold text-foreground mb-3 mt-6">11.2 Arbitration</h3>
            <p className="text-foreground/80 leading-relaxed mb-4">
              Any disputes arising from these Terms or our Services shall first be resolved through good-faith 
              negotiation. If unresolved within 30 days, disputes may be submitted to binding arbitration or resolved 
              in the courts of Pakistan.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-foreground mb-4">12. Modifications to Terms</h2>
            <p className="text-foreground/80 leading-relaxed mb-4">
              We reserve the right to modify these Terms at any time. We will notify you of material changes by 
              posting the updated Terms on this page and updating the &quot;Last Updated&quot; date. Your continued 
              use of the Site or Services after changes constitutes acceptance of the modified Terms.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-foreground mb-4">13. Severability</h2>
            <p className="text-foreground/80 leading-relaxed mb-4">
              If any provision of these Terms is found to be invalid or unenforceable, the remaining provisions shall 
              remain in full force and effect.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-foreground mb-4">14. Contact Information</h2>
            <p className="text-foreground/80 leading-relaxed mb-4">
              If you have questions about these Terms, please contact us:
            </p>
            <div className="bg-muted/50 border border-border rounded-lg p-6">
              <p className="text-foreground font-semibold mb-2">RapidNexTech</p>
              <p className="text-foreground/80">
                Email:{" "}
                <a href="mailto:legal@rapidnextech.com" className="text-primary hover:underline">
                  legal@rapidnextech.com
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

        {/* Footer Links */}
        <div className="mt-12 pt-8 border-t border-border flex flex-wrap gap-6">
          <Link
            href="/"
            className="inline-flex items-center text-primary hover:underline font-medium"
          >
            ← Back to Home
          </Link>
          <Link
            href="/privacy"
            className="inline-flex items-center text-primary hover:underline font-medium"
          >
            Privacy Policy
          </Link>
        </div>
      </div>
    </main>
  )
}
