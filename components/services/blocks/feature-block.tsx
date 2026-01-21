"use client"

import { FeatureBlock as FeatureBlockType } from "@/lib/types"
import { motion } from "framer-motion"
import { CheckCircle2, Zap, Layers, ShieldCheck, Globe, Database } from "lucide-react"

// Map of potential icon names to components if needed, or use a default
const iconMap: any = {
    default: CheckCircle2,
    zap: Zap,
    layers: Layers,
    shield: ShieldCheck,
    globe: Globe,
    database: Database
}

export function FeatureBlock({ data }: { data: FeatureBlockType }) {
    return (
        <section className="py-20 relative overflow-hidden">
            <div className="container mx-auto px-6">
                <div className="text-center max-w-3xl mx-auto mb-16">
                    <h2 className="text-3xl md:text-4xl font-bold mb-4 theme-text animate-gradient">
                        {data.title}
                    </h2>
                    <div className="h-1 w-20 bg-primary mx-auto rounded-full" />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {data.items.map((item, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                            className="bg-card border border-border/40 p-8 rounded-xl hover:border-primary/50 transition-all duration-300 hover:shadow-2xl hover:shadow-primary/5 group relative overflow-hidden"
                        >
                            {/* Hover Gradient Background */}
                            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                            <div className="relative z-10">
                                <div className="mb-6 p-3 bg-primary/10 rounded-lg w-fit group-hover:scale-110 transition-transform duration-300">
                                    <CheckCircle2 className="w-6 h-6 text-primary" />
                                </div>
                                <h3 className="text-xl font-bold mb-3 theme-text group-hover:text-primary transition-colors">{item.title}</h3>
                                <p className="text-muted-foreground leading-relaxed">{item.description}</p>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    )
}
