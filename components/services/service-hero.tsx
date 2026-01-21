"use client"

import { motion } from "framer-motion"
import { ArrowRight, LucideIcon } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"

interface ServiceHeroProps {
    title: string
    subtitle: string
    description: string
    iconElement: React.ReactNode
}

export function ServiceHero({ title, subtitle, description, iconElement }: ServiceHeroProps) {
    return (
        <section className="relative min-h-[80vh] flex items-center justify-center overflow-hidden pt-24 pb-32">
            {/* Background Effects */}
            <div className="absolute inset-0 z-0">
                <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-[128px] animate-pulse" />
                <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/20 rounded-full blur-[128px] animate-pulse delay-1000" />
                <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-[0.03]" />
            </div>

            <div className="container mx-auto px-6 relative z-10 text-center">
                <motion.div
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.5 }}
                    className="mx-auto w-16 h-16 md:w-20 md:h-20 bg-gradient-to-br from-background to-primary/10 rounded-2xl border border-primary/20 flex items-center justify-center mb-6 shadow-2xl shadow-primary/20"
                >
                    {iconElement}
                </motion.div>

                <motion.h1
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.2 }}
                    className="text-4xl md:text-5xl lg:text-7xl font-extrabold tracking-tight mb-4 theme-text"
                >
                    {title}
                </motion.h1>

                <motion.p
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.3 }}
                    className="text-lg md:text-xl font-medium text-primary mb-6"
                >
                    {subtitle}
                </motion.p>

                <motion.p
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.4 }}
                    className="max-w-2xl mx-auto text-muted-foreground text-lg leading-relaxed mb-8"
                >
                    {description}
                </motion.p>

                <motion.div
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.5 }}
                    className="flex flex-col sm:flex-row gap-4 justify-center"
                >
                    <Link href="/contact">
                        <Button size="lg" className="rounded-full px-8 h-12 text-lg font-semibold shadow-lg hover:shadow-primary/25 transition-all">
                            Start Your Project
                            <ArrowRight className="ml-2 w-5 h-5" />
                        </Button>
                    </Link>
                    <Link href="/case-studies">
                        <Button variant="outline" size="lg" className="rounded-full px-8 h-12 text-lg font-medium backdrop-blur-sm">
                            View Work
                        </Button>
                    </Link>
                </motion.div>
            </div>
        </section>
    )
}
