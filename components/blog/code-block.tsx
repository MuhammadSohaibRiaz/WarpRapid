"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Check, Copy } from "lucide-react"
import { cn } from "@/lib/utils"

interface CodeBlockProps {
    code: string
    language?: string
    filename?: string
    showLineNumbers?: boolean
    highlightLines?: number[]
}

export function CodeBlock({
    code,
    language = "typescript",
    filename,
    showLineNumbers = false,
    highlightLines = [],
}: CodeBlockProps) {
    const [copied, setCopied] = useState(false)

    const handleCopy = async () => {
        try {
            await navigator.clipboard.writeText(code)
            setCopied(true)
            setTimeout(() => setCopied(false), 2000)
        } catch (err) {
            console.error("Failed to copy code:", err)
        }
    }

    const lines = code.split("\n")

    // Language display names
    const languageNames: Record<string, string> = {
        javascript: "JavaScript",
        typescript: "TypeScript",
        jsx: "React JSX",
        tsx: "React TSX",
        python: "Python",
        bash: "Bash",
        shell: "Shell",
        json: "JSON",
        css: "CSS",
        html: "HTML",
        sql: "SQL",
        yaml: "YAML",
        markdown: "Markdown",
    }

    const displayLanguage = languageNames[language.toLowerCase()] || language.toUpperCase()

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="group relative my-8 rounded-2xl overflow-hidden border border-border/50 shadow-2xl bg-gradient-to-br from-gray-900 to-gray-950"
        >
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-3 bg-gray-800/50 border-b border-gray-700/50 backdrop-blur-sm">
                <div className="flex items-center gap-3">
                    {/* Traffic Lights */}
                    <div className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded-full bg-red-500/80" />
                        <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
                        <div className="w-3 h-3 rounded-full bg-green-500/80" />
                    </div>

                    {/* Filename or Language Badge */}
                    {filename ? (
                        <span className="text-sm font-mono text-gray-300">{filename}</span>
                    ) : (
                        <span className="px-3 py-1 rounded-lg bg-primary/10 text-primary text-xs font-bold uppercase tracking-wider border border-primary/20">
                            {displayLanguage}
                        </span>
                    )}
                </div>

                {/* Copy Button */}
                <motion.button
                    onClick={handleCopy}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className={cn(
                        "flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200",
                        copied
                            ? "bg-green-500/20 text-green-400 border border-green-500/30"
                            : "bg-gray-700/50 text-gray-300 hover:bg-gray-700 border border-gray-600/50"
                    )}
                    aria-label={copied ? "Copied!" : "Copy code"}
                >
                    {copied ? (
                        <>
                            <Check className="w-4 h-4" />
                            <span>Copied!</span>
                        </>
                    ) : (
                        <>
                            <Copy className="w-4 h-4" />
                            <span className="hidden sm:inline">Copy</span>
                        </>
                    )}
                </motion.button>
            </div>

            {/* Code Content */}
            <div className="relative overflow-x-auto">
                <pre className="p-6 text-sm md:text-base leading-relaxed">
                    <code className="font-mono text-gray-100">
                        {showLineNumbers ? (
                            <table className="w-full border-collapse">
                                <tbody>
                                    {lines.map((line, index) => {
                                        const lineNumber = index + 1
                                        const isHighlighted = highlightLines.includes(lineNumber)

                                        return (
                                            <tr
                                                key={index}
                                                className={cn(
                                                    "transition-colors duration-200",
                                                    isHighlighted && "bg-primary/10 border-l-4 border-l-primary"
                                                )}
                                            >
                                                {/* Line Number */}
                                                <td className="select-none text-right pr-4 text-gray-500 align-top w-12">
                                                    <span className="inline-block min-w-[2ch]">{lineNumber}</span>
                                                </td>

                                                {/* Code Line */}
                                                <td className="pl-4">
                                                    <span className={cn(isHighlighted && "text-gray-50 font-medium")}>
                                                        {line || "\n"}
                                                    </span>
                                                </td>
                                            </tr>
                                        )
                                    })}
                                </tbody>
                            </table>
                        ) : (
                            // Without line numbers
                            <div>
                                {lines.map((line, index) => {
                                    const lineNumber = index + 1
                                    const isHighlighted = highlightLines.includes(lineNumber)

                                    return (
                                        <div
                                            key={index}
                                            className={cn(
                                                "transition-colors duration-200",
                                                isHighlighted && "bg-primary/10 border-l-4 border-l-primary pl-4 -ml-6 pr-6"
                                            )}
                                        >
                                            <span className={cn(isHighlighted && "text-gray-50 font-medium")}>
                                                {line || "\n"}
                                            </span>
                                        </div>
                                    )
                                })}
                            </div>
                        )}
                    </code>
                </pre>

                {/* Gradient Fade at Bottom (for long code blocks) */}
                {lines.length > 20 && (
                    <div className="absolute bottom-0 left-0 right-0 h-12 bg-gradient-to-t from-gray-950 to-transparent pointer-events-none" />
                )}
            </div>

            {/* Decorative Glow Effect */}
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
                <div className="absolute -inset-1 bg-gradient-to-r from-primary/20 via-purple-500/20 to-pink-500/20 blur-xl" />
            </div>
        </motion.div>
    )
}
