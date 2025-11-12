import Link from "next/link"
import { ArrowRight } from "lucide-react"
import SectionHeader from "./SectionHeader"
import FadeInSection from "./FadeInSection"
import AnimatedSVG from "./AnimatedSVG"
import { Button } from "@/components/ui/button"

const roles = [
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
      className="container mx-auto px-6 py-24 md:py-32 relative"
    >
      <SectionHeader title="Open Roles" />
      {roles.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {roles.map((job) => (
            <div
              key={job.title}
              className="rounded-2xl border p-6 bg-background/60 flex flex-col"
            >
              <div className="flex-1">
                <h3 className="text-lg font-semibold">{job.title}</h3>
                <p className="mt-1 text-sm text-muted-foreground">
                  {job.type} • {job.location}
                </p>
                <p className="mt-3 text-sm text-muted-foreground">
                  {job.description}
                </p>
              </div>
              <div className="mt-6">
                <Link
                  href={`mailto:info@rapidxtech.com?subject=Application%20-%20${encodeURIComponent(
                    job.title
                  )}`}
                >
                  <Button className="w-full">
                    Apply Now <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </Link>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-center text-muted-foreground">
          No open roles right now — but we’re always excited to meet new talent.
        </p>
      )}

      <div className="mt-10 md:mt-16 md:absolute md:-bottom-8 md:right-4 md:w-80">
        <AnimatedSVG src="/careers-openroles-apply.svg" alt="Apply illustration" />
      </div>
    </FadeInSection>
  )
}
