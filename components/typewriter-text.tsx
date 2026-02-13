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
    const [phase, setPhase] = useState<"typing" | "paused" | "deleting">("typing")

    // Find the longest text for ghost container
    const longestText = useMemo(() => {
        return texts.reduce((a, b) => (a.length > b.length ? a : b), "")
    }, [texts])

    useEffect(() => {
        const fullText = texts[textIndex]
        let timer: ReturnType<typeof setTimeout>

        if (phase === "typing") {
            if (displayText.length < fullText.length) {
                timer = setTimeout(() => {
                    setDisplayText(fullText.slice(0, displayText.length + 1))
                }, typingSpeed)
            } else {
                timer = setTimeout(() => setPhase("paused"), 0)
            }
        } else if (phase === "paused") {
            timer = setTimeout(() => setPhase("deleting"), pauseDuration)
        } else if (phase === "deleting") {
            if (displayText.length > 0) {
                timer = setTimeout(() => {
                    setDisplayText(displayText.slice(0, -1))
                }, deletingSpeed)
            } else {
                setTextIndex((prev) => (prev + 1) % texts.length)
                setPhase("typing")
            }
        }

        return () => clearTimeout(timer)
    }, [displayText, phase, textIndex, texts, typingSpeed, deletingSpeed, pauseDuration])

    return (
        <span className="inline-grid grid-cols-1 grid-rows-1 items-center justify-items-center">
            {/* Ghost footprint — reserves max width/height, prevents CLS */}
            <span
                className={`invisible pointer-events-none select-none col-start-1 row-start-1 ${className}`}
                aria-hidden="true"
            >
                {longestText}
                <span className="ml-1 opacity-0">|</span>
            </span>

            {/* Visible typing layer */}
            <span className={`col-start-1 row-start-1 text-center ${className}`}>
                {displayText}
                <span
                    className={`inline-block ml-1 ${cursorClassName}`}
                    style={{
                        animation: 'pulse 1s steps(2, start) infinite',
                    }}
                >
                    |
                </span>
            </span>
            <span className="sr-only">{texts[textIndex]}</span>
        </span>
    )
})
