"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts"

const jobData = [
  {
    name: "Jan",
    completed: 45,
    pending: 12,
    cancelled: 3,
  },
  {
    name: "Feb",
    completed: 52,
    pending: 15,
    cancelled: 5,
  },
  {
    name: "Mar",
    completed: 61,
    pending: 18,
    cancelled: 4,
  },
  {
    name: "Apr",
    completed: 67,
    pending: 20,
    cancelled: 6,
  },
  {
    name: "May",
    completed: 55,
    pending: 16,
    cancelled: 2,
  },
  {
    name: "Jun",
    completed: 78,
    pending: 22,
    cancelled: 7,
  },
  {
    name: "Jul",
    completed: 85,
    pending: 19,
    cancelled: 5,
  },
]

const productivityData = [
  {
    name: "Mon",
    construction: 85,
    maintenance: 78,
    logistics: 92,
  },
  {
    name: "Tue",
    construction: 88,
    maintenance: 82,
    logistics: 91,
  },
  {
    name: "Wed",
    construction: 92,
    maintenance: 85,
    logistics: 89,
  },
  {
    name: "Thu",
    construction: 90,
    maintenance: 83,
    logistics: 94,
  },
  {
    name: "Fri",
    construction: 86,
    maintenance: 80,
    logistics: 90,
  },
  {
    name: "Sat",
    construction: 75,
    maintenance: 72,
    logistics: 85,
  },
  {
    name: "Sun",
    construction: 65,
    maintenance: 68,
    logistics: 78,
  },
]

export function DashboardCharts() {
  const [chartType, setChartType] = useState("jobs")

  return (
    <Card className="col-span-2">
      <Tabs defaultValue="jobs" value={chartType} onValueChange={setChartType}>
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle>Performance Analytics</CardTitle>
          <div className="w-[400px]">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="jobs">Jobs</TabsTrigger>
              <TabsTrigger value="productivity">Productivity</TabsTrigger>
              <TabsTrigger value="costs">Costs</TabsTrigger>
            </TabsList>
          </div>
        </CardHeader>
        <CardContent>
          <TabsContent value="jobs">
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={jobData}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip
                    content={({ active, payload, label }) => {
                      if (active && payload && payload.length) {
                        return (
                          <div className="rounded-lg border bg-background p-2 shadow-sm">
                            <div className="grid grid-cols-2 gap-2">
                              <div className="flex flex-col">
                                <span className="text-[0.70rem] uppercase text-muted-foreground">{label}</span>
                                <span className="font-bold text-muted-foreground">{payload[0].value} Jobs</span>
                              </div>
                            </div>
                          </div>
                        )
                      }
                      return null
                    }}
                  />
                  <Legend />
                  <Bar dataKey="completed" name="Completed" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="pending" name="Pending" fill="hsl(var(--warning))" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="cancelled" name="Cancelled" fill="hsl(var(--destructive))" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </TabsContent>
          <TabsContent value="productivity">
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={productivityData}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip
                    content={({ active, payload, label }) => {
                      if (active && payload && payload.length) {
                        return (
                          <div className="rounded-lg border bg-background p-2 shadow-sm">
                            <div className="grid grid-cols-2 gap-2">
                              <div className="flex flex-col">
                                <span className="text-[0.70rem] uppercase text-muted-foreground">{label}</span>
                                <span className="font-bold text-muted-foreground">{payload[0].value}% Efficiency</span>
                              </div>
                            </div>
                          </div>
                        )
                      }
                      return null
                    }}
                  />
                  <Legend />
                  <Line
                    type="monotone"
                    dataKey="construction"
                    name="Construction"
                    stroke="hsl(var(--primary))"
                    strokeWidth={2}
                    dot={{ r: 4 }}
                    activeDot={{ r: 6 }}
                  />
                  <Line
                    type="monotone"
                    dataKey="maintenance"
                    name="Maintenance"
                    stroke="hsl(var(--info))"
                    strokeWidth={2}
                    dot={{ r: 4 }}
                    activeDot={{ r: 6 }}
                  />
                  <Line
                    type="monotone"
                    dataKey="logistics"
                    name="Logistics"
                    stroke="hsl(var(--success))"
                    strokeWidth={2}
                    dot={{ r: 4 }}
                    activeDot={{ r: 6 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </TabsContent>
          <TabsContent value="costs">
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart
                  data={[
                    { name: "Jan", labor: 12000, equipment: 5000, materials: 8000 },
                    { name: "Feb", labor: 14000, equipment: 5500, materials: 9000 },
                    { name: "Mar", labor: 13500, equipment: 6000, materials: 8500 },
                    { name: "Apr", labor: 15000, equipment: 5800, materials: 9200 },
                    { name: "May", labor: 16000, equipment: 6200, materials: 9500 },
                    { name: "Jun", labor: 17000, equipment: 6500, materials: 10000 },
                    { name: "Jul", labor: 16500, equipment: 6300, materials: 9800 },
                  ]}
                >
                  <CartesianGrid strokeDasharray="3 3" vertical={false} />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip
                    content={({ active, payload, label }) => {
                      if (active && payload && payload.length) {
                        return (
                          <div className="rounded-lg border bg-background p-2 shadow-sm">
                            <div className="grid grid-cols-2 gap-2">
                              <div className="flex flex-col">
                                <span className="text-[0.70rem] uppercase text-muted-foreground">{label}</span>
                                <span className="font-bold text-muted-foreground">${payload[0].value} Total</span>
                              </div>
                            </div>
                          </div>
                        )
                      }
                      return null
                    }}
                  />
                  <Legend />
                  <Area
                    type="monotone"
                    dataKey="labor"
                    name="Labor"
                    stackId="1"
                    stroke="hsl(var(--primary))"
                    fill="hsl(var(--primary))"
                    fillOpacity={0.6}
                  />
                  <Area
                    type="monotone"
                    dataKey="equipment"
                    name="Equipment"
                    stackId="1"
                    stroke="hsl(var(--warning))"
                    fill="hsl(var(--warning))"
                    fillOpacity={0.6}
                  />
                  <Area
                    type="monotone"
                    dataKey="materials"
                    name="Materials"
                    stackId="1"
                    stroke="hsl(var(--secondary))"
                    fill="hsl(var(--secondary))"
                    fillOpacity={0.6}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </TabsContent>
        </CardContent>
      </Tabs>
    </Card>
  )
}
