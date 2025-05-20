import type { Metadata } from "next"
import { TimesheetsHeader } from "@/components/timesheets/timesheets-header"
import { TimesheetsTabs } from "@/components/timesheets/timesheets-tabs"

export const metadata: Metadata = {
  title: "Timesheets | FieldMaster",
  description: "Manage and track employee work hours",
}

export default function TimesheetsPage() {
  return (
    <div className="flex flex-col h-full">
      <TimesheetsHeader />
      <div className="flex-1 p-6">
        <TimesheetsTabs />
      </div>
    </div>
  )
}
