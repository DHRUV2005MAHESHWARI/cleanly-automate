
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  ShoppingCart, 
  Users, 
  TrendingUp, 
  Calendar, 
  Clock
} from "lucide-react";

const DashboardMetrics = () => {
  // Sample data - in a real app, this would come from an API
  const metrics = [
    { title: "Active Orders", value: "28", icon: <ShoppingCart />, change: "+12% from last week" },
    { title: "Total Customers", value: "512", icon: <Users />, change: "+8% from last month" },
    { title: "Today's Revenue", value: "$1,254", icon: <TrendingUp />, change: "+16% from yesterday" },
    { title: "Pending Pickups", value: "7", icon: <Calendar />, change: "3 scheduled for today" },
    { title: "Processing Orders", value: "12", icon: <Clock />, change: "4 due today" },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
      {metrics.map((metric, index) => (
        <Card key={index}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              {metric.title}
            </CardTitle>
            <div className="h-4 w-4 text-muted-foreground">
              {metric.icon}
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{metric.value}</div>
            <p className="text-xs text-muted-foreground">{metric.change}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default DashboardMetrics;
