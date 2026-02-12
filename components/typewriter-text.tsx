"use client"

import { useEffect, useState, useRef, memo, useCallback, useMemo } from "react"

interface TypewriterTextProps {
    texts: string[]
    typingSpeed?: number
    deletingSpeed?: number
    pauseDuration?: number
    className?: string
    cursorClassName?: string
}

export const TypewriterText = memo(function TypewriterText({
    texts,
    typingSpeed = 80,
    deletingSpeed = 40,
    pauseDuration = 2000,
    className = "",
    cursorClassName = "",
}: TypewriterTextProps) {
    const [displayText, setDisplayText] = useState("")
    const [textIndex, setTextIndex] = useState(0)
    const [isDeleting, setIsDeleting] = useState(false)
    const [isPaused, setIsPaused] = useState(false)
    const lastTimeRef = useRef<number>(0)
    const rafRef = useRef<number>()

    // Find the longest text to ensure the ghost container covers the maximum possible area
    const longestText = useMemo(() => {
        return texts.reduce((a, b) => (a.length > b.length ? a : b), "")
    }, [texts])

    const getTypingDelay = useCallback(() => {
        if (isPaused) return pauseDuration
        return isDeleting ? deletingSpeed : typingSpeed
    }, [isDeleting, isPaused, typingSpeed, deletingSpeed, pauseDuration])

    useEffect(() => {
        const fullText = texts[textIndex]

        const animate = (currentTime: number) => {
            if (!lastTimeRef.current) lastTimeRef.current = currentTime
            const elapsed = currentTime - lastTimeRef.current
            const delay = getTypingDelay()

            if (elapsed >= delay) {
                lastTimeRef.current = currentTime

                if (isPaused) {
                    setIsPaused(false)
                    setIsDeleting(true)
                } else if (!isDeleting) {
                    if (displayText.length < fullText.length) {
                        setDisplayText(fullText.slice(0, displayText.length + 1))
                    } else {
                        setIsPaused(true)
                    }
                } else {
                    if (displayText.length > 0) {
                        setDisplayText(displayText.slice(0, -1))
                    } else {
                        setIsDeleting(false)
                        setTextIndex((prev) => (prev + 1) % texts.length)
                    }
                }
            }

            rafRef.current = requestAnimationFrame(animate)
        }

        rafRef.current = requestAnimationFrame(animate)

        return () => {
            if (rafRef.current) cancelAnimationFrame(rafRef.current)
        }
    }, [displayText, isDeleting, isPaused, textIndex, texts, getTypingDelay])

    return (
        <span className="inline-grid grid-cols-1 grid-rows-1 items-center justify-items-center">
            {/* 
                GHOST FOOTPRINT
                Reserves the maximum width/height required by any of the strings.
                This prevents the layout from jumping horizontally or vertically.
            */}
            <span
                className={`invisible pointer-events-none select-none col-start-1 row-start-1 ${className}`}
                aria-hidden="true"
            >
                {longestText}
                <span className="ml-1 opacity-0">|</span>
            </span>

            {/* 
                INTERACTIVE TYPING LAYER
                Positioned in the same grid cell to overlay the footprint exactly.
            */}
            <span className={`col-start-1 row-start-1 text-center will-change-contents ${className}`}>
                {displayText}
                <span
                    className={`inline-block animate-pulse ml-1 ${cursorClassName}`}
                    style={{
                        animationDuration: '1s',
                        animationTimingFunction: 'steps(2, start)',
                    }}
                >
                    |
                </span>
            </span>
            <span className="sr-only">{texts[textIndex]}</span>
        </span>
    )
})
