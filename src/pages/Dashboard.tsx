
import { Layout } from "@/components/Layout";
import DashboardMetrics from "@/components/dashboard/DashboardMetrics";
import RecentOrders from "@/components/dashboard/RecentOrders";
import PendingPickups from "@/components/dashboard/PendingPickups";
import CustomerSummary from "@/components/dashboard/CustomerSummary";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const Dashboard = () => {
  return (
    <Layout>
      <div className="container mx-auto py-8 px-4">
        <h1 className="text-3xl font-bold mb-8">Admin Dashboard</h1>
        
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
              <div className="rounded-lg border bg-card text-card-foreground shadow-sm p-6">
                <h3 className="text-lg font-semibold mb-4">Inventory Management</h3>
                <p className="text-muted-foreground">Inventory management functionality will be implemented here.</p>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </Layout>
  );
};

export default Dashboard;
