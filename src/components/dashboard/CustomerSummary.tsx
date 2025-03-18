
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { Avatar } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { 
  ChartContainer, 
  ChartLegend, 
  ChartLegendContent 
} from "@/components/ui/chart";
import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";

const CustomerSummary = () => {
  // Sample data - in a real app, this would come from an API
  const customers = [
    { id: 1, name: "John Doe", email: "john@example.com", orders: 12, spent: "$345.99", lastOrder: "2 days ago" },
    { id: 2, name: "Jane Smith", email: "jane@example.com", orders: 8, spent: "$267.50", lastOrder: "1 week ago" },
    { id: 3, name: "Robert Brown", email: "robert@example.com", orders: 24, spent: "$892.00", lastOrder: "Yesterday" },
    { id: 4, name: "Alice Johnson", email: "alice@example.com", orders: 5, spent: "$134.99", lastOrder: "3 days ago" },
  ];

  // Data for customer segments pie chart
  const customerSegments = [
    { name: "Regular", value: 65, color: "#4f46e5" },
    { name: "Occasional", value: 25, color: "#06b6d4" },
    { name: "New", value: 10, color: "#10b981" },
  ];

  // Data for service preference chart
  const servicePreferences = [
    { name: "Wash & Fold", value: 45, color: "#4f46e5" },
    { name: "Dry Cleaning", value: 20, color: "#06b6d4" },
    { name: "Ironing", value: 15, color: "#10b981" },
    { name: "Express", value: 10, color: "#eab308" },
    { name: "Others", value: 10, color: "#ef4444" },
  ];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <div className="lg:col-span-2 space-y-6">
        <div className="rounded-lg border bg-card text-card-foreground shadow-sm">
          <div className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold">Top Customers</h3>
              <Button variant="outline" size="sm">View All</Button>
            </div>
            
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Customer</TableHead>
                    <TableHead>Orders</TableHead>
                    <TableHead>Total Spent</TableHead>
                    <TableHead>Last Order</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {customers.map((customer) => (
                    <TableRow key={customer.id}>
                      <TableCell className="flex items-center gap-2">
                        <Avatar className="h-8 w-8">
                          <div className="bg-primary text-primary-foreground flex h-full w-full items-center justify-center rounded-full text-sm font-medium uppercase">
                            {customer.name.charAt(0)}
                          </div>
                        </Avatar>
                        <div>
                          <div className="font-medium">{customer.name}</div>
                          <div className="text-sm text-muted-foreground">{customer.email}</div>
                        </div>
                      </TableCell>
                      <TableCell>{customer.orders}</TableCell>
                      <TableCell>{customer.spent}</TableCell>
                      <TableCell>{customer.lastOrder}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </div>
        </div>
      </div>

      <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Customer Segments</CardTitle>
          </CardHeader>
          <CardContent>
            <ChartContainer 
              config={Object.fromEntries(customerSegments.map(segment => [
                segment.name, 
                { label: segment.name, theme: { light: segment.color, dark: segment.color } }
              ]))}
              className="aspect-square"
            >
              <PieChart>
                <Pie
                  data={customerSegments}
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                  nameKey="name"
                >
                  {customerSegments.map((segment, index) => (
                    <Cell key={`cell-${index}`} fill={segment.color} />
                  ))}
                </Pie>
                <ChartLegend>
                  <ChartLegendContent nameKey="name" />
                </ChartLegend>
              </PieChart>
            </ChartContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Service Preferences</CardTitle>
          </CardHeader>
          <CardContent>
            <ChartContainer 
              config={Object.fromEntries(servicePreferences.map(service => [
                service.name, 
                { label: service.name, theme: { light: service.color, dark: service.color } }
              ]))}
              className="aspect-square"
            >
              <PieChart>
                <Pie
                  data={servicePreferences}
                  innerRadius={0}
                  outerRadius={80}
                  paddingAngle={2}
                  dataKey="value"
                  nameKey="name"
                >
                  {servicePreferences.map((service, index) => (
                    <Cell key={`cell-${index}`} fill={service.color} />
                  ))}
                </Pie>
                <ChartLegend>
                  <ChartLegendContent nameKey="name" />
                </ChartLegend>
              </PieChart>
            </ChartContainer>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default CustomerSummary;
