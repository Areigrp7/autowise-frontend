import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import Layout from '@/components/Layout';
import { createProduct, getProducts, deleteProduct, ProductData } from '@/lib/apiClient';
import { useToast } from '@/hooks/use-toast';
import {
  Package,
  Star,
  Car,
  Plus,
  Edit,
  Trash2,
  Eye,
  CheckCircle,
  XCircle,
  DollarSign,
  TrendingUp,
  Users,
  Settings,
  UserCheck,
  AlertCircle,
  FileText,
  Clock,
  Shield,
  Building,
  RefreshCw
} from 'lucide-react';

interface Product {
  id: string;
  name: string;
  brand: string;
  category: string;
  price: number;
  salePrice?: number;
  description: string;
  image?: string;
  inStock: boolean;
  isFeatured: boolean;
  compatibility: string[];
  createdAt: string;
  updatedAt: string;
}

interface VehicleYear {
  id: string;
  year: number;
  isActive: boolean;
}

interface VehicleMake {
  id: string;
  name: string;
  isActive: boolean;
}

interface VehicleModel {
  id: string;
  makeId: string;
  name: string;
  isActive: boolean;
}

interface OnboardingRequest {
  id: string;
  businessName: string;
  ownerName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
  businessType: string;
  yearsInBusiness: string;
  licenseNumber: string;
  ein: string;
  description: string;
  documents: string[];
  status: 'pending' | 'under_review' | 'approved' | 'rejected';
  submittedAt: string;
  reviewedAt?: string;
  reviewerNotes?: string;
}

interface ApprovalItem {
  id: string;
  type: 'shop_onboarding' | 'content_review' | 'payout_request' | 'dispute_resolution';
  title: string;
  description: string;
  requester: string;
  priority: 'low' | 'medium' | 'high' | 'urgent';
  status: 'pending' | 'in_review' | 'approved' | 'rejected';
  submittedAt: string;
  dueDate?: string;
}

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState('overview');
  const [isCreateProductOpen, setIsCreateProductOpen] = useState(false);
  const [isCreateVehicleDataOpen, setIsCreateVehicleDataOpen] = useState(false);
  const [isCreatingProduct, setIsCreatingProduct] = useState(false);
  const [products, setProducts] = useState<any[]>([]);
  const [isLoadingProducts, setIsLoadingProducts] = useState(false);
  const [productsError, setProductsError] = useState<string | null>(null);
  const { toast } = useToast();

  // Product creation form state
  const [productForm, setProductForm] = useState<ProductData>({
    name: '',
    brand: '',
    price: 0,
    original_price: undefined,
    rating: undefined,
    reviews: undefined,
    is_oem: false,
    seller: '',
    shipping: '',
    warranty: '',
    in_stock: true,
    image_url: '',
    best_value_score: undefined,
    features: [],
    compatibility: [],
    category: ''
  });

  // Fetch products from API
  useEffect(() => {
    const fetchProducts = async () => {
      setIsLoadingProducts(true);
      setProductsError(null);
      try {
        const response = await getProducts();
        setProducts(response.data || response); // Handle both response.data and direct response formats
      } catch (error: any) {
        console.error('Error fetching products:', error);
        setProductsError(error.message || 'Failed to fetch products');
        toast({
          title: "Error",
          description: "Failed to load products. Please try again.",
          variant: "destructive",
        });
      } finally {
        setIsLoadingProducts(false);
      }
    };

    fetchProducts();
  }, [toast]);

  const [vehicleYears, setVehicleYears] = useState<VehicleYear[]>([
    { id: '1', year: 2024, isActive: true },
    { id: '2', year: 2023, isActive: true },
    { id: '3', year: 2022, isActive: true },
    { id: '4', year: 2021, isActive: true }
  ]);

  const [vehicleMakes, setVehicleMakes] = useState<VehicleMake[]>([
    { id: '1', name: 'Toyota', isActive: true },
    { id: '2', name: 'Honda', isActive: true },
    { id: '3', name: 'Ford', isActive: true },
    { id: '4', name: 'Chevrolet', isActive: true }
  ]);

  const [vehicleModels, setVehicleModels] = useState<VehicleModel[]>([
    { id: '1', makeId: '1', name: 'Camry', isActive: true },
    { id: '2', makeId: '1', name: 'Corolla', isActive: true },
    { id: '3', makeId: '2', name: 'Civic', isActive: true },
    { id: '4', makeId: '2', name: 'Accord', isActive: true }
  ]);

  // Mock data for onboarding requests
  const [onboardingRequests, setOnboardingRequests] = useState<OnboardingRequest[]>([
    {
      id: '1',
      businessName: 'QuickFix Auto Service',
      ownerName: 'John Smith',
      email: 'john@quickfixauto.com',
      phone: '(555) 123-4567',
      address: '123 Main St',
      city: 'Springfield',
      state: 'IL',
      zipCode: '62701',
      businessType: 'Auto Repair Shop',
      yearsInBusiness: '5',
      licenseNumber: 'AR-12345',
      ein: '12-3456789',
      description: 'Full-service auto repair shop specializing in domestic vehicles with ASE certified technicians.',
      documents: ['business_license.pdf', 'insurance.pdf', 'tax_id.pdf'],
      status: 'pending',
      submittedAt: '2024-01-12'
    },
    {
      id: '2',
      businessName: 'Elite Auto Care',
      ownerName: 'Sarah Johnson',
      email: 'sarah@eliteautocare.com',
      phone: '(555) 987-6543',
      address: '456 Oak Ave',
      city: 'Chicago',
      state: 'IL',
      zipCode: '60601',
      businessType: 'Luxury Vehicle Specialist',
      yearsInBusiness: '8',
      licenseNumber: 'AR-67890',
      ein: '98-7654321',
      description: 'Luxury vehicle specialist with certified technicians and state-of-the-art equipment.',
      documents: ['business_license.pdf', 'insurance.pdf', 'certifications.pdf'],
      status: 'under_review',
      submittedAt: '2024-01-10'
    },
    {
      id: '3',
      businessName: "Mike's Garage",
      ownerName: 'Mike Rodriguez',
      email: 'mike@mikesgarage.com',
      phone: '(555) 456-7890',
      address: '789 Industrial Blvd',
      city: 'Detroit',
      state: 'MI',
      zipCode: '48201',
      businessType: 'General Auto Repair',
      yearsInBusiness: '12',
      licenseNumber: 'AR-54321',
      ein: '54-3210987',
      description: 'Family-owned auto repair shop serving the community for over a decade.',
      documents: ['business_license.pdf', 'insurance.pdf'],
      status: 'approved',
      submittedAt: '2024-01-08',
      reviewedAt: '2024-01-09',
      reviewerNotes: 'All documents verified. Business license and insurance are valid.'
    }
  ]);

  // Mock data for approval items
  const [approvalItems, setApprovalItems] = useState<ApprovalItem[]>([
    {
      id: '1',
      type: 'shop_onboarding',
      title: 'QuickFix Auto Service Registration',
      description: 'New auto repair shop registration requiring document verification',
      requester: 'John Smith',
      priority: 'high',
      status: 'pending',
      submittedAt: '2024-01-12'
    },
    {
      id: '2',
      type: 'content_review',
      title: 'Shop Photo Upload Review',
      description: 'Mike\'s Garage uploaded new portfolio photos for review',
      requester: 'Mike Rodriguez',
      priority: 'medium',
      status: 'in_review',
      submittedAt: '2024-01-11'
    },
    {
      id: '3',
      type: 'payout_request',
      title: 'Weekly Payout Processing',
      description: 'Process weekly payouts for completed services ($2,450)',
      requester: 'System',
      priority: 'urgent',
      status: 'pending',
      submittedAt: '2024-01-12',
      dueDate: '2024-01-15'
    }
  ]);

  // Stats for overview
  const stats = {
    totalProducts: products.length,
    totalRevenue: products.reduce((sum, p) => sum + (parseFloat(p.price) || 0), 0),
    activeYears: vehicleYears.filter(y => y.isActive).length,
    activeMakes: vehicleMakes.filter(m => m.isActive).length,
    activeModels: vehicleModels.filter(m => m.isActive).length,
    pendingOnboarding: onboardingRequests.filter(r => r.status === 'pending').length,
    totalOnboarding: onboardingRequests.length,
    approvedShops: onboardingRequests.filter(r => r.status === 'approved').length,
    pendingApprovals: approvalItems.filter(a => a.status === 'pending').length,
    urgentApprovals: approvalItems.filter(a => a.priority === 'urgent').length
  };

  const handleToggleFeatured = (productId: string) => {
    setProducts(products.map(p =>
      p.id === productId ? { ...p, isFeatured: !p.isFeatured } : p
    ));
  };

  const handleDeleteProduct = async (productId: string) => {
    try {
      await deleteProduct(productId);
      // Refresh products list
      const response = await getProducts();
      setProducts(response.data || response);
      toast({
        title: "Success",
        description: "Product deleted successfully!",
      });
    } catch (error: any) {
      console.error('Error deleting product:', error);
      toast({
        title: "Error",
        description: error.message || "Failed to delete product. Please try again.",
        variant: "destructive",
      });
    }
  };

  const handleApproveOnboarding = (requestId: string) => {
    setOnboardingRequests(requests =>
      requests.map(request =>
        request.id === requestId
          ? { ...request, status: 'approved' as const, reviewedAt: new Date().toISOString().split('T')[0], reviewerNotes: 'Application approved after document verification.' }
          : request
      )
    );
  };

  const handleRejectOnboarding = (requestId: string) => {
    setOnboardingRequests(requests =>
      requests.map(request =>
        request.id === requestId
          ? { ...request, status: 'rejected' as const, reviewedAt: new Date().toISOString().split('T')[0], reviewerNotes: 'Application rejected due to incomplete documentation.' }
          : request
      )
    );
  };

  const handleCreateProduct = async () => {
    if (!productForm.name || !productForm.brand || productForm.price <= 0) {
      toast({
        title: "Validation Error",
        description: "Please fill in all required fields (name, brand, and price).",
        variant: "destructive",
      });
      return;
    }

    setIsCreatingProduct(true);
    try {
      await createProduct(productForm);

      // Reset form
      setProductForm({
        name: '',
        brand: '',
        price: 0,
        original_price: undefined,
        rating: undefined,
        reviews: undefined,
        is_oem: false,
        seller: '',
        shipping: '',
        warranty: '',
        in_stock: true,
        image_url: '',
        best_value_score: undefined,
        features: [],
        compatibility: [],
        category: ''
      });

      setIsCreateProductOpen(false);

      // Refresh products list
      const response = await getProducts();
      setProducts(response.data || response);

      toast({
        title: "Success",
        description: "Product created successfully!",
      });

    } catch (error: any) {
      console.error('Error creating product:', error);
      toast({
        title: "Error",
        description: error.message || "Failed to create product. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsCreatingProduct(false);
    }
  };

  return (
    <Layout currentPage="admin">
      <div className="container mx-auto px-4 py-6">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Admin Dashboard</h1>
          <p className="text-gray-600">Manage products, featured deals, and vehicle data</p>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-8">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="onboarding">Onboarding</TabsTrigger>
            <TabsTrigger value="approvals">Approvals</TabsTrigger>
            <TabsTrigger value="moderation">Moderation</TabsTrigger>
            <TabsTrigger value="disputes">Disputes</TabsTrigger>
            <TabsTrigger value="payouts">Payouts</TabsTrigger>
            <TabsTrigger value="products">Products</TabsTrigger>
            <TabsTrigger value="settings">Settings</TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center gap-3">
                    <Package className="h-8 w-8 text-blue-600" />
                    <div>
                      <p className="text-2xl font-bold">{stats.totalProducts}</p>
                      <p className="text-sm text-gray-600">Total Products</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center gap-3">
                    <Star className="h-8 w-8 text-yellow-600" />
                    <div>
                      <p className="text-2xl font-bold">{stats.featuredProducts}</p>
                      <p className="text-sm text-gray-600">Featured Deals</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center gap-3">
                    <DollarSign className="h-8 w-8 text-green-600" />
                    <div>
                      <p className="text-2xl font-bold">${stats.totalRevenue.toFixed(2)}</p>
                      <p className="text-sm text-gray-600">Total Value</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center gap-3">
                    <Car className="h-8 w-8 text-purple-600" />
                    <div>
                      <p className="text-2xl font-bold">{stats.activeYears}</p>
                      <p className="text-sm text-gray-600">Active Years</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center gap-3">
                    <TrendingUp className="h-8 w-8 text-orange-600" />
                    <div>
                      <p className="text-2xl font-bold">{stats.activeMakes}</p>
                      <p className="text-sm text-gray-600">Active Makes</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center gap-3">
                    <Users className="h-8 w-8 text-indigo-600" />
                    <div>
                      <p className="text-2xl font-bold">{stats.activeModels}</p>
                      <p className="text-sm text-gray-600">Active Models</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center gap-3">
                    <Building className="h-8 w-8 text-blue-600" />
                    <div>
                      <p className="text-2xl font-bold">{stats.pendingOnboarding}</p>
                      <p className="text-sm text-gray-600">Pending Onboarding</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center gap-3">
                    <UserCheck className="h-8 w-8 text-green-600" />
                    <div>
                      <p className="text-2xl font-bold">{stats.approvedShops}</p>
                      <p className="text-sm text-gray-600">Approved Shops</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center gap-3">
                    <AlertCircle className="h-8 w-8 text-orange-600" />
                    <div>
                      <p className="text-2xl font-bold">{stats.pendingApprovals}</p>
                      <p className="text-sm text-gray-600">Pending Approvals</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Recent Activity */}
            <Card>
              <CardHeader>
                <CardTitle>Recent Activity</CardTitle>
                <CardDescription>Latest platform activities and updates</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center gap-3 p-3 border rounded-lg">
                    <Building className="h-5 w-5 text-blue-500" />
                    <div>
                      <p className="font-medium">New shop application: QuickFix Auto Service</p>
                      <p className="text-sm text-gray-600">2 hours ago</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-3 border rounded-lg">
                    <CheckCircle className="h-5 w-5 text-green-500" />
                    <div>
                      <p className="font-medium">Shop approved: Elite Auto Care</p>
                      <p className="text-sm text-gray-600">4 hours ago</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-3 border rounded-lg">
                    <DollarSign className="h-5 w-5 text-green-500" />
                    <div>
                      <p className="font-medium">Payout processed: $2,450 to 3 shops</p>
                      <p className="text-sm text-gray-600">6 hours ago</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-3 border rounded-lg">
                    <AlertCircle className="h-5 w-5 text-orange-500" />
                    <div>
                      <p className="font-medium">New dispute filed: Service quality issue</p>
                      <p className="text-sm text-gray-600">1 day ago</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-3 border rounded-lg">
                    <FileText className="h-5 w-5 text-purple-500" />
                    <div>
                      <p className="font-medium">Content flagged: Inappropriate review</p>
                      <p className="text-sm text-gray-600">1 day ago</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Onboarding Tab */}
          <TabsContent value="onboarding" className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold">Shop/Mechanic Onboarding Requests</h2>
              <div className="flex gap-2">
                <Button variant="outline">Bulk Actions</Button>
                <Button variant="outline">Export List</Button>
              </div>
            </div>

            {/* Onboarding Stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center gap-3">
                    <Clock className="h-6 w-6 text-yellow-600" />
                    <div>
                      <p className="text-xl font-bold">{stats.pendingOnboarding}</p>
                      <p className="text-sm text-gray-600">Pending Review</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center gap-3">
                    <Eye className="h-6 w-6 text-blue-600" />
                    <div>
                      <p className="text-xl font-bold">{onboardingRequests.filter(r => r.status === 'under_review').length}</p>
                      <p className="text-sm text-gray-600">Under Review</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center gap-3">
                    <CheckCircle className="h-6 w-6 text-green-600" />
                    <div>
                      <p className="text-xl font-bold">{stats.approvedShops}</p>
                      <p className="text-sm text-gray-600">Approved</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center gap-3">
                    <XCircle className="h-6 w-6 text-red-600" />
                    <div>
                      <p className="text-xl font-bold">{onboardingRequests.filter(r => r.status === 'rejected').length}</p>
                      <p className="text-sm text-gray-600">Rejected</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Onboarding Requests Table */}
            <Card>
              <CardHeader>
                <CardTitle>Pending Registration Requests</CardTitle>
                <CardDescription>Review and approve new shop/mechanic registrations</CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Business Name</TableHead>
                      <TableHead>Owner</TableHead>
                      <TableHead>Location</TableHead>
                      <TableHead>Type</TableHead>
                      <TableHead>Submitted</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {onboardingRequests.map(request => (
                      <TableRow key={request.id}>
                        <TableCell className="font-medium">{request.businessName}</TableCell>
                        <TableCell>{request.ownerName}</TableCell>
                        <TableCell>{request.city}, {request.state}</TableCell>
                        <TableCell>{request.businessType}</TableCell>
                        <TableCell>{new Date(request.submittedAt).toLocaleDateString()}</TableCell>
                        <TableCell>
                          <Badge
                            variant={
                              request.status === 'approved' ? 'default' :
                                request.status === 'rejected' ? 'destructive' :
                                  request.status === 'under_review' ? 'secondary' : 'outline'
                            }
                          >
                            {request.status.replace('_', ' ').toUpperCase()}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <div className="flex gap-2">
                            <Dialog>
                              <DialogTrigger asChild>
                                <Button variant="ghost" size="sm">
                                  <Eye className="h-4 w-4" />
                                </Button>
                              </DialogTrigger>
                              <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
                                <DialogHeader>
                                  <DialogTitle>Review Application: {request.businessName}</DialogTitle>
                                  <DialogDescription>Detailed review of shop registration application</DialogDescription>
                                </DialogHeader>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 py-4">
                                  <div className="space-y-4">
                                    <div>
                                      <h4 className="font-medium mb-2">Business Information</h4>
                                      <div className="space-y-2 text-sm">
                                        <p><strong>Business Name:</strong> {request.businessName}</p>
                                        <p><strong>Owner:</strong> {request.ownerName}</p>
                                        <p><strong>Email:</strong> {request.email}</p>
                                        <p><strong>Phone:</strong> {request.phone}</p>
                                        <p><strong>Address:</strong> {request.address}, {request.city}, {request.state} {request.zipCode}</p>
                                        <p><strong>Business Type:</strong> {request.businessType}</p>
                                        <p><strong>Years in Business:</strong> {request.yearsInBusiness}</p>
                                      </div>
                                    </div>

                                    <div>
                                      <h4 className="font-medium mb-2">Licensing & Documentation</h4>
                                      <div className="space-y-2 text-sm">
                                        <p><strong>License Number:</strong> {request.licenseNumber}</p>
                                        <p><strong>EIN:</strong> {request.ein}</p>
                                        <p><strong>Documents:</strong></p>
                                        <ul className="list-disc list-inside ml-4">
                                          {request.documents.map((doc, index) => (
                                            <li key={index} className="text-blue-600 hover:underline cursor-pointer">{doc}</li>
                                          ))}
                                        </ul>
                                      </div>
                                    </div>
                                  </div>

                                  <div className="space-y-4">
                                    <div>
                                      <h4 className="font-medium mb-2">Business Description</h4>
                                      <p className="text-sm bg-gray-50 p-3 rounded">{request.description}</p>
                                    </div>

                                    {request.reviewerNotes && (
                                      <div>
                                        <h4 className="font-medium mb-2">Reviewer Notes</h4>
                                        <p className="text-sm bg-blue-50 p-3 rounded">{request.reviewerNotes}</p>
                                      </div>
                                    )}

                                    <div>
                                      <h4 className="font-medium mb-2">Application Status</h4>
                                      <div className="flex items-center gap-2">
                                        <Badge
                                          variant={
                                            request.status === 'approved' ? 'default' :
                                              request.status === 'rejected' ? 'destructive' :
                                                request.status === 'under_review' ? 'secondary' : 'outline'
                                          }
                                        >
                                          {request.status.replace('_', ' ').toUpperCase()}
                                        </Badge>
                                        {request.reviewedAt && (
                                          <span className="text-xs text-gray-500">
                                            Reviewed: {new Date(request.reviewedAt).toLocaleDateString()}
                                          </span>
                                        )}
                                      </div>
                                    </div>
                                  </div>
                                </div>

                                {request.status === 'pending' && (
                                  <div className="flex gap-3 pt-4 border-t">
                                    <Button
                                      onClick={() => handleApproveOnboarding(request.id)}
                                      className="flex-1"
                                    >
                                      <CheckCircle className="h-4 w-4 mr-2" />
                                      Approve Application
                                    </Button>
                                    <Button
                                      variant="outline"
                                      onClick={() => handleRejectOnboarding(request.id)}
                                      className="flex-1"
                                    >
                                      <XCircle className="h-4 w-4 mr-2" />
                                      Reject Application
                                    </Button>
                                    <Button variant="secondary" className="flex-1">
                                      Request More Info
                                    </Button>
                                  </div>
                                )}
                              </DialogContent>
                            </Dialog>
                            <Button variant="ghost" size="sm">
                              <Edit className="h-4 w-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Approvals Tab */}
          <TabsContent value="approvals" className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold">Approval Workflow</h2>
              <div className="flex gap-2">
                <Select defaultValue="all">
                  <SelectTrigger className="w-40">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Types</SelectItem>
                    <SelectItem value="shop_onboarding">Shop Onboarding</SelectItem>
                    <SelectItem value="content_review">Content Review</SelectItem>
                    <SelectItem value="payout_request">Payout Request</SelectItem>
                    <SelectItem value="dispute_resolution">Dispute Resolution</SelectItem>
                  </SelectContent>
                </Select>
                <Button>Process Selected</Button>
              </div>
            </div>

            {/* Approval Queue */}
            <Card>
              <CardHeader>
                <CardTitle>Pending Approvals</CardTitle>
                <CardDescription>Items requiring your attention and approval</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {approvalItems.map(item => (
                    <div key={item.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-start gap-4">
                        <div className={`p-2 rounded-full ${item.priority === 'urgent' ? 'bg-red-100' :
                            item.priority === 'high' ? 'bg-orange-100' :
                              item.priority === 'medium' ? 'bg-yellow-100' : 'bg-blue-100'
                          }`}>
                          {item.type === 'shop_onboarding' && <Building className="h-5 w-5 text-blue-600" />}
                          {item.type === 'content_review' && <FileText className="h-5 w-5 text-purple-600" />}
                          {item.type === 'payout_request' && <DollarSign className="h-5 w-5 text-green-600" />}
                          {item.type === 'dispute_resolution' && <AlertCircle className="h-5 w-5 text-red-600" />}
                        </div>
                        <div>
                          <h4 className="font-medium">{item.title}</h4>
                          <p className="text-sm text-gray-600">{item.description}</p>
                          <div className="flex items-center gap-4 mt-2">
                            <span className="text-xs text-gray-500">By: {item.requester}</span>
                            <span className="text-xs text-gray-500">Submitted: {new Date(item.submittedAt).toLocaleDateString()}</span>
                            {item.dueDate && (
                              <span className="text-xs text-red-600">Due: {new Date(item.dueDate).toLocaleDateString()}</span>
                            )}
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <Badge
                          variant={
                            item.priority === 'urgent' ? 'destructive' :
                              item.priority === 'high' ? 'default' :
                                item.priority === 'medium' ? 'secondary' : 'outline'
                          }
                        >
                          {item.priority.toUpperCase()}
                        </Badge>
                        <Badge variant="outline">{item.status.replace('_', ' ')}</Badge>
                        <Button size="sm">Review</Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Approval Statistics */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center gap-3">
                    <Clock className="h-6 w-6 text-yellow-600" />
                    <div>
                      <p className="text-xl font-bold">{stats.pendingApprovals}</p>
                      <p className="text-sm text-gray-600">Pending</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center gap-3">
                    <Eye className="h-6 w-6 text-blue-600" />
                    <div>
                      <p className="text-xl font-bold">{approvalItems.filter(a => a.status === 'in_review').length}</p>
                      <p className="text-sm text-gray-600">In Review</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center gap-3">
                    <CheckCircle className="h-6 w-6 text-green-600" />
                    <div>
                      <p className="text-xl font-bold">{approvalItems.filter(a => a.status === 'approved').length}</p>
                      <p className="text-sm text-gray-600">Approved</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center gap-3">
                    <AlertCircle className="h-6 w-6 text-red-600" />
                    <div>
                      <p className="text-xl font-bold">{stats.urgentApprovals}</p>
                      <p className="text-sm text-gray-600">Urgent</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Products Tab */}
          <TabsContent value="products" className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold">Product Management</h2>
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  onClick={async () => {
                    setIsLoadingProducts(true);
                    try {
                      const response = await getProducts();
                      setProducts(response.data || response);
                      setProductsError(null);
                    } catch (error: any) {
                      setProductsError(error.message || 'Failed to refresh products');
                    } finally {
                      setIsLoadingProducts(false);
                    }
                  }}
                  disabled={isLoadingProducts}
                >
                  <RefreshCw className={`h-4 w-4 mr-2 ${isLoadingProducts ? 'animate-spin' : ''}`} />
                  Refresh
                </Button>
                <Dialog open={isCreateProductOpen} onOpenChange={setIsCreateProductOpen}>
                  <DialogTrigger asChild>
                    <Button>
                      <Plus className="h-4 w-4 mr-2" />
                      Add Product
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
                    <DialogHeader>
                      <DialogTitle>Create New Product</DialogTitle>
                      <DialogDescription>Add a new product to your catalog</DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-6 py-4">
                      {/* Basic Information */}
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="product-name">Product Name *</Label>
                          <Input
                            id="product-name"
                            value={productForm.name}
                            onChange={(e) => setProductForm(prev => ({ ...prev, name: e.target.value }))}
                            placeholder="Premium Brake Pads - Front Set"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="product-brand">Brand *</Label>
                          <Input
                            id="product-brand"
                            value={productForm.brand}
                            onChange={(e) => setProductForm(prev => ({ ...prev, brand: e.target.value }))}
                            placeholder="Brembo"
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-3 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="product-price">Price *</Label>
                          <Input
                            id="product-price"
                            type="number"
                            step="0.01"
                            value={productForm.price || ''}
                            onChange={(e) => setProductForm(prev => ({ ...prev, price: parseFloat(e.target.value) || 0 }))}
                            placeholder="89.99"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="product-original-price">Original Price</Label>
                          <Input
                            id="product-original-price"
                            type="number"
                            step="0.01"
                            value={productForm.original_price || ''}
                            onChange={(e) => setProductForm(prev => ({ ...prev, original_price: parseFloat(e.target.value) || undefined }))}
                            placeholder="129.99"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="product-category">Category</Label>
                          <Select
                            value={productForm.category}
                            onValueChange={(value) => setProductForm(prev => ({ ...prev, category: value }))}
                          >
                            <SelectTrigger>
                              <SelectValue placeholder="Select category" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="Brake System">Brake System</SelectItem>
                              <SelectItem value="Engine Parts">Engine Parts</SelectItem>
                              <SelectItem value="Filters">Filters</SelectItem>
                              <SelectItem value="Transmission">Transmission</SelectItem>
                              <SelectItem value="Suspension">Suspension</SelectItem>
                              <SelectItem value="Electrical">Electrical</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>

                      {/* Seller & Stock Information */}
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="product-seller">Seller</Label>
                          <Input
                            id="product-seller"
                            value={productForm.seller}
                            onChange={(e) => setProductForm(prev => ({ ...prev, seller: e.target.value }))}
                            placeholder="AutoZone"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="product-image-url">Image URL</Label>
                          <Input
                            id="product-image-url"
                            value={productForm.image_url}
                            onChange={(e) => setProductForm(prev => ({ ...prev, image_url: e.target.value }))}
                            placeholder="https://example.com/image.jpg"
                          />
                        </div>
                      </div>

                      {/* Shipping & Warranty */}
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="product-shipping">Shipping</Label>
                          <Input
                            id="product-shipping"
                            value={productForm.shipping}
                            onChange={(e) => setProductForm(prev => ({ ...prev, shipping: e.target.value }))}
                            placeholder="Free 2-day shipping"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="product-warranty">Warranty</Label>
                          <Input
                            id="product-warranty"
                            value={productForm.warranty}
                            onChange={(e) => setProductForm(prev => ({ ...prev, warranty: e.target.value }))}
                            placeholder="3 years / 36,000 miles"
                          />
                        </div>
                      </div>

                      {/* Ratings & Scores */}
                      <div className="grid grid-cols-3 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="product-rating">Rating</Label>
                          <Input
                            id="product-rating"
                            type="number"
                            step="0.1"
                            min="0"
                            max="5"
                            value={productForm.rating || ''}
                            onChange={(e) => setProductForm(prev => ({ ...prev, rating: parseFloat(e.target.value) || undefined }))}
                            placeholder="4.8"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="product-reviews">Reviews Count</Label>
                          <Input
                            id="product-reviews"
                            type="number"
                            value={productForm.reviews || ''}
                            onChange={(e) => setProductForm(prev => ({ ...prev, reviews: parseInt(e.target.value) || undefined }))}
                            placeholder="1247"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="product-best-value">Best Value Score</Label>
                          <Input
                            id="product-best-value"
                            type="number"
                            step="0.1"
                            min="0"
                            max="10"
                            value={productForm.best_value_score || ''}
                            onChange={(e) => setProductForm(prev => ({ ...prev, best_value_score: parseFloat(e.target.value) || undefined }))}
                            placeholder="9.2"
                          />
                        </div>
                      </div>

                      {/* Checkboxes */}
                      <div className="flex gap-6">
                        <div className="flex items-center space-x-2">
                          <input
                            type="checkbox"
                            id="is-oem"
                            checked={productForm.is_oem || false}
                            onChange={(e) => setProductForm(prev => ({ ...prev, is_oem: e.target.checked }))}
                            className="rounded"
                          />
                          <Label htmlFor="is-oem">OEM Part</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <input
                            type="checkbox"
                            id="in-stock"
                            checked={productForm.in_stock || false}
                            onChange={(e) => setProductForm(prev => ({ ...prev, in_stock: e.target.checked }))}
                            className="rounded"
                          />
                          <Label htmlFor="in-stock">In Stock</Label>
                        </div>
                      </div>

                      {/* Features */}
                      <div className="space-y-2">
                        <Label htmlFor="product-features">Features (one per line)</Label>
                        <Textarea
                          id="product-features"
                          value={productForm.features?.join('\n') || ''}
                          onChange={(e) => setProductForm(prev => ({
                            ...prev,
                            features: e.target.value.split('\n').filter(f => f.trim())
                          }))}
                          placeholder="Low dust formula&#10;Quiet operation&#10;High performance"
                          rows={3}
                        />
                      </div>

                      {/* Compatibility */}
                      <div className="space-y-2">
                        <Label htmlFor="product-compatibility">Compatibility (one per line)</Label>
                        <Textarea
                          id="product-compatibility"
                          value={productForm.compatibility?.join('\n') || ''}
                          onChange={(e) => setProductForm(prev => ({
                            ...prev,
                            compatibility: e.target.value.split('\n').filter(c => c.trim())
                          }))}
                          placeholder="2019-2024 Toyota Camry&#10;2020-2024 Honda Accord"
                          rows={3}
                        />
                      </div>
                    </div>
                    <div className="flex justify-end gap-2">
                      <Button variant="outline" onClick={() => setIsCreateProductOpen(false)} disabled={isCreatingProduct}>
                        Cancel
                      </Button>
                      <Button onClick={handleCreateProduct} disabled={isCreatingProduct}>
                        {isCreatingProduct ? 'Creating...' : 'Create Product'}
                      </Button>
                    </div>
                  </DialogContent>
                </Dialog>
              </div>
            </div>
            <Card>
              {isLoadingProducts ? (
                <div className="flex items-center justify-center p-8">
                  <div className="text-center">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-4"></div>
                    <p>Loading products...</p>
                  </div>
                </div>
              ) : productsError ? (
                <div className="flex items-center justify-center p-8">
                  <div className="text-center">
                    <XCircle className="h-12 w-12 text-red-500 mx-auto mb-4" />
                    <p className="text-red-600 mb-2">Failed to load products</p>
                    <p className="text-sm text-gray-500">{productsError}</p>
                    <Button
                      onClick={() => window.location.reload()}
                      className="mt-4"
                      variant="outline"
                    >
                      Retry
                    </Button>
                  </div>
                </div>
              ) : (
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Product</TableHead>
                      <TableHead>Brand</TableHead>
                      <TableHead>Category</TableHead>
                      <TableHead>Price</TableHead>
                      <TableHead>Rating</TableHead>
                      <TableHead>Value Score</TableHead>
                      <TableHead>Stock</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {products.length === 0 ? (
                      <TableRow>
                        <TableCell colSpan={8} className="text-center py-8">
                          <div className="text-gray-500">
                            <Package className="h-12 w-12 mx-auto mb-4 opacity-50" />
                            <p>No products found</p>
                            <p className="text-sm">Start by adding your first product</p>
                          </div>
                        </TableCell>
                      </TableRow>
                    ) : (
                      products.map((product, index) => (
                        <TableRow key={product.id || index}>
                          <TableCell className="font-medium">{product.name}</TableCell>
                          <TableCell>{product.brand}</TableCell>
                          <TableCell>{product.category}</TableCell>
                          <TableCell>
                            <div className="flex flex-col">
                              <span className="font-semibold">${parseFloat(product.price).toFixed(2)}</span>
                              {product.original_price && parseFloat(product.original_price) > parseFloat(product.price) && (
                                <span className="text-sm text-gray-500 line-through">
                                  ${parseFloat(product.original_price).toFixed(2)}
                                </span>
                              )}
                            </div>
                          </TableCell>
                          <TableCell>
                            {product.rating && (
                              <div className="flex items-center gap-1">
                                <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                                <span className="text-sm">{parseFloat(product.rating).toFixed(1)}</span>
                                {product.reviews && (
                                  <span className="text-xs text-gray-500">({product.reviews})</span>
                                )}
                              </div>
                            )}
                          </TableCell>
                          <TableCell>
                            {product.best_value_score && (
                              <div className="flex items-center gap-1">
                                <TrendingUp className="h-4 w-4 text-green-600" />
                                <span className="text-sm font-medium">{parseFloat(product.best_value_score).toFixed(1)}</span>
                              </div>
                            )}
                          </TableCell>
                          <TableCell>
                            <Badge variant={product.in_stock ? "default" : "destructive"}>
                              {product.in_stock ? 'In Stock' : 'Out of Stock'}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center gap-2">
                              <Button variant="ghost" size="sm">
                                <Edit className="h-4 w-4" />
                              </Button>
                              <Button variant="ghost" size="sm">
                                <Eye className="h-4 w-4" />
                              </Button>
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => handleDeleteProduct(product.id)}
                                className="text-red-600 hover:text-red-700"
                              >
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))
                    )}
                  </TableBody>
                </Table>
              )}
            </Card>
          </TabsContent>

          {/* Moderation Tab */}
          <TabsContent value="moderation" className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold">Content Moderation</h2>
              <div className="flex gap-2">
                <Select defaultValue="all">
                  <SelectTrigger className="w-40">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Content</SelectItem>
                    <SelectItem value="reviews">Reviews</SelectItem>
                    <SelectItem value="photos">Photos</SelectItem>
                    <SelectItem value="posts">Posts</SelectItem>
                    <SelectItem value="comments">Comments</SelectItem>
                  </SelectContent>
                </Select>
                <Button variant="outline">Bulk Actions</Button>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Reviews Moderation */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <FileText className="h-5 w-5 text-blue-600" />
                    Review Moderation
                  </CardTitle>
                  <CardDescription>Review customer reviews and feedback</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="p-4 border rounded-lg">
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <h4 className="font-medium">Review by John D.</h4>
                          <p className="text-sm text-gray-600">QuickFix Auto Service • 3 hours ago</p>
                        </div>
                        <Badge variant="destructive">Flagged</Badge>
                      </div>
                      <p className="text-sm mb-3">"This shop is terrible! They overcharged me and the work was shoddy..."</p>
                      <div className="flex gap-2">
                        <Button size="sm">Approve</Button>
                        <Button size="sm" variant="outline">Hide</Button>
                        <Button size="sm" variant="ghost">Edit</Button>
                      </div>
                    </div>

                    <div className="p-4 border rounded-lg">
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <h4 className="font-medium">Review by Sarah M.</h4>
                          <p className="text-sm text-gray-600">Elite Auto Care • 1 hour ago</p>
                        </div>
                        <Badge variant="secondary">Pending</Badge>
                      </div>
                      <p className="text-sm mb-3">"Excellent service! They fixed my car quickly and professionally."</p>
                      <div className="flex gap-2">
                        <Button size="sm">Approve</Button>
                        <Button size="sm" variant="outline">Flag</Button>
                        <Button size="sm" variant="ghost">Edit</Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Media Content Moderation */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Eye className="h-5 w-5 text-purple-600" />
                    Media Content Review
                  </CardTitle>
                  <CardDescription>Review photos, videos, and other media uploads</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="p-4 border rounded-lg">
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <h4 className="font-medium">Shop Photo Upload</h4>
                          <p className="text-sm text-gray-600">Mike's Garage • 5 hours ago</p>
                        </div>
                        <Badge variant="secondary">Pending</Badge>
                      </div>
                      <p className="text-sm mb-3">New shop photos for portfolio - 5 images uploaded</p>
                      <div className="grid grid-cols-5 gap-1 mb-3">
                        <div className="aspect-square bg-gray-200 rounded flex items-center justify-center text-xs">Img1</div>
                        <div className="aspect-square bg-gray-200 rounded flex items-center justify-center text-xs">Img2</div>
                        <div className="aspect-square bg-gray-200 rounded flex items-center justify-center text-xs">Img3</div>
                        <div className="aspect-square bg-gray-200 rounded flex items-center justify-center text-xs">Img4</div>
                        <div className="aspect-square bg-gray-200 rounded flex items-center justify-center text-xs">Img5</div>
                      </div>
                      <div className="flex gap-2">
                        <Button size="sm">Approve</Button>
                        <Button size="sm" variant="outline">Reject</Button>
                        <Button size="sm" variant="ghost">View All</Button>
                      </div>
                    </div>

                    <div className="p-4 border rounded-lg">
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <h4 className="font-medium">Before/After Photos</h4>
                          <p className="text-sm text-gray-600">Downtown Repair • 2 hours ago</p>
                        </div>
                        <Badge variant="destructive">Flagged</Badge>
                      </div>
                      <p className="text-sm mb-3">Work completion photos - potential quality concerns</p>
                      <div className="grid grid-cols-2 gap-2 mb-3">
                        <div className="aspect-video bg-gray-200 rounded flex items-center justify-center text-xs">Before</div>
                        <div className="aspect-video bg-gray-200 rounded flex items-center justify-center text-xs">After</div>
                      </div>
                      <div className="flex gap-2">
                        <Button size="sm">Approve</Button>
                        <Button size="sm" variant="outline">Request Revision</Button>
                        <Button size="sm" variant="ghost">View Details</Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Moderation Stats */}
            <Card>
              <CardHeader>
                <CardTitle>Moderation Statistics</CardTitle>
                <CardDescription>Weekly moderation activity</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="text-center">
                    <p className="text-2xl font-bold text-green-600">23</p>
                    <p className="text-sm text-gray-600">Approved</p>
                  </div>
                  <div className="text-center">
                    <p className="text-2xl font-bold text-red-600">5</p>
                    <p className="text-sm text-gray-600">Rejected</p>
                  </div>
                  <div className="text-center">
                    <p className="text-2xl font-bold text-yellow-600">12</p>
                    <p className="text-sm text-gray-600">Pending</p>
                  </div>
                  <div className="text-center">
                    <p className="text-2xl font-bold text-blue-600">8</p>
                    <p className="text-sm text-gray-600">Flagged</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Disputes Tab */}
          <TabsContent value="disputes" className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold">Dispute Resolution</h2>
              <Button>Resolve Selected</Button>
            </div>

            <Card>
              <CardContent className="p-0">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Dispute ID</TableHead>
                      <TableHead>Type</TableHead>
                      <TableHead>Parties</TableHead>
                      <TableHead>Amount</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Date</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <TableRow>
                      <TableCell className="font-medium">#DSP-001</TableCell>
                      <TableCell>Service Quality</TableCell>
                      <TableCell>John D. vs QuickFix Auto</TableCell>
                      <TableCell>$245.99</TableCell>
                      <TableCell><Badge variant="destructive">Open</Badge></TableCell>
                      <TableCell>2024-01-12</TableCell>
                      <TableCell>
                        <div className="flex gap-2">
                          <Button size="sm" variant="ghost">Review</Button>
                          <Button size="sm" variant="ghost">Mediate</Button>
                        </div>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">#DSP-002</TableCell>
                      <TableCell>Payment Issue</TableCell>
                      <TableCell>Sarah M. vs Elite Auto</TableCell>
                      <TableCell>$89.50</TableCell>
                      <TableCell><Badge className="bg-yellow-100 text-yellow-800">In Review</Badge></TableCell>
                      <TableCell>2024-01-10</TableCell>
                      <TableCell>
                        <div className="flex gap-2">
                          <Button size="sm" variant="ghost">Review</Button>
                          <Button size="sm" variant="ghost">Mediate</Button>
                        </div>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">#DSP-003</TableCell>
                      <TableCell>Refund Request</TableCell>
                      <TableCell>Mike R. vs Downtown Repair</TableCell>
                      <TableCell>$156.00</TableCell>
                      <TableCell><Badge className="bg-green-100 text-green-800">Resolved</Badge></TableCell>
                      <TableCell>2024-01-08</TableCell>
                      <TableCell>
                        <div className="flex gap-2">
                          <Button size="sm" variant="ghost">View</Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </CardContent>
            </Card>

            {/* Dispute Details */}
            <Card>
              <CardHeader>
                <CardTitle>Dispute Details - #DSP-001</CardTitle>
                <CardDescription>Service quality dispute between customer and shop</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <h4 className="font-medium mb-2">Customer Statement</h4>
                    <p className="text-sm text-gray-600 bg-gray-50 p-3 rounded">
                      "The brake pads were installed incorrectly and started making noise after 2 days.
                      The shop refuses to fix it properly and won't refund my money."
                    </p>
                  </div>
                  <div>
                    <h4 className="font-medium mb-2">Shop Response</h4>
                    <p className="text-sm text-gray-600 bg-gray-50 p-3 rounded">
                      "We installed the parts correctly according to specifications. The noise might be
                      due to normal break-in period. We offered to inspect but customer declined."
                    </p>
                  </div>
                </div>

                <div>
                  <h4 className="font-medium mb-2">Evidence</h4>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                    <div className="aspect-square bg-gray-200 rounded flex items-center justify-center text-xs">Receipt</div>
                    <div className="aspect-square bg-gray-200 rounded flex items-center justify-center text-xs">Photos</div>
                    <div className="aspect-square bg-gray-200 rounded flex items-center justify-center text-xs">Work Order</div>
                    <div className="aspect-square bg-gray-200 rounded flex items-center justify-center text-xs">Messages</div>
                  </div>
                </div>

                <div className="flex gap-3">
                  <Button>Refund Customer</Button>
                  <Button variant="outline">Require Shop Fix</Button>
                  <Button variant="outline">Escalate</Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Payouts Tab */}
          <TabsContent value="payouts" className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold">Payout Management</h2>
              <Button>Process Payouts</Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Payout Stats */}
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center gap-3">
                    <DollarSign className="h-8 w-8 text-green-600" />
                    <div>
                      <p className="text-2xl font-bold">$12,450</p>
                      <p className="text-sm text-gray-600">Pending Payouts</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center gap-3">
                    <CheckCircle className="h-8 w-8 text-blue-600" />
                    <div>
                      <p className="text-2xl font-bold">$45,230</p>
                      <p className="text-sm text-gray-600">Processed This Month</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center gap-3">
                    <TrendingUp className="h-8 w-8 text-purple-600" />
                    <div>
                      <p className="text-2xl font-bold">2.3%</p>
                      <p className="text-sm text-gray-600">Platform Fee</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Payout Queue */}
            <Card>
              <CardHeader>
                <CardTitle>Pending Payouts</CardTitle>
                <CardDescription>Shops awaiting payment for completed services</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 border rounded-lg">
                    <div>
                      <h4 className="font-medium">QuickFix Auto Service</h4>
                      <p className="text-sm text-gray-600">3 completed jobs • $892.50 total</p>
                      <p className="text-xs text-gray-500">Due: Jan 15, 2024</p>
                    </div>
                    <div className="flex items-center gap-3">
                      <Badge className="bg-yellow-100 text-yellow-800">Pending</Badge>
                      <Button size="sm">Process</Button>
                    </div>
                  </div>

                  <div className="flex items-center justify-between p-4 border rounded-lg">
                    <div>
                      <h4 className="font-medium">Elite Auto Care</h4>
                      <p className="text-sm text-gray-600">5 completed jobs • $1,245.00 total</p>
                      <p className="text-xs text-gray-500">Due: Jan 15, 2024</p>
                    </div>
                    <div className="flex items-center gap-3">
                      <Badge className="bg-yellow-100 text-yellow-800">Pending</Badge>
                      <Button size="sm">Process</Button>
                    </div>
                  </div>

                  <div className="flex items-center justify-between p-4 border rounded-lg">
                    <div>
                      <h4 className="font-medium">Mike's Garage</h4>
                      <p className="text-sm text-gray-600">2 completed jobs • $456.75 total</p>
                      <p className="text-xs text-gray-500">Due: Jan 15, 2024</p>
                    </div>
                    <div className="flex items-center gap-3">
                      <Badge className="bg-green-100 text-green-800">Processing</Badge>
                      <Button size="sm" disabled>Processing</Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Payout History */}
            <Card>
              <CardHeader>
                <CardTitle>Payout History</CardTitle>
                <CardDescription>Recent completed payouts</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center justify-between py-2 border-b">
                    <div>
                      <p className="font-medium">QuickFix Auto Service</p>
                      <p className="text-sm text-gray-600">Jan 1, 2024</p>
                    </div>
                    <div className="text-right">
                      <p className="font-medium">$756.23</p>
                      <Badge className="bg-green-100 text-green-800 text-xs">Completed</Badge>
                    </div>
                  </div>

                  <div className="flex items-center justify-between py-2 border-b">
                    <div>
                      <p className="font-medium">Elite Auto Care</p>
                      <p className="text-sm text-gray-600">Jan 1, 2024</p>
                    </div>
                    <div className="text-right">
                      <p className="font-medium">$1,123.45</p>
                      <Badge className="bg-green-100 text-green-800 text-xs">Completed</Badge>
                    </div>
                  </div>

                  <div className="flex items-center justify-between py-2 border-b">
                    <div>
                      <p className="font-medium">Downtown Repair</p>
                      <p className="text-sm text-gray-600">Dec 25, 2023</p>
                    </div>
                    <div className="text-right">
                      <p className="font-medium">$892.10</p>
                      <Badge className="bg-green-100 text-green-800 text-xs">Completed</Badge>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Featured Deals Tab */}
          <TabsContent value="featured" className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold">Featured Deals Management</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {products.map(product => (
                <Card key={product.id} className={product.isFeatured ? 'border-yellow-400 bg-yellow-50' : ''}>
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div>
                        <CardTitle className="text-lg">{product.name}</CardTitle>
                        <CardDescription>{product.brand}</CardDescription>
                      </div>
                      <Badge variant={product.isFeatured ? "default" : "secondary"}>
                        {product.isFeatured ? 'Featured' : 'Regular'}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-600">Price:</span>
                        <span className="font-semibold">${product.salePrice || product.price}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Switch
                          checked={product.isFeatured}
                          onCheckedChange={() => handleToggleFeatured(product.id)}
                        />
                        <Label>Mark as Featured Deal</Label>
                      </div>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm" className="flex-1">
                          <Edit className="h-4 w-4 mr-2" />
                          Edit
                        </Button>
                        <Button variant="outline" size="sm" className="flex-1">
                          <Eye className="h-4 w-4 mr-2" />
                          View
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Vehicle Data Tab */}
          <TabsContent value="vehicles" className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold">Vehicle Data Management</h2>
              <Dialog open={isCreateVehicleDataOpen} onOpenChange={setIsCreateVehicleDataOpen}>
                <DialogTrigger asChild>
                  <Button>
                    <Plus className="h-4 w-4 mr-2" />
                    Add Vehicle Data
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Add Vehicle Data</DialogTitle>
                    <DialogDescription>Add new years, makes, or models</DialogDescription>
                  </DialogHeader>
                  <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="data-type" className="text-right">Type</Label>
                      <Select>
                        <SelectTrigger className="col-span-3">
                          <SelectValue placeholder="Select type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="year">Year</SelectItem>
                          <SelectItem value="make">Make</SelectItem>
                          <SelectItem value="model">Model</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="data-value" className="text-right">Value</Label>
                      <Input id="data-value" className="col-span-3" placeholder="Enter value" />
                    </div>
                  </div>
                  <div className="flex justify-end gap-2">
                    <Button variant="outline" onClick={() => setIsCreateVehicleDataOpen(false)}>Cancel</Button>
                    <Button onClick={() => setIsCreateVehicleDataOpen(false)}>Add Data</Button>
                  </div>
                </DialogContent>
              </Dialog>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Years */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Car className="h-5 w-5" />
                    Vehicle Years
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    {vehicleYears.map(year => (
                      <div key={year.id} className="flex items-center justify-between p-2 border rounded">
                        <span>{year.year}</span>
                        <div className="flex items-center gap-2">
                          <Switch checked={year.isActive} size="sm" />
                          <Button variant="ghost" size="sm">
                            <Edit className="h-3 w-3" />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Makes */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <TrendingUp className="h-5 w-5" />
                    Vehicle Makes
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    {vehicleMakes.map(make => (
                      <div key={make.id} className="flex items-center justify-between p-2 border rounded">
                        <span>{make.name}</span>
                        <div className="flex items-center gap-2">
                          <Switch checked={make.isActive} size="sm" />
                          <Button variant="ghost" size="sm">
                            <Edit className="h-3 w-3" />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Models */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Users className="h-5 w-5" />
                    Vehicle Models
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    {vehicleModels.map(model => {
                      const make = vehicleMakes.find(m => m.id === model.makeId);
                      return (
                        <div key={model.id} className="flex items-center justify-between p-2 border rounded">
                          <span>{make?.name} {model.name}</span>
                          <div className="flex items-center gap-2">
                            <Switch checked={model.isActive} size="sm" />
                            <Button variant="ghost" size="sm">
                              <Edit className="h-3 w-3" />
                            </Button>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Settings Tab */}
          <TabsContent value="settings" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Settings className="h-5 w-5" />
                  Admin Settings
                </CardTitle>
                <CardDescription>Configure your admin dashboard preferences</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <Label>Email Notifications</Label>
                    <p className="text-sm text-gray-600">Receive notifications for new orders and updates</p>
                  </div>
                  <Switch />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <Label>Auto-save Drafts</Label>
                    <p className="text-sm text-gray-600">Automatically save product drafts</p>
                  </div>
                  <Switch defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <Label>Public API Access</Label>
                    <p className="text-sm text-gray-600">Allow third-party access to product data</p>
                  </div>
                  <Switch />
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
}
