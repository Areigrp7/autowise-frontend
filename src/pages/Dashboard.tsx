import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import Layout from '@/components/Layout';
import { 
  Car, 
  Plus, 
  Calendar, 
  AlertTriangle, 
  CheckCircle,
  Clock,
  Wrench,
  DollarSign,
  Star,
  MapPin,
  Edit,
  Trash2,
  Bell,
  Settings,
  FileText,
  Download,
  Eye
} from 'lucide-react';

interface Vehicle {
  id: string;
  year: number;
  make: string;
  model: string;
  trim?: string;
  vin: string;
  mileage: number;
  color: string;
  nickname?: string;
  image?: string;
}

interface MaintenanceItem {
  id: string;
  vehicleId: string;
  service: string;
  lastPerformed?: string;
  nextDue: string;
  milesDue: number;
  status: 'overdue' | 'due-soon' | 'upcoming';
  priority: 'high' | 'medium' | 'low';
}

interface Order {
  id: string;
  date: string;
  items: string[];
  shop?: string;
  total: number;
  status: 'completed' | 'in-progress' | 'scheduled' | 'cancelled';
  rating?: number;
}

export default function DashboardPage() {
  const [activeTab, setActiveTab] = useState('overview');
  
  const vehicles: Vehicle[] = [
    {
      id: '1',
      year: 2019,
      make: 'Toyota',
      model: 'Camry',
      trim: 'LE',
      vin: '4T1B11HK1KU123456',
      mileage: 62400,
      color: 'Silver',
      nickname: 'Daily Driver',
      image: '/api/placeholder/300/200'
    },
    {
      id: '2',
      year: 2016,
      make: 'Honda',
      model: 'Civic',
      trim: 'EX',
      vin: '19XFC2F59GE123456',
      mileage: 89200,
      color: 'Blue',
      nickname: 'Weekend Car'
    }
  ];

  const maintenanceItems: MaintenanceItem[] = [
    {
      id: '1',
      vehicleId: '1',
      service: 'Oil Change',
      lastPerformed: '2024-10-15',
      nextDue: '2024-01-15',
      milesDue: 65400,
      status: 'due-soon',
      priority: 'high'
    },
    {
      id: '2',
      vehicleId: '1',
      service: 'Tire Rotation',
      lastPerformed: '2024-07-20',
      nextDue: '2024-01-20',
      milesDue: 67400,
      status: 'upcoming',
      priority: 'medium'
    },
    {
      id: '3',
      vehicleId: '1',
      service: 'Brake Inspection',
      nextDue: '2023-12-01',
      milesDue: 60000,
      status: 'overdue',
      priority: 'high'
    }
  ];

  const orders: Order[] = [
    {
      id: '1',
      date: '2024-01-05',
      items: ['Brake Pads Installation', 'Brembo Brake Pads'],
      shop: 'QuickFix Auto Service',
      total: 209.99,
      status: 'completed',
      rating: 5
    },
    {
      id: '2',
      date: '2024-01-10',
      items: ['Oil Change Service'],
      shop: 'Premier Automotive',
      total: 45.99,
      status: 'scheduled'
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'overdue': return 'text-red-600 bg-red-50';
      case 'due-soon': return 'text-orange-600 bg-orange-50';
      case 'upcoming': return 'text-blue-600 bg-blue-50';
      case 'completed': return 'text-green-600 bg-green-50';
      case 'scheduled': return 'text-purple-600 bg-purple-50';
      default: return 'text-gray-600 bg-gray-50';
    }
  };

  const getPriorityIcon = (priority: string) => {
    switch (priority) {
      case 'high': return <AlertTriangle className="h-4 w-4 text-red-500" />;
      case 'medium': return <Clock className="h-4 w-4 text-orange-500" />;
      case 'low': return <CheckCircle className="h-4 w-4 text-green-500" />;
      default: return null;
    }
  };

  return (
    <Layout currentPage="dashboard">
      <div className="container mx-auto px-4 py-6">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">My Garage</h1>
          <p className="text-gray-600">Manage your vehicles, track maintenance, and view service history</p>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="vehicles">My Vehicles</TabsTrigger>
            <TabsTrigger value="maintenance">Maintenance</TabsTrigger>
            <TabsTrigger value="orders">Order History</TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center gap-3">
                    <Car className="h-8 w-8 text-blue-600" />
                    <div>
                      <p className="text-2xl font-bold">{vehicles.length}</p>
                      <p className="text-sm text-gray-600">Vehicles</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center gap-3">
                    <AlertTriangle className="h-8 w-8 text-red-600" />
                    <div>
                      <p className="text-2xl font-bold">1</p>
                      <p className="text-sm text-gray-600">Overdue Items</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center gap-3">
                    <Clock className="h-8 w-8 text-orange-600" />
                    <div>
                      <p className="text-2xl font-bold">1</p>
                      <p className="text-sm text-gray-600">Due Soon</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center gap-3">
                    <DollarSign className="h-8 w-8 text-green-600" />
                    <div>
                      <p className="text-2xl font-bold">$256</p>
                      <p className="text-sm text-gray-600">Total Spent</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Urgent Maintenance */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <AlertTriangle className="h-5 w-5 text-red-500" />
                  Urgent Maintenance Required
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {maintenanceItems
                    .filter(item => item.status === 'overdue' || item.status === 'due-soon')
                    .map(item => {
                      const vehicle = vehicles.find(v => v.id === item.vehicleId);
                      return (
                        <div key={item.id} className="flex items-center justify-between p-4 border rounded-lg">
                          <div className="flex items-center gap-3">
                            {getPriorityIcon(item.priority)}
                            <div>
                              <p className="font-medium">{item.service}</p>
                              <p className="text-sm text-gray-600">
                                {vehicle?.year} {vehicle?.make} {vehicle?.model}
                              </p>
                            </div>
                          </div>
                          <div className="flex items-center gap-3">
                            <Badge className={getStatusColor(item.status)}>
                              {item.status.replace('-', ' ')}
                            </Badge>
                            <Button size="sm">Schedule Service</Button>
                          </div>
                        </div>
                      );
                    })}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Vehicles Tab */}
          <TabsContent value="vehicles" className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold">My Vehicles</h2>
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                Add Vehicle
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {vehicles.map(vehicle => (
                <Card key={vehicle.id}>
                  <CardHeader>
                    <CardTitle className="text-xl">
                      {vehicle.year} {vehicle.make} {vehicle.model}
                    </CardTitle>
                    <CardDescription>
                      {vehicle.nickname && `"${vehicle.nickname}" • `}
                      {vehicle.mileage.toLocaleString()} miles
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <span className="text-gray-600">VIN:</span>
                          <p className="font-mono">{vehicle.vin}</p>
                        </div>
                        <div>
                          <span className="text-gray-600">Color:</span>
                          <p>{vehicle.color}</p>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Button variant="outline" className="flex-1">
                          <Wrench className="h-4 w-4 mr-2" />
                          Find Parts
                        </Button>
                        <Button variant="outline" className="flex-1">
                          <Calendar className="h-4 w-4 mr-2" />
                          Schedule Service
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Maintenance Tab */}
          <TabsContent value="maintenance" className="space-y-6">
            <div className="space-y-4">
              {maintenanceItems.map(item => {
                const vehicle = vehicles.find(v => v.id === item.vehicleId);
                return (
                  <Card key={item.id}>
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          {getPriorityIcon(item.priority)}
                          <div>
                            <h3 className="font-semibold">{item.service}</h3>
                            <p className="text-sm text-gray-600">
                              {vehicle?.year} {vehicle?.make} {vehicle?.model}
                            </p>
                            <p className="text-sm text-gray-500">
                              Due: {new Date(item.nextDue).toLocaleDateString()} or {item.milesDue.toLocaleString()} miles
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center gap-3">
                          <Badge className={getStatusColor(item.status)}>
                            {item.status.replace('-', ' ')}
                          </Badge>
                          <Button size="sm">Schedule</Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </TabsContent>

          {/* Orders Tab */}
          <TabsContent value="orders" className="space-y-6">
            <div className="space-y-4">
              {orders.map(order => (
                <Card key={order.id}>
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-semibold">{order.items.join(', ')}</h3>
                        <p className="text-sm text-gray-600">
                          {new Date(order.date).toLocaleDateString()}
                          {order.shop && ` • ${order.shop}`}
                        </p>
                        {order.rating && (
                          <div className="flex items-center gap-1 mt-1">
                            {Array.from({ length: 5 }, (_, i) => (
                              <Star 
                                key={i} 
                                className={`h-4 w-4 ${i < order.rating! ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`} 
                              />
                            ))}
                          </div>
                        )}
                      </div>
                      <div className="text-right">
                        <p className="font-semibold">${order.total}</p>
                        <Badge className={getStatusColor(order.status)}>
                          {order.status}
                        </Badge>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
}