"use client"

import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Plus, Search, ChevronDown } from "lucide-react"
import { CATEGORIES, STATUS_OPTIONS } from "@/lib/constants"
import { getThemeClasses } from "@/lib/theme-utils"
import { useThemeContext } from "@/context/theme-context"

interface AdminControlsProps {
  activeTab: "projects" | "blog" | "testimonials"
  searchTerm: string
  onSearchChange: (value: string) => void
  filterCategory: string
  onCategoryChange: (value: string) => void
  filterStatus: string
  onStatusChange: (value: string) => void
  categoryDropdownOpen: boolean
  statusDropdownOpen: boolean
  onToggleCategoryDropdown: () => void
  onToggleStatusDropdown: () => void
  onAddNew: () => void
  stats: {
    total: number
    published: number
    drafts: number
    filtered: number
  }
}

export function AdminControls({
  activeTab,
  searchTerm,
  onSearchChange,
  filterCategory,
  onCategoryChange,
  filterStatus,
  onStatusChange,
  categoryDropdownOpen,
  statusDropdownOpen,
  onToggleCategoryDropdown,
  onToggleStatusDropdown,
  onAddNew,
  stats
}: AdminControlsProps) {
  const { mode, color } = useThemeContext()
  const theme = getThemeClasses(mode, color)

  const getAddButtonText = () => {
    switch (activeTab) {
      case "projects": return "Add Project"
      case "blog": return "Add Blog Post"
      case "testimonials": return "Add Testimonial"
      default: return "Add New"
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
      className={`${theme.cardBg} backdrop-blur-md rounded-lg p-6 mb-8 shadow-lg theme-transition`}
    >
      <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
        <div className="flex flex-col md:flex-row gap-4 flex-1">
          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 theme-text opacity-50" />
            <Input
              placeholder={`Search ${activeTab}...`}
              value={searchTerm}
              onChange={(e) => onSearchChange(e.target.value)}
              className="pl-10 theme-text bg-transparent border-gray-300 dark:border-gray-600"
            />
          </div>

          {/* Category Filter (Projects only) */}
          {activeTab === "projects" && (
            <div className="relative dropdown-container">
              <button
                onClick={onToggleCategoryDropdown}
                className={`flex items-center justify-between w-full md:w-48 px-3 py-2 rounded-md border ${theme.inputBg} theme-text theme-transition hover:bg-opacity-80`}
              >
                <span>{filterCategory}</span>
                <ChevronDown
                  className={`w-4 h-4 transition-transform ${categoryDropdownOpen ? "rotate-180" : ""}`}
                />
              </button>

              <AnimatePresence>
                {categoryDropdownOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className={`absolute top-full left-0 right-0 mt-1 ${theme.dropdownBg} backdrop-blur-md rounded-md shadow-lg border z-50 max-h-60 overflow-y-auto`}
                  >
                    {["All", ...CATEGORIES].map((category) => (
                      <button
                        key={category}
                        onClick={() => onCategoryChange(category)}
                        className={`w-full text-left px-3 py-2 theme-text hover:bg-primary/20 transition-colors ${filterCategory === category ? "bg-primary/10" : ""}`}
                      >
                        {category}
                      </button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          )}

          {/* Status Filter */}
          <div className="relative dropdown-container">
            <button
              onClick={onToggleStatusDropdown}
              className={`flex items-center justify-between w-full md:w-48 px-3 py-2 rounded-md border ${theme.inputBg} theme-text theme-transition hover:bg-opacity-80`}
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
                  className={`absolute top-full left-0 right-0 mt-1 ${theme.dropdownBg} backdrop-blur-md rounded-md shadow-lg border z-50`}
                >
                  {STATUS_OPTIONS.map((status) => (
                    <button
                      key={status}
                      onClick={() => onStatusChange(status)}
                      className={`w-full text-left px-3 py-2 theme-text hover:bg-primary/20 transition-colors ${filterStatus === status ? "bg-primary/10" : ""}`}
                    >
                      {status}
                    </button>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Add Button */}
        <Button
          onClick={onAddNew}
          className="bg-primary hover:bg-primary/90 text-white"
        >
          <Plus className="w-4 h-4 mr-2" />
          {getAddButtonText()}
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
        <div className="text-center">
          <div className="text-2xl font-bold text-primary">{stats.total}</div>
          <div className="text-sm theme-text opacity-70 theme-transition">
            Total {activeTab === "projects" ? "Projects" : activeTab === "blog" ? "Posts" : "Testimonials"}
          </div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-bold text-green-500">{stats.published}</div>
          <div className="text-sm theme-text opacity-70 theme-transition">Published</div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-bold text-yellow-500">{stats.drafts}</div>
          <div className="text-sm theme-text opacity-70 theme-transition">Drafts</div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-bold text-blue-500">{stats.filtered}</div>
          <div className="text-sm theme-text opacity-70 theme-transition">Filtered</div>
        </div>
      </div>
    </motion.div>
  )
}