import { SettingsHeader } from "@/components/settings/settings-header"
import { SettingsTabs } from "@/components/settings/settings-tabs"

export default function Settings() {
  return (
    <div className="flex flex-col min-h-screen">
      <SettingsHeader />
      <div className="flex-1 p-4 md:p-6">
        <SettingsTabs />
      </div>
    </div>
  )
}
