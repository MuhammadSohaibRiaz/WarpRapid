"use client"

import Link from "next/link"
import { ArrowRight, Search } from "lucide-react"
import { Button } from "@/components/ui/button"

export function AestheticHero() {
  return (
    <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden pt-20 md:pt-28 pb-16">
      {/* Background gradient */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/[0.03] via-transparent to-primary/[0.02]" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[600px] bg-gradient-to-b from-primary/[0.04] to-transparent rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-gradient-to-tr from-primary/[0.03] to-transparent rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-gradient-to-tl from-primary/[0.03] to-transparent rounded-full blur-3xl" />
      </div>

      {/* Grid pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,hsl(var(--border)/0.3)_1px,transparent_1px),linear-gradient(to_bottom,hsl(var(--border)/0.3)_1px,transparent_1px)] bg-[size:64px_64px] pointer-events-none opacity-40" />

      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 text-center">
        {/* Tag */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-border bg-muted/50 text-sm text-muted-foreground mb-8">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
          For UK Aesthetic &amp; Skin Clinics
        </div>

        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-foreground leading-[1.1] mb-6">
          Turn Instagram &amp; WhatsApp Inquiries into{" "}
          <span className="theme-gradient-text bg-clip-text text-transparent">
            Booked Appointments
          </span>{" "}
          Automatically
        </h1>

        <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-4 leading-relaxed">
          Respond instantly, answer patient questions, and guide every inquiry
          to your existing booking system &mdash; without increasing front desk
          workload.
        </p>

        <p className="text-sm text-muted-foreground mb-10">
          Works with your current platform:{" "}
          <span className="font-semibold text-foreground">Treatwell</span>
          {" \u00b7 "}
          <span className="font-semibold text-foreground">Zenoti</span>
          {" \u00b7 "}
          <span className="font-semibold text-foreground">Pabau</span>
          {" \u00b7 "}
          <span className="font-semibold text-foreground">Fresha</span>
          {" & more"}
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Button asChild size="lg" className="h-12 px-8 text-base font-semibold rounded-xl bg-primary text-white shadow-lg shadow-primary/20 hover:bg-primary/90 hover:shadow-primary/30 hover:scale-[1.02] transition-all duration-200">
            <Link href="/contact">
              Get Your Free Inquiry Audit
              <Search className="ml-2 h-4 w-4" />
            </Link>
          </Button>
          <Button asChild variant="outline" size="lg" className="h-12 px-8 text-base font-semibold rounded-xl border-border hover:bg-muted/50 transition-all duration-200">
            <Link href="/contact?demo=live-flow">
              Try a Live WhatsApp Flow
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>

        <p className="mt-4 text-xs text-muted-foreground max-w-lg mx-auto">
          See how it converts leads in real-time &mdash; using your own booking link.
        </p>

        {/* Stat blocks */}
        <div className="mt-16 relative max-w-3xl mx-auto">
          <div className="grid grid-cols-3 gap-3 md:gap-4">
            <div className="rounded-xl border border-border bg-card/50 backdrop-blur-sm p-4 md:p-6 text-left">
              <div className="w-8 h-1.5 rounded-full bg-primary/60 mb-3" />
              <div className="w-full h-2 rounded bg-muted mb-2" />
              <div className="w-3/4 h-2 rounded bg-muted mb-4" />
              <div className="text-2xl md:text-3xl font-bold text-foreground">&lt; 30s</div>
              <div className="text-xs text-muted-foreground mt-1">Avg. response time</div>
            </div>
            <div className="rounded-xl border border-border bg-card/50 backdrop-blur-sm p-4 md:p-6 text-left">
              <div className="w-8 h-1.5 rounded-full bg-primary/40 mb-3" />
              <div className="w-full h-2 rounded bg-muted mb-2" />
              <div className="w-2/3 h-2 rounded bg-muted mb-4" />
              <div className="text-2xl md:text-3xl font-bold text-foreground">2&ndash;3x</div>
              <div className="text-xs text-muted-foreground mt-1">Inquiry-to-booking rate</div>
            </div>
            <div className="rounded-xl border border-border bg-card/50 backdrop-blur-sm p-4 md:p-6 text-left">
              <div className="w-8 h-1.5 rounded-full bg-primary/50 mb-3" />
              <div className="w-full h-2 rounded bg-muted mb-2" />
              <div className="w-5/6 h-2 rounded bg-muted mb-4" />
              <div className="text-2xl md:text-3xl font-bold text-foreground">&darr; 35%</div>
              <div className="text-xs text-muted-foreground mt-1">No-show reduction</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}