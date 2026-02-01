import Link from "next/link"
import { ArrowRight, Mail, UserPlus, Sparkles, Zap } from "lucide-react"
import SectionHeader from "./SectionHeader"
import FadeInSection from "./FadeInSection"
import AnimatedSVG from "./AnimatedSVG"
import { Button } from "@/components/ui/button"

export default function OpenRoles() {
  return (
    <FadeInSection
      id="open-roles"
      className="container mx-auto px-6 py-24 md:py-32"
    >
      <SectionHeader
        title="The Future of RapidNexTech"
        subtitle="We’re building the next generation of software elite. While our current roster is full, we are always open to meeting the visionary talent who will power our next phase of growth."
      />

      <div className="max-w-5xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Pipeline Invitation Card */}
          <div className="relative group">
            <div className="absolute -inset-1 bg-gradient-to-r from-primary to-purple-600 rounded-[2.5rem] blur opacity-25 group-hover:opacity-50 transition duration-1000 group-hover:duration-200"></div>
            <div className="relative rounded-[2rem] border border-border/50 p-8 md:p-12 bg-background/80 backdrop-blur-xl shadow-2xl space-y-8">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center">
                  <UserPlus className="w-8 h-8 text-primary" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold theme-text">Join Our Talent Pipeline</h3>
                  <p className="text-primary font-medium text-sm">Open for Future Opportunities</p>
                </div>
              </div>

              <div className="space-y-4">
                <p className="text-muted-foreground leading-relaxed text-lg">
                  Are you a master of your craft? Whether you’re an engineer, designer, or strategist, we want to know about you.
                </p>
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Sparkles className="w-4 h-4 text-purple-500" />
                    <span>Visionary Design</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Zap className="w-4 h-4 text-yellow-500" />
                    <span>High-Perf Engineering</span>
                  </div>
                </div>
              </div>

              <div className="pt-4">
                <Link
                  href="mailto:info@rapidnextech.com?subject=Talent%20Pipeline%20-%20General%20Application%20%5BYour%20Name%20%2F%20Role%5D"
                >
                  <Button size="lg" className="w-full md:w-auto px-10 py-7 rounded-full text-lg font-bold shadow-xl shadow-primary/20 transition-all hover:scale-105 active:scale-95 group">
                    Submit Your Resume
                    <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </Link>
                <p className="mt-4 text-xs text-muted-foreground italic text-center md:text-left">
                  We review every submission and keep top talent in our priority pipeline.
                </p>
              </div>
            </div>
          </div>

          {/* Context/Values Side */}
          <div className="space-y-12">
            <div className="space-y-6">
              <h4 className="text-xl font-bold theme-text flex items-center gap-2">
                <div className="w-2 h-8 bg-primary rounded-full" />
                Waitlist for Innovation
              </h4>
              <p className="text-muted-foreground leading-relaxed">
                At RapidNexTech, we don't just hire for roles; we partner with people who are obsessed with excellence.
                Joining our pipeline means you're first in line when we expand our capabilities in AI, Cloud Architecture, and Premium UX.
              </p>
            </div>

            <div className="grid gap-6">
              <div className="flex gap-4 p-4 rounded-xl hover:bg-muted/50 transition-colors">
                <div className="w-12 h-12 rounded-lg bg-muted flex items-center justify-center flex-shrink-0">
                  <Mail className="w-6 h-6 text-muted-foreground" />
                </div>
                <div>
                  <h5 className="font-bold theme-text">Direct Communication</h5>
                  <p className="text-sm text-muted-foreground">No automated filters. Your work is reviewed by our leadership team.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </FadeInSection>
  )
}
