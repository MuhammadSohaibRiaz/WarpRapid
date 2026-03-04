import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"

export function CTASection() {
  return (
    <section className="py-20 md:py-28">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        <div className="relative rounded-2xl border border-border bg-card/60 backdrop-blur-sm p-10 md:p-16 text-center overflow-hidden">
          {/* Subtle background */}
          <div className="absolute inset-0 bg-gradient-to-br from-blue-500/[0.03] via-transparent to-violet-500/[0.03] pointer-events-none" />
          <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-bl from-primary/[0.04] to-transparent rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-gradient-to-tr from-violet-600/[0.04] to-transparent rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground tracking-tight leading-tight mb-4">
              Stop Losing High-Intent Inquiries
            </h2>
            <p className="text-lg text-muted-foreground max-w-xl mx-auto mb-8">
              Let&apos;s build your AI-powered booking engine. Engineered for
              your workflows, your team, and your growth targets.
            </p>
            <Button
              asChild
              size="lg"
              className="h-12 px-8 text-base font-semibold rounded-xl bg-gradient-to-r from-primary via-purple-600 to-violet-600 text-white shadow-lg shadow-primary/20 hover:shadow-primary/30 hover:scale-[1.02] transition-all duration-200"
            >
              <Link href="/contact">
                Schedule a Consultation
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <p className="text-xs text-muted-foreground mt-4">
              No commitment. We will assess your current workflow and recommend a
              tailored implementation plan.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
