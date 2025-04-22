
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

  // Check if user is authenticated (has userRole)
  const isAuthenticated = !!localStorage.getItem('userRole');

  const handlePayment = async () => {
    setIsProcessing(true);

    if (!isAuthenticated) {
      setIsProcessing(false);
      toast.info("Please login to subscribe to a plan.");
      navigate("/login");
      return;
    }

    // Simulate payment demo
    try {
      await new Promise(resolve => setTimeout(resolve, 2000));
      // Save as mock
      const subscriptionInfo = {
        plan,
        price,
        cycle,
        startDate: new Date().toISOString(),
        expiryDate: new Date(Date.now() + (cycle === 'monthly' ? 30 : 365) * 24 * 60 * 60 * 1000).toISOString()
      };

      localStorage.setItem('userSubscription', JSON.stringify(subscriptionInfo));
      toast.success(`Successfully subscribed to ${plan} plan!`);
      if (onClose) onClose();
      navigate('/dashboard');
    } catch (error) {
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
        <p className="text-sm text-muted-foreground mb-2">
          <span className="font-semibold text-destructive">*</span> This is a demo payment screen.<br/>
          <span className="font-semibold">To enable real payment processing, please connect Supabase and Stripe.</span>
        </p>
        <p className="text-xs text-muted-foreground mb-3 border-l-4 border-primary pl-2">
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
          disabled={isProcessing || !isAuthenticated}
          className="btn-premium"
        >
          {isAuthenticated
            ? (isProcessing ? "Processing..." : `Pay ₹${price.toFixed(2)}`)
            : "Login to Pay"}
        </Button>
      </div>
    </div>
  );
};

export default SubscriptionPayment;
