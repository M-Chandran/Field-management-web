"use client"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { MapPin, Calendar, Clock, ArrowLeft, FileText, PenToolIcon as Tool, Users, MessageSquare } from "lucide-react"
import { JobImageSection } from "@/components/jobs/job-image-section"
import Link from "next/link"
import { RoleGate } from "@/components/auth/role-gate"
import { currentUser, Permission } from "@/lib/role-based-access"

interface JobDetailPageProps {
  params: {
    id: string
  }
}

export default function JobDetailPage({ params }: JobDetailPageProps) {
  // Mock job data - in a real app, this would be fetched from an API
  const job = {
    id: params.id,
    title: "Electrical Maintenance",
    description:
      "Complete electrical system maintenance including inspection of circuits, replacement of faulty components, and testing of safety systems.",
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
    status: "in-progress",
    priority: "medium",
    equipment: [
      { id: "EQ001", name: "Power Drill XL-5000" },
      { id: "EQ003", name: "Laser Level Pro" },
    ],
    tasks: [
      { id: "T1", description: "Inspect main circuit breaker", status: "completed" },
      { id: "T2", description: "Replace faulty outlets in conference room", status: "in-progress" },
      { id: "T3", description: "Test emergency lighting system", status: "pending" },
      { id: "T4", description: "Document all repairs in maintenance log", status: "pending" },
    ],
  }

  return (
    <div className="flex flex-col min-h-screen">
      <div className="sticky top-0 z-10 flex flex-col border-b bg-background px-4 py-3 md:px-6 lg:flex-row lg:items-center lg:justify-between">
        <div className="mb-4 lg:mb-0 flex items-center gap-2">
          <Button variant="ghost" size="icon" asChild>
            <Link href="/jobs">
              <ArrowLeft className="h-5 w-5" />
            </Link>
          </Button>
          <div>
            <h1 className="text-2xl font-bold">{job.title}</h1>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <span>Job ID: {job.id}</span>
              <span>•</span>
              <span>{job.client}</span>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-2">
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
          <Badge
            variant={job.priority === "high" ? "destructive" : job.priority === "medium" ? "warning" : "secondary"}
            className="capitalize"
          >
            {job.priority} priority
          </Badge>
          <RoleGate permission={Permission.MANAGE_JOBS} user={currentUser}>
            <Button>Edit Job</Button>
          </RoleGate>
        </div>
      </div>

      <div className="flex-1 p-4 md:p-6 space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-2 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Job Details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h3 className="text-sm font-medium text-muted-foreground mb-2">Description</h3>
                  <p>{job.description}</p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                  <div>
                    <h3 className="text-sm font-medium text-muted-foreground mb-2">Location</h3>
                    <div className="flex items-center gap-2">
                      <MapPin className="h-4 w-4 text-muted-foreground" />
                      <span>{job.location}</span>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-sm font-medium text-muted-foreground mb-2">Schedule</h3>
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <Calendar className="h-4 w-4 text-muted-foreground" />
                        <span>{job.startDate}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Clock className="h-4 w-4 text-muted-foreground" />
                        <span>
                          {job.startTime} - {job.endTime}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-sm font-medium text-muted-foreground mb-2">Assigned To</h3>
                    <div className="flex items-center gap-2">
                      <Avatar className="h-6 w-6">
                        <AvatarImage src={job.assignedTo.avatar || "/placeholder.svg"} alt={job.assignedTo.name} />
                        <AvatarFallback>{job.assignedTo.initials}</AvatarFallback>
                      </Avatar>
                      <span>{job.assignedTo.name}</span>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-sm font-medium text-muted-foreground mb-2">Equipment</h3>
                    <div className="space-y-1">
                      {job.equipment.map((item) => (
                        <div key={item.id} className="flex items-center gap-2">
                          <Tool className="h-4 w-4 text-muted-foreground" />
                          <span>
                            {item.name} ({item.id})
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Tabs defaultValue="tasks">
              <TabsList>
                <TabsTrigger value="tasks">Tasks</TabsTrigger>
                <TabsTrigger value="notes">Notes</TabsTrigger>
                <TabsTrigger value="images">Images</TabsTrigger>
              </TabsList>
              <TabsContent value="tasks" className="mt-4">
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between">
                    <CardTitle>Task List</CardTitle>
                    <RoleGate permission={Permission.MANAGE_JOBS} user={currentUser}>
                      <Button size="sm">Add Task</Button>
                    </RoleGate>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {job.tasks.map((task) => (
                        <div key={task.id} className="flex items-center justify-between border-b pb-2">
                          <div className="flex items-center gap-2">
                            <div
                              className={`h-2 w-2 rounded-full ${
                                task.status === "completed"
                                  ? "bg-green-500"
                                  : task.status === "in-progress"
                                    ? "bg-yellow-500"
                                    : "bg-gray-300"
                              }`}
                            ></div>
                            <span>{task.description}</span>
                          </div>
                          <Badge
                            variant={
                              task.status === "completed"
                                ? "success"
                                : task.status === "in-progress"
                                  ? "warning"
                                  : "outline"
                            }
                            className="capitalize"
                          >
                            {task.status}
                          </Badge>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              <TabsContent value="notes" className="mt-4">
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between">
                    <CardTitle>Job Notes</CardTitle>
                    <Button size="sm">Add Note</Button>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="border rounded-md p-4">
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center gap-2">
                            <Avatar className="h-6 w-6">
                              <AvatarImage src="/placeholder.svg?height=32&width=32" alt="User" />
                              <AvatarFallback>JD</AvatarFallback>
                            </Avatar>
                            <span className="font-medium">John Doe</span>
                          </div>
                          <span className="text-xs text-muted-foreground">Today, 10:30 AM</span>
                        </div>
                        <p className="text-sm">
                          Initial inspection complete. Found several faulty outlets in the conference room that need
                          replacement. Main circuit breaker is in good condition.
                        </p>
                      </div>
                      <div className="border rounded-md p-4">
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center gap-2">
                            <Avatar className="h-6 w-6">
                              <AvatarImage src="/placeholder.svg?height=32&width=32" alt="User" />
                              <AvatarFallback>SJ</AvatarFallback>
                            </Avatar>
                            <span className="font-medium">Sarah Johnson</span>
                          </div>
                          <span className="text-xs text-muted-foreground">Yesterday, 4:15 PM</span>
                        </div>
                        <p className="text-sm">
                          Pre-job site visit completed. Client has requested additional inspection of the emergency
                          lighting system.
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              <TabsContent value="images" className="mt-4">
                <JobImageSection jobId={job.id} jobTitle={job.title} />
              </TabsContent>
            </Tabs>
          </div>

          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Job Location</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-[200px] w-full relative bg-muted rounded-md overflow-hidden">
                  <div className="absolute inset-0 bg-[url('/placeholder.svg?height=400&width=600')] bg-cover bg-center opacity-50"></div>
                  <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2">
                    <div className="map-marker"></div>
                  </div>
                </div>
                <div className="mt-4 text-sm">
                  <p className="font-medium">{job.location}</p>
                  <Button variant="link" className="p-0 h-auto text-sm" asChild>
                    <a
                      href={`https://maps.google.com/?q=${encodeURIComponent(job.location)}`}
                      target="_blank"
                      rel="noreferrer"
                    >
                      Open in Google Maps
                    </a>
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Team</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <Avatar>
                        <AvatarImage src="/placeholder.svg?height=40&width=40" alt="John Doe" />
                        <AvatarFallback>JD</AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-medium">John Doe</p>
                        <p className="text-sm text-muted-foreground">Lead Technician</p>
                      </div>
                    </div>
                    <Button variant="ghost" size="icon">
                      <MessageSquare className="h-4 w-4" />
                    </Button>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <Avatar>
                        <AvatarImage src="/placeholder.svg?height=40&width=40" alt="Mike Wilson" />
                        <AvatarFallback>MW</AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-medium">Mike Wilson</p>
                        <p className="text-sm text-muted-foreground">Electrician</p>
                      </div>
                    </div>
                    <Button variant="ghost" size="icon">
                      <MessageSquare className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
                <div className="mt-4">
                  <RoleGate permission={Permission.MANAGE_STAFF} user={currentUser}>
                    <Button variant="outline" size="sm" className="w-full">
                      <Users className="mr-2 h-4 w-4" />
                      Assign More Staff
                    </Button>
                  </RoleGate>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Documents</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex items-center justify-between border-b pb-2">
                    <div className="flex items-center gap-2">
                      <FileText className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm">Job_Specification.pdf</span>
                    </div>
                    <Button variant="ghost" size="sm">
                      View
                    </Button>
                  </div>
                  <div className="flex items-center justify-between border-b pb-2">
                    <div className="flex items-center gap-2">
                      <FileText className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm">Electrical_Diagram.pdf</span>
                    </div>
                    <Button variant="ghost" size="sm">
                      View
                    </Button>
                  </div>
                  <div className="flex items-center justify-between pb-2">
                    <div className="flex items-center gap-2">
                      <FileText className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm">Safety_Checklist.docx</span>
                    </div>
                    <Button variant="ghost" size="sm">
                      View
                    </Button>
                  </div>
                </div>
                <div className="mt-4">
                  <Button variant="outline" size="sm" className="w-full">
                    Upload Document
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
