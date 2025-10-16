"use client"

import { useState, useEffect } from "react"
import { Input } from "@/components/ui/input"
import { ChevronDown, Search } from "lucide-react"
import { AnimatePresence, motion } from "framer-motion"
import { useThemeContext } from "@/context/theme-context"

type Props = {
  searchTerm: string
  onSearchChange: (v: string) => void
  filterCategory: string
  onFilterCategory: (v: string) => void
  filterStatus: string
  onFilterStatus: (v: string) => void
  allCategories: string[]
  statusOptions: string[]
}

export function ProjectsControls({
  searchTerm,
  onSearchChange,
  filterCategory,
  onFilterCategory,
  filterStatus,
  onFilterStatus,
  allCategories,
  statusOptions,
}: Props) {
  const { mode, color } = useThemeContext()
  const [categoryDropdownOpen, setCategoryDropdownOpen] = useState(false)
  const [statusDropdownOpen, setStatusDropdownOpen] = useState(false)

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement
      if (!target.closest(".dropdown-container")) {
        setCategoryDropdownOpen(false)
        setStatusDropdownOpen(false)
      }
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  const dropdownBgClass =
    mode === "dark" || color === "black" ? "bg-gray-900/95 border-gray-700" : "bg-white/95 border-gray-300"

  return (
    <div className="flex flex-col md:flex-row gap-4 flex-1">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 theme-text opacity-50" />
        <Input
          placeholder="Search projects..."
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
          className="pl-10 theme-text bg-transparent border-gray-300 dark:border-gray-600"
        />
      </div>

      {/* Category Filter */}
      <div className="relative dropdown-container">
        <button
          onClick={() => {
            setCategoryDropdownOpen((v) => !v)
            setStatusDropdownOpen(false)
          }}
          className={`flex items-center justify-between w-full md:w-48 px-3 py-2 rounded-md border ${
            mode === "dark" || color === "black" ? "border-gray-600 bg-gray-800/50" : "border-gray-300 bg-white/50"
          } theme-text theme-transition hover:bg-opacity-80`}
        >
          <span>{filterCategory}</span>
          <ChevronDown className={`w-4 h-4 transition-transform ${categoryDropdownOpen ? "rotate-180" : ""}`} />
        </button>

        <AnimatePresence>
          {categoryDropdownOpen && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className={`absolute top-full left-0 right-0 mt-1 ${dropdownBgClass} backdrop-blur-md rounded-md shadow-lg border z-50 max-h-60 overflow-y-auto`}
            >
              {allCategories.map((category) => (
                <button
                  key={category}
                  onClick={() => {
                    onFilterCategory(category)
                    setCategoryDropdownOpen(false)
                  }}
                  className={`w-full text-left px-3 py-2 theme-text hover:bg-primary/20 transition-colors ${
                    filterCategory === category ? "bg-primary/10" : ""
                  }`}
                >
                  {category}
                </button>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Status Filter */}
      <div className="relative dropdown-container">
        <button
          onClick={() => {
            setStatusDropdownOpen((v) => !v)
            setCategoryDropdownOpen(false)
          }}
          className={`flex items-center justify-between w-full md:w-48 px-3 py-2 rounded-md border ${
            mode === "dark" || color === "black" ? "border-gray-600 bg-gray-800/50" : "border-gray-300 bg-white/50"
          } theme-text theme-transition hover:bg-opacity-80`}
        >
          <span>{filterStatus}</span>
          <ChevronDown className={`w-4 h-4 transition-transform ${statusDropdownOpen ? "rotate-180" : ""}`} />
        </button>

        <AnimatePresence>
          {statusDropdownOpen && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className={`absolute top-full left-0 right-0 mt-1 ${dropdownBgClass} backdrop-blur-md rounded-md shadow-lg border z-50`}
            >
              {statusOptions.map((status) => (
                <button
                  key={status}
                  onClick={() => {
                    onFilterStatus(status)
                    setStatusDropdownOpen(false)
                  }}
                  className={`w-full text-left px-3 py-2 theme-text hover:bg-primary/20 transition-colors ${
                    filterStatus === status ? "bg-primary/10" : ""
                  }`}
                >
                  {status}
                </button>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}
