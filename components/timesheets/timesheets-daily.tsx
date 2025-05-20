"use client"

import { Badge } from "@/components/ui/badge"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Save, Trash2, Edit, PlusCircle } from "lucide-react"

// Sample timesheet entries
const timesheetEntries = [
  {
    id: 1,
    date: "2025-05-20",
    jobName: "Downtown Project",
    jobId: "JOB-2025-001",
    startTime: "08:00",
    endTime: "12:00",
    breakDuration: 30,
    totalHours: 3.5,
    description: "Installed electrical wiring on the second floor",
    status: "submitted",
  },
  {
    id: 2,
    date: "2025-05-20",
    jobName: "Downtown Project",
    jobId: "JOB-2025-001",
    startTime: "13:00",
    endTime: "17:30",
    breakDuration: 15,
    totalHours: 4.25,
    description: "Completed lighting fixtures installation",
    status: "submitted",
  },
  {
    id: 3,
    date: "2025-05-19",
    jobName: "Westside Construction",
    jobId: "JOB-2025-003",
    startTime: "08:30",
    endTime: "16:45",
    breakDuration: 45,
    totalHours: 7.5,
    description: "Framing and drywall installation",
    status: "approved",
  },
]

// Sample jobs
const jobs = [
  { id: "JOB-2025-001", name: "Downtown Project" },
  { id: "JOB-2025-002", name: "Northside Renovation" },
  { id: "JOB-2025-003", name: "Westside Construction" },
  { id: "JOB-2025-004", name: "Eastside Maintenance" },
]

export function TimesheetsDaily() {
  const [isAddingEntry, setIsAddingEntry] = useState(false)
  const [selectedJob, setSelectedJob] = useState("")
  const [startTime, setStartTime] = useState("")
  const [endTime, setEndTime] = useState("")
  const [breakDuration, setBreakDuration] = useState("0")
  const [description, setDescription] = useState("")

  const handleAddEntry = () => {
    // In a real app, this would save the entry to the database
    setIsAddingEntry(false)
    // Reset form
    setSelectedJob("")
    setStartTime("")
    setEndTime("")
    setBreakDuration("0")
    setDescription("")
  }

  const calculateTotalHours = () => {
    if (!startTime || !endTime) return 0

    const start = new Date(`2025-01-01T${startTime}:00`)
    const end = new Date(`2025-01-01T${endTime}:00`)
    const diffMs = end.getTime() - start.getTime()
    const diffHours = diffMs / (1000 * 60 * 60)
    const breakHours = Number.parseInt(breakDuration) / 60

    return Math.max(0, diffHours - breakHours).toFixed(2)
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Today's Timesheet</CardTitle>
          <CardDescription>Record your work hours for today</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Job</TableHead>
                <TableHead>Time</TableHead>
                <TableHead>Break</TableHead>
                <TableHead>Hours</TableHead>
                <TableHead>Description</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {timesheetEntries
                .filter((entry) => entry.date === "2025-05-20")
                .map((entry) => (
                  <TableRow key={entry.id}>
                    <TableCell>
                      <div className="font-medium">{entry.jobName}</div>
                      <div className="text-xs text-muted-foreground">{entry.jobId}</div>
                    </TableCell>
                    <TableCell>
                      {entry.startTime} - {entry.endTime}
                    </TableCell>
                    <TableCell>{entry.breakDuration} min</TableCell>
                    <TableCell>{entry.totalHours}</TableCell>
                    <TableCell className="max-w-[200px] truncate">{entry.description}</TableCell>
                    <TableCell>
                      <Badge
                        variant={entry.status === "approved" ? "default" : "secondary"}
                        className={
                          entry.status === "approved" ? "bg-green-500" : entry.status === "rejected" ? "bg-red-500" : ""
                        }
                      >
                        {entry.status.charAt(0).toUpperCase() + entry.status.slice(1)}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Button variant="ghost" size="icon">
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon">
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              {isAddingEntry && (
                <TableRow>
                  <TableCell>
                    <Select value={selectedJob} onValueChange={setSelectedJob}>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select job" />
                      </SelectTrigger>
                      <SelectContent>
                        {jobs.map((job) => (
                          <SelectItem key={job.id} value={job.id}>
                            {job.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Input
                        type="time"
                        value={startTime}
                        onChange={(e) => setStartTime(e.target.value)}
                        className="w-24"
                      />
                      <span>-</span>
                      <Input
                        type="time"
                        value={endTime}
                        onChange={(e) => setEndTime(e.target.value)}
                        className="w-24"
                      />
                    </div>
                  </TableCell>
                  <TableCell>
                    <Input
                      type="number"
                      value={breakDuration}
                      onChange={(e) => setBreakDuration(e.target.value)}
                      className="w-16"
                      min="0"
                      step="5"
                    />
                  </TableCell>
                  <TableCell>{calculateTotalHours()}</TableCell>
                  <TableCell>
                    <Input
                      placeholder="Description"
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                    />
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline">Draft</Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button size="sm" onClick={handleAddEntry}>
                        <Save className="mr-2 h-4 w-4" />
                        Save
                      </Button>
                      <Button variant="ghost" size="sm" onClick={() => setIsAddingEntry(false)}>
                        Cancel
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
        <CardFooter className="flex justify-between">
          <div className="text-sm">
            <span className="font-medium">Total Hours Today:</span> 7.75
          </div>
          {!isAddingEntry && (
            <Button onClick={() => setIsAddingEntry(true)}>
              <PlusCircle className="mr-2 h-4 w-4" />
              Add Entry
            </Button>
          )}
        </CardFooter>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Recent Entries</CardTitle>
          <CardDescription>Your timesheet entries from the past week</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Date</TableHead>
                <TableHead>Job</TableHead>
                <TableHead>Time</TableHead>
                <TableHead>Hours</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {timesheetEntries
                .filter((entry) => entry.date !== "2025-05-20")
                .map((entry) => (
                  <TableRow key={entry.id}>
                    <TableCell>{new Date(entry.date).toLocaleDateString()}</TableCell>
                    <TableCell>
                      <div className="font-medium">{entry.jobName}</div>
                      <div className="text-xs text-muted-foreground">{entry.jobId}</div>
                    </TableCell>
                    <TableCell>
                      {entry.startTime} - {entry.endTime}
                    </TableCell>
                    <TableCell>{entry.totalHours}</TableCell>
                    <TableCell>
                      <Badge
                        variant={entry.status === "approved" ? "default" : "secondary"}
                        className={
                          entry.status === "approved" ? "bg-green-500" : entry.status === "rejected" ? "bg-red-500" : ""
                        }
                      >
                        {entry.status.charAt(0).toUpperCase() + entry.status.slice(1)}
                      </Badge>
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}
