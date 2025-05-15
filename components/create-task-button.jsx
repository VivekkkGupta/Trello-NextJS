"use client"

import { useState } from "react"
import { PlusCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { TaskModal } from "@/components/task-modal"

export function CreateTaskButton() {
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false)

  return (
    <>
      <Button onClick={() => setIsCreateModalOpen(true)}>
        <PlusCircle className="mr-2 h-4 w-4" />
        Create Task
      </Button>

      {isCreateModalOpen && <TaskModal task={null} isCreate={true} onClose={() => setIsCreateModalOpen(false)} />}
    </>
  )
}
