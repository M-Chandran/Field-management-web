"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog"
import { Camera } from "lucide-react"
import { CameraCapture } from "./camera-capture"
import { ImagePreview } from "./image-preview"
import { useToast } from "@/components/ui/use-toast"

interface FieldImageCaptureProps {
  jobId?: string
  locationId?: string
  onImageCaptured?: (data: {
    imageUrl: string
    location: { latitude: number; longitude: number } | null
    notes: string
    timestamp: string
    jobId?: string
    locationId?: string
  }) => void
}

export function FieldImageCapture({ jobId, locationId, onImageCaptured }: FieldImageCaptureProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [capturedImage, setCapturedImage] = useState<string | null>(null)
  const [imageLocation, setImageLocation] = useState<GeolocationCoordinates | null>(null)
  const { toast } = useToast()

  const handleCapture = (imageData: string, location: GeolocationCoordinates | null) => {
    setCapturedImage(imageData)
    setImageLocation(location)
  }

  const handleSend = async (imageData: string, location: GeolocationCoordinates | null, notes: string) => {
    try {
      // In a real app, you would upload the image to a server here
      // For now, we'll simulate a successful upload

      // Create a mock image URL (in a real app, this would be the URL returned from your server)
      const mockImageUrl = imageData

      const imageInfo = {
        imageUrl: mockImageUrl,
        location: location ? { latitude: location.latitude, longitude: location.longitude } : null,
        notes,
        timestamp: new Date().toISOString(),
        jobId,
        locationId,
      }

      // Call the callback if provided
      if (onImageCaptured) {
        onImageCaptured(imageInfo)
      }

      // Close the dialog
      setIsOpen(false)
      setCapturedImage(null)
      setImageLocation(null)
    } catch (error) {
      console.error("Error sending image:", error)
      throw error
    }
  }

  const handleCancel = () => {
    setCapturedImage(null)
  }

  const handleOpenChange = (open: boolean) => {
    setIsOpen(open)
    if (!open) {
      setCapturedImage(null)
      setImageLocation(null)
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>
        <Button variant="outline" className="gap-2">
          <Camera className="h-4 w-4" />
          Capture Image
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md p-0">
        {!capturedImage ? (
          <CameraCapture onCapture={handleCapture} onClose={() => setIsOpen(false)} />
        ) : (
          <ImagePreview
            imageData={capturedImage}
            location={imageLocation}
            onSend={handleSend}
            onCancel={handleCancel}
          />
        )}
      </DialogContent>
    </Dialog>
  )
}
