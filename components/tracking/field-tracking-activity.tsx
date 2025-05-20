import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

// Sample activity data
const activities = [
  {
    id: 1,
    user: {
      name: "John Smith",
      avatar: "/placeholder.svg?height=32&width=32",
      initials: "JS",
    },
    action: "arrived at",
    location: "Downtown Project",
    time: "10:32 AM",
    type: "arrival",
  },
  {
    id: 2,
    user: {
      name: "Sarah Johnson",
      avatar: "/placeholder.svg?height=32&width=32",
      initials: "SJ",
    },
    action: "completed task",
    location: "Westside Construction",
    time: "10:15 AM",
    type: "task",
  },
  {
    id: 3,
    user: {
      name: "Mike Davis",
      avatar: "/placeholder.svg?height=32&width=32",
      initials: "MD",
    },
    action: "started break",
    location: "Northside Renovation",
    time: "9:45 AM",
    type: "break",
  },
  {
    id: 4,
    user: {
      name: "Truck #1",
      avatar: "",
      initials: "T1",
    },
    action: "departed from",
    location: "Warehouse",
    time: "9:30 AM",
    type: "departure",
    isVehicle: true,
  },
  {
    id: 5,
    user: {
      name: "Lisa Chen",
      avatar: "/placeholder.svg?height=32&width=32",
      initials: "LC",
    },
    action: "went offline",
    location: "Office",
    time: "9:15 AM",
    type: "offline",
  },
]

export function FieldTrackingActivity() {
  const getActivityBadge = (type: string) => {
    switch (type) {
      case "arrival":
        return <Badge className="bg-green-500">Arrival</Badge>
      case "departure":
        return <Badge className="bg-blue-500">Departure</Badge>
      case "task":
        return <Badge className="bg-purple-500">Task</Badge>
      case "break":
        return <Badge className="bg-yellow-500">Break</Badge>
      case "offline":
        return <Badge variant="outline">Offline</Badge>
      default:
        return <Badge variant="outline">{type}</Badge>
    }
  }

  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle>Recent Activity</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {activities.map((activity) => (
            <div key={activity.id} className="flex items-start gap-3">
              {activity.isVehicle ? (
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-100 text-blue-700 mt-0.5">
                  <span className="text-xs font-bold">{activity.user.initials}</span>
                </div>
              ) : (
                <Avatar className="h-8 w-8">
                  <AvatarImage src={activity.user.avatar || "/placeholder.svg"} alt={activity.user.name} />
                  <AvatarFallback>{activity.user.initials}</AvatarFallback>
                </Avatar>
              )}
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <p className="font-medium">{activity.user.name}</p>
                  <span className="text-xs text-muted-foreground">{activity.time}</span>
                </div>
                <p className="text-sm text-muted-foreground">
                  {activity.action} <span className="font-medium">{activity.location}</span>
                </p>
              </div>
              <div>{getActivityBadge(activity.type)}</div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
