import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { getUserShops, deleteShop } from '@/lib/apiClient';
import { useToast } from '@/hooks/use-toast';
import Layout from '@/components/Layout';
import CreateShopForm from '@/components/CreateShopForm';
import {
  Plus,
  Building,
  MapPin,
  Phone,
  Mail,
  Globe,
  Clock,
  Star,
  Edit,
  Trash2,
  Eye,
  RefreshCw
} from 'lucide-react';

interface Shop {
  id: number;
  name: string;
  rating: string;
  reviews: number;
  address: {
    city: string;
    state: string;
    country: string;
    zip_code: string;
    address_line1: string;
  };
  phone: string;
  email: string;
  website: string | null;
  specialties: string[] | null;
  services: string[] | null;
  certifications: string[] | null;
  hours: Record<string, string> | null;
  next_available: string | null;
  pricing: any | null;
  verified: boolean;
  images: any | null;
  description: string | null;
  distanceunit: any | null;
  created_at: string;
  updated_at: string;
  distance: any | null;
  coordinates: any | null;
  user_id: number;
  business_type: string | null;
  years_in_business: number | null;
  business_license: string | null;
  ein_tax_id: string | null;
}

const MyShops: React.FC = () => {
  const [shops, setShops] = useState<Shop[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showCreateDialog, setShowCreateDialog] = useState(false);
  const [selectedShop, setSelectedShop] = useState<Shop | null>(null);
  const { toast } = useToast();

  const formatAddress = (address: Shop['address']) => {
  if (!address) return '';
  const { address_line1, city, state, zip_code, country } = address;

  return [address_line1, city, state, zip_code, country]
    .filter(Boolean)
    .join(', ');
};

  const fetchShops = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await getUserShops();
      setShops(response.data || response);
    } catch (error: any) {
      console.error('Error fetching shops:', error);
      setError(error.message || 'Failed to load shops');
      toast({
        title: "Error",
        description: "Failed to load your shops. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchShops();
  }, []);

  const handleDeleteShop = async (shopId: string) => {
    if (!confirm('Are you sure you want to delete this shop? This action cannot be undone.')) {
      return;
    }

    try {
      await deleteShop(shopId);
      setShops(shops.filter(shop => shop.id !== shopId));
      toast({
        title: "Success",
        description: "Shop deleted successfully.",
      });
    } catch (error: any) {
      console.error('Error deleting shop:', error);
      toast({
        title: "Error",
        description: error.message || "Failed to delete shop. Please try again.",
        variant: "destructive",
      });
    }
  };

  const formatBusinessType = (type: string) => {
    const typeMap: Record<string, string> = {
      'auto_repair': 'Auto Repair',
      'specialty': 'Specialty Shop',
      'dealership': 'Dealership Service',
      'mobile': 'Mobile Service',
      'tire': 'Tire Shop',
      'body_shop': 'Body Shop'
    };
    return typeMap[type] || type;
  };

  const renderShopDetails = (shop: Shop) => (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <h4 className="font-medium mb-2">Contact Information</h4>
          <div className="space-y-2 text-sm">
            {/* <p><strong>Address:</strong> {shop.address}</p>
             */}
             <p><strong>Address:</strong> {formatAddress(shop.address)}</p>

            {shop.phone && <p><strong>Phone:</strong> {shop.phone}</p>}
            {shop.email && <p><strong>Email:</strong> {shop.email}</p>}
            {shop.website && (
              <p>
                <strong>Website:</strong>{' '}
                <a href={shop.website} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                  {shop.website}
                </a>
              </p>
            )}
          </div>
        </div>

        <div>
          <h4 className="font-medium mb-2">Business Details</h4>
          <div className="space-y-2 text-sm">
            <p><strong>Type:</strong> {formatBusinessType(shop.business_type || '')}</p>
            {shop.rating && (
              <div className="flex items-center gap-1">
                <strong>Rating:</strong>
                <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                {/* <span>{shop.rating.toFixed(1)}</span> */}
                {shop.review_count && <span>({shop.review_count} reviews)</span>}
              </div>
            )}
          </div>
        </div>
      </div>

      {shop.description && (
        <div>
          <h4 className="font-medium mb-2">Description</h4>
          <p className="text-sm text-gray-600 bg-gray-50 p-3 rounded">{shop.description}</p>
        </div>
      )}

      {shop.services && shop.services.length > 0 && (
        <div>
          <h4 className="font-medium mb-2">Services</h4>
          <div className="flex flex-wrap gap-2">
            {shop.services.map((service, index) => (
              <Badge key={index} variant="outline">{service}</Badge>
            ))}
          </div>
        </div>
      )}

      {shop.specialties && shop.specialties.length > 0 && (
        <div>
          <h4 className="font-medium mb-2">Specialties</h4>
          <div className="flex flex-wrap gap-2">
            {shop.specialties.map((specialty, index) => (
              <Badge key={index} variant="secondary">{specialty}</Badge>
            ))}
          </div>
        </div>
      )}

      {shop.hours && (
        <div>
          <h4 className="font-medium mb-2 flex items-center gap-2">
            <Clock className="h-4 w-4" />
            Business Hours
          </h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-1 text-sm">
            {Object.entries(shop.hours).map(([day, hours]) => (
              <div key={day} className="flex justify-between">
                <span className="capitalize font-medium">{day}:</span>
                <span>{hours}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );

  return (
    <Layout currentPage="shops">
      <div className="container mx-auto px-4 py-6">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">My Shops</h1>
            <p className="text-gray-600">Manage your auto repair shops and services</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" onClick={fetchShops} disabled={isLoading}>
              <RefreshCw className={`h-4 w-4 mr-2 ${isLoading ? 'animate-spin' : ''}`} />
              Refresh
            </Button>
            <Dialog open={showCreateDialog} onOpenChange={setShowCreateDialog}>
              <DialogTrigger asChild>
                <Button>
                  <Plus className="h-4 w-4 mr-2" />
                  Create Shop
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-6xl max-h-[90vh] overflow-y-auto">
                <CreateShopForm onSuccess={() => {
                  setShowCreateDialog(false);
                  fetchShops();
                }} />
              </DialogContent>
            </Dialog>
          </div>
        </div>

        {/* Content */}
        {isLoading ? (
          <div className="flex items-center justify-center py-12">
            <div className="text-center">
              <RefreshCw className="h-8 w-8 animate-spin mx-auto mb-4 text-blue-600" />
              <p className="text-gray-600">Loading your shops...</p>
            </div>
          </div>
        ) : error ? (
          <div className="flex items-center justify-center py-12">
            <div className="text-center">
              <div className="text-red-500 mb-4">
                <Building className="h-12 w-12 mx-auto opacity-50" />
              </div>
              <p className="text-red-600 mb-2">Failed to load shops</p>
              <p className="text-sm text-gray-500 mb-4">{error}</p>
              <Button onClick={fetchShops} variant="outline">
                Try Again
              </Button>
            </div>
          </div>
        ) : shops.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-gray-400 mb-4">
              <Building className="h-16 w-16 mx-auto opacity-50" />
            </div>
            <h3 className="text-xl font-medium text-gray-900 mb-2">No Shops Yet</h3>
            <p className="text-gray-600 mb-6">Create your first shop to start offering services to customers.</p>
            <Dialog open={showCreateDialog} onOpenChange={setShowCreateDialog}>
              <DialogTrigger asChild>
                <Button>
                  <Plus className="h-4 w-4 mr-2" />
                  Create Your First Shop
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-6xl max-h-[90vh] overflow-y-auto">
                <CreateShopForm onSuccess={() => {
                  setShowCreateDialog(false);
                  fetchShops();
                }} />
              </DialogContent>
            </Dialog>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {shops.map((shop) => (
              <Card key={shop.id} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <CardTitle className="text-lg mb-2">{shop.name}</CardTitle>
                      <Badge variant="outline" className="mb-2">
                        {formatBusinessType(shop.business_type || '')}
                      </Badge>
                    </div>
                    <div className="flex gap-1">
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button variant="ghost" size="sm">
                            <Eye className="h-4 w-4" />
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
                          <DialogHeader>
                            <DialogTitle>{shop.name}</DialogTitle>
                            <DialogDescription>Shop details and information</DialogDescription>
                          </DialogHeader>
                          {renderShopDetails(shop)}
                        </DialogContent>
                      </Dialog>
                      <Button variant="ghost" size="sm">
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleDeleteShop(shop.id)}
                        className="text-red-600 hover:text-red-700"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex items-start gap-2 text-sm text-gray-600">
                      <MapPin className="h-4 w-4 mt-0.5 flex-shrink-0" />
                      {/* <span className="line-clamp-2">{shop.address}</span> */}
                    <p><strong>Address:</strong> {formatAddress(shop.address)}</p>

                    </div>


                    {shop.phone && (
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <Phone className="h-4 w-4 flex-shrink-0" />
                        <span>{shop.phone}</span>
                      </div>
                    )}

                    {shop.rating && (
                      <div className="flex items-center gap-2">
                        <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                        {/* <span className="text-sm font-medium">{shop.rating.toFixed(1)}</span> */}
                        {shop.review_count && (
                          <span className="text-sm text-gray-500">({shop.review_count})</span>
                        )}
                      </div>
                    )}

                    {shop.services && shop.services.length > 0 && (
                      <div className="flex flex-wrap gap-1 mt-3">
                        {shop.services.slice(0, 3).map((service, index) => (
                          <Badge key={index} variant="secondary" className="text-xs">
                            {service}
                          </Badge>
                        ))}
                        {shop.services.length > 3 && (
                          <Badge variant="outline" className="text-xs">
                            +{shop.services.length - 3} more
                          </Badge>
                        )}
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </Layout>
  );
};

export default MyShops;