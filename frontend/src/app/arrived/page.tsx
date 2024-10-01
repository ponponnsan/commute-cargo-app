"use client";
import Map from "@/components/maps/google-map";
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { LoadScript } from '@react-google-maps/api';
import { MapPin, Package, Phone } from 'lucide-react';
import { useRouter } from "next/navigation";
import { useEffect, useState } from 'react';

const CommuteCargaDeliveryNavigation = () => {
  const [estimatedTime, setEstimatedTime] = useState('25 min');
  const [distance, setDistance] = useState('7.5 km');
  const router = useRouter();

  const [user, setUser] = useState({ name: '' });
  const [UserPickup, setUserPickup] = useState({   
    pickupLocation: '',
    deliveryLocation: '',
    preferredTime: '',
    cargoSize: '',
  });

  useEffect(() => {
    const userPickupData = getUserPickupData();
    const userData = getStoredUserData();
    if (userPickupData && userData) {
      setUserPickup(userPickupData);
      setUser(userData)
      console.log('ユーザー情報を取得しました', userPickupData)
      console.log('ユーザー名', userData.name) 
    } else {
      console.error("ユーザー情報が見つかりませんでした");
    }
  }, []);

  const getStoredUserData = () => {
    if (typeof window !== 'undefined') {
      const storedData = localStorage.getItem('userData');
      return storedData ? JSON.parse(storedData) : null;
    }
    return null;
  };

  const getUserPickupData = () => {
    if (typeof window !== 'undefined') {
      const storedData = localStorage.getItem('userPickupData');
      return storedData ? JSON.parse(storedData) : null;
    }
    return null;
  };

  // Mock delivery details
  const deliveryDetails = {
    phoneNumber: '090-9876-5432',
  };

  // Mock vehicles details
  const vehicles = [
    { lat: 35.6762, lng: 139.6503 },
    { lat: 35.6895, lng: 139.6917 },
  ];


  const handleDelivered = () => {
    console.log('Cargo delivered successfully');
    router.push("/driver-complete-delivery");
  };

  return (
    <Card className="w-full max-w-md mx-auto h-screen flex flex-col">
      <CardHeader className="bg-red-500 text-white flex items-center p-4">
        <h2 className="text-xl font-bold flex-grow">Navigate to Delivery</h2>
      </CardHeader>
      <CardContent className="p-4 flex-grow flex flex-col">
        <div className="bg-gray-100 rounded-lg p-2 mb-4">
          <h3 className="font-semibold mb-2 flex items-center">
            <MapPin className="h-5 w-5 mr-2 text-red-500" />
            Delivery Location
          </h3>
          <p>{UserPickup.deliveryLocation}</p>
        </div>

        <LoadScript
        googleMapsApiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY!}
        language="en"
        region="US"
        >
          <Map /> 
        </LoadScript>

        <div className="bg-green-100 rounded-lg p-2 mb-4">
          <h3 className="font-semibold mb-2">Customer Details</h3>
          <p>{user.name}</p>
          <div className="flex items-center mt-2">
            <Phone className="h-5 w-5 mr-2 text-green-500" />
            <a href={`tel:${deliveryDetails.phoneNumber}`} className="text-blue-500 underline">
              {deliveryDetails.phoneNumber}
            </a>
          </div>
        </div>

        <div className="bg-yellow-100 rounded-lg p-2 mb-4">
          <h3 className="font-semibold mb-2 flex items-center">
            <Package className="h-5 w-5 mr-2 text-yellow-500" />
            Cargo Details
          </h3>
          <p>{UserPickup.cargoSize}</p>
        </div>

        <Button 
          onClick={handleDelivered}
          className="w-full bg-green-500 hover:bg-green-600 text-white py-3 rounded-lg"
        >
          Confirm Delivery
        </Button>
      </CardContent>
    </Card>
  );
};

export default CommuteCargaDeliveryNavigation;