"use client"

import { useEffect, useRef, useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Layers, MapPin, Maximize2, Minimize2, Users, Truck, PenToolIcon as Tool } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuCheckboxItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export function FieldTrackingMap() {
  const mapRef = useRef<HTMLDivElement>(null)
  const [isFullscreen, setIsFullscreen] = useState(false)
  const [mapLayers, setMapLayers] = useState({
    staff: true,
    vehicles: true,
    equipment: true,
    jobsites: true,
  })

  // Toggle fullscreen
  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      mapRef.current?.requestFullscreen()
      setIsFullscreen(true)
    } else {
      document.exitFullscreen()
      setIsFullscreen(false)
    }
  }

  // Listen for fullscreen change
  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement)
    }

    document.addEventListener("fullscreenchange", handleFullscreenChange)
    return () => {
      document.removeEventListener("fullscreenchange", handleFullscreenChange)
    }
  }, [])

  // Toggle map layers
  const toggleLayer = (layer: keyof typeof mapLayers) => {
    setMapLayers((prev) => ({
      ...prev,
      [layer]: !prev[layer],
    }))
  }

  return (
    <Card className="overflow-hidden">
      <CardHeader className="flex flex-row items-center justify-between p-4">
        <div>
          <CardTitle>Live Field Map</CardTitle>
          <CardDescription>Real-time location of all field resources</CardDescription>
        </div>
        <div className="flex items-center gap-2">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm">
                <Layers className="mr-2 h-4 w-4" />
                Layers
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuCheckboxItem checked={mapLayers.staff} onCheckedChange={() => toggleLayer("staff")}>
                <Users className="mr-2 h-4 w-4" />
                Staff
              </DropdownMenuCheckboxItem>
              <DropdownMenuCheckboxItem checked={mapLayers.vehicles} onCheckedChange={() => toggleLayer("vehicles")}>
                <Truck className="mr-2 h-4 w-4" />
                Vehicles
              </DropdownMenuCheckboxItem>
              <DropdownMenuCheckboxItem checked={mapLayers.equipment} onCheckedChange={() => toggleLayer("equipment")}>
                <Tool className="mr-2 h-4 w-4" />
                Equipment
              </DropdownMenuCheckboxItem>
              <DropdownMenuCheckboxItem checked={mapLayers.jobsites} onCheckedChange={() => toggleLayer("jobsites")}>
                <MapPin className="mr-2 h-4 w-4" />
                Job Sites
              </DropdownMenuCheckboxItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <Button variant="outline" size="sm" onClick={toggleFullscreen}>
            {isFullscreen ? <Minimize2 className="mr-2 h-4 w-4" /> : <Maximize2 className="mr-2 h-4 w-4" />}
            {isFullscreen ? "Exit Fullscreen" : "Fullscreen"}
          </Button>
        </div>
      </CardHeader>
      <CardContent className="p-0">
        <div ref={mapRef} className="relative h-[500px] w-full bg-muted">
          {/* Map placeholder - in a real app, you would integrate with a mapping library like Google Maps, Mapbox, or Leaflet */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center">
              <MapPin className="mx-auto h-12 w-12 text-primary" />
              <p className="mt-2 text-lg font-medium">Interactive Map</p>
              <p className="text-sm text-muted-foreground">
                Showing {mapLayers.staff ? "staff, " : ""}
                {mapLayers.vehicles ? "vehicles, " : ""}
                {mapLayers.equipment ? "equipment, " : ""}
                {mapLayers.jobsites ? "job sites" : ""}
              </p>
            </div>
          </div>

          {/* Sample map markers */}
          <div className="absolute top-1/4 left-1/3 flex flex-col items-center">
            <div className="h-6 w-6 rounded-full bg-blue-500 ring-4 ring-blue-200 flex items-center justify-center text-white text-xs font-bold">
              JS
            </div>
            <div className="mt-1 bg-white px-2 py-1 rounded text-xs shadow">John Smith</div>
          </div>

          <div className="absolute top-1/2 left-2/3 flex flex-col items-center">
            <div className="h-6 w-6 rounded-full bg-green-500 ring-4 ring-green-200 flex items-center justify-center text-white text-xs font-bold">
              V1
            </div>
            <div className="mt-1 bg-white px-2 py-1 rounded text-xs shadow">Truck #1</div>
          </div>

          <div className="absolute top-3/4 left-1/2 flex flex-col items-center">
            <div className="h-8 w-8 text-red-500">
              <MapPin className="h-8 w-8" />
            </div>
            <div className="mt-1 bg-white px-2 py-1 rounded text-xs shadow">Downtown Project</div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
