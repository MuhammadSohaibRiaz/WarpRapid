"use client"

import { useEffect, useRef, useState } from "react"
import { usePathname, useSearchParams } from "next/navigation"
import { useThemeContext } from "@/context/theme-context"

export default function ProgressBar() {
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const [active, setActive] = useState(false)
  const [progress, setProgress] = useState(0)
  const timerRef = useRef<NodeJS.Timeout | null>(null)
  const trickleRef = useRef<NodeJS.Timeout | null>(null)
  const delayRef = useRef<NodeJS.Timeout | null>(null)

  const clearTimers = () => {
    if (timerRef.current) clearTimeout(timerRef.current)
    if (trickleRef.current) clearInterval(trickleRef.current)
    if (delayRef.current) clearTimeout(delayRef.current)
    timerRef.current = null
    trickleRef.current = null
    delayRef.current = null
  }

  const start = () => {
    clearTimers()
    // Small delay to avoid flashing on instant navigations
    delayRef.current = setTimeout(() => {
      setActive(true)
      setProgress(8)
      // Trickle towards 80%
      trickleRef.current = setInterval(() => {
        setProgress((p) => {
          if (p >= 80) return p
          const inc = Math.random() * 10 // 0-10%
          return Math.min(p + inc, 80)
        })
      }, 200)
    }, 100)
  }

  const finish = () => {
    // Complete and hide
    setProgress(100)
    timerRef.current = setTimeout(() => {
      setActive(false)
      setProgress(0)
      clearTimers()
    }, 250)
  }

  useEffect(() => {
    start()
    // Heuristic completion in case there's no clear end event
    const fallback = setTimeout(() => finish(), 1200)
    return () => {
      clearTimeout(fallback)
      // If navigating away quickly, ensure bar completes
      finish()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname, searchParams?.toString()])

  const { mode, color } = useThemeContext()

  // High-contrast gradient per theme to ensure visibility against page backgrounds
  const isDark = mode === "dark" || color === "black"
  const gradientMap: Record<string, { light: string; dark: string }> = {
    blue: {
      light: "from-blue-600 to-cyan-500",
      dark: "from-sky-400 to-cyan-300",
    },
    green: {
      light: "from-emerald-600 to-teal-500",
      dark: "from-emerald-400 to-teal-300",
    },
    purple: {
      light: "from-fuchsia-600 to-pink-500",
      dark: "from-fuchsia-400 to-pink-400",
    },
    red: {
      light: "from-rose-600 to-orange-500",
      dark: "from-rose-400 to-orange-400",
    },
    orange: {
      light: "from-amber-600 to-orange-500",
      dark: "from-amber-400 to-orange-400",
    },
    white: {
      light: "from-gray-700 to-gray-900",
      dark: "from-gray-700 to-gray-900",
    },
    black: {
      light: "from-white to-gray-300",
      dark: "from-white to-gray-300",
    },
  }
  const picked = gradientMap[color as keyof typeof gradientMap]
  const barGradient = `bg-gradient-to-r ${picked ? (isDark ? picked.dark : picked.light) : "from-blue-600 to-cyan-500"}`

  if (!active) return null

  return (
    <div className="fixed top-0 left-0 right-0 z-[9999] h-[3px]">
      {/* subtle track for contrast */}
      <div className="absolute inset-0 bg-black/10 dark:bg-white/10" />
      {/* glow */}
      <div
        className={`absolute h-[3px] ${barGradient} blur-[2px] opacity-50 rounded-r-full`}
        style={{ width: `${progress}%` }}
      />
      {/* main bar */}
      <div
        className={`relative h-[3px] ${barGradient} rounded-r-full transition-[width] duration-150 ease-out`}
        style={{ width: `${progress}%` }}
      />
    </div>
  )
}
