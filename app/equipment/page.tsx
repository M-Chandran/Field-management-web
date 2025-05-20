import { EquipmentHeader } from "@/components/equipment/equipment-header"
import { EquipmentList } from "@/components/equipment/equipment-list"
import { EquipmentFilters } from "@/components/equipment/equipment-filters"
import { EquipmentStats } from "@/components/equipment/equipment-stats"

export default function EquipmentManagement() {
  return (
    <div className="flex flex-col min-h-screen">
      <EquipmentHeader />
      <div className="flex-1 p-4 md:p-6 space-y-6">
        <EquipmentStats />
        <EquipmentFilters />
        <EquipmentList />
      </div>
    </div>
  )
}
