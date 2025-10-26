"use client"

import { motion } from "framer-motion"
import { Search, Map, Code2, Rocket } from "lucide-react"
import type { ComponentType, SVGProps } from "react"

type Step = {
  title: string
  desc: string
  Icon: ComponentType<SVGProps<SVGSVGElement>>
  accent: string
}

const steps: Step[] = [
  {
    title: "Discover",
    desc: "Workshops, research, and alignment on goals, users, and success metrics.",
    Icon: Search,
    accent: "from-sky-500 to-blue-600",
  },
  {
    title: "Plan",
    desc: "Roadmap, scope, and architecture to de-risk delivery and clarify milestones.",
    Icon: Map,
    accent: "from-violet-500 to-indigo-600",
  },
  {
    title: "Build",
    desc: "Iterative development with previews, QA, and performance baked in.",
    Icon: Code2,
    accent: "from-emerald-500 to-teal-600",
  },
  {
    title: "Deliver",
    desc: "Seamless launch, documentation, handover, and optional ongoing support.",
    Icon: Rocket,
    accent: "from-amber-500 to-orange-600",
  },
]

export function ProcessSection() {
  return (
    <section className="py-24 theme-bg theme-transition relative overflow-hidden">
      {/* subtle background pattern */}
      <div className="absolute inset-0 opacity-[0.03]">
        <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center" />
      </div>

      <div className="container mx-auto px-4 relative">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-primary/10 text-primary">
            How we work
          </span>
          <h2 className="mt-4 text-3xl md:text-4xl font-semibold theme-text theme-transition">
            Our Process
          </h2>
          <p className="mt-3 text-base md:text-lg theme-text opacity-70 theme-transition">
            Clear, predictable, and outcome‑focused from day one.
          </p>
        </motion.div>

        {/* Connector line (md+) */}
        <div className="hidden md:block relative mb-10">
          <div className="absolute left-0 right-0 top-6 h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent" />
        </div>

        {/* Steps */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {steps.map(({ title, desc, Icon, accent }, i) => (
            <motion.article
              key={title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.5, delay: i * 0.05 }}
              className="group h-full"
            >
              <div className="relative">
                {/* Gradient border card */}
                <div className="bg-gradient-to-br from-white/20 to-white/5 dark:from-white/10 dark:to-white/5 rounded-2xl p-[1px]">
                  <div className="rounded-2xl h-full w-full bg-white/60 dark:bg-black/40 backdrop-blur-md p-6 border border-white/10">
                    {/* Icon + badge */}
                    <div className="flex items-start justify-between mb-4">
                      <div className={`relative inline-flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-br ${accent} text-white shadow-lg shadow-black/10`}>
                        <Icon className="w-6 h-6" />
                        {/* glow */}
                        <div className="absolute inset-0 rounded-xl bg-white/10 mix-blend-overlay" />
                      </div>
                      <span className="px-2 py-1 rounded-full text-xs font-medium bg-primary/10 text-primary">
                        Step {i + 1}
                      </span>
                    </div>

                    <h3 className="text-lg md:text-xl font-semibold theme-text mb-2 theme-transition">
                      {title}
                    </h3>
                    <p className="text-sm md:text-[15px] leading-relaxed theme-text opacity-80 theme-transition">
                      {desc}
                    </p>

                    {/* Micro-highlights */}
                    <ul className="mt-4 space-y-2">
                      {i === 0 && (
                        <>
                          <li className="text-xs md:text-sm theme-text/80">• Stakeholder & user interviews</li>
                          <li className="text-xs md:text-sm theme-text/80">• Success metrics & risks</li>
                        </>
                      )}
                      {i === 1 && (
                        <>
                          <li className="text-xs md:text-sm theme-text/80">• Milestones & timelines</li>
                          <li className="text-xs md:text-sm theme-text/80">• Architecture & scope</li>
                        </>
                      )}
                      {i === 2 && (
                        <>
                          <li className="text-xs md:text-sm theme-text/80">• Weekly previews</li>
                          <li className="text-xs md:text-sm theme-text/80">• QA & accessibility</li>
                        </>
                      )}
                      {i === 3 && (
                        <>
                          <li className="text-xs md:text-sm theme-text/80">• Launch & monitoring</li>
                          <li className="text-xs md:text-sm theme-text/80">• Docs & handover</li>
                        </>
                      )}
                    </ul>
                  </div>
                </div>

                {/* Hover lift */}
                <div className="pointer-events-none absolute inset-0 rounded-2xl transition-transform duration-300 group-hover:-translate-y-1" />
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  )
}
