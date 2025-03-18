
import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Layout } from '@/components/Layout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { Search, CheckCircle, Clock, Loader2, TruckIcon, Package, Shirt } from 'lucide-react';
import { Separator } from '@/components/ui/separator';

const TrackOrder = () => {
  const location = useLocation();
  const [orderIdInput, setOrderIdInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [trackingData, setTrackingData] = useState<null | TrackingData>(null);
  
  // Extract orderId from URL query params
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const orderId = params.get('id');
    
    if (orderId) {
      setOrderIdInput(orderId);
      handleTrackOrder(orderId);
    }
  }, [location.search]);

  // Mock tracking data
  interface TrackingData {
    orderId: string;
    status: 'pending' | 'pickedUp' | 'processing' | 'readyForDelivery' | 'outForDelivery' | 'delivered';
    customerName: string;
    items: number;
    orderDate: string;
    estimatedDelivery: string;
    steps: {
      name: string;
      status: 'completed' | 'current' | 'upcoming';
      time?: string;
      icon: React.ReactNode;
    }[];
  }

  const handleTrackOrder = (orderId: string) => {
    // No action if empty
    if (!orderId) return;
    
    setIsLoading(true);
    
    // Simulate API call with delay
    setTimeout(() => {
      // Mock data based on order ID
      const mockData: TrackingData = {
        orderId,
        status: 'processing',
        customerName: 'John Doe',
        items: 12,
        orderDate: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toLocaleDateString(),
        estimatedDelivery: new Date(Date.now() + 1 * 24 * 60 * 60 * 1000).toLocaleDateString(),
        steps: [
          {
            name: 'Order Placed',
            status: 'completed',
            time: '10:30 AM, ' + new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toLocaleDateString(),
            icon: <Package className="h-6 w-6" />,
          },
          {
            name: 'Picked Up',
            status: 'completed',
            time: '3:45 PM, ' + new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toLocaleDateString(),
            icon: <TruckIcon className="h-6 w-6" />,
          },
          {
            name: 'Processing',
            status: 'current',
            time: '9:20 AM, ' + new Date().toLocaleDateString(),
            icon: <Shirt className="h-6 w-6" />,
          },
          {
            name: 'Ready for Delivery',
            status: 'upcoming',
            icon: <Package className="h-6 w-6" />,
          },
          {
            name: 'Out for Delivery',
            status: 'upcoming',
            icon: <TruckIcon className="h-6 w-6" />,
          },
          {
            name: 'Delivered',
            status: 'upcoming',
            icon: <CheckCircle className="h-6 w-6" />,
          },
        ],
      };
      
      setTrackingData(mockData);
      setIsLoading(false);
    }, 1500);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleTrackOrder(orderIdInput);
  };

  return (
    <Layout>
      <section className="py-20">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-10">
              <h1 className="text-3xl font-bold mb-3">Track Your Order</h1>
              <p className="text-muted-foreground">
                Enter your order ID to check the current status of your laundry
              </p>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <Card className="glass-card mb-10">
                <CardContent className="pt-6">
                  <form onSubmit={handleSubmit} className="flex space-x-2">
                    <div className="relative flex-grow">
                      <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input
                        type="text"
                        placeholder="Enter your order ID (e.g., ORD-123456)"
                        value={orderIdInput}
                        onChange={(e) => setOrderIdInput(e.target.value)}
                        className="pl-9"
                      />
                    </div>
                    <Button type="submit" disabled={isLoading || !orderIdInput} className="btn-premium">
                      {isLoading ? 
                        <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Tracking...</> : 
                        "Track"
                      }
                    </Button>
                  </form>
                </CardContent>
              </Card>

              {isLoading ? (
                <div className="flex justify-center py-12">
                  <Loader2 className="h-8 w-8 animate-spin text-primary" />
                </div>
              ) : trackingData ? (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                >
                  <Card className="glass-card">
                    <CardContent className="pt-6">
                      <div className="flex justify-between items-start flex-wrap gap-4 mb-6">
                        <div>
                          <div className="text-sm text-muted-foreground mb-1">Order ID</div>
                          <div className="font-semibold">{trackingData.orderId}</div>
                        </div>
                        <div>
                          <div className="flex items-center">
                            <div className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-primary/10 text-primary">
                              {trackingData.status === 'pending' && 'Pending'}
                              {trackingData.status === 'pickedUp' && 'Picked Up'}
                              {trackingData.status === 'processing' && 'Processing'}
                              {trackingData.status === 'readyForDelivery' && 'Ready for Delivery'}
                              {trackingData.status === 'outForDelivery' && 'Out for Delivery'}
                              {trackingData.status === 'delivered' && 'Delivered'}
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                        <div>
                          <div className="text-sm text-muted-foreground mb-1">Customer</div>
                          <div className="font-medium">{trackingData.customerName}</div>
                        </div>
                        <div>
                          <div className="text-sm text-muted-foreground mb-1">Items</div>
                          <div className="font-medium">{trackingData.items} pieces</div>
                        </div>
                        <div>
                          <div className="text-sm text-muted-foreground mb-1">Order Date</div>
                          <div className="font-medium">{trackingData.orderDate}</div>
                        </div>
                      </div>

                      <div className="mb-6">
                        <div className="flex justify-between items-center mb-4">
                          <h3 className="font-semibold">Estimated Delivery</h3>
                          <div className="font-medium text-primary">{trackingData.estimatedDelivery}</div>
                        </div>
                        <div className="h-2 bg-secondary rounded-full overflow-hidden">
                          <div 
                            className="h-full bg-primary rounded-full" 
                            style={{ 
                              width: `${(trackingData.steps.filter(step => step.status === 'completed').length / trackingData.steps.length) * 100}%`
                            }}
                          ></div>
                        </div>
                      </div>

                      <Separator className="my-6" />

                      <div className="space-y-6">
                        <h3 className="font-semibold">Order Timeline</h3>
                        
                        <div className="relative">
                          {/* Vertical line */}
                          <div className="absolute top-0 left-6 h-full w-0.5 bg-secondary -ml-[1px]"></div>
                          
                          {trackingData.steps.map((step, index) => (
                            <div key={index} className="flex items-start mb-8 relative">
                              <div className={`h-12 w-12 rounded-full flex items-center justify-center z-10 mr-4 ${
                                step.status === 'completed' 
                                  ? 'bg-primary text-white' 
                                  : step.status === 'current'
                                  ? 'bg-primary/20 text-primary border-2 border-primary animate-pulse'
                                  : 'bg-secondary text-muted-foreground'
                              }`}>
                                {step.status === 'current' ? (
                                  <Clock className="h-5 w-5" />
                                ) : (
                                  step.icon
                                )}
                              </div>
                              <div className="flex-1">
                                <h4 className="font-medium text-base">{step.name}</h4>
                                {step.time && (
                                  <p className="text-sm text-muted-foreground">{step.time}</p>
                                )}
                                {step.status === 'current' && (
                                  <div className="text-sm text-primary mt-1">In progress</div>
                                )}
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ) : (
                orderIdInput && <p className="text-center text-muted-foreground py-6">No order found. Please check your order ID and try again.</p>
              )}
            </motion.div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default TrackOrder;
