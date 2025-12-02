import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
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
  address: string;
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

interface NearbyShopsMapProps {
  shops: Shop[];
  selectedShop: Shop | null;
  setSelectedShop: (shop: Shop | null) => void;
}

const NearbyShopsMap: React.FC<NearbyShopsMapProps> = ({ shops, selectedShop, setSelectedShop }) => {
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
  const defaultCenter: [number, number] = [24.8607, 67.0011];
  const mapCenter: [number, number] = shops.length > 0
    ? [shops[0].coordinates.y, shops[0].coordinates.x]
    : defaultCenter;

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
              <p>Address: {shop.address}</p>
              <p>Phone: {shop.phone}</p>
              <p>Specialties: {shop.specialties.join(', ')}</p>
              {shop.next_available && <p>Next Available: {shop.next_available}</p>}
              <a href={shop.website} target="_blank" rel="noopener noreferrer">Website</a>
            </div>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
};

export default NearbyShopsMap;
