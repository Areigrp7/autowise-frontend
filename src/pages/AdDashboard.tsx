import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import Layout from '@/components/Layout';
import {
  Plus,
  TrendingUp,
  Eye,
  Users,
  DollarSign,
  Calendar,
  Target,
  BarChart3,
  Settings,
  Play,
  Pause,
  Edit,
  Trash2,
  CheckCircle,
  AlertCircle
} from 'lucide-react';

interface Campaign {
  id: string;
  name: string;
  status: 'active' | 'paused' | 'ended';
  type: 'featured_listing' | 'search_boost' | 'promoted_quotes' | 'banner_ad';
  budget: number;
  spent: number;
  impressions: number;
  clicks: number;
  conversions: number;
  startDate: string;
  endDate: string;
  targetAudience: {
    location: string;
    services: string[];
    vehicleTypes: string[];
  };
  performance: {
    ctr: number;
    cpc: number;
    cpa: number;
    roi: number;
  };
}

const AdDashboard = () => {
  const [activeTab, setActiveTab] = useState('campaigns');
  const [showCreateDialog, setShowCreateDialog] = useState(false);
  const [selectedCampaign, setSelectedCampaign] = useState<Campaign | null>(null);

  // Mock campaign data
  const [campaigns] = useState<Campaign[]>([
    {
      id: '1',
      name: 'Premium Search Boost',
      status: 'active',
      type: 'search_boost',
      budget: 500,
      spent: 245.67,
      impressions: 15420,
      clicks: 1234,
      conversions: 23,
      startDate: '2024-01-01',
      endDate: '2024-01-31',
      targetAudience: {
        location: 'Springfield, IL',
        services: ['Oil Change', 'Brake Service'],
        vehicleTypes: ['Toyota', 'Honda']
      },
      performance: {
        ctr: 8.0,
        cpc: 0.20,
        cpa: 10.68,
        roi: 185
      }
    },
    {
      id: '2',
      name: 'Featured Listing Q1',
      status: 'active',
      type: 'featured_listing',
      budget: 300,
      spent: 156.89,
      impressions: 8920,
      clicks: 445,
      conversions: 12,
      startDate: '2024-01-01',
      endDate: '2024-03-31',
      targetAudience: {
        location: 'Springfield, IL',
        services: ['All Services'],
        vehicleTypes: ['All Vehicles']
      },
      performance: {
        ctr: 5.0,
        cpc: 0.35,
        cpa: 13.07,
        roi: 142
      }
    },
    {
      id: '3',
      name: 'Brake Service Promotion',
      status: 'paused',
      type: 'promoted_quotes',
      budget: 200,
      spent: 89.45,
      impressions: 5670,
      clicks: 234,
      conversions: 8,
      startDate: '2024-01-15',
      endDate: '2024-02-15',
      targetAudience: {
        location: 'Springfield, IL',
        services: ['Brake Service'],
        vehicleTypes: ['All Vehicles']
      },
      performance: {
        ctr: 4.1,
        cpc: 0.38,
        cpa: 11.18,
        roi: 125
      }
    }
  ]);

  const campaignTypes = [
    { value: 'featured_listing', label: 'Featured Listing', description: 'Appear at the top of search results' },
    { value: 'search_boost', label: 'Search Boost', description: 'Increase visibility in search results' },
    { value: 'promoted_quotes', label: 'Promoted Quotes', description: 'Highlight your quotes to customers' },
    { value: 'banner_ad', label: 'Banner Ad', description: 'Display banner ads on the platform' }
  ];

  const getStatusBadge = (status: Campaign['status']) => {
    switch (status) {
      case 'active':
        return <Badge className="bg-green-100 text-green-800">Active</Badge>;
      case 'paused':
        return <Badge className="bg-yellow-100 text-yellow-800">Paused</Badge>;
      case 'ended':
        return <Badge className="bg-gray-100 text-gray-800">Ended</Badge>;
      default:
        return <Badge variant="secondary">{status}</Badge>;
    }
  };

  const getCampaignTypeLabel = (type: Campaign['type']) => {
    return campaignTypes.find(ct => ct.value === type)?.label || type;
  };

  const handleCreateCampaign = () => {
    // In real app, this would open a form to create a new campaign
    setShowCreateDialog(true);
  };

  const toggleCampaignStatus = (campaignId: string) => {
    // In real app, this would make an API call
    console.log('Toggling campaign status:', campaignId);
  };

  const totalStats = campaigns.reduce((acc, campaign) => ({
    budget: acc.budget + campaign.budget,
    spent: acc.spent + campaign.spent,
    impressions: acc.impressions + campaign.impressions,
    clicks: acc.clicks + campaign.clicks,
    conversions: acc.conversions + campaign.conversions
  }), { budget: 0, spent: 0, impressions: 0, clicks: 0, conversions: 0 });

  return (
    <Layout>
      <div className="container mx-auto px-4 py-6">
        {/* Header */}
        <div className="mb-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">Advertising Dashboard</h1>
              <p className="text-gray-600">Manage your advertising campaigns and track performance</p>
            </div>
            <Button onClick={handleCreateCampaign}>
              <Plus className="h-4 w-4 mr-2" />
              Create Campaign
            </Button>
          </div>
        </div>

        {/* Overview Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 mb-6">
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <DollarSign className="h-6 w-6 text-green-600" />
                <div>
                  <p className="text-2xl font-bold">${totalStats.spent.toFixed(2)}</p>
                  <p className="text-xs text-gray-600">Total Spent</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <Eye className="h-6 w-6 text-blue-600" />
                <div>
                  <p className="text-2xl font-bold">{totalStats.impressions.toLocaleString()}</p>
                  <p className="text-xs text-gray-600">Impressions</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <Users className="h-6 w-6 text-purple-600" />
                <div>
                  <p className="text-2xl font-bold">{totalStats.clicks.toLocaleString()}</p>
                  <p className="text-xs text-gray-600">Clicks</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <CheckCircle className="h-6 w-6 text-orange-600" />
                <div>
                  <p className="text-2xl font-bold">{totalStats.conversions}</p>
                  <p className="text-xs text-gray-600">Conversions</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <TrendingUp className="h-6 w-6 text-indigo-600" />
                <div>
                  <p className="text-2xl font-bold">{((totalStats.clicks / totalStats.impressions) * 100).toFixed(1)}%</p>
                  <p className="text-xs text-gray-600">Avg CTR</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="campaigns">Campaigns</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
            <TabsTrigger value="settings">Ad Settings</TabsTrigger>
          </TabsList>

          {/* Campaigns Tab */}
          <TabsContent value="campaigns" className="space-y-6">
            <div className="grid gap-6">
              {campaigns.map((campaign) => (
                <Card key={campaign.id}>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div>
                        <CardTitle className="flex items-center gap-2">
                          {campaign.name}
                          {getStatusBadge(campaign.status)}
                        </CardTitle>
                        <CardDescription>
                          {getCampaignTypeLabel(campaign.type)} • {new Date(campaign.startDate).toLocaleDateString()} - {new Date(campaign.endDate).toLocaleDateString()}
                        </CardDescription>
                      </div>
                      <div className="flex gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => toggleCampaignStatus(campaign.id)}
                        >
                          {campaign.status === 'active' ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
                        </Button>
                        <Button variant="outline" size="sm">
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button variant="outline" size="sm">
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                      {/* Budget & Spend */}
                      <div>
                        <h4 className="font-medium text-sm text-gray-600 mb-2">Budget & Spend</h4>
                        <div className="space-y-1">
                          <p className="text-lg font-semibold">${campaign.spent.toFixed(2)} / ${campaign.budget}</p>
                          <div className="w-full bg-gray-200 rounded-full h-2">
                            <div
                              className="bg-blue-600 h-2 rounded-full"
                              style={{ width: `${(campaign.spent / campaign.budget) * 100}%` }}
                            ></div>
                          </div>
                          <p className="text-xs text-gray-600">{((campaign.spent / campaign.budget) * 100).toFixed(1)}% used</p>
                        </div>
                      </div>

                      {/* Performance */}
                      <div>
                        <h4 className="font-medium text-sm text-gray-600 mb-2">Performance</h4>
                        <div className="space-y-1">
                          <p className="text-sm"><span className="font-medium">{campaign.impressions.toLocaleString()}</span> impressions</p>
                          <p className="text-sm"><span className="font-medium">{campaign.clicks.toLocaleString()}</span> clicks</p>
                          <p className="text-sm"><span className="font-medium">{campaign.conversions}</span> conversions</p>
                        </div>
                      </div>

                      {/* Metrics */}
                      <div>
                        <h4 className="font-medium text-sm text-gray-600 mb-2">Key Metrics</h4>
                        <div className="space-y-1">
                          <p className="text-sm">CTR: <span className="font-medium">{campaign.performance.ctr}%</span></p>
                          <p className="text-sm">CPC: <span className="font-medium">${campaign.performance.cpc}</span></p>
                          <p className="text-sm">ROI: <span className="font-medium">{campaign.performance.roi}%</span></p>
                        </div>
                      </div>

                      {/* Targeting */}
                      <div>
                        <h4 className="font-medium text-sm text-gray-600 mb-2">Targeting</h4>
                        <div className="space-y-1">
                          <p className="text-sm">{campaign.targetAudience.location}</p>
                          <p className="text-sm">{campaign.targetAudience.services.slice(0, 2).join(', ')}</p>
                          <p className="text-sm text-gray-600">{campaign.targetAudience.services.length > 2 ? `+${campaign.targetAudience.services.length - 2} more` : ''}</p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Analytics Tab */}
          <TabsContent value="analytics" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Performance Overview</CardTitle>
                  <CardDescription>Campaign performance over time</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-64 flex items-center justify-center bg-gray-50 rounded-lg">
                    <p className="text-gray-500">Performance charts would go here</p>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Top Performing Campaigns</CardTitle>
                  <CardDescription>Based on ROI and conversions</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {campaigns
                      .sort((a, b) => b.performance.roi - a.performance.roi)
                      .slice(0, 3)
                      .map((campaign, index) => (
                        <div key={campaign.id} className="flex items-center justify-between p-3 border rounded-lg">
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center text-sm font-medium">
                              {index + 1}
                            </div>
                            <div>
                              <p className="font-medium">{campaign.name}</p>
                              <p className="text-sm text-gray-600">{getCampaignTypeLabel(campaign.type)}</p>
                            </div>
                          </div>
                          <div className="text-right">
                            <p className="font-medium">{campaign.performance.roi}% ROI</p>
                            <p className="text-sm text-gray-600">{campaign.conversions} conversions</p>
                          </div>
                        </div>
                      ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Settings Tab */}
          <TabsContent value="settings" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Advertising Preferences</CardTitle>
                <CardDescription>Configure your advertising settings and preferences</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <Label>Auto-optimize campaigns</Label>
                      <p className="text-sm text-gray-600">Automatically adjust bids and targeting for better performance</p>
                    </div>
                    <Switch defaultChecked />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <Label>Daily spending limit</Label>
                      <p className="text-sm text-gray-600">Set a maximum daily spend across all campaigns</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <Input type="number" placeholder="50.00" className="w-24" />
                      <span className="text-sm text-gray-600">per day</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <Label>Campaign notifications</Label>
                      <p className="text-sm text-gray-600">Get notified when campaigns need attention</p>
                    </div>
                    <Switch defaultChecked />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <Label>Competitor targeting</Label>
                      <p className="text-sm text-gray-600">Target customers searching for competitor services</p>
                    </div>
                    <Switch />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Billing & Payments</CardTitle>
                <CardDescription>Manage your advertising budget and payment methods</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 border rounded-lg">
                    <div>
                      <p className="font-medium">Primary Payment Method</p>
                      <p className="text-sm text-gray-600">Visa ending in 4242</p>
                    </div>
                    <Button variant="outline">Update</Button>
                  </div>

                  <div className="flex items-center justify-between p-4 border rounded-lg">
                    <div>
                      <p className="font-medium">Billing Address</p>
                      <p className="text-sm text-gray-600">123 Main St, Springfield, IL 62704</p>
                    </div>
                    <Button variant="outline">Update</Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Create Campaign Dialog */}
        <Dialog open={showCreateDialog} onOpenChange={setShowCreateDialog}>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Create New Campaign</DialogTitle>
              <DialogDescription>Launch a new advertising campaign to reach more customers</DialogDescription>
            </DialogHeader>
            <div className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="campaign-name">Campaign Name</Label>
                  <Input id="campaign-name" placeholder="My Campaign" />
                </div>
                <div>
                  <Label htmlFor="campaign-type">Campaign Type</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select type" />
                    </SelectTrigger>
                    <SelectContent>
                      {campaignTypes.map(type => (
                        <SelectItem key={type.value} value={type.value}>
                          {type.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div>
                <Label htmlFor="budget">Daily Budget</Label>
                <Input id="budget" type="number" placeholder="50.00" />
              </div>

              <div>
                <Label htmlFor="target-audience">Target Audience</Label>
                <Textarea
                  id="target-audience"
                  placeholder="Describe your target customers (location, services, vehicle types, etc.)"
                  rows={3}
                />
              </div>

              <div className="flex gap-3 justify-end">
                <Button variant="outline" onClick={() => setShowCreateDialog(false)}>
                  Cancel
                </Button>
                <Button onClick={() => setShowCreateDialog(false)}>
                  Create Campaign
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </Layout>
  );
};

export default AdDashboard;
