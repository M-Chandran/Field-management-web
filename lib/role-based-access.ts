export enum UserRole {
  ADMIN = "admin",
  SUPERVISOR = "supervisor",
  WORKER = "worker",
  GUEST = "guest",
}

export enum Permission {
  VIEW_DASHBOARD = "view_dashboard",
  VIEW_STAFF = "view_staff",
  VIEW_JOBS = "view_jobs",
  VIEW_EQUIPMENT = "view_equipment",
  VIEW_REPORTS = "view_reports",
  VIEW_ANALYTICS = "view_analytics",
  MANAGE_STAFF = "manage_staff",
  MANAGE_JOBS = "manage_jobs",
  MANAGE_EQUIPMENT = "manage_equipment",
  MANAGE_SETTINGS = "manage_settings",
  MANAGE_USERS = "manage_users",
  CAPTURE_IMAGES = "capture_images",
}

export interface User {
  id: string
  name: string
  email?: string
  role: UserRole
  permissions?: string[]
  avatar?: string
  initials?: string
}

// Mock current user for development
export const currentUser: User = {
  id: "user-1",
  name: "John Doe",
  email: "john.doe@example.com",
  role: UserRole.ADMIN,
  permissions: ["all"], // Admin has all permissions
}

// Check if a user has a specific permission
export function hasPermission(user: User, permission: Permission): boolean {
  // Admin has all permissions
  if (user.role === UserRole.ADMIN || user.permissions?.includes("all")) {
    return true
  }

  // Check role-based permissions
  switch (user.role) {
    case UserRole.SUPERVISOR:
      return [
        Permission.VIEW_DASHBOARD,
        Permission.VIEW_STAFF,
        Permission.VIEW_JOBS,
        Permission.VIEW_EQUIPMENT,
        Permission.VIEW_REPORTS,
        Permission.VIEW_ANALYTICS,
        Permission.MANAGE_JOBS,
        Permission.CAPTURE_IMAGES,
      ].includes(permission)

    case UserRole.WORKER:
      return [Permission.VIEW_DASHBOARD, Permission.VIEW_JOBS, Permission.CAPTURE_IMAGES].includes(permission)

    case UserRole.GUEST:
      return [Permission.VIEW_DASHBOARD].includes(permission)

    default:
      return false
  }
}
