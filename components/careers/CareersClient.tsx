"use client"

import React from "react"
import { motion } from "framer-motion"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import {
  Briefcase,
  Clock,
  GraduationCap,
  Rocket,
  Users,
  Code2,
  Globe2,
  Handshake,
  ArrowRight,
} from "lucide-react"

/* ---------------- Section Header ---------------- */
function SectionHeader({ title, subtitle }: { title: string; subtitle?: string }) {
  return (
    <div className="text-center max-w-3xl mx-auto mb-10">
      <h2 className="text-3xl md:text-4xl font-semibold tracking-tight">{title}</h2>
      {subtitle && <p className="mt-3 text-muted-foreground">{subtitle}</p>}
    </div>
  )
}

/* ---------------- FadeInSection (Improved) ---------------- */
function FadeInSection({
  children,
  className = "",
}: {
  children: React.ReactNode
  className?: string
}) {
  const ref = React.useRef<HTMLDivElement>(null)
  const [isVisible, setIsVisible] = React.useState(false)

  React.useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          observer.disconnect() // only trigger once
        }
      },
      { threshold: 0.3 }
    )
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [])

  return (
    <motion.section
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className={`${className} ${isVisible ? "animate-active" : "animate-paused"}`}
    >
      {children}
    </motion.section>
  )
}

/* ---------------- Data ---------------- */
const features = [
  { title: "Remote-First Culture" },
  { title: "Real Impact" },
  { title: "Flexible Hours" },
  { title: "Mentorship & Learning" },
  { title: "Growth & Recognition" },
  { title: "Diverse, Global Projects" },
]

const pathways = [
  { icon: GraduationCap, title: "Intern" },
  { icon: Code2, title: "Software Engineer" },
  { icon: Rocket, title: "Senior Engineer" },
  { icon: Users, title: "Team Lead" },
]

const processSteps = [
  { icon: Briefcase, title: "Apply" },
  { icon: Globe2, title: "Evaluation" },
  { icon: Handshake, title: "Interview" },
  { icon: Rocket, title: "Onboard" },
]

const roles = [
  {
    title: "Frontend Developer",
    type: "Full-time",
    location: "Remote",
    description: "Build high-performance web apps with Next.js and modern tooling.",
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
    description: "Craft intuitive interfaces and design systems that delight users.",
  },
]

/* ---------------- Careers Client ---------------- */
export default function CareersClient() {
  return (
    <main className="min-h-screen">
      {/* Hero */}
      <FadeInSection className="container mx-auto px-6 py-24 md:py-32">
        <div className="grid md:grid-cols-2 gap-10 items-center min-h-[60vh] md:min-h-[70vh]">
          <div>
            <h1 className="text-4xl md:text-5xl font-semibold tracking-tight">
              Join the RapidXTech Team
            </h1>
            <p className="mt-4 text-muted-foreground text-lg">
              We build technology that moves fast — and so do our people.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link href="#open-roles">
                <Button>View Open Roles</Button>
              </Link>
              <Link href="mailto:info@rapidxtech.com">
                <Button variant="outline">Send Your CV</Button>
              </Link>
            </div>
          </div>
          <div className="relative flex justify-center">
            <AnimatedSVG src="/careers-hero-hiring.svg" alt="Hiring illustration" />
          </div>
        </div>
      </FadeInSection>

      {/* Why Work With Us */}
      <FadeInSection className="relative">
        <div
          className="absolute inset-0 bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-950/20 dark:to-violet-950/20 -z-10"
          aria-hidden
        />
        <div className="container mx-auto px-6 py-24 md:py-32">
          <SectionHeader
            title="Why Work With Us"
            subtitle="We believe growth happens when people collaborate, learn, and build together."
          />
          <div className="grid md:grid-cols-2 gap-10 items-start">
            <div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                {features.map((f) => (
                  <div
                    key={f.title}
                    className="rounded-2xl border bg-background/60 backdrop-blur p-6"
                  >
                    <h3 className="font-medium">{f.title}</h3>
                  </div>
                ))}
              </div>
            </div>
            <div className="md:pl-6 flex justify-center">
              <AnimatedSVG
                src="/careers-why-teams.svg"
                alt="Team collaboration illustration"
              />
            </div>
          </div>
        </div>
      </FadeInSection>

      {/* Career Pathways */}
      <FadeInSection className="container mx-auto px-6 py-24 md:py-32 relative overflow-hidden">
        <SectionHeader title="Your Growth Journey" />
        <div className="relative">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
            {pathways.map((p, i) => (
              <div
                key={p.title}
                className="rounded-2xl border p-6 bg-background/60"
              >
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

      {/* Hiring Process */}
      <FadeInSection className="container mx-auto px-6 py-24 md:py-32 relative">
        <SectionHeader title="Our Hiring Process" />
        <div className="relative">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 relative">
            {processSteps.map((s, idx) => (
              <div
                key={s.title}
                className="rounded-2xl border p-6 bg-background/60 relative"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-muted flex items-center justify-center">
                    <s.icon className="w-5 h-5" />
                  </div>
                  <div className="font-medium">{s.title}</div>
                </div>
                {idx < processSteps.length - 1 && (
                  <div
                    className="hidden md:block absolute top-1/2 right-0 translate-x-1/2 w-12 h-12 pointer-events-none"
                    aria-hidden
                  >
                    <svg viewBox="0 0 48 48" className="w-full h-full">
                      <path
                        d="M2 24 C 16 2, 32 46, 46 24"
                        fill="none"
                        stroke="currentColor"
                        className="text-muted-foreground/30"
                        strokeWidth="2"
                        strokeLinecap="round"
                      />
                    </svg>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Between steps 2 & 3 illustrations */}
          <div className="hidden md:block absolute -top-10 left-1/2 -translate-x-1/2 w-56 pointer-events-none">
            <AnimatedSVG
              src="/careers-hiringprocess-interview.svg"
              alt="Interview stage illustration"
            />
          </div>
          <div className="hidden md:block absolute top-20 right-8 w-56 pointer-events-none">
            <AnimatedSVG
              src="/careers-hiringprocess-handshake.svg"
              alt="Handshake illustration"
            />
          </div>
        </div>
      </FadeInSection>

      {/* Open Roles */}
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
                    href={`mailto:info@rapidxtech.com?subject=Application%20-%20${job.title}`}
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
            No open roles right now — but we’re always excited to meet new
            talent.
          </p>
        )}
        <div className="mt-10 md:mt-16 md:absolute md:-bottom-8 md:right-4 md:w-80">
          <AnimatedSVG src="/careers-openroles-apply.svg" alt="Apply illustration" />
        </div>
      </FadeInSection>

      {/* Life at RapidXTech */}
      <FadeInSection className="container mx-auto px-6 py-24 md:py-32">
        <SectionHeader title="Life at RapidXTech" />
        <div className="max-w-3xl mx-auto text-center">
          <p className="text-muted-foreground text-lg">
            We’re a distributed team of builders who value autonomy, curiosity,
            and craftsmanship. Every day at RapidXTech means learning fast,
            collaborating openly, and shipping real impact.
          </p>
        </div>
        <div className="mt-10 max-w-3xl mx-auto">
          <AnimatedSVG
            src="/careers-life-connectedworld.svg"
            alt="Connected world illustration"
          />
        </div>
      </FadeInSection>

      {/* Final CTA */}
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
    </main>
  )
}

/* ---------------- Animated SVG ---------------- */
function AnimatedSVG({ src, alt }: { src: string; alt: string }) {
  const ref = React.useRef<HTMLImageElement>(null)
  const [visible, setVisible] = React.useState(false)

  React.useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true)
          observer.disconnect()
        }
      },
      { threshold: 0.3 }
    )
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [])

  return visible ? (
    <img
      ref={ref}
      key={src}
      src={src}
      alt={alt}
      className="w-full h-auto transition-opacity duration-700 ease-out opacity-100"
      loading="lazy"
      decoding="async"
    />
  ) : (
    <div ref={ref} className="w-full h-[300px] opacity-0" />
  )
}
