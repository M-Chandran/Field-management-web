"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"
import { type User, UserRole } from "@/lib/role-based-access"
import { useAuth } from "./auth-context"

interface UserContextType {
  user: User
  setUser: (user: User) => void
  switchRole: (role: UserRole) => void
}

// Default user with guest role
const defaultUser: User = {
  id: "guest",
  name: "Guest",
  role: UserRole.GUEST,
  permissions: [],
}

const UserContext = createContext<UserContextType | undefined>(undefined)

export function UserProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User>(defaultUser)
  const { user: authUser } = useAuth()

  // Sync with auth context
  useEffect(() => {
    if (authUser) {
      setUser(authUser)
    } else {
      setUser(defaultUser)
    }
  }, [authUser])

  const switchRole = (role: UserRole) => {
    setUser({
      ...user,
      role,
    })
  }

  return <UserContext.Provider value={{ user, setUser, switchRole }}>{children}</UserContext.Provider>
}

export function useUser() {
  const context = useContext(UserContext)
  if (context === undefined) {
    throw new Error("useUser must be used within a UserProvider")
  }
  return context
}
