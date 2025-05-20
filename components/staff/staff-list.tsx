"use client"

import { useState } from "react"
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
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { MoreHorizontal, Eye, Edit, Trash, MapPin } from "lucide-react"
import { Checkbox } from "@/components/ui/checkbox"

export function StaffList() {
  const [selectedStaff, setSelectedStaff] = useState<string[]>([])

  const staff = [
    {
      id: "STF001",
      name: "John Doe",
      avatar: "/placeholder.svg?height=40&width=40",
      initials: "JD",
      role: "Supervisor",
      department: "Construction",
      location: "North Region",
      status: "active",
      skills: ["Electrical", "Project Management"],
      certifications: 4,
      lastActive: "10 minutes ago",
    },
    {
      id: "STF002",
      name: "Sarah Johnson",
      avatar: "/placeholder.svg?height=40&width=40",
      initials: "SJ",
      role: "Worker",
      department: "Maintenance",
      location: "East Region",
      status: "active",
      skills: ["HVAC", "Plumbing"],
      certifications: 3,
      lastActive: "2 hours ago",
    },
    {
      id: "STF003",
      name: "Michael Brown",
      avatar: "/placeholder.svg?height=40&width=40",
      initials: "MB",
      role: "Worker",
      department: "Logistics",
      location: "West Region",
      status: "on-leave",
      skills: ["Driving", "Inventory Management"],
      certifications: 2,
      lastActive: "2 days ago",
    },
    {
      id: "STF004",
      name: "Emily Chen",
      avatar: "/placeholder.svg?height=40&width=40",
      initials: "EC",
      role: "Admin",
      department: "Operations",
      location: "South Region",
      status: "active",
      skills: ["Administration", "Scheduling"],
      certifications: 1,
      lastActive: "30 minutes ago",
    },
    {
      id: "STF005",
      name: "Robert Taylor",
      avatar: "/placeholder.svg?height=40&width=40",
      initials: "RT",
      role: "Supervisor",
      department: "Agriculture",
      location: "North Region",
      status: "inactive",
      skills: ["Crop Management", "Equipment Operation"],
      certifications: 3,
      lastActive: "1 week ago",
    },
  ]

  const toggleSelectAll = () => {
    if (selectedStaff.length === staff.length) {
      setSelectedStaff([])
    } else {
      setSelectedStaff(staff.map((s) => s.id))
    }
  }

  const toggleSelectStaff = (id: string) => {
    if (selectedStaff.includes(id)) {
      setSelectedStaff(selectedStaff.filter((staffId) => staffId !== id))
    } else {
      setSelectedStaff([...selectedStaff, id])
    }
  }

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[50px]">
              <Checkbox
                checked={selectedStaff.length === staff.length && staff.length > 0}
                onCheckedChange={toggleSelectAll}
                aria-label="Select all staff"
              />
            </TableHead>
            <TableHead className="w-[250px]">Name</TableHead>
            <TableHead>Role</TableHead>
            <TableHead>Department</TableHead>
            <TableHead>Location</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Skills</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {staff.map((person) => (
            <TableRow key={person.id}>
              <TableCell>
                <Checkbox
                  checked={selectedStaff.includes(person.id)}
                  onCheckedChange={() => toggleSelectStaff(person.id)}
                  aria-label={`Select ${person.name}`}
                />
              </TableCell>
              <TableCell>
                <div className="flex items-center gap-3">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src={person.avatar || "/placeholder.svg"} alt={person.name} />
                    <AvatarFallback>{person.initials}</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-medium">{person.name}</p>
                    <p className="text-xs text-muted-foreground">{person.id}</p>
                  </div>
                </div>
              </TableCell>
              <TableCell>{person.role}</TableCell>
              <TableCell>{person.department}</TableCell>
              <TableCell>
                <div className="flex items-center gap-1">
                  <MapPin className="h-3 w-3 text-muted-foreground" />
                  <span>{person.location}</span>
                </div>
              </TableCell>
              <TableCell>
                <Badge
                  variant={
                    person.status === "active" ? "success" : person.status === "on-leave" ? "warning" : "secondary"
                  }
                  className="capitalize"
                >
                  {person.status}
                </Badge>
              </TableCell>
              <TableCell>
                <div className="flex flex-wrap gap-1">
                  {person.skills.map((skill) => (
                    <Badge key={skill} variant="outline" className="text-xs">
                      {skill}
                    </Badge>
                  ))}
                </div>
              </TableCell>
              <TableCell className="text-right">
                <Dialog>
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
                      <DialogTrigger asChild>
                        <DropdownMenuItem>
                          <Eye className="mr-2 h-4 w-4" />
                          View Details
                        </DropdownMenuItem>
                      </DialogTrigger>
                      <DropdownMenuItem>
                        <Edit className="mr-2 h-4 w-4" />
                        Edit
                      </DropdownMenuItem>
                      <DropdownMenuItem className="text-destructive">
                        <Trash className="mr-2 h-4 w-4" />
                        Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                  <DialogContent className="sm:max-w-[600px]">
                    <DialogHeader>
                      <DialogTitle>Staff Details</DialogTitle>
                      <DialogDescription>Detailed information about {person.name}</DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                      <div className="flex items-center gap-4">
                        <Avatar className="h-16 w-16">
                          <AvatarImage src={person.avatar || "/placeholder.svg"} alt={person.name} />
                          <AvatarFallback>{person.initials}</AvatarFallback>
                        </Avatar>
                        <div>
                          <h3 className="text-lg font-medium">{person.name}</h3>
                          <p className="text-sm text-muted-foreground">
                            {person.role} • {person.department}
                          </p>
                          <p className="text-sm text-muted-foreground">ID: {person.id}</p>
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-1">
                          <p className="text-sm font-medium">Status</p>
                          <Badge
                            variant={
                              person.status === "active"
                                ? "success"
                                : person.status === "on-leave"
                                  ? "warning"
                                  : "secondary"
                            }
                            className="capitalize"
                          >
                            {person.status}
                          </Badge>
                        </div>
                        <div className="space-y-1">
                          <p className="text-sm font-medium">Location</p>
                          <p className="text-sm">{person.location}</p>
                        </div>
                        <div className="space-y-1">
                          <p className="text-sm font-medium">Skills</p>
                          <div className="flex flex-wrap gap-1">
                            {person.skills.map((skill) => (
                              <Badge key={skill} variant="outline" className="text-xs">
                                {skill}
                              </Badge>
                            ))}
                          </div>
                        </div>
                        <div className="space-y-1">
                          <p className="text-sm font-medium">Certifications</p>
                          <p className="text-sm">{person.certifications} active</p>
                        </div>
                        <div className="space-y-1">
                          <p className="text-sm font-medium">Last Active</p>
                          <p className="text-sm">{person.lastActive}</p>
                        </div>
                      </div>
                    </div>
                  </DialogContent>
                </Dialog>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}
