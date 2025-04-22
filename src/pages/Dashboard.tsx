import { useState, useEffect } from "react";
import { Layout } from "@/components/Layout";
import DashboardMetrics from "@/components/dashboard/DashboardMetrics";
import RecentOrders from "@/components/dashboard/RecentOrders";
import PendingPickups from "@/components/dashboard/PendingPickups";
import CustomerSummary from "@/components/dashboard/CustomerSummary";
import InventoryManagement from "@/components/admin/InventoryManagement";
import UserDashboard from "@/components/dashboard/UserDashboard";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";

const Dashboard = () => {
  const [userRole, setUserRole] = useState<string | null>(null);
  const navigate = useNavigate();

  // Helper for authentication redirect
  const requireAuth = (cb: () => void) => {
    const userRole = localStorage.getItem('userRole');
    if (!userRole) {
      navigate('/login');
    } else {
      cb();
    }
  };

  useEffect(() => {
    // Check user role and redirect if needed
    const role = localStorage.getItem('userRole');
    setUserRole(role);
    
    if (!role) {
      toast.error('Please login to access the dashboard');
      navigate('/login');
    }
  }, [navigate]);

  // If the user is not logged in or we're still checking auth, show loading
  if (!userRole) {
    return (
      <Layout>
        <div className="container mx-auto py-8 px-4 flex justify-center items-center min-h-[60vh]">
          <p>Loading dashboard...</p>
        </div>
      </Layout>
    );
  }

  // For regular users, show the user dashboard
  if (userRole === 'user') {
    return (
      <Layout>
        <div className="container mx-auto py-8 px-4">
          <UserDashboard />
        </div>
      </Layout>
    );
  }

  // For admin or staff, show the admin dashboard
  return (
    <Layout>
      <div className="container mx-auto py-8 px-4">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
          <h1 className="text-3xl font-bold">Dashboard</h1>
          <div className="flex space-x-2">
            <Button
              variant="outline"
              onClick={() => requireAuth(() => navigate('/schedule'))}
            >
              Schedule Service
            </Button>
            <Button
              onClick={() => requireAuth(() => navigate('/track'))}
            >
              Track Order
            </Button>
          </div>
        </div>
        
        {/* Dashboard Overview */}
        <DashboardMetrics />
        
        {/* Main Dashboard Content */}
        <div className="mt-8">
          <Tabs defaultValue="orders" className="w-full">
            <TabsList className="grid w-full grid-cols-4 mb-8">
              <TabsTrigger value="orders">Orders</TabsTrigger>
              <TabsTrigger value="customers">Customers</TabsTrigger>
              <TabsTrigger value="pickups">Pickups & Delivery</TabsTrigger>
              <TabsTrigger value="inventory">Inventory</TabsTrigger>
            </TabsList>
            
            <TabsContent value="orders" className="space-y-6">
              <RecentOrders />
            </TabsContent>
            
            <TabsContent value="customers" className="space-y-6">
              <CustomerSummary />
            </TabsContent>
            
            <TabsContent value="pickups" className="space-y-6">
              <PendingPickups />
            </TabsContent>
            
            <TabsContent value="inventory" className="space-y-6">
              <InventoryManagement />
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </Layout>
  );
};

export default Dashboard;
