import React, { useState } from 'react';
import { Input } from '../components/ui/input';
import { Button } from '../components/ui/button';
import { Label } from '../components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Textarea } from '../components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';
import { registerUser } from '../lib/auth';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Wrench, Mail, Phone, Lock, Building, MapPin, FileText, Upload } from 'lucide-react';

const ShopRegister = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    businessName: '',
    ownerFirstName: '',
    ownerLastName: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    businessType: '',
    yearsInBusiness: '',
    licenseNumber: '',
    ein: '',
    description: ''
  });
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      alert('Passwords do not match');
      return;
    }

    setIsLoading(true);
    try {
      const userData = {
        email: formData.email,
        password: formData.password,
        firstName: formData.ownerFirstName,
        lastName: formData.ownerLastName,
        phone: formData.phone,
        role: 'shop',
        businessName: formData.businessName,
        businessAddress: {
          street: formData.address,
          city: formData.city,
          state: formData.state,
          zipCode: formData.zipCode
        },
        businessDetails: {
          type: formData.businessType,
          yearsInBusiness: parseInt(formData.yearsInBusiness),
          licenseNumber: formData.licenseNumber,
          ein: formData.ein,
          description: formData.description
        }
      };
      const response = await registerUser(userData);
      console.log('Shop registration successful:', response);
      navigate('/login');
    } catch (error) {
      console.error('Registration failed:', error);
      alert('Registration failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-100 flex items-center justify-center p-4 py-8">
      <Card className="w-full max-w-2xl">
        <CardHeader className="text-center">
          <button
            onClick={() => navigate('/register')}
            className="flex items-center text-green-600 hover:text-green-800 mb-4 self-start"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back
          </button>
          <div className="mx-auto mb-4 p-3 bg-green-100 rounded-full w-fit">
            <Wrench className="h-6 w-6 text-green-600" />
          </div>
          <CardTitle className="text-2xl font-bold">Register Your Shop</CardTitle>
          <p className="text-gray-600">Join AutoWise to connect with customers and grow your business</p>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Account Information */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-900 border-b pb-2">Account Information</h3>

              <div>
                <Label htmlFor="email" className="flex items-center gap-2">
                  <Mail className="h-4 w-4" />
                  Business Email
                </Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="contact@youshop.com"
                  value={formData.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  required
                  className="mt-1"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="password" className="flex items-center gap-2">
                    <Lock className="h-4 w-4" />
                    Password
                  </Label>
                  <Input
                    id="password"
                    type="password"
                    placeholder="Create password"
                    value={formData.password}
                    onChange={(e) => handleInputChange('password', e.target.value)}
                    required
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label htmlFor="confirmPassword" className="flex items-center gap-2">
                    <Lock className="h-4 w-4" />
                    Confirm Password
                  </Label>
                  <Input
                    id="confirmPassword"
                    type="password"
                    placeholder="Confirm password"
                    value={formData.confirmPassword}
                    onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
                    required
                    className="mt-1"
                  />
                </div>
              </div>
            </div>

            {/* Business Information */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-900 border-b pb-2">Business Information</h3>

              <div>
                <Label htmlFor="businessName" className="flex items-center gap-2">
                  <Building className="h-4 w-4" />
                  Business Name
                </Label>
                <Input
                  id="businessName"
                  type="text"
                  placeholder="Your Auto Shop LLC"
                  value={formData.businessName}
                  onChange={(e) => handleInputChange('businessName', e.target.value)}
                  required
                  className="mt-1"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="ownerFirstName">Owner First Name</Label>
                  <Input
                    id="ownerFirstName"
                    type="text"
                    placeholder="John"
                    value={formData.ownerFirstName}
                    onChange={(e) => handleInputChange('ownerFirstName', e.target.value)}
                    required
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label htmlFor="ownerLastName">Owner Last Name</Label>
                  <Input
                    id="ownerLastName"
                    type="text"
                    placeholder="Smith"
                    value={formData.ownerLastName}
                    onChange={(e) => handleInputChange('ownerLastName', e.target.value)}
                    required
                    className="mt-1"
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="phone" className="flex items-center gap-2">
                  <Phone className="h-4 w-4" />
                  Business Phone
                </Label>
                <Input
                  id="phone"
                  type="tel"
                  placeholder="+1 (555) 123-4567"
                  value={formData.phone}
                  onChange={(e) => handleInputChange('phone', e.target.value)}
                  required
                  className="mt-1"
                />
              </div>
            </div>

            {/* Business Address */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-900 border-b pb-2 flex items-center gap-2">
                <MapPin className="h-4 w-4" />
                Business Address
              </h3>

              <div>
                <Label htmlFor="address">Street Address</Label>
                <Input
                  id="address"
                  type="text"
                  placeholder="123 Main Street"
                  value={formData.address}
                  onChange={(e) => handleInputChange('address', e.target.value)}
                  required
                  className="mt-1"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="city">City</Label>
                  <Input
                    id="city"
                    type="text"
                    placeholder="Springfield"
                    value={formData.city}
                    onChange={(e) => handleInputChange('city', e.target.value)}
                    required
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label htmlFor="state">State</Label>
                  <Input
                    id="state"
                    type="text"
                    placeholder="IL"
                    value={formData.state}
                    onChange={(e) => handleInputChange('state', e.target.value)}
                    required
                    className="mt-1"
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="zipCode">ZIP Code</Label>
                <Input
                  id="zipCode"
                  type="text"
                  placeholder="62704"
                  value={formData.zipCode}
                  onChange={(e) => handleInputChange('zipCode', e.target.value)}
                  required
                  className="mt-1"
                />
              </div>
            </div>

            {/* Business Details */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-900 border-b pb-2 flex items-center gap-2">
                <FileText className="h-4 w-4" />
                Business Details
              </h3>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="businessType">Business Type</Label>
                  <Select value={formData.businessType} onValueChange={(value) => handleInputChange('businessType', value)}>
                    <SelectTrigger className="mt-1">
                      <SelectValue placeholder="Select type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="independent">Independent Shop</SelectItem>
                      <SelectItem value="chain">Chain/Franchise</SelectItem>
                      <SelectItem value="mobile">Mobile Service</SelectItem>
                      <SelectItem value="specialty">Specialty Shop</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="yearsInBusiness">Years in Business</Label>
                  <Select value={formData.yearsInBusiness} onValueChange={(value) => handleInputChange('yearsInBusiness', value)}>
                    <SelectTrigger className="mt-1">
                      <SelectValue placeholder="Select years" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="0">Less than 1 year</SelectItem>
                      <SelectItem value="1">1-2 years</SelectItem>
                      <SelectItem value="3">3-5 years</SelectItem>
                      <SelectItem value="6">6-10 years</SelectItem>
                      <SelectItem value="11">10+ years</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="licenseNumber">Business License #</Label>
                  <Input
                    id="licenseNumber"
                    type="text"
                    placeholder="License number"
                    value={formData.licenseNumber}
                    onChange={(e) => handleInputChange('licenseNumber', e.target.value)}
                    required
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label htmlFor="ein">EIN/Tax ID</Label>
                  <Input
                    id="ein"
                    type="text"
                    placeholder="XX-XXXXXXX"
                    value={formData.ein}
                    onChange={(e) => handleInputChange('ein', e.target.value)}
                    required
                    className="mt-1"
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="description">Business Description</Label>
                <Textarea
                  id="description"
                  placeholder="Tell customers about your services, specialties, and what makes your shop unique..."
                  value={formData.description}
                  onChange={(e) => handleInputChange('description', e.target.value)}
                  className="mt-1"
                  rows={3}
                />
              </div>
            </div>

            {/* Verification Notice */}
            <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
              <div className="flex items-start gap-2">
                <Upload className="h-5 w-5 text-amber-600 mt-0.5" />
                <div>
                  <p className="text-sm font-medium text-amber-800">Verification Required</p>
                  <p className="text-xs text-amber-700">
                    After registration, you'll need to upload your business license and other verification documents to activate your shop account.
                  </p>
                </div>
              </div>
            </div>

            <Button type="submit" className="w-full mt-6 bg-green-600 hover:bg-green-700" disabled={isLoading}>
              {isLoading ? 'Creating Shop Account...' : 'Create Shop Account'}
            </Button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-gray-600">
              Already have an account?{' '}
              <button
                onClick={() => navigate('/login')}
                className="text-green-600 hover:text-green-800 font-medium"
              >
                Sign in
              </button>
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ShopRegister;
