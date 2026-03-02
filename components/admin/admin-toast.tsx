"use client"

import { motion, AnimatePresence } from "framer-motion"
import { X, CheckCircle, AlertCircle, Info, AlertTriangle } from "lucide-react"
import { Button } from "@/components/ui/button"
import type { AdminToast } from "@/hooks/use-admin-toast"

interface AdminToastProps {
  toast: AdminToast
  onClose: (id: string) => void
}

function AdminToastItem({ toast, onClose }: AdminToastProps) {
  const iconMap = {
    success: CheckCircle,
    error: AlertCircle,
    info: Info,
    warning: AlertTriangle,
  }

  const bgColorMap = {
    success: "bg-emerald-500/10 border-emerald-500/20 text-emerald-900 dark:text-emerald-50",
    error: "bg-rose-500/10 border-rose-500/20 text-rose-900 dark:text-rose-50",
    info: "bg-sky-500/10 border-sky-500/20 text-sky-900 dark:text-sky-50",
    warning: "bg-amber-500/10 border-amber-500/20 text-amber-900 dark:text-amber-50",
  }

  const iconColorMap = {
    success: "text-emerald-500",
    error: "text-rose-500",
    info: "text-sky-500",
    warning: "text-amber-500",
  }

  const Icon = iconMap[toast.type]

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20, scale: 0.9 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95, transition: { duration: 0.2 } }}
      className={`
        relative flex w-full max-w-sm items-center gap-4 rounded-xl border p-4 shadow-2xl backdrop-blur-xl theme-transition
        ${bgColorMap[toast.type]}
      `}
    >
      <div className={`flex-shrink-0 p-2 rounded-lg bg-white/10 dark:bg-black/20 ${iconColorMap[toast.type]}`}>
        <Icon className="h-5 w-5" />
      </div>

      <div className="flex-1 min-w-0">
        <h4 className="text-sm font-bold leading-none mb-1">{toast.title}</h4>
        {toast.description && (
          <p className="text-xs opacity-70 leading-relaxed truncate">{toast.description}</p>
        )}
      </div>

      <button
        onClick={() => onClose(toast.id)}
        className="flex-shrink-0 p-1 rounded-md hover:bg-black/5 dark:hover:bg-white/10 transition-colors"
      >
        <X className="h-4 w-4 opacity-50" />
      </button>
    </motion.div>
  )
}

interface AdminToastContainerProps {
  toasts: AdminToast[]
  onClose: (id: string) => void
}

export function AdminToastContainer({ toasts, onClose }: AdminToastContainerProps) {
  return (
    <div className="fixed top-6 right-6 z-[250] flex flex-col items-end space-y-3 pointer-events-none">
      <AnimatePresence mode="popLayout">
        {toasts.map((toast) => (
          <div key={toast.id} className="pointer-events-auto w-80 md:w-96">
            <AdminToastItem
              toast={toast}
              onClose={onClose}
            />
          </div>
        ))}
      </AnimatePresence>
    </div>
  )
}