import { ArrowUpIcon, Clock, Users, Briefcase, CheckCircle } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export function DashboardStats() {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Active Jobs</CardTitle>
          <Briefcase className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">24</div>
          <p className="text-xs text-muted-foreground">
            <span className="flex items-center text-emerald-500">
              <ArrowUpIcon className="mr-1 h-3 w-3" />
              12%
            </span>{" "}
            from last week
          </p>
          <div className="mt-2 h-1.5 w-full rounded-full bg-muted">
            <div className="h-1.5 w-[65%] rounded-full bg-primary"></div>
          </div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Field Staff</CardTitle>
          <Users className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">42</div>
          <p className="text-xs text-muted-foreground">
            <span className="flex items-center text-emerald-500">
              <ArrowUpIcon className="mr-1 h-3 w-3" />
              8%
            </span>{" "}
            from last month
          </p>
          <div className="mt-2 flex items-center gap-1 text-xs">
            <span className="flex items-center gap-0.5">
              <span className="h-2 w-2 rounded-full bg-green-500"></span>
              <span>32 Active</span>
            </span>
            <span className="flex items-center gap-0.5">
              <span className="h-2 w-2 rounded-full bg-yellow-500"></span>
              <span>7 On Leave</span>
            </span>
            <span className="flex items-center gap-0.5">
              <span className="h-2 w-2 rounded-full bg-red-500"></span>
              <span>3 Absent</span>
            </span>
          </div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Completion Rate</CardTitle>
          <CheckCircle className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">87%</div>
          <p className="text-xs text-muted-foreground">
            <span className="flex items-center text-emerald-500">
              <ArrowUpIcon className="mr-1 h-3 w-3" />
              5%
            </span>{" "}
            from last month
          </p>
          <div className="mt-2 h-1.5 w-full rounded-full bg-muted">
            <div className="h-1.5 w-[87%] rounded-full bg-emerald-500"></div>
          </div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Avg. Response Time</CardTitle>
          <Clock className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">28 min</div>
          <p className="text-xs text-muted-foreground">
            <span className="flex items-center text-red-500">
              <ArrowUpIcon className="mr-1 h-3 w-3" />
              3%
            </span>{" "}
            from last week
          </p>
          <div className="mt-2 flex items-center gap-1 text-xs">
            <span className="flex items-center gap-0.5">
              <span className="h-2 w-2 rounded-full bg-green-500"></span>
              <span>Emergency: 12 min</span>
            </span>
            <span className="flex items-center gap-0.5">
              <span className="h-2 w-2 rounded-full bg-yellow-500"></span>
              <span>Regular: 32 min</span>
            </span>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
