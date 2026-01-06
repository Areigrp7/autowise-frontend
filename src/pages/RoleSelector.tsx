import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { User, Wrench, Shield, ArrowRight, CheckCircle } from 'lucide-react';

const RoleSelector = () => {
  const navigate = useNavigate();

  const handleRoleSelect = (role: 'customer' | 'shop') => {
    navigate(`/register/${role}`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="max-w-4xl w-full">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Join AutoWise</h1>
          <p className="text-xl text-gray-600">Choose your account type to get started</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Customer Card */}
          <Card className="relative overflow-hidden hover:shadow-xl transition-shadow duration-300 cursor-pointer group"
                onClick={() => handleRoleSelect('customer')}>
            <div className="absolute top-0 right-0 bg-blue-500 text-white px-3 py-1 rounded-bl-lg text-sm font-medium">
              Most Popular
            </div>

            <CardHeader className="text-center pb-6">
              <div className="mx-auto mb-4 p-4 bg-blue-100 rounded-full w-fit group-hover:bg-blue-200 transition-colors">
                <User className="h-8 w-8 text-blue-600" />
              </div>
              <CardTitle className="text-2xl">Individual Customer</CardTitle>
              <CardDescription className="text-lg">
                For car owners seeking parts and services
              </CardDescription>
            </CardHeader>

            <CardContent className="space-y-4">
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <CheckCircle className="h-5 w-5 text-green-500" />
                  <span>Buy parts and compare prices</span>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle className="h-5 w-5 text-green-500" />
                  <span>Request installation quotes</span>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle className="h-5 w-5 text-green-500" />
                  <span>Track maintenance history</span>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle className="h-5 w-5 text-green-500" />
                  <span>Get personalized recommendations</span>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle className="h-5 w-5 text-green-500" />
                  <span>Manage your vehicle garage</span>
                </div>
              </div>

              <Button className="w-full mt-6 group-hover:bg-blue-600 transition-colors" size="lg">
                Continue as Customer
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </CardContent>
          </Card>

          {/* Shop/Business Card */}
          <Card className="relative overflow-hidden hover:shadow-xl transition-shadow duration-300 cursor-pointer group"
                onClick={() => handleRoleSelect('shop')}>
            <div className="absolute top-0 right-0 bg-green-500 text-white px-3 py-1 rounded-bl-lg text-sm font-medium">
              Business
            </div>

            <CardHeader className="text-center pb-6">
              <div className="mx-auto mb-4 p-4 bg-green-100 rounded-full w-fit group-hover:bg-green-200 transition-colors">
                <Wrench className="h-8 w-8 text-green-600" />
              </div>
              <CardTitle className="text-2xl">Mechanic / Shop</CardTitle>
              <CardDescription className="text-lg">
                For auto repair businesses and mechanics
              </CardDescription>
            </CardHeader>

            <CardContent className="space-y-4">
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <CheckCircle className="h-5 w-5 text-green-500" />
                  <span>Bid on service requests</span>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle className="h-5 w-5 text-green-500" />
                  <span>Advertise your services</span>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle className="h-5 w-5 text-green-500" />
                  <span>Manage your shop profile</span>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle className="h-5 w-5 text-green-500" />
                  <span>Access premium features</span>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle className="h-5 w-5 text-green-500" />
                  <span>Business verification & badges</span>
                </div>
              </div>

              <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 mb-4">
                <div className="flex items-start gap-2">
                  <Shield className="h-5 w-5 text-amber-600 mt-0.5" />
                  <div>
                    <p className="text-sm font-medium text-amber-800">Verification Required</p>
                    <p className="text-xs text-amber-700">Business license and verification needed for shop accounts</p>
                  </div>
                </div>
              </div>

              <Button variant="outline" className="w-full mt-6 border-green-600 text-green-600 hover:bg-green-50" size="lg">
                Continue as Shop
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Footer */}
        <div className="text-center mt-8">
          <p className="text-gray-500">
            Already have an account?{' '}
            <button
              onClick={() => navigate('/login')}
              className="text-blue-600 hover:text-blue-800 font-medium"
            >
              Sign in here
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default RoleSelector;
