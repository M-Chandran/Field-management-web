"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Search, X } from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { DateRangePicker } from "@/components/ui/date-range-picker"
import { useState } from "react"

export function ReportsFilters() {
  const [searchQuery, setSearchQuery] = useState("")
  const [type, setType] = useState("all-types")
  const [status, setStatus] = useState("all-status")
  const [activeFilters, setActiveFilters] = useState([
    { id: 1, type: "Type", value: "Inspection" },
    { id: 2, type: "Status", value: "Approved" },
  ])

  const handleRemoveFilter = (id: number) => {
    setActiveFilters(activeFilters.filter((filter) => filter.id !== id))
  }

  const handleClearAll = () => {
    setActiveFilters([])
    setType("all-types")
    setStatus("all-status")
    setSearchQuery("")
  }

  return (
    <div className="space-y-4">
      <div className="flex flex-col gap-4 sm:flex-row">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search reports by title, ID, or content..."
            className="pl-8"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <div className="flex flex-wrap gap-2">
          <Select value={type} onValueChange={setType}>
            <SelectTrigger className="w-[140px]">
              <SelectValue placeholder="Type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all-types">All Types</SelectItem>
              <SelectItem value="incident">Incident</SelectItem>
              <SelectItem value="inspection">Inspection</SelectItem>
              <SelectItem value="maintenance">Maintenance</SelectItem>
              <SelectItem value="safety">Safety</SelectItem>
              <SelectItem value="progress">Progress</SelectItem>
            </SelectContent>
          </Select>
          <Select value={status} onValueChange={setStatus}>
            <SelectTrigger className="w-[140px]">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all-status">All Status</SelectItem>
              <SelectItem value="draft">Draft</SelectItem>
              <SelectItem value="submitted">Submitted</SelectItem>
              <SelectItem value="approved">Approved</SelectItem>
              <SelectItem value="rejected">Rejected</SelectItem>
            </SelectContent>
          </Select>
          <div className="w-[280px]">
            <DateRangePicker />
          </div>
        </div>
      </div>
      <div className="flex items-center gap-2">
        <span className="text-sm text-muted-foreground">Active filters:</span>
        <div className="flex flex-wrap gap-2">
          {activeFilters.map((filter) => (
            <Badge key={filter.id} variant="outline" className="flex items-center gap-1">
              {filter.type}: {filter.value}
              <Button variant="ghost" size="icon" className="h-4 w-4 p-0" onClick={() => handleRemoveFilter(filter.id)}>
                <X className="h-3 w-3" />
                <span className="sr-only">Remove filter</span>
              </Button>
            </Badge>
          ))}
          {activeFilters.length > 0 && (
            <Button variant="ghost" size="sm" className="h-7 text-xs" onClick={handleClearAll}>
              Clear All
            </Button>
          )}
        </div>
      </div>
    </div>
  )
}
