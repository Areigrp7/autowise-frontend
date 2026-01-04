import React from 'react';
import Layout from '../components/Layout';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { CheckCircle, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const CheckoutSuccess = () => {
  return (
    <Layout currentPage="checkout-success">
      <div className="container mx-auto px-4 py-8 max-w-2xl">
        <Card className="text-center">
          <CardHeader>
            <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
              <CheckCircle className="w-8 h-8 text-green-600" />
            </div>
            <CardTitle className="text-2xl text-green-600">Payment Successful!</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <p className="text-gray-600">
              Thank you for your purchase! Your order has been confirmed and you will receive an email confirmation shortly.
            </p>

            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="font-semibold mb-2">What's Next?</h3>
              <ul className="text-sm text-gray-600 space-y-1 text-left">
                <li>• You'll receive an order confirmation email</li>
                <li>• Your parts will be shipped within 1-2 business days</li>
                <li>• Track your order status in your account</li>
                <li>• Contact support if you have any questions</li>
              </ul>
            </div>

            <div className="flex gap-4 justify-center">
              <Link to="/">
                <Button variant="outline">
                  Continue Shopping
                </Button>
              </Link>
              <Link to="/dashboard">
                <Button>
                  View My Orders
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

export default CheckoutSuccess;
