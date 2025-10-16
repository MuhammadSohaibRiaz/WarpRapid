"use client"

import { useState, useEffect } from "react"
import { supabase } from "./supabase"
import type { User } from "@supabase/supabase-js"

const MAX_ATTEMPTS = 3
const LOCKOUT_DURATION = 15 * 60 * 1000 // 15 minutes

interface AuthState {
  user: User | null
  isAuthenticated: boolean
  failedAttempts: number
  lockoutUntil: number | null
}

export function useAdminAuth() {
  const [authState, setAuthState] = useState<AuthState>({
    user: null,
    isAuthenticated: false,
    failedAttempts: 0,
    lockoutUntil: null,
  })
  const [isLoading, setIsLoading] = useState(true)

  // Initialize auth state
  useEffect(() => {
    // Get initial session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setAuthState(prev => ({
        ...prev,
        user: session?.user ?? null,
        isAuthenticated: !!session?.user,
      }))
      setIsLoading(false)
    })

    // Listen for auth changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setAuthState(prev => ({
        ...prev,
        user: session?.user ?? null,
        isAuthenticated: !!session?.user,
      }))
      setIsLoading(false)
    })

    // Load failed attempts from localStorage
    const savedFailedAttempts = localStorage.getItem("admin_failed_attempts")
    const savedLockout = localStorage.getItem("admin_lockout")
    
    if (savedFailedAttempts) {
      const attempts = parseInt(savedFailedAttempts, 10)
      setAuthState(prev => ({ ...prev, failedAttempts: attempts }))
    }
    
    if (savedLockout) {
      const lockoutEnd = parseInt(savedLockout, 10)
      if (Date.now() < lockoutEnd) {
        setAuthState(prev => ({ ...prev, lockoutUntil: lockoutEnd }))
      } else {
        localStorage.removeItem("admin_lockout")
        localStorage.removeItem("admin_failed_attempts")
      }
    }

    return () => subscription.unsubscribe()
  }, [])

  // Clear lockout timer
  useEffect(() => {
    if (authState.lockoutUntil) {
      const interval = setInterval(() => {
        if (Date.now() >= authState.lockoutUntil!) {
          setAuthState(prev => ({ ...prev, lockoutUntil: null, failedAttempts: 0 }))
          localStorage.removeItem("admin_lockout")
          localStorage.removeItem("admin_failed_attempts")
        }
      }, 1000)
      
      return () => clearInterval(interval)
    }
  }, [authState.lockoutUntil])

  const login = async (email: string, password: string): Promise<{ success: boolean; error?: string }> => {
    const now = Date.now()

    // Check if locked out
    if (authState.lockoutUntil && now < authState.lockoutUntil) {
      const remainingMs = authState.lockoutUntil - now
      const minutes = Math.ceil(remainingMs / 60000)
      return { success: false, error: `Account locked. Try again in ${minutes} minutes.` }
    }

    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      })

      if (error) {
        // Handle failed login
        const newFailedAttempts = authState.failedAttempts + 1
        const shouldLockout = newFailedAttempts >= MAX_ATTEMPTS
        
        const newState = {
          ...authState,
          failedAttempts: newFailedAttempts,
          lockoutUntil: shouldLockout ? now + LOCKOUT_DURATION : null,
        }
        
        setAuthState(newState)
        
        // Persist to localStorage
        localStorage.setItem("admin_failed_attempts", newFailedAttempts.toString())
        if (shouldLockout) {
          localStorage.setItem("admin_lockout", (now + LOCKOUT_DURATION).toString())
        }
        
        if (shouldLockout) {
          return { success: false, error: "Too many failed attempts. Account locked for 15 minutes." }
        } else {
          const remaining = MAX_ATTEMPTS - newFailedAttempts
          return { success: false, error: `Invalid credentials. ${remaining} attempts remaining.` }
        }
      }

      // Success - clear failed attempts
      setAuthState(prev => ({
        ...prev,
        user: data.user,
        isAuthenticated: true,
        failedAttempts: 0,
        lockoutUntil: null,
      }))
      
      localStorage.removeItem("admin_failed_attempts")
      localStorage.removeItem("admin_lockout")
      
      return { success: true }
    } catch (error) {
      console.error("Login error:", error)
      return { success: false, error: "An unexpected error occurred" }
    }
  }

  const logout = async (): Promise<void> => {
    await supabase.auth.signOut()
    setAuthState({
      user: null,
      isAuthenticated: false,
      failedAttempts: 0,
      lockoutUntil: null,
    })
  }

  const getRemainingAttempts = (): number => {
    return Math.max(0, MAX_ATTEMPTS - authState.failedAttempts)
  }

  const getLockoutTimeRemaining = (): number => {
    if (!authState.lockoutUntil) return 0
    return Math.max(0, authState.lockoutUntil - Date.now())
  }

  const formatTime = (milliseconds: number): string => {
    const minutes = Math.floor(milliseconds / 60000)
    const seconds = Math.floor((milliseconds % 60000) / 1000)
    return `${minutes}:${seconds.toString().padStart(2, "0")}`
  }

  const isLockedOut = authState.lockoutUntil ? Date.now() < authState.lockoutUntil : false
  const lockoutTimeRemaining = getLockoutTimeRemaining()

  return {
    user: authState.user,
    isAuthenticated: authState.isAuthenticated,
    isLoading,
    failedAttempts: authState.failedAttempts,
    isLockedOut,
    lockoutTimeRemaining,
    login,
    logout,
    getRemainingAttempts,
    formatLockoutTime: formatTime,
  }
}
