import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface AddMaintenanceRecordFormProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onAddMaintenanceRecord?: (record: any) => void; // eslint-disable-line @typescript-eslint/no-explicit-any
  vehicles: { id: string; year: number; make: string; model: string }[];
}

export function AddMaintenanceRecordForm({ open, onOpenChange, onAddMaintenanceRecord, vehicles }: AddMaintenanceRecordFormProps) {
  const [vehicleId, setVehicleId] = useState('');
  const [date, setDate] = useState('');
  const [type, setType] = useState<'service' | 'repair' | 'inspection'>('service');
  const [description, setDescription] = useState('');
  const [mileage, setMileage] = useState('');
  const [cost, setCost] = useState('');
  const [shop, setShop] = useState('');
  const [nextDue, setNextDue] = useState('');
  const [nextMileage, setNextMileage] = useState('');
  const [status, setStatus] = useState<'completed' | 'scheduled' | 'overdue'>('completed');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newRecord = {
      id: String(Math.random()),
      vehicleId,
      date,
      type,
      description,
      mileage: parseInt(mileage),
      cost: parseFloat(cost),
      shop,
      nextDue: nextDue || undefined,
      nextMileage: nextMileage ? parseInt(nextMileage) : undefined,
      status,
    };
    onAddMaintenanceRecord && onAddMaintenanceRecord(newRecord);
    onOpenChange(false);
    // Reset form fields
    setVehicleId('');
    setDate('');
    setType('service');
    setDescription('');
    setMileage('');
    setCost('');
    setShop('');
    setNextDue('');
    setNextMileage('');
    setStatus('completed');
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add New Maintenance Record</DialogTitle>
          <DialogDescription>
            Enter the details of the maintenance record. Click save when you're done.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="vehicleId" className="text-right">
              Vehicle
            </Label>
            <Select value={vehicleId} onValueChange={setVehicleId} required>
              <SelectTrigger className="col-span-3">
                <SelectValue placeholder="Select a vehicle" />
              </SelectTrigger>
              <SelectContent>
                {vehicles.map((v) => (
                  <SelectItem key={v.id} value={v.id}>
                    {v.year} {v.make} {v.model}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="date" className="text-right">
              Date
            </Label>
            <Input
              id="date"
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="col-span-3"
              required
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="type" className="text-right">
              Type
            </Label>
            <Select value={type} onValueChange={setType} required>
              <SelectTrigger className="col-span-3">
                <SelectValue placeholder="Select type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="service">Service</SelectItem>
                <SelectItem value="repair">Repair</SelectItem>
                <SelectItem value="inspection">Inspection</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="description" className="text-right">
              Description
            </Label>
            <Input
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="col-span-3"
              required
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="mileage" className="text-right">
              Mileage
            </Label>
            <Input
              id="mileage"
              type="number"
              value={mileage}
              onChange={(e) => setMileage(e.target.value)}
              className="col-span-3"
              required
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="cost" className="text-right">
              Cost
            </Label>
            <Input
              id="cost"
              type="number"
              step="0.01"
              value={cost}
              onChange={(e) => setCost(e.target.value)}
              className="col-span-3"
              required
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="shop" className="text-right">
              Shop
            </Label>
            <Input
              id="shop"
              value={shop}
              onChange={(e) => setShop(e.target.value)}
              className="col-span-3"
              required
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="nextDue" className="text-right">
              Next Due Date
            </Label>
            <Input
              id="nextDue"
              type="date"
              value={nextDue}
              onChange={(e) => setNextDue(e.target.value)}
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="nextMileage" className="text-right">
              Next Due Mileage
            </Label>
            <Input
              id="nextMileage"
              type="number"
              value={nextMileage}
              onChange={(e) => setNextMileage(e.target.value)}
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="status" className="text-right">
              Status
            </Label>
            <Select value={status} onValueChange={setStatus} required>
              <SelectTrigger className="col-span-3">
                <SelectValue placeholder="Select status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="completed">Completed</SelectItem>
                <SelectItem value="scheduled">Scheduled</SelectItem>
                <SelectItem value="overdue">Overdue</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <DialogFooter>
            <Button type="submit">Save Record</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}