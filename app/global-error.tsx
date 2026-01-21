"use client"

import { useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Inter, Space_Grotesk } from "next/font/google"
import "./globals.css"

const inter = Inter({
    subsets: ["latin"],
    display: "swap",
})

const spaceGrotesk = Space_Grotesk({
    subsets: ["latin"],
    variable: "--font-space",
    display: "swap",
})

export default function GlobalError({
    error,
    reset,
}: {
    error: Error & { digest?: string }
    reset: () => void
}) {
    useEffect(() => {
        console.error(error)
    }, [error])

    return (
        <html lang="en">
            <body className={`${inter.className} ${spaceGrotesk.variable} antialiased min-h-screen flex items-center justify-center bg-background`}>
                <div className="text-center p-6">
                    <h2 className="text-3xl font-bold mb-4">Something went wrong!</h2>
                    <p className="text-muted-foreground mb-8">
                        A critical error occurred. Please try refreshing the page.
                    </p>
                    <Button
                        onClick={() => reset()}
                        className="bg-primary text-white hover:bg-primary/90"
                    >
                        Try again
                    </Button>
                </div>
            </body>
        </html>
    )
}
