
import { useState } from 'react';
import { Layout } from '@/components/Layout';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Link } from 'react-router-dom';
import { CheckCircle, DollarSign, ShieldCheck, Zap, Star, Shirt, Sparkles, Clock } from 'lucide-react';

const Pricing = () => {
  const [billingCycle, setBillingCycle] = useState('monthly');

  // Pricing data
  const pricingPlans = {
    standard: [
      {
        title: 'Basic',
        price: { monthly: '$1.99', yearly: '$1.79' },
        unit: '/lb',
        description: 'Perfect for regular clothes.',
        features: ['Regular clothes', '48-hour turnaround', 'Standard folding', 'Free delivery over $30'],
        cta: 'Get Started',
        link: '/order?plan=basic',
      },
      {
        title: 'Premium',
        price: { monthly: '$3.49', yearly: '$3.19' },
        unit: '/lb',
        description: 'For those who want extra care.',
        features: ['All clothes types', '24-hour turnaround', 'Premium folding', 'Free pickup & delivery', 'Stain treatment'],
        popular: true,
        cta: 'Get Started',
        link: '/order?plan=premium',
      },
      {
        title: 'Deluxe',
        price: { monthly: '$5.99', yearly: '$5.49' },
        unit: '/lb',
        description: 'The ultimate laundry experience.',
        features: ['All fabrics including delicates', 'Same-day service available', 'Premium folding', 'Free pickup & delivery', 'Stain treatment', 'Fragrance options'],
        cta: 'Get Started',
        link: '/order?plan=deluxe',
      },
    ],
    subscription: [
      {
        title: 'Monthly Basic',
        price: { monthly: '$69', yearly: '$59' },
        unit: '/month',
        description: '20 lbs of laundry per month.',
        features: ['Up to 20 lbs monthly', 'Scheduled pickups', 'Standard folding', 'Free delivery'],
        cta: 'Subscribe Now',
        link: '/order?subscription=basic',
      },
      {
        title: 'Monthly Plus',
        price: { monthly: '$119', yearly: '$99' },
        unit: '/month',
        description: '40 lbs of laundry per month.',
        features: ['Up to 40 lbs monthly', 'Scheduled pickups', 'Premium folding', 'Free pickup & delivery', 'Priority service'],
        popular: true,
        cta: 'Subscribe Now',
        link: '/order?subscription=plus',
      },
      {
        title: 'Family Plan',
        price: { monthly: '$179', yearly: '$149' },
        unit: '/month',
        description: '70 lbs of laundry per month.',
        features: ['Up to 70 lbs monthly', 'Weekly scheduled pickups', 'Premium folding', 'Free pickup & delivery', 'Priority service', 'Dedicated account manager'],
        cta: 'Subscribe Now',
        link: '/order?subscription=family',
      },
    ],
  };

  // Individual service prices
  const individualServices = [
    {
      title: 'Wash & Fold',
      price: '$1.99/lb',
      icon: <Shirt className="h-6 w-6" />,
    },
    {
      title: 'Dry Cleaning',
      price: 'From $5.99/item',
      icon: <Sparkles className="h-6 w-6" />,
    },
    {
      title: 'Express Service',
      price: '+50% charge',
      icon: <Clock className="h-6 w-6" />,
    },
    {
      title: 'Stain Removal',
      price: 'From $3.99/stain',
      icon: <Star className="h-6 w-6" />,
    },
  ];

  return (
    <Layout>
      {/* Hero Section */}
      <section className="py-20 bg-secondary">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl font-bold mb-6">Simple & Transparent Pricing</h1>
            <p className="text-xl text-muted-foreground mb-8">
              Choose the plan that fits your laundry needs, with no hidden fees or surprises.
            </p>
          </div>
        </div>
      </section>

      {/* Main Pricing Section */}
      <section className="py-20">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="text-3xl font-bold mb-3">Our Pricing Plans</h2>
            <p className="text-muted-foreground">
              Select between our standard pay-per-pound pricing or subscription plans for regular service.
            </p>
            
            <div className="flex justify-center mt-8">
              <div className="flex p-1 bg-secondary rounded-lg">
                <button
                  onClick={() => setBillingCycle('monthly')}
                  className={`px-4 py-2 rounded-md transition-all ${
                    billingCycle === 'monthly' ? 'bg-white shadow-sm' : 'hover:bg-secondary/80'
                  }`}
                >
                  Monthly
                </button>
                <button
                  onClick={() => setBillingCycle('yearly')}
                  className={`px-4 py-2 rounded-md transition-all ${
                    billingCycle === 'yearly' ? 'bg-white shadow-sm' : 'hover:bg-secondary/80'
                  }`}
                >
                  Yearly <span className="text-xs text-primary">Save 15%</span>
                </button>
              </div>
            </div>
          </div>

          <Tabs defaultValue="standard" className="w-full max-w-4xl mx-auto">
            <div className="flex justify-center mb-8">
              <TabsList>
                <TabsTrigger value="standard">Pay Per Pound</TabsTrigger>
                <TabsTrigger value="subscription">Subscription</TabsTrigger>
              </TabsList>
            </div>
            
            <TabsContent value="standard" className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {pricingPlans.standard.map((plan, i) => (
                  <Card 
                    key={i}
                    className={`glass-card rounded-xl overflow-hidden flex flex-col relative ${
                      plan.popular ? 'border-primary shadow-lg' : ''
                    }`}
                  >
                    {plan.popular && (
                      <div className="absolute top-0 right-0 bg-primary text-white px-3 py-1 text-xs font-medium rounded-bl-lg rounded-tr-xl">
                        Popular
                      </div>
                    )}
                    <CardContent className="p-6 flex flex-col h-full">
                      <h3 className="text-xl font-semibold mb-2">{plan.title}</h3>
                      <div className="mb-4">
                        <span className="text-3xl font-bold">{plan.price[billingCycle as keyof typeof plan.price]}</span>
                        <span className="text-muted-foreground">{plan.unit}</span>
                      </div>
                      <p className="text-muted-foreground text-sm mb-6">{plan.description}</p>
                      <ul className="space-y-3 mb-8 flex-grow">
                        {plan.features.map((feature, j) => (
                          <li key={j} className="flex items-center">
                            <CheckCircle className="h-4 w-4 text-primary mr-2" />
                            <span className="text-sm">{feature}</span>
                          </li>
                        ))}
                      </ul>
                      <Button 
                        asChild 
                        className={plan.popular ? 'btn-premium' : 'bg-secondary text-foreground hover:bg-secondary/80'}
                      >
                        <Link to={plan.link}>{plan.cta}</Link>
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
            
            <TabsContent value="subscription" className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {pricingPlans.subscription.map((plan, i) => (
                  <Card 
                    key={i}
                    className={`glass-card rounded-xl overflow-hidden flex flex-col relative ${
                      plan.popular ? 'border-primary shadow-lg' : ''
                    }`}
                  >
                    {plan.popular && (
                      <div className="absolute top-0 right-0 bg-primary text-white px-3 py-1 text-xs font-medium rounded-bl-lg rounded-tr-xl">
                        Best Value
                      </div>
                    )}
                    <CardContent className="p-6 flex flex-col h-full">
                      <h3 className="text-xl font-semibold mb-2">{plan.title}</h3>
                      <div className="mb-4">
                        <span className="text-3xl font-bold">{plan.price[billingCycle as keyof typeof plan.price]}</span>
                        <span className="text-muted-foreground">{plan.unit}</span>
                      </div>
                      <p className="text-muted-foreground text-sm mb-6">{plan.description}</p>
                      <ul className="space-y-3 mb-8 flex-grow">
                        {plan.features.map((feature, j) => (
                          <li key={j} className="flex items-center">
                            <CheckCircle className="h-4 w-4 text-primary mr-2" />
                            <span className="text-sm">{feature}</span>
                          </li>
                        ))}
                      </ul>
                      <Button 
                        asChild 
                        className={plan.popular ? 'btn-premium' : 'bg-secondary text-foreground hover:bg-secondary/80'}
                      >
                        <Link to={plan.link}>{plan.cta}</Link>
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </section>

      {/* Individual Services */}
      <section className="py-16 bg-secondary">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Individual Services</h2>
            <p className="text-muted-foreground">
              Need a specific service? Here's our à la carte pricing.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-4xl mx-auto">
            {individualServices.map((service, i) => (
              <Card key={i} className="glass-card p-6">
                <div className="flex flex-col items-center text-center">
                  <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center text-primary mb-4">
                    {service.icon}
                  </div>
                  <h3 className="font-semibold text-lg mb-2">{service.title}</h3>
                  <p className="text-primary font-semibold">{service.price}</p>
                </div>
              </Card>
            ))}
          </div>
          
          <div className="text-center mt-8">
            <Button asChild>
              <Link to="/services">View All Services</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Pricing Benefits */}
      <section className="py-16">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Why Choose Our Plans</h2>
            <p className="text-muted-foreground">
              Benefits that come with all of our pricing plans.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {[
              {
                icon: <ShieldCheck className="h-6 w-6" />,
                title: "Satisfaction Guarantee",
                description: "Not happy with our service? We'll rewash or reclean your items at no additional cost.",
              },
              {
                icon: <DollarSign className="h-6 w-6" />,
                title: "No Hidden Fees",
                description: "What you see is what you pay. No surprise charges or additional fees.",
              },
              {
                icon: <Zap className="h-6 w-6" />,
                title: "Flexible Scheduling",
                description: "Schedule pickups and deliveries at times that work for your busy life.",
              },
            ].map((benefit, i) => (
              <div key={i} className="text-center">
                <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center text-primary mx-auto mb-4">
                  {benefit.icon}
                </div>
                <h3 className="font-semibold text-lg mb-2">{benefit.title}</h3>
                <p className="text-muted-foreground">{benefit.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 bg-secondary">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Frequently Asked Questions</h2>
            <p className="text-muted-foreground">
              Answers to common questions about our pricing and plans.
            </p>
          </div>

          <div className="max-w-3xl mx-auto space-y-4">
            {[
              {
                question: "How does pay-per-pound pricing work?",
                answer: "With pay-per-pound pricing, we weigh your laundry when it arrives at our facility and charge based on the total weight. This is ideal for customers with varying laundry needs."
              },
              {
                question: "What if I exceed my subscription weight limit?",
                answer: "If you exceed your monthly weight allowance, we'll charge the additional weight at your plan's per-pound rate, which is discounted from our standard pricing."
              },
              {
                question: "Can I change or cancel my subscription?",
                answer: "Yes, you can upgrade, downgrade, or cancel your subscription at any time. Changes will take effect at the start of your next billing cycle."
              },
              {
                question: "Are there any additional fees?",
                answer: "We charge a small fee for stain treatment on particularly difficult stains, and there may be additional charges for special handling of delicate items or large/bulky items that require special care."
              },
              {
                question: "Do you offer discounts for large orders?",
                answer: "Yes! Orders over 50 pounds receive a 10% discount, and orders over 100 pounds receive a 15% discount on our standard pricing."
              },
            ].map((faq, i) => (
              <Card key={i} className="glass-card">
                <div className="p-6">
                  <h3 className="text-lg font-semibold mb-2">{faq.question}</h3>
                  <p className="text-muted-foreground">{faq.answer}</p>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-4">Ready to Get Started?</h2>
            <p className="text-xl text-muted-foreground mb-8">
              Choose a plan that works for you and start enjoying clean, fresh laundry without the hassle.
            </p>
            <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
              <Button size="lg" asChild className="btn-premium">
                <Link to="/order">Schedule Your First Pickup</Link>
              </Button>
              <Button size="lg" asChild variant="outline">
                <Link to="/contact">Have Questions? Contact Us</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Pricing;
