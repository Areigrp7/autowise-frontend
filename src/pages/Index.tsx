import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { CustomSelect } from '@/components/CustomSelect';
import Layout from '@/components/Layout';
import { 
  Search, 
  MapPin, 
  Clock, 
  Star, 
  TrendingUp,
  Shield,
  Zap,
  Users,
  Car,
  Wrench,
  DollarSign,
  CheckCircle,
  ShoppingCart
} from 'lucide-react';

interface Deal {
  part: string;
  brand: string;
  originalPrice: number;
  salePrice: number;
  rating: number;
  reviews: number;
  badge: string;
}

interface Shop {
  name: string;
  rating: number;
  reviews: number;
  distance: string;
  specialties: string[];
  nextAvailable: string;
}

export default function HomePage() {
  const [selectedYear, setSelectedYear] = useState('');
  const [selectedMake, setSelectedMake] = useState('');
  const [selectedModel, setSelectedModel] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  const years = Array.from({ length: 25 }, (_, i) => ({
    value: (2024 - i).toString(),
    label: (2024 - i).toString()
  }));

  const makes = [
    { value: 'Toyota', label: 'Toyota' },
    { value: 'Honda', label: 'Honda' },
    { value: 'Ford', label: 'Ford' },
    { value: 'Chevrolet', label: 'Chevrolet' },
    { value: 'Nissan', label: 'Nissan' },
    { value: 'BMW', label: 'BMW' },
    { value: 'Mercedes-Benz', label: 'Mercedes-Benz' },
    { value: 'Audi', label: 'Audi' }
  ];

  const modelsMap: Record<string, { value: string; label: string }[]> = {
    'Toyota': [
      { value: 'Camry', label: 'Camry' },
      { value: 'Corolla', label: 'Corolla' },
      { value: 'RAV4', label: 'RAV4' },
      { value: 'Prius', label: 'Prius' },
      { value: 'Highlander', label: 'Highlander' }
    ],
    'Honda': [
      { value: 'Civic', label: 'Civic' },
      { value: 'Accord', label: 'Accord' },
      { value: 'CR-V', label: 'CR-V' },
      { value: 'Pilot', label: 'Pilot' },
      { value: 'Fit', label: 'Fit' }
    ],
    'Ford': [
      { value: 'F-150', label: 'F-150' },
      { value: 'Escape', label: 'Escape' },
      { value: 'Explorer', label: 'Explorer' },
      { value: 'Mustang', label: 'Mustang' },
      { value: 'Focus', label: 'Focus' }
    ]
  };

  const availableModels = selectedMake ? modelsMap[selectedMake] || [] : [];

  const featuredDeals: Deal[] = [
    {
      part: 'Brake Pads Set',
      brand: 'Brembo',
      originalPrice: 129.99,
      salePrice: 89.99,
      rating: 4.8,
      reviews: 1247,
      badge: 'Best Seller'
    },
    {
      part: 'Oil Filter',
      brand: 'Bosch',
      originalPrice: 24.99,
      salePrice: 16.99,
      rating: 4.6,
      reviews: 892,
      badge: 'OEM Quality'
    },
    {
      part: 'Air Filter',
      brand: 'K&N',
      originalPrice: 49.99,
      salePrice: 34.99,
      rating: 4.7,
      reviews: 634,
      badge: 'Performance'
    }
  ];

  const nearbyShops: Shop[] = [
    {
      name: 'QuickFix Auto Service',
      rating: 4.8,
      reviews: 324,
      distance: '1.2 mi',
      specialties: ['Brakes', 'Oil Change', 'Diagnostics'],
      nextAvailable: 'Today 2:30 PM'
    },
    {
      name: 'Premier Automotive',
      rating: 4.9,
      reviews: 567,
      distance: '2.1 mi',
      specialties: ['Engine Repair', 'Transmission', 'AC Service'],
      nextAvailable: 'Tomorrow 9:00 AM'
    },
    {
      name: 'City Motors Garage',
      rating: 4.6,
      reviews: 189,
      distance: '2.8 mi',
      specialties: ['Tires', 'Alignment', 'Suspension'],
      nextAvailable: 'Today 4:00 PM'
    }
  ];

  const handleSearch = () => {
    if (!selectedYear || !selectedMake || !selectedModel) {
      alert('Please select your vehicle details first');
      return;
    }
    navigate(`/parts?year=${selectedYear}&make=${selectedMake}&model=${selectedModel}&search=${encodeURIComponent(searchQuery)}`);
  };

  const handleAddToCart = (deal: Deal) => {
    console.log('Adding to cart:', deal);
    navigate('/cart');
  };

  const handleGetQuote = (shop: Shop) => {
    console.log('Getting quote from:', shop);
    navigate('/quotes');
  };

  const handleViewAllDeals = () => {
    navigate('/parts');
  };

  const handleViewOnMap = () => {
    navigate('/shops');
  };

  return (
    <Layout currentPage="home">
      {/* Hero Section */}
      <section className="relative py-20 px-4">
        <div className="container mx-auto text-center">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
              Compare Parts, Connect with 
              <span className="text-blue-600"> Trusted Mechanics</span>
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
              Find the best deals on car parts and get instant installation quotes from verified mechanics near you.
            </p>

            {/* Vehicle Selection */}
            <div className="bg-white rounded-2xl shadow-xl p-8 mb-8">
              <h3 className="text-lg font-semibold mb-4 text-left">First, tell us about your vehicle:</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                <CustomSelect
                  options={years}
                  value={selectedYear}
                  onValueChange={setSelectedYear}
                  placeholder="Select Year"
                />

                <CustomSelect
                  options={makes}
                  value={selectedMake}
                  onValueChange={(value) => {
                    setSelectedMake(value);
                    setSelectedModel(''); // Reset model when make changes
                  }}
                  placeholder="Select Make"
                />

                <CustomSelect
                  options={availableModels}
                  value={selectedModel}
                  onValueChange={setSelectedModel}
                  placeholder="Select Model"
                />
              </div>

              {/* Search Bar */}
              <div className="flex gap-3">
                <div className="flex-1 relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                  <Input
                    placeholder="What part do you need? (e.g., brake pads, oil filter, spark plugs)"
                    className="pl-10 h-12 text-lg"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                  />
                </div>
                <Button size="lg" className="h-12 px-8" onClick={handleSearch}>
                  <Search className="h-5 w-5 mr-2" />
                  Search Parts
                </Button>
              </div>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
              <div>
                <div className="text-3xl font-bold text-blue-600">50K+</div>
                <div className="text-gray-600">Parts Available</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-green-600">2,500+</div>
                <div className="text-gray-600">Verified Shops</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-purple-600">$2.3M+</div>
                <div className="text-gray-600">Customer Savings</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-orange-600">4.9★</div>
                <div className="text-gray-600">Average Rating</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Deals */}
      <section className="py-16 px-4 bg-white">
        <div className="container mx-auto">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl font-bold text-gray-900">Today's Featured Deals</h2>
            <Button variant="outline" onClick={handleViewAllDeals}>View All Deals</Button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {featuredDeals.map((deal, index) => (
              <Card key={`deal-${index}`} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle className="text-lg">{deal.part}</CardTitle>
                      <CardDescription>{deal.brand}</CardDescription>
                    </div>
                    <Badge variant="secondary">{deal.badge}</Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center gap-2 mb-3">
                    <div className="flex items-center">
                      <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      <span className="ml-1 text-sm font-medium">{deal.rating}</span>
                    </div>
                    <span className="text-sm text-gray-500">({deal.reviews} reviews)</span>
                  </div>
                  
                  <div className="flex items-center gap-2 mb-4">
                    <span className="text-2xl font-bold text-green-600">${deal.salePrice}</span>
                    <span className="text-lg text-gray-500 line-through">${deal.originalPrice}</span>
                    <Badge variant="destructive">
                      {Math.round((1 - deal.salePrice / deal.originalPrice) * 100)}% OFF
                    </Badge>
                  </div>
                  
                  <Button className="w-full" onClick={() => handleAddToCart(deal)}>
                    <ShoppingCart className="h-4 w-4 mr-2" />
                    Add to Cart
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Nearby Shops */}
      <section className="py-16 px-4">
        <div className="container mx-auto">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl font-bold text-gray-900">Nearby Trusted Shops</h2>
            <Button variant="outline" onClick={handleViewOnMap}>
              <MapPin className="h-4 w-4 mr-2" />
              View on Map
            </Button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {nearbyShops.map((shop, index) => (
              <Card key={`shop-${index}`} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <CardTitle className="text-lg">{shop.name}</CardTitle>
                  <div className="flex items-center gap-4">
                    <div className="flex items-center">
                      <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      <span className="ml-1 font-medium">{shop.rating}</span>
                      <span className="text-sm text-gray-500 ml-1">({shop.reviews})</span>
                    </div>
                    <div className="flex items-center text-sm text-gray-600">
                      <MapPin className="h-4 w-4 mr-1" />
                      {shop.distance}
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="mb-4">
                    <div className="flex flex-wrap gap-1">
                      {shop.specialties.map((specialty, i) => (
                        <Badge key={`specialty-${i}`} variant="outline" className="text-xs">
                          {specialty}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  
                  <div className="flex items-center text-sm text-green-600 mb-4">
                    <Clock className="h-4 w-4 mr-1" />
                    Next available: {shop.nextAvailable}
                  </div>
                  
                  <Button className="w-full" variant="outline" onClick={() => handleGetQuote(shop)}>
                    <Wrench className="h-4 w-4 mr-2" />
                    Get Quote
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16 px-4 bg-white">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">How AutoWise Works</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Get the best deals and service in just a few simple steps
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Car className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-lg font-semibold mb-2">1. Add Your Vehicle</h3>
              <p className="text-gray-600">Tell us about your car to get compatible parts and local service options.</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Search className="h-8 w-8 text-green-600" />
              </div>
              <h3 className="text-lg font-semibold mb-2">2. Compare Parts</h3>
              <p className="text-gray-600">Browse thousands of parts with real-time pricing from trusted suppliers.</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="h-8 w-8 text-purple-600" />
              </div>
              <h3 className="text-lg font-semibold mb-2">3. Get Quotes</h3>
              <p className="text-gray-600">Receive competitive installation quotes from verified mechanics nearby.</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="h-8 w-8 text-orange-600" />
              </div>
              <h3 className="text-lg font-semibold mb-2">4. Book & Save</h3>
              <p className="text-gray-600">Choose the best deal, book your appointment, and save money on quality service.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-16 px-4">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Why Choose AutoWise?</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="text-center p-6">
              <DollarSign className="h-12 w-12 text-green-600 mx-auto mb-4" />
              <CardTitle className="mb-2">Save Up to 40%</CardTitle>
              <CardDescription>
                Compare prices from multiple suppliers and get competitive quotes from local mechanics.
              </CardDescription>
            </Card>
            
            <Card className="text-center p-6">
              <Shield className="h-12 w-12 text-blue-600 mx-auto mb-4" />
              <CardTitle className="mb-2">Verified Quality</CardTitle>
              <CardDescription>
                All parts and shops are verified for quality and authenticity. Your satisfaction is guaranteed.
              </CardDescription>
            </Card>
            
            <Card className="text-center p-6">
              <Zap className="h-12 w-12 text-purple-600 mx-auto mb-4" />
              <CardTitle className="mb-2">Fast & Convenient</CardTitle>
              <CardDescription>
                Book appointments instantly and track your service from start to finish with real-time updates.
              </CardDescription>
            </Card>
          </div>
        </div>
      </section>
    </Layout>
  );
}