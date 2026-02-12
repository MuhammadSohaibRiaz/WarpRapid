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
        const targetFPS = 30
        const frameInterval = 1000 / targetFPS
        let lastFrameTime = 0

        const animate = (currentTime: number) => {
            if (!isVisibleRef.current) {
                animationFrameRef.current = requestAnimationFrame(animate)
                return
            }

            // Framerate throttling for mobile performance
            const elapsedSinceLastFrame = currentTime - lastFrameTime
            if (elapsedSinceLastFrame < frameInterval) {
                animationFrameRef.current = requestAnimationFrame(animate)
                return
            }
            lastFrameTime = currentTime - (elapsedSinceLastFrame % frameInterval)

            const width = window.innerWidth
            const height = window.innerHeight

            ctx.clearRect(0, 0, width, height)

            const particles = particlesRef.current
            const count = particles.length
            const centerX = width / 2
            const centerY = height / 2

            // Pre-calculate colors outside the loop
            const colorKeys = [colors.primary, colors.secondary, colors.accent]

            for (let i = 0; i < count; i++) {
                const p = particles[i]

                // CENTER AVOIDANCE: Optimized math
                const dxCenter = p.x - centerX
                const dyCenter = p.y - centerY
                const distSqCenter = dxCenter * dxCenter + dyCenter * dyCenter

                // Only apply force if relatively close (avoiding sqrt where possible)
                if (distSqCenter < 90000) { // 300px squared
                    const distToCenter = Math.sqrt(distSqCenter)
                    const force = (1 - distToCenter / 300) * 0.0005
                    p.vx += dxCenter * force
                    p.vy += dyCenter * force
                }

                p.x += p.vx
                p.y += p.vy

                // Speed limit
                if (p.vx > 0.6) p.vx = 0.6
                else if (p.vx < -0.6) p.vx = -0.6
                if (p.vy > 0.6) p.vy = 0.6
                else if (p.vy < -0.6) p.vy = -0.6

                if (p.x < 0 || p.x > width) p.vx *= -1
                if (p.y < 0 || p.y > height) p.vy *= -1

                const colorKey = colorKeys[i % 3]

                // OPTIMIZED GLOW: Simplified drawing (circles instead of complex radial gradients for every particle)
                ctx.beginPath()
                ctx.arc(p.x, p.y, p.radius * 2, 0, Math.PI * 2)
                ctx.fillStyle = `rgba(${colorKey}, ${p.opacity * 2})`
                ctx.fill()

                // CONNECTIONS: Limited search distance
                for (let j = i + 1; j < count; j++) {
                    const p2 = particles[j]
                    const dx = p.x - p2.x
                    const dy = p.y - p2.y
                    const distSq = dx * dx + dy * dy

                    if (distSq < 22500) { // 150px (reduced from 180px for performance)
                        const distance = Math.sqrt(distSq)
                        const opacity = (1 - distance / 150) * 0.2
                        ctx.strokeStyle = `rgba(${colors.primary}, ${opacity})`
                        ctx.lineWidth = 0.5
                        ctx.beginPath()
                        ctx.moveTo(p.x, p.y)
                        ctx.lineTo(p2.x, p2.y)
                        ctx.stroke()
                    }
                }
            }

            animationFrameRef.current = requestAnimationFrame(animate)
        }

        requestAnimationFrame(animate)

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
