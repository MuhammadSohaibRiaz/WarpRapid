"use client"

import { useEffect } from "react"
import { Button } from "@/components/ui/button"
import { AlertCircle, RotateCcw } from "lucide-react"

export default function Error({
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
        <div className="min-h-[60vh] flex flex-col items-center justify-center p-6 text-center">
            <div className="w-16 h-16 bg-red-100 dark:bg-red-900/20 rounded-full flex items-center justify-center mb-6">
                <AlertCircle className="w-8 h-8 text-red-600 dark:text-red-400" />
            </div>
            <h2 className="text-2xl font-bold mb-4 theme-text">Something went wrong!</h2>
            <p className="theme-text opacity-70 max-w-md mb-8">
                We apologize for the inconvenience. An unexpected error occurred while loading this page.
            </p>
            <Button
                onClick={() => reset()}
                className="flex items-center gap-2 bg-primary text-white hover:bg-primary/90"
            >
                <RotateCcw size={16} />
                Try again
            </Button>
        </div>
    )
}
