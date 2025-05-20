"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import {
  BarChart3,
  Calendar,
  ClipboardList,
  FileText,
  Home,
  MapPin,
  MessageSquare,
  Settings,
  PenToolIcon as Tool,
  Users,
  Bell,
  Camera,
  ChevronLeft,
  Menu,
  X,
  LogOut,
  Sun,
  Moon,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Badge } from "@/components/ui/badge"
import { RoleGate } from "@/components/auth/role-gate"
import { Permission, UserRole } from "@/lib/role-based-access"
import { cn } from "@/lib/utils"
import { useTheme } from "next-themes"
import { useUser } from "@/contexts/user-context"
import { useAuth } from "@/contexts/auth-context"

export function AppSidebar() {
  const pathname = usePathname()
  const router = useRouter()
  const [isOpen, setIsOpen] = useState(true)
  const [isMobileOpen, setIsMobileOpen] = useState(false)
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)
  const { user } = useUser()
  const { logout } = useAuth()

  // Handle window resize for responsive behavior
  useEffect(() => {
    setMounted(true)
    const handleResize = () => {
      if (window.innerWidth < 1024) {
        setIsOpen(false)
      } else {
        setIsOpen(true)
      }
    }

    // Initial check
    handleResize()

    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  // Close mobile sidebar when route changes
  useEffect(() => {
    setIsMobileOpen(false)
  }, [pathname])

  const handleLogout = () => {
    logout()
    router.push("/login")
  }

  const navItems = [
    {
      title: "Dashboard",
      href: "/",
      icon: Home,
      permission: Permission.VIEW_DASHBOARD,
    },
    {
      title: "Staff",
      href: "/staff",
      icon: Users,
      permission: Permission.VIEW_STAFF,
    },
    {
      title: "Jobs",
      href: "/jobs",
      icon: Calendar,
      permission: Permission.VIEW_JOBS,
    },
    {
      title: "Field Tracking",
      href: "/tracking",
      icon: MapPin,
      permission: Permission.VIEW_JOBS,
    },
    {
      title: "Timesheets",
      href: "/timesheets",
      icon: ClipboardList,
      permission: Permission.VIEW_JOBS,
    },
    {
      title: "Equipment",
      href: "/equipment",
      icon: Tool,
      permission: Permission.VIEW_EQUIPMENT,
    },
    {
      title: "Field Images",
      href: "/field-images",
      icon: Camera,
      permission: Permission.CAPTURE_IMAGES,
    },
    {
      title: "Messages",
      href: "/messages",
      icon: MessageSquare,
      badge: 5,
      permission: Permission.VIEW_DASHBOARD,
    },
    {
      title: "Reports",
      href: "/reports",
      icon: FileText,
      permission: Permission.VIEW_REPORTS,
    },
    {
      title: "Analytics",
      href: "/analytics",
      icon: BarChart3,
      permission: Permission.VIEW_ANALYTICS,
    },
    {
      title: "Settings",
      href: "/settings",
      icon: Settings,
      permission: Permission.MANAGE_SETTINGS,
    },
  ]

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

  const toggleSidebar = () => {
    setIsOpen(!isOpen)
  }

  const toggleMobileSidebar = () => {
    setIsMobileOpen(!isMobileOpen)
  }

  return (
    <>
      {/* Mobile overlay */}
      {isMobileOpen && (
        <div
          className="fixed inset-0 bg-background/80 backdrop-blur-sm z-40 lg:hidden"
          onClick={() => setIsMobileOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div
        className={cn(
          "fixed inset-y-0 left-0 z-50 flex flex-col bg-gradient-to-b from-primary/10 to-background border-r transition-all duration-300 ease-in-out",
          isOpen ? "w-64" : "w-20",
          isMobileOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0",
        )}
      >
        {/* Logo and toggle */}
        <div className="flex items-center justify-between p-4 border-b">
          <Link href="/" className="flex items-center gap-2">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary">
              <span className="text-lg font-bold text-primary-foreground">FM</span>
            </div>
            {isOpen && <span className="text-xl font-bold">FieldMaster</span>}
          </Link>
          <Button variant="ghost" size="icon" onClick={toggleSidebar} className="hidden lg:flex">
            <ChevronLeft className={cn("h-5 w-5 transition-transform", !isOpen && "rotate-180")} />
          </Button>
          <Button variant="ghost" size="icon" onClick={() => setIsMobileOpen(false)} className="lg:hidden">
            <X className="h-5 w-5" />
          </Button>
        </div>

        {/* User profile */}
        <div className="p-4 border-b">
          <div className="flex items-center gap-3">
            <Avatar className="h-10 w-10 ring-2 ring-primary/20">
              <AvatarImage src="/placeholder.svg?height=40&width=40" alt="User" />
              <AvatarFallback>{user?.name?.charAt(0) || "U"}</AvatarFallback>
            </Avatar>
            {isOpen && (
              <div className="flex flex-col">
                <span className="font-medium">{user?.name || "Guest User"}</span>
                {user?.role && getRoleBadge(user.role)}
              </div>
            )}
          </div>
        </div>

        {/* Navigation */}
        <div className="flex-1 overflow-y-auto py-4">
          <nav className="px-2 space-y-1">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "group flex items-center gap-3 px-3 py-2 rounded-lg transition-all duration-200 hover:bg-primary/10",
                  pathname === item.href
                    ? "bg-primary text-primary-foreground hover:bg-primary"
                    : "text-foreground hover:text-primary",
                )}
              >
                <div
                  className={cn(
                    "flex h-8 w-8 items-center justify-center rounded-md",
                    pathname === item.href ? "bg-primary-foreground/20" : "bg-primary/10",
                  )}
                >
                  <item.icon
                    className={cn("h-5 w-5", pathname === item.href ? "text-primary-foreground" : "text-primary")}
                  />
                </div>
                {isOpen && (
                  <div className="flex flex-1 items-center justify-between">
                    <span>{item.title}</span>
                    {item.badge && (
                      <Badge variant="secondary" className="ml-auto">
                        {item.badge}
                      </Badge>
                    )}
                  </div>
                )}
              </Link>
            ))}
          </nav>
        </div>

        {/* Footer - Completely rebuilt */}
        <div className="border-t p-4">
          {isOpen ? (
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">© 2025 FieldMaster</span>
              <div className="flex space-x-2">
                <div className="inline-flex h-8 w-8 items-center justify-center rounded-md bg-transparent">
                  {mounted && (
                    <button
                      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                      className="inline-flex h-8 w-8 items-center justify-center rounded-md bg-transparent hover:bg-primary/10"
                    >
                      {theme === "dark" ? (
                        <Sun className="h-4 w-4 text-primary" />
                      ) : (
                        <Moon className="h-4 w-4 text-primary" />
                      )}
                    </button>
                  )}
                </div>
                <div className="inline-flex h-8 w-8 items-center justify-center rounded-md bg-transparent">
                  <DropdownMenu>
                    <DropdownMenuTrigger className="inline-flex h-8 w-8 items-center justify-center rounded-md bg-transparent hover:bg-primary/10">
                      <Settings className="h-4 w-4 text-primary" />
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuLabel>Options</DropdownMenuLabel>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem onClick={() => router.push("/settings")}>Profile Settings</DropdownMenuItem>
                      <DropdownMenuItem>Notifications</DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem onClick={handleLogout}>
                        <LogOut className="mr-2 h-4 w-4" />
                        <span>Log out</span>
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </div>
            </div>
          ) : (
            <div className="flex flex-col items-center space-y-2">
              <div className="inline-flex h-8 w-8 items-center justify-center rounded-md bg-transparent">
                {mounted && (
                  <button
                    onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                    className="inline-flex h-8 w-8 items-center justify-center rounded-md bg-transparent hover:bg-primary/10"
                  >
                    {theme === "dark" ? (
                      <Sun className="h-4 w-4 text-primary" />
                    ) : (
                      <Moon className="h-4 w-4 text-primary" />
                    )}
                  </button>
                )}
              </div>
              <div className="inline-flex h-8 w-8 items-center justify-center rounded-md bg-transparent">
                <DropdownMenu>
                  <DropdownMenuTrigger className="inline-flex h-8 w-8 items-center justify-center rounded-md bg-transparent hover:bg-primary/10">
                    <Settings className="h-4 w-4 text-primary" />
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuLabel>Options</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={() => router.push("/settings")}>Profile Settings</DropdownMenuItem>
                    <DropdownMenuItem>Notifications</DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={handleLogout}>
                      <LogOut className="mr-2 h-4 w-4" />
                      <span>Log out</span>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Mobile header */}
      <div className="sticky top-0 z-30 flex h-16 items-center justify-between border-b bg-background px-4 lg:hidden">
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" onClick={toggleMobileSidebar}>
            <Menu className="h-5 w-5" />
          </Button>
          <Link href="/" className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary">
              <span className="text-lg font-bold text-primary-foreground">FM</span>
            </div>
            <span className="text-lg font-bold">FieldMaster</span>
          </Link>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" className="relative rounded-full">
            <Bell className="h-5 w-5" />
            <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-primary text-[10px] font-medium text-primary-foreground">
              3
            </span>
          </Button>
          <Avatar className="h-8 w-8">
            <AvatarImage src="/placeholder.svg?height=32&width=32" alt="User" />
            <AvatarFallback>{user?.name?.charAt(0) || "U"}</AvatarFallback>
          </Avatar>
        </div>
      </div>

      {/* Main content padding to account for sidebar */}
      <div className={cn("lg:pl-20 transition-all duration-300", isOpen ? "lg:pl-64" : "lg:pl-20")}>
        {/* This is where your page content will go */}
      </div>
    </>
  )
}
