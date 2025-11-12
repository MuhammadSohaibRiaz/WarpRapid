import { GraduationCap, Code2, Rocket, Users } from "lucide-react"
import SectionHeader from "./SectionHeader"
import FadeInSection from "./FadeInSection"
import AnimatedSVG from "./AnimatedSVG"

const pathways = [
  { icon: GraduationCap, title: "Intern" },
  { icon: Code2, title: "Software Engineer" },
  { icon: Rocket, title: "Senior Engineer" },
  { icon: Users, title: "Team Lead" },
]

export default function CareerPathways() {
  return (
    <FadeInSection className="container mx-auto px-6 py-24 md:py-32 relative overflow-hidden">
      <SectionHeader title="Your Growth Journey" />
      <div className="relative">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
          {pathways.map((p, i) => (
            <div key={p.title} className="rounded-2xl border p-6 bg-background/60">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-muted flex items-center justify-center">
                  <p.icon className="w-5 h-5" />
                </div>
                <div className="font-medium">{p.title}</div>
              </div>
              {i < pathways.length - 1 && (
                <div
                  className="hidden md:block mt-4 h-0.5 w-10 bg-muted-foreground/20"
                  aria-hidden
                />
              )}
            </div>
          ))}
        </div>
        <div className="flex justify-center md:absolute md:-bottom-10 md:right-0">
          <AnimatedSVG
            src="/careers-pathways-dev.svg"
            alt="Developer growth pathway illustration"
          />
        </div>
      </div>
    </FadeInSection>
  )
}
