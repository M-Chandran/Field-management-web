"use client"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Camera, X, MapPin, Loader2 } from "lucide-react"
import { useToast } from "@/components/ui/use-toast"

interface CameraCaptureProps {
  onCapture: (imageData: string, location: GeolocationCoordinates | null) => void
  onClose?: () => void
}

export function CameraCapture({ onCapture, onClose }: CameraCaptureProps) {
  const [stream, setStream] = useState<MediaStream | null>(null)
  const [capturing, setCapturing] = useState(false)
  const [location, setLocation] = useState<GeolocationCoordinates | null>(null)
  const [locationLoading, setLocationLoading] = useState(false)
  const videoRef = useRef<HTMLVideoElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const { toast } = useToast()

  useEffect(() => {
    // Get user's location
    setLocationLoading(true)
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setLocation(position.coords)
        setLocationLoading(false)
      },
      (error) => {
        console.error("Error getting location:", error)
        toast({
          title: "Location Error",
          description: "Unable to access your location. Photos will not be geotagged.",
          variant: "destructive",
        })
        setLocationLoading(false)
      },
      { enableHighAccuracy: true },
    )

    // Initialize camera
    const startCamera = async () => {
      try {
        const mediaStream = await navigator.mediaDevices.getUserMedia({
          video: { facingMode: "environment" },
          audio: false,
        })
        setStream(mediaStream)
        if (videoRef.current) {
          videoRef.current.srcObject = mediaStream
        }
      } catch (err) {
        console.error("Error accessing camera:", err)
        toast({
          title: "Camera Error",
          description: "Unable to access your camera. Please check permissions.",
          variant: "destructive",
        })
      }
    }

    startCamera()

    // Cleanup function
    return () => {
      if (stream) {
        stream.getTracks().forEach((track) => {
          track.stop()
        })
      }
    }
  }, [toast])

  const captureImage = () => {
    if (!videoRef.current || !canvasRef.current) return

    setCapturing(true)

    const video = videoRef.current
    const canvas = canvasRef.current
    const context = canvas.getContext("2d")

    if (!context) return

    // Set canvas dimensions to match video
    canvas.width = video.videoWidth
    canvas.height = video.videoHeight

    // Draw the video frame to the canvas
    context.drawImage(video, 0, 0, canvas.width, canvas.height)

    // Convert canvas to data URL
    const imageData = canvas.toDataURL("image/jpeg")

    // Pass the captured image and location data to the parent component
    onCapture(imageData, location)
    setCapturing(false)
  }

  const handleClose = () => {
    if (stream) {
      stream.getTracks().forEach((track) => {
        track.stop()
      })
    }
    if (onClose) onClose()
  }

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardContent className="p-4">
        <div className="camera-container">
          <video ref={videoRef} autoPlay playsInline className="camera-feed w-full h-auto rounded-md" />
          <canvas ref={canvasRef} className="hidden" />

          <div className="absolute top-2 right-2">
            <Button variant="ghost" size="icon" onClick={handleClose}>
              <X className="h-5 w-5" />
            </Button>
          </div>

          <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-4">
            <Button
              variant="default"
              size="lg"
              className="rounded-full h-14 w-14 flex items-center justify-center"
              onClick={captureImage}
              disabled={capturing || !stream}
            >
              {capturing ? <Loader2 className="h-6 w-6 animate-spin" /> : <Camera className="h-6 w-6" />}
            </Button>
          </div>

          {location && (
            <div className="absolute bottom-20 left-4 bg-background/80 backdrop-blur-sm rounded-md p-2 text-xs flex items-center gap-1">
              <MapPin className="h-3 w-3" />
              <span>
                {location.latitude.toFixed(6)}, {location.longitude.toFixed(6)}
              </span>
            </div>
          )}

          {locationLoading && (
            <div className="absolute bottom-20 left-4 bg-background/80 backdrop-blur-sm rounded-md p-2 text-xs flex items-center gap-1">
              <Loader2 className="h-3 w-3 animate-spin" />
              <span>Getting location...</span>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
