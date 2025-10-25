"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { AnimatePresence, motion } from "framer-motion"
import { Save, X, User, UserX } from "lucide-react"
import { useThemeContext } from "@/context/theme-context"
import type { ClientReview } from "@/lib/supabase"
import { useSafeOverlayClose } from "@/hooks/use-safe-overlay-close"

type Props = {
  isOpen: boolean
  onClose: () => void
  onSave: () => void
  editingTestimonial: ClientReview | null
  categories: string[]
  formData: Partial<ClientReview>
  setFormData: (updater: (prev: Partial<ClientReview>) => Partial<ClientReview>) => void
}

export function TestimonialFormModal({
  isOpen,
  onClose,
  onSave,
  editingTestimonial,
  categories,
  formData,
  setFormData,
}: Props) {
  const { mode, color } = useThemeContext()
  const cardBgClass = mode === "dark" || color === "black" ? "bg-gray-900/40" : "bg-white/40"

  const overlay = useSafeOverlayClose(onClose)

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4 overflow-y-auto"
          onMouseDown={overlay.onMouseDown}
          onClick={overlay.onClick}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className={`${cardBgClass} backdrop-blur-md rounded-lg p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto theme-transition`}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold theme-text theme-transition">
                {editingTestimonial ? "Edit Testimonial" : "Add New Testimonial"}
              </h2>
              <Button variant="ghost" onClick={onClose}>
                <X className="w-5 h-5" />
              </Button>
            </div>

            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium theme-text mb-2 theme-transition">Testimonial Type *</label>
                <div className="flex gap-4">
                  <label className="flex items-center space-x-2 cursor-pointer">
                    <input
                      type="radio"
                      name="testimonial_type"
                      value="identified"
                      checked={formData.testimonial_type === "identified"}
                      onChange={(e) =>
                        setFormData((prev) => ({
                          ...prev,
                          testimonial_type: e.target.value as "identified" | "anonymous",
                        }))
                      }
                      className="text-primary"
                    />
                    <span className="text-sm theme-text theme-transition flex items-center">
                      <User className="w-4 h-4 mr-1" /> Identified (with client details)
                    </span>
                  </label>
                  <label className="flex items-center space-x-2 cursor-pointer">
                    <input
                      type="radio"
                      name="testimonial_type"
                      value="anonymous"
                      checked={formData.testimonial_type === "anonymous"}
                      onChange={(e) =>
                        setFormData((prev) => ({
                          ...prev,
                          testimonial_type: e.target.value as "identified" | "anonymous",
                        }))
                      }
                      className="text-primary"
                    />
                    <span className="text-sm theme-text theme-transition flex items-center">
                      <UserX className="w-4 h-4 mr-1" /> Anonymous (text and stars only)
                    </span>
                  </label>
                </div>
              </div>

              {formData.testimonial_type === "identified" && (
                <>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium theme-text mb-2 theme-transition">
                        Client Name *
                      </label>
                      <Input
                        value={formData.client_name || ""}
                        onChange={(e) => setFormData((prev) => ({ ...prev, client_name: e.target.value }))}
                        placeholder="John Doe"
                        className="theme-text bg-transparent"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium theme-text mb-2 theme-transition">Position *</label>
                      <Input
                        value={formData.client_position || ""}
                        onChange={(e) => setFormData((prev) => ({ ...prev, client_position: e.target.value }))}
                        placeholder="CEO"
                        className="theme-text bg-transparent"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium theme-text mb-2 theme-transition">Company *</label>
                      <Input
                        value={formData.client_company || ""}
                        onChange={(e) => setFormData((prev) => ({ ...prev, client_company: e.target.value }))}
                        placeholder="Company Name"
                        className="theme-text bg-transparent"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium theme-text mb-2 theme-transition">
                        Client Image URL
                      </label>
                      <Input
                        value={formData.client_image || ""}
                        onChange={(e) => setFormData((prev) => ({ ...prev, client_image: e.target.value }))}
                        placeholder="https://images.unsplash.com/photo-..."
                        className="theme-text bg-transparent"
                      />
                    </div>
                  </div>
                </>
              )}

              <div>
                <label className="block text-sm font-medium theme-text mb-2 theme-transition">Review Text *</label>
                <Textarea
                  value={formData.review_text || ""}
                  onChange={(e) => setFormData((prev) => ({ ...prev, review_text: e.target.value }))}
                  placeholder="The client's review..."
                  className="theme-text bg-transparent"
                  rows={4}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium theme-text mb-2 theme-transition">Rating</label>
                  <select
                    value={formData.rating || 5}
                    onChange={(e) => setFormData((prev) => ({ ...prev, rating: Number(e.target.value) }))}
                    className={`w-full px-3 py-2 rounded-md border ${mode === "dark" || color === "black" ? "border-gray-600 bg-gray-800/50" : "border-gray-300 bg-white/50"} theme-text theme-transition`}
                  >
                    {[5, 4, 3, 2, 1].map((rating) => (
                      <option key={rating} value={rating}>
                        {rating} Star{rating !== 1 ? "s" : ""}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium theme-text mb-2 theme-transition">Project Category</label>
                  <select
                    value={formData.project_category || ""}
                    onChange={(e) => setFormData((prev) => ({ ...prev, project_category: e.target.value }))}
                    className={`w-full px-3 py-2 rounded-md border ${mode === "dark" || color === "black" ? "border-gray-600 bg-gray-800/50" : "border-gray-300 bg-white/50"} theme-text theme-transition`}
                  >
                    <option value="">Select category</option>
                    {categories.map((c) => (
                      <option key={c} value={c}>
                        {c}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="flex items-center space-x-6">
                <div className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    id="isFeatured"
                    checked={formData.is_featured || false}
                    onChange={(e) => setFormData((prev) => ({ ...prev, is_featured: e.target.checked }))}
                    className="rounded"
                  />
                  <label htmlFor="isFeatured" className="text-sm font-medium theme-text theme-transition">
                    Featured Testimonial
                  </label>
                </div>
                <div className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    id="isTestimonialPublished"
                    checked={formData.is_published || false}
                    onChange={(e) => setFormData((prev) => ({ ...prev, is_published: e.target.checked }))}
                    className="rounded"
                  />
                  <label htmlFor="isTestimonialPublished" className="text-sm font-medium theme-text theme-transition">
                    Publish immediately
                  </label>
                </div>
              </div>
            </div>

            <div className="flex gap-4 mt-8 pt-6 border-t border-gray-300 dark:border-gray-600">
              <Button onClick={onSave} className="bg-primary hover:bg-primary/90 text-white flex-1">
                <Save className="w-4 h-4 mr-2" /> {editingTestimonial ? "Update Testimonial" : "Create Testimonial"}
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
