import { JobsHeader } from "@/components/jobs/jobs-header"
import { JobsCalendar } from "@/components/jobs/jobs-calendar"
import { JobsList } from "@/components/jobs/jobs-list"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function JobsManagement() {
  return (
    <div className="flex flex-col min-h-screen">
      <JobsHeader />
      <div className="flex-1 p-4 md:p-6 space-y-6">
        <Tabs defaultValue="calendar" className="w-full">
          <TabsList className="grid w-full max-w-md grid-cols-2">
            <TabsTrigger value="calendar">Calendar View</TabsTrigger>
            <TabsTrigger value="list">List View</TabsTrigger>
          </TabsList>
          <TabsContent value="calendar" className="mt-4">
            <JobsCalendar />
          </TabsContent>
          <TabsContent value="list" className="mt-4">
            <JobsList />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
