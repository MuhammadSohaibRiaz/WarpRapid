"use client"

import { memo, useMemo } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Edit, Eye, EyeOff, Trash2, Star } from "lucide-react"
import type { TrustedPartner } from "@/lib/supabase"

interface Props {
  partner: TrustedPartner
  onEdit: (p: TrustedPartner) => void
  onTogglePublish: (id: number) => void
  onToggleFeatured: (id: number) => void
  onDelete: (id: number) => void
  cardBgClass: string
  index: number
}

function PartnerCardImpl({ partner, onEdit, onTogglePublish, onToggleFeatured, onDelete, cardBgClass, index }: Props) {
  const delay = useMemo(() => index * 0.05, [index])

  return (
    <motion.div
      className={`${cardBgClass} backdrop-blur-md rounded-lg shadow-lg overflow-hidden theme-transition flex flex-col`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.25 }}
    >
      <div className="p-4 flex flex-col h-full">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-3 min-w-0">
            <img
              src={partner.company_logo || "/placeholder.svg?height=40&width=120&text=Logo"}
              alt={partner.company_name}
              className="h-12 w-auto max-w-[160px] object-contain"
            />
          </div>
          <div className="flex flex-col items-end space-y-1">
            <span className={`px-2 py-1 rounded-full text-xs font-medium ${partner.is_published ? "bg-green-500 text-white" : "bg-yellow-500 text-black"}`}>
              {partner.is_published ? "Published" : "Draft"}
            </span>
            {partner.is_featured && <span className="px-2 py-1 bg-blue-500 text-white rounded-full text-xs font-medium">Featured</span>}
          </div>
        </div>

        {partner.description && (
          <p className="text-sm theme-text opacity-80 mb-4 line-clamp-3">{partner.description}</p>
        )}

        <div className="flex gap-2 mt-auto">
          <Button size="sm" variant="outline" onClick={() => onEdit(partner)} className="flex-1">
            <Edit className="w-3 h-3 mr-1" /> Edit
          </Button>
          <Button size="sm" variant="outline" onClick={() => onToggleFeatured(partner.id)} className={partner.is_featured ? "text-blue-600" : "text-gray-600"}>
            <Star className="w-3 h-3" />
          </Button>
          <Button size="sm" variant="outline" onClick={() => onTogglePublish(partner.id)} className={partner.is_published ? "text-yellow-600" : "text-green-600"}>
            {partner.is_published ? <EyeOff className="w-3 h-3" /> : <Eye className="w-3 h-3" />}
          </Button>
          <Button size="sm" variant="outline" onClick={() => onDelete(partner.id)} className="text-red-600 hover:text-red-700">
            <Trash2 className="w-3 h-3" />
          </Button>
        </div>
      </div>
    </motion.div>
  )
}

export const PartnerCard = memo(PartnerCardImpl)
