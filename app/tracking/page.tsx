import type { Metadata } from "next"
import { FieldTrackingHeader } from "@/components/tracking/field-tracking-header"
import { FieldTrackingMap } from "@/components/tracking/field-tracking-map"
import { FieldTrackingList } from "@/components/tracking/field-tracking-list"
import { FieldTrackingFilters } from "@/components/tracking/field-tracking-filters"
import { FieldTrackingActivity } from "@/components/tracking/field-tracking-activity"

export const metadata: Metadata = {
  title: "Field Tracking | FieldMaster",
  description: "Track your field staff and equipment in real-time",
}

export default function FieldTrackingPage() {
  return (
    <div className="flex flex-col h-full">
      <FieldTrackingHeader />
      <div className="grid flex-1 gap-6 md:grid-cols-1 lg:grid-cols-3 p-6">
        <div className="lg:col-span-2 space-y-6">
          <FieldTrackingFilters />
          <FieldTrackingMap />
        </div>
        <div className="space-y-6">
          <FieldTrackingList />
          <FieldTrackingActivity />
        </div>
      </div>
    </div>
  )
}
