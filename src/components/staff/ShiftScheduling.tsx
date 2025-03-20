
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CalendarDays, Clock, Users } from "lucide-react";

// Mock shift data
const mockShifts = [
  { day: "Monday", morning: ["John Doe", "Sarah Williams"], afternoon: ["Jane Smith", "Emily Davis"], evening: ["Michael Brown"] },
  { day: "Tuesday", morning: ["Jane Smith", "Emily Davis"], afternoon: ["John Doe", "Michael Brown"], evening: ["Robert Johnson"] },
  { day: "Wednesday", morning: ["Robert Johnson", "Michael Brown"], afternoon: ["Jane Smith", "Sarah Williams"], evening: ["John Doe"] },
  { day: "Thursday", morning: ["Sarah Williams", "Emily Davis"], afternoon: ["John Doe", "Robert Johnson"], evening: ["Jane Smith"] },
  { day: "Friday", morning: ["Jane Smith", "John Doe"], afternoon: ["Robert Johnson", "Sarah Williams"], evening: ["Michael Brown", "Emily Davis"] },
  { day: "Saturday", morning: ["Michael Brown", "John Doe"], afternoon: ["Jane Smith", "Emily Davis"], evening: ["Robert Johnson", "Sarah Williams"] },
  { day: "Sunday", morning: ["Robert Johnson", "Sarah Williams"], afternoon: ["Michael Brown"], evening: ["John Doe", "Jane Smith"] },
];

const ShiftScheduling = () => {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <CardTitle>Staff Shift Schedule</CardTitle>
          <p className="text-sm text-muted-foreground mt-1">Current week schedule for all staff members</p>
        </div>
        <div className="flex space-x-2">
          <Button>
            <Clock className="h-4 w-4 mr-2" />
            Edit Schedule
          </Button>
          <Button variant="outline">
            <CalendarDays className="h-4 w-4 mr-2" />
            Print Schedule
          </Button>
        </div>
      </div>

      <Card>
        <CardHeader className="pb-0">
          <div className="flex justify-between items-center">
            <div>
              <CardTitle className="text-lg">Weekly Schedule</CardTitle>
              <p className="text-sm text-muted-foreground">October 15 - October 21, 2023</p>
            </div>
            <div className="flex gap-4">
              <div className="flex items-center text-sm">
                <div className="h-3 w-3 rounded-full bg-green-500 mr-2"></div>
                <span>Morning (6am - 2pm)</span>
              </div>
              <div className="flex items-center text-sm">
                <div className="h-3 w-3 rounded-full bg-blue-500 mr-2"></div>
                <span>Afternoon (2pm - 10pm)</span>
              </div>
              <div className="flex items-center text-sm">
                <div className="h-3 w-3 rounded-full bg-purple-500 mr-2"></div>
                <span>Evening (10pm - 6am)</span>
              </div>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border mt-4">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Day</TableHead>
                  <TableHead>Morning Shift</TableHead>
                  <TableHead>Afternoon Shift</TableHead>
                  <TableHead>Evening Shift</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {mockShifts.map((shift, index) => (
                  <TableRow key={index}>
                    <TableCell className="font-medium">{shift.day}</TableCell>
                    <TableCell>
                      <div className="flex items-center">
                        <Badge variant="outline" className="mr-2 bg-green-500/10 text-green-700 hover:bg-green-500/20 hover:text-green-800">
                          <Clock className="h-3 w-3 mr-1" />
                          6am - 2pm
                        </Badge>
                        <div className="flex flex-col">
                          {shift.morning.map((staff, i) => (
                            <span key={i} className="text-sm">{staff}</span>
                          ))}
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center">
                        <Badge variant="outline" className="mr-2 bg-blue-500/10 text-blue-700 hover:bg-blue-500/20 hover:text-blue-800">
                          <Clock className="h-3 w-3 mr-1" />
                          2pm - 10pm
                        </Badge>
                        <div className="flex flex-col">
                          {shift.afternoon.map((staff, i) => (
                            <span key={i} className="text-sm">{staff}</span>
                          ))}
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center">
                        <Badge variant="outline" className="mr-2 bg-purple-500/10 text-purple-700 hover:bg-purple-500/20 hover:text-purple-800">
                          <Clock className="h-3 w-3 mr-1" />
                          10pm - 6am
                        </Badge>
                        <div className="flex flex-col">
                          {shift.evening.map((staff, i) => (
                            <span key={i} className="text-sm">{staff}</span>
                          ))}
                        </div>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Staff Availability</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {["John Doe", "Jane Smith", "Robert Johnson", "Sarah Williams", "Michael Brown", "Emily Davis"].map((staff, index) => (
              <div key={index} className="p-4 border rounded-md">
                <div className="flex items-center mb-2">
                  <Users className="h-4 w-4 mr-2" />
                  <h3 className="font-medium">{staff}</h3>
                </div>
                <div className="text-sm text-muted-foreground">
                  <p>Preferred hours: {index % 2 === 0 ? "Morning/Afternoon" : "Afternoon/Evening"}</p>
                  <p>Max hours per week: {index === 0 ? 40 : index === 1 ? 32 : index === 2 ? 20 : 40} hours</p>
                  <p>Time off requests: {index === 2 ? "Oct 18-20" : index === 5 ? "Oct 21-22" : "None"}</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ShiftScheduling;
