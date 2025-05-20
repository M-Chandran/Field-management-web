import { Button } from "@/components/ui/button"
import { Download, Filter, RefreshCw } from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export function AnalyticsHeader() {
  return (
    <div className="sticky top-0 z-10 flex flex-col border-b bg-background px-4 py-3 md:px-6 lg:flex-row lg:items-center lg:justify-between">
      <div className="mb-4 lg:mb-0">
        <h1 className="text-2xl font-bold">Analytics & KPIs</h1>
        <p className="text-sm text-muted-foreground">Track performance metrics and business insights</p>
      </div>
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
        <div className="flex items-center gap-2">
          <Select defaultValue="month">
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select timeframe" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="day">Today</SelectItem>
              <SelectItem value="week">This Week</SelectItem>
              <SelectItem value="month">This Month</SelectItem>
              <SelectItem value="quarter">This Quarter</SelectItem>
              <SelectItem value="year">This Year</SelectItem>
              <SelectItem value="custom">Custom Range</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline" size="icon">
            <Filter className="h-4 w-4" />
          </Button>
          <Button variant="outline" size="icon">
            <RefreshCw className="h-4 w-4" />
          </Button>
        </div>
        <Button variant="outline" className="gap-1">
          <Download className="h-4 w-4" />
          Export
        </Button>
      </div>
    </div>
  )
}
