import { useState, useMemo, useEffect } from 'react';
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
  Award,
  Loader2
} from 'lucide-react';
import { useCart } from '../context/CartContext'; // Import useCart
import { fetchParts } from '../lib/apiClient';

interface Part {
  id: number;
  name: string;
  brand: string;
  price: number;
  original_price?: number;
  rating: number;
  reviews: number;
  is_oem: boolean;
  seller: string;
  shipping: string;
  warranty: string;
  in_stock: boolean;
  image_url: string;
  best_value_score: number;
  features: string[];
  compatibility: string[];
  category: string;
}

export default function PartsSearchPage() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { addToCart } = useCart(); // Use the cart hook

  const [parts, setParts] = useState<Part[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const initialYear = searchParams.get('year') || '';
  const initialMake = searchParams.get('make') || '';
  const initialModel = searchParams.get('model') || '';
  const initialQuery = searchParams.get('q') || '';

  const [searchQuery, setSearchQuery] = useState(initialQuery);
  const [vehicleInfo] = useState({
    year: initialYear,
    make: initialMake,
    model: initialModel
  });

  useEffect(() => {
    const getParts = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await fetchParts({
          year: initialYear,
          make: initialMake,
          model: initialModel,
          q: initialQuery,
        });
        setParts(data);
      } catch (err) {
        setError('Failed to fetch parts');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    getParts();
  }, [initialYear, initialMake, initialModel, initialQuery]);

  const [selectedCategory, setSelectedCategory] = useState('');
  const [priceRange, setPriceRange] = useState([0, 500]);
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [oemOnly, setOemOnly] = useState(false);
  const [inStockOnly, setInStockOnly] = useState(false);
  const [sortBy, setSortBy] = useState('bestValue');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [compareList, setCompareList] = useState<string[]>([]);
  const [filtersOpen, setFiltersOpen] = useState(false);

  const categories = useMemo(() => {
    const uniqueCategories = Array.from(new Set(parts.map(part => part.category)));
    return [{ value: '', label: 'All Categories' }, ...uniqueCategories.map(category => ({ value: category, label: category }))];
  }, [parts]);

  const brands = useMemo(() => {
    return Array.from(new Set(parts.map(part => part.brand)));
  }, [parts]);

  const sortOptions = [
    { value: 'bestValue', label: 'Best Value' },
    { value: 'priceLow', label: 'Price: Low to High' },
    { value: 'priceHigh', label: 'Price: High to Low' },
    { value: 'rating', label: 'Highest Rated' },
    { value: 'reviews', label: 'Most Reviews' }
  ];

  // Filter and sort parts
  const filteredParts = useMemo(() => {
    let currentParts = parts;
    if (selectedCategory) {
      currentParts = currentParts.filter(part => part.category === selectedCategory);
    }

    const filtered = currentParts.filter(part => {
      const matchesSearch = part.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           part.brand.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesPrice = part.price >= priceRange[0] && part.price <= priceRange[1];
      const matchesBrand = selectedBrands.length === 0 || selectedBrands.includes(part.brand);
      const matchesOem = !oemOnly || part.is_oem;
      const matchesStock = !inStockOnly || part.in_stock;

      return matchesSearch && matchesPrice && matchesBrand && matchesOem && matchesStock;
    });

    // Sort parts
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'bestValue':
          return b.best_value_score - a.best_value_score;
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
  }, [parts, searchQuery, selectedCategory, priceRange, selectedBrands, oemOnly, inStockOnly, sortBy]);

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
    addToCart({
      id: part.id.toString(),
      name: part.name,
      price: part.price,
      image_url: part.image_url,
      brand: part.brand,
      type: 'part',
    });
    // Optionally, navigate to cart or show a toast
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

  if (loading) {
    return (
      <Layout currentPage="parts">
        <div className="flex justify-center items-center h-screen">
          <Loader2 className="h-8 w-8 animate-spin text-gray-600" />
          <span className="ml-3 text-lg">Loading parts...</span>
        </div>
      </Layout>
    );
  }

  if (error) {
    return (
      <Layout currentPage="parts">
        <div className="flex justify-center items-center h-screen text-red-600 text-lg">
          Error: {error}
        </div>
      </Layout>
    );
  }

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
            <Button
              variant="outline"
              className="lg:hidden w-full mb-4 flex items-center justify-center"
              onClick={() => setFiltersOpen(!filtersOpen)}
            >
              <Filter className="h-5 w-5 mr-2" />
              {filtersOpen ? 'Hide Filters' : 'Show Filters'}
            </Button>
            <Card className={filtersOpen ? 'block' : 'hidden lg:block'}>
              <CardHeader className="flex flex-row items-center justify-between lg:block">
                <CardTitle className="flex items-center">
                  <Filter className="h-5 w-5 mr-2" />
                  Filters
                </CardTitle>
                <Button
                  variant="ghost"
                  size="icon"
                  className="lg:hidden"
                  onClick={() => setFiltersOpen(false)}
                >
                  <Filter className="h-5 w-5" />
                </Button>
              </CardHeader>
              <CardContent className="space-y-6 pt-4">
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
                          className="h-4 w-4"
                        />
                        <label htmlFor={`brand-${brand}`} className="text-sm">
                          {brand}
                        </label>
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
                      className="h-4 w-4"
                    />
                    <label htmlFor="oem" className="text-sm">OEM Parts Only</label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="instock"
                      checked={inStockOnly}
                      onCheckedChange={setInStockOnly}
                      className="h-4 w-4"
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
                          {part.is_oem && (
                            <Badge variant="secondary" className="text-xs">
                              <Shield className="h-3 w-3 mr-1" />
                              OEM
                            </Badge>
                          )}
                        </CardDescription>
                      </div>

                      <div className="flex flex-col items-end gap-1">
                        <div className={`px-2 py-1 rounded text-xs font-medium ${getBestValueColor(part.best_value_score)}`}>
                          <Award className="h-3 w-3 inline mr-1" />
                          {part.best_value_score}/10
                        </div>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => toggleCompare(part.id.toString())}
                          className={compareList.includes(part.id.toString()) ? 'text-blue-600' : ''}
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
                      {!part.in_stock && (
                        <Badge variant="destructive" className="text-xs">Out of Stock</Badge>
                      )}
                    </div>

                    <div className="flex items-center gap-2 mb-3">
                      <span className="text-2xl font-bold text-green-600">${part.price}</span>
                      {part.original_price && (
                        <>
                          <span className="text-lg text-gray-500 line-through">${part.original_price}</span>
                          <Badge variant="destructive" className="text-xs">
                            {Math.round((1 - part.price / part.original_price) * 100)}% OFF
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
                        disabled={!part.in_stock}
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