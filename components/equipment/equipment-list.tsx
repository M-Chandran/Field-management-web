"use client"

import { useState } from "react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
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
import { Checkbox } from "@/components/ui/checkbox"
import { MoreHorizontal, MapPin, Calendar, PenToolIcon as Tool, Truck, Cpu, Wrench } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

export function EquipmentList() {
  const [selectedEquipment, setSelectedEquipment] = useState<string[]>([])

  const equipment = [
    {
      id: "EQ001",
      name: "Power Drill XL-5000",
      type: "tool",
      icon: Tool,
      location: "Warehouse A, Shelf 3",
      assignedTo: {
        name: "John Doe",
        avatar: "/placeholder.svg?height=40&width=40",
        initials: "JD",
      },
      lastMaintenance: "Apr 15, 2025",
      nextMaintenance: "Jul 15, 2025",
      status: "available",
      condition: "excellent",
    },
    {
      id: "EQ002",
      name: "Ford F-150 Truck",
      type: "vehicle",
      icon: Truck,
      location: "Job Site - 123 Main St",
      assignedTo: {
        name: "Sarah Johnson",
        avatar: "/placeholder.svg?height=40&width=40",
        initials: "SJ",
      },
      lastMaintenance: "Mar 10, 2025",
      nextMaintenance: "Jun 10, 2025",
      status: "in-use",
      condition: "good",
    },
    {
      id: "EQ003",
      name: "Laser Level Pro",
      type: "tool",
      icon: Tool,
      location: "Job Site - 456 Park Ave",
      assignedTo: {
        name: "Mike Wilson",
        avatar: "/placeholder.svg?height=40&width=40",
        initials: "MW",
      },
      lastMaintenance: "May 5, 2025",
      nextMaintenance: "Aug 5, 2025",
      status: "in-use",
      condition: "good",
    },
    {
      id: "EQ004",
      name: "Excavator CAT 320",
      type: "machinery",
      icon: Truck,
      location: "Job Site - 789 Oak St",
      assignedTo: null,
      lastMaintenance: "Feb 20, 2025",
      nextMaintenance: "May 20, 2025",
      status: "maintenance",
      condition: "fair",
    },
    {
      id: "EQ005",
      name: "Thermal Imaging Camera",
      type: "electronics",
      icon: Cpu,
      location: "Warehouse B, Cabinet 2",
      assignedTo: null,
      lastMaintenance: "Apr 30, 2025",
      nextMaintenance: "Jul 30, 2025",
      status: "available",
      condition: "excellent",
    },
  ]

  const toggleSelectAll = () => {
    if (selectedEquipment.length === equipment.length) {
      setSelectedEquipment([])
    } else {
      setSelectedEquipment(equipment.map((eq) => eq.id))
    }
  }

  const toggleSelectEquipment = (id: string) => {
    if (selectedEquipment.includes(id)) {
      setSelectedEquipment(selectedEquipment.filter((eqId) => eqId !== id))
    } else {
      setSelectedEquipment([...selectedEquipment, id])
    }
  }

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[50px]">
              <Checkbox
                checked={selectedEquipment.length === equipment.length && equipment.length > 0}
                onCheckedChange={toggleSelectAll}
                aria-label="Select all equipment"
              />
            </TableHead>
            <TableHead className="w-[250px]">Equipment</TableHead>
            <TableHead>Location</TableHead>
            <TableHead>Assigned To</TableHead>
            <TableHead>Maintenance</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Condition</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {equipment.map((item) => (
            <TableRow key={item.id}>
              <TableCell>
                <Checkbox
                  checked={selectedEquipment.includes(item.id)}
                  onCheckedChange={() => toggleSelectEquipment(item.id)}
                  aria-label={`Select ${item.name}`}
                />
              </TableCell>
              <TableCell>
                <div className="flex items-center gap-3">
                  <div className="flex h-8 w-8 items-center justify-center rounded-md bg-muted">
                    <item.icon className="h-4 w-4" />
                  </div>
                  <div>
                    <p className="font-medium">{item.name}</p>
                    <div className="flex items-center gap-2">
                      <p className="text-xs text-muted-foreground">{item.id}</p>
                      <p className="text-xs text-muted-foreground">•</p>
                      <p className="text-xs capitalize text-muted-foreground">{item.type}</p>
                    </div>
                  </div>
                </div>
              </TableCell>
              <TableCell>
                <div className="flex items-center gap-1">
                  <MapPin className="h-3 w-3 text-muted-foreground" />
                  <span className="text-sm">{item.location}</span>
                </div>
              </TableCell>
              <TableCell>
                {item.assignedTo ? (
                  <div className="flex items-center gap-2">
                    <Avatar className="h-6 w-6">
                      <AvatarImage src={item.assignedTo.avatar || "/placeholder.svg"} alt={item.assignedTo.name} />
                      <AvatarFallback>{item.assignedTo.initials}</AvatarFallback>
                    </Avatar>
                    <span className="text-sm">{item.assignedTo.name}</span>
                  </div>
                ) : (
                  <span className="text-sm text-muted-foreground">Unassigned</span>
                )}
              </TableCell>
              <TableCell>
                <div className="space-y-1 text-sm">
                  <div className="flex items-center gap-1">
                    <Calendar className="h-3 w-3 text-muted-foreground" />
                    <span>Last: {item.lastMaintenance}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Wrench className="h-3 w-3 text-muted-foreground" />
                    <span>Next: {item.nextMaintenance}</span>
                  </div>
                </div>
              </TableCell>
              <TableCell>
                <Badge
                  variant={
                    item.status === "available"
                      ? "success"
                      : item.status === "in-use"
                        ? "secondary"
                        : item.status === "maintenance"
                          ? "warning"
                          : "destructive"
                  }
                  className="capitalize"
                >
                  {item.status}
                </Badge>
              </TableCell>
              <TableCell>
                <Badge
                  variant={
                    item.condition === "excellent"
                      ? "success"
                      : item.condition === "good"
                        ? "secondary"
                        : item.condition === "fair"
                          ? "warning"
                          : "destructive"
                  }
                  className="capitalize"
                >
                  {item.condition}
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
                    <DropdownMenuItem>View Details</DropdownMenuItem>
                    <DropdownMenuItem>Edit Equipment</DropdownMenuItem>
                    <DropdownMenuItem>Assign to Staff</DropdownMenuItem>
                    <DropdownMenuItem>Schedule Maintenance</DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem className="text-destructive">Mark as Out of Service</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}
