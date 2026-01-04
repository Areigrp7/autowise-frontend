import React from 'react';
import Layout from '../components/Layout';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { XCircle, ArrowRight, ShoppingCart } from 'lucide-react';
import { Link } from 'react-router-dom';

const CheckoutCancel = () => {
  return (
    <Layout currentPage="checkout-cancel">
      <div className="container mx-auto px-4 py-8 max-w-2xl">
        <Card className="text-center">
          <CardHeader>
            <div className="mx-auto w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mb-4">
              <XCircle className="w-8 h-8 text-orange-600" />
            </div>
            <CardTitle className="text-2xl text-orange-600">Payment Cancelled</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <p className="text-gray-600">
              Your payment was cancelled. No charges have been made to your account.
            </p>

            <div className="bg-orange-50 p-4 rounded-lg">
              <h3 className="font-semibold mb-2 text-orange-800">Don't worry!</h3>
              <ul className="text-sm text-orange-700 space-y-1 text-left">
                <li>• Your cart items are still saved</li>
                <li>• You can try again at any time</li>
                <li>• Contact support if you need help</li>
              </ul>
            </div>

            <div className="flex gap-4 justify-center">
              <Link to="/cart">
                <Button variant="outline">
                  <ShoppingCart className="mr-2 h-4 w-4" />
                  Back to Cart
                </Button>
              </Link>
              <Link to="/checkout">
                <Button>
                  Try Again
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default CheckoutCancel;
