"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent } from "@/components/ui/dialog"
import { MapPin, Calendar, FileText, X, ExternalLink } from "lucide-react"
import { formatDistanceToNow } from "date-fns"

interface FieldImage {
  id: string
  imageUrl: string
  location: { latitude: number; longitude: number } | null
  notes: string
  timestamp: string
  jobId?: string
  locationId?: string
}

interface FieldImagesGalleryProps {
  images: FieldImage[]
  title?: string
}

export function FieldImagesGallery({ images, title = "Field Images" }: FieldImagesGalleryProps) {
  const [selectedImage, setSelectedImage] = useState<FieldImage | null>(null)

  const handleOpenMap = (latitude: number, longitude: number) => {
    window.open(`https://maps.google.com/?q=${latitude},${longitude}`, "_blank")
  }

  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle>{title}</CardTitle>
        </CardHeader>
        <CardContent>
          {images.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">No images captured yet</div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
              {images.map((image) => (
                <div
                  key={image.id}
                  className="relative cursor-pointer rounded-md overflow-hidden aspect-square"
                  onClick={() => setSelectedImage(image)}
                >
                  <img
                    src={image.imageUrl || "/placeholder.svg"}
                    alt="Field capture"
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
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      <Dialog open={!!selectedImage} onOpenChange={(open) => !open && setSelectedImage(null)}>
        <DialogContent className="sm:max-w-3xl p-0">
          {selectedImage && (
            <div className="grid md:grid-cols-2 gap-0">
              <div className="relative h-full">
                <img
                  src={selectedImage.imageUrl || "/placeholder.svg"}
                  alt="Field capture"
                  className="w-full h-full object-cover"
                />
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute top-2 left-2 bg-background/50 backdrop-blur-sm"
                  onClick={() => setSelectedImage(null)}
                >
                  <X className="h-5 w-5" />
                </Button>
              </div>
              <div className="p-6 space-y-4">
                <div className="flex items-center text-sm text-muted-foreground">
                  <Calendar className="h-4 w-4 mr-2" />
                  <span>{new Date(selectedImage.timestamp).toLocaleString()}</span>
                </div>

                {selectedImage.location && (
                  <div className="flex items-start">
                    <MapPin className="h-4 w-4 mr-2 mt-0.5 text-muted-foreground" />
                    <div>
                      <div className="text-sm">
                        {selectedImage.location.latitude.toFixed(6)}, {selectedImage.location.longitude.toFixed(6)}
                      </div>
                      <Button
                        variant="link"
                        className="p-0 h-auto text-xs flex items-center"
                        onClick={() =>
                          handleOpenMap(selectedImage.location!.latitude, selectedImage.location!.longitude)
                        }
                      >
                        View on map
                        <ExternalLink className="h-3 w-3 ml-1" />
                      </Button>
                    </div>
                  </div>
                )}

                {selectedImage.notes && (
                  <div className="flex items-start">
                    <FileText className="h-4 w-4 mr-2 mt-0.5 text-muted-foreground" />
                    <div className="text-sm">{selectedImage.notes}</div>
                  </div>
                )}

                {selectedImage.jobId && (
                  <div className="text-sm text-muted-foreground">Job ID: {selectedImage.jobId}</div>
                )}

                {selectedImage.locationId && (
                  <div className="text-sm text-muted-foreground">Location ID: {selectedImage.locationId}</div>
                )}
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </>
  )
}
