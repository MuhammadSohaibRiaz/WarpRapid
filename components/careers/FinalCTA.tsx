import Link from "next/link"
import FadeInSection from "./FadeInSection"
import AnimatedSVG from "./AnimatedSVG"
import { Button } from "@/components/ui/button"

export default function FinalCTA() {
  return (
    <FadeInSection className="relative">
      <div
        className="absolute inset-0 bg-gradient-to-br from-blue-600 to-purple-600 dark:from-blue-500 dark:to-violet-600 -z-10"
        aria-hidden
      />
      <div className="container mx-auto px-6 py-24 md:py-32">
        <div className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur p-8 md:p-12 text-white">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-semibold">
                Don’t see a fit? Send us your CV — we love meeting passionate
                technologists.
              </h2>
              <div className="mt-6">
                <Link href="mailto:info@rapidxtech.com">
                  <Button
                    variant="secondary"
                    className="bg-white text-black hover:bg-white/90"
                  >
                    Send Your CV
                  </Button>
                </Link>
              </div>
            </div>
            <div>
              <AnimatedSVG src="/careers-cta-laptop.svg" alt="Laptop illustration" />
            </div>
          </div>
        </div>
      </div>
    </FadeInSection>
  )
}
