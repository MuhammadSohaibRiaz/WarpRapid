"use client"

import { motion, useScroll } from "framer-motion"
import { useRef } from "react"
import { useThemeContext } from "@/context/theme-context"
import { Brain, Cog, Search, Link as LinkIcon } from "lucide-react"

const features = [
  {
    title: "Founder-Friendly Execution",
    description: "We collaborate with non-technical founders and business leaders, converting ideas into straightforward technical plans—no jargon, no confusion.",
    icon: Brain,
  },
  {
    title: "Production-Ready, Not Just MVPs",
    description: "From initial launch to enterprise-scale systems, we deliver software that's stable, scalable, and primed for real users and sustained growth.",
    icon: Cog,
  },
  {
    title: "Clear Process & Accountability",
    description: "Stay informed on what's being built, why, and what's next—with realistic timelines and open communication every step of the way.",
    icon: Search,
  },
  {
    title: "Automation & Integrations That Save Time",
    description: "Streamline your operations with smart APIs, workflows, and integrations that eliminate manual tasks and minimize errors.",
    icon: LinkIcon,
  },
]

export function ScrollSection() {
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  })
  const { color, mode } = useThemeContext()

  return (
    <section ref={containerRef} className="py-32 theme-bg theme-transition relative overflow-hidden">
      <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))]" />

      <div className="container mx-auto px-4 relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent theme-gradient-text theme-transition mb-4">
            Why Founders Choose RapidNexTech
          </h2>
          <p className="text-xl theme-text opacity-80 max-w-3xl mx-auto theme-transition">
            Partner with experts who turn complex software challenges into seamless, scalable successes—without the usual headaches.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
          {features.map((feature, index) => {
            const Icon = feature.icon
            return (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="relative group h-full"
              >
                <div className="absolute -inset-0.5 bg-gradient-to-r theme-gradient-text rounded-lg blur opacity-30 group-hover:opacity-100 transition duration-1000 theme-transition"></div>
                <div
                  className={`relative ${mode === "dark" || color === "black" ? "bg-gray-900" : "bg-white"} p-6 rounded-lg h-full flex flex-col transform transition duration-500 hover:-translate-y-2 theme-transition`}
                >
                  <div className={`w-12 h-12 rounded-xl ${mode === "dark" || color === "black" ? "bg-white/10" : "bg-black/5"} flex items-center justify-center mb-4`}>
                    <Icon className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="text-lg font-semibold theme-text mb-2 theme-transition">{feature.title}</h3>
                  <p className="theme-text opacity-70 theme-transition text-sm leading-relaxed">{feature.description}</p>
                </div>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
