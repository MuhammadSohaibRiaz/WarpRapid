"use client"

import { AnimatePresence, motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { X, Save, Star } from "lucide-react"
import { useThemeContext } from "@/context/theme-context"
import type { TrustedPartner } from "@/lib/supabase"

interface Props {
  isOpen: boolean
  onClose: () => void
  onSave: () => void
  editingPartner: TrustedPartner | null
  formData: Partial<TrustedPartner>
  setFormData: (updater: (prev: Partial<TrustedPartner>) => Partial<TrustedPartner>) => void
}

export function PartnerFormModal({ isOpen, onClose, onSave, editingPartner, formData, setFormData }: Props) {
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
            className={`${cardBgClass} backdrop-blur-md rounded-lg p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto theme-transition`}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold theme-text theme-transition">
                {editingPartner ? "Edit Partner" : "Add Partner"}
              </h2>
              <Button variant="ghost" onClick={onClose}>
                <X className="w-5 h-5" />
              </Button>
            </div>

            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium theme-text mb-2">Company Name *</label>
                  <Input
                    value={formData.company_name || ""}
                    onChange={(e) => setFormData((prev) => ({ ...prev, company_name: e.target.value }))}
                    placeholder="Acme Inc."
                    className="theme-text bg-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium theme-text mb-2">Website</label>
                  <Input
                    type="url"
                    value={formData.company_website || ""}
                    onChange={(e) => setFormData((prev) => ({ ...prev, company_website: e.target.value }))}
                    placeholder="https://acme.com"
                    className="theme-text bg-transparent"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium theme-text mb-2">Logo URL *</label>
                <Input
                  value={formData.company_logo || ""}
                  onChange={(e) => setFormData((prev) => ({ ...prev, company_logo: e.target.value }))}
                  placeholder="https://<project>.supabase.co/storage/v1/object/public/partner-logos/logo.png"
                  className="theme-text bg-transparent"
                />
                <p className="text-xs theme-text opacity-60 mt-1">
                  Upload logos to Supabase Storage bucket "partner-logos" and paste the public URL here.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium theme-text mb-2">Partnership Type</label>
                  <Input
                    value={formData.partnership_type || ""}
                    onChange={(e) => setFormData((prev) => ({ ...prev, partnership_type: e.target.value }))}
                    placeholder="Technology Partner"
                    className="theme-text bg-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium theme-text mb-2">Display Order</label>
                  <Input
                    type="number"
                    min="0"
                    value={formData.display_order ?? 0}
                    onChange={(e) => setFormData((prev) => ({ ...prev, display_order: Number(e.target.value) || 0 }))}
                    className="theme-text bg-transparent"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium theme-text mb-2">Description</label>
                <Textarea
                  value={formData.description || ""}
                  onChange={(e) => setFormData((prev) => ({ ...prev, description: e.target.value }))}
                  rows={3}
                  className="theme-text bg-transparent"
                />
              </div>

              <div className="flex items-center gap-6">
                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={formData.is_published || false}
                    onChange={(e) => setFormData((prev) => ({ ...prev, is_published: e.target.checked }))}
                  />
                  <span className="text-sm theme-text">Published</span>
                </label>
                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={formData.is_featured || false}
                    onChange={(e) => setFormData((prev) => ({ ...prev, is_featured: e.target.checked }))}
                  />
                  <span className="text-sm theme-text flex items-center">
                    <Star className="w-3 h-3 mr-1" /> Featured
                  </span>
                </label>
              </div>
            </div>

            <div className="flex gap-4 mt-8 pt-6 border-t border-gray-300 dark:border-gray-600">
              <Button onClick={onSave} className="bg-primary hover:bg-primary/90 text-white">
                <Save className="w-4 h-4 mr-2" /> Save Partner
              </Button>
              <Button variant="outline" onClick={onClose}>
                Cancel
              </Button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
