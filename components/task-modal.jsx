"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

// Sample users for assignment
const users = [
    { id: "user-1", name: "John Doe", avatar: "/placeholder.svg?height=40&width=40" },
    { id: "user-2", name: "Jane Smith", avatar: "/placeholder.svg?height=40&width=40" },
    { id: "user-3", name: "Alex Johnson", avatar: "/placeholder.svg?height=40&width=40" },
    { id: "user-4", name: "Sarah Williams", avatar: "/placeholder.svg?height=40&width=40" },
]

// Status options
const statusOptions = ["open", "in progress", "complete", "failed"]

export function TaskModal({ task, onClose, isCreate = false }) {
    const [currentTask, setCurrentTask] = useState(
        isCreate
            ? {
                id: `TASK-${Math.floor(100000 + Math.random() * 900000)}`, // 6-digit ID
                title: "",
                description: "",
                status: "open",
                priority: "medium",
                assignee: users[0],
                dueDate: new Date().toISOString().split('T')[0],
                dueTime: "12:00",
                creator: "John Doe",
                createdAt: new Date().toISOString(),
                comments: [],
                history: [
                    {
                        action: "Task Created",
                        user: "John Doe",
                        timestamp: new Date().toISOString()
                    }
                ]
            }
            : {
                ...task,
                dueTime: task.dueTime || "12:00",
                creator: task.creator || "John Doe",
                createdAt: task.createdAt || new Date().toISOString(),
                history: task.history || [
                    {
                        action: "Task Created",
                        user: "John Doe",
                        timestamp: task.createdAt || new Date().toISOString()
                    }
                ]
            }
    )
    const [newComment, setNewComment] = useState("")

    const handleStatusChange = (newStatus) => {
        setCurrentTask({
            ...currentTask,
            status: newStatus,
        })
    }

    const handleAssigneeChange = (userId) => {
        const newAssignee = users.find((user) => user.id === userId)
        setCurrentTask({
            ...currentTask,
            assignee: newAssignee,
        })
    }

    const addComment = () => {
        if (!newComment.trim()) return

        const comment = {
            id: `comment-${Date.now()}`,
            user: "Current User", // In a real app, this would be the logged-in user
            text: newComment,
            timestamp: new Date().toISOString(),
        }

        setCurrentTask({
            ...currentTask,
            comments: [...currentTask.comments, comment],
        })

        setNewComment("")
    }

    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleDateString("en-US", {
            year: "numeric",
            month: "short",
            day: "numeric",
        })
    }

    const isOverdue = (dueDate) => {
        return new Date(dueDate) < new Date() && currentTask.status !== "complete";
    }

    const handleCreateTask = () => {
        // In a real app, this would save to a database
        console.log("Creating task:", currentTask);
        onClose();
    }

    const handleSaveChanges = () => {
        // In a real app, this would update the database
        console.log("Saving changes:", currentTask);
        onClose();
    }

    return (
        <Dialog open={!!task} onOpenChange={() => onClose()}>
            <DialogContent className="sm:max-w-[700px] max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                    <div className="flex items-center justify-between">
                        <DialogTitle className="text-xl">
                            {isCreate ? "Create New Task" : currentTask.title}
                        </DialogTitle>
                        <Badge
                            variant={
                                currentTask.priority === "high"
                                    ? "destructive"
                                    : currentTask.priority === "medium"
                                        ? "default"
                                        : "outline"
                            }
                        >
                            {currentTask.priority.charAt(0).toUpperCase() + currentTask.priority.slice(1)} Priority
                        </Badge>
                    </div>
                </DialogHeader>

                <Tabs defaultValue="details">
                    <TabsList className="grid w-full grid-cols-3">
                        <TabsTrigger value="details">Details</TabsTrigger>
                        <TabsTrigger value="comments">Comments ({currentTask.comments.length})</TabsTrigger>
                        <TabsTrigger value="history">History</TabsTrigger>
                    </TabsList>

                    <TabsContent value="details" className="space-y-4 pt-4">
                        <div className="space-y-4 pt-4">
                            <div className="flex justify-between items-center">
                                <div className="flex items-center">
                                    <Badge variant="outline" className="mr-2">
                                        {currentTask.id}
                                    </Badge>
                                    {isOverdue(currentTask.dueDate) && currentTask.status !== "complete" && (
                                        <Badge variant="destructive">Overdue</Badge>
                                    )}
                                </div>
                                <div className="text-sm text-muted-foreground">
                                    Created by {currentTask.creator} on {formatDate(currentTask.createdAt)}
                                </div>
                            </div>

                            <div>
                                <h3 className="text-sm font-medium mb-2">Description</h3>
                                <p className="text-sm text-muted-foreground">{currentTask.description}</p>
                            </div>
                        </div>
                        {isCreate && (
                            <div className="space-y-4 pt-4">
                                <div className="grid gap-2">
                                    <Label htmlFor="title">Title</Label>
                                    <Input
                                        id="title"
                                        value={currentTask.title}
                                        onChange={(e) => setCurrentTask({ ...currentTask, title: e.target.value })}
                                        placeholder="Task title"
                                    />
                                </div>
                                <div className="grid gap-2">
                                    <Label htmlFor="description">Description</Label>
                                    <Textarea
                                        id="description"
                                        value={currentTask.description}
                                        onChange={(e) => setCurrentTask({ ...currentTask, description: e.target.value })}
                                        placeholder="Task description"
                                        rows={3}
                                    />
                                </div>
                            </div>
                        )}

                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <h3 className="text-sm font-medium mb-2">Status</h3>
                                <Select value={currentTask.status || statusOptions[0]} onValueChange={handleStatusChange}>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select status" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {statusOptions.map((status) => (
                                            <SelectItem key={status} value={status}>
                                                <div className="flex items-center">
                                                    <div
                                                        className={`w-2 h-2 rounded-full mr-2 ${status === "open"
                                                                ? "bg-blue-500"
                                                                : status === "in progress"
                                                                    ? "bg-amber-500"
                                                                    : status === "complete"
                                                                        ? "bg-green-500"
                                                                        : "bg-red-500"
                                                            }`}
                                                    ></div>
                                                    <span className="capitalize">{status}</span>
                                                </div>
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>

                            <div>
                                <h3 className="text-sm font-medium mb-2">Assignee</h3>
                                <Select value={currentTask.assignee.id} onValueChange={handleAssigneeChange}>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Assign to" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {users.map((user) => (
                                            <SelectItem key={user.id} value={user.id}>
                                                <div className="flex items-center">
                                                    <Avatar className="h-6 w-6 mr-2">
                                                        <AvatarImage src={user.avatar || "/placeholder.svg"} />
                                                        <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                                                    </Avatar>
                                                    {user.name}
                                                </div>
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <h3 className="text-sm font-medium mb-2">Due Date</h3>
                                <div className="flex gap-2">
                                    <Input
                                        type="date"
                                        value={currentTask.dueDate.split('T')[0]}
                                        onChange={(e) => setCurrentTask({ ...currentTask, dueDate: e.target.value })}
                                        className="w-full"
                                    />
                                    <Input
                                        type="time"
                                        value={currentTask.dueTime}
                                        onChange={(e) => setCurrentTask({ ...currentTask, dueTime: e.target.value })}
                                        className="w-full"
                                    />
                                </div>
                            </div>
                        </div>
                    </TabsContent>

                    <TabsContent value="comments" className="space-y-4 pt-4">
                        <div className="space-y-4 max-h-[300px] overflow-y-auto">
                            {currentTask.comments.length === 0 ? (
                                <p className="text-center text-muted-foreground py-4">No comments yet</p>
                            ) : (
                                currentTask.comments.map((comment) => (
                                    <div key={comment.id} className="flex gap-3 p-3 rounded-md bg-muted/50">
                                        <Avatar className="h-8 w-8">
                                            <AvatarFallback>{comment.user.charAt(0)}</AvatarFallback>
                                        </Avatar>
                                        <div className="flex-1">
                                            <div className="flex justify-between items-center mb-1">
                                                <span className="font-medium text-sm">{comment.user}</span>
                                                <span className="text-xs text-muted-foreground">
                                                    {new Date(comment.timestamp).toLocaleString()}
                                                </span>
                                            </div>
                                            <p className="text-sm">{comment.text}</p>
                                        </div>
                                    </div>
                                ))
                            )}
                        </div>

                        <div className="flex gap-2">
                            <Textarea
                                placeholder="Add a comment..."
                                value={newComment}
                                onChange={(e) => setNewComment(e.target.value)}
                                className="min-h-[80px]"
                            />
                        </div>
                    </TabsContent>

                    <TabsContent value="history" className="space-y-4 pt-4">
                        <div className="space-y-4 max-h-[300px] overflow-y-auto">
                            {currentTask.history && currentTask.history.length > 0 ? (
                                <div className="space-y-3">
                                    {currentTask.history.map((item, index) => (
                                        <div key={index} className="flex gap-3 p-3 rounded-md bg-muted/50">
                                            <div className="flex-1">
                                                <div className="flex justify-between items-center mb-1">
                                                    <span className="font-medium text-sm">{item.action}</span>
                                                    <span className="text-xs text-muted-foreground">
                                                        {new Date(item.timestamp).toLocaleString()}
                                                    </span>
                                                </div>
                                                <p className="text-xs text-muted-foreground">by {item.user}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <p className="text-center text-muted-foreground py-4">No history available</p>
                            )}
                        </div>
                    </TabsContent>
                </Tabs>

                <DialogFooter className="flex justify-between items-center">
                    <div className="flex items-center">
                        <Avatar className="h-8 w-8 mr-2">
                            <AvatarImage src={currentTask.assignee.avatar || "/placeholder.svg"} />
                            <AvatarFallback>{currentTask.assignee.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <span className="text-sm">{currentTask.assignee.name}</span>
                    </div>

                    <div className="flex gap-2">
                        {newComment && <Button onClick={addComment}>Add Comment</Button>}
                        <Button variant="outline" onClick={onClose}>
                            Cancel
                        </Button>
                        <Button onClick={isCreate ? handleCreateTask : handleSaveChanges}>
                            {isCreate ? "Create Task" : "Save Changes"}
                        </Button>
                    </div>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
