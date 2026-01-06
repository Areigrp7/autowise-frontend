import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import Layout from '@/components/Layout';
import {
  Settings,
  Star,
  DollarSign,
  TrendingUp,
  Users,
  Calendar,
  Wrench,
  Bell,
  CreditCard,
  Upload,
  CheckCircle,
  AlertCircle
} from 'lucide-react';

const ShopDashboard = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [profileData, setProfileData] = useState({
    name: 'QuickFix Auto Service',
    description: 'Full-service auto repair shop specializing in domestic and import vehicles.',
    phone: '(555) 123-4567',
    email: 'info@quickfixauto.com',
    website: 'https://quickfixauto.com',
    address: {
      street: '123 Main Street',
      city: 'Springfield',
      state: 'IL',
      zipCode: '62704'
    },
    services: ['Oil Change', 'Brake Service', 'Engine Repair'],
    specialties: ['European Cars', 'Fuel Injection'],
    hours: {
      monday: '8:00 AM - 6:00 PM',
      tuesday: '8:00 AM - 6:00 PM',
      wednesday: '8:00 AM - 6:00 PM',
      thursday: '8:00 AM - 6:00 PM',
      friday: '8:00 AM - 6:00 PM',
      saturday: '9:00 AM - 4:00 PM',
      sunday: 'Closed'
    }
  });

  const [subscriptionData, setSubscriptionData] = useState({
    plan: 'Professional',
    status: 'Active',
    renewalDate: '2024-02-15',
    features: ['Basic listing', 'Quote responses', 'Customer reviews', 'Basic analytics'],
    price: 49.99
  });

  const [notificationSettings, setNotificationSettings] = useState({
    email: {
      newQuotes: true,
      quoteUpdates: true,
      newReviews: true,
      promotions: false,
      systemUpdates: true
    },
    push: {
      newQuotes: true,
      quoteUpdates: true,
      urgentMessages: true,
      promotions: false
    }
  });

  // Mock stats - in real app this would come from API
  const stats = {
    totalQuotes: 145,
    activeQuotes: 12,
    completedJobs: 89,
    averageRating: 4.8,
    totalRevenue: 45230,
    monthlyRevenue: 3890,
    newReviews: 5,
    responseRate: 95
  };

  const handleProfileUpdate = () => {
    // In real app, this would make an API call
    console.log('Updating profile:', profileData);
  };

  const handleNotificationUpdate = () => {
    // In real app, this would make an API call
    console.log('Updating notifications:', notificationSettings);
  };

  return (
    <Layout currentPage="shop-dashboard">
      <div className="container mx-auto px-4 py-6">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Shop Dashboard</h1>
          <p className="text-gray-600">Manage your shop profile, services, and business settings</p>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="profile">Profile</TabsTrigger>
            <TabsTrigger value="subscription">Subscription</TabsTrigger>
            <TabsTrigger value="notifications">Notifications</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-6">
            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center gap-3">
                    <Calendar className="h-8 w-8 text-blue-600" />
                    <div>
                      <p className="text-2xl font-bold">{stats.totalQuotes}</p>
                      <p className="text-sm text-gray-600">Total Quotes</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center gap-3">
                    <Star className="h-8 w-8 text-yellow-600" />
                    <div>
                      <p className="text-2xl font-bold">{stats.averageRating}</p>
                      <p className="text-sm text-gray-600">Average Rating</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center gap-3">
                    <DollarSign className="h-8 w-8 text-green-600" />
                    <div>
                      <p className="text-2xl font-bold">${stats.monthlyRevenue}</p>
                      <p className="text-sm text-gray-600">Monthly Revenue</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center gap-3">
                    <TrendingUp className="h-8 w-8 text-purple-600" />
                    <div>
                      <p className="text-2xl font-bold">{stats.responseRate}%</p>
                      <p className="text-sm text-gray-600">Response Rate</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Recent Activity */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Recent Quotes</CardTitle>
                  <CardDescription>Latest service requests</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-3 border rounded-lg">
                      <div>
                        <p className="font-medium">Brake Pad Replacement</p>
                        <p className="text-sm text-gray-600">Toyota Camry 2019</p>
                      </div>
                      <Badge>Active</Badge>
                    </div>
                    <div className="flex items-center justify-between p-3 border rounded-lg">
                      <div>
                        <p className="font-medium">Oil Change</p>
                        <p className="text-sm text-gray-600">Honda Civic 2020</p>
                      </div>
                      <Badge variant="secondary">Pending</Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Recent Reviews</CardTitle>
                  <CardDescription>Latest customer feedback</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="p-3 border rounded-lg">
                      <div className="flex items-center gap-2 mb-2">
                        <div className="flex">
                          {[...Array(5)].map((_, i) => (
                            <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                          ))}
                        </div>
                        <span className="text-sm font-medium">John D.</span>
                      </div>
                      <p className="text-sm text-gray-600">"Excellent service! Very professional and timely."</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Profile Tab */}
          <TabsContent value="profile" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Settings className="h-5 w-5" />
                  Shop Profile Settings
                </CardTitle>
                <CardDescription>Update your shop information and services</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="shop-name">Shop Name</Label>
                      <Input
                        id="shop-name"
                        value={profileData.name}
                        onChange={(e) => setProfileData({...profileData, name: e.target.value})}
                      />
                    </div>
                    <div>
                      <Label htmlFor="shop-phone">Phone</Label>
                      <Input
                        id="shop-phone"
                        value={profileData.phone}
                        onChange={(e) => setProfileData({...profileData, phone: e.target.value})}
                      />
                    </div>
                    <div>
                      <Label htmlFor="shop-email">Email</Label>
                      <Input
                        id="shop-email"
                        type="email"
                        value={profileData.email}
                        onChange={(e) => setProfileData({...profileData, email: e.target.value})}
                      />
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="shop-website">Website</Label>
                      <Input
                        id="shop-website"
                        value={profileData.website}
                        onChange={(e) => setProfileData({...profileData, website: e.target.value})}
                      />
                    </div>
                    <div>
                      <Label htmlFor="shop-description">Description</Label>
                      <Textarea
                        id="shop-description"
                        value={profileData.description}
                        onChange={(e) => setProfileData({...profileData, description: e.target.value})}
                        rows={3}
                      />
                    </div>
                  </div>
                </div>

                <div>
                  <Label>Business Hours</Label>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
                    {Object.entries(profileData.hours).map(([day, hours]) => (
                      <div key={day} className="flex items-center gap-4">
                        <Label className="w-20 capitalize">{day}:</Label>
                        <Input
                          value={hours}
                          onChange={(e) => setProfileData({
                            ...profileData,
                            hours: {...profileData.hours, [day]: e.target.value}
                          })}
                        />
                      </div>
                    ))}
                  </div>
                </div>

                <Button onClick={handleProfileUpdate}>Save Changes</Button>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Subscription Tab */}
          <TabsContent value="subscription" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CreditCard className="h-5 w-5" />
                  Subscription Plan
                </CardTitle>
                <CardDescription>Manage your subscription and billing</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div>
                    <h3 className="font-medium">{subscriptionData.plan} Plan</h3>
                    <p className="text-sm text-gray-600">${subscriptionData.price}/month</p>
                    <p className="text-xs text-gray-500">Renews on {subscriptionData.renewalDate}</p>
                  </div>
                  <Badge className="bg-green-100 text-green-800">{subscriptionData.status}</Badge>
                </div>

                <div>
                  <h4 className="font-medium mb-2">Plan Features</h4>
                  <div className="space-y-2">
                    {subscriptionData.features.map((feature, index) => (
                      <div key={index} className="flex items-center gap-2">
                        <CheckCircle className="h-4 w-4 text-green-500" />
                        <span className="text-sm">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="flex gap-3">
                  <Button>Upgrade Plan</Button>
                  <Button variant="outline">Change Payment Method</Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Notifications Tab */}
          <TabsContent value="notifications" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Bell className="h-5 w-5" />
                  Notification Preferences
                </CardTitle>
                <CardDescription>Choose how you want to be notified</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <h4 className="font-medium mb-4">Email Notifications</h4>
                  <div className="space-y-4">
                    {Object.entries(notificationSettings.email).map(([key, value]) => (
                      <div key={key} className="flex items-center justify-between">
                        <div>
                          <Label className="capitalize">{key.replace(/([A-Z])/g, ' $1')}</Label>
                          <p className="text-sm text-gray-600">
                            {key === 'newQuotes' && 'Get notified when customers request quotes'}
                            {key === 'quoteUpdates' && 'Updates on your quote responses'}
                            {key === 'newReviews' && 'When customers leave reviews'}
                            {key === 'promotions' && 'Special offers and promotions'}
                            {key === 'systemUpdates' && 'Important system updates'}
                          </p>
                        </div>
                        <Switch
                          checked={value}
                          onCheckedChange={(checked) =>
                            setNotificationSettings({
                              ...notificationSettings,
                              email: {...notificationSettings.email, [key]: checked}
                            })
                          }
                        />
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="font-medium mb-4">Push Notifications</h4>
                  <div className="space-y-4">
                    {Object.entries(notificationSettings.push).map(([key, value]) => (
                      <div key={key} className="flex items-center justify-between">
                        <div>
                          <Label className="capitalize">{key.replace(/([A-Z])/g, ' $1')}</Label>
                          <p className="text-sm text-gray-600">
                            {key === 'newQuotes' && 'Instant notifications for new quotes'}
                            {key === 'quoteUpdates' && 'Updates on active quotes'}
                            {key === 'urgentMessages' && 'Time-sensitive messages'}
                            {key === 'promotions' && 'Marketing notifications'}
                          </p>
                        </div>
                        <Switch
                          checked={value}
                          onCheckedChange={(checked) =>
                            setNotificationSettings({
                              ...notificationSettings,
                              push: {...notificationSettings.push, [key]: checked}
                            })
                          }
                        />
                      </div>
                    ))}
                  </div>
                </div>

                <Button onClick={handleNotificationUpdate}>Save Preferences</Button>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Analytics Tab */}
          <TabsContent value="analytics" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center gap-3">
                    <Users className="h-8 w-8 text-blue-600" />
                    <div>
                      <p className="text-2xl font-bold">{stats.totalQuotes}</p>
                      <p className="text-sm text-gray-600">Profile Views</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center gap-3">
                    <Wrench className="h-8 w-8 text-green-600" />
                    <div>
                      <p className="text-2xl font-bold">{stats.completedJobs}</p>
                      <p className="text-sm text-gray-600">Completed Jobs</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center gap-3">
                    <Star className="h-8 w-8 text-yellow-600" />
                    <div>
                      <p className="text-2xl font-bold">{stats.newReviews}</p>
                      <p className="text-sm text-gray-600">New Reviews</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Performance Metrics</CardTitle>
                <CardDescription>Your shop's performance over time</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-64 flex items-center justify-center bg-gray-50 rounded-lg">
                  <p className="text-gray-500">Analytics charts would go here</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
};

export default ShopDashboard;
