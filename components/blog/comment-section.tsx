"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { useThemeContext } from "@/context/theme-context"
import { MessageSquare, Send, User } from "lucide-react"

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
  
  const [formData, setFormData] = useState<CommentFormData>({
    name: "",
    email: "",
    website: "",
    comment: "",
    saveInfo: false
  })
  
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [errors, setErrors] = useState<Partial<CommentFormData>>({})

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
    } else if (formData.comment.trim().length < 10) {
      newErrors.comment = "Comment must be at least 10 characters long"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!validateForm()) return
    
    setIsSubmitting(true)
    
    try {
      // Here you would normally submit to your backend/API
      // For now, we'll simulate the submission
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      // Reset form on success
      setFormData({
        name: "",
        email: "",
        website: "",
        comment: "",
        saveInfo: false
      })
      
      // You could show a success toast here
      alert("Thank you for your comment! It has been submitted for review.")
      
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
    
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: undefined }))
    }
  }

  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className={`${
        isDark ? "bg-gray-900/40" : "bg-white/40"
      } backdrop-blur-md rounded-lg p-6 md:p-8 shadow-lg border ${
        isDark ? "border-gray-700/50" : "border-gray-200/50"
      } theme-transition`}
      aria-labelledby="comment-section-title"
    >
      <div className="flex items-center gap-3 mb-6">
        <div className={`p-2 rounded-full ${
          isDark ? "bg-blue-600/20" : "bg-blue-100"
        } theme-transition`}>
          <MessageSquare className={`w-5 h-5 ${
            isDark ? "text-blue-400" : "text-blue-600"
          }`} />
        </div>
        <h2 
          id="comment-section-title"
          className="text-2xl font-bold theme-text theme-transition"
        >
          Leave a Reply
        </h2>
      </div>

      <div className="mb-6">
        <p className={`text-sm ${
          isDark ? "text-gray-300" : "text-gray-600"
        } theme-transition`}>
          Your email address will not be published. Required fields are marked{" "}
          <span className="text-red-500 font-medium">*</span>
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6" noValidate>
        {/* Comment Field */}
        <div>
          <label 
            htmlFor="comment" 
            className="block text-sm font-medium theme-text mb-2 theme-transition"
          >
            Comment <span className="text-red-500">*</span>
          </label>
          <Textarea
            id="comment"
            value={formData.comment}
            onChange={handleInputChange("comment")}
            placeholder="Write your thoughts here..."
            rows={6}
            className={`w-full resize-none theme-text ${
              isDark 
                ? "bg-gray-800/50 border-gray-600 focus:border-blue-500" 
                : "bg-white/50 border-gray-300 focus:border-blue-500"
            } theme-transition ${errors.comment ? "border-red-500" : ""}`}
            aria-invalid={!!errors.comment}
            aria-describedby={errors.comment ? "comment-error" : undefined}
          />
          {errors.comment && (
            <p id="comment-error" className="text-sm text-red-500 mt-1" role="alert">
              {errors.comment}
            </p>
          )}
        </div>

        {/* Name, Email, Website Fields */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label 
              htmlFor="name" 
              className="block text-sm font-medium theme-text mb-2 theme-transition"
            >
              Name <span className="text-red-500">*</span>
            </label>
            <Input
              id="name"
              type="text"
              value={formData.name}
              onChange={handleInputChange("name")}
              placeholder="Your full name"
              className={`theme-text ${
                isDark 
                  ? "bg-gray-800/50 border-gray-600 focus:border-blue-500" 
                  : "bg-white/50 border-gray-300 focus:border-blue-500"
              } theme-transition ${errors.name ? "border-red-500" : ""}`}
              aria-invalid={!!errors.name}
              aria-describedby={errors.name ? "name-error" : undefined}
            />
            {errors.name && (
              <p id="name-error" className="text-sm text-red-500 mt-1" role="alert">
                {errors.name}
              </p>
            )}
          </div>

          <div>
            <label 
              htmlFor="email" 
              className="block text-sm font-medium theme-text mb-2 theme-transition"
            >
              Email <span className="text-red-500">*</span>
            </label>
            <Input
              id="email"
              type="email"
              value={formData.email}
              onChange={handleInputChange("email")}
              placeholder="your.email@example.com"
              className={`theme-text ${
                isDark 
                  ? "bg-gray-800/50 border-gray-600 focus:border-blue-500" 
                  : "bg-white/50 border-gray-300 focus:border-blue-500"
              } theme-transition ${errors.email ? "border-red-500" : ""}`}
              aria-invalid={!!errors.email}
              aria-describedby={errors.email ? "email-error" : undefined}
            />
            {errors.email && (
              <p id="email-error" className="text-sm text-red-500 mt-1" role="alert">
                {errors.email}
              </p>
            )}
          </div>

          <div>
            <label 
              htmlFor="website" 
              className="block text-sm font-medium theme-text mb-2 theme-transition"
            >
              Website
            </label>
            <Input
              id="website"
              type="url"
              value={formData.website}
              onChange={handleInputChange("website")}
              placeholder="https://your-website.com"
              className={`theme-text ${
                isDark 
                  ? "bg-gray-800/50 border-gray-600 focus:border-blue-500" 
                  : "bg-white/50 border-gray-300 focus:border-blue-500"
              } theme-transition`}
            />
          </div>
        </div>

        {/* Save Info Checkbox */}
        <div className="flex items-center space-x-3">
          <input
            id="saveInfo"
            type="checkbox"
            checked={formData.saveInfo}
            onChange={handleInputChange("saveInfo")}
            className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
          />
          <label 
            htmlFor="saveInfo" 
            className="text-sm theme-text theme-transition cursor-pointer"
          >
            Save my name, email, and website in this browser for the next time I comment.
          </label>
        </div>

        {/* Submit Button */}
        <div>
          <Button
            type="submit"
            disabled={isSubmitting}
            className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-3 rounded-lg font-medium transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
          >
            {isSubmitting ? (
              <div className="flex items-center">
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                Posting Comment...
              </div>
            ) : (
              <div className="flex items-center">
                <Send className="w-4 h-4 mr-2" />
                Post Comment
              </div>
            )}
          </Button>
        </div>
      </form>

      {/* Privacy Notice */}
      <div className={`mt-8 p-4 rounded-lg ${
        isDark ? "bg-gray-800/30" : "bg-gray-50/50"
      } border ${isDark ? "border-gray-700/30" : "border-gray-200/30"} theme-transition`}>
        <p className={`text-xs ${
          isDark ? "text-gray-400" : "text-gray-500"
        } theme-transition`}>
          <strong>Privacy Notice:</strong> Your personal information will be used only for commenting purposes. 
          We respect your privacy and will never share your details with third parties. 
          Comments are moderated and may take some time to appear.
        </p>
      </div>
    </motion.section>
  )
}