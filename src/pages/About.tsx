
import { Layout } from '@/components/Layout';
import { Leaf, CheckCircle, ShieldCheck } from 'lucide-react';

const About = () => {
  return (
    <Layout>
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-3xl mx-auto mb-16 text-center">
          <h1 className="text-4xl font-bold mb-6">About CleanWash</h1>
          <p className="text-xl text-muted-foreground">
            We're dedicated to providing the highest quality laundry and dry cleaning services with a commitment to sustainability and customer satisfaction.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-20">
          <div>
            <h2 className="text-2xl font-bold mb-4">Our Story</h2>
            <p className="mb-4">
              Founded in 2015, CleanWash began with a simple mission: to provide busy professionals with high-quality laundry services that save time without compromising on quality or environmental responsibility.
            </p>
            <p className="mb-4">
              What started as a small operation with just two washing machines has grown into a full-service laundry business serving thousands of satisfied customers across the city.
            </p>
            <p>
              Our team of dedicated professionals ensures that every garment is treated with care, using the latest technologies and eco-friendly practices to deliver exceptional results every time.
            </p>
          </div>
          <div className="h-[300px] md:h-auto relative rounded-lg overflow-hidden">
            <img 
              src="https://images.unsplash.com/photo-1604335399105-a0c585fd81a1?q=80&w=1470&auto=format&fit=crop" 
              alt="CleanWash facility" 
              className="absolute inset-0 w-full h-full object-cover"
            />
          </div>
        </div>

        <div className="mb-20">
          <h2 className="text-2xl font-bold mb-6 text-center">Our Values</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-card p-6 rounded-lg">
              <div className="flex items-center mb-4">
                <Leaf className="h-8 w-8 text-primary mr-3" />
                <h3 className="text-xl font-semibold">Sustainability</h3>
              </div>
              <p>
                We use energy-efficient machines and biodegradable detergents to minimize our environmental impact. Our water recycling systems help conserve this precious resource.
              </p>
            </div>
            <div className="bg-card p-6 rounded-lg">
              <div className="flex items-center mb-4">
                <CheckCircle className="h-8 w-8 text-primary mr-3" />
                <h3 className="text-xl font-semibold">Quality</h3>
              </div>
              <p>
                Every garment is sorted, inspected, and treated according to its specific needs. Our attention to detail ensures your clothes look their best after every service.
              </p>
            </div>
            <div className="bg-card p-6 rounded-lg">
              <div className="flex items-center mb-4">
                <ShieldCheck className="h-8 w-8 text-primary mr-3" />
                <h3 className="text-xl font-semibold">Reliability</h3>
              </div>
              <p>
                We understand that punctuality matters. That's why we guarantee on-time pickups and deliveries, with real-time tracking so you're never left wondering about your order status.
              </p>
            </div>
          </div>
        </div>

        <div>
          <h2 className="text-2xl font-bold mb-6 text-center">Why Choose CleanWash?</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-muted p-6 rounded-lg">
              <h3 className="text-xl font-semibold mb-3">Expertise & Experience</h3>
              <p>
                Our team includes certified fabric care specialists with years of experience handling all types of garments, from everyday wear to delicate designer pieces.
              </p>
            </div>
            <div className="bg-muted p-6 rounded-lg">
              <h3 className="text-xl font-semibold mb-3">Convenience</h3>
              <p>
                Our easy-to-use scheduling system, flexible pickup windows, and delivery options make laundry day stress-free. We work around your schedule, not the other way around.
              </p>
            </div>
            <div className="bg-muted p-6 rounded-lg">
              <h3 className="text-xl font-semibold mb-3">Transparency</h3>
              <p>
                Our pricing is clear and upfront with no hidden fees. Our detailed invoices show exactly what services were performed and what you're paying for.
              </p>
            </div>
            <div className="bg-muted p-6 rounded-lg">
              <h3 className="text-xl font-semibold mb-3">Customer Service</h3>
              <p>
                Our friendly and responsive customer service team is always ready to address any questions or concerns. We're not satisfied until you are.
              </p>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default About;
