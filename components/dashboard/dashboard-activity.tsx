import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { CheckCircle, Clock, AlertTriangle, MoreHorizontal } from "lucide-react"

export function DashboardActivity() {
  const activities = [
    {
      id: 1,
      user: {
        name: "John Doe",
        avatar: "/placeholder.svg?height=40&width=40",
        initials: "JD",
      },
      action: "completed",
      job: "Electrical Maintenance",
      location: "123 Main St, Building A",
      time: "10 minutes ago",
      status: "completed",
    },
    {
      id: 2,
      user: {
        name: "Sarah Johnson",
        avatar: "/placeholder.svg?height=40&width=40",
        initials: "SJ",
      },
      action: "started",
      job: "HVAC Installation",
      location: "456 Park Ave, Suite 200",
      time: "25 minutes ago",
      status: "in-progress",
    },
    {
      id: 3,
      user: {
        name: "Mike Wilson",
        avatar: "/placeholder.svg?height=40&width=40",
        initials: "MW",
      },
      action: "reported issue",
      job: "Plumbing Repair",
      location: "789 Oak St, Unit 3B",
      time: "1 hour ago",
      status: "issue",
    },
    {
      id: 4,
      user: {
        name: "Emily Chen",
        avatar: "/placeholder.svg?height=40&width=40",
        initials: "EC",
      },
      action: "assigned to",
      job: "Security System Installation",
      location: "321 Elm St, Floor 5",
      time: "2 hours ago",
      status: "assigned",
    },
    {
      id: 5,
      user: {
        name: "Robert Taylor",
        avatar: "/placeholder.svg?height=40&width=40",
        initials: "RT",
      },
      action: "updated",
      job: "Landscaping Project",
      location: "654 Pine St, Backyard",
      time: "3 hours ago",
      status: "updated",
    },
  ]

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle>Recent Activity</CardTitle>
        <Button variant="ghost" size="sm" className="h-8 px-2">
          View all
        </Button>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {activities.map((activity) => (
            <div key={activity.id} className="flex items-start gap-4 rounded-lg border p-3">
              <Avatar className="h-9 w-9">
                <AvatarImage src={activity.user.avatar || "/placeholder.svg"} alt={activity.user.name} />
                <AvatarFallback>{activity.user.initials}</AvatarFallback>
              </Avatar>
              <div className="flex-1 space-y-1">
                <div className="flex items-center gap-2">
                  <span className="font-medium">{activity.user.name}</span>
                  <Badge
                    variant={
                      activity.status === "completed"
                        ? "success"
                        : activity.status === "issue"
                          ? "destructive"
                          : "secondary"
                    }
                    className="px-1 py-0 text-[10px]"
                  >
                    {activity.action}
                  </Badge>
                </div>
                <p className="text-sm">{activity.job}</p>
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <span>{activity.location}</span>
                  <span>•</span>
                  <span className="flex items-center gap-1">
                    <Clock className="h-3 w-3" />
                    {activity.time}
                  </span>
                </div>
              </div>
              <div className="flex items-center">
                {activity.status === "completed" && <CheckCircle className="h-4 w-4 text-green-500" />}
                {activity.status === "in-progress" && <Clock className="h-4 w-4 text-yellow-500" />}
                {activity.status === "issue" && <AlertTriangle className="h-4 w-4 text-red-500" />}
                <Button variant="ghost" size="icon" className="h-8 w-8">
                  <MoreHorizontal className="h-4 w-4" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
