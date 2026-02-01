"use client"

import Link from "next/link"
import { motion, useReducedMotion } from "framer-motion"
import { ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useThemeContext } from "@/context/theme-context"

interface ProjectCTAProps {
    title?: string
    description?: string
    buttonText?: string
    href?: string
}

const fadeUp = (delay = 0, rm?: boolean) => ({
    initial: { opacity: 0, y: rm ? 0 : 20 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true },
    transition: { duration: rm ? 0 : 0.6, delay: rm ? 0 : delay },
})

export function ProjectCTA({
    title = "Ready to Build Something Extraordinary?",
    description = "Partner with a team that values speed, quality, and your long-term success.",
    buttonText = "Start Your Project",
    href = "/contact",
}: ProjectCTAProps) {
    const { mode } = useThemeContext()
    const prefersReducedMotion = useReducedMotion() ?? false

    return (
        <section className="relative py-12">
            <div
                className={`max-w-6xl mx-auto rounded-[2.5rem] p-12 md:p-20 text-center relative overflow-hidden theme-transition ${mode === "dark"
                        ? "bg-slate-900/40 border border-slate-800"
                        : "bg-[#f4faff] border border-blue-50/50"
                    }`}
            >
                {/* Subtle background glow */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-gradient-to-br from-blue-500/5 to-cyan-500/5 pointer-events-none" />

                <div className="relative z-10 max-w-2xl mx-auto">
                    <motion.h2
                        className="text-3xl md:text-5xl font-bold theme-text leading-tight tracking-tight"
                        {...fadeUp(0, prefersReducedMotion)}
                    >
                        {title}
                    </motion.h2>

                    <motion.p
                        className="mt-6 text-lg md:text-xl theme-text opacity-70 leading-relaxed"
                        {...fadeUp(0.1, prefersReducedMotion)}
                    >
                        {description}
                    </motion.p>

                    <motion.div
                        className="mt-10 flex justify-center"
                        {...fadeUp(0.2, prefersReducedMotion)}
                    >
                        <Link href={href}>
                            <Button
                                size="lg"
                                className="group rounded-full px-8 py-7 text-lg font-medium bg-[#111827] hover:bg-[#1f2937] text-white shadow-xl transition-all hover:scale-105 active:scale-95"
                            >
                                {buttonText}
                                <ArrowRight className="ml-2 w-5 h-5 transition-transform group-hover:translate-x-1" />
                            </Button>
                        </Link>
                    </motion.div>
                </div>
            </div>
        </section>
    )
}
