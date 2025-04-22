import { useState } from 'react';
import { Layout } from '@/components/Layout';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Check } from 'lucide-react';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import SubscriptionPayment from '@/components/SubscriptionPayment';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

const PricingPage = () => {
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'yearly'>('monthly');
  const [selectedPlan, setSelectedPlan] = useState<any>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const navigate = useNavigate();

  const requireAuth = (cb: () => void) => {
    const userRole = localStorage.getItem('userRole');
    if (!userRole) {
      toast.info('Please login to subscribe to a plan');
      navigate('/login');
    } else {
      cb();
    }
  };

  const pricingPlans = [
    {
      name: 'Basic',
      description: 'Perfect for individuals with occasional laundry needs',
      price: billingCycle === 'monthly' ? 1499 : 14999,
      features: [
        'Standard washing & drying',
        'Up to 10kg per month',
        '3-day turnaround',
        'Online tracking',
        'Standard packaging'
      ],
      popular: false,
      buttonText: 'Choose Basic'
    },
    {
      name: 'Premium',
      description: 'Ideal for families with regular laundry needs',
      price: billingCycle === 'monthly' ? 2999 : 29999,
      features: [
        'Premium washing & drying',
        'Up to 25kg per month',
        '2-day turnaround',
        'Online tracking',
        'Premium packaging',
        'Stain treatment included',
        'Garment repairs'
      ],
      popular: true,
      buttonText: 'Choose Premium'
    },
    {
      name: 'Business',
      description: 'For businesses with high volume requirements',
      price: billingCycle === 'monthly' ? 6999 : 69999,
      features: [
        'Commercial washing & drying',
        'Unlimited weight',
        '1-day turnaround',
        'Online tracking',
        'Premium packaging',
        'Stain treatment included',
        'Garment repairs',
        'Dedicated account manager',
        'Custom scheduling'
      ],
      popular: false,
      buttonText: 'Contact Sales'
    }
  ];

  const handleChoosePlan = (plan: any) => {
    if (plan.name === 'Business') {
      requireAuth(() => navigate('/contact'));
      return;
    }
    requireAuth(() => {
      setSelectedPlan(plan);
      setIsDialogOpen(true);
    });
  };

  return (
    <Layout>
      <section className="py-20">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-12">
            <h1 className="text-3xl font-bold tracking-tight mb-3">Simple, Transparent Pricing</h1>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Choose the perfect plan for your laundry needs. All plans include free pickup and delivery.
            </p>
          </div>

          <div className="flex justify-center mb-12">
            <div className="inline-flex items-center p-1 bg-secondary rounded-lg">
              <Button
                variant={billingCycle === 'monthly' ? 'default' : 'ghost'}
                size="sm"
                onClick={() => setBillingCycle('monthly')}
                className="relative"
              >
                Monthly
              </Button>
              <Button
                variant={billingCycle === 'yearly' ? 'default' : 'ghost'}
                size="sm"
                onClick={() => setBillingCycle('yearly')}
                className="relative"
              >
                Yearly
                <Badge 
                  variant="outline" 
                  className="absolute -top-2 -right-2 bg-primary text-primary-foreground px-1 py-0 text-xs"
                >
                  Save 15%
                </Badge>
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {pricingPlans.map((plan, index) => (
              <Card 
                key={index} 
                className={`glass-card relative overflow-hidden ${plan.popular ? 'border-primary shadow-lg' : ''}`}
              >
                {plan.popular && (
                  <div className="absolute top-0 right-0">
                    <Badge className="rounded-tl-none rounded-tr-none rounded-br-none bg-primary text-white px-2 py-1">
                      Most Popular
                    </Badge>
                  </div>
                )}
                <CardHeader>
                  <CardTitle>{plan.name}</CardTitle>
                  <CardDescription>{plan.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="mb-6">
                    <span className="text-3xl font-bold">
                      ₹{(plan.price/100).toFixed(2)}
                    </span>
                    <span className="text-muted-foreground">/{billingCycle === 'monthly' ? 'month' : 'year'}</span>
                  </div>
                  <ul className="space-y-3">
                    {plan.features.map((feature, i) => (
                      <li key={i} className="flex items-center">
                        <Check className="h-4 w-4 mr-2 text-primary" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
                <CardFooter>
                  <Button 
                    className={`w-full ${plan.popular ? 'btn-premium' : ''}`} 
                    variant={plan.popular ? 'default' : 'outline'}
                    onClick={() => handleChoosePlan(plan)}
                  >
                    {plan.buttonText}
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>

          <div className="mt-16 bg-secondary/50 rounded-lg p-6 max-w-3xl mx-auto">
            <h3 className="text-xl font-semibold mb-3">Need a custom plan?</h3>
            <p className="text-muted-foreground mb-4">
              Contact our sales team for a tailored solution that fits your specific requirements.
            </p>
            <Button variant="default" onClick={() => navigate('/contact')}>Contact Sales</Button>
          </div>
        </div>
      </section>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-md">
          {selectedPlan ? (
            <SubscriptionPayment
              plan={selectedPlan.name}
              price={selectedPlan.price/100}
              cycle={billingCycle}
              onClose={() => setIsDialogOpen(false)}
            />
          ) : null}
        </DialogContent>
      </Dialog>
    </Layout>
  );
};

export default PricingPage;
