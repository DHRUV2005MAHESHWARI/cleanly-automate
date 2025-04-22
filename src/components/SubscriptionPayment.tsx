
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { useNavigate } from 'react-router-dom';

interface SubscriptionPaymentProps {
  plan: string;
  price: number;
  cycle: 'monthly' | 'yearly';
  onClose?: () => void;
}

const SubscriptionPayment = ({ plan, price, cycle, onClose }: SubscriptionPaymentProps) => {
  const [isProcessing, setIsProcessing] = useState(false);
  const navigate = useNavigate();

  const handlePayment = async () => {
    setIsProcessing(true);
    
    // In a real implementation, this would call a Stripe or other payment API
    // For demo purposes, we'll simulate a successful payment
    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Store subscription information in localStorage for demo purposes
      const subscriptionInfo = {
        plan,
        price,
        cycle,
        startDate: new Date().toISOString(),
        expiryDate: new Date(Date.now() + (cycle === 'monthly' ? 30 : 365) * 24 * 60 * 60 * 1000).toISOString()
      };
      
      localStorage.setItem('userSubscription', JSON.stringify(subscriptionInfo));
      
      toast.success(`Successfully subscribed to ${plan} plan!`);
      
      // Close modal if provided
      if (onClose) {
        onClose();
      }
      
      // Redirect to dashboard or another page
      navigate('/dashboard');
    } catch (error) {
      console.error('Payment error:', error);
      toast.error('Payment failed. Please try again.');
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-xl font-semibold mb-4">Subscribe to {plan} Plan</h2>
      
      <div className="mb-6">
        <p className="text-muted-foreground mb-2">Plan details:</p>
        <div className="bg-muted p-4 rounded-md">
          <div className="flex justify-between mb-2">
            <span>Plan:</span>
            <span className="font-medium">{plan}</span>
          </div>
          <div className="flex justify-between mb-2">
            <span>Billing cycle:</span>
            <span className="font-medium">{cycle === 'monthly' ? 'Monthly' : 'Yearly'}</span>
          </div>
          <div className="flex justify-between mb-2">
            <span>Amount:</span>
            <span className="font-medium">₹{price.toFixed(2)}</span>
          </div>
        </div>
      </div>
      
      <div className="mb-6">
        <p className="text-sm text-muted-foreground mb-4">
          By clicking "Pay Now", you agree to our terms and conditions and authorize us to charge your payment method.
        </p>
      </div>
      
      <div className="flex justify-end gap-3">
        {onClose && (
          <Button variant="outline" onClick={onClose} disabled={isProcessing}>
            Cancel
          </Button>
        )}
        <Button 
          onClick={handlePayment} 
          disabled={isProcessing} 
          className="btn-premium"
        >
          {isProcessing ? "Processing..." : `Pay ₹${price.toFixed(2)}`}
        </Button>
      </div>
    </div>
  );
};

export default SubscriptionPayment;
