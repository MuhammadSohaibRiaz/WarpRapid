"use client"

import { memo, useMemo } from "react"
import { Button } from "@/components/ui/button"
import { Edit, Eye, EyeOff, Star, Trash2, User, UserX } from "lucide-react"
import { motion } from "framer-motion"
import type { ClientReview } from "@/lib/supabase"

type Props = {
  testimonial: ClientReview
  onEdit: (t: ClientReview) => void
  onTogglePublish: (id: number) => void
  onToggleFeatured: (id: number) => void
  onDelete: (id: number) => void
  cardBgClass: string
  index: number
}

function TestimonialCardImpl({
  testimonial,
  onEdit,
  onTogglePublish,
  onToggleFeatured,
  onDelete,
  cardBgClass,
  index,
}: Props) {
  const delay = useMemo(() => index * 0.1, [index])

  return (
    <motion.div
      className={`${cardBgClass} backdrop-blur-md rounded-lg shadow-lg overflow-hidden theme-transition`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.3, ease: "easeOut" }}
    >
      <div className="p-4">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-3">
            {testimonial.testimonial_type === "identified" && testimonial.client_name ? (
              <>
                <img
                  src={testimonial.client_image || "/placeholder.svg?height=50&width=50&query=Client"}
                  alt={testimonial.client_name}
                  className="w-12 h-12 rounded-full object-cover"
                />
                <div>
                  <h3 className="font-semibold theme-text theme-transition">{testimonial.client_name}</h3>
                  <p className="text-sm theme-text opacity-70 theme-transition">
                    {testimonial.client_position} {testimonial.client_company ? `at ${testimonial.client_company}` : ""}
                  </p>
                </div>
              </>
            ) : (
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 rounded-full bg-gradient-to-r from-primary to-secondary flex items-center justify-center">
                  <UserX className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="font-semibold theme-text theme-transition">Anonymous Client</h3>
                  <p className="text-sm theme-text opacity-70 theme-transition">Verified Review</p>
                </div>
              </div>
            )}
          </div>
          <div className="flex flex-col items-end space-y-1">
            <span
              className={`px-2 py-1 rounded-full text-xs font-medium ${testimonial.is_published ? "bg-green-500 text-white" : "bg-yellow-500 text-black"}`}
            >
              {testimonial.is_published ? "Published" : "Draft"}
            </span>
            {testimonial.is_featured && (
              <span className="px-2 py-1 bg-blue-500 text-white rounded-full text-xs font-medium">Featured</span>
            )}
            <span
              className={`px-2 py-1 rounded-full text-xs font-medium ${
                testimonial.testimonial_type === "identified"
                  ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
                  : "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200"
              }`}
            >
              {testimonial.testimonial_type === "identified" ? (
                <>
                  <User className="w-3 h-3 inline mr-1" /> Identified
                </>
              ) : (
                <>
                  <UserX className="w-3 h-3 inline mr-1" /> Anonymous
                </>
              )}
            </span>
          </div>
        </div>

        <div className="flex items-center mb-3">
          {[...Array(testimonial.rating || 0)].map((_, i) => (
            <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
          ))}
        </div>

        <p className="text-sm theme-text opacity-80 mb-4 line-clamp-3 theme-transition">
          {'"' + testimonial.review_text + '"'}
        </p>

        {testimonial.project_category && (
          <div className="mb-4">
            <span className="px-2 py-1 bg-primary/20 text-primary rounded text-xs">{testimonial.project_category}</span>
          </div>
        )}

        <div className="flex gap-2">
          <Button size="sm" variant="outline" onClick={() => onEdit(testimonial)} className="flex-1">
            <Edit className="w-3 h-3 mr-1" /> Edit
          </Button>
          <Button
            size="sm"
            variant="outline"
            onClick={() => onToggleFeatured(testimonial.id)}
            className={testimonial.is_featured ? "text-blue-600" : "text-gray-600"}
          >
            <Star className="w-3 h-3" />
          </Button>
          <Button
            size="sm"
            variant="outline"
            onClick={() => onTogglePublish(testimonial.id)}
            className={testimonial.is_published ? "text-yellow-600" : "text-green-600"}
          >
            {testimonial.is_published ? <EyeOff className="w-3 h-3" /> : <Eye className="w-3 h-3" />}
          </Button>
          <Button
            size="sm"
            variant="outline"
            onClick={() => onDelete(testimonial.id)}
            className="text-red-600 hover:text-red-700"
          >
            <Trash2 className="w-3 h-3" />
          </Button>
        </div>
      </div>
    </motion.div>
  )
}

export const TestimonialCard = memo(TestimonialCardImpl)
