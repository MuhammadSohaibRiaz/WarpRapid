"use client"

import { useEffect, useRef } from "react"
import { useTheme } from "next-themes"

interface Particle {
    x: number
    y: number
    vx: number
    vy: number
    radius: number
    opacity: number
}

interface ParticleBackgroundProps {
    particleCount?: number
    className?: string
}

export function ParticleBackground({
    particleCount = 20,
    className = "",
}: ParticleBackgroundProps) {
    const canvasRef = useRef<HTMLCanvasElement>(null)
    const particlesRef = useRef<Particle[]>([])
    const animationFrameRef = useRef<number>()
    const { theme, resolvedTheme } = useTheme()

    useEffect(() => {
        const canvas = canvasRef.current
        if (!canvas) return

        const ctx = canvas.getContext("2d")
        if (!ctx) return

        // Set canvas size
        const resizeCanvas = () => {
            canvas.width = window.innerWidth
            canvas.height = window.innerHeight
        }
        resizeCanvas()
        window.addEventListener("resize", resizeCanvas)

        // Initialize particles
        const initParticles = () => {
            particlesRef.current = []
            // Reduce count on mobile
            const count = window.innerWidth < 768 ? Math.floor(particleCount / 2) : particleCount

            for (let i = 0; i < count; i++) {
                particlesRef.current.push({
                    x: Math.random() * canvas.width,
                    y: Math.random() * canvas.height,
                    vx: (Math.random() - 0.5) * 0.5,
                    vy: (Math.random() - 0.5) * 0.5,
                    radius: Math.random() * 2 + 1,
                    opacity: Math.random() * 0.5 + 0.2,
                })
            }
        }
        initParticles()

        // Get theme-aware colors
        const getParticleColor = () => {
            const currentTheme = resolvedTheme || theme
            if (currentTheme === "dark") {
                return {
                    primary: "147, 51, 234", // Purple
                    secondary: "59, 130, 246", // Blue
                    accent: "236, 72, 153", // Pink
                }
            } else {
                return {
                    primary: "99, 102, 241", // Indigo
                    secondary: "59, 130, 246", // Blue
                    accent: "168, 85, 247", // Purple
                }
            }
        }

        // Animation loop
        const animate = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height)
            const colors = getParticleColor()

            particlesRef.current.forEach((particle, index) => {
                // Update position
                particle.x += particle.vx
                particle.y += particle.vy

                // Bounce off edges
                if (particle.x < 0 || particle.x > canvas.width) particle.vx *= -1
                if (particle.y < 0 || particle.y > canvas.height) particle.vy *= -1

                // Keep particles in bounds
                particle.x = Math.max(0, Math.min(canvas.width, particle.x))
                particle.y = Math.max(0, Math.min(canvas.height, particle.y))

                // Draw particle with gradient
                const gradient = ctx.createRadialGradient(
                    particle.x,
                    particle.y,
                    0,
                    particle.x,
                    particle.y,
                    particle.radius * 3
                )

                // Cycle through colors based on index
                const colorKey =
                    index % 3 === 0
                        ? colors.primary
                        : index % 3 === 1
                            ? colors.secondary
                            : colors.accent

                gradient.addColorStop(0, `rgba(${colorKey}, ${particle.opacity})`)
                gradient.addColorStop(1, `rgba(${colorKey}, 0)`)

                ctx.fillStyle = gradient
                ctx.beginPath()
                ctx.arc(particle.x, particle.y, particle.radius * 3, 0, Math.PI * 2)
                ctx.fill()

                // Draw connections between nearby particles
                particlesRef.current.forEach((otherParticle, otherIndex) => {
                    if (index === otherIndex) return

                    const dx = particle.x - otherParticle.x
                    const dy = particle.y - otherParticle.y
                    const distance = Math.sqrt(dx * dx + dy * dy)

                    if (distance < 150) {
                        const opacity = (1 - distance / 150) * 0.2
                        ctx.strokeStyle = `rgba(${colors.primary}, ${opacity})`
                        ctx.lineWidth = 0.5
                        ctx.beginPath()
                        ctx.moveTo(particle.x, particle.y)
                        ctx.lineTo(otherParticle.x, otherParticle.y)
                        ctx.stroke()
                    }
                })
            })

            animationFrameRef.current = requestAnimationFrame(animate)
        }

        animate()

        return () => {
            window.removeEventListener("resize", resizeCanvas)
            if (animationFrameRef.current) {
                cancelAnimationFrame(animationFrameRef.current)
            }
        }
    }, [particleCount, theme, resolvedTheme])

    return (
        <canvas
            ref={canvasRef}
            className={`fixed inset-0 pointer-events-none ${className}`}
            style={{ opacity: 0.6 }}
        />
    )
}
