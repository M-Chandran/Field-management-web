import { Button } from "@/components/ui/button"
import { PlusCircle, Download, Filter, RefreshCw } from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export function EquipmentHeader() {
  return (
    <div className="sticky top-0 z-10 flex flex-col border-b bg-background px-4 py-3 md:px-6 lg:flex-row lg:items-center lg:justify-between">
      <div className="mb-4 lg:mb-0">
        <h1 className="text-2xl font-bold">Equipment Management</h1>
        <p className="text-sm text-muted-foreground">Track and manage tools, vehicles, and equipment</p>
      </div>
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
        <div className="flex items-center gap-2">
          <Select defaultValue="all">
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Types</SelectItem>
              <SelectItem value="tools">Tools</SelectItem>
              <SelectItem value="vehicles">Vehicles</SelectItem>
              <SelectItem value="machinery">Machinery</SelectItem>
              <SelectItem value="electronics">Electronics</SelectItem>
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
            Add Equipment
          </Button>
        </div>
      </div>
    </div>
  )
}
