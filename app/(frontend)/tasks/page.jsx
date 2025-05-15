"use client"

import { useState } from "react"
import { DashboardLayout } from "@/components/dashboard-layout"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Calendar, MoreHorizontal, ChevronDown, Search } from "lucide-react"
import { TaskModal } from "@/components/task-modal"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

// Sample data - in a real app, this would come from an API
const myTasks = [
  {
    id: "task-1",
    title: "Create login page",
    description: "Design and implement the login page with form validation",
    status: "open",
    priority: "high",
    assignee: { id: "user-1", name: "John Doe", avatar: "/placeholder.svg?height=40&width=40" },
    dueDate: "2023-12-15",
    comments: [
      { id: "comment-1", user: "Jane Smith", text: "Should we use OAuth?", timestamp: "2023-12-01T10:30:00" },
      {
        id: "comment-2",
        user: "John Doe",
        text: "Yes, let's implement Google and GitHub login",
        timestamp: "2023-12-01T11:45:00",
      },
    ],
  },
  {
    id: "task-3",
    title: "Implement authentication",
    description: "Set up JWT authentication and user sessions",
    status: "in progress",
    priority: "high",
    assignee: { id: "user-1", name: "John Doe", avatar: "/placeholder.svg?height=40&width=40" },
    dueDate: "2023-12-12",
    comments: [
      {
        id: "comment-3",
        user: "Alex Johnson",
        text: "Don't forget to add refresh tokens",
        timestamp: "2023-12-02T09:15:00",
      },
    ],
  },
  {
    id: "task-6",
    title: "Create dashboard layout",
    description: "Implement responsive dashboard layout with sidebar",
    status: "open",
    priority: "medium",
    assignee: { id: "user-1", name: "John Doe", avatar: "/placeholder.svg?height=40&width=40" },
    dueDate: "2023-12-18",
    comments: [],
  },
  {
    id: "task-7",
    title: "Implement task filtering",
    description: "Add ability to filter tasks by status, priority, and assignee",
    status: "open",
    priority: "low",
    assignee: { id: "user-1", name: "John Doe", avatar: "/placeholder.svg?height=40&width=40" },
    dueDate: "2023-12-20",
    comments: [],
  },
  {
    id: "task-8",
    title: "Add task search functionality",
    description: "Implement search functionality for tasks",
    status: "open",
    priority: "medium",
    assignee: { id: "user-1", name: "John Doe", avatar: "/placeholder.svg?height=40&width=40" },
    dueDate: "2023-12-22",
    comments: [],
  },
]

const getStatusBadge = (status) => {
  switch (status.toLowerCase()) {
    case "open":
      return (
        <Badge variant="secondary" className="bg-blue-100 text-blue-800 hover:bg-blue-100">
          Open
        </Badge>
      )
    case "in progress":
      return (
        <Badge variant="secondary" className="bg-amber-100 text-amber-800 hover:bg-amber-100">
          In Progress
        </Badge>
      )
    case "complete":
      return (
        <Badge variant="secondary" className="bg-green-100 text-green-800 hover:bg-green-100">
          Complete
        </Badge>
      )
    case "failed":
      return (
        <Badge variant="secondary" className="bg-red-100 text-red-800 hover:bg-red-100">
          Failed
        </Badge>
      )
    default:
      return <Badge variant="secondary">{status}</Badge>
  }
}

const getPriorityBadge = (priority) => {
  switch (priority.toLowerCase()) {
    case "high":
      return <Badge variant="destructive">High</Badge>
    case "medium":
      return <Badge variant="default">Medium</Badge>
    case "low":
      return <Badge variant="outline">Low</Badge>
    default:
      return null
  }
}

export default function TasksPage() {
  const [selectedTask, setSelectedTask] = useState(null)
  const [sortColumn, setSortColumn] = useState(null)
  const [sortDirection, setSortDirection] = useState("asc")
  const [searchQuery, setSearchQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")

  const handleSort = (column) => {
    if (sortColumn === column) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc")
    } else {
      setSortColumn(column)
      setSortDirection("asc")
    }
  }

  // Filter tasks based on search query and status
  const filteredTasks = myTasks.filter(
    (task) =>
      (task.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (task.id && task.id.toLowerCase().includes(searchQuery.toLowerCase()))) &&
      (statusFilter === "all" || task.status === statusFilter),
  )

  const sortedTasks = [...filteredTasks].sort((a, b) => {
    if (!sortColumn) return 0

    let valueA, valueB

    if (sortColumn === "title") {
      valueA = a.title.toLowerCase()
      valueB = b.title.toLowerCase()
    } else if (sortColumn === "status") {
      valueA = a.status.toLowerCase()
      valueB = b.status.toLowerCase()
    } else if (sortColumn === "priority") {
      const priorityOrder = { high: 3, medium: 2, low: 1 }
      valueA = priorityOrder[a.priority.toLowerCase()] || 0
      valueB = priorityOrder[b.priority.toLowerCase()] || 0
    } else if (sortColumn === "dueDate") {
      valueA = new Date(a.dueDate).getTime()
      valueB = new Date(b.dueDate).getTime()
    }

    if (valueA < valueB) return sortDirection === "asc" ? -1 : 1
    if (valueA > valueB) return sortDirection === "asc" ? 1 : -1
    return 0
  })

  return (
    <DashboardLayout>
      <div className="p-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">My Tasks</h1>
          <div className="relative w-full max-w-sm">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search tasks by title or ID..."
              className="pl-8"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>

        <div className="flex justify-end mb-4">
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Filter by status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Statuses</SelectItem>
              <SelectItem value="open">Open</SelectItem>
              <SelectItem value="in progress">In Progress</SelectItem>
              <SelectItem value="complete">Complete</SelectItem>
              <SelectItem value="failed">Failed</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="rounded-md border shadow-sm">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[300px]">
                  <Button variant="ghost" onClick={() => handleSort("title")} className="flex items-center">
                    Task
                    {sortColumn === "title" && (
                      <ChevronDown className={`ml-1 h-4 w-4 ${sortDirection === "desc" ? "rotate-180" : ""}`} />
                    )}
                  </Button>
                </TableHead>
                <TableHead>
                  <Button variant="ghost" onClick={() => handleSort("status")} className="flex items-center">
                    Status
                    {sortColumn === "status" && (
                      <ChevronDown className={`ml-1 h-4 w-4 ${sortDirection === "desc" ? "rotate-180" : ""}`} />
                    )}
                  </Button>
                </TableHead>
                <TableHead>
                  <Button variant="ghost" onClick={() => handleSort("priority")} className="flex items-center">
                    Priority
                    {sortColumn === "priority" && (
                      <ChevronDown className={`ml-1 h-4 w-4 ${sortDirection === "desc" ? "rotate-180" : ""}`} />
                    )}
                  </Button>
                </TableHead>
                <TableHead>
                  <Button variant="ghost" onClick={() => handleSort("dueDate")} className="flex items-center">
                    Due Date
                    {sortColumn === "dueDate" && (
                      <ChevronDown className={`ml-1 h-4 w-4 ${sortDirection === "desc" ? "rotate-180" : ""}`} />
                    )}
                  </Button>
                </TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {sortedTasks.map((task) => (
                <TableRow
                  key={task.id}
                  className="cursor-pointer hover:bg-muted/50"
                  onClick={() => setSelectedTask(task)}
                >
                  <TableCell className="font-medium">{task.title}</TableCell>
                  <TableCell>{getStatusBadge(task.status)}</TableCell>
                  <TableCell>{getPriorityBadge(task.priority)}</TableCell>
                  <TableCell>
                    <div className="flex items-center">
                      <Calendar className="mr-2 h-4 w-4 text-muted-foreground" />
                      {new Date(task.dueDate).toLocaleDateString()}
                    </div>
                  </TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild onClick={(e) => e.stopPropagation()}>
                        <Button variant="ghost" size="icon">
                          <MoreHorizontal className="h-4 w-4" />
                          <span className="sr-only">Open menu</span>
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuGroup>
                          <DropdownMenuItem>Edit Task</DropdownMenuItem>
                          <DropdownMenuItem>Change Status</DropdownMenuItem>
                          <DropdownMenuItem>Reassign</DropdownMenuItem>
                        </DropdownMenuGroup>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem className="text-red-600">Delete Task</DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        {selectedTask && <TaskModal task={selectedTask} onClose={() => setSelectedTask(null)} />}
      </div>
    </DashboardLayout>
  )
}
