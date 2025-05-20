"use client"

import { useState } from "react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Checkbox } from "@/components/ui/checkbox"
import { Input } from "@/components/ui/input"
import { Search, MoreHorizontal, MapPin, Calendar, Clock } from "lucide-react"

export function JobsList() {
  const [selectedJobs, setSelectedJobs] = useState<string[]>([])

  const jobs = [
    {
      id: "JOB001",
      title: "Electrical Maintenance",
      location: "123 Main St, Building A",
      client: "ABC Corporation",
      assignedTo: {
        name: "John Doe",
        avatar: "/placeholder.svg?height=40&width=40",
        initials: "JD",
      },
      startDate: "May 20, 2025",
      startTime: "9:00 AM",
      endTime: "12:00 PM",
      status: "scheduled",
      priority: "medium",
    },
    {
      id: "JOB002",
      title: "HVAC Installation",
      location: "456 Park Ave, Suite 200",
      client: "XYZ Industries",
      assignedTo: {
        name: "Sarah Johnson",
        avatar: "/placeholder.svg?height=40&width=40",
        initials: "SJ",
      },
      startDate: "May 20, 2025",
      startTime: "1:00 PM",
      endTime: "5:00 PM",
      status: "in-progress",
      priority: "high",
    },
    {
      id: "JOB003",
      title: "Plumbing Repair",
      location: "789 Oak St, Unit 3B",
      client: "123 Properties",
      assignedTo: {
        name: "Mike Wilson",
        avatar: "/placeholder.svg?height=40&width=40",
        initials: "MW",
      },
      startDate: "May 21, 2025",
      startTime: "10:00 AM",
      endTime: "2:00 PM",
      status: "completed",
      priority: "medium",
    },
    {
      id: "JOB004",
      title: "Security System Installation",
      location: "321 Elm St, Floor 5",
      client: "Secure Buildings Inc.",
      assignedTo: {
        name: "Emily Chen",
        avatar: "/placeholder.svg?height=40&width=40",
        initials: "EC",
      },
      startDate: "May 22, 2025",
      startTime: "9:00 AM",
      endTime: "4:00 PM",
      status: "scheduled",
      priority: "high",
    },
    {
      id: "JOB005",
      title: "Landscaping Project",
      location: "654 Pine St, Backyard",
      client: "Green Spaces LLC",
      assignedTo: {
        name: "Robert Taylor",
        avatar: "/placeholder.svg?height=40&width=40",
        initials: "RT",
      },
      startDate: "May 23, 2025",
      startTime: "8:00 AM",
      endTime: "12:00 PM",
      status: "scheduled",
      priority: "low",
    },
  ]

  const toggleSelectAll = () => {
    if (selectedJobs.length === jobs.length) {
      setSelectedJobs([])
    } else {
      setSelectedJobs(jobs.map((job) => job.id))
    }
  }

  const toggleSelectJob = (id: string) => {
    if (selectedJobs.includes(id)) {
      setSelectedJobs(selectedJobs.filter((jobId) => jobId !== id))
    } else {
      setSelectedJobs([...selectedJobs, id])
    }
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input type="search" placeholder="Search jobs by title, ID, or location..." className="pl-8" />
        </div>
      </div>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[50px]">
                <Checkbox
                  checked={selectedJobs.length === jobs.length && jobs.length > 0}
                  onCheckedChange={toggleSelectAll}
                  aria-label="Select all jobs"
                />
              </TableHead>
              <TableHead className="w-[250px]">Job Details</TableHead>
              <TableHead>Location</TableHead>
              <TableHead>Assigned To</TableHead>
              <TableHead>Schedule</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Priority</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {jobs.map((job) => (
              <TableRow key={job.id}>
                <TableCell>
                  <Checkbox
                    checked={selectedJobs.includes(job.id)}
                    onCheckedChange={() => toggleSelectJob(job.id)}
                    aria-label={`Select ${job.title}`}
                  />
                </TableCell>
                <TableCell>
                  <div>
                    <p className="font-medium">{job.title}</p>
                    <div className="flex items-center gap-2">
                      <p className="text-xs text-muted-foreground">{job.id}</p>
                      <p className="text-xs text-muted-foreground">•</p>
                      <p className="text-xs text-muted-foreground">{job.client}</p>
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-1">
                    <MapPin className="h-3 w-3 text-muted-foreground" />
                    <span className="text-sm">{job.location}</span>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <Avatar className="h-6 w-6">
                      <AvatarImage src={job.assignedTo.avatar || "/placeholder.svg"} alt={job.assignedTo.name} />
                      <AvatarFallback>{job.assignedTo.initials}</AvatarFallback>
                    </Avatar>
                    <span className="text-sm">{job.assignedTo.name}</span>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="space-y-1 text-sm">
                    <div className="flex items-center gap-1">
                      <Calendar className="h-3 w-3 text-muted-foreground" />
                      <span>{job.startDate}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="h-3 w-3 text-muted-foreground" />
                      <span>
                        {job.startTime} - {job.endTime}
                      </span>
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  <Badge
                    variant={
                      job.status === "scheduled"
                        ? "outline"
                        : job.status === "in-progress"
                          ? "warning"
                          : job.status === "completed"
                            ? "success"
                            : "destructive"
                    }
                    className="capitalize"
                  >
                    {job.status}
                  </Badge>
                </TableCell>
                <TableCell>
                  <Badge
                    variant={
                      job.priority === "high" ? "destructive" : job.priority === "medium" ? "warning" : "secondary"
                    }
                    className="capitalize"
                  >
                    {job.priority}
                  </Badge>
                </TableCell>
                <TableCell className="text-right">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <MoreHorizontal className="h-4 w-4" />
                        <span className="sr-only">Open menu</span>
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuLabel>Actions</DropdownMenuLabel>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem>View Details</DropdownMenuItem>
                      <DropdownMenuItem>Edit Job</DropdownMenuItem>
                      <DropdownMenuItem>Reassign</DropdownMenuItem>
                      <DropdownMenuItem>Reschedule</DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem className="text-destructive">Cancel Job</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}
