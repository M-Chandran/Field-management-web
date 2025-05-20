import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"

// Sample weekly data
const weeklyData = [
  {
    date: "2025-05-20",
    day: "Monday",
    totalHours: 7.75,
    jobs: [{ name: "Downtown Project", hours: 7.75 }],
    status: "submitted",
  },
  {
    date: "2025-05-19",
    day: "Sunday",
    totalHours: 0,
    jobs: [],
    status: "no-entry",
  },
  {
    date: "2025-05-18",
    day: "Saturday",
    totalHours: 4.5,
    jobs: [{ name: "Downtown Project", hours: 4.5 }],
    status: "approved",
  },
  {
    date: "2025-05-17",
    day: "Friday",
    totalHours: 8.25,
    jobs: [
      { name: "Westside Construction", hours: 5.75 },
      { name: "Downtown Project", hours: 2.5 },
    ],
    status: "approved",
  },
  {
    date: "2025-05-16",
    day: "Thursday",
    totalHours: 8.0,
    jobs: [{ name: "Westside Construction", hours: 8.0 }],
    status: "approved",
  },
  {
    date: "2025-05-15",
    day: "Wednesday",
    totalHours: 7.5,
    jobs: [{ name: "Northside Renovation", hours: 7.5 }],
    status: "approved",
  },
  {
    date: "2025-05-14",
    day: "Tuesday",
    totalHours: 8.0,
    jobs: [{ name: "Northside Renovation", hours: 8.0 }],
    status: "approved",
  },
]

// Weekly summary stats
const weeklySummary = {
  totalHours: 44.0,
  regularHours: 40.0,
  overtimeHours: 4.0,
  jobBreakdown: [
    { name: "Downtown Project", hours: 14.75 },
    { name: "Westside Construction", hours: 13.75 },
    { name: "Northside Renovation", hours: 15.5 },
  ],
}

export function TimesheetsWeekly() {
  const getStatusBadge = (status: string) => {
    switch (status) {
      case "approved":
        return <Badge className="bg-green-500">Approved</Badge>
      case "submitted":
        return <Badge>Submitted</Badge>
      case "rejected":
        return <Badge className="bg-red-500">Rejected</Badge>
      case "no-entry":
        return <Badge variant="outline">No Entry</Badge>
      default:
        return <Badge variant="outline">{status}</Badge>
    }
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Weekly Summary</CardTitle>
          <CardDescription>May 14 - May 20, 2025</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-6 md:grid-cols-3">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Total Hours</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{weeklySummary.totalHours}</div>
                <p className="text-xs text-muted-foreground">
                  Regular: {weeklySummary.regularHours} | Overtime: {weeklySummary.overtimeHours}
                </p>
              </CardContent>
            </Card>
            <Card className="md:col-span-2">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Job Breakdown</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {weeklySummary.jobBreakdown.map((job, index) => (
                    <div key={index} className="flex items-center justify-between">
                      <span className="text-sm">{job.name}</span>
                      <div className="flex items-center gap-2">
                        <div className="w-32 h-2 rounded-full bg-muted overflow-hidden">
                          <div
                            className="h-full bg-primary"
                            style={{
                              width: `${(job.hours / weeklySummary.totalHours) * 100}%`,
                            }}
                          />
                        </div>
                        <span className="text-sm font-medium">{job.hours} hrs</span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Daily Breakdown</CardTitle>
          <CardDescription>Hours worked each day this week</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Date</TableHead>
                <TableHead>Day</TableHead>
                <TableHead>Jobs</TableHead>
                <TableHead className="text-right">Hours</TableHead>
                <TableHead className="text-right">Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {weeklyData.map((day) => (
                <TableRow key={day.date}>
                  <TableCell>{new Date(day.date).toLocaleDateString()}</TableCell>
                  <TableCell>{day.day}</TableCell>
                  <TableCell>
                    {day.jobs.length > 0 ? (
                      <div className="space-y-1">
                        {day.jobs.map((job, index) => (
                          <div key={index} className="text-sm">
                            {job.name} <span className="text-muted-foreground">({job.hours} hrs)</span>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <span className="text-muted-foreground">No entries</span>
                    )}
                  </TableCell>
                  <TableCell className="text-right font-medium">{day.totalHours}</TableCell>
                  <TableCell className="text-right">{getStatusBadge(day.status)}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}
