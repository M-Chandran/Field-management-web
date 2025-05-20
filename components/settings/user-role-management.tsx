"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { MoreHorizontal, UserPlus, Shield } from "lucide-react"
import { type User, UserRole } from "@/lib/role-based-access"

// Mock users data
const mockUsers: User[] = [
  {
    id: "user-1",
    name: "John Doe",
    email: "john.doe@example.com",
    role: UserRole.ADMIN,
    initials: "JD",
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    id: "user-2",
    name: "Sarah Johnson",
    email: "sarah.johnson@example.com",
    role: UserRole.SUPERVISOR,
    initials: "SJ",
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    id: "user-3",
    name: "Mike Wilson",
    email: "mike.wilson@example.com",
    role: UserRole.WORKER,
    initials: "MW",
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    id: "user-4",
    name: "Emily Chen",
    email: "emily.chen@example.com",
    role: UserRole.GUEST,
    initials: "EC",
    avatar: "/placeholder.svg?height=40&width=40",
  },
]

export function UserRoleManagement() {
  const [users, setUsers] = useState<User[]>(mockUsers)
  const [isAddUserDialogOpen, setIsAddUserDialogOpen] = useState(false)
  const [isEditRoleDialogOpen, setIsEditRoleDialogOpen] = useState(false)
  const [selectedUser, setSelectedUser] = useState<User | null>(null)
  const [newUserData, setNewUserData] = useState({
    name: "",
    email: "",
    role: UserRole.WORKER,
  })

  const handleAddUser = () => {
    const newUser: User = {
      id: `user-${users.length + 1}`,
      name: newUserData.name,
      email: newUserData.email,
      role: newUserData.role,
      initials: newUserData.name
        .split(" ")
        .map((n) => n[0])
        .join("")
        .toUpperCase(),
    }

    setUsers([...users, newUser])
    setNewUserData({ name: "", email: "", role: UserRole.WORKER })
    setIsAddUserDialogOpen(false)
  }

  const handleEditRole = (role: UserRole) => {
    if (!selectedUser) return

    const updatedUsers = users.map((user) => (user.id === selectedUser.id ? { ...user, role } : user))

    setUsers(updatedUsers)
    setIsEditRoleDialogOpen(false)
    setSelectedUser(null)
  }

  const getRoleBadgeVariant = (role: UserRole) => {
    switch (role) {
      case UserRole.ADMIN:
        return "default"
      case UserRole.SUPERVISOR:
        return "info"
      case UserRole.WORKER:
        return "secondary"
      case UserRole.GUEST:
        return "outline"
      default:
        return "secondary"
    }
  }

  return (
    <>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle>User Role Management</CardTitle>
            <CardDescription>Manage user access and permissions</CardDescription>
          </div>
          <Button onClick={() => setIsAddUserDialogOpen(true)}>
            <UserPlus className="mr-2 h-4 w-4" />
            Add User
          </Button>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>User</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Role</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {users.map((user) => (
                <TableRow key={user.id}>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <Avatar className="h-8 w-8">
                        <AvatarImage src={user.avatar || "/placeholder.svg"} alt={user.name} />
                        <AvatarFallback>{user.initials}</AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-medium">{user.name}</p>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>
                    <Badge variant={getRoleBadgeVariant(user.role)} className="capitalize">
                      {user.role}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <MoreHorizontal className="h-4 w-4" />
                          <span className="sr-only">Open menu</span>
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem
                          onClick={() => {
                            setSelectedUser(user)
                            setIsEditRoleDialogOpen(true)
                          }}
                        >
                          <Shield className="mr-2 h-4 w-4" />
                          Change Role
                        </DropdownMenuItem>
                        <DropdownMenuItem>Edit User</DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem className="text-destructive">Delete User</DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Add User Dialog */}
      <Dialog open={isAddUserDialogOpen} onOpenChange={setIsAddUserDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add New User</DialogTitle>
            <DialogDescription>Create a new user account and assign a role.</DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="name">Full Name</Label>
              <Input
                id="name"
                value={newUserData.name}
                onChange={(e) => setNewUserData({ ...newUserData, name: e.target.value })}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={newUserData.email}
                onChange={(e) => setNewUserData({ ...newUserData, email: e.target.value })}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="role">Role</Label>
              <Select
                value={newUserData.role}
                onValueChange={(value) => setNewUserData({ ...newUserData, role: value as UserRole })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select role" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value={UserRole.ADMIN}>Administrator</SelectItem>
                  <SelectItem value={UserRole.SUPERVISOR}>Supervisor</SelectItem>
                  <SelectItem value={UserRole.WORKER}>Worker</SelectItem>
                  <SelectItem value={UserRole.GUEST}>Guest</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsAddUserDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleAddUser}>Add User</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Edit Role Dialog */}
      <Dialog open={isEditRoleDialogOpen} onOpenChange={setIsEditRoleDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Change User Role</DialogTitle>
            <DialogDescription>Update role and permissions for {selectedUser?.name}</DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="edit-role">Role</Label>
              <Select defaultValue={selectedUser?.role} onValueChange={(value) => handleEditRole(value as UserRole)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select role" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value={UserRole.ADMIN}>Administrator</SelectItem>
                  <SelectItem value={UserRole.SUPERVISOR}>Supervisor</SelectItem>
                  <SelectItem value={UserRole.WORKER}>Worker</SelectItem>
                  <SelectItem value={UserRole.GUEST}>Guest</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsEditRoleDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={() => setIsEditRoleDialogOpen(false)}>Save Changes</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  )
}
