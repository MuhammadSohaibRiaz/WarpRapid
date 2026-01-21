"use client"

import { TechStackBlock as TechStackType } from "@/lib/types"
import { motion } from "framer-motion"

export function TechStackBlock({ data }: { data: TechStackType }) {
    return (
        <section className="py-20 border-y border-border/40 bg-primary/5">
            <div className="container mx-auto px-6 mb-12 text-center">
                <h2 className="text-2xl md:text-3xl font-bold theme-text opacity-90">
                    {data.title}
                </h2>
            </div>

            {/* Infinite Marquee Effect with Fade Mask */}
            <div className="relative flex overflow-x-hidden mask-gradient-x">
                {/* Left Fade */}
                <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-background to-transparent z-10" />
                {/* Right Fade */}
                <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-background to-transparent z-10" />

                <div className="py-8 animate-marquee whitespace-nowrap flex gap-6 items-center w-max">
                    {/* Render enough items to exceed screen width significantly */}
                    {[...data.technologies, ...data.technologies, ...data.technologies, ...data.technologies].map((tech, i) => (
                        <div key={i} className="inline-flex items-center justify-center bg-secondary/30 backdrop-blur-sm border border-secondary px-8 py-4 rounded-full min-w-[160px] hover:bg-primary/10 hover:border-primary/50 transition-colors duration-300">
                            <span className="text-xl font-bold theme-text uppercase tracking-wider opacity-80">
                                {tech}
                            </span>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}
