import { CheckCircle2 } from "lucide-react"

const segments = [
  {
    title: "Botox & Injectables Clinics",
    badge: "Best Fit",
    description:
      "Anti-wrinkle and filler treatments repeat every 3\u20134 months. With average appointment values of \u00a3200\u2013\u00a3350, automated rebooking reminders alone can recover thousands in annual revenue per patient.",
    economics: "\u00a3800\u2013\u00a31,200 avg. yearly patient value",
  },
  {
    title: "Laser Hair Removal Clinics",
    badge: null,
    description:
      "Multi-session packages (\u00a3600\u2013\u00a31,200 per course) require patients to return 4\u20136 times. Missed sessions destroy results. Automated session reminders keep patients on track and protect your revenue.",
    economics: "4\u20136 sessions per treatment course",
  },
  {
    title: "Premium Skin Clinics",
    badge: null,
    description:
      "Hydrafacials, microneedling, chemical peels, and skin rejuvenation. High Instagram inquiry volume, high ticket prices (\u00a3120\u2013\u00a3450+), and complex treatment suitability questions that automation handles perfectly.",
    economics: "\u00a3120\u2013\u00a3450+ per treatment session",
  },
  {
    title: "Multi-Treatment Aesthetic Centres",
    badge: null,
    description:
      "Clinics offering a range of injectables, laser, and skin treatments across multiple practitioners. The system routes each inquiry to the right treatment flow and manages the full patient conversation lifecycle.",
    economics: "Multiple treatment lines = compounding rebooking value",
  },
]

export function WhoItsForSection() {
  return (
    <section className="py-20 md:py-28">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-start">
          {/* Left column */}
          <div className="lg:sticky lg:top-32">
            <p className="text-sm font-semibold uppercase tracking-wider text-muted-foreground mb-4">
              Who This Is For
            </p>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground tracking-tight leading-tight mb-6">
              Built for Clinics Where{" "}
              <span className="bg-gradient-to-r from-blue-600 to-violet-600 bg-clip-text text-transparent">
                Treatments Repeat
              </span>
            </h2>
            <p className="text-lg text-muted-foreground leading-relaxed mb-4">
              The highest ROI comes from clinics with recurring treatments.
              Every rebooking reminder we send is revenue you would have
              otherwise lost.
            </p>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Already using Treatwell, Zenoti, Pabau, or Fresha? Perfect. We
              handle the conversation layer around your existing calendar.
            </p>
          </div>

          <div className="space-y-4">
            {segments.map((segment) => (
              <div
                key={segment.title}
                className="flex gap-4 p-5 rounded-xl border border-border bg-card/50 hover:bg-card transition-all duration-200"
              >
                <CheckCircle2 className="w-5 h-5 text-emerald-500 flex-shrink-0 mt-0.5" />
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="font-semibold text-foreground">
                      {segment.title}
                    </h3>
                    {segment.badge && (
                      <span className="text-[10px] font-bold uppercase tracking-wider bg-primary/10 text-primary px-2 py-0.5 rounded-full">
                        {segment.badge}
                      </span>
                    )}
                  </div>
                  <p className="text-sm text-muted-foreground leading-relaxed mb-2">
                    {segment.description}
                  </p>
                  <p className="text-xs font-medium text-foreground/70">
                    {segment.economics}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}