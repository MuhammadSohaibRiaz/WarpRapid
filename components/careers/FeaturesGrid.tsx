import SectionHeader from "./SectionHeader"
import FadeInSection from "./FadeInSection"
import AnimatedSVG from "./AnimatedSVG"

const features = [
  "Remote-First Culture",
  "Real Impact",
  "Flexible Hours",
  "Mentorship & Learning",
  "Growth & Recognition",
  "Diverse, Global Projects",
]

export default function FeaturesGrid() {
  return (
    <FadeInSection className="relative">
      <div
        className="absolute inset-0 bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-950/20 dark:to-violet-950/20 -z-10"
        aria-hidden
      />
      <div className="container mx-auto px-6 pt-16 pb-24 md:pt-20 md:pb-28">
        <SectionHeader
          title="Why Work With Us"
          subtitle="We believe growth happens when people collaborate, learn, and build together."
        />
        <div className="grid md:grid-cols-[3fr_2fr] gap-10 items-start">
          <div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              {features.map((f) => (
                <div
                  key={f}
                  className="rounded-2xl border bg-background/60 backdrop-blur px-6 py-8 md:py-10"
                >
                  <h3 className="font-medium">{f}</h3>
                </div>
              ))}
            </div>
          </div>
          <div className="md:pl-6 flex justify-center md:justify-end items-start">
            <div className="w-full max-h-full flex items-center justify-end overflow-hidden">
              <AnimatedSVG
                src="/careers-why-teams.svg"
                alt="Team collaboration illustration"
                className="w-full h-auto max-h-[500px] object-contain object-center"
              />
            </div>
          </div>
        </div>
      </div>
    </FadeInSection>
  )
}
