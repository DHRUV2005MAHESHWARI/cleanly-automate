
import { useState, useEffect } from 'react';
import { Layout } from "@/components/Layout";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Link, useNavigate } from "react-router-dom";
import { Users, Shield, Settings, Package, CreditCard, LineChart, Home, CheckCircle, XCircle, Clock } from "lucide-react";
import { supabase } from "@/lib/supabase";
import { Pickup } from "@/lib/types";
import { toast } from "sonner";

const AdminDashboard = () => {
  const [stats] = useState({
    totalUsers: 342,
    newUsersToday: 18,
    totalOrders: 1567,
    pendingOrders: 28,
    revenue: '$45,289.00',
    orderCompletionRate: '94%'
  });

  const [scheduledServices, setScheduledServices] = useState<Pickup[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  // Fetch scheduled services from Supabase
  useEffect(() => {
    async function fetchScheduledServices() {
      setIsLoading(true);
      try {
        const { data, error } = await supabase
          .from('pickups')
          .select('*')
          .order('created_at', { ascending: false });
          
        if (error) {
          console.error('Error fetching pickups:', error);
          return;
        }
        
        setScheduledServices(data || []);
      } catch (error) {
        console.error('Error in fetchScheduledServices:', error);
      } finally {
        setIsLoading(false);
      }
    }
    
    fetchScheduledServices();
  }, []);

  // Map service types to display names
  const getServiceDisplayName = (serviceType: string): string => {
    const serviceNames: Record<string, string> = {
      'wash-fold': 'Wash & Fold',
      'dry-cleaning': 'Dry Cleaning',
      'express': 'Express Service',
      'stain-removal': 'Stain Removal',
      'alterations': 'Alterations & Repairs',
      'ironing': 'Ironing & Pressing',
      'standard': 'Standard Service',
      'premium': 'Premium Service'
    };
    
    return serviceNames[serviceType] || serviceType;
  };

  // Update service status
  const updateServiceStatus = async (id: number, status: 'Pending' | 'Confirmed' | 'Completed' | 'Cancelled') => {
    try {
      const { error } = await supabase
        .from('pickups')
        .update({ status })
        .eq('id', id);
        
      if (error) {
        console.error('Error updating status:', error);
        toast.error('Failed to update status');
        return;
      }
      
      // Update local state to reflect the change
      setScheduledServices(prev => 
        prev.map(service => 
          service.id === id ? { ...service, status } : service
        )
      );
      
      toast.success(`Service status updated to ${status}`);
    } catch (error) {
      console.error('Error in updateServiceStatus:', error);
      toast.error('Something went wrong');
    }
  };

  // Mock data for scheduled services if database is not connected
  const mockScheduledServices: Pickup[] = [
    {
      id: 1,
      name: 'John Smith',
      phone: '(555) 123-4567',
      email: 'john@example.com',
      address: '123 Main St, Anytown',
      serviceType: 'wash-fold',
      pickup_date: '2023-11-15',
      time: '13:00',
      notes: 'Ring bell twice',
      status: 'Pending',
      created_at: '2023-11-10T10:30:00Z'
    },
    {
      id: 2,
      name: 'Jane Doe',
      phone: '(555) 987-6543',
      email: 'jane@example.com',
      address: '456 Oak Ave, Somewhere',
      serviceType: 'dry-cleaning',
      pickup_date: '2023-11-17',
      time: '10:00',
      notes: 'Delicate items included',
      status: 'Confirmed',
      created_at: '2023-11-11T14:15:00Z'
    },
    {
      id: 3,
      name: 'Robert Brown',
      phone: '(555) 456-7890',
      email: 'robert@example.com',
      address: '789 Pine Rd, Nowhere',
      serviceType: 'express',
      pickup_date: '2023-11-20',
      time: '15:00',
      notes: '',
      status: 'Completed',
      created_at: '2023-11-12T09:00:00Z'
    }
  ];

  // If database is not connected or no data is returned, use mock data
  const displayServices = scheduledServices.length > 0 ? scheduledServices : mockScheduledServices;

  // Check user role on component mount
  useEffect(() => {
    const userRole = localStorage.getItem('userRole');
    if (userRole !== 'admin') {
      toast.error('You must be an admin to access this page');
      navigate('/login');
    }
  }, [navigate]);

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
            
            {/* Scheduled Services */}
            <div>
              <h2 className="text-xl font-semibold mb-4">Service Requests</h2>
              <Card>
                <CardHeader>
                  <CardTitle>User Scheduled Services</CardTitle>
                  <CardDescription>
                    Manage service requests and update their status
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {isLoading ? (
                    <div className="text-center py-4">Loading scheduled services...</div>
                  ) : (
                    <div className="rounded-md border">
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>Customer</TableHead>
                            <TableHead>Service</TableHead>
                            <TableHead>Date</TableHead>
                            <TableHead>Time</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead className="text-right">Actions</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {displayServices.length === 0 ? (
                            <TableRow>
                              <TableCell colSpan={6} className="text-center py-4">
                                No scheduled services found
                              </TableCell>
                            </TableRow>
                          ) : (
                            displayServices.map((service) => (
                              <TableRow key={service.id}>
                                <TableCell>
                                  <div className="font-medium">{service.name}</div>
                                  <div className="text-sm text-muted-foreground">{service.email}</div>
                                </TableCell>
                                <TableCell>{getServiceDisplayName(service.serviceType)}</TableCell>
                                <TableCell>{service.pickup_date}</TableCell>
                                <TableCell>{service.time}</TableCell>
                                <TableCell>
                                  <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                                    service.status === 'Completed' ? 'bg-green-100 text-green-800' :
                                    service.status === 'Confirmed' ? 'bg-blue-100 text-blue-800' :
                                    service.status === 'Cancelled' ? 'bg-red-100 text-red-800' :
                                    'bg-amber-100 text-amber-800'
                                  }`}>
                                    {service.status}
                                  </span>
                                </TableCell>
                                <TableCell className="text-right">
                                  <Select 
                                    defaultValue={service.status} 
                                    onValueChange={(value) => updateServiceStatus(service.id!, value as 'Pending' | 'Confirmed' | 'Completed' | 'Cancelled')}
                                  >
                                    <SelectTrigger className="w-[130px]">
                                      <SelectValue placeholder="Update Status" />
                                    </SelectTrigger>
                                    <SelectContent>
                                      <SelectItem value="Pending">
                                        <div className="flex items-center">
                                          <Clock className="mr-2 h-4 w-4 text-amber-500" />
                                          <span>Pending</span>
                                        </div>
                                      </SelectItem>
                                      <SelectItem value="Confirmed">
                                        <div className="flex items-center">
                                          <Clock className="mr-2 h-4 w-4 text-blue-500" />
                                          <span>Confirmed</span>
                                        </div>
                                      </SelectItem>
                                      <SelectItem value="Completed">
                                        <div className="flex items-center">
                                          <CheckCircle className="mr-2 h-4 w-4 text-green-500" />
                                          <span>Completed</span>
                                        </div>
                                      </SelectItem>
                                      <SelectItem value="Cancelled">
                                        <div className="flex items-center">
                                          <XCircle className="mr-2 h-4 w-4 text-red-500" />
                                          <span>Cancelled</span>
                                        </div>
                                      </SelectItem>
                                    </SelectContent>
                                  </Select>
                                </TableCell>
                              </TableRow>
                            ))
                          )}
                        </TableBody>
                      </Table>
                    </div>
                  )}
                </CardContent>
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
