import React, { useState } from 'react';
import Layout from '../components/Layout';
import { createOrder } from '../lib/apiClient';
import { useCart } from '../context/CartContext';
import { useToast } from '../components/ui/use-toast';
import { Input } from '../components/ui/input';
import { Button } from '../components/ui/button';
import { Textarea } from '../components/ui/textarea';
import { RadioGroup, RadioGroupItem } from '../components/ui/radio-group';
import { Label } from '../components/ui/label';

const Checkout = () => {
  const { cartItems, clearCart } = useCart();
  const { toast } = useToast();

  const [shippingAddress, setShippingAddress] = useState({
    fullName: '',
    addressLine1: '',
    addressLine2: '',
    city: '',
    state: '',
    zipCode: '',
    country: '',
    phone: '',
  });

  const [billingAddress, setBillingAddress] = useState({
    fullName: '',
    addressLine1: '',
    addressLine2: '',
    city: '',
    state: '',
    zipCode: '',
    country: '',
  });

  const [customerNotes, setCustomerNotes] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('credit_card');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (cartItems.length === 0) {
      toast({
        title: 'Cart is Empty',
        description: 'Please add items to your cart before checking out.',
        variant: 'destructive',
      });
      return;
    }

    const orderPayload = {
      items: cartItems.map(item => ({
        // console.log(item);
        id: item.id,
        name: item.name,
        brand: item.brand,
        price: item.price,
        quantity: item.quantity,
        image_url: item.image_url,
      })),
      shippingAddress,
      billingAddress,
      customerNotes,
      paymentMethod,
    };

    console.log('Order Payload:', orderPayload);

    try {
      const response = await createOrder(orderPayload);
      toast({
        title: 'Order Placed Successfully',
        description: `Order number: ${response.order.order_number}`,
      });
      clearCart();
      // Optionally redirect to an order confirmation page
    } catch (error: any) {
      toast({
        title: 'Order Placement Failed',
        description: error.message || 'An unexpected error occurred.',
        variant: 'destructive',
      });
    }
  };

  return (
    <Layout currentPage="checkout">
      <div className="container mx-auto px-4 py-6">
        <h1 className="text-3xl font-bold text-gray-900 mb-6">Checkout</h1>
        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Shipping Address */}
          <div>
            <h2 className="text-2xl font-semibold mb-4">Shipping Information</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input
                placeholder="Full Name"
                value={shippingAddress.fullName}
                onChange={(e) => setShippingAddress({ ...shippingAddress, fullName: e.target.value })}
                required
              />
              <Input
                placeholder="Address Line 1"
                value={shippingAddress.addressLine1}
                onChange={(e) => setShippingAddress({ ...shippingAddress, addressLine1: e.target.value })}
                required
              />
              <Input
                placeholder="Address Line 2 (Optional)"
                value={shippingAddress.addressLine2}
                onChange={(e) => setShippingAddress({ ...shippingAddress, addressLine2: e.target.value })}
              />
              <Input
                placeholder="City"
                value={shippingAddress.city}
                onChange={(e) => setShippingAddress({ ...shippingAddress, city: e.target.value })}
                required
              />
              <Input
                placeholder="State"
                value={shippingAddress.state}
                onChange={(e) => setShippingAddress({ ...shippingAddress, state: e.target.value })}
                required
              />
              <Input
                placeholder="Zip Code"
                value={shippingAddress.zipCode}
                onChange={(e) => setShippingAddress({ ...shippingAddress, zipCode: e.target.value })}
                required
              />
              <Input
                placeholder="Country"
                value={shippingAddress.country}
                onChange={(e) => setShippingAddress({ ...shippingAddress, country: e.target.value })}
                required
              />
              <Input
                placeholder="Phone"
                value={shippingAddress.phone}
                onChange={(e) => setShippingAddress({ ...shippingAddress, phone: e.target.value })}
                required
              />
            </div>
          </div>

          {/* Billing Address */}
          <div>
            <h2 className="text-2xl font-semibold mb-4">Billing Information</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input
                placeholder="Full Name"
                value={billingAddress.fullName}
                onChange={(e) => setBillingAddress({ ...billingAddress, fullName: e.target.value })}
                required
              />
              <Input
                placeholder="Address Line 1"
                value={billingAddress.addressLine1}
                onChange={(e) => setBillingAddress({ ...billingAddress, addressLine1: e.target.value })}
                required
              />
              <Input
                placeholder="Address Line 2 (Optional)"
                value={billingAddress.addressLine2}
                onChange={(e) => setBillingAddress({ ...billingAddress, addressLine2: e.target.value })}
              />
              <Input
                placeholder="City"
                value={billingAddress.city}
                onChange={(e) => setBillingAddress({ ...billingAddress, city: e.target.value })}
                required
              />
              <Input
                placeholder="State"
                value={billingAddress.state}
                onChange={(e) => setBillingAddress({ ...billingAddress, state: e.target.value })}
                required
              />
              <Input
                placeholder="Zip Code"
                value={billingAddress.zipCode}
                onChange={(e) => setBillingAddress({ ...billingAddress, zipCode: e.target.value })}
                required
              />
              <Input
                placeholder="Country"
                value={billingAddress.country}
                onChange={(e) => setBillingAddress({ ...billingAddress, country: e.target.value })}
                required
              />
            </div>
          </div>

          {/* Customer Notes */}
          <div>
            <h2 className="text-2xl font-semibold mb-4">Additional Notes</h2>
            <Textarea
              placeholder="Notes about your order (e.g., delivery instructions)"
              value={customerNotes}
              onChange={(e) => setCustomerNotes(e.target.value)}
              rows={4}
            />
          </div>

          {/* Payment Method */}
          <div>
            <h2 className="text-2xl font-semibold mb-4">Payment Method</h2>
            <RadioGroup defaultValue="credit_card" onValueChange={setPaymentMethod}>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="credit_card" id="credit_card" />
                <Label htmlFor="credit_card">Credit Card</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="paypal" id="paypal" />
                <Label htmlFor="paypal">PayPal</Label>
              </div>
            </RadioGroup>
          </div>

          <Button type="submit" className="w-full">Place Order</Button>
        </form>
      </div>
    </Layout>
  );
};

export default Checkout;
