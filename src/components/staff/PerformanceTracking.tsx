
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Progress } from "@/components/ui/progress";
import { Award, TrendingUp, Watch, BarChart } from "lucide-react";

const PerformanceTracking = () => {
  const staffPerformance = [
    { name: "John Doe", image: "/placeholder.svg", ordersCompleted: 145, customerRating: 4.8, efficiency: 92, attendance: 98 },
    { name: "Jane Smith", image: "/placeholder.svg", ordersCompleted: 132, customerRating: 4.9, efficiency: 94, attendance: 100 },
    { name: "Robert Johnson", image: "/placeholder.svg", ordersCompleted: 87, customerRating: 4.5, efficiency: 88, attendance: 90 },
    { name: "Sarah Williams", image: "/placeholder.svg", ordersCompleted: 125, customerRating: 4.7, efficiency: 91, attendance: 97 },
    { name: "Michael Brown", image: "/placeholder.svg", ordersCompleted: 118, customerRating: 4.6, efficiency: 90, attendance: 95 },
  ];

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Staff Performance Overview</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {staffPerformance.map((staff, index) => (
              <div key={index} className="grid grid-cols-1 md:grid-cols-5 gap-4 items-center border-b pb-4 last:border-0 last:pb-0">
                <div className="flex items-center gap-2">
                  <Avatar className="h-10 w-10">
                    <AvatarImage src={staff.image} alt={staff.name} />
                    <AvatarFallback>{staff.name.split(" ").map(n => n[0]).join("")}</AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="font-medium">{staff.name}</div>
                  </div>
                </div>
                
                <div className="flex flex-col gap-1">
                  <div className="text-sm font-medium flex items-center gap-1">
                    <Award className="h-4 w-4 text-yellow-500" />
                    <span>Customer Rating</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-2xl font-bold">{staff.customerRating}</span>
                    <span className="text-sm text-muted-foreground">/ 5.0</span>
                  </div>
                </div>
                
                <div className="flex flex-col gap-1">
                  <div className="text-sm font-medium flex items-center gap-1">
                    <TrendingUp className="h-4 w-4 text-green-500" />
                    <span>Efficiency</span>
                  </div>
                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-sm font-medium">{staff.efficiency}%</span>
                    </div>
                    <Progress value={staff.efficiency} className="h-2" />
                  </div>
                </div>
                
                <div className="flex flex-col gap-1">
                  <div className="text-sm font-medium flex items-center gap-1">
                    <Watch className="h-4 w-4 text-blue-500" />
                    <span>Attendance</span>
                  </div>
                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-sm font-medium">{staff.attendance}%</span>
                    </div>
                    <Progress value={staff.attendance} className="h-2" />
                  </div>
                </div>
                
                <div className="flex flex-col gap-1">
                  <div className="text-sm font-medium flex items-center gap-1">
                    <BarChart className="h-4 w-4 text-purple-500" />
                    <span>Orders Completed</span>
                  </div>
                  <div className="text-2xl font-bold">{staff.ordersCompleted}</div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default PerformanceTracking;
