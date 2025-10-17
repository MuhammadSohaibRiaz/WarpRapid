"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Eye, EyeOff, Lock, Mail, AlertCircle, Shield } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useThemeContext } from "@/context/theme-context"
import { useAdminAuth } from "@/lib/auth"

interface AdminAuthProps {
  onAuthenticated: () => void
}

export function AdminAuth({ onAuthenticated }: AdminAuthProps) {
  const { mode, color } = useThemeContext()
  const { login, isLockedOut, lockoutTimeRemaining, failedAttempts, formatLockoutTime } = useAdminAuth()
  
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  // All lockout logic is now handled by useAdminAuth hook

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setIsLoading(true)

    try {
      const result = await login(email, password)
      
      if (result.success) {
        // Auth state will be updated by the hook automatically
      } else {
        setError(result.error || 'Login failed')
      }
    } catch (error) {
      setError('An unexpected error occurred during login')
    } finally {
      setIsLoading(false)
    }
  }

  const getCardBgClass = () => {
    if (mode === "dark" || color === "black") {
      return "bg-gray-900/90 border border-gray-700/50"
    } else {
      return "bg-white/95 border border-gray-200/50"
    }
  }

  const getTextClass = () => {
    if (mode === "dark" || color === "black") {
      return "text-white"
    } else {
      return "text-gray-900"
    }
  }

  const getSecondaryTextClass = () => {
    if (mode === "dark" || color === "black") {
      return "text-gray-300"
    } else {
      return "text-gray-600"
    }
  }

  // No loading screen needed - parent handles auth state

  return (
    <div className="min-h-screen theme-bg theme-transition relative overflow-hidden flex items-center justify-center">
      <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))]" />
      <motion.div
        className="absolute inset-0 theme-glow blur-3xl theme-transition opacity-20"
        animate={{
          x: ["0%", "100%", "0%"],
          y: ["0%", "50%", "0%"],
        }}
        transition={{
          duration: 20,
          repeat: Number.POSITIVE_INFINITY,
          ease: "linear",
        }}
      />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className={`${getCardBgClass()} backdrop-blur-md rounded-lg p-8 w-full max-w-md mx-4 shadow-xl relative z-10`}
      >
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-gradient-to-r from-primary to-secondary rounded-full flex items-center justify-center mx-auto mb-4">
            <Shield className="w-8 h-8 text-white" />
          </div>
          <h1 className={`text-2xl font-bold ${getTextClass()} mb-2`}>Admin Access</h1>
          <p className={`${getSecondaryTextClass()}`}>Enter your credentials to access the admin panel</p>
        </div>

        {/* Lockout Timer */}
        {isLockedOut && (
          <div className="mb-6 p-4 bg-red-500/10 border border-red-500/20 rounded-lg">
            <div className="flex items-center mb-2">
              <AlertCircle className="w-5 h-5 text-red-500 mr-2" />
              <span className="text-red-600 font-medium">Account Locked</span>
            </div>
            <p className="text-red-600 text-sm mb-2">Too many failed attempts</p>
            <div className="text-red-600 text-sm font-mono">
              Unlocks in: {formatLockoutTime(lockoutTimeRemaining)}
            </div>
          </div>
        )}

        {/* Attempt Counter */}
        {failedAttempts > 0 && !isLockedOut && (
          <div className="mb-6 p-3 bg-yellow-500/10 border border-yellow-500/20 rounded-lg">
            <div className="flex items-center justify-between">
              <span className="text-yellow-600 text-sm">Failed Attempts</span>
              <span className="text-yellow-600 text-sm font-bold">
                {failedAttempts}/3
              </span>
            </div>
            <div className="w-full bg-yellow-200 rounded-full h-2 mt-2">
              <div
                className="bg-yellow-500 h-2 rounded-full transition-all duration-300"
                style={{ width: `${(failedAttempts / 3) * 100}%` }}
              />
            </div>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className={`block text-sm font-medium ${getTextClass()} mb-2`}>Email</label>
            <div className="relative">
              <Mail
                className={`absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 ${getSecondaryTextClass()}`}
              />
              <Input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className={`pl-10 ${getTextClass()} bg-transparent border-gray-300 dark:border-gray-600`}
                placeholder="admin@rapidxtech.com"
                disabled={isLockedOut || isLoading}
                required
              />
            </div>
          </div>

          <div>
            <label className={`block text-sm font-medium ${getTextClass()} mb-2`}>Password</label>
            <div className="relative">
              <Lock
                className={`absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 ${getSecondaryTextClass()}`}
              />
              <Input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className={`pl-10 pr-10 ${getTextClass()} bg-transparent border-gray-300 dark:border-gray-600`}
                placeholder="Enter password"
                disabled={isLockedOut || isLoading}
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className={`absolute right-3 top-1/2 transform -translate-y-1/2 ${getSecondaryTextClass()} hover:text-primary`}
                disabled={isLockedOut || isLoading}
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          {error && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="p-3 bg-red-500/10 border border-red-500/20 rounded-lg"
            >
              <div className="flex items-center">
                <AlertCircle className="w-4 h-4 text-red-500 mr-2" />
                <span className="text-red-600 text-sm">{error}</span>
              </div>
            </motion.div>
          )}

          <Button
            type="submit"
            disabled={isLockedOut || isLoading}
            className="w-full bg-primary hover:bg-primary/90 text-white font-semibold py-3"
          >
            {isLoading ? (
              <div className="flex items-center justify-center">
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2" />
                Authenticating...
              </div>
            ) : (
              "Sign In"
            )}
          </Button>
        </form>

        <div className={`mt-6 text-center text-xs ${getSecondaryTextClass()}`}>
          <p>Secure admin access • Supabase Authentication</p>
          <p className="mt-1">Max attempts: 3 • Lockout: 15 minutes</p>
        </div>
      </motion.div>
    </div>
  )
}
