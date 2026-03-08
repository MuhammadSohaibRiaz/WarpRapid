"use client"

import { useState } from "react"
import Link from "next/link"
import { ArrowRight, Check, Sparkles, Clock, Zap, Star, Info } from "lucide-react"
import { Button } from "@/components/ui/button"

/* ------------------------------------------------------------------ */
/*  Feature type: plain text OR text + hover tooltip                  */
/* ------------------------------------------------------------------ */
interface Feature {
  text: string
  tooltip?: string
}

function FeatureItem({
  feature,
  highlight,
}: {
  feature: Feature
  highlight: boolean
}) {
  const [showTip, setShowTip] = useState(false)

  return (
    <li className={`flex items-start gap-2.5 ${showTip ? "relative z-[60]" : ""}`}>
      <Check
        className={`w-4 h-4 mt-0.5 shrink-0 ${
          highlight ? "text-primary" : "text-muted-foreground"
        }`}
      />
      <span className="text-sm text-foreground/80 leading-relaxed inline-flex items-center gap-1.5 flex-wrap">
        {feature.text}
        {feature.tooltip && (
          <span
            className="relative inline-flex cursor-pointer"
            onMouseEnter={() => setShowTip(true)}
            onMouseLeave={() => setShowTip(false)}
            onClick={() => setShowTip((v) => !v)}
          >
            <Info className="w-3.5 h-3.5 text-muted-foreground hover:text-primary transition-colors" />
            {showTip && (
              <span className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-60 rounded-lg bg-popover border border-border px-3 py-2 text-xs text-popover-foreground shadow-2xl z-[100] leading-relaxed pointer-events-none">
                {feature.tooltip}
              </span>
            )}
          </span>
        )}
      </span>
    </li>
  )
}

/* ------------------------------------------------------------------ */
/*  Tier data                                                          */
/* ------------------------------------------------------------------ */
const tiers: {
  name: string
  tagline: string
  setupFee: string
  discountedSetupFee: string
  monthlyFee: string
  highlight: boolean
  badge?: string
  features: Feature[]
  cta: string
}[] = [
  {
    name: "Starter",
    tagline: "For single-practitioner clinics ready to stop losing DM leads",
    setupFee: "399",
    discountedSetupFee: "199",
    monthlyFee: "99",
    highlight: false,
    features: [
      { text: "Instagram DM + WhatsApp automation" },
      { text: "Instant inquiry response (24/7)" },
      { text: "Treatment-specific FAQ answers" },
      { text: "Booking page redirect to your platform" },
      { text: "Appointment confirmation reminders" },
      {
        text: "Up to 200 messages/mo",
        tooltip:
          "Covers up to 200 outbound template messages (confirmations, reminders, follow-ups). Service replies within the 24-hr customer window are free. Extra messages billed at $0.10 each.",
      },
      { text: "Email support" },
    ],
    cta: "Get Started",
  },
  {
    name: "Growth",
    tagline: "For established clinics scaling patient conversion & retention",
    setupFee: "799",
    discountedSetupFee: "399",
    monthlyFee: "199",
    highlight: true,
    badge: "Most Popular",
    features: [
      { text: "Everything in Starter, plus:" },
      {
        text: "Multi-practitioner conversation routing",
        tooltip:
          "Automatically route inquiries to the right practitioner based on treatment type and availability.",
      },
      {
        text: "Smart lead scoring & prioritisation",
        tooltip:
          "AI ranks incoming leads by intent signals so your team focuses on the hottest prospects first.",
      },
      { text: "No-show follow-up sequences" },
      {
        text: "Treatment-cycle rebooking automation",
        tooltip:
          "Automated reminders when treatments are due (e.g., Botox at 3 months, filler at 6 months). Links directly to your booking platform.",
      },
      { text: "Pre-consultation data collection" },
      {
        text: "Up to 1,000 messages/mo",
        tooltip:
          "Covers up to 1,000 outbound template messages (confirmations, reminders, campaigns). Service replies within the 24-hr customer window are free. Extra messages billed at $0.05 each.",
      },
      { text: "Conversion analytics dashboard" },
      { text: "Priority WhatsApp & email support" },
    ],
    cta: "Scale Your Clinic",
  },
  {
    name: "Pro",
    tagline: "For multi-location clinics and aesthetic chains",
    setupFee: "1,599",
    discountedSetupFee: "799",
    monthlyFee: "399",
    highlight: false,
    features: [
      { text: "Everything in Growth, plus:" },
      { text: "Multi-branch management" },
      { text: "Advanced AI conversation flows" },
      { text: "Facebook Messenger DM integration" },
      { text: "Website chat widget" },
      { text: "Campaign broadcast system" },
      {
        text: "Unlimited messages",
        tooltip: "No caps on outbound template messages or service replies \u2014 ideal for high-volume, multi-branch operations.",
      },
      { text: "Custom integrations (EMR, POS)" },
      { text: "Dedicated account manager" },
      { text: "Monthly performance reviews" },
    ],
    cta: "Talk to Us",
  },
]

export function PricingSection() {
  return (
    <section className="py-20 md:py-28">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className="text-center mb-6">
          <p className="text-sm font-semibold uppercase tracking-wider text-muted-foreground mb-4">
            Pricing &amp; Packages
          </p>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground tracking-tight leading-tight mb-4">
            Simple, Transparent Pricing
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            One-time setup + monthly platform fee. No hidden costs.
            Works alongside your existing booking system.
          </p>
        </div>

        {/* Launch Deal Banner */}
        <div className="relative max-w-2xl mx-auto mb-16">
          <div className="relative rounded-2xl border-2 border-primary/30 bg-gradient-to-r from-primary/[0.06] via-violet-500/[0.04] to-primary/[0.06] p-5 md:p-6 text-center overflow-hidden">
            <div className="absolute -top-1 left-1/2 -translate-x-1/2">
              <span className="inline-flex items-center gap-1.5 px-4 py-1 bg-primary text-white text-[11px] font-bold uppercase tracking-wider rounded-b-lg">
                <Sparkles className="w-3.5 h-3.5" /> Launch Offer
              </span>
            </div>
            <div className="pt-4">
              <p className="text-lg md:text-xl font-bold text-foreground mb-1">
                <span className="text-primary">50% Off Setup Fee</span> &mdash; Until April 30
              </p>
              <p className="text-sm text-muted-foreground mb-3">
                Lock in half-price setup for any plan when you sign up before{" "}
                <span className="font-semibold text-foreground">April 30, 2026</span>
              </p>
              <div className="flex items-center justify-center gap-4 text-xs text-muted-foreground">
                <span className="flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5 text-primary" /> Limited slots available
                </span>
                <span className="flex items-center gap-1">
                  <Zap className="w-3.5 h-3.5 text-primary" /> Go live in under 2 weeks
                </span>
              </div>
              <p className="mt-3 text-xs font-semibold text-primary">
                {"\ud83c\udf81"} Free inquiry conversion audit + Instagram flow setup included
              </p>
            </div>
          </div>
        </div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {tiers.map((tier) => (
            <div
              key={tier.name}
              className={`relative flex flex-col rounded-2xl border p-8 transition-all duration-300 overflow-visible ${
                tier.highlight
                  ? "border-primary/40 bg-card shadow-xl shadow-primary/5 scale-[1.02] md:scale-105 z-10"
                  : "border-border bg-card/60 hover:border-border/80 hover:shadow-lg"
              }`}
            >
              {/* Badge */}
              {tier.badge && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                  <span className="inline-flex items-center gap-1 px-3 py-1 bg-primary text-white text-[10px] font-bold uppercase tracking-wider rounded-full shadow-lg shadow-primary/20">
                    <Star className="w-3 h-3 fill-current" /> {tier.badge}
                  </span>
                </div>
              )}

              {/* Tier Header */}
              <div className="mb-6">
                <h3 className="text-xl font-bold text-foreground mb-1">{tier.name}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{tier.tagline}</p>
              </div>

              {/* Pricing */}
              <div className="mb-6 pb-6 border-b border-border/50">
                <div className="mb-3">
                  <span className="text-xs uppercase tracking-wider text-muted-foreground font-medium">
                    Setup (one-time)
                  </span>
                  <div className="flex items-baseline gap-2 mt-1 flex-wrap">
                    <span className="text-lg font-medium text-muted-foreground line-through">${tier.setupFee}</span>
                    <span className="text-2xl font-bold text-emerald-500">${tier.discountedSetupFee}</span>
                    <span className="text-[10px] font-bold uppercase tracking-wider bg-emerald-500/10 text-emerald-600 px-1.5 py-0.5 rounded-md">50% off</span>
                  </div>
                </div>
                <div>
                  <span className="text-xs uppercase tracking-wider text-muted-foreground font-medium">
                    Monthly
                  </span>
                  <div className="flex items-baseline gap-1 mt-1">
                    <span className="text-3xl font-black text-foreground">
                      ${tier.monthlyFee}
                    </span>
                    <span className="text-sm text-muted-foreground">/mo</span>
                  </div>
                </div>
              </div>

              {/* Features */}
              <ul className="space-y-3 mb-8 flex-grow">
                {tier.features.map((feature, i) => (
                  <FeatureItem key={i} feature={feature} highlight={tier.highlight} />
                ))}
              </ul>

              {/* CTA */}
              <Button
                asChild
                className={`w-full h-12 rounded-xl font-semibold text-base transition-all duration-200 ${
                  tier.highlight
                    ? "bg-gradient-to-r from-primary via-purple-600 to-violet-600 text-white shadow-lg shadow-primary/20 hover:shadow-primary/30 hover:scale-[1.02]"
                    : "bg-foreground text-background hover:bg-foreground/90"
                }`}
              >
                <Link href="/contact">
                  {tier.cta}
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          ))}
        </div>

        {/* Bottom Note */}
        <div className="mt-12 text-center">
          <p className="text-sm text-muted-foreground max-w-xl mx-auto">
            All plans include WhatsApp Business API setup, staff training, and an
            onboarding period. Works with Treatwell, Zenoti, Pabau, Fresha, and
            custom booking pages.{" "}
            <Link href="/contact" className="text-primary font-medium hover:underline">
              Need a custom plan?
            </Link>
          </p>
        </div>
      </div>
    </section>
  )
}