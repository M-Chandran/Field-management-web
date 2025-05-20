"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"
import { type User, type UserRole, UserRole as Roles } from "@/lib/role-based-access"

interface AuthContextType {
  user: User | null
  isLoading: boolean
  login: (email: string, password: string, role: UserRole) => Promise<void>
  logout: () => void
  signup: (name: string, email: string, password: string, role: UserRole) => Promise<void>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Check if user is logged in
    // In a real app, this would verify the token with the server
    const checkAuth = async () => {
      try {
        // For demo purposes, we'll check localStorage
        const savedUser = localStorage.getItem("fieldmaster_user")
        if (savedUser) {
          const parsedUser = JSON.parse(savedUser)
          setUser(parsedUser)
        } else {
          setUser(null)
        }
      } catch (error) {
        setUser(null)
      } finally {
        setIsLoading(false)
      }
    }

    checkAuth()
  }, [])

  const login = async (email: string, password: string, role: UserRole) => {
    setIsLoading(true)
    try {
      // In a real app, this would be an API call
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // Create a user object with the selected role
      const loggedInUser = {
        id: "user-1",
        name: email.split("@")[0], // Use part of email as name for demo
        email,
        role,
        permissions: getPermissionsForRole(role),
      }

      // Save to state and localStorage
      setUser(loggedInUser)
      localStorage.setItem("fieldmaster_user", JSON.stringify(loggedInUser))
    } finally {
      setIsLoading(false)
    }
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem("fieldmaster_user")
  }

  const signup = async (name: string, email: string, password: string, role: UserRole) => {
    setIsLoading(true)
    try {
      // In a real app, this would be an API call
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // Create a user object with the selected role
      const newUser = {
        id: "user-" + Date.now(),
        name,
        email,
        role,
        permissions: getPermissionsForRole(role),
      }

      // In a real app, we would redirect to login
      // For demo, we'll log them in automatically
      setUser(newUser)
      localStorage.setItem("fieldmaster_user", JSON.stringify(newUser))
    } finally {
      setIsLoading(false)
    }
  }

  // Helper function to get permissions based on role
  const getPermissionsForRole = (role: UserRole) => {
    // This would be more sophisticated in a real app
    switch (role) {
      case Roles.ADMIN:
        return ["all"]
      case Roles.SUPERVISOR:
        return ["view_dashboard", "view_staff", "view_jobs", "view_equipment", "view_reports", "capture_images"]
      case Roles.WORKER:
        return ["view_dashboard", "view_jobs", "capture_images"]
      case Roles.GUEST:
        return ["view_dashboard"]
      default:
        return []
    }
  }

  return <AuthContext.Provider value={{ user, isLoading, login, logout, signup }}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
