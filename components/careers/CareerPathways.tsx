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
    <FadeInSection className="container mx-auto px-6 py-24 md:py-32 relative overflow-visible">
      <SectionHeader title="Your Growth Journey" />

      {/* Flex container for svg + cards */}
      <div className="flex flex-col md:flex-row items-center gap-12 mt-12">

        {/* SVG Container (Left side now) */}
        <div className="flex-shrink-0 w-80 h-[32rem] md:h-[32rem] relative">
          <AnimatedSVG
            src="/careers-pathways-dev.svg"
            alt="Developer growth pathway illustration"
            className="w-full h-full object-contain"
          />
        </div>

        {/* Cards Grid: 2 columns, 2 rows (Right side now) */}
        <div className="grid grid-cols-2 gap-10 flex-grow md:max-w-4xl">
          {pathways.map((p) => (
            <div
              key={p.title}
              className="rounded-2xl border p-8 bg-white shadow-lg hover:scale-105 hover:shadow-xl transition-all duration-300 ease-in-out"
            >
              <div className="flex items-center gap-5 mb-5">
                <div className="w-14 h-14 rounded-full bg-blue-600 flex items-center justify-center text-white">
                  <p.icon className="w-7 h-7" />
                </div>
                <div className="font-semibold text-xl">{p.title}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </FadeInSection>
  )
}
