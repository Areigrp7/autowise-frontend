import { useState, useMemo } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { CustomSelect } from '@/components/CustomSelect';
import { Checkbox } from '@/components/ui/checkbox';
import { Slider } from '@/components/ui/slider';
import Layout from '@/components/Layout';
import { 
  Search, 
  Filter, 
  Star, 
  ShoppingCart, 
  Heart,
  Shield,
  Truck,
  GitCompare,
  Grid,
  List,
  Award
} from 'lucide-react';

interface Part {
  id: string;
  name: string;
  brand: string;
  price: number;
  originalPrice?: number;
  rating: number;
  reviews: number;
  isOem: boolean;
  seller: string;
  shipping: string;
  warranty: string;
  inStock: boolean;
  image: string;
  bestValueScore: number;
  features: string[];
  compatibility: string[];
}

export default function PartsSearchPage() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  
  const [searchQuery, setSearchQuery] = useState(searchParams.get('search') || 'brake pads');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [priceRange, setPriceRange] = useState([0, 500]);
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [oemOnly, setOemOnly] = useState(false);
  const [inStockOnly, setInStockOnly] = useState(false);
  const [sortBy, setSortBy] = useState('bestValue');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [compareList, setCompareList] = useState<string[]>([]);
  const [vehicleInfo] = useState({
    year: searchParams.get('year') || '2019',
    make: searchParams.get('make') || 'Toyota',
    model: searchParams.get('model') || 'Camry'
  });

  // Mock parts data
  const allParts: Part[] = [
    {
      id: '1',
      name: 'Premium Ceramic Brake Pads - Front Set',
      brand: 'Brembo',
      price: 89.99,
      originalPrice: 129.99,
      rating: 4.8,
      reviews: 1247,
      isOem: false,
      seller: 'AutoZone',
      shipping: 'Free 2-day shipping',
      warranty: '3 years / 36,000 miles',
      inStock: true,
      image: '/api/placeholder/300/200',
      bestValueScore: 9.2,
      features: ['Low dust formula', 'Quiet operation', 'Extended wear'],
      compatibility: ['2019-2024 Toyota Camry', '2020-2024 Honda Accord']
    },
    {
      id: '2',
      name: 'OEM Brake Pad Set - Front',
      brand: 'Toyota',
      price: 149.99,
      rating: 4.9,
      reviews: 892,
      isOem: true,
      seller: 'Toyota Dealer',
      shipping: '3-5 business days',
      warranty: '2 years / 24,000 miles',
      inStock: true,
      image: '/api/placeholder/300/200',
      bestValueScore: 8.7,
      features: ['OEM specification', 'Perfect fit', 'Factory quality'],
      compatibility: ['2019-2024 Toyota Camry']
    },
    {
      id: '3',
      name: 'Performance Brake Pads - Sport',
      brand: 'Hawk Performance',
      price: 124.99,
      originalPrice: 159.99,
      rating: 4.6,
      reviews: 634,
      isOem: false,
      seller: 'Summit Racing',
      shipping: 'Free shipping over $99',
      warranty: '1 year / 12,000 miles',
      inStock: false,
      image: '/api/placeholder/300/200',
      bestValueScore: 8.1,
      features: ['High temperature resistance', 'Aggressive bite', 'Track tested'],
      compatibility: ['2019-2024 Toyota Camry', '2018-2024 Honda Civic Si']
    },
    {
      id: '4',
      name: 'Economy Brake Pads - Front',
      brand: 'Bosch',
      price: 54.99,
      rating: 4.3,
      reviews: 423,
      isOem: false,
      seller: 'Amazon',
      shipping: 'Prime 1-day delivery',
      warranty: '1 year / 12,000 miles',
      inStock: true,
      image: '/api/placeholder/300/200',
      bestValueScore: 7.8,
      features: ['Budget friendly', 'Reliable performance', 'Easy installation'],
      compatibility: ['2015-2024 Toyota Camry', '2016-2024 Honda Accord']
    }
  ];

  const categories = [
    { value: '', label: 'All Categories' },
    { value: 'Brake System', label: 'Brake System' },
    { value: 'Engine', label: 'Engine' },
    { value: 'Suspension', label: 'Suspension' },
    { value: 'Electrical', label: 'Electrical' },
    { value: 'Filters', label: 'Filters' },
    { value: 'Fluids', label: 'Fluids' },
    { value: 'Belts & Hoses', label: 'Belts & Hoses' }
  ];

  const brands = ['Brembo', 'Toyota', 'Hawk Performance', 'Bosch', 'ACDelco', 'Motorcraft', 'Denso'];

  const sortOptions = [
    { value: 'bestValue', label: 'Best Value' },
    { value: 'priceLow', label: 'Price: Low to High' },
    { value: 'priceHigh', label: 'Price: High to Low' },
    { value: 'rating', label: 'Highest Rated' },
    { value: 'reviews', label: 'Most Reviews' }
  ];

  // Filter and sort parts
  const filteredParts = useMemo(() => {
    const filtered = allParts.filter(part => {
      const matchesSearch = part.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           part.brand.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesPrice = part.price >= priceRange[0] && part.price <= priceRange[1];
      const matchesBrand = selectedBrands.length === 0 || selectedBrands.includes(part.brand);
      const matchesOem = !oemOnly || part.isOem;
      const matchesStock = !inStockOnly || part.inStock;
      
      return matchesSearch && matchesPrice && matchesBrand && matchesOem && matchesStock;
    });

    // Sort parts
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'bestValue':
          return b.bestValueScore - a.bestValueScore;
        case 'priceLow':
          return a.price - b.price;
        case 'priceHigh':
          return b.price - a.price;
        case 'rating':
          return b.rating - a.rating;
        case 'reviews':
          return b.reviews - a.reviews;
        default:
          return 0;
      }
    });

    return filtered;
  }, [searchQuery, priceRange, selectedBrands, oemOnly, inStockOnly, sortBy]);

  const toggleBrand = (brand: string) => {
    setSelectedBrands(prev => 
      prev.includes(brand) 
        ? prev.filter(b => b !== brand)
        : [...prev, brand]
    );
  };

  const toggleCompare = (partId: string) => {
    setCompareList(prev => 
      prev.includes(partId)
        ? prev.filter(id => id !== partId)
        : prev.length < 3 ? [...prev, partId] : prev
    );
  };

  const getBestValueColor = (score: number) => {
    if (score >= 9) return 'text-green-600 bg-green-50';
    if (score >= 8) return 'text-blue-600 bg-blue-50';
    if (score >= 7) return 'text-yellow-600 bg-yellow-50';
    return 'text-gray-600 bg-gray-50';
  };

  const handleAddToCart = (part: Part) => {
    console.log('Adding to cart:', part);
    navigate('/cart');
  };

  const handleGetInstallationQuote = (part: Part) => {
    console.log('Getting installation quote for:', part);
    navigate('/quotes');
  };

  const handleChangeVehicle = () => {
    navigate('/dashboard');
  };

  const handleCompareSelected = () => {
    if (compareList.length > 0) {
      console.log('Comparing parts:', compareList);
      // In a real app, this would open a comparison modal or navigate to a comparison page
    }
  };

  return (
    <Layout currentPage="parts">
      <div className="container mx-auto px-4 py-6">
        {/* Search Header */}
        <div className="mb-6">
          <div className="flex gap-4 mb-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <Input
                placeholder="Search for parts..."
                className="pl-10"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <CustomSelect
              options={categories}
              value={selectedCategory}
              onValueChange={setSelectedCategory}
              placeholder="All Categories"
              className="w-48"
            />
            <Button>
              <Search className="h-4 w-4 mr-2" />
              Search
            </Button>
          </div>

          {/* Vehicle Context */}
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <span>Showing parts for:</span>
            <Badge variant="outline">{vehicleInfo.year} {vehicleInfo.make} {vehicleInfo.model}</Badge>
            <Button variant="link" size="sm" className="h-auto p-0" onClick={handleChangeVehicle}>
              Change Vehicle
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Filters Sidebar */}
          <div className="lg:col-span-1">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Filter className="h-5 w-5 mr-2" />
                  Filters
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Price Range */}
                <div>
                  <label className="text-sm font-medium mb-3 block">Price Range</label>
                  <Slider
                    value={priceRange}
                    onValueChange={setPriceRange}
                    max={500}
                    step={10}
                    className="mb-2"
                  />
                  <div className="flex justify-between text-sm text-gray-600">
                    <span>${priceRange[0]}</span>
                    <span>${priceRange[1]}</span>
                  </div>
                </div>

                {/* Brands */}
                <div>
                  <label className="text-sm font-medium mb-3 block">Brands</label>
                  <div className="space-y-2">
                    {brands.map(brand => (
                      <div key={`brand-${brand}`} className="flex items-center space-x-2">
                        <Checkbox
                          id={`brand-${brand}`}
                          checked={selectedBrands.includes(brand)}
                          onCheckedChange={() => toggleBrand(brand)}
                        />
                        <label htmlFor={`brand-${brand}`} className="text-sm">{brand}</label>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Options */}
                <div className="space-y-3">
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="oem"
                      checked={oemOnly}
                      onCheckedChange={setOemOnly}
                    />
                    <label htmlFor="oem" className="text-sm">OEM Parts Only</label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="instock"
                      checked={inStockOnly}
                      onCheckedChange={setInStockOnly}
                    />
                    <label htmlFor="instock" className="text-sm">In Stock Only</label>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Results */}
          <div className="lg:col-span-3">
            {/* Results Header */}
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-4">
                <span className="text-lg font-medium">
                  {filteredParts.length} parts found
                </span>
                {compareList.length > 0 && (
                  <Button variant="outline" size="sm" onClick={handleCompareSelected}>
                    <GitCompare className="h-4 w-4 mr-2" />
                    Compare ({compareList.length})
                  </Button>
                )}
              </div>
              
              <div className="flex items-center gap-3">
                <CustomSelect
                  options={sortOptions}
                  value={sortBy}
                  onValueChange={setSortBy}
                  className="w-40"
                />
                
                <div className="flex border rounded-md">
                  <Button
                    variant={viewMode === 'grid' ? 'default' : 'ghost'}
                    size="sm"
                    onClick={() => setViewMode('grid')}
                  >
                    <Grid className="h-4 w-4" />
                  </Button>
                  <Button
                    variant={viewMode === 'list' ? 'default' : 'ghost'}
                    size="sm"
                    onClick={() => setViewMode('list')}
                  >
                    <List className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>

            {/* Parts Grid/List */}
            <div className={viewMode === 'grid' 
              ? 'grid grid-cols-1 md:grid-cols-2 gap-6' 
              : 'space-y-4'
            }>
              {filteredParts.map(part => (
                <Card key={part.id} className="hover:shadow-lg transition-shadow">
                  <CardHeader className="pb-3">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <CardTitle className="text-lg leading-tight mb-1">
                          {part.name}
                        </CardTitle>
                        <CardDescription className="flex items-center gap-2">
                          <span>{part.brand}</span>
                          {part.isOem && (
                            <Badge variant="secondary" className="text-xs">
                              <Shield className="h-3 w-3 mr-1" />
                              OEM
                            </Badge>
                          )}
                        </CardDescription>
                      </div>
                      
                      <div className="flex flex-col items-end gap-1">
                        <div className={`px-2 py-1 rounded text-xs font-medium ${getBestValueColor(part.bestValueScore)}`}>
                          <Award className="h-3 w-3 inline mr-1" />
                          {part.bestValueScore}/10
                        </div>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => toggleCompare(part.id)}
                          className={compareList.includes(part.id) ? 'text-blue-600' : ''}
                        >
                          <GitCompare className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </CardHeader>
                  
                  <CardContent>
                    <div className="flex items-center gap-2 mb-3">
                      <div className="flex items-center">
                        <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                        <span className="ml-1 text-sm font-medium">{part.rating}</span>
                      </div>
                      <span className="text-sm text-gray-500">({part.reviews} reviews)</span>
                      {!part.inStock && (
                        <Badge variant="destructive" className="text-xs">Out of Stock</Badge>
                      )}
                    </div>

                    <div className="flex items-center gap-2 mb-3">
                      <span className="text-2xl font-bold text-green-600">${part.price}</span>
                      {part.originalPrice && (
                        <>
                          <span className="text-lg text-gray-500 line-through">${part.originalPrice}</span>
                          <Badge variant="destructive" className="text-xs">
                            {Math.round((1 - part.price / part.originalPrice) * 100)}% OFF
                          </Badge>
                        </>
                      )}
                    </div>

                    <div className="text-sm text-gray-600 mb-3">
                      <div className="flex items-center gap-1 mb-1">
                        <Truck className="h-3 w-3" />
                        <span>{part.shipping}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Shield className="h-3 w-3" />
                        <span>{part.warranty}</span>
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-1 mb-4">
                      {part.features.slice(0, 2).map((feature, i) => (
                        <Badge key={`feature-${i}`} variant="outline" className="text-xs">
                          {feature}
                        </Badge>
                      ))}
                    </div>

                    <div className="flex gap-2">
                      <Button 
                        className="flex-1" 
                        disabled={!part.inStock}
                        onClick={() => handleAddToCart(part)}
                      >
                        <ShoppingCart className="h-4 w-4 mr-2" />
                        Add to Cart
                      </Button>
                      <Button variant="outline" size="sm">
                        <Heart className="h-4 w-4" />
                      </Button>
                    </div>

                    <Button 
                      variant="link" 
                      className="w-full mt-2 text-sm"
                      onClick={() => handleGetInstallationQuote(part)}
                    >
                      Get Installation Quote
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>

            {filteredParts.length === 0 && (
              <div className="text-center py-12">
                <Search className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">No parts found</h3>
                <p className="text-gray-600">Try adjusting your filters or search terms.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
}