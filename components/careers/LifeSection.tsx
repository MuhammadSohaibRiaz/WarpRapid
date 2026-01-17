import SectionHeader from "./SectionHeader"
import FadeInSection from "./FadeInSection"
import AnimatedSVG from "./AnimatedSVG"

export default function LifeSection() {
  return (
    <FadeInSection className="container mx-auto px-6 py-24 md:py-32">
      <SectionHeader title="Life at RapidNexTech" />
      <div className="max-w-3xl mx-auto text-center">
        <p className="text-muted-foreground text-lg">
          We’re a distributed team of builders who value autonomy, curiosity, and
          craftsmanship. Every day at RapidNexTech means learning fast, collaborating
          openly, and shipping real impact.
        </p>
      </div>
      <div className="mt-10 max-w-3xl mx-auto">
        <AnimatedSVG
          src="/careers-life-connectedworld.svg"
          alt="Connected world illustration"
        />
      </div>
    </FadeInSection>
  )
}
