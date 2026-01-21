"use client"

import { useEffect, useState, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { List, ChevronRight } from "lucide-react"
import { cn } from "@/lib/utils"

interface TOCItem {
    id: string
    text: string
    level: number
}

interface TableOfContentsProps {
    content: string
}

export function TableOfContents({ content }: TableOfContentsProps) {
    const [headings, setHeadings] = useState<TOCItem[]>([])
    const [activeId, setActiveId] = useState<string>("")
    const [isOpen, setIsOpen] = useState(false)
    const observerRef = useRef<IntersectionObserver | null>(null)

    // Extract headings from HTML content
    useEffect(() => {
        const tempDiv = document.createElement("div")
        tempDiv.innerHTML = content

        const headingElements = tempDiv.querySelectorAll("h2, h3, h4")
        const items: TOCItem[] = []

        headingElements.forEach((heading, index) => {
            const level = parseInt(heading.tagName.substring(1))
            const text = heading.textContent || ""
            const id = heading.id || `heading-${index}`

            // Add ID to heading if it doesn't have one
            if (!heading.id) {
                heading.id = id
            }

            items.push({ id, text, level })
        })

        setHeadings(items)
    }, [content])

    // Scroll spy functionality
    useEffect(() => {
        if (headings.length === 0) return

        const handleObserver = (entries: IntersectionObserverEntry[]) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    setActiveId(entry.target.id)
                }
            })
        }

        observerRef.current = new IntersectionObserver(handleObserver, {
            rootMargin: "-20% 0% -35% 0%",
            threshold: 0.5,
        })

        // Observe all headings
        headings.forEach(({ id }) => {
            const element = document.getElementById(id)
            if (element && observerRef.current) {
                observerRef.current.observe(element)
            }
        })

        return () => {
            if (observerRef.current) {
                observerRef.current.disconnect()
            }
        }
    }, [headings])

    // Smooth scroll to section
    const scrollToHeading = (id: string) => {
        const element = document.getElementById(id)
        if (element) {
            const offset = 100 // Account for fixed header
            const elementPosition = element.getBoundingClientRect().top
            const offsetPosition = elementPosition + window.pageYOffset - offset

            window.scrollTo({
                top: offsetPosition,
                behavior: "smooth",
            })

            // Close mobile menu after click
            setIsOpen(false)
        }
    }

    if (headings.length === 0) return null

    return (
        <>
            {/* Desktop: Sticky Sidebar TOC */}
            <aside className="hidden xl:block fixed left-8 top-1/2 -translate-y-1/2 w-64 z-30">
                <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: 0.3 }}
                    className="bg-background/80 backdrop-blur-xl border border-border/50 rounded-2xl p-6 shadow-2xl"
                >
                    <div className="flex items-center gap-2 mb-6">
                        <List className="w-5 h-5 text-primary" />
                        <h2 className="text-sm font-bold uppercase tracking-wider theme-text">
                            Table of Contents
                        </h2>
                    </div>

                    <nav aria-label="Table of contents">
                        <ul className="space-y-3">
                            {headings.map((heading, index) => {
                                const isActive = activeId === heading.id
                                const indent = (heading.level - 2) * 12

                                return (
                                    <motion.li
                                        key={heading.id}
                                        initial={{ opacity: 0, x: -10 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: index * 0.05 }}
                                        style={{ paddingLeft: `${indent}px` }}
                                    >
                                        <button
                                            onClick={() => scrollToHeading(heading.id)}
                                            className={cn(
                                                "group relative w-full text-left text-sm transition-all duration-300 py-2 px-3 rounded-lg",
                                                isActive
                                                    ? "text-primary font-semibold bg-primary/10"
                                                    : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
                                            )}
                                            aria-current={isActive ? "location" : undefined}
                                        >
                                            <span className="flex items-center gap-2">
                                                <ChevronRight
                                                    className={cn(
                                                        "w-3 h-3 transition-all duration-300",
                                                        isActive
                                                            ? "opacity-100 translate-x-0"
                                                            : "opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0"
                                                    )}
                                                />
                                                <span className="line-clamp-2 leading-tight">
                                                    {heading.text}
                                                </span>
                                            </span>

                                            {/* Active indicator */}
                                            {isActive && (
                                                <motion.div
                                                    layoutId="activeSection"
                                                    className="absolute left-0 top-0 bottom-0 w-1 bg-primary rounded-r-full"
                                                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                                                />
                                            )}
                                        </button>
                                    </motion.li>
                                )
                            })}
                        </ul>
                    </nav>
                </motion.div>
            </aside>

            {/* Mobile: Floating Toggle Button */}
            <div className="xl:hidden fixed bottom-6 right-6 z-40">
                <motion.button
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                    onClick={() => setIsOpen(!isOpen)}
                    className="bg-primary text-white p-4 rounded-full shadow-2xl shadow-primary/30 hover:shadow-primary/50 transition-shadow"
                    aria-label="Toggle table of contents"
                    aria-expanded={isOpen}
                >
                    <List className="w-6 h-6" />
                </motion.button>

                {/* Mobile: Slide-up TOC Panel */}
                <AnimatePresence>
                    {isOpen && (
                        <>
                            {/* Backdrop */}
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                onClick={() => setIsOpen(false)}
                                className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40"
                            />

                            {/* Panel */}
                            <motion.div
                                initial={{ y: "100%" }}
                                animate={{ y: 0 }}
                                exit={{ y: "100%" }}
                                transition={{ type: "spring", damping: 30, stiffness: 300 }}
                                className="fixed bottom-0 left-0 right-0 bg-background border-t border-border rounded-t-3xl shadow-2xl z-50 max-h-[70vh] overflow-hidden"
                            >
                                <div className="p-6">
                                    <div className="flex items-center justify-between mb-6">
                                        <div className="flex items-center gap-2">
                                            <List className="w-5 h-5 text-primary" />
                                            <h2 className="text-lg font-bold theme-text">
                                                Table of Contents
                                            </h2>
                                        </div>
                                        <button
                                            onClick={() => setIsOpen(false)}
                                            className="text-muted-foreground hover:text-foreground transition-colors"
                                            aria-label="Close table of contents"
                                        >
                                            <ChevronRight className="w-6 h-6 rotate-90" />
                                        </button>
                                    </div>

                                    <nav aria-label="Table of contents" className="overflow-y-auto max-h-[calc(70vh-120px)]">
                                        <ul className="space-y-2">
                                            {headings.map((heading) => {
                                                const isActive = activeId === heading.id
                                                const indent = (heading.level - 2) * 16

                                                return (
                                                    <li key={heading.id} style={{ paddingLeft: `${indent}px` }}>
                                                        <button
                                                            onClick={() => scrollToHeading(heading.id)}
                                                            className={cn(
                                                                "w-full text-left text-sm transition-all duration-200 py-3 px-4 rounded-xl",
                                                                isActive
                                                                    ? "text-primary font-semibold bg-primary/10 border border-primary/20"
                                                                    : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
                                                            )}
                                                            aria-current={isActive ? "location" : undefined}
                                                        >
                                                            <span className="flex items-center gap-2">
                                                                {isActive && (
                                                                    <ChevronRight className="w-4 h-4 flex-shrink-0" />
                                                                )}
                                                                <span className="line-clamp-2 leading-tight">
                                                                    {heading.text}
                                                                </span>
                                                            </span>
                                                        </button>
                                                    </li>
                                                )
                                            })}
                                        </ul>
                                    </nav>
                                </div>
                            </motion.div>
                        </>
                    )}
                </AnimatePresence>
            </div>
        </>
    )
}
