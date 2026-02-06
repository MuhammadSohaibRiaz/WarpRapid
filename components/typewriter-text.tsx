"use client"

import { useEffect, useState, memo } from "react"

interface TypewriterTextProps {
    texts: string[]
    typingSpeed?: number
    deletingSpeed?: number
    pauseDuration?: number
    className?: string
    cursorClassName?: string
}

// Memoized to prevent parent scroll re-renders from affecting this component
export const TypewriterText = memo(function TypewriterText({
    texts,
    typingSpeed = 100,
    deletingSpeed = 50,
    pauseDuration = 2000,
    className = "",
    cursorClassName = "",
}: TypewriterTextProps) {
    const [currentTextIndex, setCurrentTextIndex] = useState(0)
    const [currentText, setCurrentText] = useState("")
    const [isDeleting, setIsDeleting] = useState(false)

    useEffect(() => {
        const fullText = texts[currentTextIndex]

        const timeout = setTimeout(
            () => {
                if (!isDeleting) {
                    // Typing
                    if (currentText.length < fullText.length) {
                        setCurrentText(fullText.slice(0, currentText.length + 1))
                    } else {
                        // Finished typing, pause then start deleting
                        setTimeout(() => setIsDeleting(true), pauseDuration)
                    }
                } else {
                    // Deleting
                    if (currentText.length > 0) {
                        setCurrentText(currentText.slice(0, -1))
                    } else {
                        // Finished deleting, move to next text
                        setIsDeleting(false)
                        setCurrentTextIndex((prev) => (prev + 1) % texts.length)
                    }
                }
            },
            isDeleting ? deletingSpeed : typingSpeed
        )

        return () => clearTimeout(timeout)
    }, [currentText, isDeleting, currentTextIndex, texts, typingSpeed, deletingSpeed, pauseDuration])

    return (
        <span className={className}>
            <span className="sr-only">{texts[currentTextIndex]}</span>
            <span aria-hidden="true">
                {currentText}
                {/* CSS-based cursor animation - no React re-renders */}
                <span
                    className={`inline-block animate-blink ${cursorClassName}`}
                    style={{
                        animation: 'blink 1s step-end infinite',
                    }}
                    aria-hidden="true"
                >
                    |
                </span>
            </span>
            {/* Inject keyframes via style tag (one-time) */}
            <style jsx>{`
                @keyframes blink {
                    0%, 100% { opacity: 1; }
                    50% { opacity: 0; }
                }
            `}</style>
        </span>
    )
})
