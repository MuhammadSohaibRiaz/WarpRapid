"use client"

import { ProcessBlock as ProcessBlockType } from "@/lib/types"
import { motion } from "framer-motion"

export function ProcessBlock({ data }: { data: ProcessBlockType }) {
    return (
        <section className="py-20">
            <div className="container mx-auto px-6">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-4xl font-bold mb-4 theme-text">
                        {data.title}
                    </h2>
                    <p className="text-muted-foreground">How we ensure success, step by step.</p>
                </div>

                <div className="relative grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {/* Connecting Line (Desktop) */}
                    <div className="hidden lg:block absolute top-12 left-[12%] right-[12%] h-0.5 bg-gradient-to-r from-transparent via-primary/30 to-transparent" />

                    {data.steps.map((step, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.2 }}
                            className="relative flex flex-col items-center text-center group"
                        >
                            {/* Step Number Bubble */}
                            <div className="w-24 h-24 rounded-full bg-background border-4 border-primary/10 flex items-center justify-center mb-6 z-10 group-hover:border-primary/50 transition-colors shadow-lg shadow-primary/5">
                                <span className="text-3xl font-bold text-primary">{index + 1}</span>
                            </div>

                            <h3 className="text-xl font-bold mb-3 theme-text">{step.title}</h3>
                            <p className="text-sm text-muted-foreground max-w-[200px]">{step.description}</p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    )
}
