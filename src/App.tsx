
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate, useLocation } from "react-router-dom";
import { ThemeProvider } from "@/components/ThemeProvider";
import { useState, useEffect } from "react";
import Index from "./pages/Index";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import TrackOrder from "./pages/TrackOrder";
import Services from "./pages/Services";
import ServiceDetail from "./pages/ServiceDetail";
import Pricing from "./pages/Pricing";
import Contact from "./pages/Contact";
import Dashboard from "./pages/Dashboard";
import Admin from "./pages/Admin";
import UserManagement from "./pages/admin/UserManagement";
import StaffManagement from "./pages/StaffManagement";
import Schedule from "./pages/Schedule";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

// Protected route component
const ProtectedRoute = ({ children, allowedRoles }: { children: JSX.Element, allowedRoles: string[] }) => {
  const userRole = localStorage.getItem('userRole');
  const location = useLocation();
  
  if (!userRole || !allowedRoles.includes(userRole)) {
    // Redirect to login if not authenticated or not authorized
    return <Navigate to="/login" state={{ from: location }} replace />;
  }
  
  return children;
};

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [userRole, setUserRole] = useState<string | null>(null);
  
  useEffect(() => {
    // Check if user is authenticated
    const role = localStorage.getItem('userRole');
    setUserRole(role);
    setIsAuthenticated(!!role);
  }, []);
  
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider defaultTheme="system">
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              {/* Public routes */}
              <Route path="/" element={<Index />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/track" element={<TrackOrder />} />
              <Route path="/services" element={<Services />} />
              <Route path="/services/:serviceId" element={<ServiceDetail />} />
              <Route path="/pricing" element={<Pricing />} />
              <Route path="/contact" element={<Contact />} />
              
              {/* Protected routes - User, Admin and Staff */}
              <Route path="/dashboard" element={
                <ProtectedRoute allowedRoles={['user', 'admin', 'staff']}>
                  <Dashboard />
                </ProtectedRoute>
              } />
              
              {/* Admin only routes */}
              <Route path="/admin" element={
                <ProtectedRoute allowedRoles={['admin']}>
                  <Admin />
                </ProtectedRoute>
              } />
              <Route path="/admin/users" element={
                <ProtectedRoute allowedRoles={['admin']}>
                  <UserManagement />
                </ProtectedRoute>
              } />
              
              {/* Staff only routes */}
              <Route path="/staff" element={
                <ProtectedRoute allowedRoles={['staff', 'admin']}>
                  <StaffManagement />
                </ProtectedRoute>
              } />
              
              {/* User routes that can be accessed by all logged in users */}
              <Route path="/schedule" element={
                <ProtectedRoute allowedRoles={['user', 'admin', 'staff']}>
                  <Schedule />
                </ProtectedRoute>
              } />
              
              {/* Add redirect from /order to /schedule */}
              <Route path="/order" element={<Navigate to="/schedule" replace />} />
              
              {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
};

export default App;
