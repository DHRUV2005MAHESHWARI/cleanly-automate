
import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Layout } from '@/components/Layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Calendar as CalendarIcon, Clock, Package, Shirt, MapPin } from 'lucide-react';
import { format } from 'date-fns';
import { toast } from 'sonner';
import { supabase } from '@/lib/supabase';
import { Pickup } from '@/lib/types';

interface LocationState {
  selectedService?: string;
}

const Schedule = () => {
  const location = useLocation();
  const locationState = location.state as LocationState;
  
  const [date, setDate] = useState<Date | undefined>(undefined);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    address: '',
    serviceType: locationState?.selectedService || 'standard',
    time: '',
    notes: '',
  });
  
  // Update the service type if it was passed from the ServiceDetail page
  useEffect(() => {
    if (locationState?.selectedService) {
      setFormData(prev => ({ ...prev, serviceType: locationState.selectedService }));
    }
  }, [locationState]);
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const savePickupToDatabase = async (pickupData: Partial<Pickup>) => {
    try {
      const { data, error } = await supabase
        .from('pickups')
        .insert([pickupData]);
        
      if (error) {
        console.error('Error saving pickup:', error);
        throw new Error(error.message);
      }
      
      return data;
    } catch (error) {
      console.error('Error in savePickupToDatabase:', error);
      throw error;
    }
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!date) {
      toast.error('Please select a pickup date');
      return;
    }
    
    if (!formData.time) {
      toast.error('Please select a pickup time');
      return;
    }

    if (!formData.name || !formData.phone || !formData.email || !formData.address) {
      toast.error('Please fill in all required fields');
      return;
    }
    
    try {
      setIsSubmitting(true);
      
      // Format the date to ISO string for database storage
      const pickupData: Partial<Pickup> = {
        ...formData,
        pickup_date: date.toISOString().split('T')[0],
        created_at: new Date().toISOString(),
        status: 'Pending'
      };
      
      await savePickupToDatabase(pickupData);
      
      toast.success('Your pickup has been scheduled successfully!');
      console.log('Saved pickup data:', pickupData);
      
      // Reset form after successful submission
      setDate(undefined);
      setFormData({
        name: '',
        phone: '',
        email: '',
        address: '',
        serviceType: 'standard',
        time: '',
        notes: '',
      });
    } catch (error) {
      toast.error('Failed to schedule pickup. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };
  
  // Map service types to display names
  const getServiceDisplayName = (serviceType: string): string => {
    const serviceNames: Record<string, string> = {
      'wash-fold': 'Wash & Fold',
      'dry-cleaning': 'Dry Cleaning',
      'express': 'Express Service',
      'stain-removal': 'Stain Removal',
      'alterations': 'Alterations & Repairs',
      'ironing': 'Ironing & Pressing',
      'standard': 'Standard Service',
      'premium': 'Premium Service'
    };
    
    return serviceNames[serviceType] || serviceType;
  };
  
  return (
    <Layout>
      <section className="py-20">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-10">
              <h1 className="text-3xl font-bold mb-3">Schedule a Pickup</h1>
              <p className="text-muted-foreground">
                Book your laundry service in just a few simple steps
              </p>
              {locationState?.selectedService && (
                <div className="mt-4 inline-block bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium">
                  Selected service: {getServiceDisplayName(locationState.selectedService)}
                </div>
              )}
            </div>
            
            <Card className="glass-card">
              <CardHeader>
                <CardTitle>Pickup Details</CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="name">Full Name</Label>
                      <Input 
                        id="name" 
                        name="name" 
                        value={formData.name} 
                        onChange={handleChange} 
                        required 
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone Number</Label>
                      <Input 
                        id="phone" 
                        name="phone" 
                        value={formData.phone} 
                        onChange={handleChange} 
                        required 
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="email">Email Address</Label>
                    <Input 
                      id="email" 
                      name="email" 
                      type="email" 
                      value={formData.email} 
                      onChange={handleChange} 
                      required 
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="address">Pickup Address</Label>
                    <div className="relative">
                      <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input 
                        id="address" 
                        name="address" 
                        value={formData.address} 
                        onChange={handleChange} 
                        className="pl-9"
                        required 
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-3">
                    <Label>Service Type</Label>
                    <RadioGroup 
                      value={formData.serviceType}
                      onValueChange={(value) => setFormData(prev => ({ ...prev, serviceType: value }))}
                      className="grid grid-cols-1 md:grid-cols-3 gap-4"
                    >
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="wash-fold" id="wash-fold" />
                        <Label htmlFor="wash-fold" className="flex items-center cursor-pointer">
                          <Shirt className="h-4 w-4 mr-2 text-muted-foreground" /> Wash & Fold
                        </Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="dry-cleaning" id="dry-cleaning" />
                        <Label htmlFor="dry-cleaning" className="flex items-center cursor-pointer">
                          <Shirt className="h-4 w-4 mr-2 text-muted-foreground" /> Dry Cleaning
                        </Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="express" id="express" />
                        <Label htmlFor="express" className="flex items-center cursor-pointer">
                          <Package className="h-4 w-4 mr-2 text-muted-foreground" /> Express
                        </Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="stain-removal" id="stain-removal" />
                        <Label htmlFor="stain-removal" className="flex items-center cursor-pointer">
                          <Shirt className="h-4 w-4 mr-2 text-muted-foreground" /> Stain Removal
                        </Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="alterations" id="alterations" />
                        <Label htmlFor="alterations" className="flex items-center cursor-pointer">
                          <Shirt className="h-4 w-4 mr-2 text-muted-foreground" /> Alterations
                        </Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="ironing" id="ironing" />
                        <Label htmlFor="ironing" className="flex items-center cursor-pointer">
                          <Shirt className="h-4 w-4 mr-2 text-muted-foreground" /> Ironing
                        </Label>
                      </div>
                    </RadioGroup>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label>Pickup Date</Label>
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button
                            variant="outline"
                            className="w-full justify-start text-left"
                          >
                            <CalendarIcon className="mr-2 h-4 w-4" />
                            {date ? format(date, 'PPP') : <span>Select a date</span>}
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0">
                          <Calendar
                            mode="single"
                            selected={date}
                            onSelect={setDate}
                            initialFocus
                            disabled={(date) => {
                              const today = new Date();
                              today.setHours(0, 0, 0, 0);
                              return date < today;
                            }}
                          />
                        </PopoverContent>
                      </Popover>
                    </div>
                    
                    <div className="space-y-2">
                      <Label>Pickup Time</Label>
                      <Select 
                        value={formData.time} 
                        onValueChange={(value) => setFormData(prev => ({ ...prev, time: value }))}
                      >
                        <SelectTrigger className="w-full">
                          <div className="flex items-center">
                            <Clock className="mr-2 h-4 w-4 text-muted-foreground" />
                            <SelectValue placeholder="Select a time" />
                          </div>
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="9:00">9:00 AM - 10:00 AM</SelectItem>
                          <SelectItem value="10:00">10:00 AM - 11:00 AM</SelectItem>
                          <SelectItem value="11:00">11:00 AM - 12:00 PM</SelectItem>
                          <SelectItem value="13:00">1:00 PM - 2:00 PM</SelectItem>
                          <SelectItem value="14:00">2:00 PM - 3:00 PM</SelectItem>
                          <SelectItem value="15:00">3:00 PM - 4:00 PM</SelectItem>
                          <SelectItem value="16:00">4:00 PM - 5:00 PM</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="notes">Special Instructions (Optional)</Label>
                    <Input 
                      id="notes" 
                      name="notes" 
                      value={formData.notes} 
                      onChange={handleChange} 
                    />
                  </div>
                  
                  <Button 
                    type="submit" 
                    className="w-full btn-premium"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? 'Scheduling...' : 'Schedule Pickup'}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Schedule;
