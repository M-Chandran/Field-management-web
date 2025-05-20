import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowDownIcon, ArrowUpIcon, PenToolIcon as Tool, Truck, AlertTriangle, Wrench } from "lucide-react"

export function EquipmentStats() {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total Equipment</CardTitle>
          <Tool className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">248</div>
          <p className="text-xs text-muted-foreground">
            <span className="flex items-center text-emerald-500">
              <ArrowUpIcon className="mr-1 h-3 w-3" />
              5%
            </span>{" "}
            from last month
          </p>
          <div className="mt-2 flex items-center gap-1 text-xs">
            <span className="flex items-center gap-0.5">
              <span className="h-2 w-2 rounded-full bg-primary"></span>
              <span>Tools: 142</span>
            </span>
            <span className="flex items-center gap-0.5">
              <span className="h-2 w-2 rounded-full bg-blue-500"></span>
              <span>Vehicles: 35</span>
            </span>
            <span className="flex items-center gap-0.5">
              <span className="h-2 w-2 rounded-full bg-green-500"></span>
              <span>Other: 71</span>
            </span>
          </div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">In Use</CardTitle>
          <Truck className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">156</div>
          <p className="text-xs text-muted-foreground">
            <span className="flex items-center text-emerald-500">
              <ArrowUpIcon className="mr-1 h-3 w-3" />
              12%
            </span>{" "}
            from last week
          </p>
          <div className="mt-2 h-1.5 w-full rounded-full bg-muted">
            <div className="h-1.5 w-[63%] rounded-full bg-primary"></div>
          </div>
          <p className="mt-1 text-xs text-muted-foreground">63% of total equipment</p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Maintenance Due</CardTitle>
          <Wrench className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">18</div>
          <p className="text-xs text-muted-foreground">
            <span className="flex items-center text-red-500">
              <ArrowUpIcon className="mr-1 h-3 w-3" />3
            </span>{" "}
            from yesterday
          </p>
          <div className="mt-2 flex items-center gap-1 text-xs">
            <span className="flex items-center gap-0.5">
              <span className="h-2 w-2 rounded-full bg-red-500"></span>
              <span>Urgent: 5</span>
            </span>
            <span className="flex items-center gap-0.5">
              <span className="h-2 w-2 rounded-full bg-yellow-500"></span>
              <span>This Week: 13</span>
            </span>
          </div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Issues Reported</CardTitle>
          <AlertTriangle className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">7</div>
          <p className="text-xs text-muted-foreground">
            <span className="flex items-center text-emerald-500">
              <ArrowDownIcon className="mr-1 h-3 w-3" />2
            </span>{" "}
            from last week
          </p>
          <div className="mt-2 flex items-center gap-1 text-xs">
            <span className="flex items-center gap-0.5">
              <span className="h-2 w-2 rounded-full bg-red-500"></span>
              <span>Critical: 2</span>
            </span>
            <span className="flex items-center gap-0.5">
              <span className="h-2 w-2 rounded-full bg-yellow-500"></span>
              <span>Medium: 3</span>
            </span>
            <span className="flex items-center gap-0.5">
              <span className="h-2 w-2 rounded-full bg-green-500"></span>
              <span>Low: 2</span>
            </span>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
