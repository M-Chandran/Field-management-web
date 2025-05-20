"use client"

import { Button } from "@/components/ui/button"
import { X } from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { DateRangePicker } from "@/components/ui/date-range-picker"
import { useState } from "react"

export function AnalyticsFilters() {
  const [department, setDepartment] = useState("all-departments")
  const [region, setRegion] = useState("all-regions")
  const [metric, setMetric] = useState("all-metrics")
  const [activeFilters, setActiveFilters] = useState([
    { id: 1, type: "Department", value: "Construction" },
    { id: 2, type: "Metric", value: "Efficiency" },
  ])

  const handleRemoveFilter = (id: number) => {
    setActiveFilters(activeFilters.filter((filter) => filter.id !== id))
  }

  const handleClearAll = () => {
    setActiveFilters([])
    setDepartment("all-departments")
    setRegion("all-regions")
    setMetric("all-metrics")
  }

  return (
    <div className="space-y-4">
      <div className="flex flex-col gap-4 sm:flex-row">
        <div className="flex flex-wrap gap-2">
          <Select value={department} onValueChange={setDepartment}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Department" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all-departments">All Departments</SelectItem>
              <SelectItem value="construction">Construction</SelectItem>
              <SelectItem value="maintenance">Maintenance</SelectItem>
              <SelectItem value="logistics">Logistics</SelectItem>
              <SelectItem value="agriculture">Agriculture</SelectItem>
            </SelectContent>
          </Select>
          <Select value={region} onValueChange={setRegion}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Region" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all-regions">All Regions</SelectItem>
              <SelectItem value="north">North Region</SelectItem>
              <SelectItem value="south">South Region</SelectItem>
              <SelectItem value="east">East Region</SelectItem>
              <SelectItem value="west">West Region</SelectItem>
            </SelectContent>
          </Select>
          <Select value={metric} onValueChange={setMetric}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Metrics" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all-metrics">All Metrics</SelectItem>
              <SelectItem value="efficiency">Efficiency</SelectItem>
              <SelectItem value="cost">Cost</SelectItem>
              <SelectItem value="utilization">Utilization</SelectItem>
              <SelectItem value="safety">Safety</SelectItem>
              <SelectItem value="quality">Quality</SelectItem>
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
