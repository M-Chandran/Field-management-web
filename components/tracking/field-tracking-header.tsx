"use client"

import { Button } from "@/components/ui/button"
import { Calendar, Download, RefreshCw, Share2 } from "lucide-react"
import { DatePicker } from "@/components/ui/date-picker"
import { useState } from "react"

export function FieldTrackingHeader() {
  const [date, setDate] = useState<Date | undefined>(new Date())
  const [isRefreshing, setIsRefreshing] = useState(false)

  const handleRefresh = () => {
    setIsRefreshing(true)
    // Simulate refresh
    setTimeout(() => {
      setIsRefreshing(false)
    }, 1000)
  }

  return (
    <div className="border-b">
      <div className="flex flex-col gap-4 p-6 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Field Tracking</h1>
          <p className="text-muted-foreground">Monitor your field staff and equipment in real-time</p>
        </div>
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-2">
            <Calendar className="h-4 w-4 text-muted-foreground" />
            <DatePicker date={date} onDateChange={setDate} />
          </div>
          <Button variant="outline" size="sm" onClick={handleRefresh}>
            <RefreshCw className={`mr-2 h-4 w-4 ${isRefreshing ? "animate-spin" : ""}`} />
            Refresh
          </Button>
          <Button variant="outline" size="sm">
            <Download className="mr-2 h-4 w-4" />
            Export
          </Button>
          <Button variant="outline" size="sm">
            <Share2 className="mr-2 h-4 w-4" />
            Share
          </Button>
        </div>
      </div>
    </div>
  )
}
