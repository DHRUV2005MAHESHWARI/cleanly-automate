
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CalendarClock, MapPin, User, Package } from "lucide-react";

const PendingPickups = () => {
  // Sample data - in a real app, this would come from an API
  const pickups = [
    { 
      id: "PU-001", 
      customer: "John Doe", 
      address: "123 Main St, Apt 4B, New York, NY 10001", 
      time: "Today, 2:00 PM - 4:00 PM", 
      items: "3 shirts, 2 pants", 
      status: "Scheduled" 
    },
    { 
      id: "PU-002", 
      customer: "Jane Smith", 
      address: "456 Park Ave, Suite 10, New York, NY 10022", 
      time: "Tomorrow, 10:00 AM - 12:00 PM", 
      items: "1 comforter, 4 bed sheets", 
      status: "Pending" 
    },
    { 
      id: "PU-003", 
      customer: "Robert Brown", 
      address: "789 Broadway, New York, NY 10003", 
      time: "Today, 6:00 PM - 8:00 PM", 
      items: "5 shirts, 3 pants, 2 jackets", 
      status: "In Transit" 
    },
  ];

  const deliveries = [
    { 
      id: "DEL-001", 
      customer: "Alice Johnson", 
      address: "321 Oak St, Brooklyn, NY 11201", 
      time: "Today, 5:00 PM - 7:00 PM", 
      items: "2 dresses, 1 suit", 
      status: "Out for Delivery" 
    },
    { 
      id: "DEL-002", 
      customer: "Thomas Wilson", 
      address: "654 Pine St, Queens, NY 11101", 
      time: "Tomorrow, 1:00 PM - 3:00 PM", 
      items: "8 shirts, 4 pants", 
      status: "Processing" 
    },
  ];

  // Helper function to determine the status badge color
  const getStatusBadge = (status: string) => {
    switch (status) {
      case "Scheduled":
        return <Badge variant="outline" className="bg-green-100 text-green-800 hover:bg-green-100">{status}</Badge>;
      case "Pending":
        return <Badge variant="outline" className="bg-yellow-100 text-yellow-800 hover:bg-yellow-100">{status}</Badge>;
      case "In Transit":
        return <Badge variant="outline" className="bg-blue-100 text-blue-800 hover:bg-blue-100">{status}</Badge>;
      case "Out for Delivery":
        return <Badge variant="outline" className="bg-purple-100 text-purple-800 hover:bg-purple-100">{status}</Badge>;
      case "Processing":
        return <Badge variant="outline" className="bg-gray-100 text-gray-800 hover:bg-gray-100">{status}</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-base font-medium">Today's Schedule</CardTitle>
            <CalendarClock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">7 Pickups, 4 Deliveries</div>
            <p className="text-xs text-muted-foreground">3 pickups and 2 deliveries pending</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-base font-medium">Active Drivers</CardTitle>
            <MapPin className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">3 Drivers on Duty</div>
            <p className="text-xs text-muted-foreground">2 in transit, 1 available</p>
          </CardContent>
        </Card>
      </div>
      
      <div className="rounded-lg border bg-card text-card-foreground shadow-sm">
        <div className="p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold">Pending Pickups</h3>
            <Button variant="outline" size="sm">Manage Schedule</Button>
          </div>
          
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>ID</TableHead>
                  <TableHead>Customer</TableHead>
                  <TableHead>Time</TableHead>
                  <TableHead>Address</TableHead>
                  <TableHead>Items</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {pickups.map((pickup) => (
                  <TableRow key={pickup.id}>
                    <TableCell className="font-medium">{pickup.id}</TableCell>
                    <TableCell>{pickup.customer}</TableCell>
                    <TableCell>{pickup.time}</TableCell>
                    <TableCell className="max-w-xs truncate">{pickup.address}</TableCell>
                    <TableCell>{pickup.items}</TableCell>
                    <TableCell>{getStatusBadge(pickup.status)}</TableCell>
                    <TableCell className="text-right">
                      <Button variant="outline" size="sm">Assign Driver</Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>
      </div>
      
      <div className="rounded-lg border bg-card text-card-foreground shadow-sm">
        <div className="p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold">Pending Deliveries</h3>
            <Button variant="outline" size="sm">View All</Button>
          </div>
          
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>ID</TableHead>
                  <TableHead>Customer</TableHead>
                  <TableHead>Time</TableHead>
                  <TableHead>Address</TableHead>
                  <TableHead>Items</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {deliveries.map((delivery) => (
                  <TableRow key={delivery.id}>
                    <TableCell className="font-medium">{delivery.id}</TableCell>
                    <TableCell>{delivery.customer}</TableCell>
                    <TableCell>{delivery.time}</TableCell>
                    <TableCell className="max-w-xs truncate">{delivery.address}</TableCell>
                    <TableCell>{delivery.items}</TableCell>
                    <TableCell>{getStatusBadge(delivery.status)}</TableCell>
                    <TableCell className="text-right">
                      <Button variant="outline" size="sm">Track Location</Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PendingPickups;
