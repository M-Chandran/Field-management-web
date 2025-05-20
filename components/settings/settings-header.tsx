import { Button } from "@/components/ui/button"
import { Save } from "lucide-react"

export function SettingsHeader() {
  return (
    <div className="sticky top-0 z-10 flex flex-col border-b bg-background px-4 py-3 md:px-6 lg:flex-row lg:items-center lg:justify-between">
      <div className="mb-4 lg:mb-0">
        <h1 className="text-2xl font-bold">Settings</h1>
        <p className="text-sm text-muted-foreground">Manage your account and application preferences</p>
      </div>
      <div className="flex items-center gap-2">
        <Button className="gap-1">
          <Save className="h-4 w-4" />
          Save Changes
        </Button>
      </div>
    </div>
  )
}
