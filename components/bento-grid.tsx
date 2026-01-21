"use client"

import { motion } from "framer-motion"
import { cn } from "@/lib/utils"
import { ReactNode } from "react"

interface BentoGridProps {
    children: ReactNode
    className?: string
}

interface BentoCardProps {
    children: ReactNode
    className?: string
    span?: "1x1" | "2x1" | "1x2" | "2x2"
    gradient?: boolean
    glassmorphism?: boolean
}

export function BentoGrid({ children, className }: BentoGridProps) {
    return (
        <div
            className={cn(
                "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 auto-rows-[minmax(200px,auto)]",
                className
            )}
        >
            {children}
        </div>
    )
}

export function BentoCard({
    children,
    className,
    span = "1x1",
    gradient = false,
    glassmorphism = false,
}: BentoCardProps) {
    const spanClasses = {
        "1x1": "",
        "2x1": "md:col-span-2",
        "1x2": "md:row-span-2",
        "2x2": "md:col-span-2 md:row-span-2",
    }

    const containerVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.5,
            },
        },
    }

    return (
        <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            whileHover={{ scale: 1.02, y: -4 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
            className={cn(
                "group relative overflow-hidden rounded-3xl border border-border/50 p-6 md:p-8",
                spanClasses[span],
                glassmorphism
                    ? "bg-background/40 backdrop-blur-xl"
                    : "bg-gradient-to-br from-muted/50 to-muted/30",
                gradient && "bg-gradient-to-br from-primary/10 via-purple-500/10 to-pink-500/10",
                className
            )}
        >
            {/* Decorative gradient overlay */}
            {gradient && (
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            )}

            {/* Glow effect on hover */}
            <motion.div
                className="absolute -inset-1 bg-gradient-to-r from-primary/20 via-purple-500/20 to-pink-500/20 blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                initial={{ opacity: 0 }}
                whileHover={{ opacity: 1 }}
            />

            {/* Content */}
            <div className="relative z-10">{children}</div>

            {/* Shine effect on hover */}
            <motion.div
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent"
                initial={{ x: "-100%" }}
                whileHover={{ x: "100%" }}
                transition={{ duration: 0.6, ease: "easeInOut" }}
            />
        </motion.div>
    )
}
