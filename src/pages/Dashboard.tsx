
import { Layout } from "@/components/Layout";
import DashboardMetrics from "@/components/dashboard/DashboardMetrics";
import RecentOrders from "@/components/dashboard/RecentOrders";
import PendingPickups from "@/components/dashboard/PendingPickups";
import CustomerSummary from "@/components/dashboard/CustomerSummary";
import InventoryManagement from "@/components/admin/InventoryManagement";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const Dashboard = () => {
  return (
    <Layout>
      <div className="container mx-auto py-8 px-4">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
          <h1 className="text-3xl font-bold">Dashboard</h1>
          
          <div className="flex space-x-2">
            <Button asChild variant="outline">
              <Link to="/schedule">
                Schedule Service
              </Link>
            </Button>
            <Button asChild>
              <Link to="/track">
                Track Order
              </Link>
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
