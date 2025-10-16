"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { AnimatePresence, motion } from "framer-motion"
import { Save, X } from "lucide-react"
import { useThemeContext } from "@/context/theme-context"
import type { BlogPost } from "@/lib/supabase"

type Props = {
  isOpen: boolean
  onClose: () => void
  onSave: () => void
  editingPost: BlogPost | null
  formData: Partial<BlogPost>
  setFormData: (updater: (prev: Partial<BlogPost>) => Partial<BlogPost>) => void
  blogTags: string[]
  slugify: (s: string) => string
}

export function BlogFormModal({
  isOpen,
  onClose,
  onSave,
  editingPost,
  formData,
  setFormData,
  blogTags,
  slugify,
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
                {editingPost ? "Edit Blog Post" : "Add New Blog Post"}
              </h2>
              <Button variant="ghost" onClick={onClose}>
                <X className="w-5 h-5" />
              </Button>
            </div>

            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium theme-text mb-2 theme-transition">Title *</label>
                  <Input
                    value={formData.title || ""}
                    onChange={(e) =>
                      setFormData((prev) => ({ ...prev, title: e.target.value, slug: slugify(e.target.value) }))
                    }
                    placeholder="Blog post title"
                    className="theme-text bg-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium theme-text mb-2 theme-transition">Slug</label>
                  <Input
                    value={formData.slug || ""}
                    onChange={(e) => setFormData((prev) => ({ ...prev, slug: e.target.value }))}
                    placeholder="blog-post-slug"
                    className="theme-text bg-transparent"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium theme-text mb-2 theme-transition">Author</label>
                  <Input
                    value={formData.author || ""}
                    onChange={(e) => setFormData((prev) => ({ ...prev, author: e.target.value }))}
                    placeholder="Author name"
                    className="theme-text bg-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium theme-text mb-2 theme-transition">Date</label>
                  <Input
                    type="date"
                    value={formData.date || ""}
                    onChange={(e) => setFormData((prev) => ({ ...prev, date: e.target.value }))}
                    className="theme-text bg-transparent"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium theme-text mb-2 theme-transition">Featured Image URL</label>
                <Input
                  value={formData.image || ""}
                  onChange={(e) => setFormData((prev) => ({ ...prev, image: e.target.value }))}
                  placeholder="https://images.unsplash.com/photo-..."
                  className="theme-text bg-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium theme-text mb-2 theme-transition">Tags</label>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-2 max-h-32 overflow-y-auto p-2 border rounded-md">
                  {blogTags.map((tag) => (
                    <label key={tag} className="flex items-center space-x-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={(formData.tags || []).includes(tag)}
                        onChange={(e) => {
                          const currentTags = formData.tags || []
                          if (e.target.checked) setFormData((prev) => ({ ...prev, tags: [...currentTags, tag] }))
                          else setFormData((prev) => ({ ...prev, tags: currentTags.filter((t) => t !== tag) }))
                        }}
                        className="rounded"
                      />
                      <span className="text-sm theme-text theme-transition">{tag}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium theme-text mb-2 theme-transition">Excerpt *</label>
                <Textarea
                  value={formData.excerpt || ""}
                  onChange={(e) => setFormData((prev) => ({ ...prev, excerpt: e.target.value }))}
                  placeholder="Brief description of the blog post"
                  className="theme-text bg-transparent"
                  rows={3}
                />
              </div>

              <div>
                <label className="block text-sm font-medium theme-text mb-2 theme-transition">Content *</label>
                <Textarea
                  value={formData.content || ""}
                  onChange={(e) => setFormData((prev) => ({ ...prev, content: e.target.value }))}
                  placeholder="Full blog post content (Markdown supported)"
                  className="theme-text bg-transparent"
                  rows={10}
                />
              </div>

              <div className="grid grid-cols-1 gap-4">
                <div>
                  <label className="block text-sm font-medium theme-text mb-2 theme-transition">SEO Title</label>
                  <Input
                    value={formData.seo_title || ""}
                    onChange={(e) => setFormData((prev) => ({ ...prev, seo_title: e.target.value }))}
                    placeholder="SEO optimized title"
                    className="theme-text bg-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium theme-text mb-2 theme-transition">SEO Description</label>
                  <Textarea
                    value={formData.seo_description || ""}
                    onChange={(e) => setFormData((prev) => ({ ...prev, seo_description: e.target.value }))}
                    placeholder="SEO meta description"
                    className="theme-text bg-transparent"
                    rows={2}
                  />
                </div>
              </div>

              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id="isBlogPublished"
                  checked={formData.is_published || false}
                  onChange={(e) => setFormData((prev) => ({ ...prev, is_published: e.target.checked }))}
                  className="rounded"
                />
                <label htmlFor="isBlogPublished" className="text-sm font-medium theme-text theme-transition">
                  Publish immediately
                </label>
              </div>
            </div>

            <div className="flex gap-4 mt-8 pt-6 border-t border-gray-300 dark:border-gray-600">
              <Button onClick={onSave} className="bg-primary hover:bg-primary/90 text-white flex-1">
                <Save className="w-4 h-4 mr-2" /> {editingPost ? "Update Blog Post" : "Create Blog Post"}
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
