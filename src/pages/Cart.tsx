import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import Layout from '@/components/Layout';
import {
  ShoppingCart,
  Trash2,
  Plus,
  Minus,
  CreditCard,
  Shield,
  Truck,
  Clock,
  MapPin,
  Calendar,
  CheckCircle,
  AlertTriangle,
  Gift,
  Percent
} from 'lucide-react';
import { useCart } from '../context/CartContext'; // Import useCart
import { useNavigate } from 'react-router-dom'; // Import useNavigate

interface CartItem {
  id: string;
  type: 'part' | 'labor';
  name: string;
  brand?: string;
  price: number;
  originalPrice?: number;
  quantity: number;
  seller?: string;
  shopName?: string;
  image?: string;
  warranty?: string;
  shipping?: string;
  estimatedTime?: string;
  scheduledDate?: string;
}

interface CartItemDisplay extends Omit<CartItem, 'quantity'> {
  quantity: number;
  brand?: string;
  originalPrice?: number;
  seller?: string;
  shopName?: string;
  warranty?: string;
  shipping?: string;
  estimatedTime?: string;
  scheduledDate?: string;
}

export default function CartPage() {
  const { cartItems, removeFromCart, updateCartItemQuantity, getCartTotalQuantity } = useCart(); // Use the cart hook
  const navigate = useNavigate(); // Initialize useNavigate

  const [promoCode, setPromoCode] = useState('');
  const [appliedPromo, setAppliedPromo] = useState<{ code: string; discount: number } | null>(null);

  const updateQuantity = (id: string, newQuantity: number) => {
    updateCartItemQuantity(id, newQuantity);
  };

  const removeItem = (id: string) => {
    removeFromCart(id);
  };

  const applyPromoCode = () => {
    const validCodes = {
      'SAVE10': 10,
      'FIRST20': 20,
      'WELCOME15': 15
    };

    if (validCodes[promoCode as keyof typeof validCodes]) {
      setAppliedPromo({
        code: promoCode,
        discount: validCodes[promoCode as keyof typeof validCodes]
      });
      setPromoCode('');
    } else {
      alert('Invalid promo code');
    }
  };

  const removePromoCode = () => {
    setAppliedPromo(null);
  };

  // Calculate totals
  const partsSubtotal = cartItems
    .filter(item => item.type === 'part')
    .reduce((sum, item) => sum + (item.price * item.quantity), 0);

  const laborSubtotal = cartItems
    .filter(item => item.type === 'labor')
    .reduce((sum, item) => sum + (item.price * item.quantity), 0);

  const subtotal = partsSubtotal + laborSubtotal;
  const shipping = partsSubtotal > 75 ? 0 : 9.99; // Free shipping over $75
  const tax = subtotal * 0.08; // 8% tax
  const promoDiscount = appliedPromo ? (subtotal * appliedPromo.discount / 100) : 0;
  const total = subtotal + shipping + tax - promoDiscount;

  const partsSavings = cartItems
    .filter(item => item.type === 'part' && item.originalPrice)
    .reduce((sum, item) => sum + ((item.originalPrice! - item.price) * item.quantity), 0);

  return (
    <Layout currentPage="cart">
      <div className="container mx-auto px-4 py-6">
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Shopping Cart</h1>
          <p className="text-gray-600">{getCartTotalQuantity()} items in your cart</p>
        </div>

        {cartItems.length === 0 ? (
          <Card>
            <CardContent className="flex flex-col items-center justify-center py-12">
              <ShoppingCart className="h-16 w-16 text-gray-400 mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Your cart is empty</h3>
              <p className="text-gray-600 mb-6">Add some parts or book a service to get started</p>
              <Button>Continue Shopping</Button>
            </CardContent>
          </Card>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2 space-y-4">
              {/* Parts Section */}
              {cartItems.filter(item => item.type === 'part').length > 0 && (
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <ShoppingCart className="h-5 w-5" />
                      Parts ({cartItems.filter(item => item.type === 'part').length})
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {cartItems.filter(item => item.type === 'part').map(item => (
                      <div key={item.id} className="flex items-center gap-4 p-4 border rounded-lg">
                        <div className="w-20 h-20 bg-gray-100 rounded-lg flex items-center justify-center">
                          {item.image ? (
                            <img src={item.image} alt={item.name} className="w-full h-full object-cover rounded-lg" />
                          ) : (
                            <ShoppingCart className="h-8 w-8 text-gray-400" />
                          )}
                        </div>

                        <div className="flex-1">
                          <h3 className="font-semibold text-lg">{item.name}</h3>
                          <p className="text-gray-600">{item.brand} • Sold by {item.seller}</p>

                          <div className="flex items-center gap-4 mt-2">
                            <div className="flex items-center gap-2">
                              <span className="text-xl font-bold text-green-600">${item.price}</span>
                              {item.originalPrice && (
                                <span className="text-gray-500 line-through">${item.originalPrice}</span>
                              )}
                            </div>

                            <div className="flex items-center text-sm text-gray-600">
                              <Shield className="h-4 w-4 mr-1" />
                              {item.warranty}
                            </div>

                            <div className="flex items-center text-sm text-gray-600">
                              <Truck className="h-4 w-4 mr-1" />
                              {item.shipping}
                            </div>
                          </div>
                        </div>

                        <div className="flex items-center gap-3">
                          <div className="flex items-center border rounded-lg">
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            >
                              <Minus className="h-4 w-4" />
                            </Button>
                            <span className="px-3 py-1 min-w-[40px] text-center">{item.quantity}</span>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            >
                              <Plus className="h-4 w-4" />
                            </Button>
                          </div>

                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => removeItem(item.id)}
                            className="text-red-600 hover:text-red-700"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </CardContent>
                </Card>
              )}

              {/* Labor/Services Section */}
              {cartItems.filter(item => item.type === 'labor').length > 0 && (
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Calendar className="h-5 w-5" />
                      Installation Services ({cartItems.filter(item => item.type === 'labor').length})
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {cartItems.filter(item => item.type === 'labor').map(item => (
                      <div key={item.id} className="flex items-center gap-4 p-4 border rounded-lg">
                        <div className="w-20 h-20 bg-blue-100 rounded-lg flex items-center justify-center">
                          <Calendar className="h-8 w-8 text-blue-600" />
                        </div>

                        <div className="flex-1">
                          <h3 className="font-semibold text-lg">{item.name}</h3>
                          <p className="text-gray-600">by {item.shopName}</p>

                          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-2 text-sm">
                            <div className="flex items-center text-gray-600">
                              <Clock className="h-4 w-4 mr-1" />
                              {item.estimatedTime}
                            </div>
                            <div className="flex items-center text-gray-600">
                              <Shield className="h-4 w-4 mr-1" />
                              {item.warranty}
                            </div>
                            <div className="flex items-center text-green-600">
                              <Calendar className="h-4 w-4 mr-1" />
                              {item.scheduledDate}
                            </div>
                          </div>
                        </div>

                        <div className="flex items-center gap-3">
                          <div className="text-right">
                            <div className="text-xl font-bold text-green-600">${item.price}</div>
                            <div className="text-sm text-gray-600">Labor cost</div>
                          </div>

                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => removeItem(item.id)}
                            className="text-red-600 hover:text-red-700"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </CardContent>
                </Card>
              )}

              {/* Recommendations */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Gift className="h-5 w-5" />
                    Recommended Add-ons
                  </CardTitle>
                  <CardDescription>
                    Complete your service with these commonly needed items
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="flex items-center justify-between p-3 border rounded-lg">
                      <div>
                        <p className="font-medium">Brake Cleaner Spray</p>
                        <p className="text-sm text-gray-600">CRC Brakleen</p>
                        <p className="text-green-600 font-semibold">$8.99</p>
                      </div>
                      <Button size="sm" variant="outline">Add</Button>
                    </div>

                    <div className="flex items-center justify-between p-3 border rounded-lg">
                      <div>
                        <p className="font-medium">Brake Fluid DOT 3</p>
                        <p className="text-sm text-gray-600">Valvoline MaxLife</p>
                        <p className="text-green-600 font-semibold">$12.99</p>
                      </div>
                      <Button size="sm" variant="outline">Add</Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <Card className="sticky top-6">
                <CardHeader>
                  <CardTitle>Order Summary</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {/* Subtotals */}
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span>Parts Subtotal</span>
                      <span>${partsSubtotal.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Labor Subtotal</span>
                      <span>${laborSubtotal.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Shipping</span>
                      <span>{shipping === 0 ? 'FREE' : `$${shipping.toFixed(2)}`}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Tax</span>
                      <span>${tax.toFixed(2)}</span>
                    </div>

                    {appliedPromo && (
                      <div className="flex justify-between text-green-600">
                        <span>Promo ({appliedPromo.code})</span>
                        <span>-${promoDiscount.toFixed(2)}</span>
                      </div>
                    )}
                  </div>

                  <Separator />

                  {/* Total */}
                  <div className="flex justify-between text-lg font-bold">
                    <span>Total</span>
                    <span>${total.toFixed(2)}</span>
                  </div>

                  {/* Savings */}
                  {(partsSavings > 0 || appliedPromo) && (
                    <div className="bg-green-50 p-3 rounded-lg">
                      <div className="flex items-center gap-2 text-green-700">
                        <CheckCircle className="h-4 w-4" />
                        <span className="font-medium">
                          You're saving ${(partsSavings + promoDiscount).toFixed(2)}!
                        </span>
                      </div>
                    </div>
                  )}

                  {/* Promo Code */}
                  <div className="space-y-2">
                    {!appliedPromo ? (
                      <div className="flex gap-2">
                        <Input
                          placeholder="Promo code"
                          value={promoCode}
                          onChange={(e) => setPromoCode(e.target.value.toUpperCase())}
                        />
                        <Button variant="outline" onClick={applyPromoCode}>
                          Apply
                        </Button>
                      </div>
                    ) : (
                      <div className="flex items-center justify-between bg-green-50 p-2 rounded">
                        <span className="text-green-700 font-medium">{appliedPromo.code} applied</span>
                        <Button variant="ghost" size="sm" onClick={removePromoCode}>
                          Remove
                        </Button>
                      </div>
                    )}
                  </div>

                  {/* Shipping Info */}
                  {shipping === 0 ? (
                    <div className="flex items-center gap-2 text-green-600 text-sm">
                      <Truck className="h-4 w-4" />
                      <span>Free shipping on orders over $75</span>
                    </div>
                  ) : (
                    <div className="flex items-center gap-2 text-gray-600 text-sm">
                      <Truck className="h-4 w-4" />
                      <span>Add ${(75 - partsSubtotal).toFixed(2)} more for free shipping</span>
                    </div>
                  )}

                  {/* Checkout Button */}
                  <Button className="w-full" size="lg" onClick={() => navigate('/checkout')}> {/* Add onClick handler */}
                    <CreditCard className="h-5 w-5 mr-2" />
                    Proceed to Checkout
                  </Button>

                  {/* Security Badge */}
                  <div className="flex items-center justify-center gap-2 text-sm text-gray-600">
                    <Shield className="h-4 w-4" />
                    <span>Secure checkout with SSL encryption</span>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
}