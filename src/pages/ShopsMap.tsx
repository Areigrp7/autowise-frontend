import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { CustomSelect } from '@/components/CustomSelect';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import Layout from '@/components/Layout';
import { 
  MapPin, 
  Search, 
  Star, 
  Clock, 
  Phone, 
  Navigation,
  Filter,
  Calendar,
  Wrench,
  Shield,
  Award,
  Car,
  Users,
  CheckCircle,
  ExternalLink
} from 'lucide-react';

interface Shop {
  id: string;
  name: string;
  rating: number;
  reviews: number;
  distance: string;
  address: string;
  phone: string;
  website?: string;
  specialties: string[];
  services: string[];
  certifications: string[];
  hours: {
    [key: string]: string;
  };
  nextAvailable: string;
  pricing: 'Budget' | 'Moderate' | 'Premium';
  verified: boolean;
  images: string[];
  description: string;
  coordinates: [number, number];
}

export default function ShopsMapPage() {
  const [searchLocation, setSearchLocation] = useState('');
  const [selectedService, setSelectedService] = useState('');
  const [selectedShop, setSelectedShop] = useState<Shop | null>(null);
  const [viewMode, setViewMode] = useState<'map' | 'list'>('map');
  const [radiusFilter, setRadiusFilter] = useState('10');

  const shops: Shop[] = [
    {
      id: '1',
      name: 'QuickFix Auto Service',
      rating: 4.8,
      reviews: 324,
      distance: '1.2 mi',
      address: '123 Main St, Downtown',
      phone: '(555) 123-4567',
      website: 'quickfixauto.com',
      specialties: ['Brakes', 'Oil Change', 'Diagnostics'],
      services: ['General Repair', 'Maintenance', 'Inspection', 'Tire Service'],
      certifications: ['ASE Certified', 'AAA Approved', 'NAPA AutoCare'],
      hours: {
        'Monday': '8:00 AM - 6:00 PM',
        'Tuesday': '8:00 AM - 6:00 PM',
        'Wednesday': '8:00 AM - 6:00 PM',
        'Thursday': '8:00 AM - 6:00 PM',
        'Friday': '8:00 AM - 6:00 PM',
        'Saturday': '9:00 AM - 4:00 PM',
        'Sunday': 'Closed'
      },
      nextAvailable: 'Today 2:30 PM',
      pricing: 'Moderate',
      verified: true,
      images: ['/api/placeholder/400/300', '/api/placeholder/400/300'],
      description: 'Family-owned auto service center with over 20 years of experience. Specializing in brake service and general automotive repair.',
      coordinates: [40.7128, -74.0060]
    },
    {
      id: '2',
      name: 'Premier Automotive',
      rating: 4.9,
      reviews: 567,
      distance: '2.1 mi',
      address: '456 Oak Avenue, Midtown',
      phone: '(555) 987-6543',
      website: 'premierauto.com',
      specialties: ['Engine Repair', 'Transmission', 'AC Service'],
      services: ['Engine Diagnostics', 'Transmission Repair', 'AC Repair', 'Electrical'],
      certifications: ['ASE Master Technician', 'Bosch Authorized', 'BMW Specialist'],
      hours: {
        'Monday': '7:30 AM - 7:00 PM',
        'Tuesday': '7:30 AM - 7:00 PM',
        'Wednesday': '7:30 AM - 7:00 PM',
        'Thursday': '7:30 AM - 7:00 PM',
        'Friday': '7:30 AM - 7:00 PM',
        'Saturday': '8:00 AM - 5:00 PM',
        'Sunday': '10:00 AM - 3:00 PM'
      },
      nextAvailable: 'Tomorrow 9:00 AM',
      pricing: 'Premium',
      verified: true,
      images: ['/api/placeholder/400/300', '/api/placeholder/400/300'],
      description: 'Premium automotive service specializing in European vehicles and complex engine diagnostics.',
      coordinates: [40.7589, -73.9851]
    },
    {
      id: '3',
      name: 'City Motors Garage',
      rating: 4.6,
      reviews: 189,
      distance: '2.8 mi',
      address: '789 Industrial Blvd, East Side',
      phone: '(555) 456-7890',
      specialties: ['Tires', 'Alignment', 'Suspension'],
      services: ['Tire Installation', 'Wheel Alignment', 'Suspension Repair', 'Brake Service'],
      certifications: ['ASE Certified', 'Michelin Dealer'],
      hours: {
        'Monday': '8:00 AM - 5:30 PM',
        'Tuesday': '8:00 AM - 5:30 PM',
        'Wednesday': '8:00 AM - 5:30 PM',
        'Thursday': '8:00 AM - 5:30 PM',
        'Friday': '8:00 AM - 5:30 PM',
        'Saturday': '9:00 AM - 2:00 PM',
        'Sunday': 'Closed'
      },
      nextAvailable: 'Today 4:00 PM',
      pricing: 'Budget',
      verified: false,
      images: ['/api/placeholder/400/300'],
      description: 'Honest and reliable service for all your tire and suspension needs. Competitive pricing and quick turnaround.',
      coordinates: [40.6892, -74.0445]
    }
  ];

  const services = [
    { value: '', label: 'All Services' },
    { value: 'Oil Change', label: 'Oil Change' },
    { value: 'Brake Service', label: 'Brake Service' },
    { value: 'Tire Service', label: 'Tire Service' },
    { value: 'Engine Repair', label: 'Engine Repair' },
    { value: 'Transmission', label: 'Transmission' },
    { value: 'AC Service', label: 'AC Service' },
    { value: 'Electrical', label: 'Electrical' },
    { value: 'Diagnostics', label: 'Diagnostics' },
    { value: 'Alignment', label: 'Alignment' }
  ];

  const radiusOptions = [
    { value: '5', label: '5 miles' },
    { value: '10', label: '10 miles' },
    { value: '25', label: '25 miles' },
    { value: '50', label: '50 miles' }
  ];

  const getPricingColor = (pricing: string) => {
    switch (pricing) {
      case 'Budget': return 'text-green-600 bg-green-50';
      case 'Moderate': return 'text-blue-600 bg-blue-50';
      case 'Premium': return 'text-purple-600 bg-purple-50';
      default: return 'text-gray-600 bg-gray-50';
    }
  };

  return (
    <Layout currentPage="shopsmap">
      <div className="container mx-auto px-4 py-6">
        {/* Search Header */}
        <div className="mb-6">
          <div className="flex gap-4 mb-4">
            <div className="flex-1 relative">
              <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <Input
                placeholder="Enter location or zip code..."
                className="pl-10"
                value={searchLocation}
                onChange={(e) => setSearchLocation(e.target.value)}
              />
            </div>
            <CustomSelect
              options={services}
              value={selectedService}
              onValueChange={setSelectedService}
              placeholder="All Services"
              className="w-48"
            />
            <CustomSelect
              options={radiusOptions}
              value={radiusFilter}
              onValueChange={setRadiusFilter}
              className="w-32"
            />
            <Button>
              <Search className="h-4 w-4 mr-2" />
              Search
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Map/Results */}
          <div className="lg:col-span-2">
            <Card className="h-[600px]">
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <CardTitle>Nearby Auto Shops</CardTitle>
                  <Tabs value={viewMode} onValueChange={(value) => setViewMode(value as 'map' | 'list')}>
                    <TabsList>
                      <TabsTrigger value="map">Map View</TabsTrigger>
                      <TabsTrigger value="list">List View</TabsTrigger>
                    </TabsList>
                  </Tabs>
                </div>
              </CardHeader>
              <CardContent className="h-[500px]">
                {viewMode === 'map' ? (
                  <div className="w-full h-full bg-gray-100 rounded-lg flex items-center justify-center">
                    <div className="text-center">
                      <MapPin className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                      <p className="text-gray-600">Interactive map would be displayed here</p>
                      <p className="text-sm text-gray-500 mt-2">
                        Integration with Google Maps API or similar mapping service
                      </p>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-4 h-full overflow-y-auto">
                    {shops.map(shop => (
                      <Card 
                        key={shop.id} 
                        className={`cursor-pointer transition-all hover:shadow-md ${
                          selectedShop?.id === shop.id ? 'ring-2 ring-blue-500' : ''
                        }`}
                        onClick={() => setSelectedShop(shop)}
                      >
                        <CardContent className="p-4">
                          <div className="flex items-start justify-between mb-2">
                            <div>
                              <h3 className="font-semibold text-lg flex items-center gap-2">
                                {shop.name}
                                {shop.verified && (
                                  <CheckCircle className="h-4 w-4 text-blue-500" />
                                )}
                              </h3>
                              <p className="text-sm text-gray-600">{shop.address}</p>
                            </div>
                            <div className="text-right">
                              <div className="flex items-center gap-1">
                                <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                                <span className="font-medium">{shop.rating}</span>
                                <span className="text-sm text-gray-500">({shop.reviews})</span>
                              </div>
                              <p className="text-sm text-gray-600">{shop.distance}</p>
                            </div>
                          </div>
                          
                          <div className="flex items-center gap-2 mb-2">
                            <Badge className={getPricingColor(shop.pricing)}>
                              {shop.pricing}
                            </Badge>
                            <div className="flex items-center text-sm text-green-600">
                              <Clock className="h-4 w-4 mr-1" />
                              {shop.nextAvailable}
                            </div>
                          </div>
                          
                          <div className="flex flex-wrap gap-1">
                            {shop.specialties.slice(0, 3).map((specialty, i) => (
                              <Badge key={i} variant="outline" className="text-xs">
                                {specialty}
                              </Badge>
                            ))}
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Shop Details */}
          <div className="lg:col-span-1">
            {selectedShop ? (
              <Card>
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle className="flex items-center gap-2">
                        {selectedShop.name}
                        {selectedShop.verified && (
                          <CheckCircle className="h-5 w-5 text-blue-500" />
                        )}
                      </CardTitle>
                      <CardDescription>{selectedShop.address}</CardDescription>
                    </div>
                    <Badge className={getPricingColor(selectedShop.pricing)}>
                      {selectedShop.pricing}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  {/* Rating & Reviews */}
                  <div className="flex items-center gap-4">
                    <div className="flex items-center">
                      <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                      <span className="ml-1 text-lg font-medium">{selectedShop.rating}</span>
                    </div>
                    <span className="text-gray-600">({selectedShop.reviews} reviews)</span>
                    <span className="text-gray-600">• {selectedShop.distance}</span>
                  </div>

                  {/* Description */}
                  <p className="text-sm text-gray-600">{selectedShop.description}</p>

                  {/* Contact Info */}
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <Phone className="h-4 w-4 text-gray-500" />
                      <span className="text-sm">{selectedShop.phone}</span>
                    </div>
                    {selectedShop.website && (
                      <div className="flex items-center gap-2">
                        <ExternalLink className="h-4 w-4 text-gray-500" />
                        <a href={`https://${selectedShop.website}`} className="text-sm text-blue-600 hover:underline">
                          {selectedShop.website}
                        </a>
                      </div>
                    )}
                  </div>

                  {/* Specialties */}
                  <div>
                    <h4 className="font-medium mb-2">Specialties</h4>
                    <div className="flex flex-wrap gap-1">
                      {selectedShop.specialties.map((specialty, i) => (
                        <Badge key={i} variant="secondary" className="text-xs">
                          {specialty}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  {/* Services */}
                  <div>
                    <h4 className="font-medium mb-2">Services</h4>
                    <div className="grid grid-cols-2 gap-1 text-sm">
                      {selectedShop.services.map((service, i) => (
                        <div key={i} className="flex items-center gap-1">
                          <CheckCircle className="h-3 w-3 text-green-500" />
                          <span>{service}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Certifications */}
                  <div>
                    <h4 className="font-medium mb-2">Certifications</h4>
                    <div className="space-y-1">
                      {selectedShop.certifications.map((cert, i) => (
                        <div key={i} className="flex items-center gap-2">
                          <Award className="h-4 w-4 text-blue-500" />
                          <span className="text-sm">{cert}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Hours */}
                  <div>
                    <h4 className="font-medium mb-2">Hours</h4>
                    <div className="space-y-1 text-sm">
                      {Object.entries(selectedShop.hours).map(([day, hours]) => (
                        <div key={day} className="flex justify-between">
                          <span className="text-gray-600">{day}</span>
                          <span>{hours}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Availability */}
                  <div className="bg-green-50 p-3 rounded-lg">
                    <div className="flex items-center gap-2 text-green-700">
                      <Clock className="h-4 w-4" />
                      <span className="font-medium">Next Available: {selectedShop.nextAvailable}</span>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="space-y-2">
                    <Button className="w-full">
                      <Calendar className="h-4 w-4 mr-2" />
                      Book Appointment
                    </Button>
                    <div className="grid grid-cols-2 gap-2">
                      <Button variant="outline">
                        <Phone className="h-4 w-4 mr-2" />
                        Call
                      </Button>
                      <Button variant="outline">
                        <Navigation className="h-4 w-4 mr-2" />
                        Directions
                      </Button>
                    </div>
                    <Button variant="outline" className="w-full">
                      <Wrench className="h-4 w-4 mr-2" />
                      Get Quote
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ) : (
              <Card>
                <CardContent className="flex items-center justify-center h-64">
                  <div className="text-center text-gray-500">
                    <MapPin className="h-12 w-12 mx-auto mb-4" />
                    <p>Select a shop to view details</p>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
}