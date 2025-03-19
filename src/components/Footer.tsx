
import { Link } from 'react-router-dom';
import { 
  FacebookIcon, 
  InstagramIcon, 
  TwitterIcon, 
  MailIcon, 
  PhoneIcon, 
  MapPinIcon, 
  ArrowUpIcon 
} from 'lucide-react';
import { Button } from '@/components/ui/button';

export function Footer() {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <footer className="bg-secondary pt-16 pb-8">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          <div className="space-y-4">
            <Link to="/" className="flex items-center space-x-2 text-primary font-bold text-2xl">
              <span>CleanWash</span>
            </Link>
            <p className="text-sm text-muted-foreground">
              Premium laundry services, delivering excellence, freshness, and convenience to your doorstep.
            </p>
            <div className="flex space-x-4">
              <SocialLink icon={<FacebookIcon className="h-5 w-5" />} href="#" />
              <SocialLink icon={<InstagramIcon className="h-5 w-5" />} href="#" />
              <SocialLink icon={<TwitterIcon className="h-5 w-5" />} href="#" />
            </div>
          </div>

          <div>
            <h4 className="font-semibold text-lg mb-4">Services</h4>
            <ul className="space-y-3">
              <FooterLink text="Wash & Fold" to="/services/wash-fold" />
              <FooterLink text="Dry Cleaning" to="/services/dry-cleaning" />
              <FooterLink text="Ironing Service" to="/services/ironing" />
              <FooterLink text="Stain Removal" to="/services/stain-removal" />
              <FooterLink text="Alterations" to="/services/alterations" />
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-lg mb-4">Quick Links</h4>
            <ul className="space-y-3">
              <FooterLink text="About Us" to="/about" />
              <FooterLink text="Pricing" to="/pricing" />
              <FooterLink text="FAQs" to="/faqs" />
              <FooterLink text="Track Order" to="/track" />
              <FooterLink text="Contact Us" to="/contact" />
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-lg mb-4">Contact Us</h4>
            <ul className="space-y-3">
              <li className="flex items-start">
                <MapPinIcon className="h-5 w-5 text-primary mr-2 mt-0.5" />
                <span className="text-sm">123 Laundry Street, Clean City, CC 10001</span>
              </li>
              <li className="flex items-center">
                <PhoneIcon className="h-5 w-5 text-primary mr-2" />
                <span className="text-sm">+1 (555) 123-4567</span>
              </li>
              <li className="flex items-center">
                <MailIcon className="h-5 w-5 text-primary mr-2" />
                <span className="text-sm">info@cleanwash.com</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-16 pt-8 border-t border-border flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} CleanWash. All rights reserved.
          </p>
          <div className="flex items-center space-x-6 mt-4 md:mt-0">
            <FooterLink text="Privacy Policy" to="/privacy" />
            <FooterLink text="Terms of Service" to="/terms" />
          </div>
          <Button
            size="icon"
            variant="outline"
            onClick={scrollToTop}
            className="mt-4 md:mt-0 rounded-full h-10 w-10"
            aria-label="Scroll to top"
          >
            <ArrowUpIcon className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </footer>
  );
}

const SocialLink = ({ icon, href }: { icon: React.ReactNode; href: string }) => (
  <a
    href={href}
    target="_blank"
    rel="noreferrer"
    className="h-10 w-10 flex items-center justify-center rounded-full bg-white text-primary hover:bg-primary hover:text-white transition-colors duration-200 shadow-sm"
  >
    {icon}
  </a>
);

const FooterLink = ({ text, to }: { text: string; to: string }) => (
  <li>
    <Link
      to={to}
      className="text-sm text-muted-foreground hover:text-foreground transition-colors duration-200"
    >
      {text}
    </Link>
  </li>
);
