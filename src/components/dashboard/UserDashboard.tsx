
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";
import { Calendar, Clock, Package, TrendingUp } from "lucide-react";
import { toast } from "sonner";

const UserDashboard = () => {
  const [userOrders, setUserOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [subscription, setSubscription] = useState<any>(null);

  useEffect(() => {
    // In a real application, this would fetch from Supabase
    // For now we'll use mock data for demonstration
    const loadData = async () => {
      try {
        // Simulate API call delay
        await new Promise(resolve => setTimeout(resolve, 1000));

        // Mock user orders
        const mockOrders = [
          { id: "USR-001", service: "Wash & Fold", items: 5, status: "Processing", date: "2025-04-20" },
          { id: "USR-002", service: "Dry Cleaning", items: 2, status: "Ready", date: "2025-04-18" },
        ];
        
        setUserOrders(mockOrders);
        
        // Get subscription from localStorage if available
        const savedSubscription = localStorage.getItem('userSubscription');
        if (savedSubscription) {
          setSubscription(JSON.parse(savedSubscription));
        }
      } catch (error) {
        console.error("Error loading user data:", error);
        toast.error("Failed to load your data. Please try again.");
      } finally {
        setIsLoading(false);
      }
    };
    
    loadData();
  }, []);

  const userMetrics = [
    { title: "Active Orders", value: userOrders.length, icon: <Package className="h-5 w-5" /> },
    { title: "Next Pickup", value: "Apr 24", icon: <Calendar className="h-5 w-5" /> },
    { title: "Delivery ETA", value: "Apr 26", icon: <Clock className="h-5 w-5" /> },
    { title: "Loyalty Points", value: "125", icon: <TrendingUp className="h-5 w-5" /> }
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <h2 className="text-2xl font-bold">Welcome back, {localStorage.getItem('userName') || 'User'}</h2>
        
        <div className="flex space-x-2">
          <Button asChild variant="outline">
            <Link to="/schedule">Schedule Pickup</Link>
          </Button>
          <Button asChild>
            <Link to="/track">Track Order</Link>
          </Button>
        </div>
      </div>

      {/* User metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {userMetrics.map((metric, index) => (
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
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Subscription info */}
      {subscription ? (
        <Card className="border-primary">
          <CardHeader>
            <CardTitle>Your Active Subscription</CardTitle>
            <CardDescription>
              {subscription.plan} Plan ({subscription.cycle === 'monthly' ? 'Monthly' : 'Yearly'})
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex justify-between items-center">
              <div>
                <p className="text-sm text-muted-foreground">
                  Renewal date: {new Date(subscription.expiryDate).toLocaleDateString()}
                </p>
                <p className="text-sm font-medium mt-2">
                  ₹{subscription.price.toFixed(2)}/{subscription.cycle === 'monthly' ? 'month' : 'year'}
                </p>
              </div>
              <Button size="sm" variant="outline">Manage Subscription</Button>
            </div>
          </CardContent>
        </Card>
      ) : (
        <Card>
          <CardHeader>
            <CardTitle>No Active Subscription</CardTitle>
            <CardDescription>
              Subscribe to a plan to get additional benefits and discounts
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button asChild>
              <Link to="/pricing">View Plans</Link>
            </Button>
          </CardContent>
        </Card>
      )}

      {/* Recent orders */}
      <Card>
        <CardHeader>
          <CardTitle>Your Recent Orders</CardTitle>
          <CardDescription>
            Track and manage your laundry orders
          </CardDescription>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="text-center py-4">Loading your orders...</div>
          ) : userOrders.length > 0 ? (
            <div className="space-y-4">
              {userOrders.map((order: any, index) => (
                <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                  <div>
                    <h3 className="font-medium">{order.service}</h3>
                    <p className="text-sm text-muted-foreground">Order {order.id} • {order.items} items</p>
                  </div>
                  <div className="flex items-center gap-4">
                    <Badge 
                      className={
                        order.status === "Ready" ? "bg-green-100 text-green-800" :
                        order.status === "Processing" ? "bg-blue-100 text-blue-800" :
                        "bg-yellow-100 text-yellow-800"
                      }
                    >
                      {order.status}
                    </Badge>
                    <Button variant="ghost" size="sm" asChild>
                      <Link to={`/track?id=${order.id}`}>Details</Link>
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8">
              <p className="text-muted-foreground mb-4">You have no recent orders</p>
              <Button asChild>
                <Link to="/schedule">Schedule Your First Pickup</Link>
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default UserDashboard;
