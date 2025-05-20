import { AnalyticsHeader } from "@/components/analytics/analytics-header"
import { AnalyticsCharts } from "@/components/analytics/analytics-charts"
import { AnalyticsFilters } from "@/components/analytics/analytics-filters"
import { AnalyticsTables } from "@/components/analytics/analytics-tables"

export default function Analytics() {
  return (
    <div className="flex flex-col min-h-screen">
      <AnalyticsHeader />
      <div className="flex-1 p-4 md:p-6 space-y-6">
        <AnalyticsFilters />
        <AnalyticsCharts />
        <AnalyticsTables />
      </div>
    </div>
  )
}
