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

  const colorMap = {
    success: "border-green-200 bg-green-50 text-green-800 dark:border-green-800 dark:bg-green-900/40 dark:text-green-200",
    error: "border-red-200 bg-red-50 text-red-800 dark:border-red-800 dark:bg-red-900/40 dark:text-red-200",
    info: "border-blue-200 bg-blue-50 text-blue-800 dark:border-blue-800 dark:bg-blue-900/40 dark:text-blue-200",
    warning: "border-yellow-200 bg-yellow-50 text-yellow-800 dark:border-yellow-800 dark:bg-yellow-900/40 dark:text-yellow-200",
  }

  const iconColorMap = {
    success: "text-green-600 dark:text-green-400",
    error: "text-red-600 dark:text-red-400", 
    info: "text-blue-600 dark:text-blue-400",
    warning: "text-yellow-600 dark:text-yellow-400",
  }

  const Icon = iconMap[toast.type]

  return (
    <motion.div
      initial={{ opacity: 0, x: 100, scale: 0.95 }}
      animate={{ opacity: 1, x: 0, scale: 1 }}
      exit={{ opacity: 0, x: 100, scale: 0.95 }}
      transition={{ type: "spring", stiffness: 500, damping: 30 }}
      className={`
        relative flex w-full max-w-sm items-start space-x-3 rounded-lg border p-4 shadow-xl backdrop-blur-sm
        ${colorMap[toast.type]}
      `}
    >
      <Icon className={`mt-0.5 h-5 w-5 flex-shrink-0 ${iconColorMap[toast.type]}`} />
      
      <div className="flex-1 min-w-0">
        <h4 className="text-sm font-semibold leading-tight">{toast.title}</h4>
        {toast.description && (
          <p className="text-sm opacity-90 mt-1 leading-tight">{toast.description}</p>
        )}
      </div>

      <Button
        variant="ghost"
        size="sm"
        onClick={() => onClose(toast.id)}
        className="h-6 w-6 p-0 hover:bg-black/10 dark:hover:bg-white/10 flex-shrink-0"
      >
        <X className="h-4 w-4" />
      </Button>
    </motion.div>
  )
}

interface AdminToastContainerProps {
  toasts: AdminToast[]
  onClose: (id: string) => void
}

export function AdminToastContainer({ toasts, onClose }: AdminToastContainerProps) {
  return (
    <div className="fixed bottom-4 right-4 z-[200] flex flex-col space-y-2 pointer-events-none">
      <AnimatePresence mode="popLayout">
        {toasts.map((toast) => (
          <div key={toast.id} className="pointer-events-auto">
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