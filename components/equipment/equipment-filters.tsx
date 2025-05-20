"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Search, X } from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { useState } from "react"

export function EquipmentFilters() {
  const [searchQuery, setSearchQuery] = useState("")
  const [status, setStatus] = useState("all-status")
  const [location, setLocation] = useState("all-locations")
  const [condition, setCondition] = useState("all-condition")
  const [activeFilters, setActiveFilters] = useState([
    { id: 1, type: "Type", value: "Tools" },
    { id: 2, type: "Status", value: "Available" },
  ])

  const handleRemoveFilter = (id: number) => {
    setActiveFilters(activeFilters.filter((filter) => filter.id !== id))
  }

  const handleClearAll = () => {
    setActiveFilters([])
    setStatus("all-status")
    setLocation("all-locations")
    setCondition("all-condition")
    setSearchQuery("")
  }

  return (
    <div className="space-y-4">
      <div className="flex flex-col gap-4 sm:flex-row">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search equipment by name, ID, or type..."
            className="pl-8"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <div className="flex flex-wrap gap-2">
          <Select value={status} onValueChange={setStatus}>
            <SelectTrigger className="w-[140px]">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all-status">All Status</SelectItem>
              <SelectItem value="available">Available</SelectItem>
              <SelectItem value="in-use">In Use</SelectItem>
              <SelectItem value="maintenance">Maintenance</SelectItem>
              <SelectItem value="out-of-service">Out of Service</SelectItem>
            </SelectContent>
          </Select>
          <Select value={location} onValueChange={setLocation}>
            <SelectTrigger className="w-[140px]">
              <SelectValue placeholder="Location" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all-locations">All Locations</SelectItem>
              <SelectItem value="warehouse">Warehouse</SelectItem>
              <SelectItem value="job-site">Job Site</SelectItem>
              <SelectItem value="in-transit">In Transit</SelectItem>
              <SelectItem value="repair-shop">Repair Shop</SelectItem>
            </SelectContent>
          </Select>
          <Select value={condition} onValueChange={setCondition}>
            <SelectTrigger className="w-[140px]">
              <SelectValue placeholder="Condition" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all-condition">All Conditions</SelectItem>
              <SelectItem value="excellent">Excellent</SelectItem>
              <SelectItem value="good">Good</SelectItem>
              <SelectItem value="fair">Fair</SelectItem>
              <SelectItem value="poor">Poor</SelectItem>
            </SelectContent>
          </Select>
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
