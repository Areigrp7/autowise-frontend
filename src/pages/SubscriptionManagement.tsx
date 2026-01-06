import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import Layout from '@/components/Layout';
import {
  CreditCard,
  CheckCircle,
  Star,
  TrendingUp,
  Shield,
  Zap,
  Crown,
  Calendar,
  DollarSign,
  Download,
  AlertTriangle,
  RefreshCw
} from 'lucide-react';

interface Plan {
  id: string;
  name: string;
  price: number;
  interval: 'month' | 'year';
  description: string;
  features: string[];
  popular?: boolean;
  icon: React.ReactNode;
  color: string;
}

const SubscriptionManagement = () => {
  const [activeTab, setActiveTab] = useState('current');
  const [showUpgradeDialog, setShowUpgradeDialog] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null);

  // Current subscription data
  const currentSubscription = {
    planId: 'professional',
    status: 'active',
    currentPeriodStart: '2024-01-01',
    currentPeriodEnd: '2024-02-01',
    nextBillingDate: '2024-02-01',
    paymentMethod: {
      type: 'card',
      last4: '4242',
      brand: 'Visa'
    },
    usage: {
      quotesResponded: 145,
      quoteLimit: 200,
      storageUsed: 2.3,
      storageLimit: 5
    }
  };

  // Available plans
  const plans: Plan[] = [
    {
      id: 'starter',
      name: 'Starter',
      price: 29,
      interval: 'month',
      description: 'Perfect for small shops just getting started',
      icon: <Star className="h-6 w-6" />,
      color: 'blue',
      features: [
        'Basic shop profile',
        'Up to 50 quote responses/month',
        'Customer reviews',
        'Basic analytics',
        'Email support'
      ]
    },
    {
      id: 'professional',
      name: 'Professional',
      price: 49,
      interval: 'month',
      description: 'Most popular choice for growing repair shops',
      icon: <TrendingUp className="h-6 w-6" />,
      color: 'green',
      popular: true,
      features: [
        'Everything in Starter',
        'Up to 200 quote responses/month',
        'Priority placement in search',
        'Advanced analytics',
        'Photo uploads (5GB storage)',
        'Custom branding',
        'Phone support'
      ]
    },
    {
      id: 'premium',
      name: 'Premium',
      price: 99,
      interval: 'month',
      description: 'For established shops with high volume',
      icon: <Crown className="h-6 w-6" />,
      color: 'purple',
      features: [
        'Everything in Professional',
        'Unlimited quote responses',
        'Top placement in search results',
        'Advanced marketing tools',
        'Unlimited photo storage',
        'White-label options',
        'Dedicated account manager',
        'API access'
      ]
    },
    {
      id: 'enterprise',
      name: 'Enterprise',
      price: 199,
      interval: 'month',
      description: 'Custom solutions for large repair chains',
      icon: <Shield className="h-6 w-6" />,
      color: 'gold',
      features: [
        'Everything in Premium',
        'Multi-location support',
        'Custom integrations',
        'Advanced reporting',
        'SLA guarantees',
        'Custom development',
        'On-site training'
      ]
    }
  ];

  const handleUpgrade = (planId: string) => {
    setSelectedPlan(planId);
    setShowUpgradeDialog(true);
  };

  const confirmUpgrade = () => {
    // In real app, this would make an API call
    console.log('Upgrading to plan:', selectedPlan);
    setShowUpgradeDialog(false);
    setSelectedPlan(null);
  };

  const getCurrentPlan = () => plans.find(plan => plan.id === currentSubscription.planId);

  const getUsagePercentage = (used: number, limit: number) => (used / limit) * 100;

  return (
    <Layout>
      <div className="container mx-auto px-4 py-6">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Subscription Management</h1>
          <p className="text-gray-600">Manage your subscription plan, billing, and usage</p>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="current">Current Plan</TabsTrigger>
            <TabsTrigger value="plans">Available Plans</TabsTrigger>
            <TabsTrigger value="billing">Billing History</TabsTrigger>
            <TabsTrigger value="usage">Usage & Limits</TabsTrigger>
          </TabsList>

          {/* Current Plan Tab */}
          <TabsContent value="current" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Current Plan Card */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <CreditCard className="h-5 w-5" />
                    Current Subscription
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {getCurrentPlan() && (
                    <div className="flex items-center gap-4 p-4 border rounded-lg">
                      <div className={`p-3 rounded-full bg-${getCurrentPlan()?.color}-100`}>
                        {getCurrentPlan()?.icon}
                      </div>
                      <div>
                        <h3 className="font-semibold text-lg">{getCurrentPlan()?.name} Plan</h3>
                        <p className="text-2xl font-bold">${getCurrentPlan()?.price}<span className="text-sm font-normal">/{getCurrentPlan()?.interval}</span></p>
                        <Badge className="mt-1 bg-green-100 text-green-800 capitalize">{currentSubscription.status}</Badge>
                      </div>
                    </div>
                  )}

                  <div className="space-y-3">
                    <div className="flex justify-between text-sm">
                      <span>Current Period</span>
                      <span>{new Date(currentSubscription.currentPeriodStart).toLocaleDateString()} - {new Date(currentSubscription.currentPeriodEnd).toLocaleDateString()}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Next Billing Date</span>
                      <span>{new Date(currentSubscription.nextBillingDate).toLocaleDateString()}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Payment Method</span>
                      <span>{currentSubscription.paymentMethod.brand} ****{currentSubscription.paymentMethod.last4}</span>
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <Button variant="outline" onClick={() => setActiveTab('plans')}>
                      View All Plans
                    </Button>
                    <Button variant="outline">
                      Update Payment Method
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* Quick Actions */}
              <Card>
                <CardHeader>
                  <CardTitle>Quick Actions</CardTitle>
                  <CardDescription>Common subscription tasks</CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Button className="w-full justify-start" variant="outline">
                    <Download className="h-4 w-4 mr-2" />
                    Download Invoices
                  </Button>
                  <Button className="w-full justify-start" variant="outline">
                    <RefreshCw className="h-4 w-4 mr-2" />
                    Update Billing Address
                  </Button>
                  <Button className="w-full justify-start" variant="outline">
                    <Calendar className="h-4 w-4 mr-2" />
                    View Billing Schedule
                  </Button>
                  <Button className="w-full justify-start text-red-600 border-red-200 hover:bg-red-50" variant="outline">
                    <AlertTriangle className="h-4 w-4 mr-2" />
                    Cancel Subscription
                  </Button>
                </CardContent>
              </Card>
            </div>

            {/* Plan Features */}
            {getCurrentPlan() && (
              <Card>
                <CardHeader>
                  <CardTitle>{getCurrentPlan()?.name} Plan Features</CardTitle>
                  <CardDescription>Included in your current subscription</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {getCurrentPlan()?.features.map((feature, index) => (
                      <div key={index} className="flex items-center gap-2">
                        <CheckCircle className="h-4 w-4 text-green-500" />
                        <span>{feature}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          {/* Available Plans Tab */}
          <TabsContent value="plans" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {plans.map((plan) => (
                <Card key={plan.id} className={`relative ${plan.popular ? 'border-blue-500 shadow-lg' : ''}`}>
                  {plan.popular && (
                    <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                      <Badge className="bg-blue-500 text-white">Most Popular</Badge>
                    </div>
                  )}

                  <CardHeader className="text-center">
                    <div className={`mx-auto mb-3 p-3 rounded-full bg-${plan.color}-100 w-fit`}>
                      {plan.icon}
                    </div>
                    <CardTitle>{plan.name}</CardTitle>
                    <div className="text-3xl font-bold">
                      ${plan.price}
                      <span className="text-sm font-normal text-gray-600">/{plan.interval}</span>
                    </div>
                    <CardDescription>{plan.description}</CardDescription>
                  </CardHeader>

                  <CardContent>
                    <div className="space-y-3 mb-6">
                      {plan.features.map((feature, index) => (
                        <div key={index} className="flex items-center gap-2 text-sm">
                          <CheckCircle className="h-4 w-4 text-green-500 flex-shrink-0" />
                          <span>{feature}</span>
                        </div>
                      ))}
                    </div>

                    {plan.id === currentSubscription.planId ? (
                      <Button className="w-full" disabled>
                        Current Plan
                      </Button>
                    ) : (
                      <Button
                        className="w-full"
                        variant={plan.popular ? "default" : "outline"}
                        onClick={() => handleUpgrade(plan.id)}
                      >
                        {plan.id > currentSubscription.planId ? 'Upgrade' : 'Downgrade'}
                      </Button>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Billing History Tab */}
          <TabsContent value="billing" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Billing History</CardTitle>
                <CardDescription>View and download your past invoices</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {/* Mock billing history */}
                  {[
                    { date: '2024-01-01', amount: 49.99, status: 'paid', invoice: 'INV-001' },
                    { date: '2023-12-01', amount: 49.99, status: 'paid', invoice: 'INV-002' },
                    { date: '2023-11-01', amount: 49.99, status: 'paid', invoice: 'INV-003' }
                  ].map((invoice, index) => (
                    <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                      <div>
                        <p className="font-medium">{invoice.invoice}</p>
                        <p className="text-sm text-gray-600">{new Date(invoice.date).toLocaleDateString()}</p>
                      </div>
                      <div className="flex items-center gap-4">
                        <span className="font-medium">${invoice.amount}</span>
                        <Badge className="bg-green-100 text-green-800">{invoice.status}</Badge>
                        <Button variant="outline" size="sm">
                          <Download className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Usage & Limits Tab */}
          <TabsContent value="usage" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Quote Responses */}
              <Card>
                <CardHeader>
                  <CardTitle>Quote Responses</CardTitle>
                  <CardDescription>Monthly usage and limits</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between text-sm">
                      <span>Used this month</span>
                      <span>{currentSubscription.usage.quotesResponded} / {currentSubscription.usage.quoteLimit}</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-blue-600 h-2 rounded-full"
                        style={{ width: `${getUsagePercentage(currentSubscription.usage.quotesResponded, currentSubscription.usage.quoteLimit)}%` }}
                      ></div>
                    </div>
                    <p className="text-xs text-gray-600">
                      {currentSubscription.usage.quoteLimit - currentSubscription.usage.quotesResponded} responses remaining
                    </p>
                  </div>
                </CardContent>
              </Card>

              {/* Storage Usage */}
              <Card>
                <CardHeader>
                  <CardTitle>Storage Usage</CardTitle>
                  <CardDescription>Photo and document storage</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between text-sm">
                      <span>Used</span>
                      <span>{currentSubscription.usage.storageUsed}GB / {currentSubscription.usage.storageLimit}GB</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-green-600 h-2 rounded-full"
                        style={{ width: `${getUsagePercentage(currentSubscription.usage.storageUsed, currentSubscription.usage.storageLimit)}%` }}
                      ></div>
                    </div>
                    <p className="text-xs text-gray-600">
                      {(currentSubscription.usage.storageLimit - currentSubscription.usage.storageUsed).toFixed(1)}GB remaining
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Usage Alerts</CardTitle>
                <CardDescription>Get notified when approaching limits</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <Label>Quote Response Alerts</Label>
                      <p className="text-sm text-gray-600">Notify when 80% of monthly limit is reached</p>
                    </div>
                    <input type="checkbox" defaultChecked className="rounded" />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <Label>Storage Alerts</Label>
                      <p className="text-sm text-gray-600">Notify when 90% of storage limit is reached</p>
                    </div>
                    <input type="checkbox" defaultChecked className="rounded" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Upgrade Confirmation Dialog */}
        <Dialog open={showUpgradeDialog} onOpenChange={setShowUpgradeDialog}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Confirm Plan Change</DialogTitle>
              <DialogDescription>
                Are you sure you want to change your subscription plan? This change will be effective immediately.
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              {selectedPlan && (
                <div className="p-4 border rounded-lg">
                  <h4 className="font-medium">New Plan: {plans.find(p => p.id === selectedPlan)?.name}</h4>
                  <p className="text-sm text-gray-600">
                    ${plans.find(p => p.id === selectedPlan)?.price}/month
                  </p>
                </div>
              )}
              <div className="flex gap-3 justify-end">
                <Button variant="outline" onClick={() => setShowUpgradeDialog(false)}>
                  Cancel
                </Button>
                <Button onClick={confirmUpgrade}>
                  Confirm Change
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </Layout>
  );
};

export default SubscriptionManagement;
