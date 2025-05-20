"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Search, X } from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { useState } from "react"

export function StaffFilters() {
  const [searchQuery, setSearchQuery] = useState("")
  const [status, setStatus] = useState("all-status")
  const [location, setLocation] = useState("all-locations")
  const [skill, setSkill] = useState("all-skills")
  const [activeFilters, setActiveFilters] = useState([
    { id: 1, type: "Role", value: "Supervisor" },
    { id: 2, type: "Skill", value: "Electrical" },
  ])

  const handleRemoveFilter = (id: number) => {
    setActiveFilters(activeFilters.filter((filter) => filter.id !== id))
  }

  const handleClearAll = () => {
    setActiveFilters([])
    setStatus("all-status")
    setLocation("all-locations")
    setSkill("all-skills")
    setSearchQuery("")
  }

  return (
    <div className="space-y-4">
      <div className="flex flex-col gap-4 sm:flex-row">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search staff by name, ID, or skill..."
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
              <SelectItem value="active">Active</SelectItem>
              <SelectItem value="on-leave">On Leave</SelectItem>
              <SelectItem value="inactive">Inactive</SelectItem>
            </SelectContent>
          </Select>
          <Select value={location} onValueChange={setLocation}>
            <SelectTrigger className="w-[140px]">
              <SelectValue placeholder="Location" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all-locations">All Locations</SelectItem>
              <SelectItem value="north">North Region</SelectItem>
              <SelectItem value="south">South Region</SelectItem>
              <SelectItem value="east">East Region</SelectItem>
              <SelectItem value="west">West Region</SelectItem>
            </SelectContent>
          </Select>
          <Select value={skill} onValueChange={setSkill}>
            <SelectTrigger className="w-[140px]">
              <SelectValue placeholder="Skills" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all-skills">All Skills</SelectItem>
              <SelectItem value="electrical">Electrical</SelectItem>
              <SelectItem value="plumbing">Plumbing</SelectItem>
              <SelectItem value="hvac">HVAC</SelectItem>
              <SelectItem value="carpentry">Carpentry</SelectItem>
              <SelectItem value="welding">Welding</SelectItem>
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
