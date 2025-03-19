
import { useState } from 'react';
import { Layout } from '@/components/Layout';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/components/ui/use-toast';
import { 
  MailIcon, 
  PhoneIcon, 
  MapPinIcon, 
  ClockIcon,
  SendIcon,
  CheckCircleIcon
} from 'lucide-react';

const Contact = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
      toast({
        title: "Message sent successfully!",
        description: "We'll get back to you as soon as possible.",
        variant: "default",
      });
      // Reset form after submission
      setFormData({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: '',
      });
      
      // Reset submitted state after a delay
      setTimeout(() => {
        setSubmitted(false);
      }, 3000);
    }, 1500);
  };

  return (
    <Layout>
      {/* Hero Section */}
      <section className="py-20 bg-secondary">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl font-bold mb-6">Get in Touch</h1>
            <p className="text-xl text-muted-foreground mb-8">
              Have questions or need assistance? We're here to help you with all your laundry needs.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Information */}
      <section className="py-16">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: <PhoneIcon className="h-6 w-6" />,
                title: 'Phone',
                content: '+1 (555) 123-4567',
                action: 'Call us',
                href: 'tel:+15551234567',
              },
              {
                icon: <MailIcon className="h-6 w-6" />,
                title: 'Email',
                content: 'info@cleanwash.com',
                action: 'Email us',
                href: 'mailto:info@cleanwash.com',
              },
              {
                icon: <MapPinIcon className="h-6 w-6" />,
                title: 'Address',
                content: '123 Laundry Street, Clean City, CC 10001',
                action: 'Get directions',
                href: 'https://maps.google.com',
              },
              {
                icon: <ClockIcon className="h-6 w-6" />,
                title: 'Business Hours',
                content: 'Mon-Sat: 8AM - 8PM Sunday: Closed',
                action: 'See hours',
                href: '/about#hours',
              },
            ].map((item, i) => (
              <Card key={i} className="glass-card p-6">
                <div className="flex flex-col items-center text-center">
                  <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center text-primary mb-4">
                    {item.icon}
                  </div>
                  <h3 className="font-semibold text-lg mb-2">{item.title}</h3>
                  <p className="text-muted-foreground mb-4">{item.content}</p>
                  <a 
                    href={item.href} 
                    className="text-primary hover:text-primary/80 text-sm font-medium"
                    target={item.href.startsWith('http') ? '_blank' : undefined}
                    rel={item.href.startsWith('http') ? 'noreferrer' : undefined}
                  >
                    {item.action}
                  </a>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form */}
      <section className="py-16 bg-secondary">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-6">Send Us a Message</h2>
              <p className="text-muted-foreground mb-8">
                Fill out the form below and our team will get back to you as soon as possible.
              </p>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label htmlFor="name" className="block text-sm font-medium">
                      Your Name
                    </label>
                    <Input
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="John Doe"
                      required
                      disabled={isSubmitting}
                    />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="email" className="block text-sm font-medium">
                      Email Address
                    </label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="john@example.com"
                      required
                      disabled={isSubmitting}
                    />
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label htmlFor="phone" className="block text-sm font-medium">
                      Phone Number
                    </label>
                    <Input
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="+1 (555) 123-4567"
                      disabled={isSubmitting}
                    />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="subject" className="block text-sm font-medium">
                      Subject
                    </label>
                    <Input
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      placeholder="Service Inquiry"
                      required
                      disabled={isSubmitting}
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <label htmlFor="message" className="block text-sm font-medium">
                    Your Message
                  </label>
                  <Textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="How can we help you?"
                    rows={6}
                    required
                    disabled={isSubmitting}
                  />
                </div>
                
                <Button
                  type="submit"
                  className="btn-premium"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <span className="flex items-center">
                      <svg className="animate-spin -ml-1 mr-2 h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Sending...
                    </span>
                  ) : submitted ? (
                    <span className="flex items-center">
                      <CheckCircleIcon className="h-4 w-4 mr-2" />
                      Sent!
                    </span>
                  ) : (
                    <span className="flex items-center">
                      <SendIcon className="h-4 w-4 mr-2" />
                      Send Message
                    </span>
                  )}
                </Button>
              </form>
            </div>
            
            <div className="hidden lg:block relative h-[600px] rounded-xl overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1507208773393-40d9fc670c31?q=80&w=1374&auto=format&fit=crop"
                alt="Customer service"
                className="h-full w-full object-cover"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent flex flex-col justify-end p-8">
                <div className="text-white">
                  <h3 className="text-2xl font-semibold mb-2">Customer Satisfaction Guaranteed</h3>
                  <p className="text-white/80 mb-4">
                    Our friendly customer service team is here to ensure your experience with CleanWash is nothing short of excellent.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Frequently Asked Questions</h2>
            <p className="text-muted-foreground">
              Find quick answers to common questions about our services.
            </p>
          </div>

          <div className="max-w-3xl mx-auto space-y-4">
            {[
              {
                question: "How do I schedule a pickup?",
                answer: "You can schedule a pickup through our website, mobile app, or by calling our customer service. Choose a convenient date and time, and our driver will arrive to collect your laundry."
              },
              {
                question: "What is your turnaround time?",
                answer: "Our standard turnaround time is 48 hours for wash & fold services. Express service is available for same-day or next-day delivery at an additional cost."
              },
              {
                question: "How are my clothes protected during the cleaning process?",
                answer: "We sort all items by color and fabric type, use gentle detergents, and follow care label instructions. Delicate items receive special handling to ensure they're properly cleaned without damage."
              },
              {
                question: "What happens if my clothing is damaged?",
                answer: "In the rare event that an item is damaged during our cleaning process, we'll reimburse you according to our damage policy. Please notify us within 48 hours of delivery to file a claim."
              },
              {
                question: "Do you offer subscription plans?",
                answer: "Yes! We offer weekly, bi-weekly, and monthly subscription plans at discounted rates. Check our pricing page for more details on subscription options."
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
          
          <div className="text-center mt-8">
            <p className="text-muted-foreground mb-4">
              Still have questions?
            </p>
            <Button asChild variant="outline">
              <a href="tel:+15551234567">Call Us at +1 (555) 123-4567</a>
            </Button>
          </div>
        </div>
      </section>

      {/* Location Map */}
      <section className="py-16 bg-secondary">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Find Us</h2>
            <p className="text-muted-foreground">
              Visit our main location or schedule a pickup from anywhere in the service area.
            </p>
          </div>
          
          <div className="rounded-xl overflow-hidden h-[400px] shadow-lg">
            {/* This would typically be a Google Maps or similar iframe */}
            <div className="w-full h-full bg-gray-200 flex items-center justify-center">
              <p className="text-muted-foreground">Interactive map would be displayed here</p>
            </div>
          </div>
          
          <div className="mt-8 text-center">
            <Button asChild variant="outline">
              <a
                href="https://maps.google.com"
                target="_blank"
                rel="noreferrer"
              >
                <MapPinIcon className="h-4 w-4 mr-2" />
                Get Directions
              </a>
            </Button>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Contact;
