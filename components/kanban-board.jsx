"use client"

import { useState } from "react"
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd"
import { PlusCircle, Search } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Input } from "@/components/ui/input"

// Sample data - in a real app, this would come from an API
const initialTasks = {
  open: [
    {
      id: "task-1",
      title: "Create login page",
      description: "Design and implement the login page with form validation",
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
      id: "task-2",
      title: "Setup database schema",
      description: "Create tables for users, tasks, and comments",
      priority: "medium",
      assignee: { id: "user-2", name: "Jane Smith", avatar: "/placeholder.svg?height=40&width=40" },
      dueDate: "2023-12-10",
      comments: [],
    },
  ],
  "in progress": [
    {
      id: "task-3",
      title: "Implement authentication",
      description: "Set up JWT authentication and user sessions",
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
  ],
  complete: [
    {
      id: "task-4",
      title: "Project setup",
      description: "Initialize Next.js project and install dependencies",
      priority: "low",
      assignee: { id: "user-3", name: "Alex Johnson", avatar: "/placeholder.svg?height=40&width=40" },
      dueDate: "2023-12-01",
      comments: [],
    },
  ],
  failed: [
    {
      id: "task-5",
      title: "Implement real-time updates",
      description: "Add WebSocket for real-time task updates",
      priority: "medium",
      assignee: { id: "user-2", name: "Jane Smith", avatar: "/placeholder.svg?height=40&width=40" },
      dueDate: "2023-12-05",
      comments: [
        {
          id: "comment-4",
          user: "John Doe",
          text: "We need to reconsider this approach",
          timestamp: "2023-12-03T14:20:00",
        },
      ],
    },
  ],
}

const getStatusColor = (status) => {
  switch (status.toLowerCase()) {
    case "open":
      return "bg-blue-500"
    case "in progress":
      return "bg-amber-500"
    case "complete":
      return "bg-green-500"
    case "failed":
      return "bg-red-500"
    default:
      return "bg-gray-500"
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

export function KanbanBoard({ onTaskClick }) {
  const [tasks, setTasks] = useState(initialTasks)
  const [searchQuery, setSearchQuery] = useState("")

  const onDragEnd = (result) => {
    const { destination, source, draggableId } = result

    // If there's no destination or the item is dropped in the same place
    if (!destination || (destination.droppableId === source.droppableId && destination.index === source.index)) {
      return
    }

    // Find the task that was dragged
    const sourceColumn = tasks[source.droppableId]
    const taskToMove = sourceColumn.find((task) => task.id === draggableId)

    // Create new state
    const newTasks = { ...tasks }

    // Remove from source column
    newTasks[source.droppableId] = sourceColumn.filter((task) => task.id !== draggableId)

    // Add to destination column - always at the bottom
    newTasks[destination.droppableId] = [...newTasks[destination.droppableId], taskToMove]

    setTasks(newTasks)
  }

  // Filter tasks based on search query
  const filteredTasks = {}
  Object.keys(tasks).forEach((status) => {
    filteredTasks[status] = tasks[status].filter(
      (task) =>
        task.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (task.id && task.id.toLowerCase().includes(searchQuery.toLowerCase())),
    )
  })

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className="mb-6">
        <div className="relative">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search tasks by title or ID..."
            className="pl-8 w-full md:w-[300px]"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {Object.keys(filteredTasks).map((status) => (
          <div key={status} className="flex flex-col bg-card rounded-lg shadow">
            <div className="flex items-center justify-between p-4 border-b">
              <div className="flex items-center">
                <div className={`w-3 h-3 rounded-full mr-2 ${getStatusColor(status)}`}></div>
                <h3 className="font-medium capitalize">{status}</h3>
                <Badge variant="outline" className="ml-2">
                  {filteredTasks[status].length}
                </Badge>
              </div>
              <Button variant="ghost" size="icon">
                <PlusCircle className="h-5 w-5" />
              </Button>
            </div>

            <Droppable droppableId={status}>
              {(provided) => (
                <div
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                  className="flex-1 p-2 min-h-[200px] overflow-y-auto"
                >
                  {filteredTasks[status].map((task, index) => (
                    <Draggable key={task.id} draggableId={task.id} index={index}>
                      {(provided) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          className="mb-2 p-3 bg-background rounded-md shadow-sm border cursor-pointer hover:border-primary transition-all hover:translate-y-1 hover:shadow-md"
                          onClick={() => onTaskClick(task)}
                        >
                          <div className="flex justify-between items-start mb-2">
                            <h4 className="font-medium">{task.title}</h4>
                            {getPriorityBadge(task.priority)}
                          </div>
                          <p className="text-sm text-muted-foreground line-clamp-2 mb-3">{task.description}</p>
                          <div className="flex justify-between items-center">
                            <div className="flex items-center">
                              <Avatar className="h-6 w-6 mr-2">
                                <AvatarImage
                                  src={task.assignee.avatar || "/placeholder.svg"}
                                  alt={task.assignee.name}
                                />
                                <AvatarFallback>{task.assignee.name.charAt(0)}</AvatarFallback>
                              </Avatar>
                              <span className="text-xs text-muted-foreground">{task.assignee.name}</span>
                            </div>
                            <div className="text-xs text-muted-foreground">
                              {new Date(task.dueDate).toLocaleDateString()}
                            </div>
                          </div>
                          {task.comments.length > 0 && (
                            <div className="mt-2 text-xs text-muted-foreground">
                              {task.comments.length} comment{task.comments.length !== 1 ? "s" : ""}
                            </div>
                          )}
                        </div>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          </div>
        ))}
      </div>
    </DragDropContext>
  )
}
