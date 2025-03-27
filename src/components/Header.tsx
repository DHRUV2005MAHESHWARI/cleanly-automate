
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Menu, X, User, ShoppingBag, Sun, Moon, Monitor } from 'lucide-react';
import { ThemeToggle } from '@/components/ThemeToggle';

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ease-in-out ${
        isScrolled
          ? 'py-3 bg-white/90 dark:bg-background/90 backdrop-blur-md shadow-sm'
          : 'py-5 bg-transparent'
      }`}
    >
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex items-center justify-between">
          <Link 
            to="/" 
            className="flex items-center space-x-2 text-primary font-bold text-2xl transition-transform hover:scale-[1.03]"
          >
            <ShoppingBag className="h-6 w-6" />
            <span>CleanWash</span>
          </Link>

          {/* Desktop navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <NavLinks />
            <div className="flex items-center space-x-4">
              {/* Theme toggle positioned in the navbar on desktop */}
              <div className="hidden md:block">
                <ThemeToggle />
              </div>
              <Button variant="outline" asChild className="smooth-transition">
                <Link to="/login">
                  <User className="mr-1.5 h-4 w-4" />
                  Sign In
                </Link>
              </Button>
              <Button asChild className="btn-premium">
                <Link to="/signup">Sign Up</Link>
              </Button>
            </div>
          </nav>

          {/* Mobile menu button */}
          <button
            className="md:hidden flex items-center"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
          >
            {isMobileMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <div
        className={`md:hidden fixed inset-0 z-40 transform ${
          isMobileMenuOpen
            ? 'translate-x-0 opacity-100'
            : 'translate-x-full opacity-0'
        } transition-all duration-300 ease-in-out pt-20 bg-white dark:bg-background`}
      >
        <div className="container h-full flex flex-col px-4">
          <nav className="py-8 flex flex-col space-y-8 text-center">
            <NavLinks isMobile onClick={() => setIsMobileMenuOpen(false)} />
          </nav>
          <div className="mt-auto pb-8 flex flex-col space-y-4">
            {/* Mobile theme toggle */}
            <div className="flex justify-center mb-4">
              <ThemeToggle />
            </div>
            <Button variant="outline" asChild className="w-full">
              <Link to="/login" onClick={() => setIsMobileMenuOpen(false)}>Sign In</Link>
            </Button>
            <Button asChild className="w-full btn-premium">
              <Link to="/signup" onClick={() => setIsMobileMenuOpen(false)}>Sign Up</Link>
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
}

const NavLinks = ({ 
  isMobile = false, 
  onClick 
}: { 
  isMobile?: boolean;
  onClick?: () => void;
}) => {
  const links = [
    { name: 'Home', path: '/' },
    { name: 'Services', path: '/services' },
    { name: 'Pricing', path: '/pricing' },
    { name: 'Track Order', path: '/track' },
    { name: 'Contact', path: '/contact' },
    { name: 'Schedule', path: '/schedule' },
  ];

  return (
    <>
      {links.map((link) => (
        <Link
          key={link.name}
          to={link.path}
          className={`${
            isMobile
              ? 'text-lg font-medium py-2'
              : 'text-sm font-medium hover:text-primary'
          } smooth-transition`}
          onClick={onClick}
        >
          {link.name}
        </Link>
      ))}
    </>
  );
};
