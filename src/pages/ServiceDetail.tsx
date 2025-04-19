
import { useParams, useNavigate } from 'react-router-dom';
import { Layout } from '@/components/Layout';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Check, TriangleAlert, Star } from 'lucide-react';
import { toast } from 'sonner';

const ServiceDetail = () => {
  const { serviceId } = useParams();
  const navigate = useNavigate();

  // Service data mapping
  const services = {
    'wash-fold': {
      title: 'Wash & Fold',
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
      image: 'https://images.unsplash.com/photo-1582738411706-bfc8e691d1c2?q=80&w=1287&auto=format&fit=crop',
    },
    'dry-cleaning': {
      title: 'Dry Cleaning',
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
      image: 'https://images.unsplash.com/photo-1517677208171-0bc6725a3e60?q=80&w=1470&auto=format&fit=crop',
    },
    'express': {
      title: 'Express Service',
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
      image: 'https://images.unsplash.com/photo-1604335399105-a0c585fd81a1?q=80&w=1470&auto=format&fit=crop',
    },
    'stain-removal': {
      title: 'Stain Removal',
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
      image: 'https://images.unsplash.com/photo-1551761429-8232f9f5955c?q=80&w=1470&auto=format&fit=crop',
    },
    'alterations': {
      title: 'Alterations & Repairs',
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
      image: 'https://images.unsplash.com/photo-1517677208171-0bc6725a3e60?q=80&w=1470&auto=format&fit=crop',
    },
    'ironing': {
      title: 'Ironing & Pressing',
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
      image: 'https://images.unsplash.com/photo-1517677208171-0bc6725a3e60?q=80&w=1470&auto=format&fit=crop',
    },
  };

  const service = services[serviceId as keyof typeof services];

  // Handle case where service doesn't exist
  if (!service) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-20 text-center">
          <h1 className="text-2xl font-bold mb-4">Service Not Found</h1>
          <p className="mb-8">The service you're looking for doesn't exist.</p>
          <Button onClick={() => navigate('/services')}>View All Services</Button>
        </div>
      </Layout>
    );
  }

  // Navigate to the schedule page with the selected service
  const handleScheduleService = () => {
    // Pass the selected service to the schedule page
    navigate('/schedule', { state: { selectedService: serviceId } });
    toast.success(`You've selected ${service.title} service. Fill out the form to complete scheduling.`);
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 py-12">
        <Button 
          variant="ghost" 
          onClick={() => navigate('/services')} 
          className="mb-6 pl-0 hover:bg-transparent"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to all services
        </Button>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div>
            <h1 className="text-3xl font-bold mb-4">{service.title}</h1>
            <p className="text-muted-foreground mb-6">{service.description}</p>
            <p className="mb-8">{service.details}</p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
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
              <div className="flex items-start p-4 bg-amber-50 rounded-lg mb-8">
                <TriangleAlert className="h-5 w-5 text-amber-500 mr-2 mt-0.5" />
                <p className="text-sm text-amber-800">{service.alert}</p>
              </div>
            )}

            <div className="mb-8">
              <h2 className="text-xl font-semibold mb-4">What's included:</h2>
              <ul className="space-y-3">
                {service.inclusions.map((item, i) => (
                  <li key={i} className="flex items-start">
                    <Check className="h-5 w-5 text-primary mr-2 mt-0.5" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <Button className="btn-premium" onClick={handleScheduleService}>
              Schedule This Service
            </Button>
          </div>

          <div className="relative rounded-xl overflow-hidden h-[400px] lg:h-auto">
            <img
              src={service.image}
              alt={service.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent flex flex-col justify-end p-8">
              <div className="text-white">
                <div className="flex space-x-1 mb-2">
                  {[1, 2, 3, 4, 5].map((num) => (
                    <Star
                      key={num}
                      className="h-4 w-4 text-yellow-400 fill-yellow-400"
                    />
                  ))}
                </div>
                <p className="text-sm text-white/80">
                  Highly rated by our customers
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ServiceDetail;
