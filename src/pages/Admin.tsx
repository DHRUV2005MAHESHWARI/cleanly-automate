
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
import { 
  Users, Shield, Settings, Package, CreditCard, LineChart, Home, 
  CheckCircle, XCircle, Clock, ArrowLeft, FileText, Activity
} from "lucide-react";
import { supabase } from "@/lib/supabase";
import { Pickup } from "@/lib/types";
import { toast } from "sonner";
import { BackButton } from "@/components/ui/back-button";

// Admin Orders component for Orders tab
const AdminOrders = () => {
  const [orders, setOrders] = useState([
    { id: "#ORD-7893", customer: "Rahul Sharma", amount: "₹12,999", status: "Completed", date: "2025-04-15" },
    { id: "#ORD-7894", customer: "Priya Patel", amount: "₹7,999", status: "Processing", date: "2025-04-16" },
    { id: "#ORD-7895", customer: "Amit Kumar", amount: "₹18,999", status: "Processing", date: "2025-04-17" },
    { id: "#ORD-7896", customer: "Neha Singh", amount: "₹4,999", status: "Completed", date: "2025-04-18" },
    { id: "#ORD-7897", customer: "Vikram Choudhury", amount: "₹9,999", status: "Pending", date: "2025-04-20" },
  ]);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Order Management</CardTitle>
        <CardDescription>
          View and manage all customer orders
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Order ID</TableHead>
                <TableHead>Customer</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {orders.map((order, index) => (
                <TableRow key={index}>
                  <TableCell className="font-medium">{order.id}</TableCell>
                  <TableCell>{order.customer}</TableCell>
                  <TableCell>{order.amount}</TableCell>
                  <TableCell>{order.date}</TableCell>
                  <TableCell>
                    <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                      order.status === 'Completed' ? 'bg-green-100 text-green-800' :
                      order.status === 'Processing' ? 'bg-blue-100 text-blue-800' :
                      'bg-amber-100 text-amber-800'
                    }`}>
                      {order.status}
                    </span>
                  </TableCell>
                  <TableCell className="text-right">
                    <Button variant="ghost" size="sm">View</Button>
                    <Button variant="ghost" size="sm">Edit</Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
};

// Admin Billing component for Billing tab
const AdminBilling = () => {
  const [invoices, setInvoices] = useState([
    { id: "INV-001", customer: "Rahul Sharma", amount: "₹12,999", status: "Paid", date: "2025-04-15" },
    { id: "INV-002", customer: "Priya Patel", amount: "₹7,999", status: "Pending", date: "2025-04-16" },
    { id: "INV-003", customer: "Amit Kumar", amount: "₹18,999", status: "Paid", date: "2025-04-17" },
    { id: "INV-004", customer: "Neha Singh", amount: "₹4,999", status: "Overdue", date: "2025-04-10" },
  ]);

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Billing Summary</CardTitle>
          <CardDescription>
            Overview of billing and payment status
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-md">Total Revenue</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">₹45,289.00</div>
                <p className="text-xs text-muted-foreground mt-1">
                  <span className="text-green-500 font-medium">+12.5% from last month</span>
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-md">Pending Payments</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">₹8,750.00</div>
                <p className="text-xs text-muted-foreground mt-1">
                  <span className="text-amber-500 font-medium">3 invoices pending</span>
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-md">Overdue Payments</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">₹4,999.00</div>
                <p className="text-xs text-muted-foreground mt-1">
                  <span className="text-red-500 font-medium">1 invoice overdue</span>
                </p>
              </CardContent>
            </Card>
          </div>
          
          <h3 className="text-lg font-semibold mb-3">Recent Invoices</h3>
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Invoice ID</TableHead>
                  <TableHead>Customer</TableHead>
                  <TableHead>Amount</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {invoices.map((invoice, index) => (
                  <TableRow key={index}>
                    <TableCell className="font-medium">{invoice.id}</TableCell>
                    <TableCell>{invoice.customer}</TableCell>
                    <TableCell>{invoice.amount}</TableCell>
                    <TableCell>{invoice.date}</TableCell>
                    <TableCell>
                      <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                        invoice.status === 'Paid' ? 'bg-green-100 text-green-800' :
                        invoice.status === 'Pending' ? 'bg-amber-100 text-amber-800' :
                        'bg-red-100 text-red-800'
                      }`}>
                        {invoice.status}
                      </span>
                    </TableCell>
                    <TableCell className="text-right">
                      <Button variant="ghost" size="sm">View</Button>
                      <Button variant="ghost" size="sm">Send Reminder</Button>
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
          <CardTitle>Payment Analytics</CardTitle>
          <CardDescription>
            Payment trends and financial metrics
          </CardDescription>
        </CardHeader>
        <CardContent className="flex items-center justify-center py-10">
          <div className="text-center">
            <Activity className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
            <p className="text-muted-foreground">
              Interactive payment analytics charts will be displayed here
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

// Admin Settings component for Settings tab
const AdminSettings = () => {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>System Settings</CardTitle>
          <CardDescription>
            Configure system-wide settings and preferences
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <h3 className="text-lg font-medium">General Settings</h3>
                <Card className="p-4">
                  <Button className="w-full mb-2">Email Notifications</Button>
                  <Button className="w-full mb-2">SMS Notifications</Button>
                  <Button className="w-full mb-2">System Maintenance</Button>
                  <Button className="w-full">Backup & Restore</Button>
                </Card>
              </div>
              
              <div className="space-y-2">
                <h3 className="text-lg font-medium">Service Configuration</h3>
                <Card className="p-4">
                  <Button className="w-full mb-2">Service Categories</Button>
                  <Button className="w-full mb-2">Pricing Rules</Button>
                  <Button className="w-full mb-2">Delivery Zones</Button>
                  <Button className="w-full">Service Hours</Button>
                </Card>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <h3 className="text-lg font-medium">Payment Settings</h3>
                <Card className="p-4">
                  <Button className="w-full mb-2">Payment Methods</Button>
                  <Button className="w-full mb-2">Currency Settings</Button>
                  <Button className="w-full mb-2">Tax Configuration</Button>
                  <Button className="w-full">Discount Rules</Button>
                </Card>
              </div>
              
              <div className="space-y-2">
                <h3 className="text-lg font-medium">User Management</h3>
                <Card className="p-4">
                  <Button className="w-full mb-2">Admin Users</Button>
                  <Button className="w-full mb-2">Staff Permissions</Button>
                  <Button className="w-full mb-2">Access Control</Button>
                  <Button className="w-full">Audit Logs</Button>
                </Card>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

const AdminDashboard = () => {
  const [stats] = useState({
    totalUsers: 342,
    newUsersToday: 18,
    totalOrders: 1567,
    pendingOrders: 28,
    revenue: '₹45,289.00',
    orderCompletionRate: '94%'
  });

  const [scheduledServices, setScheduledServices] = useState<Pickup[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [activeTab, setActiveTab] = useState('dashboard');

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
      name: 'Rahul Sharma',
      phone: '+91 98765 43210',
      email: 'rahul@example.com',
      address: '123 Bandra West, Mumbai',
      serviceType: 'wash-fold',
      pickup_date: '2025-04-15',
      time: '13:00',
      notes: 'Gate code: 1234',
      status: 'Pending',
      created_at: '2025-04-10T10:30:00Z'
    },
    {
      id: 2,
      name: 'Priya Patel',
      phone: '+91 87654 32109',
      email: 'priya@example.com',
      address: '456 Koramangala, Bangalore',
      serviceType: 'dry-cleaning',
      pickup_date: '2025-04-17',
      time: '10:00',
      notes: 'Silk sarees included',
      status: 'Confirmed',
      created_at: '2025-04-11T14:15:00Z'
    },
    {
      id: 3,
      name: 'Amit Kumar',
      phone: '+91 76543 21098',
      email: 'amit@example.com',
      address: '789 Connaught Place, Delhi',
      serviceType: 'express',
      pickup_date: '2025-04-20',
      time: '15:00',
      notes: '',
      status: 'Completed',
      created_at: '2025-04-12T09:00:00Z'
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

  const renderTabContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return (
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
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="w-full" 
                    onClick={() => setActiveTab('orders')}
                  >
                    View All Orders
                  </Button>
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
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="w-full"
                    onClick={() => setActiveTab('billing')}
                  >
                    View Reports
                  </Button>
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
                <Button onClick={() => setActiveTab('orders')}>View Orders</Button>
                <Button onClick={() => setActiveTab('billing')}>Process Payments</Button>
                <Button onClick={() => setActiveTab('settings')}>System Settings</Button>
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
                            { name: "Arjun Sharma", email: "arjun@example.com", date: "2 hours ago" },
                            { name: "Sneha Gupta", email: "sneha@example.com", date: "5 hours ago" },
                            { name: "Vinod Mehta", email: "vinod@example.com", date: "1 day ago" },
                            { name: "Ritu Mishra", email: "ritu@example.com", date: "2 days ago" },
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
                            { id: "#ORD-7893", customer: "Arjun Sharma", amount: "₹12,999", status: "Completed" },
                            { id: "#ORD-7894", customer: "Sneha Gupta", amount: "₹7,999", status: "Processing" },
                            { id: "#ORD-7895", customer: "Vinod Mehta", amount: "₹18,999", status: "Processing" },
                            { id: "#ORD-7896", customer: "Ritu Mishra", amount: "₹4,999", status: "Completed" },
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
        );
      case 'orders':
        return (
          <div className="space-y-6">
            <div className="flex items-center">
              <BackButton label="Back to Dashboard" onClick={() => setActiveTab('dashboard')} />
            </div>
            <h1 className="text-3xl font-bold">Orders Management</h1>
            <AdminOrders />
          </div>
        );
      case 'billing':
        return (
          <div className="space-y-6">
            <div className="flex items-center">
              <BackButton label="Back to Dashboard" onClick={() => setActiveTab('dashboard')} />
            </div>
            <h1 className="text-3xl font-bold">Billing Management</h1>
            <AdminBilling />
          </div>
        );
      case 'settings':
        return (
          <div className="space-y-6">
            <div className="flex items-center">
              <BackButton label="Back to Dashboard" onClick={() => setActiveTab('dashboard')} />
            </div>
            <h1 className="text-3xl font-bold">System Settings</h1>
            <AdminSettings />
          </div>
        );
      default:
        return null;
    }
  };

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
                <SidebarMenuButton 
                  isActive={activeTab === 'dashboard'} 
                  tooltip="Dashboard" 
                  onClick={() => setActiveTab('dashboard')}
                >
                  <LineChart className="mr-2" />
                  <span>Dashboard</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
              
              <SidebarMenuItem>
                <SidebarMenuButton 
                  isActive={activeTab === 'users'} 
                  tooltip="Users" 
                  onClick={() => navigate('/admin/users')}
                >
                  <Users className="mr-2" />
                  <span>User Management</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
              
              <SidebarMenuItem>
                <SidebarMenuButton 
                  isActive={activeTab === 'orders'} 
                  tooltip="Orders"
                  onClick={() => setActiveTab('orders')}
                >
                  <Package className="mr-2" />
                  <span>Orders</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
              
              <SidebarMenuItem>
                <SidebarMenuButton 
                  isActive={activeTab === 'billing'} 
                  tooltip="Billing"
                  onClick={() => setActiveTab('billing')}
                >
                  <CreditCard className="mr-2" />
                  <span>Billing</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
              
              <SidebarMenuItem>
                <SidebarMenuButton 
                  isActive={activeTab === 'settings'} 
                  tooltip="Settings"
                  onClick={() => setActiveTab('settings')}
                >
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
          {renderTabContent()}
        </SidebarInset>
      </SidebarProvider>
    </Layout>
  );
};

export default AdminDashboard;
