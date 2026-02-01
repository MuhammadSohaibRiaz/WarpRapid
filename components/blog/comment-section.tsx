import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { useThemeContext } from "@/context/theme-context"
import { MessageSquare, Send, User, Calendar as CalendarIcon, ShieldCheck } from "lucide-react"
import { useSupabaseCMS, type BlogComment } from "@/lib/supabase-cms"
import { formatDate } from "@/lib/utils"

interface CommentFormData {
  name: string
  email: string
  website: string
  comment: string
  saveInfo: boolean
}

interface CommentSectionProps {
  postSlug?: string
  postTitle?: string
}

export function CommentSection({ postSlug, postTitle }: CommentSectionProps) {
  const { mode, color } = useThemeContext()
  const isDark = mode === "dark" || color === "black"
  const cms = useSupabaseCMS()

  const [formData, setFormData] = useState<CommentFormData>({
    name: "",
    email: "",
    website: "",
    comment: "",
    saveInfo: false
  })

  const [comments, setComments] = useState<BlogComment[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [errors, setErrors] = useState<Partial<CommentFormData>>({})

  // Load comments on mount
  useEffect(() => {
    if (postSlug) {
      loadComments()
    }
  }, [postSlug])

  const loadComments = async () => {
    try {
      setIsLoading(true)
      const data = await cms.getCommentsForPost(postSlug!)
      setComments(data)
    } catch (error) {
      console.error("Error loading comments:", error)
    } finally {
      setIsLoading(false)
    }
  }

  const validateForm = (): boolean => {
    const newErrors: Partial<CommentFormData> = {}

    if (!formData.name.trim()) {
      newErrors.name = "Name is required"
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required"
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Please enter a valid email"
    }

    if (!formData.comment.trim()) {
      newErrors.comment = "Comment is required"
    } else if (formData.comment.trim().length < 5) {
      newErrors.comment = "Comment must be at least 5 characters long"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateForm()) return

    setIsSubmitting(true)

    try {
      await cms.addComment({
        post_slug: postSlug || "general",
        name: formData.name,
        email: formData.email,
        website: formData.website,
        content: formData.comment
      })

      setSubmitted(true)
      setFormData({
        name: "",
        email: "",
        website: "",
        comment: "",
        saveInfo: false
      })

      // Auto-hide success message after 5 seconds
      setTimeout(() => setSubmitted(false), 5000)

    } catch (error) {
      console.error("Error submitting comment:", error)
      alert("There was an error submitting your comment. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleInputChange = (field: keyof CommentFormData) => (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const value = e.target.type === 'checkbox' ? (e.target as HTMLInputElement).checked : e.target.value
    setFormData(prev => ({ ...prev, [field]: value }))

    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: undefined }))
    }
  }

  return (
    <div className="space-y-12">
      {/* Comments List */}
      <section className="space-y-8">
        <div className="flex items-center gap-3">
          <div className={`p-2 rounded-full ${isDark ? "bg-primary/20" : "bg-primary/10"}`}>
            <MessageSquare className="w-5 h-5 text-primary" />
          </div>
          <h2 className="text-2xl font-bold theme-text">
            {comments.length} Discussion{comments.length !== 1 ? "s" : ""}
          </h2>
        </div>

        {isLoading ? (
          <div className="flex justify-center py-12">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
          </div>
        ) : comments.length > 0 ? (
          <div className="space-y-6">
            {comments.map((comment, index) => (
              <motion.div
                key={comment.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className={`p-6 rounded-2xl border ${isDark ? "bg-muted/30 border-border/50" : "bg-white border-border"
                  } shadow-sm`}
              >
                <div className="flex justify-between items-start mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-purple-500 flex items-center justify-center text-white font-bold">
                      {comment.name.charAt(0).toUpperCase()}
                    </div>
                    <div>
                      <h4 className="font-bold theme-text">{comment.name}</h4>
                      <div className="flex items-center gap-2 text-xs text-muted-foreground">
                        <CalendarIcon className="w-3 h-3" />
                        <span>{formatDate(comment.created_at)}</span>
                      </div>
                    </div>
                  </div>
                </div>
                <p className="text-muted-foreground leading-relaxed whitespace-pre-wrap">
                  {comment.content}
                </p>
              </motion.div>
            ))}
          </div>
        ) : (
          <div className={`p-8 rounded-2xl border border-dashed border-border/50 text-center`}>
            <p className="text-muted-foreground italic">No comments yet. Be the first to share your thoughts!</p>
          </div>
        )}
      </section>

      {/* Comment Form */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className={`${isDark ? "bg-gray-900/40" : "bg-white/40"
          } backdrop-blur-md rounded-[2.5rem] p-8 md:p-10 shadow-xl border ${isDark ? "border-gray-700/50" : "border-gray-200/50"
          } theme-transition relative overflow-hidden`}
      >
        <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 blur-3xl rounded-full translate-x-1/2 -translate-y-1/2" />

        <div className="relative z-10">
          <div className="flex items-center gap-3 mb-8">
            <h2 className="text-3xl font-black theme-text tracking-tight">Leave a Reply</h2>
          </div>

          <AnimatePresence>
            {submitted ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className="bg-green-500/10 border border-green-500/20 rounded-2xl p-6 flex items-center gap-4 text-green-600 mb-8"
              >
                <ShieldCheck className="w-8 h-8 flex-shrink-0" />
                <div>
                  <h4 className="font-bold">Comment Submitted!</h4>
                  <p className="text-sm">Thank you! Your comment is currently being reviewed by our moderators and will appear once approved.</p>
                </div>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6" noValidate>
                <div>
                  <label htmlFor="comment" className="block text-sm font-bold theme-text mb-3">
                    Comment <span className="text-primary">*</span>
                  </label>
                  <Textarea
                    id="comment"
                    value={formData.comment}
                    onChange={handleInputChange("comment")}
                    placeholder="Join the discussion..."
                    rows={5}
                    className={`w-full rounded-2xl resize-none theme-text ${isDark ? "bg-muted/50 border-border/50" : "bg-white border-border"
                      } focus:ring-2 focus:ring-primary/20 transition-all ${errors.comment ? "border-red-500" : ""}`}
                  />
                  {errors.comment && <p className="text-xs text-red-500 mt-2 font-medium">{errors.comment}</p>}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-bold theme-text mb-3">
                      Name <span className="text-primary">*</span>
                    </label>
                    <Input
                      id="name"
                      type="text"
                      value={formData.name}
                      onChange={handleInputChange("name")}
                      placeholder="Your name"
                      className={`rounded-xl ${isDark ? "bg-muted/50 border-border/50" : "bg-white border-border"
                        } ${errors.name ? "border-red-500" : ""}`}
                    />
                    {errors.name && <p className="text-xs text-red-500 mt-2 font-medium">{errors.name}</p>}
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-sm font-bold theme-text mb-3">
                      Email <span className="text-primary">*</span>
                    </label>
                    <Input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={handleInputChange("email")}
                      placeholder="your@email.com"
                      className={`rounded-xl ${isDark ? "bg-muted/50 border-border/50" : "bg-white border-border"
                        } ${errors.email ? "border-red-500" : ""}`}
                    />
                    {errors.email && <p className="text-xs text-red-500 mt-2 font-medium">{errors.email}</p>}
                  </div>
                </div>

                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full md:w-auto bg-primary hover:bg-primary/90 text-white px-10 py-6 rounded-full font-bold text-lg shadow-xl shadow-primary/20 transition-all hover:scale-105 active:scale-95 disabled:opacity-50"
                >
                  {isSubmitting ? (
                    <div className="flex items-center gap-2">
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                      Posting...
                    </div>
                  ) : (
                    <div className="flex items-center gap-2">
                      <Send className="w-4 h-4" />
                      Post Comment
                    </div>
                  )}
                </Button>
              </form>
            )}
          </AnimatePresence>

          <p className="mt-8 text-xs text-muted-foreground leading-relaxed">
            <span className="font-bold text-primary mr-1 italic">Note:</span>
            All comments undergo a manual review process to ensure a high-quality discussion.
            Avoid spam, disrespectful language, or promotional content.
          </p>
        </div>
      </motion.section>
    </div>
  )
}