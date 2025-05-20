"use client"
import { Input } from "@/components/ui/input"
import { Search } from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useState } from "react"

export function FieldTrackingFilters() {
  const [resourceType, setResourceType] = useState("all")
  const [status, setStatus] = useState("all")

  return (
    <div className="rounded-lg border bg-card">
      <div className="p-4">
        <h2 className="text-lg font-semibold">Filters</h2>
        <div className="mt-4 grid gap-4 md:grid-cols-3">
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input type="search" placeholder="Search by name or ID..." className="w-full bg-background pl-8" />
          </div>
          <Select value={resourceType} onValueChange={setResourceType}>
            <SelectTrigger>
              <SelectValue placeholder="Resource Type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Resources</SelectItem>
              <SelectItem value="staff">Staff</SelectItem>
              <SelectItem value="vehicles">Vehicles</SelectItem>
              <SelectItem value="equipment">Equipment</SelectItem>
              <SelectItem value="jobsites">Job Sites</SelectItem>
            </SelectContent>
          </Select>
          <Select value={status} onValueChange={setStatus}>
            <SelectTrigger>
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Statuses</SelectItem>
              <SelectItem value="active">Active</SelectItem>
              <SelectItem value="idle">Idle</SelectItem>
              <SelectItem value="offline">Offline</SelectItem>
              <SelectItem value="maintenance">Maintenance</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>
  )
}
