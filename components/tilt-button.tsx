"use client"

import { useRef, useState } from "react"
import { motion, useMotionValue, useSpring, useTransform, HTMLMotionProps } from "framer-motion"
import { cn } from "@/lib/utils"

interface TiltButtonProps extends HTMLMotionProps<"button"> {
    children: React.ReactNode
    className?: string
    tiltIntensity?: number
}

export function TiltButton({
    children,
    className,
    tiltIntensity = 15,
    ...props
}: TiltButtonProps) {
    const ref = useRef<HTMLButtonElement>(null)
    const [isHovered, setIsHovered] = useState(false)

    // Motion values for mouse position
    const x = useMotionValue(0)
    const y = useMotionValue(0)

    // Spring configuration for smooth animations
    const springConfig = { damping: 20, stiffness: 300 }
    const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [tiltIntensity, -tiltIntensity]), springConfig)
    const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-tiltIntensity, tiltIntensity]), springConfig)

    // Handle mouse move
    const handleMouseMove = (event: React.MouseEvent<HTMLButtonElement>) => {
        if (!ref.current) return

        const rect = ref.current.getBoundingClientRect()
        const centerX = rect.left + rect.width / 2
        const centerY = rect.top + rect.height / 2

        // Calculate normalized position (-0.5 to 0.5)
        const mouseX = (event.clientX - centerX) / (rect.width / 2)
        const mouseY = (event.clientY - centerY) / (rect.height / 2)

        x.set(mouseX)
        y.set(mouseY)
    }

    // Reset on mouse leave
    const handleMouseLeave = () => {
        setIsHovered(false)
        x.set(0)
        y.set(0)
    }

    return (
        <motion.button
            ref={ref}
            onMouseMove={handleMouseMove}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={handleMouseLeave}
            style={{
                rotateX,
                rotateY,
                transformStyle: "preserve-3d",
            }}
            whileTap={{ scale: 0.95 }}
            className={cn(
                "relative overflow-hidden rounded-xl transition-all duration-300",
                className
            )}
            {...props}
        >
            {/* Shine effect on hover */}
            <motion.div
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                style={{
                    transform: "translateX(-100%)",
                }}
                animate={{
                    transform: isHovered ? "translateX(100%)" : "translateX(-100%)",
                }}
                transition={{ duration: 0.6, ease: "easeInOut" }}
            />

            {/* Glow effect */}
            <motion.div
                className="absolute -inset-1 bg-gradient-to-r from-primary via-purple-500 to-pink-500 rounded-xl blur-lg opacity-0"
                animate={{
                    opacity: isHovered ? 0.7 : 0,
                }}
                transition={{ duration: 0.3 }}
            />

            {/* Content */}
            <span
                className="relative z-10 block"
                style={{
                    transform: "translateZ(20px)",
                }}
            >
                {children}
            </span>
        </motion.button>
    )
}
