"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Image from "next/image"
import { X, ZoomIn, Maximize2 } from "lucide-react"
import { cn } from "@/lib/utils"

interface ImageZoomProps {
    src: string
    alt: string
    width?: number
    height?: number
    className?: string
    caption?: string
    priority?: boolean
}

export function ImageZoom({
    src,
    alt,
    width,
    height,
    className,
    caption,
    priority = false,
}: ImageZoomProps) {
    const [isZoomed, setIsZoomed] = useState(false)

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === "Escape") {
            setIsZoomed(false)
        }
    }

    return (
        <>
            {/* Thumbnail Image */}
            <motion.figure
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className={cn("group relative my-8 cursor-zoom-in", className)}
                onClick={() => setIsZoomed(true)}
                onKeyDown={handleKeyDown}
                role="button"
                tabIndex={0}
                aria-label={`Zoom image: ${alt}`}
            >
                <div className="relative overflow-hidden rounded-3xl border border-border/50 shadow-2xl">
                    {/* Image */}
                    <div className="relative aspect-video w-full">
                        <Image
                            src={src}
                            alt={alt}
                            fill
                            className="object-cover transition-transform duration-500 group-hover:scale-105"
                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 1200px"
                            priority={priority}
                        />
                    </div>

                    {/* Hover Overlay */}
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors duration-300 flex items-center justify-center">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.8 }}
                            whileHover={{ opacity: 1, scale: 1 }}
                            className="opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                        >
                            <div className="flex items-center gap-2 px-6 py-3 bg-white/90 dark:bg-gray-900/90 backdrop-blur-md rounded-full shadow-2xl">
                                <ZoomIn className="w-5 h-5 text-gray-900 dark:text-white" />
                                <span className="text-sm font-semibold text-gray-900 dark:text-white">
                                    Click to zoom
                                </span>
                            </div>
                        </motion.div>
                    </div>

                    {/* Zoom Icon Badge */}
                    <div className="absolute top-4 right-4 p-2 bg-background/80 backdrop-blur-md rounded-lg border border-border/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <Maximize2 className="w-4 h-4 text-foreground" />
                    </div>
                </div>

                {/* Caption */}
                {caption && (
                    <figcaption className="mt-4 text-center text-sm text-muted-foreground italic">
                        {caption}
                    </figcaption>
                )}
            </motion.figure>

            {/* Zoomed Modal */}
            <AnimatePresence>
                {isZoomed && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="fixed inset-0 z-[9999] flex items-center justify-center p-4 md:p-8"
                        onClick={() => setIsZoomed(false)}
                        onKeyDown={handleKeyDown}
                        role="dialog"
                        aria-modal="true"
                        aria-label="Zoomed image view"
                    >
                        {/* Backdrop */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="absolute inset-0 bg-black/95 backdrop-blur-xl"
                        />

                        {/* Close Button */}
                        <motion.button
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.8 }}
                            transition={{ delay: 0.1 }}
                            onClick={() => setIsZoomed(false)}
                            className="absolute top-6 right-6 z-10 p-3 bg-white/10 hover:bg-white/20 backdrop-blur-md rounded-full border border-white/20 text-white transition-all duration-200 hover:scale-110"
                            aria-label="Close zoomed view"
                        >
                            <X className="w-6 h-6" />
                        </motion.button>

                        {/* Zoomed Image */}
                        <motion.div
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.8 }}
                            transition={{ type: "spring", damping: 25, stiffness: 200 }}
                            className="relative max-w-7xl max-h-[90vh] w-full h-full"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <div className="relative w-full h-full flex items-center justify-center">
                                <Image
                                    src={src}
                                    alt={alt}
                                    fill
                                    className="object-contain"
                                    sizes="100vw"
                                    priority
                                />
                            </div>

                            {/* Image Info Bar */}
                            {caption && (
                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.2 }}
                                    className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/80 to-transparent"
                                >
                                    <p className="text-white text-center text-sm md:text-base font-medium">
                                        {caption}
                                    </p>
                                </motion.div>
                            )}
                        </motion.div>

                        {/* Instructions */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.3 }}
                            className="absolute bottom-6 left-1/2 -translate-x-1/2 px-6 py-3 bg-white/10 backdrop-blur-md rounded-full border border-white/20"
                        >
                            <p className="text-white text-sm font-medium flex items-center gap-2">
                                <span className="hidden sm:inline">Press ESC or click outside to close</span>
                                <span className="sm:hidden">Tap outside to close</span>
                            </p>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    )
}
