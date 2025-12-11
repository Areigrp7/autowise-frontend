import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import Layout from '@/components/Layout';
import { AddVehicleForm } from '@/components/AddVehicleForm';
import { AddMaintenanceRecordForm } from '@/components/AddMaintenanceRecordForm';
import { AddReminderForm } from '@/components/AddReminderForm';
import {
  Car,
  Plus,
  Calendar,
  Wrench,
  AlertTriangle,
  CheckCircle,
  Clock,
  DollarSign,
  FileText,
  Settings,
  Fuel,
  Gauge,
  Shield,
  MapPin,
  Phone,
  Star,
  Edit,
  Trash2,
  Download,
  Upload
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

interface MaintenanceRecord {
  id: string;
  vehicleId: string;
  date: string;
  type: 'service' | 'repair' | 'inspection';
  description: string;
  mileage: number;
  cost: number;
  shop: string;
  nextDue?: string;
  nextMileage?: number;
  status: 'completed' | 'scheduled' | 'overdue';
}

interface Reminder {
  id: string;
  vehicleId: string;
  type: string;
  description: string;
  dueDate: string;
  dueMileage?: number;
  priority: 'low' | 'medium' | 'high';
  status: 'upcoming' | 'due' | 'overdue';
}

export default function MyGaragePage() {
  const [activeTab, setActiveTab] = useState('vehicles');
  const [showAddVehicleModal, setShowAddVehicleModal] = useState(false);
  const [showAddRecordModal, setShowAddRecordModal] = useState(false);
  const [showAddReminderModal, setShowAddReminderModal] = useState(false);

  const [vehicles, setVehicles] = useState<Vehicle[]>([
    {
      id: '1',
      year: 2019,
      make: 'Toyota',
      model: 'Camry',
      trim: 'LE',
      vin: '4T1B11HK1KU123456',
      mileage: 45230,
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
      vin: '2HGFC2F59GH123456',
      mileage: 78450,
      color: 'Blue',
      nickname: 'Weekend Car'
    }
  ]);

  const [maintenanceRecords, setMaintenanceRecords] = useState<MaintenanceRecord[]>([
    {
      id: '1',
      vehicleId: '1',
      date: '2024-01-05',
      type: 'service',
      description: 'Oil Change & Filter Replacement',
      mileage: 45000,
      cost: 45.99,
      shop: 'QuickFix Auto Service',
      nextDue: '2024-04-05',
      nextMileage: 48000,
      status: 'completed'
    },
    {
      id: '2',
      vehicleId: '1',
      date: '2023-12-15',
      type: 'repair',
      description: 'Brake Pad Replacement - Front',
      mileage: 44800,
      cost: 289.99,
      shop: 'Premier Automotive',
      status: 'completed'
    },
    {
      id: '3',
      vehicleId: '2',
      date: '2024-01-20',
      type: 'inspection',
      description: 'Annual State Inspection',
      mileage: 78200,
      cost: 25.00,
      shop: 'City Motors Garage',
      nextDue: '2025-01-20',
      status: 'completed'
    }
  ]);

  const [reminders, setReminders] = useState<Reminder[]>([
    {
      id: '1',
      vehicleId: '1',
      type: 'Oil Change',
      description: 'Next oil change due',
      dueDate: '2024-04-05',
      dueMileage: 48000,
      priority: 'medium',
      status: 'upcoming'
    },
    {
      id: '2',
      vehicleId: '1',
      type: 'Tire Rotation',
      description: 'Rotate tires for even wear',
      dueDate: '2024-02-15',
      dueMileage: 46000,
      priority: 'low',
      status: 'due'
    },
    {
      id: '3',
      vehicleId: '2',
      type: 'Registration Renewal',
      description: 'Vehicle registration expires',
      dueDate: '2024-01-30',
      priority: 'high',
      status: 'overdue'
    }
  ]);

  const handleAddVehicle = (newVehicle: Vehicle) => {
    setVehicles((prevVehicles) => [...prevVehicles, newVehicle]);
  };

  const handleAddMaintenanceRecord = (newRecord: MaintenanceRecord) => {
    setMaintenanceRecords((prevRecords) => [...prevRecords, newRecord]);
  };

  const handleAddReminder = (newReminder: Reminder) => {
    setReminders((prevReminders) => [...prevReminders, newReminder]);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'text-green-600 bg-green-50';
      case 'scheduled': return 'text-blue-600 bg-blue-50';
      case 'overdue': return 'text-red-600 bg-red-50';
      case 'upcoming': return 'text-blue-600 bg-blue-50';
      case 'due': return 'text-yellow-600 bg-yellow-50';
      default: return 'text-gray-600 bg-gray-50';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'text-red-600 bg-red-50';
      case 'medium': return 'text-yellow-600 bg-yellow-50';
      case 'low': return 'text-green-600 bg-green-50';
      default: return 'text-gray-600 bg-gray-50';
    }
  };

  return (
    <>
    <Layout currentPage="dashboard">
      <div className="container mx-auto px-4 py-6">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">My Garage</h1>
          <p className="text-gray-600">Manage your vehicles, track maintenance, and stay on top of service schedules</p>
        </div>

        {/* Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="vehicles">Vehicles</TabsTrigger>
            <TabsTrigger value="maintenance">Maintenance</TabsTrigger>
            <TabsTrigger value="reminders">Reminders</TabsTrigger>
            <TabsTrigger value="documents">Documents</TabsTrigger>
          </TabsList>

          {/* Vehicles Tab */}
          <TabsContent value="vehicles" className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold">My Vehicles</h2>
              <Button onClick={() => setShowAddVehicleModal(true)}>
                <Plus className="h-4 w-4 mr-2" />
                Add Vehicle
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {vehicles.map(vehicle => (
                <Card key={vehicle.id} className="overflow-hidden">
                  <div className="aspect-video bg-gray-100 relative">
                    {/* {vehicle.image ? (
                      <img src={vehicle.image} alt={`${vehicle.year} ${vehicle.make} ${vehicle.model}`} className="w-full h-full object-cover" />
                    ) : ( */}
                      <div className="w-full h-full flex items-center justify-center">
                        <Car className="h-16 w-16 text-gray-400" />
                      </div>
                    {/* // )} */}
                    <div className="absolute top-2 right-2 flex gap-2">
                      <Button variant="ghost" size="sm" className="bg-white/80 hover:bg-white">
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="sm" className="bg-white/80 hover:bg-white text-red-600">
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                  
                  <CardHeader className="pb-3">
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle className="text-lg">
                          {vehicle.year} {vehicle.make} {vehicle.model}
                        </CardTitle>
                        {vehicle.nickname && (
                          <CardDescription>"{vehicle.nickname}"</CardDescription>
                        )}
                      </div>
                    </div>
                  </CardHeader>
                  
                  <CardContent className="space-y-3">
                    <div className="grid grid-cols-2 gap-2 text-sm">
                      <div>
                        <p className="text-gray-600">Mileage</p>
                        <p className="font-medium">{vehicle.mileage.toLocaleString()} mi</p>
                      </div>
                      <div>
                        <p className="text-gray-600">Color</p>
                        <p className="font-medium">{vehicle.color}</p>
                      </div>
                    </div>
                    
                    <div className="text-sm">
                      <p className="text-gray-600">VIN</p>
                      <p className="font-mono text-xs">{vehicle.vin}</p>
                    </div>
                    
                    <div className="flex gap-2 pt-2">
                      <Button variant="outline" size="sm" className="flex-1">
                        <Wrench className="h-4 w-4 mr-1" />
                        Service
                      </Button>
                      <Button variant="outline" size="sm" className="flex-1">
                        <FileText className="h-4 w-4 mr-1" />
                        Records
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Maintenance Tab */}
          <TabsContent value="maintenance" className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold">Maintenance Records</h2>
              <Button onClick={() => setShowAddRecordModal(true)}>
                <Plus className="h-4 w-4 mr-2" />
                Add Record
              </Button>
            </div>

            <div className="space-y-4">
              {maintenanceRecords.map(record => {
                const vehicle = vehicles.find(v => v.id === record.vehicleId);
                return (
                  <Card key={record.id}>
                    <CardContent className="p-6">
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <h3 className="font-semibold text-lg">{record.description}</h3>
                            <Badge className={getStatusColor(record.status)}>
                              {record.status}
                            </Badge>
                          </div>
                          <p className="text-gray-600 mb-1">
                            {vehicle?.year} {vehicle?.make} {vehicle?.model}
                          </p>
                          <div className="flex items-center gap-4 text-sm text-gray-600">
                            <div className="flex items-center gap-1">
                              <Calendar className="h-4 w-4" />
                              {new Date(record.date).toLocaleDateString()}
                            </div>
                            <div className="flex items-center gap-1">
                              <Gauge className="h-4 w-4" />
                              {record.mileage.toLocaleString()} mi
                            </div>
                            <div className="flex items-center gap-1">
                              <MapPin className="h-4 w-4" />
                              {record.shop}
                            </div>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="text-xl font-bold text-green-600">${record.cost}</div>
                          {record.nextDue && (
                            <div className="text-sm text-gray-600">
                              Next: {new Date(record.nextDue).toLocaleDateString()}
                            </div>
                          )}
                        </div>
                      </div>
                      
                      {record.nextMileage && (
                        <div className="bg-blue-50 p-3 rounded-lg">
                          <div className="flex items-center gap-2 text-blue-700">
                            <Clock className="h-4 w-4" />
                            <span className="text-sm font-medium">
                              Next service due at {record.nextMileage.toLocaleString()} miles
                            </span>
                          </div>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </TabsContent>

          {/* Reminders Tab */}
          <TabsContent value="reminders" className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold">Service Reminders</h2>
              <Button onClick={() => setShowAddReminderModal(true)}>
                <Plus className="h-4 w-4 mr-2" />
                Add Reminder
              </Button>
            </div>

            <div className="grid gap-4">
              {reminders.map(reminder => {
                const vehicle = vehicles.find(v => v.id === reminder.vehicleId);
                return (
                  <Card key={reminder.id}>
                    <CardContent className="p-6">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <h3 className="font-semibold text-lg">{reminder.type}</h3>
                            <Badge className={getStatusColor(reminder.status)}>
                              {reminder.status}
                            </Badge>
                            <Badge className={getPriorityColor(reminder.priority)}>
                              {reminder.priority} priority
                            </Badge>
                          </div>
                          <p className="text-gray-600 mb-2">{reminder.description}</p>
                          <p className="text-sm text-gray-600">
                            {vehicle?.year} {vehicle?.make} {vehicle?.model}
                          </p>
                        </div>
                        <div className="text-right">
                          <div className="text-lg font-medium">
                            {new Date(reminder.dueDate).toLocaleDateString()}
                          </div>
                          {reminder.dueMileage && (
                            <div className="text-sm text-gray-600">
                              or {reminder.dueMileage.toLocaleString()} mi
                            </div>
                          )}
                          <Button variant="outline" size="sm" className="mt-2">
                            Mark Complete
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </TabsContent>

          {/* Documents Tab */}
          <TabsContent value="documents" className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold">Vehicle Documents</h2>
              <Button>
                <Upload className="h-4 w-4 mr-2" />
                Upload Document
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* Document categories */}
              {[
                { title: 'Registration', icon: FileText, count: 2 },
                { title: 'Insurance', icon: Shield, count: 1 },
                { title: 'Service Records', icon: Wrench, count: 5 },
                { title: 'Warranties', icon: CheckCircle, count: 3 },
                { title: 'Receipts', icon: DollarSign, count: 12 },
                { title: 'Manuals', icon: FileText, count: 2 }
              ].map(category => (
                <Card key={category.title} className="cursor-pointer hover:shadow-md transition-shadow">
                  <CardContent className="p-6 text-center">
                    <category.icon className="h-12 w-12 text-blue-600 mx-auto mb-4" />
                    <h3 className="font-semibold text-lg mb-2">{category.title}</h3>
                    <p className="text-gray-600 mb-4">{category.count} documents</p>
                    <Button variant="outline" size="sm">
                      <Download className="h-4 w-4 mr-2" />
                      View All
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
    <AddVehicleForm open={showAddVehicleModal} onOpenChange={setShowAddVehicleModal} onAddVehicle={handleAddVehicle} />
    <AddMaintenanceRecordForm open={showAddRecordModal} onOpenChange={setShowAddRecordModal} onAddMaintenanceRecord={handleAddMaintenanceRecord} vehicles={vehicles} />
    <AddReminderForm open={showAddReminderModal} onOpenChange={setShowAddReminderModal} onAddReminder={handleAddReminder} vehicles={vehicles} />
    </>
    
  );
}