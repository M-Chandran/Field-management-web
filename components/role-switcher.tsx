"use client"

import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { ShieldCheck, ChevronDown } from "lucide-react"
import { useUser } from "@/contexts/user-context"
import { UserRole } from "@/lib/role-based-access"
import { Badge } from "@/components/ui/badge"

export function RoleSwitcher() {
  const { user, switchRole } = useUser()

  const getRoleBadge = (role: UserRole) => {
    switch (role) {
      case UserRole.ADMIN:
        return <Badge className="role-badge admin">Admin</Badge>
      case UserRole.SUPERVISOR:
        return <Badge className="role-badge supervisor">Supervisor</Badge>
      case UserRole.WORKER:
        return <Badge className="role-badge worker">Worker</Badge>
      case UserRole.GUEST:
        return <Badge className="role-badge guest">Guest</Badge>
      default:
        return null
    }
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className="flex items-center gap-2">
          <ShieldCheck className="h-4 w-4" />
          <span>Role: {user.role}</span>
          <ChevronDown className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuLabel>Switch Role</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={() => switchRole(UserRole.ADMIN)} className="flex justify-between">
          Administrator
          {user.role === UserRole.ADMIN && getRoleBadge(UserRole.ADMIN)}
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => switchRole(UserRole.SUPERVISOR)} className="flex justify-between">
          Supervisor
          {user.role === UserRole.SUPERVISOR && getRoleBadge(UserRole.SUPERVISOR)}
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => switchRole(UserRole.WORKER)} className="flex justify-between">
          Worker
          {user.role === UserRole.WORKER && getRoleBadge(UserRole.WORKER)}
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => switchRole(UserRole.GUEST)} className="flex justify-between">
          Guest
          {user.role === UserRole.GUEST && getRoleBadge(UserRole.GUEST)}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
