import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import Layout from '@/components/Layout';
import {
  MapPin,
  Phone,
  Mail,
  Star,
  Clock,
  CheckCircle,
  Award,
  Car,
  Wrench,
  MessageSquare,
  Calendar,
  DollarSign
} from 'lucide-react';

interface ShopData {
  id: string;
  name: string;
  description: string;
  address: {
    street: string;
    city: string;
    state: string;
    zipCode: string;
  };
  phone: string;
  email: string;
  website?: string;
  rating: number;
  reviewCount: number;
  verified: boolean;
  services: string[];
  specialties: string[];
  certifications: string[];
  hours: {
    monday: string;
    tuesday: string;
    wednesday: string;
    thursday: string;
    friday: string;
    saturday: string;
    sunday: string;
  };
  images: string[];
  amenities: string[];
  pricing: string;
  nextAvailable?: string;
  portfolio: {
    id: string;
    title: string;
    description: string;
    image: string;
    completedDate: string;
  }[];
  reviews: {
    id: string;
    customerName: string;
    rating: number;
    comment: string;
    date: string;
    service: string;
  }[];
}

const ShopProfile = () => {
  const { shopId } = useParams();
  const [shop, setShop] = useState<ShopData | null>(null);
  const [loading, setLoading] = useState(true);

  // Mock data - in real app this would come from API
  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setShop({
        id: shopId || '1',
        name: 'QuickFix Auto Service',
        description: 'Full-service auto repair shop specializing in domestic and import vehicles. We provide honest, reliable service with competitive pricing.',
        address: {
          street: '123 Main Street',
          city: 'Springfield',
          state: 'IL',
          zipCode: '62704'
        },
        phone: '(555) 123-4567',
        email: 'info@quickfixauto.com',
        website: 'https://quickfixauto.com',
        rating: 4.8,
        reviewCount: 324,
        verified: true,
        services: [
          'Oil Change',
          'Brake Service',
          'Engine Repair',
          'Transmission Service',
          'Tire Service',
          'Diagnostics',
          'Air Conditioning'
        ],
        specialties: [
          'European Cars',
          'Fuel Injection',
          'Computer Diagnostics'
        ],
        certifications: [
          'ASE Certified',
          'AAA Approved',
          'NAPA AutoCare'
        ],
        hours: {
          monday: '8:00 AM - 6:00 PM',
          tuesday: '8:00 AM - 6:00 PM',
          wednesday: '8:00 AM - 6:00 PM',
          thursday: '8:00 AM - 6:00 PM',
          friday: '8:00 AM - 6:00 PM',
          saturday: '9:00 AM - 4:00 PM',
          sunday: 'Closed'
        },
        images: [
          '/api/placeholder/400/300',
          '/api/placeholder/400/300',
          '/api/placeholder/400/300'
        ],
        amenities: [
          'Free WiFi',
          'Waiting Area',
          'Coffee',
          'Shuttle Service'
        ],
        pricing: 'Moderate',
        nextAvailable: '2024-01-16T14:30:00Z',
        portfolio: [
          {
            id: '1',
            title: 'Engine Rebuild - 2015 Toyota Camry',
            description: 'Complete engine rebuild with timing belt replacement',
            image: '/api/placeholder/300/200',
            completedDate: '2024-01-10'
          },
          {
            id: '2',
            title: 'Brake System Overhaul',
            description: 'Full brake system replacement with premium pads',
            image: '/api/placeholder/300/200',
            completedDate: '2024-01-08'
          }
        ],
        reviews: [
          {
            id: '1',
            customerName: 'John D.',
            rating: 5,
            comment: 'Excellent service! They diagnosed my car\'s problem quickly and fixed it for a reasonable price. Highly recommend!',
            date: '2024-01-12',
            service: 'Engine Diagnostics'
          },
          {
            id: '2',
            customerName: 'Sarah M.',
            rating: 5,
            comment: 'Great shop with knowledgeable mechanics. They explained everything clearly and were very professional.',
            date: '2024-01-08',
            service: 'Oil Change'
          }
        ]
      });
      setLoading(false);
    }, 1000);
  }, [shopId]);

  if (loading) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-6">
          <div className="animate-pulse">
            <div className="h-64 bg-gray-300 rounded-lg mb-6"></div>
            <div className="h-8 bg-gray-300 rounded mb-4"></div>
            <div className="h-4 bg-gray-300 rounded mb-2"></div>
            <div className="h-4 bg-gray-300 rounded w-3/4"></div>
          </div>
        </div>
      </Layout>
    );
  }

  if (!shop) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-6">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-900 mb-4">Shop Not Found</h1>
            <p className="text-gray-600">The shop you're looking for doesn't exist.</p>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="container mx-auto px-4 py-6">
        {/* Header Section */}
        <div className="bg-white rounded-lg shadow-sm overflow-hidden mb-6">
          {/* Shop Images Carousel */}
          <div className="h-64 bg-gray-200 relative">
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-gray-500">Shop Images</span>
            </div>
          </div>

          {/* Shop Info */}
          <div className="p-6">
            <div className="flex items-start justify-between mb-4">
              <div>
                <div className="flex items-center gap-3 mb-2">
                  <h1 className="text-3xl font-bold text-gray-900">{shop.name}</h1>
                  {shop.verified && (
                    <Badge className="bg-green-100 text-green-800">
                      <CheckCircle className="h-3 w-3 mr-1" />
                      Verified
                    </Badge>
                  )}
                </div>
                <div className="flex items-center gap-4 text-gray-600 mb-2">
                  <div className="flex items-center gap-1">
                    <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    <span className="font-medium">{shop.rating}</span>
                    <span>({shop.reviewCount} reviews)</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <DollarSign className="h-4 w-4" />
                    <span>{shop.pricing}</span>
                  </div>
                </div>
                <div className="flex items-center gap-1 text-gray-600">
                  <MapPin className="h-4 w-4" />
                  <span>{shop.address.street}, {shop.address.city}, {shop.address.state} {shop.address.zipCode}</span>
                </div>
              </div>
              <div className="flex gap-3">
                <Button variant="outline">
                  <MessageSquare className="h-4 w-4 mr-2" />
                  Contact
                </Button>
                <Button>
                  <Calendar className="h-4 w-4 mr-2" />
                  Book Service
                </Button>
              </div>
            </div>

            <p className="text-gray-700 mb-4">{shop.description}</p>

            <div className="flex items-center gap-6 text-sm text-gray-600">
              <div className="flex items-center gap-1">
                <Phone className="h-4 w-4" />
                <span>{shop.phone}</span>
              </div>
              <div className="flex items-center gap-1">
                <Mail className="h-4 w-4" />
                <span>{shop.email}</span>
              </div>
              {shop.website && (
                <div className="flex items-center gap-1">
                  <span>{shop.website}</span>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - Services & Info */}
          <div className="lg:col-span-2 space-y-6">
            <Tabs defaultValue="services" className="w-full">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="services">Services</TabsTrigger>
                <TabsTrigger value="portfolio">Portfolio</TabsTrigger>
                <TabsTrigger value="reviews">Reviews</TabsTrigger>
                <TabsTrigger value="hours">Hours</TabsTrigger>
              </TabsList>

              <TabsContent value="services" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Wrench className="h-5 w-5" />
                      Services Offered
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {shop.services.map((service, index) => (
                        <div key={index} className="flex items-center gap-2 p-3 border rounded-lg">
                          <CheckCircle className="h-4 w-4 text-green-500" />
                          <span>{service}</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Award className="h-5 w-5" />
                      Specialties & Certifications
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <h4 className="font-medium mb-2">Specialties</h4>
                      <div className="flex flex-wrap gap-2">
                        {shop.specialties.map((specialty, index) => (
                          <Badge key={index} variant="secondary">{specialty}</Badge>
                        ))}
                      </div>
                    </div>
                    <div>
                      <h4 className="font-medium mb-2">Certifications</h4>
                      <div className="flex flex-wrap gap-2">
                        {shop.certifications.map((cert, index) => (
                          <Badge key={index} className="bg-green-100 text-green-800">{cert}</Badge>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="portfolio" className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {shop.portfolio.map((item) => (
                    <Card key={item.id}>
                      <div className="aspect-video bg-gray-200 rounded-t-lg flex items-center justify-center">
                        <span className="text-gray-500">Portfolio Image</span>
                      </div>
                      <CardContent className="p-4">
                        <h3 className="font-medium mb-2">{item.title}</h3>
                        <p className="text-sm text-gray-600 mb-2">{item.description}</p>
                        <p className="text-xs text-gray-500">Completed: {new Date(item.completedDate).toLocaleDateString()}</p>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="reviews" className="space-y-4">
                <div className="space-y-4">
                  {shop.reviews.map((review) => (
                    <Card key={review.id}>
                      <CardContent className="p-4">
                        <div className="flex items-start gap-3">
                          <Avatar>
                            <AvatarFallback>{review.customerName[0]}</AvatarFallback>
                          </Avatar>
                          <div className="flex-1">
                            <div className="flex items-center justify-between mb-2">
                              <div>
                                <p className="font-medium">{review.customerName}</p>
                                <p className="text-sm text-gray-600">{review.service}</p>
                              </div>
                              <div className="flex items-center gap-1">
                                {[...Array(5)].map((_, i) => (
                                  <Star
                                    key={i}
                                    className={`h-4 w-4 ${i < review.rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`}
                                  />
                                ))}
                              </div>
                            </div>
                            <p className="text-gray-700 mb-2">{review.comment}</p>
                            <p className="text-xs text-gray-500">{new Date(review.date).toLocaleDateString()}</p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="hours" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Clock className="h-5 w-5" />
                      Business Hours
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      {Object.entries(shop.hours).map(([day, hours]) => (
                        <div key={day} className="flex justify-between py-2 border-b last:border-b-0">
                          <span className="capitalize font-medium">{day}</span>
                          <span className={hours === 'Closed' ? 'text-red-500' : 'text-gray-700'}>{hours}</span>
                        </div>
                      ))}
                    </div>
                    {shop.nextAvailable && (
                      <div className="mt-4 p-3 bg-green-50 border border-green-200 rounded-lg">
                        <p className="text-sm text-green-800">
                          <strong>Next Available:</strong> {new Date(shop.nextAvailable).toLocaleString()}
                        </p>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>

          {/* Right Column - Quick Info & Amenities */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Amenities</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {shop.amenities.map((amenity, index) => (
                    <div key={index} className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      <span>{amenity}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button className="w-full">
                  <Calendar className="h-4 w-4 mr-2" />
                  Schedule Service
                </Button>
                <Button variant="outline" className="w-full">
                  <MessageSquare className="h-4 w-4 mr-2" />
                  Send Message
                </Button>
                <Button variant="outline" className="w-full">
                  <Phone className="h-4 w-4 mr-2" />
                  Call Now
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ShopProfile;
