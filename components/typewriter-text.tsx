"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"

interface TypewriterTextProps {
    texts: string[]
    typingSpeed?: number
    deletingSpeed?: number
    pauseDuration?: number
    className?: string
    cursorClassName?: string
}

export function TypewriterText({
    texts,
    typingSpeed = 100,
    deletingSpeed = 50,
    pauseDuration = 2000,
    className = "",
    cursorClassName = "",
}: TypewriterTextProps) {
    const [currentTextIndex, setCurrentTextIndex] = useState(0)
    const [currentText, setCurrentText] = useState(texts[0])
    const [isDeleting, setIsDeleting] = useState(false)
    const [showCursor, setShowCursor] = useState(true)

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

    // Cursor blink effect
    useEffect(() => {
        const interval = setInterval(() => {
            setShowCursor((prev) => !prev)
        }, 530)

        return () => clearInterval(interval)
    }, [])

    return (
        <span className={className}>
            <span className="sr-only">{texts[currentTextIndex]}</span>
            <span aria-hidden="true">
                {currentText}
                <motion.span
                    className={`inline-block ${cursorClassName}`}
                    animate={{ opacity: showCursor ? 1 : 0 }}
                    transition={{ duration: 0 }}
                >
                    |
                </motion.span>
            </span>
        </span>
    )
}
