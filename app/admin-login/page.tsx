"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { AdminAuth } from "@/components/admin-auth"
import { useAuth } from "@/context/auth-context"

export default function AdminLoginPage() {
  const { isAuthenticated, isLoading, login, isLockedOut, lockoutTimeRemaining, failedAttempts, formatLockoutTime } = useAuth()
  const router = useRouter()

  // Redirect to admin dashboard if already authenticated
  useEffect(() => {
    if (isAuthenticated) {
      router.push('/admin')
    }
  }, [isAuthenticated, router])

  // Show loading screen while checking auth
  if (isLoading) {
    return (
      <div className="min-h-screen theme-bg theme-transition flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="theme-text theme-transition">Checking authentication...</p>
        </div>
      </div>
    )
  }

  // Don't show login form if already authenticated (will redirect)
  if (isAuthenticated) {
    return (
      <div className="min-h-screen theme-bg theme-transition flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="theme-text theme-transition">Redirecting to dashboard...</p>
        </div>
      </div>
    )
  }

  const handleSuccessfulLogin = () => {
    // Redirect to admin dashboard after successful login
    router.push('/admin')
  }

  return (
    <AdminAuth 
      onAuthenticated={handleSuccessfulLogin}
      login={login}
      isLockedOut={isLockedOut}
      lockoutTimeRemaining={lockoutTimeRemaining}
      failedAttempts={failedAttempts}
      formatLockoutTime={formatLockoutTime}
    />
  )
}
