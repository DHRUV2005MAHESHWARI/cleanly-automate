
import { useState } from 'react';
import { Layout } from "@/components/Layout";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  SidebarProvider, 
  Sidebar, 
  SidebarHeader, 
  SidebarContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarFooter,
  SidebarSeparator,
  SidebarInset
} from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import { Link, useNavigate } from "react-router-dom";
import { Users, Shield, Settings, Package, CreditCard, LineChart, Home } from "lucide-react";

const AdminDashboard = () => {
  const [stats] = useState({
    totalUsers: 342,
    newUsersToday: 18,
    totalOrders: 1567,
    pendingOrders: 28,
    revenue: '$45,289.00',
    orderCompletionRate: '94%'
  });

  const navigate = useNavigate();

  return (
    <Layout>
      <SidebarProvider>
        <Sidebar>
          <SidebarHeader>
            <div className="flex items-center gap-2 px-2">
              <Shield className="h-6 w-6 text-primary" />
              <div className="font-semibold text-lg">Admin Panel</div>
            </div>
          </SidebarHeader>
          
          <SidebarContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton isActive tooltip="Dashboard" onClick={() => navigate('/admin')}>
                  <LineChart className="mr-2" />
                  <span>Dashboard</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
              
              <SidebarMenuItem>
                <SidebarMenuButton tooltip="Users" onClick={() => navigate('/admin/users')}>
                  <Users className="mr-2" />
                  <span>User Management</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
              
              <SidebarMenuItem>
                <SidebarMenuButton tooltip="Orders">
                  <Package className="mr-2" />
                  <span>Orders</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
              
              <SidebarMenuItem>
                <SidebarMenuButton tooltip="Billing">
                  <CreditCard className="mr-2" />
                  <span>Billing</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
              
              <SidebarMenuItem>
                <SidebarMenuButton tooltip="Settings">
                  <Settings className="mr-2" />
                  <span>Settings</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarContent>
          
          <SidebarFooter>
            <SidebarSeparator />
            <div className="p-2">
              <Button asChild variant="outline" className="w-full justify-start">
                <Link to="/">
                  <Home className="mr-2 h-4 w-4" />
                  <span>Back to Site</span>
                </Link>
              </Button>
            </div>
          </SidebarFooter>
        </Sidebar>
        
        <SidebarInset className="p-6">
          <div className="space-y-6">
            <div>
              <h1 className="text-3xl font-bold">Admin Dashboard</h1>
              <p className="text-muted-foreground">Welcome to the admin dashboard. Manage users, orders, and settings.</p>
            </div>
            
            {/* Overview Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-xl">Users</CardTitle>
                  <CardDescription>User registration metrics</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold">{stats.totalUsers}</div>
                  <p className="text-xs text-muted-foreground mt-1">
                    <span className="text-green-500 font-medium">+{stats.newUsersToday} today</span>
                  </p>
                </CardContent>
                <CardFooter className="pt-2">
                  <Button asChild variant="outline" size="sm" className="w-full">
                    <Link to="/admin/users">View All Users</Link>
                  </Button>
                </CardFooter>
              </Card>
              
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-xl">Orders</CardTitle>
                  <CardDescription>Order processing metrics</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold">{stats.totalOrders}</div>
                  <p className="text-xs text-muted-foreground mt-1">
                    <span className="text-amber-500 font-medium">{stats.pendingOrders} pending</span>
                  </p>
                </CardContent>
                <CardFooter className="pt-2">
                  <Button variant="outline" size="sm" className="w-full">View All Orders</Button>
                </CardFooter>
              </Card>
              
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-xl">Revenue</CardTitle>
                  <CardDescription>Financial metrics</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold">{stats.revenue}</div>
                  <p className="text-xs text-muted-foreground mt-1">
                    <span className="text-blue-500 font-medium">{stats.orderCompletionRate} completion rate</span>
                  </p>
                </CardContent>
                <CardFooter className="pt-2">
                  <Button variant="outline" size="sm" className="w-full">View Reports</Button>
                </CardFooter>
              </Card>
            </div>
            
            {/* Quick Actions */}
            <div>
              <h2 className="text-xl font-semibold mb-4">Quick Actions</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <Button asChild>
                  <Link to="/admin/users">Manage Users</Link>
                </Button>
                <Button>View Orders</Button>
                <Button>Process Payments</Button>
                <Button>System Settings</Button>
              </div>
            </div>
            
            {/* Recent Activity */}
            <div>
              <Tabs defaultValue="users">
                <TabsList className="mb-4">
                  <TabsTrigger value="users">Recent Users</TabsTrigger>
                  <TabsTrigger value="orders">Recent Orders</TabsTrigger>
                </TabsList>
                
                <TabsContent value="users">
                  <Card>
                    <CardContent className="p-0">
                      <div className="rounded-md border">
                        <div className="grid grid-cols-3 p-4 text-sm font-medium">
                          <div>Name</div>
                          <div>Email</div>
                          <div>Joined</div>
                        </div>
                        <div className="divide-y">
                          {[
                            { name: "John Smith", email: "john@example.com", date: "2 hours ago" },
                            { name: "Sarah Johnson", email: "sarah@example.com", date: "5 hours ago" },
                            { name: "Michael Brown", email: "michael@example.com", date: "1 day ago" },
                            { name: "Emma Wilson", email: "emma@example.com", date: "2 days ago" },
                          ].map((user, i) => (
                            <div key={i} className="grid grid-cols-3 p-4 text-sm">
                              <div>{user.name}</div>
                              <div className="text-muted-foreground">{user.email}</div>
                              <div className="text-muted-foreground">{user.date}</div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
                
                <TabsContent value="orders">
                  <Card>
                    <CardContent className="p-0">
                      <div className="rounded-md border">
                        <div className="grid grid-cols-4 p-4 text-sm font-medium">
                          <div>Order ID</div>
                          <div>Customer</div>
                          <div>Amount</div>
                          <div>Status</div>
                        </div>
                        <div className="divide-y">
                          {[
                            { id: "#ORD-7893", customer: "John Smith", amount: "$129.00", status: "Completed" },
                            { id: "#ORD-7894", customer: "Sarah Johnson", amount: "$79.00", status: "Processing" },
                            { id: "#ORD-7895", customer: "Michael Brown", amount: "$189.00", status: "Processing" },
                            { id: "#ORD-7896", customer: "Emma Wilson", amount: "$49.00", status: "Completed" },
                          ].map((order, i) => (
                            <div key={i} className="grid grid-cols-4 p-4 text-sm">
                              <div>{order.id}</div>
                              <div>{order.customer}</div>
                              <div>{order.amount}</div>
                              <div className={order.status === "Completed" ? "text-green-500" : "text-amber-500"}>
                                {order.status}
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </SidebarInset>
      </SidebarProvider>
    </Layout>
  );
};

export default AdminDashboard;
