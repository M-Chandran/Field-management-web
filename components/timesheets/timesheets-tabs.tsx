"use client"

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { TimesheetsDaily } from "@/components/timesheets/timesheets-daily"
import { TimesheetsWeekly } from "@/components/timesheets/timesheets-weekly"
import { TimesheetsApproval } from "@/components/timesheets/timesheets-approval"
import { useState } from "react"

export function TimesheetsTabs() {
  const [activeTab, setActiveTab] = useState("daily")

  return (
    <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
      <TabsList className="grid w-full max-w-md grid-cols-3">
        <TabsTrigger value="daily">Daily View</TabsTrigger>
        <TabsTrigger value="weekly">Weekly Summary</TabsTrigger>
        <TabsTrigger value="approval">Approval Queue</TabsTrigger>
      </TabsList>
      <TabsContent value="daily" className="space-y-4">
        <TimesheetsDaily />
      </TabsContent>
      <TabsContent value="weekly" className="space-y-4">
        <TimesheetsWeekly />
      </TabsContent>
      <TabsContent value="approval" className="space-y-4">
        <TimesheetsApproval />
      </TabsContent>
    </Tabs>
  )
}
