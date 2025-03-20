
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { DollarSign, Download, Calendar, Clock } from "lucide-react";

const PayrollManagement = () => {
  const payrollData = [
    { id: 1, name: "John Doe", position: "Laundry Manager", salary: "$4,200", hours: 162, overtime: 12, bonus: "$350", status: "Paid", date: "Sept 30, 2023" },
    { id: 2, name: "Jane Smith", position: "Senior Washing Specialist", salary: "$3,500", hours: 160, overtime: 0, bonus: "$200", status: "Paid", date: "Sept 30, 2023" },
    { id: 3, name: "Robert Johnson", position: "Ironing Specialist", salary: "$1,900", hours: 80, overtime: 0, bonus: "$0", status: "Paid", date: "Sept 30, 2023" },
    { id: 4, name: "Sarah Williams", position: "Dry Cleaning Expert", salary: "$3,100", hours: 158, overtime: 8, bonus: "$150", status: "Paid", date: "Sept 30, 2023" },
    { id: 5, name: "Michael Brown", position: "Delivery Coordinator", salary: "$2,900", hours: 160, overtime: 0, bonus: "$100", status: "Paid", date: "Sept 30, 2023" },
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <CardTitle>Payroll Management</CardTitle>
          <p className="text-sm text-muted-foreground mt-1">Monthly salary information for all staff members</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <Calendar className="h-4 w-4 mr-2" />
            Previous Month
          </Button>
          <Button>
            <DollarSign className="h-4 w-4 mr-2" />
            Process Payroll
          </Button>
        </div>
      </div>

      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle>September 2023 Payroll</CardTitle>
            <Button variant="outline" size="sm">
              <Download className="h-4 w-4 mr-2" />
              Export
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Employee</TableHead>
                <TableHead>Position</TableHead>
                <TableHead>Hours</TableHead>
                <TableHead>Salary</TableHead>
                <TableHead>Bonus</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {payrollData.map(employee => (
                <TableRow key={employee.id}>
                  <TableCell className="font-medium">{employee.name}</TableCell>
                  <TableCell>{employee.position}</TableCell>
                  <TableCell>
                    <div className="flex items-center">
                      <Clock className="h-4 w-4 mr-2 text-muted-foreground" />
                      <span>{employee.hours} hrs</span>
                      {employee.overtime > 0 && (
                        <Badge variant="outline" className="ml-2 text-xs">
                          +{employee.overtime} OT
                        </Badge>
                      )}
                    </div>
                  </TableCell>
                  <TableCell>{employee.salary}</TableCell>
                  <TableCell>{employee.bonus}</TableCell>
                  <TableCell>
                    <Badge variant="outline" className="bg-green-500/10 text-green-700">
                      {employee.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <Button variant="ghost" size="sm">
                      <Download className="h-4 w-4" />
                      <span className="sr-only">Download</span>
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default PayrollManagement;
