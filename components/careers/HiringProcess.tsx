import { Briefcase, Globe2, Handshake, Rocket } from "lucide-react"
import type { LucideIcon } from "lucide-react"
import SectionHeader from "./SectionHeader"
import FadeInSection from "./FadeInSection"
import AnimatedSVG from "./AnimatedSVG"

interface ProcessStep {
  icon: LucideIcon
  title: string
  desc: string
  svg: string
}

const PROCESS_STEPS: ProcessStep[] = [
  {
    icon: Briefcase,
    title: "Apply",
    desc: "Submit your application",
    svg: "/job-offers-animate.svg",
  },
  {
    icon: Globe2,
    title: "Evaluation",
    desc: "Skills assessment",
    svg: "/team-checklist-animate.svg",
  },
  {
    icon: Handshake,
    title: "Interview",
    desc: "Meet the team",
    svg: "/careers-hiringprocess-interview.svg",
  },
  {
    icon: Rocket,
    title: "Onboard",
    desc: "Join RapidNexTech",
    svg: "/careers-hiringprocess-handshake.svg",
  },
]

const CIRCLE_SIZE_DESKTOP = 240
const CIRCLE_SIZE_MOBILE = 200

interface ProcessStepCardProps {
  step: ProcessStep
  index: number
  isMobile?: boolean
  showConnector?: boolean
}

function ProcessStepCard({ step, index, isMobile = false, showConnector = false }: ProcessStepCardProps) {
  const circleSize = isMobile ? CIRCLE_SIZE_MOBILE : CIRCLE_SIZE_DESKTOP
  const padding = isMobile ? "p-6" : "p-8"

  return (
    <div className="relative">
      {/* Circular SVG Container */}
      <div
        className={`mx-auto w-[${circleSize}px] h-[${circleSize}px] rounded-full border-4 border-background bg-muted/20 ${padding} flex items-center justify-center overflow-hidden shadow-lg`}
      >
        <AnimatedSVG
          src={step.svg}
          alt={`${step.title} illustration`}
          className="w-full h-full object-cover"
        />
      </div>

      {/* Step Info */}
      <div className="mt-6 text-center">
        <div className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-primary text-primary-foreground text-sm font-semibold mb-3">
          {index + 1}
        </div>
        <h3 className="font-semibold text-lg mb-1">{step.title}</h3>
        <p className="text-sm text-muted-foreground">{step.desc}</p>
      </div>

      {/* Vertical Connector (Mobile Only) */}
      {showConnector && (
        <div
          className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-full h-8 w-0.5 border-l-2 border-dotted border-muted-foreground/30"
          aria-hidden
        />
      )}
    </div>
  )
}

export default function HiringProcess() {
  return (
    <FadeInSection className="container mx-auto px-6 py-24 md:py-32">
      <SectionHeader title="Our Hiring Process" />

      {/* Desktop: Horizontal Timeline */}
      <div className="hidden md:block">
        <div className="relative">
          {/* Dotted Line Connector */}
          <div
            className="absolute top-[120px] left-[15%] right-[15%] h-0.5 border-t-2 border-dotted border-muted-foreground/30 z-0"
            aria-hidden
          />

          {/* Process Steps */}
          <div className="grid grid-cols-4 gap-8">
            {PROCESS_STEPS.map((step, idx) => (
              <ProcessStepCard key={step.title} step={step} index={idx} />
            ))}
          </div>
        </div>
      </div>

      {/* Mobile: Vertical Timeline */}
      <div className="md:hidden space-y-8">
        {PROCESS_STEPS.map((step, idx) => (
          <ProcessStepCard
            key={step.title}
            step={step}
            index={idx}
            isMobile
            showConnector={idx < PROCESS_STEPS.length - 1}
          />
        ))}
      </div>
    </FadeInSection>
  )
}
