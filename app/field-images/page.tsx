"use client"

import { useState } from "react"
import { FieldImageCapture } from "@/components/image-capture/field-image-capture"
import { FieldImagesGallery } from "@/components/image-capture/field-images-gallery"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { MapPin, Filter, RefreshCw, Download } from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { RoleGate } from "@/components/auth/role-gate"
import { AccessDenied } from "@/components/auth/access-denied"
import { currentUser, Permission } from "@/lib/role-based-access"

// Mock initial images
const initialImages = [
  {
    id: "img-1",
    imageUrl: "/placeholder.svg?height=400&width=400",
    location: { latitude: 40.7128, longitude: -74.006 },
    notes: "Construction site inspection - foundation work completed",
    timestamp: "2025-05-19T14:30:00Z",
    jobId: "JOB001",
  },
  {
    id: "img-2",
    imageUrl: "/placeholder.svg?height=400&width=400",
    location: { latitude: 40.7135, longitude: -74.0046 },
    notes: "Equipment placement verification",
    timestamp: "2025-05-19T15:15:00Z",
    jobId: "JOB001",
  },
  {
    id: "img-3",
    imageUrl: "/placeholder.svg?height=400&width=400",
    location: { latitude: 40.714, longitude: -74.005 },
    notes: "Safety hazard identified - needs immediate attention",
    timestamp: "2025-05-19T16:00:00Z",
    jobId: "JOB002",
  },
]

export default function FieldImagesPage() {
  const [images, setImages] = useState(initialImages)

  const handleImageCaptured = (imageData: {
    imageUrl: string
    location: { latitude: number; longitude: number } | null
    notes: string
    timestamp: string
    jobId?: string
    locationId?: string
  }) => {
    const newImage = {
      id: `img-${images.length + 1}`,
      ...imageData,
    }

    setImages([newImage, ...images])
  }

  return (
    <RoleGate
      permission={Permission.CAPTURE_IMAGES}
      user={currentUser}
      fallback={<AccessDenied message="You don't have permission to access the field images feature." />}
    >
      <div className="flex flex-col min-h-screen">
        <div className="sticky top-0 z-10 flex flex-col border-b bg-background px-4 py-3 md:px-6 lg:flex-row lg:items-center lg:justify-between">
          <div className="mb-4 lg:mb-0">
            <h1 className="text-2xl font-bold">Field Images</h1>
            <p className="text-sm text-muted-foreground">Capture and manage field images with location data</p>
          </div>
          <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
            <div className="flex items-center gap-2">
              <Select defaultValue="all">
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Select job" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Jobs</SelectItem>
                  <SelectItem value="JOB001">Electrical Maintenance</SelectItem>
                  <SelectItem value="JOB002">HVAC Installation</SelectItem>
                  <SelectItem value="JOB003">Plumbing Repair</SelectItem>
                </SelectContent>
              </Select>
              <Button variant="outline" size="icon">
                <Filter className="h-4 w-4" />
              </Button>
              <Button variant="outline" size="icon">
                <RefreshCw className="h-4 w-4" />
              </Button>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="outline" className="gap-1">
                <Download className="h-4 w-4" />
                Export
              </Button>
              <FieldImageCapture onImageCaptured={handleImageCaptured} />
            </div>
          </div>
        </div>

        <div className="flex-1 p-4 md:p-6 space-y-6">
          <Tabs defaultValue="gallery">
            <TabsList>
              <TabsTrigger value="gallery">Gallery</TabsTrigger>
              <TabsTrigger value="map">Map View</TabsTrigger>
            </TabsList>
            <TabsContent value="gallery" className="mt-4">
              <FieldImagesGallery images={images} />
            </TabsContent>
            <TabsContent value="map" className="mt-4">
              <Card>
                <CardHeader>
                  <CardTitle>Image Locations</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-[500px] w-full relative bg-muted rounded-md overflow-hidden">
                    <div className="absolute inset-0 bg-[url('/placeholder.svg?height=800&width=1200')] bg-cover bg-center opacity-50"></div>

                    {/* Map markers for each image with location */}
                    {images
                      .filter((img) => img.location)
                      .map((img, index) => {
                        // Calculate position based on latitude and longitude
                        // This is a simplified example - in a real app you'd use proper map coordinates
                        const left = `${((img.location!.longitude + 74.01) * 1000) % 100}%`
                        const top = `${((img.location!.latitude - 40.71) * 1000) % 100}%`

                        return (
                          <div key={img.id} className="absolute" style={{ left, top }}>
                            <div className="map-marker"></div>
                            <div className="absolute top-6 left-1/2 transform -translate-x-1/2 bg-background rounded-md p-1 shadow-md">
                              <img
                                src={img.imageUrl || "/placeholder.svg"}
                                alt="Thumbnail"
                                className="w-12 h-12 object-cover rounded-sm"
                              />
                            </div>
                          </div>
                        )
                      })}
                  </div>

                  <div className="mt-4 flex items-center justify-between text-sm text-muted-foreground">
                    <div className="flex items-center gap-2">
                      <MapPin className="h-4 w-4" />
                      <span>{images.filter((img) => img.location).length} images with location data</span>
                    </div>
                    <span>Map data would be integrated with a real mapping service</span>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </RoleGate>
  )
}
