import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import { CustomSelect } from '@/components/CustomSelect';
import { Progress } from '@/components/ui/progress';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import Layout from '@/components/Layout';
import { 
  Clock, 
  Star, 
  MapPin, 
  Calendar, 
  DollarSign,
  Wrench,
  Shield,
  CheckCircle,
  AlertCircle,
  Users,
  Award,
  MessageSquare,
  Phone,
  Timer
} from 'lucide-react';

interface Bid {
  id: string;
  shopId: string;
  shopName: string;
  shopRating: number;
  shopReviews: number;
  shopDistance: string;
  laborCost: number;
  estimatedTime: string;
  warranty: string;
  nextAvailable: string;
  specialNotes?: string;
  certifications: string[];
  bidTime: string;
  isAccepted?: boolean;
}

interface QuoteRequest {
  id: string;
  partName: string;
  partBrand: string;
  partPrice: number;
  vehicle: string;
  description: string;
  preferredDate: string;
  urgency: 'Low' | 'Medium' | 'High';
  status: 'Active' | 'Completed' | 'Expired';
  createdAt: string;
  expiresAt: string;
}

type UrgencyType = 'Low' | 'Medium' | 'High';

export default function QuoteBiddingPage() {
  const [activeTab, setActiveTab] = useState<'create' | 'active' | 'history'>('create');
  const [newQuote, setNewQuote] = useState({
    partName: 'Brake Pads Front Set',
    partBrand: 'Brembo',
    partPrice: 89.99,
    vehicle: '2019 Toyota Camry',
    description: '',
    preferredDate: '',
    urgency: 'Medium' as UrgencyType
  });
  const [liveBids, setLiveBids] = useState<Bid[]>([]);
  const [timeRemaining, setTimeRemaining] = useState(3600); // 1 hour in seconds

  const urgencyOptions = [
    { value: 'Low', label: 'Low - Within a week' },
    { value: 'Medium', label: 'Medium - Within 2-3 days' },
    { value: 'High', label: 'High - ASAP' }
  ];

  // Mock active quote
  const activeQuote: QuoteRequest = {
    id: 'q123',
    partName: 'Brake Pads Front Set',
    partBrand: 'Brembo',
    partPrice: 89.99,
    vehicle: '2019 Toyota Camry',
    description: 'Need brake pads replaced. Hearing squealing noise when braking.',
    preferredDate: '2024-01-15',
    urgency: 'Medium',
    status: 'Active',
    createdAt: '2024-01-10T10:00:00Z',
    expiresAt: '2024-01-11T10:00:00Z'
  };

  // Simulate live bidding
  useEffect(() => {
    if (activeTab === 'active') {
      const timer = setInterval(() => {
        setTimeRemaining(prev => Math.max(0, prev - 1));
      }, 1000);

      // Simulate new bids coming in
      const bidTimer = setTimeout(() => {
        const newBid: Bid = {
          id: `bid_${Date.now()}`,
          shopId: 'shop_4',
          shopName: 'Metro Auto Service',
          shopRating: 4.7,
          shopReviews: 156,
          shopDistance: '3.2 mi',
          laborCost: 95,
          estimatedTime: '1.5 hours',
          warranty: '2 years / 24,000 miles',
          nextAvailable: 'Tomorrow 11:00 AM',
          certifications: ['ASE Certified', 'NAPA AutoCare'],
          bidTime: new Date().toLocaleTimeString(),
          specialNotes: 'Can provide mobile service at your location for additional $25'
        };
        setLiveBids(prev => [...prev, newBid].sort((a, b) => a.laborCost - b.laborCost));
      }, 5000);

      return () => {
        clearInterval(timer);
        clearTimeout(bidTimer);
      };
    }
  }, [activeTab]);

  // Initialize with some bids
  useEffect(() => {
    if (activeTab === 'active' && liveBids.length === 0) {
      setLiveBids([
        {
          id: 'bid_1',
          shopId: 'shop_1',
          shopName: 'QuickFix Auto Service',
          shopRating: 4.8,
          shopReviews: 324,
          shopDistance: '1.2 mi',
          laborCost: 120,
          estimatedTime: '2 hours',
          warranty: '3 years / 36,000 miles',
          nextAvailable: 'Today 2:30 PM',
          certifications: ['ASE Certified', 'AAA Approved'],
          bidTime: '10:15 AM'
        },
        {
          id: 'bid_2',
          shopId: 'shop_2',
          shopName: 'Premier Automotive',
          shopRating: 4.9,
          shopReviews: 567,
          shopDistance: '2.1 mi',
          laborCost: 140,
          estimatedTime: '1.5 hours',
          warranty: '2 years / 24,000 miles',
          nextAvailable: 'Tomorrow 9:00 AM',
          certifications: ['ASE Master Technician', 'Bosch Authorized'],
          bidTime: '10:22 AM'
        },
        {
          id: 'bid_3',
          shopId: 'shop_3',
          shopName: 'City Motors Garage',
          shopRating: 4.6,
          shopReviews: 189,
          shopDistance: '2.8 mi',
          laborCost: 85,
          estimatedTime: '2.5 hours',
          warranty: '1 year / 12,000 miles',
          nextAvailable: 'Today 4:00 PM',
          certifications: ['ASE Certified'],
          bidTime: '10:28 AM'
        }
      ]);
    }
  }, [activeTab, liveBids.length]);

  const formatTime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleCreateQuote = () => {
    if (!newQuote.description || !newQuote.preferredDate) {
      alert('Please fill in all required fields');
      return;
    }
    setActiveTab('active');
  };

  const handleAcceptBid = (bidId: string) => {
    setLiveBids(prev => prev.map(bid => 
      bid.id === bidId ? { ...bid, isAccepted: true } : bid
    ));
  };

  return (
    <Layout currentPage="quotebidding">
      <div className="container mx-auto px-4 py-6">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Installation Quotes</h1>
          <p className="text-gray-600">Get competitive quotes from verified mechanics in your area</p>
        </div>

        {/* Navigation Tabs */}
        <div className="flex gap-2 mb-6">
          <Button 
            variant={activeTab === 'create' ? 'default' : 'outline'}
            onClick={() => setActiveTab('create')}
          >
            Create Quote Request
          </Button>
          <Button 
            variant={activeTab === 'active' ? 'default' : 'outline'}
            onClick={() => setActiveTab('active')}
            className="relative"
          >
            Active Quotes
            {activeTab === 'active' && (
              <Badge variant="destructive" className="ml-2">
                Live
              </Badge>
            )}
          </Button>
          <Button 
            variant={activeTab === 'history' ? 'default' : 'outline'}
            onClick={() => setActiveTab('history')}
          >
            Quote History
          </Button>
        </div>

        {/* Create Quote Tab */}
        {activeTab === 'create' && (
          <div className="max-w-2xl mx-auto">
            <Card>
              <CardHeader>
                <CardTitle>Request Installation Quote</CardTitle>
                <CardDescription>
                  Tell us about the part you need installed and get competitive quotes from local shops
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Part Information */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold">Part Information</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-medium mb-2 block">Part Name</label>
                      <Input
                        value={newQuote.partName}
                        onChange={(e) => setNewQuote(prev => ({ ...prev, partName: e.target.value }))}
                        placeholder="e.g., Brake Pads Front Set"
                      />
                    </div>
                    <div>
                      <label className="text-sm font-medium mb-2 block">Brand</label>
                      <Input
                        value={newQuote.partBrand}
                        onChange={(e) => setNewQuote(prev => ({ ...prev, partBrand: e.target.value }))}
                        placeholder="e.g., Brembo"
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-medium mb-2 block">Part Price</label>
                      <div className="relative">
                        <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                        <Input
                          type="number"
                          className="pl-10"
                          value={newQuote.partPrice}
                          onChange={(e) => setNewQuote(prev => ({ ...prev, partPrice: parseFloat(e.target.value) || 0 }))}
                        />
                      </div>
                    </div>
                    <div>
                      <label className="text-sm font-medium mb-2 block">Vehicle</label>
                      <Input
                        value={newQuote.vehicle}
                        onChange={(e) => setNewQuote(prev => ({ ...prev, vehicle: e.target.value }))}
                        placeholder="e.g., 2019 Toyota Camry"
                      />
                    </div>
                  </div>
                </div>

                {/* Service Details */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold">Service Details</h3>
                  <div>
                    <label className="text-sm font-medium mb-2 block">Description *</label>
                    <Textarea
                      placeholder="Describe the work needed, any symptoms, or special requirements..."
                      value={newQuote.description}
                      onChange={(e) => setNewQuote(prev => ({ ...prev, description: e.target.value }))}
                      className="min-h-[100px]"
                    />
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-medium mb-2 block">Preferred Date *</label>
                      <Input
                        type="date"
                        value={newQuote.preferredDate}
                        onChange={(e) => setNewQuote(prev => ({ ...prev, preferredDate: e.target.value }))}
                      />
                    </div>
                    <div>
                      <label className="text-sm font-medium mb-2 block">Urgency</label>
                      <CustomSelect
                        options={urgencyOptions}
                        value={newQuote.urgency}
                        onValueChange={(value: UrgencyType) => setNewQuote(prev => ({ ...prev, urgency: value }))}
                      />
                    </div>
                  </div>
                </div>

                {/* Submit */}
                <div className="bg-blue-50 p-4 rounded-lg">
                  <div className="flex items-start gap-3">
                    <AlertCircle className="h-5 w-5 text-blue-600 mt-0.5" />
                    <div>
                      <h4 className="font-medium text-blue-900">How it works:</h4>
                      <ul className="text-sm text-blue-800 mt-1 space-y-1">
                        <li>• Your quote request will be sent to verified shops in your area</li>
                        <li>• Shops have 24 hours to submit their bids</li>
                        <li>• You can compare quotes and choose the best option</li>
                        <li>• Book directly with your chosen shop</li>
                      </ul>
                    </div>
                  </div>
                </div>

                <Button onClick={handleCreateQuote} className="w-full" size="lg">
                  <Wrench className="h-5 w-5 mr-2" />
                  Request Quotes from Local Shops
                </Button>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Active Quotes Tab */}
        {activeTab === 'active' && (
          <div className="space-y-6">
            {/* Quote Status */}
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="flex items-center gap-2">
                      Quote Request: {activeQuote.partName}
                      <Badge variant="secondary">Active</Badge>
                    </CardTitle>
                    <CardDescription>
                      {activeQuote.partBrand} • {activeQuote.vehicle}
                    </CardDescription>
                  </div>
                  <div className="text-right">
                    <div className="flex items-center gap-2 text-red-600 font-medium">
                      <Timer className="h-4 w-4" />
                      {formatTime(timeRemaining)}
                    </div>
                    <p className="text-sm text-gray-500">Time remaining</p>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                  <div>
                    <p className="text-sm text-gray-600">Part Price</p>
                    <p className="font-medium">${activeQuote.partPrice}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Preferred Date</p>
                    <p className="font-medium">{new Date(activeQuote.preferredDate).toLocaleDateString()}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Urgency</p>
                    <Badge variant={activeQuote.urgency === 'High' ? 'destructive' : 'secondary'}>
                      {activeQuote.urgency}
                    </Badge>
                  </div>
                </div>
                <div>
                  <p className="text-sm text-gray-600 mb-1">Description</p>
                  <p className="text-sm">{activeQuote.description}</p>
                </div>
              </CardContent>
            </Card>

            {/* Live Bids */}
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold">Live Bids ({liveBids.length})</h2>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                <span className="text-sm text-gray-600">Receiving bids...</span>
              </div>
            </div>

            <div className="grid gap-4">
              {liveBids.map((bid, index) => (
                <Card key={bid.id} className={`${bid.isAccepted ? 'ring-2 ring-green-500 bg-green-50' : ''} ${index === 0 ? 'border-green-500' : ''}`}>
                  <CardHeader className="pb-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <Avatar className="h-10 w-10">
                          <AvatarFallback>{bid.shopName.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <div>
                          <CardTitle className="text-lg flex items-center gap-2">
                            {bid.shopName}
                            {index === 0 && !bid.isAccepted && (
                              <Badge variant="secondary" className="text-green-700 bg-green-100">
                                Lowest Bid
                              </Badge>
                            )}
                            {bid.isAccepted && (
                              <Badge className="bg-green-600">
                                <CheckCircle className="h-3 w-3 mr-1" />
                                Accepted
                              </Badge>
                            )}
                          </CardTitle>
                          <div className="flex items-center gap-4 text-sm text-gray-600">
                            <div className="flex items-center gap-1">
                              <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                              <span>{bid.shopRating}</span>
                              <span>({bid.shopReviews})</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <MapPin className="h-4 w-4" />
                              <span>{bid.shopDistance}</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <Clock className="h-4 w-4" />
                              <span>Bid at {bid.bidTime}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-2xl font-bold text-green-600">${bid.laborCost}</div>
                        <div className="text-sm text-gray-600">Labor cost</div>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                      <div>
                        <p className="text-sm text-gray-600">Estimated Time</p>
                        <p className="font-medium">{bid.estimatedTime}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">Warranty</p>
                        <p className="font-medium">{bid.warranty}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">Next Available</p>
                        <p className="font-medium text-green-600">{bid.nextAvailable}</p>
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-1 mb-4">
                      {bid.certifications.map((cert, i) => (
                        <Badge key={i} variant="outline" className="text-xs">
                          <Award className="h-3 w-3 mr-1" />
                          {cert}
                        </Badge>
                      ))}
                    </div>

                    {bid.specialNotes && (
                      <div className="bg-blue-50 p-3 rounded-lg mb-4">
                        <p className="text-sm text-blue-800">
                          <strong>Special Note:</strong> {bid.specialNotes}
                        </p>
                      </div>
                    )}

                    <div className="flex gap-2">
                      {!bid.isAccepted ? (
                        <>
                          <Button 
                            onClick={() => handleAcceptBid(bid.id)}
                            className="flex-1"
                          >
                            <CheckCircle className="h-4 w-4 mr-2" />
                            Accept Bid
                          </Button>
                          <Button variant="outline">
                            <MessageSquare className="h-4 w-4 mr-2" />
                            Message
                          </Button>
                          <Button variant="outline">
                            <Phone className="h-4 w-4 mr-2" />
                            Call
                          </Button>
                        </>
                      ) : (
                        <div className="flex-1 flex items-center justify-center py-2 text-green-700 font-medium">
                          <CheckCircle className="h-5 w-5 mr-2" />
                          Bid Accepted - Proceed to booking
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {liveBids.length === 0 && (
              <Card>
                <CardContent className="flex items-center justify-center py-12">
                  <div className="text-center">
                    <Clock className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-gray-900 mb-2">Waiting for bids...</h3>
                    <p className="text-gray-600">Your quote request has been sent to local shops. Bids will appear here as they come in.</p>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        )}

        {/* History Tab */}
        {activeTab === 'history' && (
          <div className="text-center py-12">
            <Calendar className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No quote history yet</h3>
            <p className="text-gray-600 mb-4">Your completed and expired quotes will appear here.</p>
            <Button onClick={() => setActiveTab('create')}>
              Create Your First Quote
            </Button>
          </div>
        )}
      </div>
    </Layout>
  );
}