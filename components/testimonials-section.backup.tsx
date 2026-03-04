"use client"

import { useRef, useState, useEffect } from "react"
import { motion, useScroll, useTransform, useSpring, useMotionValue, useAnimationFrame } from "framer-motion"
import { Star, Quote } from "lucide-react"
import { useThemeContext } from "@/context/theme-context"
import { ReviewsCMS } from "@/lib/supabase-cms"
import type { ClientReview } from "@/lib/supabase"
import Image from "next/image"

// --- Configuration ---
const CARD_WIDTH = 400 // Slightly wider for better text fit
const CARD_HEIGHT = 500
const SCROLL_HEIGHT = 3200 // Further reduced for punchy interaction
const VISIBLE_RANGE = 0.4 // Slightly overlap more in time (longer visibility)
const OVERLAP_FACTOR = 0.6

export function TestimonialsSection() {
  const containerRef = useRef<HTMLDivElement>(null)
  const { mode, color } = useThemeContext()
  const [testimonials, setTestimonials] = useState<ClientReview[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 })

  // --- Data & Resize ---
  useEffect(() => {
    async function loadData() {
      try {
        const data = await ReviewsCMS.getPublishedReviews()
        setTestimonials(data)
      } catch (err) {
        console.error("Failed to load testimonials:", err)
      } finally {
        setIsLoading(false)
      }
    }
    loadData()

    function handleResize() {
      setDimensions({
        width: typeof window !== "undefined" ? window.innerWidth : 1000,
        height: typeof window !== "undefined" ? window.innerHeight : 800,
      })
    }
    handleResize()
    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  // --- Scroll Hooks ---
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  })

  // Smooth progress - slightly faster response
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 90,
    damping: 20,
    restDelta: 0.001
  })

  // Opacity for the scroll indicator
  const scrollIndicatorOpacity = useTransform(scrollYProgress, [0, 0.1], [1, 0])

  // --- Timeline Calculations ---
  // Formula: LastStart + Duration = EndProgress
  // We want EndProgress to be strictly 1.0 so the section unpins immediately when animation ends.

  const count = Math.min(testimonials.length, 8)
  const targetEnd = 1.0
  // Stagger = (targetEnd - VISIBLE_RANGE) / (count - 1)
  const stagger = count > 1 ? (targetEnd - VISIBLE_RANGE) / (count - 1) : 0;

  return (
    <section
      ref={containerRef}
      className="relative theme-bg"
      style={{ height: isLoading || testimonials.length === 0 ? '50vh' : `${SCROLL_HEIGHT}px` }}
    >
      {(isLoading || testimonials.length === 0) ? (
        <div className="h-full flex items-center justify-center">
          <div className="animate-pulse flex flex-col items-center">
            <div className="h-8 w-64 bg-gray-200 dark:bg-gray-800 rounded mb-4"></div>
            <div className="h-4 w-48 bg-gray-200 dark:bg-gray-800 rounded"></div>
          </div>
        </div>
      ) : (
        /* Sticky Viewport Container */
        <div className="sticky top-0 h-screen overflow-hidden flex flex-col items-center justify-center">

          {/* Background Grid/Glow Effects */}
          <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center opacity-10 pointer-events-none" />
          <div className={`absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-background/80 pointer-events-none z-10`} />

          {/* 1. Main Heading Layer */}
          <div className="text-center z-0 px-4 mb-32 md:mb-0 relative select-none transform -translate-y-16 md:translate-y-0">
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight mb-6 bg-clip-text text-transparent theme-gradient-text"
            >
              Trusted by<br />Founders & Teams
            </motion.h2>
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.8 }}
              className="text-xl md:text-2xl theme-text opacity-70 max-w-2xl mx-auto"
            >
              Here’s what our clients say about the impact we've delivered.
            </motion.p>
          </div>

          {/* 2. Arc Animation Layer */}
          <div className="absolute inset-0 pointer-events-none flex items-center justify-center z-20">
            {testimonials.slice(0, count).map((testimonial, index) => (
              <ArcCard
                key={testimonial.id || index}
                data={testimonial}
                startOffset={index * stagger}
                duration={VISIBLE_RANGE}
                progress={smoothProgress}
                dimensions={dimensions}
                mode={mode}
                color={color}
              />
            ))}
          </div>

          {/* Scroll Indicator */}
          <motion.div
            style={{ opacity: scrollIndicatorOpacity }}
            className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 theme-text opacity-50 select-none"
          >
            <span className="text-sm uppercase tracking-widest text-[10px]">Scroll to Explore</span>
            <div className="w-[1px] h-12 bg-gradient-to-b from-current to-transparent" />
          </motion.div>

        </div>
      )}
    </section>
  )
}

// --- Individual Card Component ---
function ArcCard({
  data,
  startOffset,
  duration,
  progress,
  dimensions,
  mode,
  color
}: {
  data: ClientReview
  startOffset: number
  duration: number
  progress: any
  dimensions: { width: number, height: number }
  mode: string
  color: string
}) {
  // Map specific card timeline [start, start+duration] to [0, 1]
  const cardProgress = useTransform(
    progress,
    [startOffset, startOffset + duration],
    [0, 1]
  )

  // Floating animation
  const randomDelay = startOffset * 5; // Deterministic random-ish based on index

  // Position Math
  // We want start OFF SCREEN RIGHT and end OFF SCREEN LEFT.
  // Start X: width/2 + cardWidth
  // End X: -width/2 - cardWidth
  const rangeX = dimensions.width * 0.6 + 400; // ample space to be offscreen
  const x = useTransform(cardProgress, [0, 1], [rangeX, -rangeX])

  // Parabolic Y path
  // y = a*x^2 + k
  // Peak at x=0
  const y = useTransform(x, (currentX) => {
    // Normalize X (-1 to 1 approx relative to rangeX)
    const normalizedX = currentX / rangeX
    // Parabola steepness
    // This makes it act like a hill/arc (higher Y value = lower on screen in DOM usually, but we are using transform translate)
    // Actually, we want it to curve UP then DOWN? Or DOWN then UP?
    // Reference site: "half circle that starts from bottom right side and ends on bottom left side".
    // That means it goes UP (higher on screen) then back DOWN.
    // In CSS transform Y: negative is UP.
    // So we want negative Y at the center (peak).

    // Formula for hill: y = - (1 - x^2) * Height
    // At x=0 (center), y = -Height (highest point visually)
    // At x=1 (edge), y = 0 (lowest point)

    // Let's add an offset so it stays generally low
    const peakHeight = 250
    const baseOffset = dimensions.height * 0.35 // Position relative to center

    // (normalizedX^2) is 0 at center, 1 at edges.
    // So at center: baseOffset - peakHeight? No.
    // Let's say:
    // Center: -200px (Up)
    // Edges: +200px (Down)
    const curve = (normalizedX * normalizedX) * peakHeight
    return baseOffset + curve - peakHeight
    // Center (normX=0): baseOffset - peakHeight
    // Edge (normX=1): baseOffset
  })

  // Rotation: tilts into the turn
  const rotate = useTransform(x, (currentX) => {
    return (currentX / rangeX) * 25 // +/- 25 deg tilt
  })

  // Scale: bigger at center
  const scale = useTransform(cardProgress, [0, 0.5, 1], [0.8, 1.1, 0.8])

  // Opacity: fade in enter/exit
  const opacity = useTransform(cardProgress, [0, 0.15, 0.85, 1], [0, 1, 1, 0])

  // Blur: blurred at edges
  // const blur = useTransform(cardProgress, [0, 0.2, 0.8, 1], ["8px", "0px", "0px", "8px"]) 
  // (Framer motion filter prop can be heavy, opacity usually ample)

  return (
    <motion.div
      style={{
        position: 'absolute',
        top: '50%', // Anchor center
        left: '50%', // Anchor center
        x,
        y,
        rotate,
        scale,
        opacity,
        zIndex: useTransform(cardProgress, (p) => Math.round(p * 100)), // dynamic z-index
        width: Math.min(CARD_WIDTH, dimensions.width - 40),
      }}
      className="pointer-events-auto origin-center will-change-transform"
    >
      {/* Floating Wrapper */}
      <motion.div
        animate={{
          y: [0, -10, 0],
          rotate: [0, 1, 0]
        }}
        transition={{
          duration: 4,
          ease: "easeInOut",
          repeat: Infinity,
          delay: randomDelay * 0.2, // Stagger floats
        }}
        className={`
          relative p-8 rounded-3xl backdrop-blur-md border 
          ${mode === 'dark' || color === 'black'
            ? 'bg-gray-900/60 border-white/10 shadow-[0_8px_32px_rgba(0,0,0,0.5)]'
            : 'bg-white/60 border-white/40 shadow-[0_8px_32px_rgba(0,0,0,0.1)]'
          }
        `}
      >
        {/* Quote Icon */}
        <div className="absolute -top-6 -left-4 bg-primary text-white p-3 rounded-2xl shadow-lg">
          <Quote size={20} fill="currentColor" />
        </div>

        {/* Content */}
        <div className="flex flex-col gap-4">
          <div className="flex gap-1">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                size={16}
                className={i < data.rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}
              />
            ))}
          </div>

          <p className="text-lg leading-relaxed font-medium theme-text">
            "{data.review_text}"
          </p>

          <div className="flex items-center gap-4 mt-2">
            <div className="relative w-12 h-12 rounded-full overflow-hidden bg-gray-200 border-2 border-primary/20">
              {data.client_image ? (
                <Image
                  src={data.client_image}
                  alt={data.client_name || "Client"}
                  fill
                  className="object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-gray-800 text-white font-bold">
                  {(data.client_name || "A").charAt(0)}
                </div>
              )}
            </div>
            <div>
              <h4 className="font-bold theme-text text-sm">{data.client_name || "Anonymous Client"}</h4>
              <p className="text-xs theme-text opacity-60">{data.client_position || "Client"}, {data.client_company || "Company"}</p>
            </div>
          </div>
        </div>

      </motion.div>
    </motion.div>
  )
}
