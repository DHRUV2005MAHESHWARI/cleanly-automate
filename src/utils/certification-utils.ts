
import { Certification } from "@/lib/types";
import { supabase } from "@/lib/supabase";

// Calculate days until expiration
export const getDaysUntilExpiration = (expiryDate: string): number => {
  const today = new Date();
  const expiry = new Date(expiryDate);
  const diffTime = expiry.getTime() - today.getTime();
  return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
};

// Update certification status based on expiry date
export const updateCertificationStatus = async (): Promise<void> => {
  try {
    // Fetch all certifications
    const { data: certifications, error } = await supabase
      .from('certifications')
      .select('*');
      
    if (error) throw error;
    
    if (!certifications) return;
    
    // Process each certification
    for (const cert of certifications) {
      const daysUntilExpiry = getDaysUntilExpiration(cert.expires);
      let newStatus: 'Active' | 'Expiring Soon' | 'Expired';
      
      if (daysUntilExpiry < 0) {
        newStatus = 'Expired';
      } else if (daysUntilExpiry <= 30) {
        newStatus = 'Expiring Soon';
      } else {
        newStatus = 'Active';
      }
      
      // Only update if status changed
      if (newStatus !== cert.status) {
        await supabase
          .from('certifications')
          .update({ status: newStatus })
          .eq('id', cert.id);
      }
    }
  } catch (error) {
    console.error('Error updating certification statuses:', error);
  }
};
