import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ArrowUpRight, Download } from "lucide-react"

export function AnalyticsTables() {
  return (
    <div className="grid gap-6 lg:grid-cols-2">
      <Card>
        <CardHeader>
          <CardTitle>Top Performing Staff</CardTitle>
          <CardDescription>Staff with highest efficiency and job completion rates</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Department</TableHead>
                <TableHead>Jobs Completed</TableHead>
                <TableHead>Efficiency</TableHead>
                <TableHead>Rating</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell className="font-medium">John Doe</TableCell>
                <TableCell>Construction</TableCell>
                <TableCell>42</TableCell>
                <TableCell>
                  <Badge variant="success">98%</Badge>
                </TableCell>
                <TableCell>
                  <div className="flex items-center">
                    <span className="mr-1 text-sm font-medium">4.9</span>
                    <div className="flex">
                      {Array(5)
                        .fill(null)
                        .map((_, i) => (
                          <svg
                            key={i}
                            className={`h-4 w-4 ${i < 5 ? "text-yellow-400" : "text-gray-300"}`}
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                          </svg>
                        ))}
                    </div>
                  </div>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">Sarah Johnson</TableCell>
                <TableCell>Maintenance</TableCell>
                <TableCell>38</TableCell>
                <TableCell>
                  <Badge variant="success">95%</Badge>
                </TableCell>
                <TableCell>
                  <div className="flex items-center">
                    <span className="mr-1 text-sm font-medium">4.8</span>
                    <div className="flex">
                      {Array(5)
                        .fill(null)
                        .map((_, i) => (
                          <svg
                            key={i}
                            className={`h-4 w-4 ${i < 5 ? "text-yellow-400" : "text-gray-300"}`}
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                          </svg>
                        ))}
                    </div>
                  </div>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">Mike Wilson</TableCell>
                <TableCell>Logistics</TableCell>
                <TableCell>35</TableCell>
                <TableCell>
                  <Badge variant="success">93%</Badge>
                </TableCell>
                <TableCell>
                  <div className="flex items-center">
                    <span className="mr-1 text-sm font-medium">4.7</span>
                    <div className="flex">
                      {Array(5)
                        .fill(null)
                        .map((_, i) => (
                          <svg
                            key={i}
                            className={`h-4 w-4 ${i < 5 ? "text-yellow-400" : "text-gray-300"}`}
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                          </svg>
                        ))}
                    </div>
                  </div>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">Emily Chen</TableCell>
                <TableCell>Operations</TableCell>
                <TableCell>32</TableCell>
                <TableCell>
                  <Badge variant="success">91%</Badge>
                </TableCell>
                <TableCell>
                  <div className="flex items-center">
                    <span className="mr-1 text-sm font-medium">4.6</span>
                    <div className="flex">
                      {Array(5)
                        .fill(null)
                        .map((_, i) => (
                          <svg
                            key={i}
                            className={`h-4 w-4 ${i < 5 ? "text-yellow-400" : "text-gray-300"}`}
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                          </svg>
                        ))}
                    </div>
                  </div>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">Robert Taylor</TableCell>
                <TableCell>Agriculture</TableCell>
                <TableCell>30</TableCell>
                <TableCell>
                  <Badge variant="success">90%</Badge>
                </TableCell>
                <TableCell>
                  <div className="flex items-center">
                    <span className="mr-1 text-sm font-medium">4.5</span>
                    <div className="flex">
                      {Array(5)
                        .fill(null)
                        .map((_, i) => (
                          <svg
                            key={i}
                            className={`h-4 w-4 ${i < 5 ? "text-yellow-400" : "text-gray-300"}`}
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                          </svg>
                        ))}
                    </div>
                  </div>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
          <div className="mt-4 flex justify-end">
            <Button variant="outline" size="sm" className="gap-1">
              <ArrowUpRight className="h-4 w-4" />
              View All
            </Button>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Project ROI Analysis</CardTitle>
          <CardDescription>Return on investment for completed projects</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Project</TableHead>
                <TableHead>Department</TableHead>
                <TableHead>Investment</TableHead>
                <TableHead>Return</TableHead>
                <TableHead>ROI</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell className="font-medium">Office Complex Renovation</TableCell>
                <TableCell>Construction</TableCell>
                <TableCell>$120,000</TableCell>
                <TableCell>$168,000</TableCell>
                <TableCell>
                  <Badge variant="success">40%</Badge>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">Fleet Maintenance Program</TableCell>
                <TableCell>Logistics</TableCell>
                <TableCell>$85,000</TableCell>
                <TableCell>$110,500</TableCell>
                <TableCell>
                  <Badge variant="success">30%</Badge>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">Solar Panel Installation</TableCell>
                <TableCell>Maintenance</TableCell>
                <TableCell>$200,000</TableCell>
                <TableCell>$240,000</TableCell>
                <TableCell>
                  <Badge variant="success">20%</Badge>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">Irrigation System Upgrade</TableCell>
                <TableCell>Agriculture</TableCell>
                <TableCell>$75,000</TableCell>
                <TableCell>$86,250</TableCell>
                <TableCell>
                  <Badge variant="success">15%</Badge>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">Warehouse Automation</TableCell>
                <TableCell>Operations</TableCell>
                <TableCell>$350,000</TableCell>
                <TableCell>$385,000</TableCell>
                <TableCell>
                  <Badge variant="success">10%</Badge>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
          <div className="mt-4 flex justify-end">
            <Button variant="outline" size="sm" className="gap-1">
              <Download className="h-4 w-4" />
              Export Report
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
