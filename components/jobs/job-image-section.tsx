"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { FieldImageCapture } from "@/components/image-capture/field-image-capture"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog"
import { MapPin, Calendar, ImageIcon } from "lucide-react"
import { formatDistanceToNow } from "date-fns"

interface JobImage {
  id: string
  imageUrl: string
  location: { latitude: number; longitude: number } | null
  notes: string
  timestamp: string
}

interface JobImageSectionProps {
  jobId: string
  jobTitle: string
}

export function JobImageSection({ jobId, jobTitle }: JobImageSectionProps) {
  const [images, setImages] = useState<JobImage[]>([
    {
      id: "img-1",
      imageUrl: "/placeholder.svg?height=400&width=400",
      location: { latitude: 40.7128, longitude: -74.006 },
      notes: "Initial site inspection",
      timestamp: "2025-05-19T14:30:00Z",
    },
  ])
  const [selectedImage, setSelectedImage] = useState<JobImage | null>(null)

  const handleImageCaptured = (imageData: {
    imageUrl: string
    location: { latitude: number; longitude: number } | null
    notes: string
    timestamp: string
  }) => {
    const newImage = {
      id: `img-${images.length + 1}`,
      ...imageData,
    }

    setImages([newImage, ...images])
  }

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Job Images</CardTitle>
        <FieldImageCapture jobId={jobId} onImageCaptured={handleImageCaptured} />
      </CardHeader>
      <CardContent>
        {images.length === 0 ? (
          <div className="text-center py-8 text-muted-foreground">No images captured for this job yet</div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            {images.map((image) => (
              <Dialog key={image.id}>
                <DialogTrigger asChild>
                  <div className="relative cursor-pointer rounded-md overflow-hidden aspect-square">
                    <img
                      src={image.imageUrl || "/placeholder.svg"}
                      alt="Job capture"
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 hover:opacity-100 transition-opacity">
                      <div className="absolute bottom-2 left-2 right-2">
                        <div className="text-white text-xs">
                          {formatDistanceToNow(new Date(image.timestamp), { addSuffix: true })}
                        </div>
                        {image.location && (
                          <div className="flex items-center text-white/80 text-xs mt-1">
                            <MapPin className="h-3 w-3 mr-1" />
                            <span className="truncate">Location tagged</span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </DialogTrigger>
                <DialogContent className="sm:max-w-3xl p-0">
                  <div className="grid md:grid-cols-2 gap-0">
                    <div className="relative h-full">
                      <img
                        src={image.imageUrl || "/placeholder.svg"}
                        alt="Job capture"
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="p-6 space-y-4">
                      <h3 className="text-lg font-medium">{jobTitle}</h3>
                      <div className="flex items-center text-sm text-muted-foreground">
                        <Calendar className="h-4 w-4 mr-2" />
                        <span>{new Date(image.timestamp).toLocaleString()}</span>
                      </div>

                      {image.location && (
                        <div className="flex items-start">
                          <MapPin className="h-4 w-4 mr-2 mt-0.5 text-muted-foreground" />
                          <div>
                            <div className="text-sm">
                              {image.location.latitude.toFixed(6)}, {image.location.longitude.toFixed(6)}
                            </div>
                            <Button
                              variant="link"
                              className="p-0 h-auto text-xs flex items-center"
                              onClick={() =>
                                window.open(
                                  `https://maps.google.com/?q=${image.location!.latitude},${image.location!.longitude}`,
                                  "_blank",
                                )
                              }
                            >
                              View on map
                            </Button>
                          </div>
                        </div>
                      )}

                      {image.notes && (
                        <div className="text-sm">
                          <p className="font-medium mb-1">Notes:</p>
                          <p>{image.notes}</p>
                        </div>
                      )}
                    </div>
                  </div>
                </DialogContent>
              </Dialog>
            ))}
          </div>
        )}

        {images.length > 0 && (
          <div className="mt-4 flex justify-between items-center">
            <div className="flex items-center text-sm text-muted-foreground">
              <ImageIcon className="h-4 w-4 mr-2" />
              <span>{images.length} images</span>
            </div>
            <Button variant="outline" size="sm">
              View All
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
