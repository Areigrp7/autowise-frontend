import React, { useState } from 'react';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { createCheckoutSession } from '../lib/apiClient';

const StripeDebug = () => {
  const [testEmail, setTestEmail] = useState('test@example.com');
  const [result, setResult] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const testApiCall = async () => {
    setLoading(true);
    setError(null);
    setResult(null);

    try {
      const testData = {
        successUrl: `${window.location.origin}/checkout/success`,
        cancelUrl: `${window.location.origin}/checkout/cancel`,
        customerEmail: testEmail,
        amount: 50.00,
        currency: "usd",
        items: [
          {
            name: "Test Brake Pads",
            price: 45.99,
            quantity: 1,
            partId: 123
          }
        ],
        shippingAddress: {
          name: "John Doe",
          address: {
            line1: "123 Main Street",
            line2: "Apt 4B",
            city: "Anytown",
            state: "CA",
            postal_code: "12345",
            country: "US"
          }
        }
      };

      console.log('Sending test data:', testData);

      const response = await createCheckoutSession(testData);
      setResult(response);

      console.log('API Response:', response);

    } catch (err: any) {
      console.error('API Error:', err);
      setError(err.message || 'Unknown error occurred');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle>Stripe API Debug Tool</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <Label htmlFor="test-email">Test Email</Label>
          <Input
            id="test-email"
            type="email"
            value={testEmail}
            onChange={(e) => setTestEmail(e.target.value)}
            placeholder="test@example.com"
          />
        </div>

        <Button onClick={testApiCall} disabled={loading}>
          {loading ? 'Testing...' : 'Test Stripe API Call'}
        </Button>

        {error && (
          <div className="p-4 bg-red-50 border border-red-200 rounded">
            <h3 className="font-semibold text-red-800">Error:</h3>
            <p className="text-red-700">{error}</p>
          </div>
        )}

        {result && (
          <div className="p-4 bg-green-50 border border-green-200 rounded">
            <h3 className="font-semibold text-green-800">Success Response:</h3>
            <pre className="text-green-700 text-sm mt-2 overflow-auto">
              {JSON.stringify(result, null, 2)}
            </pre>
            {result.url && (
              <div className="mt-4">
                <Button
                  onClick={() => window.location.href = result.url}
                  className="bg-green-600 hover:bg-green-700"
                >
                  Open Stripe Checkout
                </Button>
              </div>
            )}
          </div>
        )}

        <div className="text-sm text-gray-600">
          <p><strong>Expected endpoint:</strong> POST localhost:5000/api/checkout/create-checkout-session</p>
          <p><strong>Check browser console for detailed logs</strong></p>
        </div>
      </CardContent>
    </Card>
  );
};

export default StripeDebug;
