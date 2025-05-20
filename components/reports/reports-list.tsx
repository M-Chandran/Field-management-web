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
import { MoreHorizontal, Eye, Download, FileText, Calendar, MapPin } from "lucide-react"

export function ReportsList() {
  const [selectedReports, setSelectedReports] = useState<string[]>([])

  const reports = [
    {
      id: "REP001",
      title: "Daily Site Inspection",
      type: "inspection",
      location: "123 Main St, Building A",
      createdBy: {
        name: "John Doe",
        avatar: "/placeholder.svg?height=40&width=40",
        initials: "JD",
      },
      date: "May 20, 2025",
      status: "approved",
      attachments: 3,
    },
    {
      id: "REP002",
      title: "Equipment Maintenance Log",
      type: "maintenance",
      location: "456 Park Ave, Suite 200",
      createdBy: {
        name: "Sarah Johnson",
        avatar: "/placeholder.svg?height=40&width=40",
        initials: "SJ",
      },
      date: "May 19, 2025",
      status: "submitted",
      attachments: 2,
    },
    {
      id: "REP003",
      title: "Safety Incident Report",
      type: "incident",
      location: "789 Oak St, Unit 3B",
      createdBy: {
        name: "Mike Wilson",
        avatar: "/placeholder.svg?height=40&width=40",
        initials: "MW",
      },
      date: "May 18, 2025",
      status: "approved",
      attachments: 5,
    },
    {
      id: "REP004",
      title: "Weekly Progress Report",
      type: "progress",
      location: "321 Elm St, Floor 5",
      createdBy: {
        name: "Emily Chen",
        avatar: "/placeholder.svg?height=40&width=40",
        initials: "EC",
      },
      date: "May 17, 2025",
      status: "draft",
      attachments: 0,
    },
    {
      id: "REP005",
      title: "Monthly Safety Audit",
      type: "safety",
      location: "654 Pine St, Backyard",
      createdBy: {
        name: "Robert Taylor",
        avatar: "/placeholder.svg?height=40&width=40",
        initials: "RT",
      },
      date: "May 15, 2025",
      status: "rejected",
      attachments: 4,
    },
  ]

  const toggleSelectAll = () => {
    if (selectedReports.length === reports.length) {
      setSelectedReports([])
    } else {
      setSelectedReports(reports.map((report) => report.id))
    }
  }

  const toggleSelectReport = (id: string) => {
    if (selectedReports.includes(id)) {
      setSelectedReports(selectedReports.filter((reportId) => reportId !== id))
    } else {
      setSelectedReports([...selectedReports, id])
    }
  }

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[50px]">
              <Checkbox
                checked={selectedReports.length === reports.length && reports.length > 0}
                onCheckedChange={toggleSelectAll}
                aria-label="Select all reports"
              />
            </TableHead>
            <TableHead className="w-[250px]">Report Details</TableHead>
            <TableHead>Type</TableHead>
            <TableHead>Location</TableHead>
            <TableHead>Created By</TableHead>
            <TableHead>Date</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {reports.map((report) => (
            <TableRow key={report.id}>
              <TableCell>
                <Checkbox
                  checked={selectedReports.includes(report.id)}
                  onCheckedChange={() => toggleSelectReport(report.id)}
                  aria-label={`Select ${report.title}`}
                />
              </TableCell>
              <TableCell>
                <div>
                  <p className="font-medium">{report.title}</p>
                  <div className="flex items-center gap-2">
                    <p className="text-xs text-muted-foreground">{report.id}</p>
                    {report.attachments > 0 && (
                      <>
                        <p className="text-xs text-muted-foreground">•</p>
                        <p className="text-xs text-muted-foreground">{report.attachments} attachments</p>
                      </>
                    )}
                  </div>
                </div>
              </TableCell>
              <TableCell>
                <Badge
                  variant={
                    report.type === "incident"
                      ? "destructive"
                      : report.type === "safety"
                        ? "warning"
                        : report.type === "inspection"
                          ? "secondary"
                          : report.type === "maintenance"
                            ? "outline"
                            : "default"
                  }
                  className="capitalize"
                >
                  {report.type}
                </Badge>
              </TableCell>
              <TableCell>
                <div className="flex items-center gap-1">
                  <MapPin className="h-3 w-3 text-muted-foreground" />
                  <span className="text-sm">{report.location}</span>
                </div>
              </TableCell>
              <TableCell>
                <div className="flex items-center gap-2">
                  <Avatar className="h-6 w-6">
                    <AvatarImage src={report.createdBy.avatar || "/placeholder.svg"} alt={report.createdBy.name} />
                    <AvatarFallback>{report.createdBy.initials}</AvatarFallback>
                  </Avatar>
                  <span className="text-sm">{report.createdBy.name}</span>
                </div>
              </TableCell>
              <TableCell>
                <div className="flex items-center gap-1">
                  <Calendar className="h-3 w-3 text-muted-foreground" />
                  <span className="text-sm">{report.date}</span>
                </div>
              </TableCell>
              <TableCell>
                <Badge
                  variant={
                    report.status === "approved"
                      ? "success"
                      : report.status === "submitted"
                        ? "secondary"
                        : report.status === "draft"
                          ? "outline"
                          : "destructive"
                  }
                  className="capitalize"
                >
                  {report.status}
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
                    <DropdownMenuItem>
                      <Eye className="mr-2 h-4 w-4" />
                      View Report
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <FileText className="mr-2 h-4 w-4" />
                      Edit Report
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Download className="mr-2 h-4 w-4" />
                      Download PDF
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem className="text-destructive">Delete Report</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}
