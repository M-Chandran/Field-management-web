import { StaffHeader } from "@/components/staff/staff-header"
import { StaffList } from "@/components/staff/staff-list"
import { StaffFilters } from "@/components/staff/staff-filters"

export default function StaffManagement() {
  return (
    <div className="flex flex-col min-h-screen">
      <StaffHeader />
      <div className="flex-1 p-4 md:p-6 space-y-6">
        <StaffFilters />
        <StaffList />
      </div>
    </div>
  )
}
