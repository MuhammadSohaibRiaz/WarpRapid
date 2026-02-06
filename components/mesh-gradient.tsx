"use client"

import { motion, useReducedMotion } from "framer-motion"
import { useEffect, useState } from "react"

interface MeshGradientProps {
    className?: string
    animate?: boolean
}

export function MeshGradient({ className = "", animate = true }: MeshGradientProps) {
    const [mounted, setMounted] = useState(false)
    const shouldReduceMotion = useReducedMotion()

    // Disable animation if reduced motion is requested
    const shouldAnimate = animate && !shouldReduceMotion

    useEffect(() => {
        setMounted(true)
    }, [])

    // Instead of returning null, we render immediately but fade in
    // This prevents a blank flash while keeping hydration safe

    return (
        <div className={`absolute inset-0 overflow-hidden ${className}`}>
            {/* Base gradient layers */}
            <motion.div
                className="absolute inset-0 opacity-30 will-change-transform"
                style={{
                    background: `
            radial-gradient(at 27% 37%, hsla(215, 98%, 61%, 0.3) 0px, transparent 50%),
            radial-gradient(at 97% 21%, hsla(125, 98%, 72%, 0.2) 0px, transparent 50%),
            radial-gradient(at 52% 99%, hsla(354, 98%, 61%, 0.2) 0px, transparent 50%),
            radial-gradient(at 10% 29%, hsla(256, 96%, 67%, 0.3) 0px, transparent 50%),
            radial-gradient(at 97% 96%, hsla(38, 60%, 74%, 0.2) 0px, transparent 50%),
            radial-gradient(at 33% 50%, hsla(222, 67%, 73%, 0.3) 0px, transparent 50%),
            radial-gradient(at 79% 53%, hsla(343, 68%, 79%, 0.2) 0px, transparent 50%)
          `,
                }}
                animate={
                    shouldAnimate
                        ? {
                            scale: [1, 1.1, 1],
                            rotate: [0, 5, 0],
                        }
                        : {}
                }
                transition={{
                    duration: 20,
                    repeat: Infinity,
                    ease: "linear",
                }}
            />

            {/* Animated gradient orbs */}
            <motion.div
                className="absolute top-0 -left-4 w-72 h-72 bg-purple-500 rounded-full filter blur-3xl opacity-20"
                animate={
                    shouldAnimate
                        ? {
                            x: [0, 100, 0],
                            y: [0, 50, 0],
                            scale: [1, 1.2, 1],
                        }
                        : {}
                }
                transition={{
                    duration: 15,
                    repeat: Infinity,
                    ease: "easeInOut",
                }}
            />

            <motion.div
                className="absolute top-0 -right-4 w-72 h-72 bg-primary rounded-full filter blur-3xl opacity-20"
                animate={
                    shouldAnimate
                        ? {
                            x: [0, -100, 0],
                            y: [0, 100, 0],
                            scale: [1, 1.3, 1],
                        }
                        : {}
                }
                transition={{
                    duration: 18,
                    repeat: Infinity,
                    ease: "easeInOut",
                }}
            />

            <motion.div
                className="absolute -bottom-8 left-20 w-72 h-72 bg-pink-500 rounded-full filter blur-3xl opacity-20"
                animate={
                    shouldAnimate
                        ? {
                            x: [0, -50, 0],
                            y: [0, -100, 0],
                            scale: [1, 1.1, 1],
                        }
                        : {}
                }
                transition={{
                    duration: 12,
                    repeat: Infinity,
                    ease: "easeInOut",
                }}
            />

            {/* Noise texture overlay */}
            <div
                className="absolute inset-0 opacity-[0.015]"
                style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
                }}
            />
        </div>
    )
}
