"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { CheckCircle, XCircle, Eye } from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Textarea } from "@/components/ui/textarea"

// Sample approval queue data
const approvalQueue = [
  {
    id: 1,
    employee: {
      name: "John Smith",
      avatar: "/placeholder.svg?height=32&width=32",
      initials: "JS",
    },
    date: "2025-05-20",
    jobName: "Downtown Project",
    jobId: "JOB-2025-001",
    totalHours: 7.75,
    status: "pending",
  },
  {
    id: 2,
    employee: {
      name: "Sarah Johnson",
      avatar: "/placeholder.svg?height=32&width=32",
      initials: "SJ",
    },
    date: "2025-05-20",
    jobName: "Westside Construction",
    jobId: "JOB-2025-003",
    totalHours: 8.5,
    status: "pending",
  },
  {
    id: 3,
    employee: {
      name: "Mike Davis",
      avatar: "/placeholder.svg?height=32&width=32",
      initials: "MD",
    },
    date: "2025-05-19",
    jobName: "Northside Renovation",
    jobId: "JOB-2025-002",
    totalHours: 7.5,
    status: "pending",
  },
  {
    id: 4,
    employee: {
      name: "Lisa Chen",
      avatar: "/placeholder.svg?height=32&width=32",
      initials: "LC",
    },
    date: "2025-05-19",
    jobName: "Eastside Maintenance",
    jobId: "JOB-2025-004",
    totalHours: 6.25,
    status: "pending",
  },
]

export function TimesheetsApproval() {
  const [filter, setFilter] = useState("all")
  const [selectedTimesheet, setSelectedTimesheet] = useState<any>(null)
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false)
  const [isApproveDialogOpen, setIsApproveDialogOpen] = useState(false)
  const [isRejectDialogOpen, setIsRejectDialogOpen] = useState(false)
  const [rejectReason, setRejectReason] = useState("")

  const filteredQueue =
    filter === "all"
      ? approvalQueue
      : approvalQueue.filter((item) => {
          if (filter === "today") return item.date === "2025-05-20"
          if (filter === "yesterday") return item.date === "2025-05-19"
          return true
        })

  const handleView = (timesheet: any) => {
    setSelectedTimesheet(timesheet)
    setIsViewDialogOpen(true)
  }

  const handleApprove = (timesheet: any) => {
    setSelectedTimesheet(timesheet)
    setIsApproveDialogOpen(true)
  }

  const handleReject = (timesheet: any) => {
    setSelectedTimesheet(timesheet)
    setIsRejectDialogOpen(true)
  }

  const confirmApprove = () => {
    // In a real app, this would update the database
    setIsApproveDialogOpen(false)
  }

  const confirmReject = () => {
    // In a real app, this would update the database
    setIsRejectDialogOpen(false)
    setRejectReason("")
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Timesheet Approval Queue</CardTitle>
          <Select value={filter} onValueChange={setFilter}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Filter by date" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Pending</SelectItem>
              <SelectItem value="today">Today</SelectItem>
              <SelectItem value="yesterday">Yesterday</SelectItem>
              <SelectItem value="week">This Week</SelectItem>
            </SelectContent>
          </Select>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Employee</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Job</TableHead>
                <TableHead className="text-right">Hours</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredQueue.map((item) => (
                <TableRow key={item.id}>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Avatar className="h-8 w-8">
                        <AvatarImage src={item.employee.avatar || "/placeholder.svg"} alt={item.employee.name} />
                        <AvatarFallback>{item.employee.initials}</AvatarFallback>
                      </Avatar>
                      <span>{item.employee.name}</span>
                    </div>
                  </TableCell>
                  <TableCell>{new Date(item.date).toLocaleDateString()}</TableCell>
                  <TableCell>
                    <div className="font-medium">{item.jobName}</div>
                    <div className="text-xs text-muted-foreground">{item.jobId}</div>
                  </TableCell>
                  <TableCell className="text-right font-medium">{item.totalHours}</TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button variant="ghost" size="icon" onClick={() => handleView(item)}>
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="text-green-500"
                        onClick={() => handleApprove(item)}
                      >
                        <CheckCircle className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon" className="text-red-500" onClick={() => handleReject(item)}>
                        <XCircle className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
              {filteredQueue.length === 0 && (
                <TableRow>
                  <TableCell colSpan={5} className="text-center py-6 text-muted-foreground">
                    No timesheets pending approval
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* View Timesheet Dialog */}
      <Dialog open={isViewDialogOpen} onOpenChange={setIsViewDialogOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Timesheet Details</DialogTitle>
            <DialogDescription>
              {selectedTimesheet && (
                <>
                  {selectedTimesheet.employee.name} - {new Date(selectedTimesheet.date).toLocaleDateString()}
                </>
              )}
            </DialogDescription>
          </DialogHeader>
          {selectedTimesheet && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h4 className="text-sm font-medium">Employee</h4>
                  <p className="text-sm">{selectedTimesheet.employee.name}</p>
                </div>
                <div>
                  <h4 className="text-sm font-medium">Date</h4>
                  <p className="text-sm">{new Date(selectedTimesheet.date).toLocaleDateString()}</p>
                </div>
                <div>
                  <h4 className="text-sm font-medium">Job</h4>
                  <p className="text-sm">{selectedTimesheet.jobName}</p>
                  <p className="text-xs text-muted-foreground">{selectedTimesheet.jobId}</p>
                </div>
                <div>
                  <h4 className="text-sm font-medium">Total Hours</h4>
                  <p className="text-sm">{selectedTimesheet.totalHours}</p>
                </div>
              </div>

              <div>
                <h4 className="text-sm font-medium">Time Entries</h4>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Start</TableHead>
                      <TableHead>End</TableHead>
                      <TableHead>Break</TableHead>
                      <TableHead>Hours</TableHead>
                      <TableHead>Description</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <TableRow>
                      <TableCell>08:00</TableCell>
                      <TableCell>12:00</TableCell>
                      <TableCell>30 min</TableCell>
                      <TableCell>3.5</TableCell>
                      <TableCell>Morning work</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>13:00</TableCell>
                      <TableCell>17:30</TableCell>
                      <TableCell>15 min</TableCell>
                      <TableCell>4.25</TableCell>
                      <TableCell>Afternoon work</TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsViewDialogOpen(false)}>
              Close
            </Button>
            <Button
              variant="default"
              className="bg-green-500 hover:bg-green-600"
              onClick={() => {
                setIsViewDialogOpen(false)
                handleApprove(selectedTimesheet)
              }}
            >
              <CheckCircle className="mr-2 h-4 w-4" />
              Approve
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Approve Timesheet Dialog */}
      <Dialog open={isApproveDialogOpen} onOpenChange={setIsApproveDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Approve Timesheet</DialogTitle>
            <DialogDescription>Are you sure you want to approve this timesheet?</DialogDescription>
          </DialogHeader>
          {selectedTimesheet && (
            <div className="space-y-2">
              <p className="text-sm">
                <span className="font-medium">Employee:</span> {selectedTimesheet.employee.name}
              </p>
              <p className="text-sm">
                <span className="font-medium">Date:</span> {new Date(selectedTimesheet.date).toLocaleDateString()}
              </p>
              <p className="text-sm">
                <span className="font-medium">Job:</span> {selectedTimesheet.jobName}
              </p>
              <p className="text-sm">
                <span className="font-medium">Hours:</span> {selectedTimesheet.totalHours}
              </p>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsApproveDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={confirmApprove} className="bg-green-500 hover:bg-green-600">
              <CheckCircle className="mr-2 h-4 w-4" />
              Confirm Approval
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Reject Timesheet Dialog */}
      <Dialog open={isRejectDialogOpen} onOpenChange={setIsRejectDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Reject Timesheet</DialogTitle>
            <DialogDescription>Please provide a reason for rejecting this timesheet.</DialogDescription>
          </DialogHeader>
          {selectedTimesheet && (
            <div className="space-y-4">
              <div className="space-y-2">
                <p className="text-sm">
                  <span className="font-medium">Employee:</span> {selectedTimesheet.employee.name}
                </p>
                <p className="text-sm">
                  <span className="font-medium">Date:</span> {new Date(selectedTimesheet.date).toLocaleDateString()}
                </p>
                <p className="text-sm">
                  <span className="font-medium">Job:</span> {selectedTimesheet.jobName}
                </p>
                <p className="text-sm">
                  <span className="font-medium">Hours:</span> {selectedTimesheet.totalHours}
                </p>
              </div>
              <div className="space-y-2">
                <label htmlFor="reject-reason" className="text-sm font-medium">
                  Reason for rejection
                </label>
                <Textarea
                  id="reject-reason"
                  placeholder="Please explain why this timesheet is being rejected..."
                  value={rejectReason}
                  onChange={(e) => setRejectReason(e.target.value)}
                  rows={4}
                />
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsRejectDialogOpen(false)}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={confirmReject} disabled={!rejectReason.trim()}>
              <XCircle className="mr-2 h-4 w-4" />
              Confirm Rejection
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
