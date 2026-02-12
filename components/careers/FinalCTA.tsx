import Link from "next/link"
import FadeInSection from "./FadeInSection"
import AnimatedSVG from "./AnimatedSVG"
import { Button } from "@/components/ui/button"

export default function FinalCTA() {
  return (
    <FadeInSection className="relative overflow-hidden bg-gradient-to-br from-blue-600 to-purple-600 dark:from-blue-500 dark:to-violet-600">
      <div className="container mx-auto px-6 py-12 md:py-16 relative z-10">
        <div className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur p-6 md:p-10 text-white">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div className="text-center md:text-left">
              <h2 className="text-2xl md:text-4xl font-semibold leading-tight">
                Don’t see a fit? Send us your CV — we love meeting passionate
                technologists.
              </h2>
              <div className="mt-6">
                <Link href="mailto:info@rapidnextech.com">
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
