"use client"

import { motion } from "framer-motion"
import { servicesData } from "@/lib/services-data"
import { BentoGrid, BentoCard } from "./bento-grid"
import { ArrowRight } from "lucide-react"
import Link from "next/link"
import { TiltButton } from "./tilt-button"

export function ServicesBento() {
    // Get the first 8 services for the grid
    const serviceList = Object.entries(servicesData).slice(0, 8)

    return (
        <section id="services" className="py-24 relative overflow-hidden theme-bg theme-transition">
            <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))]" />

            <div className="container mx-auto px-4 relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="text-center mb-16"
                >
                    <h2 className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent theme-gradient-text mb-6">
                        Our Expertise
                    </h2>
                    <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                        Comprehensive software solutions tailored to your business needs, built with cutting-edge technology.
                    </p>
                </motion.div>

                <BentoGrid>
                    {serviceList.map(([slug, service], index) => {
                        const Icon = service.icon
                        // Assign spans for varied layout
                        const span = index === 0 ? "2x1" : index === 3 ? "2x2" : "1x1"
                        const colors = [
                            "from-blue-500/10 to-cyan-500/10 hover:border-blue-500/30",
                            "from-purple-500/10 to-pink-500/10 hover:border-purple-500/30",
                            "from-emerald-500/10 to-teal-500/10 hover:border-emerald-500/30",
                            "from-orange-500/10 to-amber-500/10 hover:border-orange-500/30",
                            "from-indigo-500/10 to-purple-500/10 hover:border-indigo-500/30",
                            "from-rose-500/10 to-red-500/10 hover:border-rose-500/30",
                            "from-cyan-500/10 to-blue-500/10 hover:border-cyan-500/30",
                            "from-violet-500/10 to-purple-500/10 hover:border-violet-500/30",
                        ]

                        return (
                            <BentoCard
                                key={slug}
                                span={span}
                                className={`bg-gradient-to-br ${colors[index % colors.length]} backdrop-blur-xl border-border/10 transition-all duration-500 group`}
                            >
                                <Link href={`/services/${slug}`} className="h-full block">
                                    <div className="h-full flex flex-col justify-between">
                                        <div className="mb-4">
                                            <div className="p-3 rounded-xl bg-background/50 w-fit mb-4 text-primary group-hover:scale-110 group-hover:bg-primary group-hover:text-white transition-all duration-500">
                                                <Icon className="w-6 h-6" />
                                            </div>
                                            <h3 className="text-xl font-bold mb-2 theme-text group-hover:text-primary transition-colors">{service.title}</h3>
                                            <p className="text-muted-foreground text-sm leading-relaxed line-clamp-3">
                                                {service.shortDescription}
                                            </p>
                                        </div>

                                        <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-primary opacity-0 group-hover:opacity-100 transition-all translate-x-[-10px] group-hover:translate-x-0">
                                            Learn More <ArrowRight className="w-3 h-3" />
                                        </div>
                                    </div>
                                </Link>
                            </BentoCard>
                        )
                    })}

                    {/* Final Explore Card */}
                    <BentoCard span="1x1" className="bg-gradient-to-br from-primary via-purple-600 to-pink-600 text-white flex flex-col justify-center items-center text-center p-8 border-none shadow-2xl shadow-primary/20">
                        <h3 className="text-2xl font-bold mb-4">Discover More</h3>
                        <p className="text-sm text-white/80 mb-6 font-medium">Explore our full suite of 9+ engineering specialized services.</p>
                        <Link href="/services" className="w-full">
                            <TiltButton className="w-full bg-white text-primary py-3 px-6 font-bold hover:bg-white/90 flex items-center justify-center gap-2 shadow-xl">
                                View All Services <ArrowRight className="w-4 h-4" />
                            </TiltButton>
                        </Link>
                    </BentoCard>
                </BentoGrid>
            </div>
        </section>
    )
}
