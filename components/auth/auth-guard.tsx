"use client"

import type React from "react"

import { useEffect, useState } from "react"
import { usePathname, useRouter } from "next/navigation"
import { useAuth } from "@/contexts/auth-context"

// Define public routes that don't require authentication
const publicRoutes = ["/login", "/signup", "/access-denied"]

export function AuthGuard({ children }: { children: React.ReactNode }) {
  const { user, isLoading } = useAuth()
  const router = useRouter()
  const pathname = usePathname()
  const [authorized, setAuthorized] = useState(false)

  useEffect(() => {
    // Check if route is public
    const isPublicRoute = publicRoutes.includes(pathname)

    // If not public and not authenticated, redirect to login
    if (!isLoading && !user && !isPublicRoute) {
      router.push("/login")
      return
    }

    // If authenticated and trying to access login/signup, redirect to dashboard
    if (!isLoading && user && (pathname === "/login" || pathname === "/signup")) {
      router.push("/")
      return
    }

    setAuthorized(true)
  }, [user, isLoading, pathname, router])

  // Show loading or nothing while checking auth
  if (isLoading || !authorized) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent"></div>
      </div>
    )
  }

  // If on a public route or authenticated, render children
  return <>{children}</>
}
