import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// Fix for default marker icon not showing
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png',
});

interface Shop {
  id: number;
  name: string;
  rating: string;
  reviews: number;
  stored_distance: string;
  address: {
    street: string;
    city: string;
    state: string;
    zipCode: string;
    country: string;
  };
  phone: string;
  website?: string;
  specialties: string[];
  services: string[];
  certifications: string[];
  hours: { [key: string]: string };
  next_available: string;
  pricing: 'Budget' | 'Moderate' | 'Premium';
  verified: boolean;
  images: string[];
  description: string;
  coordinates: {
    x: number;
    y: number;
  };
  distance_km: number;
}

import "leaflet-routing-machine";
import "leaflet-routing-machine/dist/leaflet-routing-machine.css";

interface NearbyShopsMapProps {
  shops: Shop[];
  selectedShop: Shop | null;
  setSelectedShop: (shop: Shop | null) => void;
  mapCenter: [number, number];
  userLat: number | null;
  userLng: number | null;
}

const NearbyShopsMap: React.FC<NearbyShopsMapProps> = ({ shops, selectedShop, setSelectedShop, mapCenter, userLat, userLng }) => {

  const yellowIcon = new L.Icon({
    iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-yellow.png',
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41]
  });

  const RoutingMachine = () => {
    const map = useMap();

    useEffect(() => {
      if (!map) return;

      if (userLat && userLng && selectedShop) {
        const routingControl = L.Routing.control({
          waypoints: [
            L.latLng(userLat, userLng),
            L.latLng(selectedShop.coordinates.y, selectedShop.coordinates.x)
          ],
          routeWhileDragging: true,
          showAlternatives: false,
          fitSelectedRoutes: true,
          lineOptions: {
            styles: [{ color: '#6FA1EC', weight: 4 }]
          },
          altLineOptions: {
            styles: [{ color: '#8898b6', weight: 4 }]
          },
          createMarker: function() { return null; } // Hide default markers
        }).addTo(map);

        return () => {
          map.removeControl(routingControl);
        };
      }
    }, [map, userLat, userLng, selectedShop]);

    return null;
  };

  // const [shops, setShops] = useState<Shop[]>([]); // This is now passed as a prop
  // const [loading, setLoading] = useState<boolean>(true);
  // const [error, setError] = useState<string | null>(null);

  // useEffect(() => {
  //   const fetchShops = async () => {
  //     try {
  //       const response = await fetch('http://localhost:5000/api/shops/nearby?lat=24.8607&lng=67.0011&radius=10');
  //       if (!response.ok) {
  //         throw new Error(`HTTP error! status: ${response.status}`);
  //       }
  //       const data: Shop[] = await response.json();
  //       setShops(data);
  //     } catch (err: any) {
  //       setError(err.message);
  //     } finally {
  //       setLoading(false);
  //     }
  //   };

  //   fetchShops();
  // }, []);

  // if (loading) {
  //   return <div>Loading shops...</div>;
  // }

  // if (error) {
  //   return <div>Error: {error}</div>;
  // }

  // Default center if no shops are found or for initial load
  // const defaultCenter: [number, number] = [24.8607, 67.0011];
  // const mapCenter: [number, number] = shops.length > 0
  //   ? [shops[0].coordinates.y, shops[0].coordinates.x]
  //   : defaultCenter;

  return (
    <MapContainer center={mapCenter} zoom={13} style={{ height: '500px', width: '100%' }}>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
      />
      {shops.map(shop => (
        <Marker 
          key={shop.id} 
          position={[shop.coordinates.y, shop.coordinates.x]}
          eventHandlers={{
            click: () => {
              setSelectedShop(shop);
            },
          }}
        >
          <Popup>
            <div>
              <h3>{shop.name}</h3>
              <p>Rating: {shop.rating} ({shop.reviews} reviews)</p>
              <p>Distance: {shop.stored_distance}</p>
              <p>Address: {shop.address.street}, {shop.address.city}, {shop.address.state} {shop.address.zipCode}</p>
              <p>Phone: {shop.phone}</p>
              <p>Specialties: {shop.specialties.join(', ')}</p>
              {shop.next_available && <p>Next Available: {shop.next_available}</p>}
              <a href={shop.website} target="_blank" rel="noopener noreferrer">Website</a>
            </div>
          </Popup>
        </Marker>
      ))}

      {userLat && userLng && (
        <Marker position={[userLat, userLng]} icon={yellowIcon}>
          <Popup>Your Current Location</Popup>
        </Marker>
      )}
      <RoutingMachine />
    </MapContainer>
  );
};

export default NearbyShopsMap;
