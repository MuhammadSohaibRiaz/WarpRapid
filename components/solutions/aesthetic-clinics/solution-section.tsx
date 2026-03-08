import {
  Globe,
  MessageCircle,
  Bot,
  Bell,
} from "lucide-react"
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card"

const solutions = [
  {
    icon: Globe,
    title: "Multi-Channel Inquiry Automation",
    description:
      "Respond instantly to patient inquiries from Instagram DMs, WhatsApp, Facebook Messenger, and your website \u2014 all from one system. No new tools for your team to learn.",
    outcome: "Every inquiry gets a response in under 60 seconds, on any channel.",
    accent: "from-blue-500 to-cyan-500",
  },
  {
    icon: MessageCircle,
    title: "WhatsApp Conversation Engine",
    description:
      "Automated WhatsApp conversations that qualify leads, answer treatment questions, and guide patients to your existing booking page \u2014 without manual intervention.",
    outcome: "Instant, 24/7 response to every inquiry. No front desk bottleneck.",
    accent: "from-emerald-500 to-green-500",
  },
  {
    icon: Bot,
    title: "AI Receptionist Layer",
    description:
      "An intelligent conversational layer that handles the 7 most common patient flows: price inquiries, treatment recommendations, first-time qualification, availability, location, after-hours messages, and lead recovery.",
    outcome: "Reduce front-desk load while maintaining premium service quality.",
    accent: "from-violet-500 to-purple-500",
  },
  {
    icon: Bell,
    title: "Reminder & Rebooking System",
    description:
      "Automated appointment confirmations, no-show follow-ups, and treatment-cycle rebooking reminders that keep patients returning at the right interval.",
    outcome: "Fewer no-shows. More repeat visits. Higher lifetime patient value.",
    accent: "from-orange-500 to-amber-500",
  },
]

export function SolutionSection() {
  return (
    <section className="py-20 md:py-28 bg-muted/30">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-14">
          <p className="text-sm font-semibold uppercase tracking-wider text-muted-foreground mb-4">
            The Solution
          </p>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground tracking-tight leading-tight mb-4">
            AI Patient Inquiry Conversion<br className="hidden md:block" /> &amp; Retention System
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-3">
            Four integrated systems working together to capture, convert, and
            retain every patient &mdash; automatically.
          </p>
          <p className="text-sm text-muted-foreground max-w-xl mx-auto">
            We don&apos;t replace your booking system. We sit on top of it.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {solutions.map((solution) => (
            <Card
              key={solution.title}
              className="group border-border bg-card/60 backdrop-blur-sm hover:border-border/80 hover:shadow-lg transition-all duration-300"
            >
              <CardHeader>
                <div className="flex items-center gap-3 mb-2">
                  <div
                    className={`w-10 h-10 rounded-lg bg-gradient-to-br ${solution.accent} flex items-center justify-center`}
                  >
                    <solution.icon className="w-5 h-5 text-white" />
                  </div>
                  <CardTitle className="text-xl">{solution.title}</CardTitle>
                </div>
                <CardDescription className="text-sm text-muted-foreground leading-relaxed">
                  {solution.description}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-start gap-2 p-3 rounded-lg bg-muted/50 border border-border/50">
                  <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground whitespace-nowrap mt-0.5">
                    Outcome
                  </span>
                  <p className="text-sm font-medium text-foreground">
                    {solution.outcome}
                  </p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
