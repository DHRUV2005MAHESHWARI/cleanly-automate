import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Layout } from '@/components/Layout';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { QualityContent } from '@/components/QualityContent';
import {
  Shirt,
  ShoppingBag,
  Clock,
  Sparkles,
  Scissors,
  Flame,
  Check,
  Star,
  TriangleAlert,
  Leaf,
} from 'lucide-react';

const Services = () => {
  // Service data
  const services = [
    {
      id: 'wash-fold',
      name: 'Wash & Fold',
      icon: <Shirt className="h-8 w-8" />,
      description: 'Our most popular service includes sorting, washing, drying, and folding your everyday items.',
      details: 'We carefully sort your laundry by color and fabric type to ensure the best care. After washing with premium detergents and fabric softeners, we dry and fold each item to perfection.',
      pricing: '$1.99/lb',
      timeEstimate: '48 hours',
      inclusions: [
        'Sorting by color and fabric type',
        'Stain pre-treatment',
        'Professional washing and drying',
        'Neat folding and packaging',
        'Basic repairs (button attachment)',
      ],
      alert: 'Minimum 10 lbs per order.',
    },
    {
      id: 'dry-cleaning',
      name: 'Dry Cleaning',
      icon: <ShoppingBag className="h-8 w-8" />,
      description: 'Professional treatment for your delicate items, suits, dresses, and other special garments.',
      details: 'Our dry cleaning service uses safe solvents and expert handling techniques to clean garments that cannot be washed with water, preserving their color, texture, and shape.',
      pricing: 'From $5.99/item',
      timeEstimate: '72 hours',
      inclusions: [
        'Garment inspection',
        'Stain treatment',
        'Professional dry cleaning',
        'Pressing and finishing',
        'Proper hanging and packaging',
      ],
      alert: 'Some stubborn stains may require additional treatments.',
    },
    {
      id: 'express',
      name: 'Express Service',
      icon: <Clock className="h-8 w-8" />,
      description: 'Need it fast? Our express service prioritizes your order for same-day or next-day completion.',
      details: 'Our express service is designed for urgent needs. Your items receive priority handling through our entire process while maintaining the same high-quality results.',
      pricing: '50% surcharge on regular services',
      timeEstimate: '3-8 hours (same day)',
      inclusions: [
        'Priority handling',
        'Same-day service for orders before 10 AM',
        'Next-day service for later orders',
        'SMS notification upon completion',
        'Express delivery option available',
      ],
      alert: 'Service availability depends on daily capacity and order volume.',
    },
    {
      id: 'stain-removal',
      name: 'Stain Removal',
      icon: <Sparkles className="h-8 w-8" />,
      description: 'Specialized treatments to remove stubborn stains from various fabrics and garments.',
      details: 'Our stain specialists use advanced techniques and professional products to target and remove difficult stains while preserving the integrity of your garments.',
      pricing: 'From $3.99/stain',
      timeEstimate: '48-72 hours',
      inclusions: [
        'Stain assessment',
        'Specialized treatment methods',
        'Multiple treatment rounds if needed',
        'Fabric-safe cleaning agents',
        'Post-treatment fabric conditioning',
      ],
      alert: 'Not all stains can be completely removed, especially set-in stains or those previously treated incorrectly.',
    },
    {
      id: 'alterations',
      name: 'Alterations & Repairs',
      icon: <Scissors className="h-8 w-8" />,
      description: 'Professional tailoring services for alterations, repairs, and restyling of your garments.',
      details: 'Our skilled tailors can handle everything from simple repairs to complex alterations, ensuring your garments fit perfectly and look their best.',
      pricing: 'From $7.99/item',
      timeEstimate: '3-5 days',
      inclusions: [
        'Free consultation and measurements',
        'Hemming and length adjustments',
        'Seam repairs and reinforcement',
        'Button replacement',
        'Zipper repair or replacement',
      ],
      alert: 'Complex alterations may require a longer timeframe and additional costs.',
    },
    {
      id: 'ironing',
      name: 'Ironing & Pressing',
      icon: <Flame className="h-8 w-8" />,
      description: 'Professional ironing and pressing service to give your clothes a crisp, wrinkle-free finish.',
      details: 'Our expert pressers use professional-grade equipment to ensure your garments are perfectly smoothed and ready to wear, saving you time and effort.',
      pricing: 'From $2.49/item',
      timeEstimate: '24-48 hours',
      inclusions: [
        'Professional pressing',
        'Steaming for delicate items',
        'Collar and cuff shaping',
        'Proper hanging or folding',
        'Garment protection bags',
      ],
      alert: 'Some fabrics may not be suitable for high-heat ironing.',
    },
  ];

  // Additional content
  const environmentContent = (
    <Card className="glass-card overflow-hidden">
      <CardContent className="p-0">
        <div className="grid grid-cols-1 md:grid-cols-2">
          <div className="p-6 md:p-8 flex flex-col justify-center">
            <div className="flex items-center text-primary mb-4">
              <Leaf className="h-6 w-6 mr-2" />
              <h3 className="text-xl font-semibold">Eco-Friendly Practices</h3>
            </div>
            <p className="text-muted-foreground mb-6">
              At CleanWash, we're committed to reducing our environmental footprint through sustainable laundry practices.
            </p>
            <ul className="space-y-3">
              {[
                'Energy-efficient machines',
                'Biodegradable detergents',
                'Water recycling systems',
                'Minimal plastic packaging',
                'Carbon offset delivery program',
              ].map((item, i) => (
                <li key={i} className="flex items-start">
                  <Check className="h-5 w-5 text-primary mr-2 mt-0.5" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
            <div className="mt-6">
              <Button variant="outline" asChild>
                <Link to="/about#sustainability">Learn More</Link>
              </Button>
            </div>
          </div>
          <div className="h-64 md:h-auto">
            <img
              src="https://images.unsplash.com/photo-1582738411706-bfc8e691d1c2?q=80&w=1287&auto=format&fit=crop"
              alt="Eco-friendly laundry"
              className="h-full w-full object-cover"
              loading="lazy"
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );

  return (
    <Layout>
      {/* Hero Section */}
      <section className="py-20 bg-secondary">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-3xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <h1 className="text-4xl font-bold mb-6">Our Premium Laundry Services</h1>
              <p className="text-xl text-muted-foreground mb-8">
                We offer a comprehensive range of laundry and dry cleaning services to meet all your fabric care needs.
              </p>
              <Button asChild size="lg" className="btn-premium">
                <Link to="/order">Schedule a Pickup</Link>
              </Button>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-20">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">Find the Perfect Service for Your Needs</h2>
            <p className="text-muted-foreground">
              Each service is delivered with care, expertise, and attention to detail.
            </p>
          </div>

          <Tabs defaultValue={services[0].id} className="w-full">
            <TabsList className="grid grid-cols-3 md:grid-cols-6 mb-12">
              {services.map((service) => (
                <TabsTrigger key={service.id} value={service.id} className="flex flex-col items-center py-3">
                  <div className="h-8 w-8 mb-2">{service.icon}</div>
                  <span className="text-xs">{service.name}</span>
                </TabsTrigger>
              ))}
            </TabsList>
            
            {services.map((service) => (
              <TabsContent key={service.id} value={service.id}>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  <Card className="glass-card overflow-hidden">
                    <CardContent className="p-0">
                      <div className="grid grid-cols-1 lg:grid-cols-2">
                        <div className="p-6 md:p-8">
                          <div className="flex items-center mb-4">
                            <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center text-primary mr-4">
                              {service.icon}
                            </div>
                            <h3 className="text-2xl font-semibold">{service.name}</h3>
                          </div>
                          
                          <p className="text-muted-foreground mb-6">
                            {service.description}
                          </p>
                          
                          <p className="mb-6">
                            {service.details}
                          </p>
                          
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                            <div>
                              <div className="text-sm text-muted-foreground mb-1">Pricing</div>
                              <div className="text-lg font-semibold text-primary">{service.pricing}</div>
                            </div>
                            <div>
                              <div className="text-sm text-muted-foreground mb-1">Turnaround Time</div>
                              <div className="text-lg font-semibold">{service.timeEstimate}</div>
                            </div>
                          </div>
                          
                          {service.alert && (
                            <div className="flex items-start p-4 bg-amber-50 rounded-lg mb-6">
                              <TriangleAlert className="h-5 w-5 text-amber-500 mr-2 mt-0.5" />
                              <p className="text-sm text-amber-800">{service.alert}</p>
                            </div>
                          )}
                          
                          <div className="mb-6">
                            <h4 className="font-semibold mb-3">What's included:</h4>
                            <ul className="space-y-2">
                              {service.inclusions.map((item, i) => (
                                <li key={i} className="flex items-start">
                                  <Check className="h-5 w-5 text-primary mr-2 mt-0.5" />
                                  <span>{item}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                          
                          <Button asChild className="btn-premium">
                            <Link to={`/order?service=${service.id}`}>Schedule this Service</Link>
                          </Button>
                        </div>
                        
                        <div className="hidden lg:block relative h-full">
                          <img
                            src={`https://images.unsplash.com/photo-1545173168-9f1947eebb7f?q=80&w=2071&auto=format&fit=crop`}
                            alt={service.name}
                            className="absolute inset-0 h-full w-full object-cover"
                            loading="lazy"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent flex flex-col justify-end p-8">
                            <div className="text-white">
                              <div className="chip bg-white/20 backdrop-blur-sm mb-3">Featured Service</div>
                              <h3 className="text-2xl font-semibold mb-2">{service.name}</h3>
                              <p className="text-sm text-white/80 mb-4">{service.description}</p>
                              <div className="flex space-x-1 mb-2">
                                {[1, 2, 3, 4, 5].map((star) => (
                                  <Star
                                    key={star}
                                    className="h-4 w-4 text-yellow-400 fill-yellow-400"
                                  />
                                ))}
                              </div>
                              <p className="text-sm text-white/80">
                                Loved by 98% of our customers
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              </TabsContent>
            ))}
          </Tabs>
        </div>
      </section>

      {/* Additional Sections */}
      <section className="py-20 bg-secondary">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div>
              <h2 className="text-2xl font-bold mb-6">Our Environmental Commitment</h2>
              {environmentContent}
            </div>
            <div>
              <h2 className="text-2xl font-bold mb-6">The CleanWash Quality Standard</h2>
              <QualityContent />
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-4">Ready to Experience Premium Laundry Service?</h2>
            <p className="text-xl text-muted-foreground mb-8">
              Join thousands of satisfied customers who have reclaimed their time by letting us handle their laundry needs.
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

export default Services;
