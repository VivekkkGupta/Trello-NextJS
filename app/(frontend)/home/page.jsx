"use client"

import { DashboardLayout } from "@/components/dashboard-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"


// Sample data for charts
const taskCompletionData = [
  { name: "Mon", completed: 5, total: 8 },
  { name: "Tue", completed: 7, total: 10 },
  { name: "Wed", completed: 4, total: 6 },
  { name: "Thu", completed: 8, total: 12 },
  { name: "Fri", completed: 9, total: 14 },
  { name: "Sat", completed: 3, total: 5 },
  { name: "Sun", completed: 2, total: 3 },
]

const taskStatusData = [
  { name: "Open", value: 12, color: "#3b82f6" },
  { name: "In Progress", value: 8, color: "#f59e0b" },
  { name: "Complete", value: 15, color: "#10b981" },
  { name: "Failed", value: 4, color: "#ef4444" },
]

const teamPerformanceData = [
  { name: "John", tasks: 12, completion: 85 },
  { name: "Jane", tasks: 18, completion: 92 },
  { name: "Alex", tasks: 8, completion: 78 },
  { name: "Sarah", tasks: 15, completion: 90 },
  { name: "Mike", tasks: 10, completion: 65 },
]

export default function HomePage() {
  return (
    <DashboardLayout>
      <div className="p-6 space-y-6">
        <h1 className="text-2xl font-bold">Dashboard Overview</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Total Tasks</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">39</div>
              <p className="text-xs text-muted-foreground">+5 from last week</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Completed</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">15</div>
              <p className="text-xs text-muted-foreground">38% completion rate</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">In Progress</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">8</div>
              <p className="text-xs text-muted-foreground">20% of all tasks</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Overdue</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-red-500">3</div>
              <p className="text-xs text-muted-foreground">Action required</p>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Task Completion</CardTitle>
              <CardDescription>Daily task completion rate</CardDescription>
            </CardHeader>
            <CardContent className="h-[350px]">
              
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Task Distribution</CardTitle>
              <CardDescription>Tasks by status</CardDescription>
            </CardHeader>
            <CardContent className="h-[350px]">
              
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Team Performance</CardTitle>
            <CardDescription>Tasks completed by team members</CardDescription>
          </CardHeader>
          <CardContent className="h-[350px]">
            
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  )
}
