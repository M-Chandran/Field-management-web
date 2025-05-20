"use client"

import type { ReactNode } from "react"
import { type User, type Permission, hasPermission } from "@/lib/role-based-access"

interface RoleGateProps {
  children: ReactNode
  permission: Permission
  user: User | null
  fallback?: ReactNode
}

export function RoleGate({ children, permission, user, fallback }: RoleGateProps) {
  if (!user) {
    return fallback || null
  }

  if (hasPermission(user, permission)) {
    return <>{children}</>
  }

  return fallback || null
}
