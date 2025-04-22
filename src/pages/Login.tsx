
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Layout } from '@/components/Layout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { EyeIcon, EyeOffIcon, ShoppingBag, Mail, Lock } from 'lucide-react';
import { toast } from 'sonner';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { supabase } from '@/lib/supabase';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({ email: '', password: '' });
  const [userRole, setUserRole] = useState('user');
  const navigate = useNavigate();

  const validateForm = () => {
    const newErrors = { email: '', password: '' };
    let isValid = true;

    if (!email) {
      newErrors.email = 'Email is required';
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = 'Email is invalid';
      isValid = false;
    }

    if (!password) {
      newErrors.password = 'Password is required';
      isValid = false;
    } else if (password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const getUserNameFromEmail = (email: string) => {
    if (!email) return 'User';
    const prefix = email.split('@')[0];
    if (prefix.length > 0) {
      // Capitalize first letter
      return prefix.charAt(0).toUpperCase() + prefix.slice(1);
    }
    return 'User';
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    setIsLoading(true);
    
    // Admin credentials for demo
    if (userRole === 'admin' || (email === 'admin@example.com' && password === 'admin123')) {
      setTimeout(() => {
        setIsLoading(false);
        localStorage.setItem('userRole', 'admin');
        localStorage.setItem('userName', 'Admin');
        toast.success('Welcome back, Admin!');
        navigate('/admin');
      }, 1500);
      return;
    }
    
    // Staff role
    if (userRole === 'staff') {
      setTimeout(() => {
        setIsLoading(false);
        localStorage.setItem('userRole', 'staff');
        localStorage.setItem('userName', 'Staff');
        toast.success('Welcome back, Staff member!');
        navigate('/staff');
      }, 1500);
      return;
    }
    
    // Regular user login - User should be redirected to user dashboard or schedule page
    if (email && password) {
      setTimeout(() => {
        setIsLoading(false);
        localStorage.setItem('userRole', 'user');
        // Store userName as part before '@' in email, e.g. john for john@example.com
        const displayName = getUserNameFromEmail(email);
        localStorage.setItem('userName', displayName);
        toast.success('Successfully logged in!');
        // Redirect user to the schedule page instead of dashboard
        navigate('/schedule');
      }, 1500);
    } else {
      setIsLoading(false);
      toast.error('Please enter both email and password');
    }
  };

  return (
    <Layout>
      <section className="py-20">
        <div className="container mx-auto px-4 md:px-6 max-w-md">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Card className="glass-card">
              <CardHeader className="space-y-1 text-center">
                <div className="flex justify-center mb-2">
                  <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                    <ShoppingBag className="h-6 w-6" />
                  </div>
                </div>
                <CardTitle className="text-2xl">Welcome back</CardTitle>
                <CardDescription>
                  Enter your credentials to access your account
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="email"
                        type="email"
                        placeholder="name@example.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className={`pl-9 ${errors.email ? 'border-red-500' : ''}`}
                        autoComplete="email"
                      />
                    </div>
                    {errors.email && (
                      <p className="text-red-500 text-xs mt-1">{errors.email}</p>
                    )}
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <Label htmlFor="password">Password</Label>
                      <Link
                        to="/forgot-password"
                        className="text-sm text-primary hover:underline"
                      >
                        Forgot password?
                      </Link>
                    </div>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="password"
                        type={showPassword ? "text" : "password"}
                        placeholder="••••••••"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className={`pl-9 ${errors.password ? 'border-red-500' : ''}`}
                        autoComplete="current-password"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                        aria-label={showPassword ? "Hide password" : "Show password"}
                      >
                        {showPassword ? (
                          <EyeOffIcon className="h-4 w-4" />
                        ) : (
                          <EyeIcon className="h-4 w-4" />
                        )}
                      </button>
                    </div>
                    {errors.password && (
                      <p className="text-red-500 text-xs mt-1">{errors.password}</p>
                    )}
                  </div>
                  
                  <div className="space-y-2">
                    <Label>I am logging in as:</Label>
                    <RadioGroup
                      defaultValue="user"
                      value={userRole}
                      onValueChange={setUserRole}
                      className="flex flex-col space-y-1"
                    >
                      <div className="flex items-center space-x-2 rounded-md border p-2">
                        <RadioGroupItem value="user" id="user" />
                        <Label htmlFor="user" className="flex-1 cursor-pointer">User</Label>
                      </div>
                      <div className="flex items-center space-x-2 rounded-md border p-2">
                        <RadioGroupItem value="staff" id="staff" />
                        <Label htmlFor="staff" className="flex-1 cursor-pointer">Staff</Label>
                      </div>
                      <div className="flex items-center space-x-2 rounded-md border p-2">
                        <RadioGroupItem value="admin" id="admin" />
                        <Label htmlFor="admin" className="flex-1 cursor-pointer">Admin</Label>
                      </div>
                    </RadioGroup>
                  </div>
                  
                  <Button
                    type="submit"
                    className="w-full btn-premium"
                    disabled={isLoading}
                  >
                    {isLoading ? "Signing in..." : "Sign In"}
                  </Button>
                </form>

                <div className="mt-6">
                  <div className="relative">
                    <div className="absolute inset-0 flex items-center">
                      <Separator />
                    </div>
                    <div className="relative flex justify-center text-xs uppercase">
                      <span className="bg-card px-2 text-muted-foreground">
                        Or continue with
                      </span>
                    </div>
                  </div>

                  <div className="flex gap-2 mt-4">
                    <Button variant="outline" className="w-full">
                      <svg className="mr-2 h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M20.3081 10.2303C20.3081 9.55056 20.253 8.86711 20.1354 8.19836H12.7V12.0492H17.1046C16.9271 13.2911 16.1884 14.3898 15.0609 15.0879V17.5866H18.2254C20.1891 15.8449 21.3082 13.2728 21.3082 10.2303H20.3081Z" fill="#3F83F8"/>
                        <path d="M12.7 20.2701C15.1085 20.2701 17.1267 19.5583 18.2247 17.5867L15.0602 15.088C14.3211 15.5894 13.3804 15.8685 12.7 15.8685C10.1801 15.8685 8.06857 14.1815 7.40242 11.9363H4.15039V14.4922C5.78566 17.8691 9.22904 20.2701 12.7 20.2701Z" fill="#34A853"/>
                        <path d="M7.40298 11.9366C7.04498 10.9218 7.04498 9.82659 7.40298 8.81178V6.25586H4.15094C2.70639 9.11293 2.70639 11.6255 4.15094 14.4826L7.40298 11.9366Z" fill="#FBBC05"/>
                        <path d="M12.7 5.42864C13.9084 5.40971 15.0781 5.89733 15.9292 6.78463L18.7159 3.9979C17.0207 2.3935 14.8577 1.52145 12.7 1.5426C9.22904 1.5426 5.78566 3.94367 4.15039 7.3204L7.40242 9.87632C8.06857 7.63107 10.1801 5.94406 12.7 5.42864Z" fill="#EA4335"/>
                      </svg>
                      Google
                    </Button>
                    <Button variant="outline" className="w-full">
                      <svg className="mr-2 h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 16.9913 5.65687 21.1283 10.4375 21.8785V14.8906H7.89844V12H10.4375V9.79688C10.4375 7.29063 11.9304 5.90625 14.2146 5.90625C15.3087 5.90625 16.4531 6.10156 16.4531 6.10156V8.5625H15.1921C13.9499 8.5625 13.5625 9.33334 13.5625 10.1242V12H16.3359L15.8926 14.8906H13.5625V21.8785C18.3431 21.1283 22 16.9913 22 12Z" fill="#1877F2"/>
                        <path d="M15.8926 14.8906L16.3359 12H13.5625V10.1242C13.5625 9.33334 13.9499 8.5625 15.1921 8.5625H16.4531V6.10156C16.4531 6.10156 15.3087 5.90625 14.2146 5.90625C11.9304 5.90625 10.4375 7.29063 10.4375 9.79688V12H7.89844V14.8906H10.4375V21.8785C11.2849 22.0405 12.1519 22.0405 12.9994 21.8785V14.8906H15.8926Z" fill="white"/>
                      </svg>
                      Facebook
                    </Button>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex flex-col space-y-4">
                <div className="text-center text-sm">
                  Don't have an account?{" "}
                  <Link
                    to="/signup"
                    className="text-primary font-medium hover:underline"
                  >
                    Sign up
                  </Link>
                </div>
                <div className="text-center text-xs text-muted-foreground">
                  <p>Admin demo - use email: admin@example.com / password: admin123</p>
                </div>
              </CardFooter>
            </Card>
          </motion.div>
        </div>
      </section>
    </Layout>
  );
};

export default Login;

