
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Eye, Edit } from "lucide-react";

const RecentOrders = () => {
  // Sample data - in a real app, this would come from an API
  const orders = [
    { id: "ORD-001", customer: "John Doe", service: "Wash & Fold", items: 8, total: "$45.99", status: "Processing" },
    { id: "ORD-002", customer: "Jane Smith", service: "Dry Cleaning", items: 3, total: "$67.50", status: "Ready" },
    { id: "ORD-003", customer: "Robert Brown", service: "Express Service", items: 5, total: "$92.00", status: "Completed" },
    { id: "ORD-004", customer: "Alice Johnson", service: "Stain Removal", items: 2, total: "$34.99", status: "Pending" },
    { id: "ORD-005", customer: "Thomas Wilson", service: "Ironing & Pressing", items: 12, total: "$53.50", status: "Processing" },
  ];

  // Helper function to determine the status badge color
  const getStatusBadge = (status: string) => {
    switch (status) {
      case "Pending":
        return <Badge variant="outline" className="bg-yellow-100 text-yellow-800 hover:bg-yellow-100">{status}</Badge>;
      case "Processing":
        return <Badge variant="outline" className="bg-blue-100 text-blue-800 hover:bg-blue-100">{status}</Badge>;
      case "Ready":
        return <Badge variant="outline" className="bg-green-100 text-green-800 hover:bg-green-100">{status}</Badge>;
      case "Completed":
        return <Badge variant="outline" className="bg-purple-100 text-purple-800 hover:bg-purple-100">{status}</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  return (
    <div className="rounded-lg border bg-card text-card-foreground shadow-sm">
      <div className="p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold">Recent Orders</h3>
          <Button variant="outline" size="sm">View All Orders</Button>
        </div>
        
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Order ID</TableHead>
                <TableHead>Customer</TableHead>
                <TableHead>Service</TableHead>
                <TableHead>Items</TableHead>
                <TableHead>Total</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {orders.map((order) => (
                <TableRow key={order.id}>
                  <TableCell className="font-medium">{order.id}</TableCell>
                  <TableCell>{order.customer}</TableCell>
                  <TableCell>{order.service}</TableCell>
                  <TableCell>{order.items}</TableCell>
                  <TableCell>{order.total}</TableCell>
                  <TableCell>{getStatusBadge(order.status)}</TableCell>
                  <TableCell className="text-right">
                    <Button variant="ghost" size="icon" className="h-8 w-8 mr-2">
                      <Eye className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <Edit className="h-4 w-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
};

export default RecentOrders;
