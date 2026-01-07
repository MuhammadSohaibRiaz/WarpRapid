import Link from "next/link"
import { ArrowRight } from "lucide-react"
import type { LucideIcon } from "lucide-react"
import SectionHeader from "./SectionHeader"
import FadeInSection from "./FadeInSection"
import AnimatedSVG from "./AnimatedSVG"
import { Button } from "@/components/ui/button"

interface Role {
  title: string
  type: string
  location: string
  description: string
}

const OPEN_ROLES: Role[] = [
  {
    title: "Frontend Developer",
    type: "Full-time",
    location: "Remote",
    description:
      "Build high-performance web apps with Next.js and modern tooling.",
  },
  {
    title: "Backend Engineer",
    type: "Full-time",
    location: "Remote",
    description:
      "Design scalable APIs and services using Node.js and cloud infrastructure.",
  },
  {
    title: "UI/UX Designer",
    type: "Internship",
    location: "Remote",
    description:
      "Craft intuitive interfaces and design systems that delight users.",
  },
]

export default function OpenRoles() {
  return (
    <FadeInSection
      id="open-roles"
      className="container mx-auto px-6 py-24 md:py-32"
    >
      <SectionHeader title="Open Roles" />

      <div className="grid grid-cols-1 lg:grid-cols-[1fr_300px] gap-12 items-start">
        {/* Roles Grid */}
        <div>
          {OPEN_ROLES.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {OPEN_ROLES.map((job) => (
                <div
                  key={job.title}
                  className="rounded-xl border p-6 bg-background/60 backdrop-blur flex flex-col hover:shadow-md transition-shadow"
                >
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold">{job.title}</h3>
                    <p className="mt-1 text-sm text-muted-foreground">
                      {job.type} • {job.location}
                    </p>
                    <p className="mt-3 text-sm text-muted-foreground leading-relaxed">
                      {job.description}
                    </p>
                  </div>
                  <div className="mt-6">
                    <Link
                      href={`mailto:info@rapidnextech.com?subject=Application%20-%20${encodeURIComponent(
                        job.title
                      )}`}
                    >
                      <Button className="w-full group">
                        Apply Now
                        <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                      </Button>
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-center text-muted-foreground py-12">
              No open roles right now — but we're always excited to meet new talent.
            </p>
          )}
        </div>

        {/* SVG Illustration - Desktop Only */}
        <div className="hidden lg:flex items-center justify-center">
          <div className="w-full max-w-[280px]">
            <AnimatedSVG
              src="/careers-openroles-apply.svg"
              alt="Apply illustration"
              className="w-full h-auto"
            />
          </div>
        </div>
      </div>
    </FadeInSection>
  )
}
