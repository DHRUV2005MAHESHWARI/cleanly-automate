
import { useState } from 'react';
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

const Schedule = () => {
  const [date, setDate] = useState<Date | undefined>(undefined);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    address: '',
    serviceType: 'standard',
    time: '',
    notes: '',
  });
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!date) {
      toast.error('Please select a pickup date');
      return;
    }
    
    if (!formData.time) {
      toast.error('Please select a pickup time');
      return;
    }
    
    // Here you would send the data to your backend/Supabase
    toast.success('Your service has been scheduled!');
    console.log({ ...formData, date });
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
                      defaultValue="standard" 
                      onValueChange={(value) => setFormData(prev => ({ ...prev, serviceType: value }))}
                      className="grid grid-cols-1 md:grid-cols-3 gap-4"
                    >
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="standard" id="standard" />
                        <Label htmlFor="standard" className="flex items-center cursor-pointer">
                          <Shirt className="h-4 w-4 mr-2 text-muted-foreground" /> Standard
                        </Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="express" id="express" />
                        <Label htmlFor="express" className="flex items-center cursor-pointer">
                          <Package className="h-4 w-4 mr-2 text-muted-foreground" /> Express
                        </Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="premium" id="premium" />
                        <Label htmlFor="premium" className="flex items-center cursor-pointer">
                          <Shirt className="h-4 w-4 mr-2 text-muted-foreground" /> Premium
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
                      <Select onValueChange={(value) => setFormData(prev => ({ ...prev, time: value }))}>
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
                  
                  <Button type="submit" className="w-full btn-premium">
                    Schedule Pickup
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
