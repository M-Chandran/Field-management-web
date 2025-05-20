import { Button } from "@/components/ui/button"
import { PlusCircle, Download, Filter, RefreshCw } from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export function ReportsHeader() {
  return (
    <div className="sticky top-0 z-10 flex flex-col border-b bg-background px-4 py-3 md:px-6 lg:flex-row lg:items-center lg:justify-between">
      <div className="mb-4 lg:mb-0">
        <h1 className="text-2xl font-bold">Reports</h1>
        <p className="text-sm text-muted-foreground">View and generate field operation reports</p>
      </div>
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
        <div className="flex items-center gap-2">
          <Select defaultValue="all">
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Reports</SelectItem>
              <SelectItem value="daily">Daily Reports</SelectItem>
              <SelectItem value="weekly">Weekly Reports</SelectItem>
              <SelectItem value="monthly">Monthly Reports</SelectItem>
              <SelectItem value="custom">Custom Reports</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline" size="icon">
            <Filter className="h-4 w-4" />
          </Button>
          <Button variant="outline" size="icon">
            <RefreshCw className="h-4 w-4" />
          </Button>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" className="gap-1">
            <Download className="h-4 w-4" />
            Export
          </Button>
          <Button className="gap-1">
            <PlusCircle className="h-4 w-4" />
            New Report
          </Button>
        </div>
      </div>
    </div>
  )
}
