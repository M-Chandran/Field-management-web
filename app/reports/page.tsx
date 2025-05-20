import { ReportsHeader } from "@/components/reports/reports-header"
import { ReportsList } from "@/components/reports/reports-list"
import { ReportsFilters } from "@/components/reports/reports-filters"

export default function Reports() {
  return (
    <div className="flex flex-col min-h-screen">
      <ReportsHeader />
      <div className="flex-1 p-4 md:p-6 space-y-6">
        <ReportsFilters />
        <ReportsList />
      </div>
    </div>
  )
}
