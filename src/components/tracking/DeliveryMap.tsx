
import { useState, useEffect, useRef } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { MapPin, Navigation, Truck } from 'lucide-react';

// Make sure we have the correct type definitions for Google Maps
// No need to import the .d.ts file directly

const DeliveryMap = ({ orderId }: { orderId: string }) => {
  const mapRef = useRef<HTMLDivElement>(null);
  const [locationPermission, setLocationPermission] = useState<boolean>(false);
  const [mapLoaded, setMapLoaded] = useState<boolean>(false);
  
  // Mock delivery location - this would come from your backend in a real app
  const deliveryLocation = { lat: 40.7128, lng: -74.006 };
  
  // Mock driver location - this would come from your backend in a real app
  const [driverLocation, setDriverLocation] = useState({ lat: 40.7028, lng: -74.016 });
  
  // Initialize Google Maps
  useEffect(() => {
    // Check if Google Maps API is loaded
    if (!window.google) {
      const script = document.createElement('script');
      script.src = `https://maps.googleapis.com/maps/api/js?key=YOUR_API_KEY&libraries=places`;
      script.async = true;
      script.defer = true;
      script.onload = () => {
        setMapLoaded(true);
      };
      document.head.appendChild(script);
      return;
    } else {
      setMapLoaded(true);
    }
  }, []);
  
  // Initialize map once Google Maps API is loaded
  useEffect(() => {
    if (!mapLoaded || !mapRef.current) return;
    
    const map = new window.google.maps.Map(mapRef.current, {
      center: deliveryLocation,
      zoom: 13,
      mapTypeControl: false,
      fullscreenControl: false,
      streetViewControl: false,
    });
    
    // Add delivery location marker
    new window.google.maps.Marker({
      position: deliveryLocation,
      map,
      icon: {
        path: window.google.maps.SymbolPath.CIRCLE,
        scale: 10,
        fillColor: "#4CAF50",
        fillOpacity: 1,
        strokeColor: "#fff",
        strokeWeight: 2,
      },
      title: "Delivery Location",
    });
    
    // Add driver marker
    const driverMarker = new window.google.maps.Marker({
      position: driverLocation,
      map,
      icon: {
        path: window.google.maps.SymbolPath.FORWARD_CLOSED_ARROW,
        scale: 6,
        fillColor: "#2196F3",
        fillOpacity: 1,
        strokeColor: "#fff",
        strokeWeight: 2,
        rotation: 45,
      },
      title: "Driver Location",
    });
    
    // Simulate driver movement
    const interval = setInterval(() => {
      // Move driver closer to delivery location
      const newDriverLocation = {
        lat: driverLocation.lat + (deliveryLocation.lat - driverLocation.lat) * 0.05,
        lng: driverLocation.lng + (deliveryLocation.lng - driverLocation.lng) * 0.05
      };
      
      setDriverLocation(newDriverLocation);
      driverMarker.setPosition(newDriverLocation);
    }, 2000);
    
    return () => clearInterval(interval);
  }, [mapLoaded, deliveryLocation, driverLocation]);
  
  // Request location permission
  const requestLocationPermission = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLocationPermission(true);
        },
        (error) => {
          console.error("Error getting location:", error);
        }
      );
    } else {
      console.error("Geolocation is not supported by this browser.");
    }
  };
  
  return (
    <Card className="glass-card">
      <CardHeader>
        <CardTitle className="flex items-center">
          <MapPin className="mr-2 h-5 w-5 text-primary" />
          Live Delivery Tracking
        </CardTitle>
        <CardDescription>
          {orderId ? `Tracking delivery for order #${orderId}` : 'Track your delivery in real-time'}
        </CardDescription>
      </CardHeader>
      <CardContent>
        {!mapLoaded ? (
          <div className="flex justify-center items-center h-64 bg-secondary/30 rounded-md">
            <p>Loading map...</p>
          </div>
        ) : locationPermission ? (
          <div className="relative">
            <div 
              ref={mapRef} 
              className="h-64 w-full rounded-md overflow-hidden"
            ></div>
            <div className="absolute bottom-3 right-3">
              <Button 
                variant="default" 
                size="sm" 
                className="bg-primary/90 backdrop-blur-sm"
              >
                <Navigation className="mr-1 h-3 w-3" /> Center Map
              </Button>
            </div>
            <div className="mt-4 flex items-center justify-between">
              <div className="flex items-center">
                <div className="h-3 w-3 rounded-full bg-blue-500 mr-2"></div>
                <span className="text-sm">Driver</span>
              </div>
              <div className="flex items-center">
                <div className="h-3 w-3 rounded-full bg-green-500 mr-2"></div>
                <span className="text-sm">Destination</span>
              </div>
              <div className="text-sm text-muted-foreground">
                <Truck className="inline h-4 w-4 mr-1" />
                ETA: 14 minutes
              </div>
            </div>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center h-64 bg-secondary/30 rounded-md p-6 text-center">
            <MapPin className="h-8 w-8 text-primary mb-3" />
            <h3 className="font-medium mb-2">Enable Location Services</h3>
            <p className="text-sm text-muted-foreground mb-4">
              To track your delivery in real-time, we need permission to access your location.
            </p>
            <Button onClick={requestLocationPermission}>
              Enable Location
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default DeliveryMap;
