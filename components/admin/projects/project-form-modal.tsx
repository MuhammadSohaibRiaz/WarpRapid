"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { AnimatePresence, motion } from "framer-motion"
import { Save, X } from "lucide-react"
import { useThemeContext } from "@/context/theme-context"
import type { ProjectDetail, ProjectImage } from "@/lib/supabase"
import { ImageManager } from "@/components/admin/shared/ImageManager"

type Props = {
  isOpen: boolean
  onClose: () => void
  onSave: () => void
  editingProject: ProjectDetail | null
  categories: string[]
  formData: Partial<ProjectDetail>
  setFormData: (updater: (prev: Partial<ProjectDetail>) => Partial<ProjectDetail>) => void
}

export function ProjectFormModal({
  isOpen,
  onClose,
  onSave,
  editingProject,
  categories,
  formData,
  setFormData,
}: Props) {
  const { mode, color } = useThemeContext()
  const cardBgClass = mode === "dark" || color === "black" ? "bg-gray-900/40" : "bg-white/40"

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4 overflow-y-auto"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className={`${cardBgClass} backdrop-blur-md rounded-lg p-6 w-full max-w-4xl max-h-[90vh] overflow-y-auto theme-transition`}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold theme-text theme-transition">
                {editingProject ? "Edit Project" : "Add New Project"}
              </h2>
              <Button variant="ghost" onClick={onClose}>
                <X className="w-5 h-5" />
              </Button>
            </div>

            <div className="space-y-6">
              {/* Basic Information */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium theme-text mb-2 theme-transition">Title *</label>
                  <Input
                    value={formData.title || ""}
                    onChange={(e) => setFormData((prev) => ({ ...prev, title: e.target.value }))}
                    placeholder="Project title"
                    className="theme-text bg-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium theme-text mb-2 theme-transition">Category *</label>
                  <select
                    value={formData.category || ""}
                    onChange={(e) => setFormData((prev) => ({ ...prev, category: e.target.value }))}
                    className={`w-full px-3 py-2 rounded-md border ${
                      mode === "dark" || color === "black"
                        ? "border-gray-600 bg-gray-800/50"
                        : "border-gray-300 bg-white/50"
                    } theme-text theme-transition`}
                  >
                    <option value="">Select category</option>
                    {categories.map((category) => (
                      <option key={category} value={category}>
                        {category}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Descriptions */}
              <div className="grid grid-cols-1 gap-4">
                <div>
                  <label className="block text-sm font-medium theme-text mb-2 theme-transition">
                    Short Description *
                  </label>
                  <Textarea
                    value={formData.description || ""}
                    onChange={(e) => setFormData((prev) => ({ ...prev, description: e.target.value }))}
                    placeholder="Brief project description"
                    className="theme-text bg-transparent"
                    rows={3}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium theme-text mb-2 theme-transition">
                    Long Description
                  </label>
                  <Textarea
                    value={formData.long_description || ""}
                    onChange={(e) => setFormData((prev) => ({ ...prev, long_description: e.target.value }))}
                    placeholder="Detailed project description"
                    className="theme-text bg-transparent"
                    rows={4}
                  />
                </div>
              </div>

              {/* Project Details */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium theme-text mb-2 theme-transition">Duration</label>
                  <Input
                    value={formData.duration || ""}
                    onChange={(e) => setFormData((prev) => ({ ...prev, duration: e.target.value }))}
                    placeholder="e.g., 3 months"
                    className="theme-text bg-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium theme-text mb-2 theme-transition">Team Size</label>
                  <Input
                    type="number"
                    min="1"
                    value={formData.team_size || ""}
                    onChange={(e) => setFormData((prev) => ({ ...prev, team_size: parseInt(e.target.value) || 1 }))}
                    placeholder="5"
                    className="theme-text bg-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium theme-text mb-2 theme-transition">Client Type</label>
                  <Input
                    value={formData.client_type || ""}
                    onChange={(e) => setFormData((prev) => ({ ...prev, client_type: e.target.value }))}
                    placeholder="e.g., Startup, Enterprise"
                    className="theme-text bg-transparent"
                  />
                </div>
              </div>

              {/* URLs */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium theme-text mb-2 theme-transition">Live URL</label>
                  <Input
                    type="url"
                    value={formData.live_url || ""}
                    onChange={(e) => setFormData((prev) => ({ ...prev, live_url: e.target.value }))}
                    placeholder="https://example.com"
                    className="theme-text bg-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium theme-text mb-2 theme-transition">GitHub URL</label>
                  <Input
                    type="url"
                    value={formData.github_url || ""}
                    onChange={(e) => setFormData((prev) => ({ ...prev, github_url: e.target.value }))}
                    placeholder="https://github.com/username/repo"
                    className="theme-text bg-transparent"
                  />
                </div>
              </div>

              {/* Image Management */}
              <ImageManager
                images={formData.images || []}
                onImagesChange={(images) => setFormData((prev) => ({ ...prev, images }))}
                bucketName="project-images"
              />

              {/* Publish Status */}
              <div className="flex items-center space-x-2 pt-4">
                <input
                  type="checkbox"
                  id="isPublished"
                  checked={formData.is_published || false}
                  onChange={(e) => setFormData((prev) => ({ ...prev, is_published: e.target.checked }))}
                  className="rounded"
                />
                <label htmlFor="isPublished" className="text-sm font-medium theme-text theme-transition">
                  Publish immediately
                </label>
              </div>
            </div>

            <div className="flex gap-4 mt-8 pt-6 border-t border-gray-300 dark:border-gray-600">
              <Button onClick={onSave} className="bg-primary hover:bg-primary/90 text-white flex-1">
                <Save className="w-4 h-4 mr-2" />
                {editingProject ? "Update Project" : "Create Project"}
              </Button>
              <Button variant="outline" onClick={onClose} className="flex-1 bg-transparent">
                Cancel
              </Button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
