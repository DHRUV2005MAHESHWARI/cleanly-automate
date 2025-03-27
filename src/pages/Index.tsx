import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Layout } from '@/components/Layout';
import { ServiceCard } from '@/components/ServiceCard';
import { OrderProcess } from '@/components/OrderProcess';
import { TestimonialCard } from '@/components/TestimonialCard';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  ShoppingBag, 
  Shirt, 
  Ticket, 
  Sparkles, 
  Clock, 
  TruckIcon, 
  Smartphone, 
  Package, 
  CalendarCheck, 
  CheckCircle, 
  ArrowRight,
  Search
} from 'lucide-react';

const Index = () => {
  const [order, setOrder] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      const sections = document.querySelectorAll('.animate-section');
      sections.forEach((section) => {
        section.classList.add('opacity-100');
        section.classList.remove('opacity-0', 'translate-y-10');
      });
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  const handleOrderTrack = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    setTimeout(() => {
      setIsLoading(false);
      window.location.href = `/track?id=${order}`;
    }, 1000);
  };

  const services = [
    {
      title: 'Wash & Fold',
      description: 'Regular everyday laundry, washed, dried, and neatly folded.',
      icon: <Shirt className="h-6 w-6" />,
      price: 'From $1.99/lb',
      link: 'wash-fold',
    },
    {
      title: 'Dry Cleaning',
      description: 'Professional cleaning for your delicate and special garments.',
      icon: <ShoppingBag className="h-6 w-6" />,
      price: 'From $5.99/item',
      link: 'dry-cleaning',
    },
    {
      title: 'Express Service',
      description: 'Same-day service when you need your clothes cleaned fast.',
      icon: <Clock className="h-6 w-6" />,
      price: '+50% charge',
      link: 'express',
    },
    {
      title: 'Stain Removal',
      description: 'Specialized treatment to remove tough stains from your fabrics.',
      icon: <Sparkles className="h-6 w-6" />,
      price: 'From $3.99/stain',
      link: 'stain-removal',
    },
  ];

  const processSteps = [
    {
      number: 1,
      title: 'Schedule Pickup',
      description: 'Book a convenient time for us to collect your laundry.',
      icon: <CalendarCheck />,
    },
    {
      number: 2,
      title: 'We Collect',
      description: 'Our driver picks up your laundry from your doorstep.',
      icon: <TruckIcon />,
    },
    {
      number: 3,
      title: 'Cleaning Process',
      description: 'We clean, dry, and fold your clothes with care.',
      icon: <Sparkles />,
    },
    {
      number: 4,
      title: 'Delivery',
      description: 'Your fresh clothes delivered back to your door.',
      icon: <Package />,
    },
  ];

  const testimonials = [
    {
      name: 'Sarah Johnson',
      role: 'Busy Professional',
      content: 'CleanWash has changed my life! The pickup and delivery service saves me so much time, and my clothes have never looked better.',
      rating: 5,
      image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=150&auto=format&fit=crop',
    },
    {
      name: 'Michael Chen',
      role: 'Graduate Student',
      content: 'As a student with a packed schedule, their affordable laundry service is exactly what I needed. Great quality at reasonable prices!',
      rating: 4,
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=150&auto=format&fit=crop',
    },
    {
      name: 'Emily Rodriguez',
      role: 'Parent of Three',
      content: 'Having three kids means mountains of laundry. CleanWash has been a lifesaver! The subscription plan is perfect for our family.',
      rating: 5,
      image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=150&auto=format&fit=crop',
    },
  ];

  return (
    <Layout>
      <section className="pt-20 pb-16 lg:pt-28 lg:pb-24 overflow-hidden">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="space-y-6"
            >
              <div className="chip bg-secondary text-primary animate-fade-in">
                #1 Laundry Service in the City
              </div>
              <h1 className="h1">
                Premium Laundry Service <br className="hidden sm:block" />{" "}
                <span className="text-primary">Delivered to Your Door</span>
              </h1>
              <p className="p-lead max-w-md">
                Experience effortless cleanliness with our top-rated laundry service. Schedule a pickup and we'll take care of the rest.
              </p>
              <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4 pt-2">
                <Button asChild size="lg" className="btn-premium">
                  <Link to="/order">Schedule Pickup</Link>
                </Button>
                <Button asChild variant="outline" size="lg">
                  <Link to="/services">Our Services</Link>
                </Button>
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative"
            >
              <div className="relative h-[400px] sm:h-[500px] rounded-xl overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1545173168-9f1947eebb7f?q=80&w=2071&auto=format&fit=crop"
                  alt="Laundry Service"
                  className="h-full w-full object-cover"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                
                <div className="absolute bottom-6 left-6 right-6 glass-card rounded-lg p-4 backdrop-blur-lg">
                  <div className="flex items-center space-x-4">
                    <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                      <CheckCircle className="h-6 w-6" />
                    </div>
                    <div>
                      <h3 className="font-medium text-sm">100% Satisfaction Guarantee</h3>
                      <p className="text-xs text-muted-foreground">Not happy? We'll redo the service for free!</p>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="absolute -bottom-10 -right-10 glass-card rounded-lg p-4 shadow-lg hidden lg:block">
                <div className="grid grid-cols-2 gap-3">
                  <div className="text-center">
                    <p className="text-sm font-medium text-muted-foreground">Happy Customers</p>
                    <p className="text-2xl font-bold text-primary">10,000+</p>
                  </div>
                  <div className="text-center">
                    <p className="text-sm font-medium text-muted-foreground">Orders Completed</p>
                    <p className="text-2xl font-bold text-primary">50,000+</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-secondary">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-md mx-auto">
            <h2 className="h3 text-center mb-6">Track Your Order</h2>
            <form onSubmit={handleOrderTrack} className="flex space-x-2">
              <div className="relative flex-grow">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  type="text"
                  placeholder="Enter your order ID"
                  value={order}
                  onChange={(e) => setOrder(e.target.value)}
                  className="pl-9"
                />
              </div>
              <Button type="submit" disabled={isLoading || !order} className="btn-premium">
                {isLoading ? "Tracking..." : "Track"}
              </Button>
            </form>
          </div>
        </div>
      </section>

      <section className="py-20 animate-section opacity-0 translate-y-10 transition-all duration-700">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="h2 mb-3">Our Premium Services</h2>
            <p className="text-muted-foreground">
              We offer a range of professional laundry services to meet all your fabric care needs.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {services.map((service, index) => (
              <ServiceCard key={service.title} {...service} index={index} />
            ))}
          </div>

          <div className="mt-12 text-center">
            <Button asChild variant="outline">
              <Link to="/services">
                View All Services
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      <section className="py-20 bg-secondary animate-section opacity-0 translate-y-10 transition-all duration-700">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="h2 mb-3">How It Works</h2>
            <p className="text-muted-foreground">
              Our simple 4-step process makes laundry day effortless.
            </p>
          </div>

          <OrderProcess steps={processSteps} />
          
          <div className="mt-16 text-center">
            <Button asChild className="btn-premium">
              <Link to="/order">Schedule Your Pickup Now</Link>
            </Button>
          </div>
        </div>
      </section>

      <section className="py-20 animate-section opacity-0 translate-y-10 transition-all duration-700">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="order-2 lg:order-1">
              <div className="chip bg-secondary text-primary mb-4">Download Our App</div>
              <h2 className="h2 mb-4">Manage Everything From Your Phone</h2>
              <p className="text-muted-foreground mb-6">
                Schedule pickups, track orders, and manage your account on the go with our mobile app.
              </p>
              <ul className="space-y-4 mb-8">
                {[
                  { icon: <CalendarCheck className="h-5 w-5" />, text: "Easy scheduling and rescheduling" },
                  { icon: <Smartphone className="h-5 w-5" />, text: "Real-time order tracking" },
                  { icon: <Ticket className="h-5 w-5" />, text: "Exclusive app-only discounts" },
                ].map((item, i) => (
                  <li key={i} className="flex items-start">
                    <div className="h-6 w-6 rounded-full bg-primary/10 flex items-center justify-center text-primary mr-3 mt-0.5">
                      {item.icon}
                    </div>
                    <span>{item.text}</span>
                  </li>
                ))}
              </ul>
              <div className="flex space-x-4">
                <Button variant="outline" className="flex items-center space-x-2">
                  <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M17.9,19.9l-5.9,3.3c-0.2,0.1-0.4,0.1-0.5,0.1c-0.2,0-0.3,0-0.5-0.1l-5.9-3.3C4.4,19.5,4,18.8,4,18.1V5.9
                      c0-0.7,0.4-1.4,1-1.7l5.9-3.3c0.3-0.2,0.7-0.2,1,0l5.9,3.3c0.6,0.4,1,1,1,1.7v12.2C18.9,18.8,18.5,19.5,17.9,19.9z
                      M16.8,18.1V10L12,7.1L7.2,10v8.1L12,15L16.8,18.1z M12,13.4l-4.8,2.7V10.9l4.8-2.7l4.8,2.7v5.1L12,13.4z"></path>
                  </svg>
                  <span>Play Store</span>
                </Button>
                <Button variant="outline" className="flex items-center space-x-2">
                  <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M19.2,12c0-0.3,0-0.6-0.1-0.8c-0.1-0.4-0.3-0.7-0.6-1c-0.2-0.2-0.5-0.5-0.8-0.6c-0.5-0.2-1.1-0.2-1.6,0
                      c-0.3,0.1-0.6,0.4-0.9,0.6c0,0,0,0,0,0c-0.2-0.2-0.5-0.4-0.7-0.6c-0.5-0.3-1.1-0.3-1.6-0.2c-0.4,0.1-0.7,0.3-1,0.5
                      c-0.2-0.5-0.5-1-0.9-1.3C10.4,8,9.7,7.7,9,7.7C8.3,7.7,7.6,8,7.1,8.6C6.5,9.2,6.2,9.9,6.2,10.7v2.7c0,0.8,0.3,1.5,0.9,2.1
                      c0.5,0.5,1.3,0.8,2,0.8c0.7,0,1.5-0.3,2-0.8c0.4-0.4,0.7-0.9,0.8-1.5c0.1-0.1,0.1-0.2,0.2-0.2c0.2-0.2,0.5-0.3,0.8-0.3
                      c0.3,0,0.5,0.1,0.7,0.3c0.3,0.3,0.5,0.7,0.5,1.1c0,0.4-0.2,0.8-0.5,1.1c-0.2,0.2-0.5,0.3-0.7,0.3c-0.3,0-0.5-0.1-0.8-0.3
                      c-0.1-0.1-0.1-0.1-0.2-0.2c-0.1,0.6-0.4,1.1-0.8,1.5c-0.5,0.5-1.2,0.8-2,0.8c-0.7,0-1.5-0.3-2-0.8c-0.6-0.6-0.9-1.3-0.9-2.1v-2.7
                      c0-0.7,0.3-1.5,0.9-2c0.5-0.5,1.2-0.8,2-0.8c0.7,0,1.4,0.3,1.9,0.8c0.4,0.4,0.6,0.8,0.7,1.3c0.3-0.2,0.6-0.4,0.9-0.5c0.3-0.1,0.7-0.1,1,0
                      c0.2,0.1,0.4,0.3,0.5,0.4c0.1-0.1,0.3-0.3,0.5-0.4c0.3-0.1,0.7-0.1,1,0c0.2,0.1,0.4,0.2,0.5,0.4c0.2,0.2,0.4,0.5,0.4,0.8
                      C19.2,11.4,19.2,11.7,19.2,12z"></path>
                  </svg>
                  <span>App Store</span>
                </Button>
              </div>
            </div>
            <div className="order-1 lg:order-2 flex justify-center lg:justify-end">
              <div className="relative w-[280px] h-[560px]">
                <div className="absolute inset-0 bg-gradient-to-b from-primary/20 to-transparent rounded-[40px] animate-float"></div>
                <img
                  src="https://images.unsplash.com/photo-1563013544-824ae1b704d3?q=80&w=1287&auto=format&fit=crop"
                  alt="Mobile App"
                  className="w-full h-full object-cover rounded-[40px] shadow-xl"
                  style={{ objectPosition: "center top" }}
                  loading="lazy"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-secondary animate-section opacity-0 translate-y-10 transition-all duration-700">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="h2 mb-3">Simple & Transparent Pricing</h2>
            <p className="text-muted-foreground">
              Choose the plan that fits your laundry needs.
            </p>
          </div>

          <Tabs defaultValue="standard" className="w-full max-w-4xl mx-auto">
            <div className="flex justify-center mb-8">
              <TabsList>
                <TabsTrigger value="standard">Standard</TabsTrigger>
                <TabsTrigger value="subscription">Subscription</TabsTrigger>
              </TabsList>
            </div>
            
            <TabsContent value="standard" className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {[
                  {
                    title: 'Basic',
                    price: '$1.99',
                    unit: '/lb',
                    description: 'Perfect for regular clothes.',
                    features: ['Regular clothes', '48-hour turnaround', 'Standard folding', 'Free delivery over $30'],
                  },
                  {
                    title: 'Premium',
                    price: '$3.49',
                    unit: '/lb',
                    description: 'For those who want extra care.',
                    features: ['All clothes types', '24-hour turnaround', 'Premium folding', 'Free pickup & delivery', 'Stain treatment'],
                    popular: true,
                  },
                  {
                    title: 'Deluxe',
                    price: '$5.99',
                    unit: '/lb',
                    description: 'The ultimate laundry experience.',
                    features: ['All fabrics including delicates', 'Same-day service available', 'Premium folding', 'Free pickup & delivery', 'Stain treatment', 'Fragrance options'],
                  },
                ].map((plan, i) => (
                  <div 
                    key={i}
                    className={`glass-card rounded-xl p-6 flex flex-col relative ${
                      plan.popular ? 'border-primary shadow-lg' : ''
                    }`}
                  >
                    {plan.popular && (
                      <div className="absolute top-0 right-0 bg-primary text-white px-3 py-1 text-xs font-medium rounded-bl-lg rounded-tr-xl">
                        Popular
                      </div>
                    )}
                    <h3 className="text-xl font-semibold mb-2">{plan.title}</h3>
                    <div className="mb-4">
                      <span className="text-3xl font-bold">{plan.price}</span>
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
                      <Link to="/order">Get Started</Link>
                    </Button>
                  </div>
                ))}
              </div>
            </TabsContent>
            
            <TabsContent value="subscription" className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {[
                  {
                    title: 'Monthly Basic',
                    price: '$69',
                    unit: '/month',
                    description: '20 lbs of laundry per month.',
                    features: ['Up to 20 lbs monthly', 'Scheduled pickups', 'Standard folding', 'Free delivery'],
                  },
                  {
                    title: 'Monthly Plus',
                    price: '$119',
                    unit: '/month',
                    description: '40 lbs of laundry per month.',
                    features: ['Up to 40 lbs monthly', 'Scheduled pickups', 'Premium folding', 'Free pickup & delivery', 'Priority service'],
                    popular: true,
                  },
                  {
                    title: 'Family Plan',
                    price: '$179',
                    unit: '/month',
                    description: '70 lbs of laundry per month.',
                    features: ['Up to 70 lbs monthly', 'Weekly scheduled pickups', 'Premium folding', 'Free pickup & delivery', 'Priority service', 'Dedicated account manager'],
                  },
                ].map((plan, i) => (
                  <div 
                    key={i}
                    className={`glass-card rounded-xl p-6 flex flex-col relative ${
                      plan.popular ? 'border-primary shadow-lg' : ''
                    }`}
                  >
                    {plan.popular && (
                      <div className="absolute top-0 right-0 bg-primary text-white px-3 py-1 text-xs font-medium rounded-bl-lg rounded-tr-xl">
                        Best Value
                      </div>
                    )}
                    <h3 className="text-xl font-semibold mb-2">{plan.title}</h3>
                    <div className="mb-4">
                      <span className="text-3xl font-bold">{plan.price}</span>
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
                      <Link to="/order">Subscribe Now</Link>
                    </Button>
                  </div>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </section>

      <section className="py-20 animate-section opacity-0 translate-y-10 transition-all duration-700">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="h2 mb-3">What Our Customers Say</h2>
            <p className="text-muted-foreground">
              Read reviews from customers who love our laundry service.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((testimonial, index) => (
              <TestimonialCard key={index} {...testimonial} index={index} />
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-primary text-white animate-section opacity-0 translate-y-10 transition-all duration-700">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-6">Ready to Never Do Laundry Again?</h2>
            <p className="text-lg text-white/80 mb-8">
              Join thousands of satisfied customers who have reclaimed their time by letting us handle their laundry needs.
            </p>
            <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
              <Button size="lg" asChild className="bg-white text-primary hover:bg-white/90">
                <Link to="/signup">Get Started</Link>
              </Button>
              <Button size="lg" asChild variant="outline" className="text-white border-white hover:bg-white/10">
                <Link to="/contact">Contact Us</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

    </Layout>
  );
};

export default Index;
