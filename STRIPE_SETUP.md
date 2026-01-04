# Stripe Payment Integration Setup Guide

This guide will help you set up Stripe payment processing for the AutoWise checkout flow using server-side integration.

## 🚀 What Was Implemented

The checkout flow now includes:
- **Server-Side Stripe Integration**: All Stripe operations handled securely on your backend
- **Stripe Checkout Sessions**: Users are redirected to Stripe's hosted checkout page
- **Email Collection**: User email is collected and sent to Stripe
- **Success/Cancel Pages**: Proper redirect handling after payment
- **Secure Redirect Flow**: PCI-compliant payment processing

## 📋 Prerequisites

1. **Stripe Account**: Sign up at [stripe.com](https://stripe.com)
2. **Backend Implementation**: Your server must handle Stripe operations on `localhost:5000`

## ⚙️ Current Implementation

### Frontend Setup
- ✅ Checkout form collects shipping, billing, and email information
- ✅ API calls `POST localhost:5000/api/checkout/create-checkout-session`
- ✅ Redirects to Stripe Checkout on success
- ✅ Success/Cancel pages at `/checkout/success` and `/checkout/cancel`

### API Call Structure

**Request to your server:**
```javascript
POST localhost:5000/api/checkout/create-checkout-session
```

**Request Body:**
```json
{
  "successUrl": "http://localhost:3000/checkout/success",
  "cancelUrl": "http://localhost:3000/checkout/cancel",
  "customerEmail": "user@example.com",
  "amount": 102.98,
  "currency": "usd",
  "items": [
    {
      "name": "Premium Ceramic Brake Pads - Front Set",
      "price": 89.99,
      "quantity": 1,
      "partId": 123
    }
  ],
  "shippingAddress": {
    "name": "John Doe",
    "address": {
      "line1": "123 Main Street",
      "line2": "Apt 4B",
      "city": "Anytown",
      "state": "CA",
      "postal_code": "12345",
      "country": "US"
    }
  }
}
```

**Expected Response:**
```json
{
  "sessionId": "cs_test_a1XNx46Vo59MEYD5bIrXPrs7eHm5CC9hb9xeyAeEqDKVHUpX5lbk0IHbNv",
  "url": "https://checkout.stripe.com/c/pay/cs_test_a1XNx46Vo59MEYD5bIrXPrs7eHm5CC9hb9xeyAeEqDKVHUpX5lbk0IHbNv#fidnandhYHdWcXxpYCc%2FJ2FgY2RwaXEnKSdkdWxOYHwnPyd1blpxYHZxWjA0V2tLSn9HTEpzZF81UGBjSl02cXZKPTxvSFM3VFB1clxRVk5ubEhEPUJtdElAV01kVEYxMjxOTXVyZ0RtMVZCQEtkYnRvPXNiak1xZDZNdk5Sf0BiUUZjNTVscG9%2FVHRWaycpJ2N3amhWYHdzYHcnP3F3cGApJ2dkZm5id2pwa2FGamlqdyc%2FJyZjY2NjY2MnKSdpZHxqcHFRfHVgJz8ndmxrYmlgWmxxYGgnKSdga2RnaWBVaWRmYG1qaWFgd3YnP3F3cGB4JSUl"
}
```

## 🔧 Troubleshooting

### Debug Steps:

1. **Check Browser Console**:
   - Open DevTools (F12)
   - Look for API request logs
   - Check for network errors

2. **Verify Server is Running**:
   - Ensure your backend is running on `localhost:5000`
   - Check server logs for incoming requests

3. **Test API Endpoint**:
   ```bash
   curl -X POST localhost:5000/api/checkout/create-checkout-session \
     -H "Content-Type: application/json" \
     -d '{"successUrl":"http://localhost:3000/checkout/success","cancelUrl":"http://localhost:3000/checkout/cancel","customerEmail":"test@example.com","amount":50,"currency":"usd","items":[{"name":"Test Item","price":50,"quantity":1,"partId":123}],"shippingAddress":{"name":"John Doe","address":{"line1":"123 Main St","city":"Anytown","state":"CA","postal_code":"12345","country":"US"}}}'
   ```

4. **Common Issues**:
   - **CORS errors**: Ensure your server allows requests from `localhost:3000`
   - **Missing fields**: Check all required fields are being sent
   - **Server not running**: Verify backend is accessible
   - **Wrong endpoint**: Ensure the URL matches your server configuration

## 🎯 How It Works

### Checkout Flow:
1. **User fills address information** → Shipping & billing details collected
2. **User clicks "Proceed to Payment"** → Frontend calls your `/checkout/create-checkout-session` endpoint
3. **Server creates Stripe Checkout Session** → Your backend uses Stripe API to create session
4. **User redirected to Stripe Checkout** → Secure payment page hosted by Stripe
5. **User completes payment** → Stripe processes payment securely
6. **User redirected back** → Success/failure URL (you need to handle this)
7. **Order created** → Your backend should create order after successful payment

### Security Features:
- **PCI Compliant**: Stripe handles all card data
- **Server-Side Processing**: Sensitive operations on your backend
- **SSL Required**: All Stripe requests use HTTPS
- **3D Secure**: Automatic SCA (Strong Customer Authentication)

## 🧪 Testing

### Test Card Numbers (for Stripe Checkout):
- **Success**: `4242 4242 4242 4242`
- **Decline**: `4000 0000 0000 0002`

Use any future expiry date and any CVC.

### Test the Integration:

1. Add items to cart
2. Go to checkout page
3. Fill shipping/billing info
4. Click "Proceed to Payment"
5. Should redirect to Stripe Checkout
6. Complete payment with test card
7. Should redirect back to success page

## 🔧 Implementation Notes

### Frontend Changes Made:
- ✅ Removed Stripe Elements from frontend
- ✅ Removed direct Stripe.js integration
- ✅ Updated checkout to use server-side endpoints
- ✅ Simplified payment flow to redirect-based approach

### Backend Requirements:
- ✅ Implement `/checkout/create-checkout-session` endpoint
- ✅ Handle Stripe Checkout Session creation
- ✅ Set up success/cancel URLs for redirects
- ✅ Process webhooks for payment confirmation
- ✅ Create orders after successful payments

## 📚 Additional Resources

- [Stripe Checkout Documentation](https://stripe.com/docs/payments/checkout)
- [Checkout Session API](https://stripe.com/docs/api/checkout/sessions)
- [Testing Guide](https://stripe.com/docs/testing)
- [Webhooks Guide](https://stripe.com/docs/webhooks)

## 🚀 Production Deployment

When ready for production:

1. **Switch to Live Mode** in Stripe Dashboard
2. **Update success/cancel URLs** in your backend
3. **Test thoroughly** with real cards (small amounts)
4. **Enable webhooks** for payment confirmations
5. **Configure domain** in Stripe settings

---

**Your server-side implementation is already in place!** Just make sure your `/checkout/create-checkout-session` endpoint returns the Stripe checkout URL, and the frontend will handle the redirect automatically.
