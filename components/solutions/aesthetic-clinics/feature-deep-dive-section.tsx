import {
  Cloud,
  Brain,
  Database,
  LayoutDashboard,
  Megaphone,
  BarChart3,
} from "lucide-react"

const features = [
  {
    icon: Cloud,
    title: "WhatsApp Cloud API Integration",
    description:
      "Direct integration with the official WhatsApp Cloud API for reliable, scalable messaging. Supports rich media, templates, and interactive messages. No third-party middleware.",
    tags: ["Official API", "Template Messages", "Rich Media"],
  },
  {
    icon: Brain,
    title: "Intelligent Intent Detection",
    description:
      "LLM-ready architecture that understands patient intent from natural-language messages. Routes conversations dynamically — treatment inquiries, pricing questions, scheduling requests — each handled appropriately.",
    tags: ["NLP", "LLM-Ready", "Dynamic Routing"],
  },
  {
    icon: Database,
    title: "Appointment Database",
    description:
      "Centralized appointment management with full patient history, treatment records, and scheduling data. Structured for reporting and integration with external systems.",
    tags: ["Structured Data", "Patient History", "API-Ready"],
  },
  {
    icon: LayoutDashboard,
    title: "Admin Dashboard",
    description:
      "A purpose-built dashboard for clinic operators. View bookings, manage conversations, track staff performance, and configure automation rules — all in one interface.",
    tags: ["Real-Time", "Role-Based Access", "Configurable"],
  },
  {
    icon: Megaphone,
    title: "Campaign Broadcast System",
    description:
      "Send targeted broadcast campaigns to segmented patient lists. Promote seasonal offers, new treatments, or rebooking reminders at scale with compliance built in.",
    tags: ["Segmentation", "Automated Sends", "Compliance"],
  },
  {
    icon: BarChart3,
    title: "Analytics & Conversion Tracking",
    description:
      "End-to-end visibility from inquiry to appointment. Track response times, conversion rates, campaign ROI, and staff performance with detailed reporting.",
    tags: ["Funnel Metrics", "ROI Tracking", "Custom Reports"],
  },
]

export function FeatureDeepDiveSection() {
  return (
    <section className="py-20 md:py-28 bg-muted/30">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-14">
          <p className="text-sm font-semibold uppercase tracking-wider text-muted-foreground mb-4">
            Feature Deep Dive
          </p>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground tracking-tight leading-tight mb-4">
            Engineered for Performance
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Every component is purpose-built for healthcare appointment
            workflows. Here is what powers the system under the hood.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature) => (
            <div
              key={feature.title}
              className="group p-6 rounded-xl border border-border bg-card/60 backdrop-blur-sm hover:border-border/80 hover:shadow-lg transition-all duration-300"
            >
              <div className="w-10 h-10 rounded-lg bg-muted flex items-center justify-center mb-4">
                <feature.icon className="w-5 h-5 text-foreground" />
              </div>
              <h3 className="text-lg font-semibold text-foreground mb-2">
                {feature.title}
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed mb-4">
                {feature.description}
              </p>
              <div className="flex flex-wrap gap-2">
                {feature.tags.map((tag) => (
                  <span
                    key={tag}
                    className="inline-flex items-center px-2.5 py-0.5 rounded-md text-xs font-medium bg-muted text-muted-foreground border border-border/50"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
