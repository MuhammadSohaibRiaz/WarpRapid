"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { AdminLayout } from "@/components/admin-layout"
import { useAuth } from "@/context/auth-context"
import AdminDashboard from "@/components/admin/admin-dashboard"

export default function AdminPage() {
  const { isAuthenticated, isLoading } = useAuth()
  const router = useRouter()

  // Redirect to login page if not authenticated
  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.replace('/admin-login')
    }
  }, [isAuthenticated, isLoading, router])

  if (isLoading) {
    return (
      <div className="min-h-screen theme-bg theme-transition flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="theme-text theme-transition">Initializing admin panel...</p>
        </div>
      </div>
    )
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen theme-bg theme-transition flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="theme-text theme-transition">Redirecting to login...</p>
        </div>
      </div>
    )
  }

  return (
    <AdminLayout>
      <AdminDashboard />
    </AdminLayout>
  )
}
