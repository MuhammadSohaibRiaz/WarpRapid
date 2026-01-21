"use client"

import { motion } from "framer-motion"
import { Quote } from "lucide-react"
import { cn } from "@/lib/utils"

interface PullQuoteProps {
    quote: string
    author?: string
    className?: string
    variant?: "default" | "gradient" | "minimal"
}

export function PullQuote({
    quote,
    author,
    className,
    variant = "default",
}: PullQuoteProps) {
    const variants = {
        default: {
            container: "bg-gradient-to-br from-primary/10 to-purple-500/10 border-l-4 border-l-primary",
            quote: "text-foreground",
            author: "text-primary",
        },
        gradient: {
            container: "bg-gradient-to-br from-primary/20 via-purple-500/10 to-pink-500/20 border border-primary/30",
            quote: "bg-clip-text text-transparent bg-gradient-to-r from-primary via-purple-500 to-pink-500",
            author: "text-primary",
        },
        minimal: {
            container: "border-l-4 border-l-muted-foreground/30",
            quote: "text-muted-foreground",
            author: "text-foreground",
        },
    }

    const style = variants[variant]

    return (
        <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className={cn("my-12", className)}
        >
            <blockquote
                className={cn(
                    "relative rounded-r-2xl p-8 md:p-10 backdrop-blur-sm shadow-xl overflow-hidden group",
                    style.container
                )}
            >
                {/* Decorative Background Pattern */}
                <div className="absolute inset-0 opacity-5">
                    <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center" />
                </div>

                {/* Animated Glow Effect */}
                <motion.div
                    className="absolute -inset-1 bg-gradient-to-r from-primary/20 via-purple-500/20 to-pink-500/20 blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-700"
                    animate={{
                        scale: [1, 1.05, 1],
                    }}
                    transition={{
                        duration: 3,
                        repeat: Infinity,
                        ease: "easeInOut",
                    }}
                />

                <div className="relative space-y-6">
                    {/* Quote Icon */}
                    <motion.div
                        initial={{ scale: 0, rotate: -180 }}
                        whileInView={{ scale: 1, rotate: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                        className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-primary/10 border border-primary/20"
                    >
                        <Quote className="w-7 h-7 text-primary" />
                    </motion.div>

                    {/* Quote Text */}
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.3, duration: 0.6 }}
                        className={cn(
                            "text-xl md:text-2xl lg:text-3xl font-bold leading-relaxed italic",
                            style.quote
                        )}
                    >
                        "{quote}"
                    </motion.p>

                    {/* Author Attribution */}
                    {author && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.5, duration: 0.5 }}
                            className="flex items-center gap-3 pt-4"
                        >
                            <div className="h-px flex-1 bg-gradient-to-r from-primary/50 to-transparent" />
                            <cite className={cn("not-italic font-semibold text-base md:text-lg", style.author)}>
                                {author}
                            </cite>
                        </motion.div>
                    )}
                </div>

                {/* Decorative Corner Accent */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-primary/10 to-transparent rounded-bl-full opacity-50" />
            </blockquote>
        </motion.div>
    )
}
