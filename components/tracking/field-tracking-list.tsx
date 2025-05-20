"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { MapPin, Clock, Battery, Signal } from "lucide-react"

// Sample data
const staffData = [
  {
    id: 1,
    name: "John Smith",
    role: "Technician",
    location: "Downtown Project",
    lastUpdate: "2 mins ago",
    status: "active",
    battery: 85,
    signal: "strong",
    avatar: "/placeholder.svg?height=40&width=40",
    initials: "JS",
  },
  {
    id: 2,
    name: "Sarah Johnson",
    role: "Supervisor",
    location: "Westside Construction",
    lastUpdate: "5 mins ago",
    status: "active",
    battery: 62,
    signal: "medium",
    avatar: "/placeholder.svg?height=40&width=40",
    initials: "SJ",
  },
  {
    id: 3,
    name: "Mike Davis",
    role: "Electrician",
    location: "Northside Renovation",
    lastUpdate: "12 mins ago",
    status: "idle",
    battery: 45,
    signal: "weak",
    avatar: "/placeholder.svg?height=40&width=40",
    initials: "MD",
  },
  {
    id: 4,
    name: "Lisa Chen",
    role: "Project Manager",
    location: "Office",
    lastUpdate: "1 hour ago",
    status: "offline",
    battery: 0,
    signal: "none",
    avatar: "/placeholder.svg?height=40&width=40",
    initials: "LC",
  },
]

const vehiclesData = [
  {
    id: 1,
    name: "Truck #1",
    type: "Pickup Truck",
    location: "Downtown Project",
    lastUpdate: "3 mins ago",
    status: "active",
    fuel: 75,
    driver: "John Smith",
  },
  {
    id: 2,
    name: "Van #3",
    type: "Cargo Van",
    location: "Warehouse",
    lastUpdate: "15 mins ago",
    status: "idle",
    fuel: 45,
    driver: "Unassigned",
  },
  {
    id: 3,
    name: "Excavator #2",
    type: "Heavy Equipment",
    location: "Northside Renovation",
    lastUpdate: "30 mins ago",
    status: "maintenance",
    fuel: 90,
    driver: "Mike Davis",
  },
]

const equipmentData = [
  {
    id: 1,
    name: "Generator #5",
    type: "Power Equipment",
    location: "Downtown Project",
    lastUpdate: "10 mins ago",
    status: "active",
    battery: 100,
  },
  {
    id: 2,
    name: "Concrete Mixer",
    type: "Construction Equipment",
    location: "Westside Construction",
    lastUpdate: "45 mins ago",
    status: "idle",
    battery: 65,
  },
]

export function FieldTrackingList() {
  const [activeTab, setActiveTab] = useState("staff")

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "active":
        return <Badge className="bg-green-500">Active</Badge>
      case "idle":
        return <Badge className="bg-yellow-500">Idle</Badge>
      case "offline":
        return <Badge variant="outline">Offline</Badge>
      case "maintenance":
        return <Badge className="bg-blue-500">Maintenance</Badge>
      default:
        return <Badge variant="outline">{status}</Badge>
    }
  }

  const getSignalIcon = (signal: string) => {
    switch (signal) {
      case "strong":
        return <Signal className="h-4 w-4 text-green-500" />
      case "medium":
        return <Signal className="h-4 w-4 text-yellow-500" />
      case "weak":
        return <Signal className="h-4 w-4 text-red-500" />
      case "none":
        return <Signal className="h-4 w-4 text-muted-foreground" />
      default:
        return <Signal className="h-4 w-4 text-muted-foreground" />
    }
  }

  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle>Field Resources</CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="staff">Staff</TabsTrigger>
            <TabsTrigger value="vehicles">Vehicles</TabsTrigger>
            <TabsTrigger value="equipment">Equipment</TabsTrigger>
          </TabsList>
          <TabsContent value="staff" className="mt-4 space-y-4">
            {staffData.map((staff) => (
              <div key={staff.id} className="flex items-center gap-3 rounded-lg border p-3">
                <Avatar>
                  <AvatarImage src={staff.avatar || "/placeholder.svg"} alt={staff.name} />
                  <AvatarFallback>{staff.initials}</AvatarFallback>
                </Avatar>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <p className="font-medium truncate">{staff.name}</p>
                    {getStatusBadge(staff.status)}
                  </div>
                  <div className="flex items-center text-sm text-muted-foreground">
                    <MapPin className="mr-1 h-3 w-3" />
                    <span className="truncate">{staff.location}</span>
                  </div>
                </div>
                <div className="flex flex-col items-end gap-1">
                  <div className="flex items-center text-xs text-muted-foreground">
                    <Clock className="mr-1 h-3 w-3" />
                    {staff.lastUpdate}
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="flex items-center text-xs">
                      <Battery className="mr-1 h-3 w-3" />
                      {staff.battery}%
                    </div>
                    {getSignalIcon(staff.signal)}
                  </div>
                </div>
              </div>
            ))}
          </TabsContent>
          <TabsContent value="vehicles" className="mt-4 space-y-4">
            {vehiclesData.map((vehicle) => (
              <div key={vehicle.id} className="flex items-center gap-3 rounded-lg border p-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-100 text-blue-700">
                  <span className="text-xs font-bold">{vehicle.name.substring(0, 2)}</span>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <p className="font-medium truncate">{vehicle.name}</p>
                    {getStatusBadge(vehicle.status)}
                  </div>
                  <div className="flex items-center text-sm text-muted-foreground">
                    <MapPin className="mr-1 h-3 w-3" />
                    <span className="truncate">{vehicle.location}</span>
                  </div>
                </div>
                <div className="flex flex-col items-end gap-1">
                  <div className="flex items-center text-xs text-muted-foreground">
                    <Clock className="mr-1 h-3 w-3" />
                    {vehicle.lastUpdate}
                  </div>
                  <div className="text-xs">Fuel: {vehicle.fuel}%</div>
                </div>
              </div>
            ))}
          </TabsContent>
          <TabsContent value="equipment" className="mt-4 space-y-4">
            {equipmentData.map((equipment) => (
              <div key={equipment.id} className="flex items-center gap-3 rounded-lg border p-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-green-100 text-green-700">
                  <span className="text-xs font-bold">{equipment.name.substring(0, 2)}</span>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <p className="font-medium truncate">{equipment.name}</p>
                    {getStatusBadge(equipment.status)}
                  </div>
                  <div className="flex items-center text-sm text-muted-foreground">
                    <MapPin className="mr-1 h-3 w-3" />
                    <span className="truncate">{equipment.location}</span>
                  </div>
                </div>
                <div className="flex flex-col items-end gap-1">
                  <div className="flex items-center text-xs text-muted-foreground">
                    <Clock className="mr-1 h-3 w-3" />
                    {equipment.lastUpdate}
                  </div>
                  <div className="text-xs">Battery: {equipment.battery}%</div>
                </div>
              </div>
            ))}
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}
