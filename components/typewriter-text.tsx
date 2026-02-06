"use client"

import { useEffect, useState, useRef, memo, useCallback } from "react"

interface TypewriterTextProps {
    texts: string[]
    typingSpeed?: number
    deletingSpeed?: number
    pauseDuration?: number
    className?: string
    cursorClassName?: string
}

// Memoized to prevent parent re-renders from affecting this component
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
    const rafRef = useRef<number>()
    const lastTimeRef = useRef<number>(0)

    // Natural typing with slight variance for realistic effect
    const getTypingDelay = useCallback(() => {
        const variance = Math.random() * 30 - 15 // ±15ms variance
        return isDeleting ? deletingSpeed + variance : typingSpeed + variance
    }, [isDeleting, typingSpeed, deletingSpeed])

    useEffect(() => {
        const fullText = texts[textIndex]

        const animate = (currentTime: number) => {
            if (!lastTimeRef.current) lastTimeRef.current = currentTime

            const elapsed = currentTime - lastTimeRef.current
            const delay = isPaused ? pauseDuration : getTypingDelay()

            if (elapsed >= delay) {
                lastTimeRef.current = currentTime

                if (isPaused) {
                    setIsPaused(false)
                    setIsDeleting(true)
                } else if (!isDeleting) {
                    // Typing
                    if (displayText.length < fullText.length) {
                        setDisplayText(fullText.slice(0, displayText.length + 1))
                    } else {
                        // Finished typing, pause
                        setIsPaused(true)
                    }
                } else {
                    // Deleting
                    if (displayText.length > 0) {
                        setDisplayText(displayText.slice(0, -1))
                    } else {
                        // Finished deleting, move to next text
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
    }, [displayText, isDeleting, isPaused, textIndex, texts, getTypingDelay, pauseDuration])

    return (
        <span className={className}>
            <span className="sr-only">{texts[textIndex]}</span>
            <span aria-hidden="true" className="will-change-contents">
                {displayText}
                {/* CSS-based cursor for smooth blinking without re-renders */}
                <span
                    className={`inline-block animate-pulse ${cursorClassName}`}
                    style={{
                        animationDuration: '1s',
                        animationTimingFunction: 'steps(2, start)'
                    }}
                >
                    |
                </span>
            </span>
        </span>
    )
})
