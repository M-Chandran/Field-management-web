import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Search, PlusCircle, Filter, Settings } from "lucide-react"

export function MessagesHeader() {
  return (
    <div className="sticky top-0 z-10 flex flex-col border-b bg-background px-4 py-3 md:px-6 lg:flex-row lg:items-center lg:justify-between">
      <div className="mb-4 lg:mb-0">
        <h1 className="text-2xl font-bold">Messages</h1>
        <p className="text-sm text-muted-foreground">Communicate with your team and clients</p>
      </div>
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
        <div className="relative flex-1 sm:w-64">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input type="search" placeholder="Search messages..." className="pl-8" />
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="icon">
            <Filter className="h-4 w-4" />
          </Button>
          <Button variant="outline" size="icon">
            <Settings className="h-4 w-4" />
          </Button>
          <Button className="gap-1">
            <PlusCircle className="h-4 w-4" />
            New Message
          </Button>
        </div>
      </div>
    </div>
  )
}
