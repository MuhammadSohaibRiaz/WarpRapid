"use client"

import { useState, useCallback } from "react"

export interface AdminToast {
  id: string
  title: string
  description?: string
  type: "success" | "error" | "info" | "warning"
  duration?: number
}

export function useAdminToast() {
  const [toasts, setToasts] = useState<AdminToast[]>([])

  const addToast = useCallback((toast: Omit<AdminToast, "id">) => {
    const id = Date.now().toString() + Math.random().toString(36)
    const newToast = { ...toast, id }
    setToasts(prev => [...prev, newToast])

    // Auto-dismiss after duration
    if (toast.duration !== 0) {
      setTimeout(() => {
        setToasts(prev => prev.filter(t => t.id !== id))
      }, toast.duration || 5000)
    }

    return id
  }, [])

  const removeToast = useCallback((id: string) => {
    setToasts(prev => prev.filter(t => t.id !== id))
  }, [])

  const success = useCallback((title: string, description?: string, duration?: number) => {
    return addToast({ title, description, type: "success", duration })
  }, [addToast])

  const error = useCallback((title: string, description?: string, duration?: number) => {
    return addToast({ title, description, type: "error", duration })
  }, [addToast])

  const info = useCallback((title: string, description?: string, duration?: number) => {
    return addToast({ title, description, type: "info", duration })
  }, [addToast])

  const warning = useCallback((title: string, description?: string, duration?: number) => {
    return addToast({ title, description, type: "warning", duration })
  }, [addToast])

  const clearAll = useCallback(() => {
    setToasts([])
  }, [])

  return {
    toasts,
    addToast,
    removeToast,
    success,
    error,
    info,
    warning,
    clearAll,
  }
}