"use client"

import { useState, KeyboardEvent, useRef } from "react"
import { X, Plus, Hash } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { motion, AnimatePresence } from "framer-motion"

interface TagInputProps {
    tags: string[]
    onChange: (tags: string[]) => void
    suggestions?: string[]
}

export function TagInput({ tags, onChange, suggestions = [] }: TagInputProps) {
    const [inputValue, setInputValue] = useState("")
    const [showSuggestions, setShowSuggestions] = useState(false)
    const inputRef = useRef<HTMLInputElement>(null)

    const addTag = (tag: string) => {
        const normalizedTag = tag.trim().toLowerCase()
        if (normalizedTag && !tags.includes(normalizedTag)) {
            onChange([...tags, normalizedTag])
        }
        setInputValue("")
        setShowSuggestions(false)
    }

    const removeTag = (tagToRemove: string) => {
        onChange(tags.filter((tag) => tag !== tagToRemove))
    }

    const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter" || e.key === ",") {
            e.preventDefault()
            addTag(inputValue)
        } else if (e.key === "Backspace" && !inputValue && tags.length > 0) {
            removeTag(tags[tags.length - 1])
        }
    }

    const filteredSuggestions = suggestions.filter(
        (s) => s.toLowerCase().includes(inputValue.toLowerCase()) && !tags.includes(s.toLowerCase())
    ).slice(0, 5)

    return (
        <div className="space-y-3">
            {/* Current Tags */}
            <div className="flex flex-wrap gap-2">
                <AnimatePresence>
                    {tags.map((tag) => (
                        <motion.div
                            key={tag}
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.8 }}
                            className="group flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-bold transition-all hover:border-primary/40"
                        >
                            <Hash className="w-3 h-3 opacity-50" />
                            <span>{tag}</span>
                            <button
                                onClick={() => removeTag(tag)}
                                className="ml-1 p-0.5 rounded-full hover:bg-primary/20 transition-colors"
                                title="Remove tag"
                            >
                                <X className="w-3 h-3" />
                            </button>
                        </motion.div>
                    ))}
                </AnimatePresence>

                {tags.length === 0 && (
                    <p className="text-xs text-muted-foreground italic py-2">No tags added yet. Type below to add tags.</p>
                )}
            </div>

            {/* Input Field */}
            <div className="relative">
                <div className="relative group">
                    <Input
                        ref={inputRef}
                        type="text"
                        value={inputValue}
                        onChange={(e) => {
                            setInputValue(e.target.value)
                            setShowSuggestions(true)
                        }}
                        onKeyDown={handleKeyDown}
                        onFocus={() => setShowSuggestions(true)}
                        placeholder="Add a tag and press Enter..."
                        className="theme-text bg-transparent border-gray-300 dark:border-gray-600 focus:border-primary group-hover:border-primary/50 transition-all pr-10"
                    />
                    <div className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground opacity-50">
                        <Plus className="w-4 h-4" />
                    </div>
                </div>

                {/* Suggestions Dropdown */}
                <AnimatePresence>
                    {showSuggestions && inputValue && filteredSuggestions.length > 0 && (
                        <motion.div
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            className="absolute z-50 w-full mt-2 p-1 rounded-xl bg-background border border-border shadow-2xl backdrop-blur-xl"
                        >
                            {filteredSuggestions.map((suggestion) => (
                                <button
                                    key={suggestion}
                                    onClick={() => addTag(suggestion)}
                                    className="w-full text-left px-4 py-2.5 rounded-lg text-sm theme-text hover:bg-primary/10 hover:text-primary transition-all flex items-center gap-2"
                                >
                                    <Hash className="w-3 h-3 opacity-50" />
                                    {suggestion}
                                </button>
                            ))}
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>

            <p className="text-[10px] uppercase font-bold tracking-widest text-muted-foreground opacity-50">
                Tip: Press Enter or comma to add a tag. Backspace to remove last.
            </p>
        </div>
    )
}
