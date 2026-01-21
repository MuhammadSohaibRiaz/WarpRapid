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
    const containerRef = useRef<HTMLDivElement>(null)
    const particlesRef = useRef<Particle[]>([])
    const animationFrameRef = useRef<number>()
    const isVisibleRef = useRef(true)
    const { theme, resolvedTheme } = useTheme()

    useEffect(() => {
        const canvas = canvasRef.current
        if (!canvas) return

        const ctx = canvas.getContext("2d", { alpha: true }) // Optimize context
        if (!ctx) return

        // Intersection Observer to pause animation
        const observer = new IntersectionObserver(
            ([entry]) => {
                isVisibleRef.current = entry.isIntersecting
            },
            { threshold: 0.1 }
        )

        if (canvas) observer.observe(canvas)

        // Set canvas size
        const resizeCanvas = () => {
            if (!canvas) return
            const dpr = window.devicePixelRatio || 1
            const width = window.innerWidth
            const height = window.innerHeight
            canvas.width = width * dpr
            canvas.height = height * dpr
            canvas.style.width = `${width}px`
            canvas.style.height = `${height}px`
            ctx.scale(dpr, dpr)
        }

        resizeCanvas()
        window.addEventListener("resize", resizeCanvas)

        // Initialize particles
        const initParticles = () => {
            particlesRef.current = []
            const width = window.innerWidth
            const count = width < 768 ? 15 : particleCount

            for (let i = 0; i < count; i++) {
                particlesRef.current.push({
                    x: Math.random() * width,
                    y: Math.random() * window.innerHeight,
                    vx: (Math.random() - 0.5) * 0.4,
                    vy: (Math.random() - 0.5) * 0.4,
                    radius: Math.random() * 1.5 + 0.5,
                    opacity: Math.random() * 0.4 + 0.1,
                })
            }
        }
        initParticles()

        const getParticleColor = () => {
            const currentTheme = resolvedTheme || theme
            return currentTheme === "dark"
                ? { primary: "147, 51, 234", secondary: "59, 130, 246", accent: "236, 72, 153" }
                : { primary: "99, 102, 241", secondary: "59, 130, 246", accent: "168, 85, 247" }
        }

        const colors = getParticleColor()

        const animate = () => {
            if (!isVisibleRef.current) {
                animationFrameRef.current = requestAnimationFrame(animate)
                return
            }

            ctx.clearRect(0, 0, window.innerWidth, window.innerHeight)

            const particles = particlesRef.current
            const count = particles.length
            const width = window.innerWidth
            const height = window.innerHeight
            const centerX = width / 2
            const centerY = height / 2

            for (let i = 0; i < count; i++) {
                const p = particles[i]

                // CENTER AVOIDANCE: Subtle push away from middle of screen
                const dxCenter = p.x - centerX
                const dyCenter = p.y - centerY
                const distToCenter = Math.sqrt(dxCenter * dxCenter + dyCenter * dyCenter)
                if (distToCenter < 300) {
                    const force = (1 - distToCenter / 300) * 0.05
                    p.vx += dxCenter * force * 0.01
                    p.vy += dyCenter * force * 0.01
                }

                p.x += p.vx
                p.y += p.vy

                // Speed limit
                p.vx = Math.max(-0.6, Math.min(0.6, p.vx))
                p.vy = Math.max(-0.6, Math.min(0.6, p.vy))

                if (p.x < 0 || p.x > width) p.vx *= -1
                if (p.y < 0 || p.y > height) p.vy *= -1

                const colorKey = i % 3 === 0 ? colors.primary : i % 3 === 1 ? colors.secondary : colors.accent

                // VIVID GLOW: Higher opacity and larger area for that Matrix feel
                const gradient = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.radius * 4)
                gradient.addColorStop(0, `rgba(${colorKey}, ${p.opacity * 1.5})`) // 50% more vivid
                gradient.addColorStop(1, `rgba(${colorKey}, 0)`)

                ctx.fillStyle = gradient
                ctx.beginPath()
                ctx.arc(p.x, p.y, p.radius * 4, 0, Math.PI * 2)
                ctx.fill()

                // VIVID CONNECTIONS
                for (let j = i + 1; j < count; j++) {
                    const p2 = particles[j]
                    const dx = p.x - p2.x
                    const dy = p.y - p2.y
                    const distSq = dx * dx + dy * dy

                    if (distSq < 32400) { // 180px - Longer connections for full visibility
                        const distance = Math.sqrt(distSq)
                        const opacity = (1 - distance / 180) * 0.3 // Increased from 0.2
                        ctx.strokeStyle = `rgba(${colors.primary}, ${opacity})`
                        ctx.lineWidth = 0.8 // Slightly thicker
                        ctx.beginPath()
                        ctx.moveTo(p.x, p.y)
                        ctx.lineTo(p2.x, p2.y)
                        ctx.stroke()
                    }
                }
            }

            animationFrameRef.current = requestAnimationFrame(animate)
        }

        animate()

        return () => {
            window.removeEventListener("resize", resizeCanvas)
            observer.disconnect()
            if (animationFrameRef.current) cancelAnimationFrame(animationFrameRef.current)
        }
    }, [particleCount, theme, resolvedTheme])

    return (
        <canvas
            ref={canvasRef}
            className={`absolute inset-0 pointer-events-none ${className}`}
            style={{ opacity: 0.8 }}
        />
    )
}
