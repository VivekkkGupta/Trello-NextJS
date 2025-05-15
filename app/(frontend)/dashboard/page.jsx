"use client"

import { useState } from "react"
import { DashboardLayout } from "@/components/dashboard-layout"
import { KanbanBoard } from "@/components/kanban-board"
import { TaskModal } from "@/components/task-modal"
import { PlusCircle } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function DashboardPage() {
  const [selectedTask, setSelectedTask] = useState(null)
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false)

  return (
    <DashboardLayout>
      <div className="p-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Dashboard</h1>
          <Button onClick={() => setIsCreateModalOpen(true)}>
            <PlusCircle className="mr-2 h-4 w-4" />
            Create Task
          </Button>
        </div>
        <KanbanBoard onTaskClick={(task) => setSelectedTask(task)} />

        {selectedTask && <TaskModal task={selectedTask} onClose={() => setSelectedTask(null)} />}
        {isCreateModalOpen && <TaskModal task={null} isCreate={true} onClose={() => setIsCreateModalOpen(false)} />}
      </div>
    </DashboardLayout>
  )
}
