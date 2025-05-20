import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { AlertTriangle, Clock, CloudRain, Thermometer } from "lucide-react"

export function DashboardAlerts() {
  const alerts = [
    {
      id: 1,
      type: "weather",
      title: "Heavy Rain Warning",
      description: "Expected at Downtown job sites",
      time: "Starting in 2 hours",
      icon: CloudRain,
      severity: "warning",
    },
    {
      id: 2,
      type: "equipment",
      title: "Excavator #103 Maintenance Due",
      description: "Scheduled maintenance required",
      time: "Due in 3 days",
      icon: Clock,
      severity: "info",
    },
    {
      id: 3,
      type: "safety",
      title: "High Temperature Alert",
      description: "95°F at Westside Construction",
      time: "Current condition",
      icon: Thermometer,
      severity: "high",
    },
    {
      id: 4,
      type: "deadline",
      title: "Project Milestone Approaching",
      description: "Phase 1 completion deadline",
      time: "Due in 2 days",
      icon: AlertTriangle,
      severity: "medium",
    },
  ]

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-sm font-medium">Alerts & Notifications</CardTitle>
        <Button variant="ghost" size="sm" className="h-6 px-2 text-xs">
          Clear All
        </Button>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {alerts.map((alert) => (
            <div key={alert.id} className="flex items-start gap-3 rounded-lg border p-2">
              <div
                className={`flex h-8 w-8 items-center justify-center rounded-full ${
                  alert.severity === "high"
                    ? "bg-red-100 text-red-600"
                    : alert.severity === "warning"
                      ? "bg-yellow-100 text-yellow-600"
                      : alert.severity === "medium"
                        ? "bg-orange-100 text-orange-600"
                        : "bg-blue-100 text-blue-600"
                }`}
              >
                <alert.icon className="h-4 w-4" />
              </div>
              <div className="flex-1 space-y-1">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-medium">{alert.title}</p>
                  <Badge
                    variant={
                      alert.severity === "high"
                        ? "destructive"
                        : alert.severity === "warning"
                          ? "warning"
                          : alert.severity === "medium"
                            ? "secondary"
                            : "outline"
                    }
                    className="px-1 py-0 text-[10px]"
                  >
                    {alert.type}
                  </Badge>
                </div>
                <p className="text-xs text-muted-foreground">{alert.description}</p>
                <p className="text-xs font-medium">{alert.time}</p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
