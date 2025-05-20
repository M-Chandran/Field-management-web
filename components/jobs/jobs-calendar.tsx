"use client"

import { useState } from "react"
import { Calendar, momentLocalizer } from "react-big-calendar"
import moment from "moment"
import "react-big-calendar/lib/css/react-big-calendar.css"
import { Card, CardContent } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight } from "lucide-react"

// Mock data for the calendar
const events = [
  {
    id: 1,
    title: "Electrical Maintenance",
    start: new Date(2025, 4, 20, 9, 0),
    end: new Date(2025, 4, 20, 12, 0),
    resourceId: 1,
    status: "scheduled",
  },
  {
    id: 2,
    title: "HVAC Installation",
    start: new Date(2025, 4, 20, 13, 0),
    end: new Date(2025, 4, 20, 17, 0),
    resourceId: 2,
    status: "in-progress",
  },
  {
    id: 3,
    title: "Plumbing Repair",
    start: new Date(2025, 4, 21, 10, 0),
    end: new Date(2025, 4, 21, 14, 0),
    resourceId: 3,
    status: "completed",
  },
  {
    id: 4,
    title: "Security System Installation",
    start: new Date(2025, 4, 22, 9, 0),
    end: new Date(2025, 4, 22, 16, 0),
    resourceId: 4,
    status: "scheduled",
  },
  {
    id: 5,
    title: "Landscaping Project",
    start: new Date(2025, 4, 23, 8, 0),
    end: new Date(2025, 4, 23, 12, 0),
    resourceId: 5,
    status: "scheduled",
  },
]

// Mock resources (staff)
const resources = [
  { id: 1, title: "John Doe" },
  { id: 2, title: "Sarah Johnson" },
  { id: 3, title: "Mike Wilson" },
  { id: 4, title: "Emily Chen" },
  { id: 5, title: "Robert Taylor" },
]

const localizer = momentLocalizer(moment)

export function JobsCalendar() {
  const [view, setView] = useState("week")
  const [date, setDate] = useState(new Date())

  const eventStyleGetter = (event: any) => {
    let backgroundColor = ""
    switch (event.status) {
      case "scheduled":
        backgroundColor = "hsl(var(--primary))"
        break
      case "in-progress":
        backgroundColor = "hsl(var(--warning))"
        break
      case "completed":
        backgroundColor = "hsl(var(--success))"
        break
      case "cancelled":
        backgroundColor = "hsl(var(--destructive))"
        break
      default:
        backgroundColor = "hsl(var(--primary))"
    }

    return {
      style: {
        backgroundColor,
        borderRadius: "4px",
        opacity: 0.8,
        color: "white",
        border: "0",
        display: "block",
      },
    }
  }

  const handleNavigate = (action: "PREV" | "NEXT" | "TODAY") => {
    const newDate = new Date(date)

    if (action === "TODAY") {
      setDate(new Date())
      return
    }

    if (view === "day") {
      newDate.setDate(newDate.getDate() + (action === "PREV" ? -1 : 1))
    } else if (view === "week") {
      newDate.setDate(newDate.getDate() + (action === "PREV" ? -7 : 7))
    } else if (view === "month") {
      newDate.setMonth(newDate.getMonth() + (action === "PREV" ? -1 : 1))
    }

    setDate(newDate)
  }

  return (
    <Card>
      <CardContent className="p-4">
        <div className="mb-4 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-2">
            <Button variant="outline" size="icon" onClick={() => handleNavigate("PREV")}>
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <Button variant="outline" onClick={() => handleNavigate("TODAY")} className="px-2 py-1 text-xs">
              Today
            </Button>
            <Button variant="outline" size="icon" onClick={() => handleNavigate("NEXT")}>
              <ChevronRight className="h-4 w-4" />
            </Button>
            <h2 className="text-lg font-semibold">
              {view === "day"
                ? moment(date).format("MMMM D, YYYY")
                : view === "week"
                  ? `${moment(date).startOf("week").format("MMM D")} - ${moment(date)
                      .endOf("week")
                      .format("MMM D, YYYY")}`
                  : moment(date).format("MMMM YYYY")}
            </h2>
          </div>
          <div className="flex items-center gap-2">
            <Select value={view} onValueChange={(value) => setView(value)}>
              <SelectTrigger className="w-[120px]">
                <SelectValue placeholder="View" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="day">Day</SelectItem>
                <SelectItem value="week">Week</SelectItem>
                <SelectItem value="month">Month</SelectItem>
              </SelectContent>
            </Select>
            <Select defaultValue="all-staff">
              <SelectTrigger className="w-[150px]">
                <SelectValue placeholder="Filter by staff" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all-staff">All Staff</SelectItem>
                {resources.map((resource) => (
                  <SelectItem key={resource.id} value={resource.id.toString()}>
                    {resource.title}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
        <div className="h-[600px]">
          <Calendar
            localizer={localizer}
            events={events}
            startAccessor="start"
            endAccessor="end"
            resources={resources}
            resourceIdAccessor="id"
            resourceTitleAccessor="title"
            views={["day", "week", "month"]}
            view={view as any}
            date={date}
            eventPropGetter={eventStyleGetter}
            onView={(newView: string) => setView(newView)}
            onNavigate={(newDate) => setDate(newDate as Date)}
            className="rounded-md border"
          />
        </div>
      </CardContent>
    </Card>
  )
}
