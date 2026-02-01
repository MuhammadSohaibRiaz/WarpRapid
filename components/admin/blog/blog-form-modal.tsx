"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { AnimatePresence, motion } from "framer-motion"
import { Save, X } from "lucide-react"
import { useThemeContext } from "@/context/theme-context"
import type { BlogPost, ProjectImage } from "@/lib/supabase"
import { ImageManager } from "@/components/admin/shared/ImageManager"
import { TagInput } from "./tag-input"

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

              {/* Image Management */}
              <ImageManager
                images={formData.images || []}
                onImagesChange={(images) => setFormData((prev) => ({ ...prev, images }))}
                bucketName="blog-images"
                placeholder="https://fmwzrgjfxgxnnislysya.supabase.co/storage/v1/object/public/blog-images/your-blog-image.jpg"
              />

              <div>
                <label className="block text-sm font-medium theme-text mb-2 theme-transition">Tags & Keywords</label>
                <TagInput
                  tags={formData.tags || []}
                  onChange={(tags) => setFormData((prev) => ({ ...prev, tags }))}
                  suggestions={blogTags}
                />
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
                <div className="flex items-center justify-between mb-2">
                  <label className="block text-sm font-medium theme-text theme-transition">Content *</label>
                  <span className="text-xs opacity-50 theme-text">Markdown Supported</span>
                </div>

                {/* Markdown Toolbar */}
                <div className="flex flex-wrap gap-2 mb-2 p-2 border rounded-t-md bg-black/5 dark:bg-white/5 border-b-0 border-gray-300 dark:border-gray-600">
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="h-8 px-2 text-xs"
                    onClick={() => {
                      const textArea = document.getElementById('blog-content-area') as HTMLTextAreaElement;
                      const selectionStart = textArea.selectionStart;
                      const selectionEnd = textArea.selectionEnd;
                      const text = formData.content || "";
                      const newText = text.substring(0, selectionStart) + "**" + text.substring(selectionStart, selectionEnd) + "**" + text.substring(selectionEnd);
                      setFormData(prev => ({ ...prev, content: newText }));
                    }}
                  >
                    <strong>B</strong>
                  </Button>
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="h-8 px-2 text-xs italic"
                    onClick={() => {
                      const textArea = document.getElementById('blog-content-area') as HTMLTextAreaElement;
                      const selectionStart = textArea.selectionStart;
                      const selectionEnd = textArea.selectionEnd;
                      const text = formData.content || "";
                      const newText = text.substring(0, selectionStart) + "*" + text.substring(selectionStart, selectionEnd) + "*" + text.substring(selectionEnd);
                      setFormData(prev => ({ ...prev, content: newText }));
                    }}
                  >
                    I
                  </Button>
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="h-8 px-2 text-xs"
                    onClick={() => setFormData(prev => ({ ...prev, content: (prev.content || "") + "\n## " }))}
                  >
                    H2
                  </Button>
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="h-8 px-2 text-xs"
                    onClick={() => setFormData(prev => ({ ...prev, content: (prev.content || "") + "\n\n[Link Text](https://...)" }))}
                  >
                    Link
                  </Button>
                  <div className="w-px h-4 bg-border mx-1 mt-2" />

                  {/* Image Gallery Shortcodes */}
                  {formData.images && formData.images.length > 0 && (
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] uppercase font-bold opacity-40 ml-2">Gallery:</span>
                      {formData.images.map((img, i) => (
                        <div key={img.id} className="flex items-center gap-1">
                          <Button
                            type="button"
                            variant="outline"
                            size="sm"
                            className="h-8 px-2 text-[10px] bg-primary/5 border-primary/20 hover:bg-primary/10"
                            title={`Insert ${img.alt || `Image ${i}`} (Full Width)`}
                            onClick={() => {
                              const text = formData.content || "";
                              const insertion = `\n\n[Image:${i}]\n\n`;
                              setFormData(prev => ({ ...prev, content: text + insertion }));
                            }}
                          >
                            IMG:{i}
                          </Button>
                          <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            className="h-8 px-1.5 text-[9px] opacity-60 hover:opacity-100"
                            title="Float Left"
                            onClick={() => {
                              const text = formData.content || "";
                              const insertion = `\n\n[Image:${i}:left]\n\n`;
                              setFormData(prev => ({ ...prev, content: text + insertion }));
                            }}
                          >
                            ←
                          </Button>
                          <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            className="h-8 px-1.5 text-[9px] opacity-60 hover:opacity-100"
                            title="Float Right"
                            onClick={() => {
                              const text = formData.content || "";
                              const insertion = `\n\n[Image:${i}:right]\n\n`;
                              setFormData(prev => ({ ...prev, content: text + insertion }));
                            }}
                          >
                            →
                          </Button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                <Textarea
                  id="blog-content-area"
                  value={formData.content || ""}
                  onChange={(e) => setFormData((prev) => ({ ...prev, content: e.target.value }))}
                  placeholder="Structure your post using Markdown. Use [Image:0] for full-width images, or [Image:0:left] / [Image:0:right] to float images alongside text."
                  className="theme-text bg-transparent rounded-t-none border-t-0 border-gray-300 dark:border-gray-600"
                  rows={15}
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

              {/* FAQ Management */}
              <div className="space-y-4 pt-4 border-t border-gray-300 dark:border-gray-600">
                <div className="flex items-center justify-between">
                  <label className="block text-sm font-medium theme-text theme-transition">Frequently Asked Questions</label>
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      const currentFaqs = formData.faqs || [];
                      setFormData(prev => ({ ...prev, faqs: [...currentFaqs, { question: "", answer: "" }] }));
                    }}
                  >
                    Add FAQ
                  </Button>
                </div>
                <div className="space-y-4">
                  {(formData.faqs || []).map((faq, index) => (
                    <div key={index} className="p-4 border rounded-lg bg-black/5 dark:bg-white/5 space-y-3 relative group">
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        className="absolute top-2 right-2 h-6 w-6 text-red-500 opacity-0 group-hover:opacity-100 transition-opacity"
                        onClick={() => {
                          const newFaqs = [...(formData.faqs || [])];
                          newFaqs.splice(index, 1);
                          setFormData(prev => ({ ...prev, faqs: newFaqs }));
                        }}
                      >
                        <X className="w-4 h-4" />
                      </Button>
                      <div>
                        <Input
                          placeholder="Question"
                          value={faq.question}
                          onChange={(e) => {
                            const newFaqs = [...(formData.faqs || [])];
                            newFaqs[index].question = e.target.value;
                            setFormData(prev => ({ ...prev, faqs: newFaqs }));
                          }}
                          className="theme-text bg-transparent font-medium"
                        />
                      </div>
                      <div>
                        <Textarea
                          placeholder="Answer"
                          value={faq.answer}
                          onChange={(e) => {
                            const newFaqs = [...(formData.faqs || [])];
                            newFaqs[index].answer = e.target.value;
                            setFormData(prev => ({ ...prev, faqs: newFaqs }));
                          }}
                          className="theme-text bg-transparent text-sm"
                          rows={2}
                        />
                      </div>
                    </div>
                  ))}
                  {(formData.faqs || []).length === 0 && (
                    <p className="text-xs opacity-50 text-center theme-text italic">No FAQs added yet.</p>
                  )}
                </div>
              </div>

              {/* CTA Customization */}
              <div className="space-y-4 pt-4 border-t border-gray-300 dark:border-gray-600">
                <label className="block text-sm font-medium theme-text theme-transition">Custom Call to Action (Optional)</label>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Input
                    placeholder="CTA Title (e.g., Ready to start?)"
                    value={formData.cta?.title || ""}
                    onChange={(e) => setFormData(prev => ({ ...prev, cta: { ...(prev.cta || {}), title: e.target.value } }))}
                    className="theme-text bg-transparent"
                  />
                  <Input
                    placeholder="Button Text"
                    value={formData.cta?.buttonText || ""}
                    onChange={(e) => setFormData(prev => ({ ...prev, cta: { ...(prev.cta || {}), buttonText: e.target.value } }))}
                    className="theme-text bg-transparent"
                  />
                  <Input
                    placeholder="Button Link"
                    value={formData.cta?.buttonLink || ""}
                    onChange={(e) => setFormData(prev => ({ ...prev, cta: { ...(prev.cta || {}), buttonLink: e.target.value } }))}
                    className="theme-text bg-transparent"
                  />
                  <Textarea
                    placeholder="CTA Description"
                    value={formData.cta?.description || ""}
                    onChange={(e) => setFormData(prev => ({ ...prev, cta: { ...(prev.cta || {}), description: e.target.value } }))}
                    className="theme-text bg-transparent"
                    rows={1}
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
