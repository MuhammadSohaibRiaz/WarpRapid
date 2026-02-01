"use client"

import { motion, useScroll, useSpring, useTransform, AnimatePresence } from "framer-motion"
import { LucideIcon, Zap } from "lucide-react"

interface GlobalChronometerProps {
    activeCategory: {
        title: string
        description: string
        icon: LucideIcon
    }
    index: number
    totalCategories: number
    globalTargetRef: React.RefObject<HTMLElement>
}

export function GlobalChronometer({ activeCategory, index, totalCategories, globalTargetRef }: GlobalChronometerProps) {
    const { scrollYProgress } = useScroll({
        target: globalTargetRef,
        offset: ["start start", "end end"]
    })

    const scaleY = useSpring(scrollYProgress, {
        stiffness: 100,
        damping: 30,
        restDelta: 0.001
    })

    const pathLength = useSpring(scrollYProgress, { stiffness: 100, damping: 30 })
    const rotate = useTransform(scrollYProgress, [0, 1], [0, 360])

    const Icon = activeCategory.icon || Zap

    return (
        <aside className="hidden lg:flex w-[360px] sticky top-24 h-[calc(100vh-120px)] border-r border-border/30 z-40 flex-col justify-center px-10 space-y-12 shrink-0">
            {/* Visual Progress Indicator (The "Unified Watch") */}
            <div className="relative w-32 h-32 mx-auto shrink-0">
                <svg className="absolute inset-0 w-full h-full -rotate-90" viewBox="0 0 100 100">
                    <circle
                        cx="50"
                        cy="50"
                        r="45"
                        className="stroke-muted/20 fill-none"
                        strokeWidth="1"
                    />
                    <motion.circle
                        cx="50"
                        cy="50"
                        r="45"
                        className="stroke-primary fill-none shadow-xl"
                        strokeWidth="3"
                        style={{ pathLength }}
                        strokeLinecap="round"
                    />
                </svg>

                {/* Icon in Center - Dynamically swapping with animation */}
                <div className="absolute inset-0 flex items-center justify-center">
                    <motion.div
                        style={{ rotate }}
                        className="absolute inset-0 w-full h-full pointer-events-none"
                    >
                        {/* Decorative small notches */}
                        {[...Array(12)].map((_, i) => (
                            <div
                                key={i}
                                className="absolute top-0 left-1/2 -translate-x-1/2 w-0.5 h-2 bg-primary/20"
                                style={{ transform: `rotate(${i * 30}deg) translateY(-40px)` }}
                            />
                        ))}
                    </motion.div>

                    <AnimatePresence mode="wait">
                        <motion.div
                            key={activeCategory.title}
                            initial={{ scale: 0.5, opacity: 0, rotate: -45 }}
                            animate={{ scale: 1, opacity: 1, rotate: 0 }}
                            exit={{ scale: 0.5, opacity: 0, rotate: 45 }}
                            transition={{ duration: 0.4, ease: "easeOut" }}
                            className="w-16 h-16 rounded-[2rem] bg-gradient-to-br from-primary to-purple-600 flex items-center justify-center text-white shadow-2xl shadow-primary/20 z-10"
                        >
                            <Icon className="w-8 h-8" />
                        </motion.div>
                    </AnimatePresence>
                </div>
            </div>

            {/* Dynamic Text Labels */}
            <div className="space-y-6 text-left max-w-[240px]">
                <AnimatePresence mode="wait">
                    <motion.div
                        key={activeCategory.title}
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        exit={{ y: -20, opacity: 0 }}
                        transition={{ duration: 0.4, ease: "easeOut" }}
                        className="space-y-4"
                    >
                        <div className="space-y-1">
                            <span className="text-[10px] font-black uppercase tracking-[0.3em] text-primary">
                                Pillar 0{index + 1}
                            </span>
                            <h3 className="text-3xl font-black theme-text tracking-tighter leading-none">
                                {activeCategory.title}
                            </h3>
                        </div>
                        <p className="text-sm text-muted-foreground leading-relaxed">
                            {activeCategory.description}
                        </p>
                    </motion.div>
                </AnimatePresence>

                {/* Milestone Dots */}
                <div className="flex gap-2 pt-4">
                    {[...Array(totalCategories)].map((_, i) => (
                        <div
                            key={i}
                            className={`h-1 rounded-full transition-all duration-500 ${i === index ? "w-8 bg-primary" : "w-2 bg-muted/40"
                                }`}
                        />
                    ))}
                </div>
            </div>

            {/* Global Vertical Progress Line */}
            <div className="absolute top-[10%] bottom-[10%] left-1/2 -translate-x-1/2 w-px bg-border/20 -z-10">
                <motion.div
                    style={{ scaleY }}
                    className="w-full h-full bg-gradient-to-b from-primary via-purple-500 to-transparent origin-top"
                />
            </div>
        </aside>
    )
}
