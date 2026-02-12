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
    <FadeInSection className="container mx-auto px-6 py-12 md:py-20 relative overflow-visible">
      <SectionHeader title="Your Growth Journey" />

      {/* Flex container for svg + cards */}
      <div className="flex flex-col md:flex-row items-center gap-12 mt-12">

        {/* SVG Container (Left side now) */}
        <div className="flex-shrink-0 w-full md:w-80 h-48 md:h-[32rem] relative">
          <AnimatedSVG
            src="/careers-pathways-dev.svg"
            alt="Developer growth pathway illustration"
            className="w-full h-full object-contain"
          />
        </div>

        {/* Cards Grid: 1 column on mobile, 2 columns on tablet+ */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-10 flex-grow md:max-w-4xl w-full">
          {pathways.map((p) => (
            <div
              key={p.title}
              className="rounded-2xl border p-5 md:p-8 bg-white shadow-lg hover:scale-105 hover:shadow-xl transition-all duration-300 ease-in-out"
            >
              <div className="flex items-center gap-4 md:gap-5 mb-0 md:mb-5">
                <div className="w-10 h-10 md:w-14 md:h-14 rounded-full bg-blue-600 flex items-center justify-center text-white flex-shrink-0">
                  <p.icon className="w-5 h-5 md:w-7 md:h-7" />
                </div>
                <div className="font-semibold text-lg md:text-xl theme-text">{p.title}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </FadeInSection>
  )
}
