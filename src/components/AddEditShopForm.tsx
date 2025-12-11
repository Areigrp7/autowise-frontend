import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';
import { CustomSelect } from '@/components/CustomSelect';

interface ShopFormProps {
  shop?: any; // Existing shop data for editing
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (shopData: any) => void;
}

const AddEditShopForm: React.FC<ShopFormProps> = ({ shop, isOpen, onClose, onSubmit }) => {
  const [formData, setFormData] = useState({
    name: '',
    address: { street: '', city: '', state: '', zipCode: '', country: '' },
    phone: '',
    email: '',
    website: '',
    description: '',
    services: [] as string[],
    specialties: [] as string[],
    certifications: [] as string[],
    hours: {},
    // images: [] as string[],
  });

  const serviceOptions = [
    { value: 'Oil Change', label: 'Oil Change' },
    { value: 'Brake Service', label: 'Brake Service' },
    { value: 'Tire Service', label: 'Tire Service' },
    { value: 'Engine Repair', label: 'Engine Repair' },
    { value: 'Transmission', label: 'Transmission' },
    { value: 'AC Service', label: 'AC Service' },
    { value: 'Electrical', label: 'Electrical' },
    { value: 'Diagnostics', label: 'Diagnostics' },
    { value: 'Alignment', label: 'Alignment' }
  ];

  useEffect(() => {
    if (shop) {
      setFormData({
        name: shop.name || '',
        address: shop.address || { street: '', city: '', state: '', zipCode: '', country: '' },
        phone: shop.phone || '',
        email: shop.email || '',
        website: shop.website || '',
        description: shop.description || '',
        services: shop.services || [],
        specialties: shop.specialties || [],
        certifications: shop.certifications || [],
        hours: shop.hours || {},
        // images: shop.images || [],
      });
    } else {
      // Reset form for new shop
      setFormData({
        name: '',
        address: { street: '', city: '', state: '', zipCode: '', country: '' },
        phone: '',
        email: '',
        website: '',
        description: '',
        services: [],
        specialties: [],
        certifications: [],
        hours: {},
        // images: [],
      });
    }
  }, [shop, isOpen]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    if (name.includes('address.')) {
      const addressField = name.split('.')[1];
      setFormData(prev => ({
        ...prev,
        address: { ...prev.address, [addressField]: value }
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  const handleServiceChange = (value: string[]) => {
    setFormData(prev => ({ ...prev, services: value }));
  };

  const handleSpecialtyChange = (value: string) => {
    const newSpecialties = formData.specialties.includes(value)
      ? formData.specialties.filter(s => s !== value)
      : [...formData.specialties, value];
    setFormData(prev => ({ ...prev, specialties: newSpecialties }));
  };

  const handleCertificationChange = (value: string) => {
    const newCertifications = formData.certifications.includes(value)
      ? formData.certifications.filter(c => c !== value)
      : [...formData.certifications, value];
    setFormData(prev => ({ ...prev, certifications: newCertifications }));
  };

  const handleHourChange = (day: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      hours: { ...prev.hours, [day]: value }
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[700px] overflow-y-auto max-h-[90vh] z-[9999]">
        <DialogHeader>
          <DialogTitle>{shop ? 'Edit Shop' : 'Add New Shop'}</DialogTitle>
          <DialogDescription>
            {shop ? 'Edit the details of your shop.' : 'Fill in the details to add a new shop.'}
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">Shop Name</Label>
            <Input id="name" name="name" value={formData.name} onChange={handleChange} className="col-span-3" required />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="street" className="text-right">Street</Label>
            <Input id="street" name="address.street" value={formData.address.street} onChange={handleChange} className="col-span-3" required />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="city" className="text-right">City</Label>
            <Input id="city" name="address.city" value={formData.address.city} onChange={handleChange} className="col-span-3" required />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="state" className="text-right">State</Label>
            <Input id="state" name="address.state" value={formData.address.state} onChange={handleChange} className="col-span-3" required />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="zipCode" className="text-right">Zip Code</Label>
            <Input id="zipCode" name="address.zipCode" value={formData.address.zipCode} onChange={handleChange} className="col-span-3" required />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="country" className="text-right">Country</Label>
            <Input id="country" name="address.country" value={formData.address.country} onChange={handleChange} className="col-span-3" required />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="phone" className="text-right">Phone</Label>
            <Input id="phone" name="phone" value={formData.phone} onChange={handleChange} className="col-span-3" required />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="email" className="text-right">Email</Label>
            <Input id="email" name="email" type="email" value={formData.email} onChange={handleChange} className="col-span-3" />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="website" className="text-right">Website</Label>
            <Input id="website" name="website" value={formData.website} onChange={handleChange} className="col-span-3" />
          </div>
          <div className="grid grid-cols-4 items-start gap-4">
            <Label htmlFor="description" className="text-right">Description</Label>
            <Textarea id="description" name="description" value={formData.description} onChange={handleChange} className="col-span-3" />
          </div>

          {/* Services Selection */}
          <div className="grid grid-cols-4 items-center gap-4">
            <Label className="text-right">Services</Label>
            <div className="col-span-3">
              <CustomSelect
                options={serviceOptions}
                value={formData.services}
                onValueChange={handleServiceChange}
                placeholder="Select Services"
                isMulti={true}
              />
            </div>
          </div>

          {/* Specialties Checkboxes (Example, can be made more dynamic) */}
          <div className="grid grid-cols-4 items-start gap-4">
            <Label className="text-right">Specialties</Label>
            <div className="col-span-3 space-y-2">
              {['Brakes', 'Oil Change', 'Diagnostics', 'Engine Repair', 'Tires', 'Alignment'].map(specialty => (
                <div key={specialty} className="flex items-center space-x-2">
                  <Checkbox
                    id={`specialty-${specialty}`}
                    checked={formData.specialties.includes(specialty)}
                    onCheckedChange={() => handleSpecialtyChange(specialty)}
                  />
                  <label htmlFor={`specialty-${specialty}`} className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                    {specialty}
                  </label>
                </div>
              ))}
            </div>
          </div>

          {/* Certifications Checkboxes */}
          <div className="grid grid-cols-4 items-start gap-4">
            <Label className="text-right">Certifications</Label>
            <div className="col-span-3 space-y-2">
              {['ASE Certified', 'AAA Approved', 'NAPA AutoCare'].map(cert => (
                <div key={cert} className="flex items-center space-x-2">
                  <Checkbox
                    id={`cert-${cert}`}
                    checked={formData.certifications.includes(cert)}
                    onCheckedChange={() => handleCertificationChange(cert)}
                  />
                  <label htmlFor={`cert-${cert}`} className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                    {cert}
                  </label>
                </div>
              ))}
            </div>
          </div>

          {/* Hours of Operation */}
          <div>
            <h4 className="font-medium mb-2">Hours of Operation</h4>
            {['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'].map(day => (
              <div key={day} className="grid grid-cols-4 items-center gap-4 mb-2">
                <Label htmlFor={`hours-${day}`} className="text-right capitalize">{day}</Label>
                <Input
                  id={`hours-${day}`}
                  name={`hours.${day}`}
                  value={formData.hours[day] || ''}
                  onChange={(e) => handleHourChange(day, e.target.value)}
                  placeholder="e.g., 9:00 AM - 5:00 PM"
                  className="col-span-3"
                />
              </div>
            ))}
          </div>

          <DialogFooter>
            <Button type="submit">{shop ? 'Save Changes' : 'Add Shop'}</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AddEditShopForm;
