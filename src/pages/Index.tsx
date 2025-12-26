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
import { useCart } from '../context/CartContext';

interface Deal {
  id: number;
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
  const { addToCart } = useCart();

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
      id: 1,
      part: 'Brake Pads Set',
      brand: 'Brembo',
      originalPrice: 129.99,
      salePrice: 89.99,
      rating: 4.8,
      reviews: 1247,
      badge: 'Best Seller'
    },
    {
      id: 2,
      part: 'Oil Filter',
      brand: 'Bosch',
      originalPrice: 24.99,
      salePrice: 16.99,
      rating: 4.6,
      reviews: 892,
      badge: 'OEM Quality'
    },
    {
      id: 3,
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
    navigate(`/parts?year=${selectedYear}&make=${selectedMake}&model=${selectedModel}&q=${encodeURIComponent(searchQuery)}`);
  };

  const handleAddToCart = (deal: Deal) => {
    addToCart({
      id: deal.id.toString(), // Convert to string for CartContext
      name: deal.part,
      brand: deal.brand,
      price: deal.salePrice,
      image_url: '/api/placeholder/300/200', // Assuming a placeholder image for deals
      type: 'part',
    });
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
      {/* Hero Section - Responsive */}
      <section className="relative py-8 md:py-12 lg:py-20 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="max-w-4xl mx-auto text-center px-2 sm:px-4">
            <h1 className="text-3xl xs:text-4xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-4 md:mb-6 leading-tight tracking-tight">
              Compare Parts, Connect with{' '}
              <span className="text-blue-600 block sm:inline">Trusted Mechanics</span>
            </h1>
            <p className="text-base sm:text-lg md:text-xl text-gray-600 mb-6 md:mb-8 max-w-2xl mx-auto leading-relaxed px-2">
              Find the best deals on car parts and get instant installation quotes from verified mechanics near you.
            </p>

            {/* Vehicle Selection - Responsive */}
            <div className="bg-white rounded-xl sm:rounded-2xl shadow-lg sm:shadow-xl p-4 sm:p-6 md:p-8 mb-6 md:mb-8 mx-2 sm:mx-0">
              <h3 className="text-base sm:text-lg font-semibold mb-3 md:mb-4 text-left text-gray-800">
                First, tell us about your vehicle:
              </h3>
              <div className="grid grid-cols-1 xs:grid-cols-2 md:grid-cols-3 gap-3 sm:gap-4 mb-4 md:mb-6">
                <div className="col-span-1">
                  <CustomSelect
                    options={years}
                    value={selectedYear}
                    onValueChange={setSelectedYear}
                    placeholder="Select Year"
                    className="w-full text-sm sm:text-base"
                  />
                </div>
                <div className="col-span-1">
                  <CustomSelect
                    options={makes}
                    value={selectedMake}
                    onValueChange={(value) => {
                      setSelectedMake(value);
                      setSelectedModel('');
                    }}
                    placeholder="Select Make"
                    className="w-full text-sm sm:text-base"
                  />
                </div>
                <div className="col-span-1 xs:col-span-2 md:col-span-1">
                  <CustomSelect
                    options={availableModels}
                    value={selectedModel}
                    onValueChange={setSelectedModel}
                    placeholder="Select Model"
                    className="w-full text-sm sm:text-base"
                  />
                </div>
              </div>

              {/* Search Bar - Responsive */}
              <div className="flex flex-col sm:flex-row gap-3">
                <div className="flex-1 relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4 sm:h-5 sm:w-5" />
                  <Input
                    placeholder="What part do you need?"
                    className="pl-9 sm:pl-10 h-11 sm:h-12 text-sm sm:text-base"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                  />
                </div>
                <Button 
                  size="lg" 
                  className="h-11 sm:h-12 px-4 sm:px-8 text-sm sm:text-base w-full sm:w-auto"
                  onClick={handleSearch}
                >
                  <Search className="h-4 w-4 sm:h-5 sm:w-5 mr-2" />
                  Search Parts
                </Button>
              </div>
            </div>

            {/* Quick Stats - Responsive */}
            <div className="grid grid-cols-2 xs:grid-cols-4 gap-3 sm:gap-4 md:gap-6 text-center px-2">
              <div className="p-2 sm:p-3">
                <div className="text-xl sm:text-2xl md:text-3xl font-bold text-blue-600 mb-1">50K+</div>
                <div className="text-xs sm:text-sm text-gray-600">Parts Available</div>
              </div>
              <div className="p-2 sm:p-3">
                <div className="text-xl sm:text-2xl md:text-3xl font-bold text-green-600 mb-1">2,500+</div>
                <div className="text-xs sm:text-sm text-gray-600">Verified Shops</div>
              </div>
              <div className="p-2 sm:p-3">
                <div className="text-xl sm:text-2xl md:text-3xl font-bold text-purple-600 mb-1">$2.3M+</div>
                <div className="text-xs sm:text-sm text-gray-600">Customer Savings</div>
              </div>
              <div className="p-2 sm:p-3">
                <div className="text-xl sm:text-2xl md:text-3xl font-bold text-orange-600 mb-1">4.9★</div>
                <div className="text-xs sm:text-sm text-gray-600">Average Rating</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Deals - Responsive */}
      <section className="py-8 sm:py-12 md:py-16 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="mx-auto max-w-7xl">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 md:mb-8 px-2">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-4 sm:mb-0">
              Today's Featured Deals
            </h2>
            <Button 
              variant="outline" 
              onClick={handleViewAllDeals}
              className="w-full sm:w-auto text-sm"
            >
              View All Deals
            </Button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 px-2">
            {featuredDeals.map((deal, index) => (
              <Card 
                key={`deal-${index}`} 
                className="hover:shadow-lg transition-shadow duration-300 h-full flex flex-col"
              >
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between">
                    <div className="pr-2">
                      <CardTitle className="text-base sm:text-lg font-semibold line-clamp-1">
                        {deal.part}
                      </CardTitle>
                      <CardDescription className="text-sm sm:text-base">
                        {deal.brand}
                      </CardDescription>
                    </div>
                    <Badge variant="secondary" className="text-xs whitespace-nowrap">
                      {deal.badge}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="pt-0 flex-grow">
                  <div className="flex items-center gap-2 mb-3">
                    <div className="flex items-center">
                      <Star className="h-3 w-3 sm:h-4 sm:w-4 fill-yellow-400 text-yellow-400" />
                      <span className="ml-1 text-sm font-medium">{deal.rating}</span>
                    </div>
                    <span className="text-xs sm:text-sm text-gray-500">
                      ({deal.reviews} reviews)
                    </span>
                  </div>

                  <div className="flex items-center gap-2 mb-4 flex-wrap">
                    <span className="text-xl sm:text-2xl font-bold text-green-600">
                      ${deal.salePrice}
                    </span>
                    <span className="text-base sm:text-lg text-gray-500 line-through">
                      ${deal.originalPrice}
                    </span>
                    <Badge variant="destructive" className="text-xs">
                      {Math.round((1 - deal.salePrice / deal.originalPrice) * 100)}% OFF
                    </Badge>
                  </div>

                  <Button 
                    className="w-full text-sm sm:text-base"
                    onClick={() => handleAddToCart(deal)}
                  >
                    <ShoppingCart className="h-3 w-3 sm:h-4 sm:w-4 mr-2" />
                    Add to Cart
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Nearby Shops - Responsive */}
      <section className="py-8 sm:py-12 md:py-16 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 md:mb-8 px-2">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-4 sm:mb-0">
              Nearby Trusted Shops
            </h2>
            <Button 
              variant="outline" 
              onClick={handleViewOnMap}
              className="w-full sm:w-auto text-sm"
            >
              <MapPin className="h-3 w-3 sm:h-4 sm:w-4 mr-2" />
              View on Map
            </Button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 px-2">
            {nearbyShops.map((shop, index) => (
              <Card 
                key={`shop-${index}`} 
                className="hover:shadow-lg transition-shadow duration-300 h-full flex flex-col"
              >
                <CardHeader className="pb-3">
                  <CardTitle className="text-base sm:text-lg font-semibold line-clamp-1">
                    {shop.name}
                  </CardTitle>
                  <div className="flex items-center gap-2 sm:gap-4 flex-wrap">
                    <div className="flex items-center">
                      <Star className="h-3 w-3 sm:h-4 sm:w-4 fill-yellow-400 text-yellow-400" />
                      <span className="ml-1 text-sm font-medium">{shop.rating}</span>
                      <span className="text-xs sm:text-sm text-gray-500 ml-1">
                        ({shop.reviews})
                      </span>
                    </div>
                    <div className="flex items-center text-xs sm:text-sm text-gray-600">
                      <MapPin className="h-3 w-3 sm:h-4 sm:w-4 mr-1" />
                      {shop.distance}
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="pt-0 flex-grow">
                  <div className="mb-3">
                    <div className="flex flex-wrap gap-1">
                      {shop.specialties.map((specialty, i) => (
                        <Badge 
                          key={`specialty-${i}`} 
                          variant="outline" 
                          className="text-xs"
                        >
                          {specialty}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <div className="flex items-center text-xs sm:text-sm text-green-600 mb-4">
                    <Clock className="h-3 w-3 sm:h-4 sm:w-4 mr-1 flex-shrink-0" />
                    <span className="truncate">Next: {shop.nextAvailable}</span>
                  </div>

                  <Button 
                    className="w-full text-sm sm:text-base"
                    variant="outline" 
                    onClick={() => handleGetQuote(shop)}
                  >
                    <Wrench className="h-3 w-3 sm:h-4 sm:w-4 mr-2" />
                    Get Quote
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works - Responsive */}
      <section className="py-8 sm:py-12 md:py-16 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="mx-auto max-w-7xl">
          <div className="text-center mb-8 md:mb-12 px-2">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-3 md:mb-4">
              How AutoWise Works
            </h2>
            <p className="text-base sm:text-lg md:text-xl text-gray-600 max-w-2xl mx-auto">
              Get the best deals and service in just a few simple steps
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 px-2">
            <div className="text-center p-4">
              <div className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4">
                <Car className="h-5 w-5 sm:h-6 sm:w-6 md:h-8 md:w-8 text-blue-600" />
              </div>
              <h3 className="text-base sm:text-lg font-semibold mb-2">1. Add Your Vehicle</h3>
              <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
                Tell us about your car to get compatible parts and local service options.
              </p>
            </div>

            <div className="text-center p-4">
              <div className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4">
                <Search className="h-5 w-5 sm:h-6 sm:w-6 md:h-8 md:w-8 text-green-600" />
              </div>
              <h3 className="text-base sm:text-lg font-semibold mb-2">2. Compare Parts</h3>
              <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
                Browse thousands of parts with real-time pricing from trusted suppliers.
              </p>
            </div>

            <div className="text-center p-4">
              <div className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4">
                <Users className="h-5 w-5 sm:h-6 sm:w-6 md:h-8 md:w-8 text-purple-600" />
              </div>
              <h3 className="text-base sm:text-lg font-semibold mb-2">3. Get Quotes</h3>
              <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
                Receive competitive installation quotes from verified mechanics nearby.
              </p>
            </div>

            <div className="text-center p-4">
              <div className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4">
                <CheckCircle className="h-5 w-5 sm:h-6 sm:w-6 md:h-8 md:w-8 text-orange-600" />
              </div>
              <h3 className="text-base sm:text-lg font-semibold mb-2">4. Book & Save</h3>
              <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
                Choose the best deal, book your appointment, and save money on quality service.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits - Responsive */}
      <section className="py-8 sm:py-12 md:py-16 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="text-center mb-8 md:mb-12 px-2">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-3 md:mb-4">
              Why Choose AutoWise?
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 px-2">
            <Card className="text-center p-4 sm:p-6 h-full">
              <div className="w-10 h-10 sm:w-12 sm:h-12 md:w-16 md:h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4">
                <DollarSign className="h-5 w-5 sm:h-6 sm:w-6 md:h-8 md:w-8 text-green-600" />
              </div>
              <CardTitle className="text-base sm:text-lg font-semibold mb-2">
                Save Up to 40%
              </CardTitle>
              <CardDescription className="text-sm sm:text-base">
                Compare prices from multiple suppliers and get competitive quotes from local mechanics.
              </CardDescription>
            </Card>

            <Card className="text-center p-4 sm:p-6 h-full">
              <div className="w-10 h-10 sm:w-12 sm:h-12 md:w-16 md:h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4">
                <Shield className="h-5 w-5 sm:h-6 sm:w-6 md:h-8 md:w-8 text-blue-600" />
              </div>
              <CardTitle className="text-base sm:text-lg font-semibold mb-2">
                Verified Quality
              </CardTitle>
              <CardDescription className="text-sm sm:text-base">
                All parts and shops are verified for quality and authenticity. Your satisfaction is guaranteed.
              </CardDescription>
            </Card>

            <Card className="text-center p-4 sm:p-6 h-full">
              <div className="w-10 h-10 sm:w-12 sm:h-12 md:w-16 md:h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4">
                <Zap className="h-5 w-5 sm:h-6 sm:w-6 md:h-8 md:w-8 text-purple-600" />
              </div>
              <CardTitle className="text-base sm:text-lg font-semibold mb-2">
                Fast & Convenient
              </CardTitle>
              <CardDescription className="text-sm sm:text-base">
                Book appointments instantly and track your service from start to finish with real-time updates.
              </CardDescription>
            </Card>
          </div>
        </div>
      </section>
    </Layout>
  );
}
