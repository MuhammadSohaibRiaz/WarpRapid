import {
  MousePointerClick,
  MessageSquare,
  CalendarCheck,
  BellRing,
  RefreshCw,
} from "lucide-react"

const steps = [
  {
    number: "01",
    icon: MousePointerClick,
    title: "Visitor clicks Book on Instagram or Website",
    description:
      "A prospective patient taps the booking link from your Instagram bio, story, ad, or website. They are routed directly into a structured WhatsApp conversation.",
  },
  {
    number: "02",
    icon: MessageSquare,
    title: "WhatsApp AI qualifies and collects treatment preference",
    description:
      "The AI assistant asks targeted questions — treatment type, preferred date, prior history — and qualifies the lead without human involvement.",
  },
  {
    number: "03",
    icon: CalendarCheck,
    title: "Appointment is logged and staff notified",
    description:
      "Confirmed bookings are automatically added to the appointment database. Relevant staff receive instant notification with patient details.",
  },
  {
    number: "04",
    icon: BellRing,
    title: "Automated reminders sent",
    description:
      "The system sends pre-appointment reminders at configured intervals, reducing no-shows and giving patients a frictionless confirmation experience.",
  },
  {
    number: "05",
    icon: RefreshCw,
    title: "Post-treatment rebooking and review automation",
    description:
      "After the appointment, patients receive follow-up messages for reviews and rebooking recommendations based on treatment cycle timelines.",
  },
]

export function HowItWorksSection() {
  return (
    <section id="how-it-works" className="py-20 md:py-28">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-14">
          <p className="text-sm font-semibold uppercase tracking-wider text-muted-foreground mb-4">
            How It Works
          </p>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground tracking-tight leading-tight mb-4">
            From Inquiry to Appointment in Minutes
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            A five-step automated workflow that converts interest into confirmed
            bookings — with zero manual effort.
          </p>
        </div>

        <div className="relative">
          {/* Vertical line */}
          <div className="absolute left-6 md:left-8 top-0 bottom-0 w-px bg-border" />

          <div className="space-y-8">
            {steps.map((step, index) => (
              <div key={step.number} className="relative flex gap-6 md:gap-8">
                {/* Step indicator */}
                <div className="relative z-10 flex-shrink-0">
                  <div className="w-12 h-12 md:w-16 md:h-16 rounded-full border-2 border-border bg-background flex items-center justify-center">
                    <step.icon className="w-5 h-5 md:w-6 md:h-6 text-foreground" />
                  </div>
                </div>

                {/* Content */}
                <div className="pb-2 pt-1 md:pt-3">
                  <span className="text-xs font-mono font-semibold text-muted-foreground">
                    Step {step.number}
                  </span>
                  <h3 className="text-lg md:text-xl font-semibold text-foreground mt-1 mb-2">
                    {step.title}
                  </h3>
                  <p className="text-sm md:text-base text-muted-foreground leading-relaxed">
                    {step.description}
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
