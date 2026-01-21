import React, { useState } from 'react';
import { Input } from './ui/input';
import { Button } from './ui/button';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { createShop, ShopData } from '@/lib/apiClient';
import { useToast } from '@/hooks/use-toast';
import { MapPin, Phone, Mail, Globe, Clock, Award, Wrench, FileText, Building } from 'lucide-react';

interface CreateShopFormProps {
  onSuccess?: () => void;
}

const CreateShopForm: React.FC<CreateShopFormProps> = ({ onSuccess }) => {
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const [formData, setFormData] = useState<ShopData>({
    name: '',
    address: {
      city: '',
      state: '',
      country: 'United States',
      zip_code: '',
      address_line1: ''
    },
    phone: '',
    email: '',
    website: '',
    services: [],
    specialties: [],
    certifications: [],
    hours: {
      monday: '9:00 AM - 6:00 PM',
      tuesday: '9:00 AM - 6:00 PM',
      wednesday: '9:00 AM - 6:00 PM',
      thursday: '9:00 AM - 6:00 PM',
      friday: '9:00 AM - 6:00 PM',
      saturday: '9:00 AM - 6:00 PM',
      sunday: 'Closed'
    },
    description: '',
    business_type: '',
    years_in_business: undefined,
    business_license: '',
    ein_tax_id: ''
  });

  const handleInputChange = (field: keyof ShopData, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleHoursChange = (day: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      hours: {
        ...prev.hours,
        [day]: value
      }
    }));
  };

  const handleArrayChange = (field: 'services' | 'specialties' | 'certifications', value: string) => {
    const array = value.split('\n').filter(item => item.trim());
    setFormData(prev => ({ ...prev, [field]: array }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.name || !formData.address.address_line1 || !formData.address.city || !formData.address.state || !formData.address.zip_code || !formData.business_type) {
      toast({
        title: "Validation Error",
        description: "Please fill in all required fields (name, street address, city, state, zip code, and business type).",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    try {
      await createShop(formData);

      toast({
        title: "Success",
        description: "Shop created successfully!",
      });

      // Reset form
      setFormData({
        name: '',
        address: {
          city: '',
          state: '',
          country: 'United States',
          zip_code: '',
          address_line1: ''
        },
        phone: '',
        email: '',
        website: '',
        services: [],
        specialties: [],
        certifications: [],
        hours: {
          monday: '9:00 AM - 6:00 PM',
          tuesday: '9:00 AM - 6:00 PM',
          wednesday: '9:00 AM - 6:00 PM',
          thursday: '9:00 AM - 6:00 PM',
          friday: '9:00 AM - 6:00 PM',
          saturday: '9:00 AM - 6:00 PM',
          sunday: 'Closed'
        },
        description: '',
        business_type: '',
        years_in_business: undefined,
        business_license: '',
        ein_tax_id: ''
      });

      onSuccess?.();
    } catch (error: any) {
      console.error('Error creating shop:', error);
      toast({
        title: "Error",
        description: error.message || "Failed to create shop. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="w-full max-w-4xl">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Building className="h-5 w-5" />
          Create New Shop
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Basic Information */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="shop-name">Shop Name *</Label>
              <Input
                id="shop-name"
                value={formData.name}
                onChange={(e) => handleInputChange('name', e.target.value)}
                placeholder="Your Auto Shop LLC"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="business-type">Business Type *</Label>
              <Select
                value={formData.business_type}
                onValueChange={(value) => handleInputChange('business_type', value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select business type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="auto_repair">Auto Repair Shop</SelectItem>
                  <SelectItem value="specialty">Specialty Shop</SelectItem>
                  <SelectItem value="dealership">Dealership Service</SelectItem>
                  <SelectItem value="mobile">Mobile Service</SelectItem>
                  <SelectItem value="tire">Tire Shop</SelectItem>
                  <SelectItem value="body_shop">Body Shop</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Contact Information */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium">Contact Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="address-line1" className="flex items-center gap-2">
                  <MapPin className="h-4 w-4" />
                  Street Address *
                </Label>
                <Input
                  id="address-line1"
                  value={formData.address.address_line1}
                  onChange={(e) => setFormData(prev => ({
                    ...prev,
                    address: { ...prev.address, address_line1: e.target.value }
                  }))}
                  placeholder="123 Main Street"
                  required
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="city">City *</Label>
                  <Input
                    id="city"
                    value={formData.address.city}
                    onChange={(e) => setFormData(prev => ({
                      ...prev,
                      address: { ...prev.address, city: e.target.value }
                    }))}
                    placeholder="Springfield"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="state">State *</Label>
                  <Input
                    id="state"
                    value={formData.address.state}
                    onChange={(e) => setFormData(prev => ({
                      ...prev,
                      address: { ...prev.address, state: e.target.value }
                    }))}
                    placeholder="IL"
                    required
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="zip-code">ZIP Code *</Label>
                  <Input
                    id="zip-code"
                    value={formData.address.zip_code}
                    onChange={(e) => setFormData(prev => ({
                      ...prev,
                      address: { ...prev.address, zip_code: e.target.value }
                    }))}
                    placeholder="62704"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="country">Country</Label>
                  <Input
                    id="country"
                    value={formData.address.country}
                    onChange={(e) => setFormData(prev => ({
                      ...prev,
                      address: { ...prev.address, country: e.target.value }
                    }))}
                    placeholder="United States"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone" className="flex items-center gap-2">
                  <Phone className="h-4 w-4" />
                  Phone
                </Label>
                <Input
                  id="phone"
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => handleInputChange('phone', e.target.value)}
                  placeholder="+1 (555) 123-4567"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email" className="flex items-center gap-2">
                  <Mail className="h-4 w-4" />
                  Email
                </Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  placeholder="contact@youshop.com"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="website" className="flex items-center gap-2">
                  <Globe className="h-4 w-4" />
                  Website
                </Label>
                <Input
                  id="website"
                  type="url"
                  value={formData.website}
                  onChange={(e) => handleInputChange('website', e.target.value)}
                  placeholder="https://www.yourshop.com"
                />
              </div>
            </div>
          </div>

          {/* Business Information */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="years-in-business">Years in Business</Label>
              <Input
                id="years-in-business"
                type="number"
                min="0"
                value={formData.years_in_business || ''}
                onChange={(e) => handleInputChange('years_in_business', parseInt(e.target.value) || undefined)}
                placeholder="5"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="business-license">Business License</Label>
              <Input
                id="business-license"
                value={formData.business_license}
                onChange={(e) => handleInputChange('business_license', e.target.value)}
                placeholder="License number"
              />
            </div>
          </div>

          {/* Services & Specialties */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="services" className="flex items-center gap-2">
                <Wrench className="h-4 w-4" />
                Services (one per line)
              </Label>
              <Textarea
                id="services"
                value={formData.services?.join('\n') || ''}
                onChange={(e) => handleArrayChange('services', e.target.value)}
                placeholder="Oil Change&#10;Brake Repair&#10;Tire Rotation"
                rows={4}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="specialties" className="flex items-center gap-2">
                <Award className="h-4 w-4" />
                Specialties (one per line)
              </Label>
              <Textarea
                id="specialties"
                value={formData.specialties?.join('\n') || ''}
                onChange={(e) => handleArrayChange('specialties', e.target.value)}
                placeholder="Foreign Cars&#10;Classic Cars&#10;Diesel Engines"
                rows={4}
              />
            </div>
          </div>

          {/* Certifications & Description */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="certifications" className="flex items-center gap-2">
                <FileText className="h-4 w-4" />
                Certifications (one per line)
              </Label>
              <Textarea
                id="certifications"
                value={formData.certifications?.join('\n') || ''}
                onChange={(e) => handleArrayChange('certifications', e.target.value)}
                placeholder="ASE Certified&#10;AAA Approved&#10;Manufacturer Training"
                rows={4}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="description">Business Description</Label>
              <Textarea
                id="description"
                value={formData.description}
                onChange={(e) => handleInputChange('description', e.target.value)}
                placeholder="Describe your business, experience, and what makes you unique..."
                rows={4}
              />
            </div>
          </div>

          {/* Business Hours */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium flex items-center gap-2">
              <Clock className="h-4 w-4" />
              Business Hours
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {Object.entries(formData.hours || {}).map(([day, hours]) => (
                <div key={day} className="space-y-2">
                  <Label htmlFor={`hours-${day}`} className="capitalize">
                    {day}
                  </Label>
                  <Input
                    id={`hours-${day}`}
                    value={hours}
                    onChange={(e) => handleHoursChange(day, e.target.value)}
                    placeholder="9:00 AM - 6:00 PM"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* EIN/Tax ID */}
          <div className="space-y-2">
            <Label htmlFor="ein-tax-id">EIN/Tax ID</Label>
            <Input
              id="ein-tax-id"
              value={formData.ein_tax_id}
              onChange={(e) => handleInputChange('ein_tax_id', e.target.value)}
              placeholder="XX-XXXXXXX"
            />
          </div>

          {/* Submit Button */}
          <div className="flex justify-end gap-4 pt-4">
            <Button type="button" variant="outline" onClick={() => window.history.back()}>
              Cancel
            </Button>
            <Button type="submit" disabled={isLoading}>
              {isLoading ? 'Creating Shop...' : 'Create Shop'}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

export default CreateShopForm;