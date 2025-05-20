"use client"

import { Button } from "@/components/ui/button"
import { PlusCircle, Download, Filter } from "lucide-react"
import { DateRangePicker } from "@/components/ui/date-range-picker"
import { useState } from "react"

export function TimesheetsHeader() {
  type DateRange = { from: Date | undefined; to?: Date | undefined }
  const [date, setDate] = useState<DateRange>({
    from: new Date(new Date().setDate(new Date().getDate() - 7)),
    to: new Date(),
  })

  return (
    <div className="border-b">
      <div className="flex flex-col gap-4 p-6 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Timesheets</h1>
          <p className="text-muted-foreground">Manage and track employee work hours</p>
        </div>
        <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
          <DateRangePicker date={date} onDateChange={setDate} align="end" />
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm">
              <Filter className="mr-2 h-4 w-4" />
              Filter
            </Button>
            <Button variant="outline" size="sm">
              <Download className="mr-2 h-4 w-4" />
              Export
            </Button>
            <Button size="sm">
              <PlusCircle className="mr-2 h-4 w-4" />
              New Entry
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
