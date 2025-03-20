
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { CalendarDays, Clock, Edit } from "lucide-react";

// Mock task data
const mockTasks = [
  {
    id: 1,
    title: "Process VIP orders",
    description: "Handle all VIP customer orders with priority",
    assignedTo: { id: 1, name: "John Doe", image: "/placeholder.svg" },
    status: "In Progress",
    priority: "High",
    dueDate: "2023-10-15",
    estimatedTime: "3 hours"
  },
  {
    id: 2,
    title: "Restock detergent supplies",
    description: "Check inventory and restock all detergent supplies",
    assignedTo: { id: 2, name: "Jane Smith", image: "/placeholder.svg" },
    status: "Pending",
    priority: "Medium",
    dueDate: "2023-10-16",
    estimatedTime: "1 hour"
  },
  {
    id: 3,
    title: "Maintenance check on washing machines",
    description: "Perform routine maintenance on all washing machines",
    assignedTo: { id: 3, name: "Robert Johnson", image: "/placeholder.svg" },
    status: "Completed",
    priority: "High",
    dueDate: "2023-10-14",
    estimatedTime: "4 hours"
  },
  {
    id: 4,
    title: "Customer complaint resolution",
    description: "Follow up on recent customer complaints",
    assignedTo: { id: 6, name: "Emily Davis", image: "/placeholder.svg" },
    status: "In Progress",
    priority: "High",
    dueDate: "2023-10-15",
    estimatedTime: "2 hours"
  },
  {
    id: 5,
    title: "Prepare delivery schedule",
    description: "Plan tomorrow's delivery schedule and routes",
    assignedTo: { id: 5, name: "Michael Brown", image: "/placeholder.svg" },
    status: "Pending",
    priority: "Medium",
    dueDate: "2023-10-15",
    estimatedTime: "1.5 hours"
  }
];

const StaffTasks = () => {
  const [filter, setFilter] = useState("all");
  
  const getFilteredTasks = () => {
    if (filter === "all") return mockTasks;
    return mockTasks.filter(task => task.status.toLowerCase() === filter.toLowerCase());
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <CardTitle>Staff Tasks</CardTitle>
        <div className="flex space-x-2">
          <Select value={filter} onValueChange={setFilter}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Filter by status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Tasks</SelectItem>
              <SelectItem value="pending">Pending</SelectItem>
              <SelectItem value="in progress">In Progress</SelectItem>
              <SelectItem value="completed">Completed</SelectItem>
            </SelectContent>
          </Select>
          <Button size="sm">
            Assign New Task
          </Button>
        </div>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Task</TableHead>
              <TableHead>Assigned To</TableHead>
              <TableHead>Due Date</TableHead>
              <TableHead>Priority</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {getFilteredTasks().map(task => (
              <TableRow key={task.id}>
                <TableCell>
                  <div>
                    <div className="font-medium">{task.title}</div>
                    <div className="text-sm text-muted-foreground">{task.description}</div>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={task.assignedTo.image} alt={task.assignedTo.name} />
                      <AvatarFallback>{task.assignedTo.name.split(" ").map(n => n[0]).join("")}</AvatarFallback>
                    </Avatar>
                    <span>{task.assignedTo.name}</span>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex items-center">
                    <CalendarDays className="h-4 w-4 mr-2 text-muted-foreground" />
                    <span>{new Date(task.dueDate).toLocaleDateString()}</span>
                  </div>
                  <div className="text-sm text-muted-foreground flex items-center mt-1">
                    <Clock className="h-3 w-3 mr-1" />
                    <span>{task.estimatedTime}</span>
                  </div>
                </TableCell>
                <TableCell>
                  <Badge variant={
                    task.priority === "High" ? "destructive" : 
                    task.priority === "Medium" ? "default" : "secondary"
                  }>
                    {task.priority}
                  </Badge>
                </TableCell>
                <TableCell>
                  <Badge variant={
                    task.status === "Completed" ? "outline" : 
                    task.status === "In Progress" ? "default" : "secondary"
                  }>
                    {task.status}
                  </Badge>
                </TableCell>
                <TableCell className="text-right">
                  <Button variant="ghost" size="sm">
                    <Edit className="h-4 w-4" />
                    <span className="sr-only">Edit</span>
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default StaffTasks;
