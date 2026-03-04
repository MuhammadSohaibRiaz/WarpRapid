"use client"

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

const faqs = [
  {
    question: "Do I need WhatsApp API?",
    answer:
      "Yes. The system uses the official WhatsApp Business Cloud API, which requires a verified Meta Business account. We handle the full setup, including business verification, API provisioning, and template approval. If you already have WhatsApp Business API access, we integrate directly with your existing setup.",
  },
  {
    question: "Can this integrate with my existing website?",
    answer:
      "Absolutely. The system is designed to work alongside your current website or as a replacement. We can embed booking widgets, WhatsApp entry points, and conversion-optimized CTAs into any existing site. If you need a new site, we build one as part of the solution — fully integrated from day one.",
  },
  {
    question: "Is this compliant with data privacy regulations?",
    answer:
      "Yes. The system is built with data privacy at its core. All patient data is encrypted at rest and in transit. We support GDPR, HIPAA-aligned, and local data protection compliance requirements. Consent management is built into the conversation flow, and data retention policies are configurable per your regulatory needs.",
  },
  {
    question: "Can it handle multiple staff members?",
    answer:
      "Yes. The system supports multi-staff routing, role-based access, and provider-specific scheduling. Appointments can be assigned to specific practitioners based on treatment type, availability, or patient preference. The admin dashboard provides per-staff performance analytics.",
  },
  {
    question: "Can we scale this later?",
    answer:
      "The architecture is built for scale. Whether you are a single-location clinic or a multi-branch operation, the system supports adding new locations, staff, treatments, and automation rules without re-engineering. API-first design means integration with EHR systems, payment processors, and other tools is straightforward.",
  },
]

export function FAQSection() {
  return (
    <section className="py-20 md:py-28 bg-muted/30">
      <div className="max-w-3xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-14">
          <p className="text-sm font-semibold uppercase tracking-wider text-muted-foreground mb-4">
            FAQ
          </p>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground tracking-tight leading-tight mb-4">
            Common Questions
          </h2>
          <p className="text-lg text-muted-foreground">
            Technical and operational details you should know before getting
            started.
          </p>
        </div>

        <Accordion type="single" collapsible className="w-full">
          {faqs.map((faq, index) => (
            <AccordionItem
              key={index}
              value={`item-${index}`}
              className="border-border"
            >
              <AccordionTrigger className="text-left text-base font-semibold text-foreground hover:no-underline py-5">
                {faq.question}
              </AccordionTrigger>
              <AccordionContent className="text-sm text-muted-foreground leading-relaxed pb-5">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  )
}
