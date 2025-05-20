"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { MapPin, Users, Truck, HardHat } from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export function DashboardMap() {
  const [mapView, setMapView] = useState("all")

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-sm font-medium">Field Tracking</CardTitle>
        <Select defaultValue="all" value={mapView} onValueChange={setMapView}>
          <SelectTrigger className="h-8 w-[120px]">
            <SelectValue placeholder="View" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All</SelectItem>
            <SelectItem value="staff">Staff</SelectItem>
            <SelectItem value="vehicles">Vehicles</SelectItem>
            <SelectItem value="sites">Job Sites</SelectItem>
          </SelectContent>
        </Select>
      </CardHeader>
      <CardContent>
        <div className="relative h-[200px] w-full overflow-hidden rounded-md bg-muted">
          <div className="absolute inset-0 bg-[url('/placeholder.svg?height=400&width=600')] bg-cover bg-center opacity-50"></div>

          {/* Map pins */}
          <div className="absolute left-[20%] top-[30%] flex h-6 w-6 items-center justify-center rounded-full bg-primary text-primary-foreground">
            <MapPin className="h-3 w-3" />
          </div>
          <div className="absolute left-[45%] top-[40%] flex h-6 w-6 items-center justify-center rounded-full bg-primary text-primary-foreground">
            <MapPin className="h-3 w-3" />
          </div>
          <div className="absolute left-[70%] top-[25%] flex h-6 w-6 items-center justify-center rounded-full bg-primary text-primary-foreground">
            <MapPin className="h-3 w-3" />
          </div>

          {/* Staff */}
          {(mapView === "all" || mapView === "staff") && (
            <>
              <div className="absolute left-[25%] top-[35%] flex h-5 w-5 items-center justify-center rounded-full bg-blue-500 text-white">
                <Users className="h-3 w-3" />
              </div>
              <div className="absolute left-[50%] top-[45%] flex h-5 w-5 items-center justify-center rounded-full bg-blue-500 text-white">
                <Users className="h-3 w-3" />
              </div>
              <div className="absolute left-[65%] top-[30%] flex h-5 w-5 items-center justify-center rounded-full bg-blue-500 text-white">
                <Users className="h-3 w-3" />
              </div>
            </>
          )}

          {/* Vehicles */}
          {(mapView === "all" || mapView === "vehicles") && (
            <>
              <div className="absolute left-[30%] top-[50%] flex h-5 w-5 items-center justify-center rounded-full bg-green-500 text-white">
                <Truck className="h-3 w-3" />
              </div>
              <div className="absolute left-[55%] top-[20%] flex h-5 w-5 items-center justify-center rounded-full bg-green-500 text-white">
                <Truck className="h-3 w-3" />
              </div>
            </>
          )}

          {/* Job Sites */}
          {(mapView === "all" || mapView === "sites") && (
            <>
              <div className="absolute left-[40%] top-[60%] flex h-5 w-5 items-center justify-center rounded-full bg-orange-500 text-white">
                <HardHat className="h-3 w-3" />
              </div>
              <div className="absolute left-[75%] top-[40%] flex h-5 w-5 items-center justify-center rounded-full bg-orange-500 text-white">
                <HardHat className="h-3 w-3" />
              </div>
            </>
          )}
        </div>

        <div className="mt-2 flex items-center justify-between text-xs">
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1">
              <span className="h-2 w-2 rounded-full bg-primary"></span>
              <span>Locations</span>
            </span>
            {(mapView === "all" || mapView === "staff") && (
              <span className="flex items-center gap-1">
                <span className="h-2 w-2 rounded-full bg-blue-500"></span>
                <span>Staff</span>
              </span>
            )}
            {(mapView === "all" || mapView === "vehicles") && (
              <span className="flex items-center gap-1">
                <span className="h-2 w-2 rounded-full bg-green-500"></span>
                <span>Vehicles</span>
              </span>
            )}
            {(mapView === "all" || mapView === "sites") && (
              <span className="flex items-center gap-1">
                <span className="h-2 w-2 rounded-full bg-orange-500"></span>
                <span>Sites</span>
              </span>
            )}
          </div>
          <span className="text-muted-foreground">Last updated: 2 min ago</span>
        </div>
      </CardContent>
    </Card>
  )
}
