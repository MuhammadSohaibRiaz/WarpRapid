import { CheckCircle2 } from "lucide-react"

const segments = [
  {
    title: "Premium Aesthetic Clinics",
    description:
      "High-end clinics offering Botox, fillers, facials, and body contouring that need to match their service quality with their booking experience.",
  },
  {
    title: "Dermatology Centers",
    description:
      "Medical dermatology practices looking to streamline cosmetic and therapeutic appointment scheduling across multiple providers.",
  },
  {
    title: "Laser Treatment Clinics",
    description:
      "Clinics specializing in laser hair removal, skin resurfacing, and IPL treatments that rely on recurring multi-session bookings.",
  },
  {
    title: "Cosmetic Procedure Clinics",
    description:
      "Surgical and non-surgical cosmetic centers managing high-value consultations and complex pre-operative booking workflows.",
  },
]

export function WhoItsForSection() {
  return (
    <section className="py-20 md:py-28">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <div>
            <p className="text-sm font-semibold uppercase tracking-wider text-muted-foreground mb-4">
              Who This Is For
            </p>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground tracking-tight leading-tight mb-6">
              Built for Clinics That{" "}
              <span className="bg-gradient-to-r from-blue-600 to-violet-600 bg-clip-text text-transparent">
                Take Growth Seriously
              </span>
            </h2>
            <p className="text-lg text-muted-foreground leading-relaxed">
              This system is designed specifically for aesthetic and
              dermatological practices that understand the value of operational
              efficiency and want to scale without proportionally scaling
              headcount.
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
                  <h3 className="font-semibold text-foreground mb-1">
                    {segment.title}
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {segment.description}
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
