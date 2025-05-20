"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Legend,
  Line,
  LineChart,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts"

export function AnalyticsCharts() {
  return (
    <div className="grid gap-6 lg:grid-cols-2">
      <Card>
        <Tabs defaultValue="efficiency">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <div>
              <CardTitle>Performance Metrics</CardTitle>
              <CardDescription>Efficiency and productivity trends</CardDescription>
            </div>
            <TabsList>
              <TabsTrigger value="efficiency">Efficiency</TabsTrigger>
              <TabsTrigger value="productivity">Productivity</TabsTrigger>
            </TabsList>
          </CardHeader>
          <CardContent>
            <TabsContent value="efficiency">
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart
                    data={[
                      { month: "Jan", construction: 85, maintenance: 78, logistics: 92 },
                      { month: "Feb", construction: 88, maintenance: 82, logistics: 91 },
                      { month: "Mar", construction: 92, maintenance: 85, logistics: 89 },
                      { month: "Apr", construction: 90, maintenance: 83, logistics: 94 },
                      { month: "May", construction: 86, maintenance: 80, logistics: 90 },
                      { month: "Jun", construction: 94, maintenance: 88, logistics: 93 },
                    ]}
                  >
                    <CartesianGrid strokeDasharray="3 3" vertical={false} />
                    <XAxis dataKey="month" />
                    <YAxis domain={[70, 100]} />
                    <Tooltip
                      content={({ active, payload, label }) => {
                        if (active && payload && payload.length) {
                          return (
                            <div className="rounded-lg border bg-background p-2 shadow-sm">
                              <div className="grid grid-cols-2 gap-2">
                                <div className="flex flex-col">
                                  <span className="text-[0.70rem] uppercase text-muted-foreground">{label}</span>
                                  <span className="font-bold text-muted-foreground">
                                    {payload[0].value}% Efficiency
                                  </span>
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
            <TabsContent value="productivity">
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={[
                      { month: "Jan", target: 100, actual: 92 },
                      { month: "Feb", target: 100, actual: 95 },
                      { month: "Mar", target: 100, actual: 98 },
                      { month: "Apr", target: 100, actual: 94 },
                      { month: "May", target: 100, actual: 96 },
                      { month: "Jun", target: 100, actual: 97 },
                    ]}
                  >
                    <CartesianGrid strokeDasharray="3 3" vertical={false} />
                    <XAxis dataKey="month" />
                    <YAxis domain={[0, 100]} />
                    <Tooltip
                      content={({ active, payload, label }) => {
                        if (active && payload && payload.length) {
                          return (
                            <div className="rounded-lg border bg-background p-2 shadow-sm">
                              <div className="grid grid-cols-2 gap-2">
                                <div className="flex flex-col">
                                  <span className="text-[0.70rem] uppercase text-muted-foreground">{label}</span>
                                  <span className="font-bold text-muted-foreground">
                                    {payload[1].value}% of {payload[0].value}% Target
                                  </span>
                                </div>
                              </div>
                            </div>
                          )
                        }
                        return null
                      }}
                    />
                    <Legend />
                    <Bar dataKey="target" name="Target" fill="hsl(var(--muted))" radius={[4, 4, 0, 0]} />
                    <Bar dataKey="actual" name="Actual" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </TabsContent>
          </CardContent>
        </Tabs>
      </Card>

      <Card>
        <Tabs defaultValue="costs">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <div>
              <CardTitle>Financial Analysis</CardTitle>
              <CardDescription>Cost breakdown and budget tracking</CardDescription>
            </div>
            <TabsList>
              <TabsTrigger value="costs">Costs</TabsTrigger>
              <TabsTrigger value="budget">Budget</TabsTrigger>
            </TabsList>
          </CardHeader>
          <CardContent>
            <TabsContent value="costs">
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart
                    data={[
                      { month: "Jan", labor: 12000, equipment: 5000, materials: 8000 },
                      { month: "Feb", labor: 14000, equipment: 5500, materials: 9000 },
                      { month: "Mar", labor: 13500, equipment: 6000, materials: 8500 },
                      { month: "Apr", labor: 15000, equipment: 5800, materials: 9200 },
                      { month: "May", labor: 16000, equipment: 6200, materials: 9500 },
                      { month: "Jun", labor: 17000, equipment: 6500, materials: 10000 },
                    ]}
                  >
                    <CartesianGrid strokeDasharray="3 3" vertical={false} />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip
                      content={({ active, payload, label }) => {
                        if (active && payload && payload.length) {
                          return (
                            <div className="rounded-lg border bg-background p-2 shadow-sm">
                              <div className="grid grid-cols-2 gap-2">
                                <div className="flex flex-col">
                                  <span className="text-[0.70rem] uppercase text-muted-foreground">{label}</span>
                                  <span className="font-bold text-muted-foreground">
                                    ${[0, 1, 2].reduce(
                                      (sum, idx) =>
                                        sum +
                                        (typeof payload?.[idx]?.value === "number"
                                          ? payload[idx].value as number
                                          : Number(payload?.[idx]?.value) || 0),
                                      0
                                    )} Total
                                  </span>
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
            <TabsContent value="budget">
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={[
                      { department: "Construction", budget: 50000, actual: 48000 },
                      { department: "Maintenance", budget: 35000, actual: 32000 },
                      { department: "Logistics", budget: 25000, actual: 27000 },
                      { department: "Agriculture", budget: 20000, actual: 18000 },
                      { department: "Operations", budget: 30000, actual: 29000 },
                    ]}
                    layout="vertical"
                  >
                    <CartesianGrid strokeDasharray="3 3" horizontal={false} />
                    <XAxis type="number" />
                    <YAxis dataKey="department" type="category" width={100} />
                    <Tooltip
                      content={({ active, payload, label }) => {
                        if (active && payload && payload.length) {
                          return (
                            <div className="rounded-lg border bg-background p-2 shadow-sm">
                              <div className="grid grid-cols-2 gap-2">
                                <div className="flex flex-col">
                                  <span className="text-[0.70rem] uppercase text-muted-foreground">{label}</span>
                                  <span className="font-bold text-muted-foreground">Budget: ${payload[0].value}</span>
                                  <span className="font-bold text-muted-foreground">Actual: ${payload[1].value}</span>
                                </div>
                              </div>
                            </div>
                          )
                        }
                        return null
                      }}
                    />
                    <Legend />
                    <Bar dataKey="budget" name="Budget" fill="hsl(var(--muted))" />
                    <Bar dataKey="actual" name="Actual" fill="hsl(var(--primary))" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </TabsContent>
          </CardContent>
        </Tabs>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Resource Utilization</CardTitle>
          <CardDescription>Staff and equipment utilization rates</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={[
                    { name: "Active", value: 65, color: "hsl(var(--success))" },
                    { name: "Idle", value: 15, color: "hsl(var(--warning))" },
                    { name: "Maintenance", value: 10, color: "hsl(var(--info))" },
                    { name: "Unavailable", value: 10, color: "hsl(var(--destructive))" },
                  ]}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                >
                  {[
                    { name: "Active", value: 65, color: "hsl(var(--success))" },
                    { name: "Idle", value: 15, color: "hsl(var(--warning))" },
                    { name: "Maintenance", value: 10, color: "hsl(var(--info))" },
                    { name: "Unavailable", value: 10, color: "hsl(var(--destructive))" },
                  ].map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip
                  content={({ active, payload }) => {
                    if (active && payload && payload.length) {
                      return (
                        <div className="rounded-lg border bg-background p-2 shadow-sm">
                          <div className="grid grid-cols-2 gap-2">
                            <div className="flex flex-col">
                              <span className="text-[0.70rem] uppercase text-muted-foreground">{payload[0].name}</span>
                              <span className="font-bold text-muted-foreground">{payload[0].value}%</span>
                            </div>
                          </div>
                        </div>
                      )
                    }
                    return null
                  }}
                />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Job Completion Analysis</CardTitle>
          <CardDescription>Completion rates and delay reasons</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={[
                  { reason: "Weather", count: 12 },
                  { reason: "Equipment Failure", count: 8 },
                  { reason: "Staff Shortage", count: 6 },
                  { reason: "Material Delay", count: 10 },
                  { reason: "Permit Issues", count: 4 },
                  { reason: "Client Changes", count: 7 },
                ]}
                layout="vertical"
                margin={{ left: 120 }}
              >
                <CartesianGrid strokeDasharray="3 3" horizontal={false} />
                <XAxis type="number" />
                <YAxis dataKey="reason" type="category" width={120} />
                <Tooltip
                  content={({ active, payload, label }) => {
                    if (active && payload && payload.length) {
                      return (
                        <div className="rounded-lg border bg-background p-2 shadow-sm">
                          <div className="grid grid-cols-2 gap-2">
                            <div className="flex flex-col">
                              <span className="text-[0.70rem] uppercase text-muted-foreground">{label}</span>
                              <span className="font-bold text-muted-foreground">{payload[0].value} Incidents</span>
                            </div>
                          </div>
                        </div>
                      )
                    }
                    return null
                  }}
                />
                <Bar dataKey="count" name="Incidents" fill="hsl(var(--primary))" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
