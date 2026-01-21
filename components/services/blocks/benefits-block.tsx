"use client"

import { BenefitBlock as BenefitBlockType } from "@/lib/types"
import { motion } from "framer-motion"
import { Check } from "lucide-react"

export function BenefitsBlock({ data }: { data: BenefitBlockType }) {
    return (
        <section className="py-20 bg-gradient-to-b from-background to-primary/5">
            <div className="container mx-auto px-6">
                <div className="max-w-4xl mx-auto">
                    <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center theme-text">
                        {data.title}
                    </h2>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {data.items.map((item, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, x: -20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                auth
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1 }}
                                className="flex gap-4 p-6 bg-background rounded-xl border border-border hover:border-primary/30 transition-colors"
                            >
                                <div className="mt-1 flex-shrink-0 w-8 h-8 rounded-full bg-green-500/10 flex items-center justify-center">
                                    <Check className="w-5 h-5 text-green-500" />
                                </div>
                                <div>
                                    <h3 className="font-bold text-lg mb-2 theme-text">{item.title}</h3>
                                    <p className="text-muted-foreground text-sm">{item.description}</p>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    )
}
