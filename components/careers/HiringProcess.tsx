import { Briefcase, Globe2, Handshake, Rocket } from "lucide-react"
import SectionHeader from "./SectionHeader"
import FadeInSection from "./FadeInSection"
import AnimatedSVG from "./AnimatedSVG"

const processSteps = [
  { icon: Briefcase, title: "Apply" },
  { icon: Globe2, title: "Evaluation" },
  { icon: Handshake, title: "Interview" },
  { icon: Rocket, title: "Onboard" },
]

export default function HiringProcess() {
  return (
    <FadeInSection className="container mx-auto px-6 py-24 md:py-32 relative">
      <SectionHeader title="Our Hiring Process" />
      <div className="relative">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 relative">
          {processSteps.map((s, idx) => (
            <div
              key={s.title}
              className="rounded-2xl border p-6 bg-background/60 relative"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-muted flex items-center justify-center">
                  <s.icon className="w-5 h-5" />
                </div>
                <div className="font-medium">{s.title}</div>
              </div>

              {idx < processSteps.length - 1 && (
                <div
                  className="hidden md:block absolute top-1/2 right-0 translate-x-1/2 w-12 h-12 pointer-events-none"
                  aria-hidden
                >
                  <svg viewBox="0 0 48 48" className="w-full h-full">
                    <path
                      d="M2 24 C 16 2, 32 46, 46 24"
                      fill="none"
                      stroke="currentColor"
                      className="text-muted-foreground/30"
                      strokeWidth="2"
                      strokeLinecap="round"
                    />
                  </svg>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Illustrations */}
        <div className="hidden md:block absolute -top-10 left-1/3 w-56">
          <AnimatedSVG
            src="/careers-hiringprocess-interview.svg"
            alt="Interview stage illustration"
          />
        </div>
        <div className="hidden md:block absolute top-20 right-1/5 w-56">
          <AnimatedSVG
            src="/careers-hiringprocess-handshake.svg"
            alt="Handshake illustration"
          />
        </div>
      </div>
    </FadeInSection>
  )
}
