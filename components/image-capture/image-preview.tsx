"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { MapPin, Send, X, Trash2 } from "lucide-react"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/components/ui/use-toast"

interface ImagePreviewProps {
  imageData: string
  location: GeolocationCoordinates | null
  onSend: (imageData: string, location: GeolocationCoordinates | null, notes: string) => Promise<void>
  onCancel: () => void
}

export function ImagePreview({ imageData, location, onSend, onCancel }: ImagePreviewProps) {
  const [notes, setNotes] = useState("")
  const [sending, setSending] = useState(false)
  const { toast } = useToast()

  const handleSend = async () => {
    try {
      setSending(true)
      await onSend(imageData, location, notes)
      toast({
        title: "Image Sent",
        description: "Your image has been successfully sent.",
      })
    } catch (error) {
      console.error("Error sending image:", error)
      toast({
        title: "Error",
        description: "Failed to send image. Please try again.",
        variant: "destructive",
      })
    } finally {
      setSending(false)
    }
  }

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardContent className="p-4">
        <div className="relative">
          <img src={imageData || "/placeholder.svg"} alt="Captured" className="w-full h-auto rounded-md" />

          <Button
            variant="ghost"
            size="icon"
            className="absolute top-2 right-2 bg-background/50 backdrop-blur-sm"
            onClick={onCancel}
          >
            <X className="h-5 w-5" />
          </Button>

          {location && (
            <div className="absolute bottom-2 left-2 bg-background/80 backdrop-blur-sm rounded-md p-2 text-xs flex items-center gap-1">
              <MapPin className="h-3 w-3" />
              <span>
                {location.latitude.toFixed(6)}, {location.longitude.toFixed(6)}
              </span>
            </div>
          )}
        </div>

        <div className="mt-4">
          <Textarea
            placeholder="Add notes about this image..."
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            className="resize-none"
            rows={3}
          />
        </div>
      </CardContent>

      <CardFooter className="flex justify-between">
        <Button variant="outline" onClick={onCancel} disabled={sending}>
          <Trash2 className="mr-2 h-4 w-4" />
          Discard
        </Button>
        <Button onClick={handleSend} disabled={sending}>
          {sending ? (
            <>Sending...</>
          ) : (
            <>
              <Send className="mr-2 h-4 w-4" />
              Send
            </>
          )}
        </Button>
      </CardFooter>
    </Card>
  )
}
