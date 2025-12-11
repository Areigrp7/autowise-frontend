# AutoWise API Documentation

## 🌐 Overview

This document outlines the API structure and data models for the AutoWise platform. This serves as a specification for backend development and mobile app integration.

## 🔗 Base URL
```
Production: https://api.autowise.com/v1
Development: https://dev-api.autowise.com/v1
```

## 🔐 Authentication

### JWT Token Authentication
```http
Authorization: Bearer <jwt_token>
```

### Auth Endpoints

#### Register User
```http
POST /auth/register
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "securePassword123",
  "firstName": "John",
  "lastName": "Doe",
  "phone": "+1234567890"
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "user": {
      "id": "user_123",
      "email": "user@example.com",
      "firstName": "John",
      "lastName": "Doe",
      "phone": "+1234567890",
      "createdAt": "2024-01-15T10:00:00Z"
    },
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  }
}
```

#### Login User
```http
POST /auth/login
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "securePassword123"
}
```

#### Refresh Token
```http
POST /auth/refresh
Authorization: Bearer <refresh_token>
```

#### Logout
```http
POST /auth/logout
Authorization: Bearer <jwt_token>
```

## 🚗 Vehicles API

### Get User Vehicles
```http
GET /vehicles
Authorization: Bearer <jwt_token>
```

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "id": "vehicle_123",
      "userId": "user_123",
      "year": 2019,
      "make": "Toyota",
      "model": "Camry",
      "trim": "LE",
      "vin": "4T1B11HK1KU123456",
      "mileage": 45230,
      "color": "Silver",
      "nickname": "Daily Driver",
      "image": "https://cdn.autowise.com/vehicles/vehicle_123.jpg",
      "createdAt": "2024-01-15T10:00:00Z",
      "updatedAt": "2024-01-20T15:30:00Z"
    }
  ]
}
```

### Add Vehicle
```http
POST /vehicles
Authorization: Bearer <jwt_token>
Content-Type: application/json

{
  "year": 2019,
  "make": "Toyota",
  "model": "Camry",
  "trim": "LE",
  "vin": "4T1B11HK1KU123456",
  "mileage": 45230,
  "color": "Silver",
  "nickname": "Daily Driver"
}
```

### Update Vehicle
```http
PUT /vehicles/:vehicleId
Authorization: Bearer <jwt_token>
Content-Type: application/json

{
  "mileage": 46500,
  "nickname": "Updated Nickname"
}
```

### Delete Vehicle
```http
DELETE /vehicles/:vehicleId
Authorization: Bearer <jwt_token>
```

### Vehicle Lookup by VIN
```http
GET /vehicles/lookup/:vin
Authorization: Bearer <jwt_token>
```

**Response:**
```json
{
  "success": true,
  "data": {
    "vin": "4T1B11HK1KU123456",
    "year": 2019,
    "make": "Toyota",
    "model": "Camry",
    "trim": "LE",
    "engine": "2.5L I4",
    "transmission": "CVT",
    "drivetrain": "FWD"
  }
}
```

## 🔧 Parts API

### Search Parts
```http
GET /parts/search
Authorization: Bearer <jwt_token>

Query Parameters:
- q: string (search query)
- make: string (vehicle make)
- model: string (vehicle model)
- year: number (vehicle year)
- category: string (part category)
- minPrice: number
- maxPrice: number
- brand: string
- rating: number (minimum rating)
- page: number (default: 1)
- limit: number (default: 20)
- sortBy: string (price_asc, price_desc, rating, popularity)
```

**Response:**
```json
{
  "success": true,
  "data": {
    "parts": [
      {
        "id": "part_123",
        "name": "Premium Ceramic Brake Pads - Front Set",
        "brand": "Brembo",
        "partNumber": "P28059N",
        "category": "Brakes",
        "subcategory": "Brake Pads",
        "price": 89.99,
        "originalPrice": 129.99,
        "discount": 31,
        "currency": "USD",
        "seller": {
          "id": "seller_123",
          "name": "AutoZone",
          "rating": 4.5,
          "verified": true
        },
        "rating": 4.8,
        "reviewCount": 324,
        "image": "https://cdn.autowise.com/parts/part_123.jpg",
        "images": [
          "https://cdn.autowise.com/parts/part_123_1.jpg",
          "https://cdn.autowise.com/parts/part_123_2.jpg"
        ],
        "warranty": "3 years / 36,000 miles",
        "shipping": {
          "cost": 0,
          "method": "Free 2-day shipping",
          "estimatedDays": 2
        },
        "compatibility": [
          {
            "year": 2019,
            "make": "Toyota",
            "model": "Camry",
            "trim": "LE"
          }
        ],
        "inStock": true,
        "stockCount": 15,
        "features": [
          "Ceramic compound",
          "Low dust formula",
          "Quiet operation"
        ],
        "specifications": {
          "length": "150mm",
          "width": "65mm",
          "thickness": "17mm",
          "weight": "2.1kg"
        }
      }
    ],
    "pagination": {
      "page": 1,
      "limit": 20,
      "total": 156,
      "totalPages": 8
    },
    "filters": {
      "categories": ["Brakes", "Engine", "Suspension"],
      "brands": ["Brembo", "Bosch", "ACDelco"],
      "priceRange": {
        "min": 15.99,
        "max": 899.99
      }
    }
  }
}
```

### Get Part Details
```http
GET /parts/:partId
Authorization: Bearer <jwt_token>
```

### Check Part Compatibility
```http
GET /parts/:partId/compatibility/:vehicleId
Authorization: Bearer <jwt_token>
```

**Response:**
```json
{
  "success": true,
  "data": {
    "compatible": true,
    "fitmentNotes": "Direct fit replacement",
    "installationDifficulty": "Easy",
    "estimatedInstallTime": "30 minutes",
    "requiredTools": ["Socket wrench", "Jack", "Jack stands"]
  }
}
```

### Get Part Reviews
```http
GET /parts/:partId/reviews
Authorization: Bearer <jwt_token>

Query Parameters:
- page: number
- limit: number
- rating: number (filter by rating)
```

## 🏪 Shops API

### Search Shops
```http
GET /shops/search
Authorization: Bearer <jwt_token>

Query Parameters:
- latitude: number
- longitude: number
- radius: number (miles, default: 10)
- service: string (service type)
- rating: number (minimum rating)
- pricing: string (Budget, Moderate, Premium)
- verified: boolean
- page: number
- limit: number
```

**Response:**
```json
{
  "success": true,
  "data": {
    "shops": [
      {
        "id": "shop_123",
        "name": "QuickFix Auto Service",
        "address": {
          "street": "123 Main St",
          "city": "Downtown",
          "state": "CA",
          "zipCode": "90210",
          "country": "USA"
        },
        "coordinates": {
          "latitude": 40.7128,
          "longitude": -74.0060
        },
        "phone": "(555) 123-4567",
        "email": "info@quickfixauto.com",
        "website": "https://quickfixauto.com",
        "rating": 4.8,
        "reviewCount": 324,
        "distance": 1.2,
        "distanceUnit": "miles",
        "pricing": "Moderate",
        "verified": true,
        "services": [
          "General Repair",
          "Oil Change",
          "Brake Service",
          "Tire Service",
          "Diagnostics"
        ],
        "specialties": ["Brakes", "Oil Change", "Diagnostics"],
        "certifications": [
          "ASE Certified",
          "AAA Approved",
          "NAPA AutoCare"
        ],
        "hours": {
          "monday": "8:00 AM - 6:00 PM",
          "tuesday": "8:00 AM - 6:00 PM",
          "wednesday": "8:00 AM - 6:00 PM",
          "thursday": "8:00 AM - 6:00 PM",
          "friday": "8:00 AM - 6:00 PM",
          "saturday": "9:00 AM - 4:00 PM",
          "sunday": "Closed"
        },
        "nextAvailable": "2024-01-16T14:30:00Z",
        "images": [
          "https://cdn.autowise.com/shops/shop_123_1.jpg",
          "https://cdn.autowise.com/shops/shop_123_2.jpg"
        ],
        "amenities": [
          "Free WiFi",
          "Waiting Area",
          "Coffee",
          "Shuttle Service"
        ]
      }
    ],
    "pagination": {
      "page": 1,
      "limit": 20,
      "total": 45,
      "totalPages": 3
    }
  }
}
```

### Add New Shop
```http
POST /shops
Authorization: Bearer <jwt_token>

Request Body:
```json
{
  "name": "New Auto Shop",
  "address": {
    "street": "456 Oak Ave",
    "city": "Springfield",
    "state": "IL",
    "zipCode": "62704",
    "country": "USA"
  },
  "coordinates": {
    "latitude": 39.7905,
    "longitude": -89.6545
  },
  "phone": "(555) 987-6543",
  "email": "contact@newautoshop.com",
  "website": "https://newautoshop.com",
  "services": ["Oil Change", "Tire Rotation"],
  "specialties": ["European Cars"],
  "certifications": ["ASE Certified"],
  "hours": {
    "monday": "9:00 AM - 5:00 PM",
    "tuesday": "9:00 AM - 5:00 PM",
    "wednesday": "9:00 AM - 5:00 PM",
    "thursday": "9:00 AM - 5:00 PM",
    "friday": "9:00 AM - 5:00 PM",
    "saturday": "Closed",
    "sunday": "Closed"
  },
  "description": "A brand new auto shop offering quality services."
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "id": "shop_456",
    "name": "New Auto Shop",
    // ... other shop details ...
    "rating": 0,
    "reviewCount": 0,
    "verified": false,
    "distance": 0,
    "distanceUnit": "miles"
  }
}
```

### Edit Shop
```http
PUT /shops/:shopId
Authorization: Bearer <jwt_token>

Request Body:
```json
{
  "name": "Updated Auto Shop Name",
  "phone": "(555) 111-2222"
  // ... other fields to update ...
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "id": "shop_456",
    "name": "Updated Auto Shop Name",
    // ... updated shop details ...
  }
}
```

### Get Shop Details
```http
GET /shops/:shopId
Authorization: Bearer <jwt_token>
```

### Get Shop Availability
```http
GET /shops/:shopId/availability
Authorization: Bearer <jwt_token>

Query Parameters:
- date: string (YYYY-MM-DD)
- service: string
```

**Response:**
```json
{
  "success": true,
  "data": {
    "date": "2024-01-16",
    "availableSlots": [
      {
        "time": "09:00",
        "duration": 60,
        "service": "Oil Change"
      },
      {
        "time": "14:30",
        "duration": 120,
        "service": "Brake Service"
      }
    ]
  }
}
```

### Get Shop Reviews
```http
GET /shops/:shopId/reviews
Authorization: Bearer <jwt_token>
```

## 💰 Quotes API

### Request Quote
```http
POST /quotes/request
Authorization: Bearer <jwt_token>
Content-Type: application/json

{
  "vehicleId": "vehicle_123",
  "partId": "part_123",
  "serviceType": "Installation",
  "description": "Need brake pads replaced. Hearing squealing noise when braking.",
  "preferredDate": "2024-01-15",
  "urgency": "Medium",
  "location": {
    "latitude": 40.7128,
    "longitude": -74.0060
  },
  "radius": 10
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "quoteId": "quote_123",
    "status": "Active",
    "expiresAt": "2024-01-16T10:00:00Z",
    "estimatedResponseTime": "2-4 hours"
  }
}
```

### Get Quote Details
```http
GET /quotes/:quoteId
Authorization: Bearer <jwt_token>
```

### Get Quote Bids
```http
GET /quotes/:quoteId/bids
Authorization: Bearer <jwt_token>
```

**Response:**
```json
{
  "success": true,
  "data": {
    "quote": {
      "id": "quote_123",
      "status": "Active",
      "timeRemaining": 3600,
      "vehicle": {
        "year": 2019,
        "make": "Toyota",
        "model": "Camry"
      },
      "part": {
        "name": "Brake Pads Front Set",
        "brand": "Brembo",
        "price": 89.99
      }
    },
    "bids": [
      {
        "id": "bid_123",
        "shopId": "shop_123",
        "shopName": "QuickFix Auto Service",
        "shopRating": 4.8,
        "shopReviews": 324,
        "shopDistance": "1.2 mi",
        "laborCost": 120.00,
        "totalCost": 209.99,
        "estimatedTime": "2 hours",
        "warranty": "3 years / 36,000 miles",
        "nextAvailable": "2024-01-16T14:30:00Z",
        "specialNotes": "Can provide mobile service at your location for additional $25",
        "certifications": ["ASE Certified", "AAA Approved"],
        "bidTime": "2024-01-15T10:15:00Z",
        "status": "Active"
      }
    ]
  }
}
```

### Accept Bid
```http
POST /quotes/:quoteId/accept-bid
Authorization: Bearer <jwt_token>
Content-Type: application/json

{
  "bidId": "bid_123",
  "scheduledTime": "2024-01-16T14:30:00Z",
  "notes": "Please call when arriving"
}
```

## 🛒 Cart API

### Get Cart
```http
GET /cart
Authorization: Bearer <jwt_token>
```

**Response:**
```json
{
  "success": true,
  "data": {
    "id": "cart_123",
    "items": [
      {
        "id": "cart_item_123",
        "type": "part",
        "partId": "part_123",
        "part": {
          "name": "Premium Ceramic Brake Pads - Front Set",
          "brand": "Brembo",
          "price": 89.99,
          "image": "https://cdn.autowise.com/parts/part_123.jpg"
        },
        "quantity": 1,
        "vehicleId": "vehicle_123"
      },
      {
        "id": "cart_item_124",
        "type": "service",
        "serviceId": "service_123",
        "service": {
          "name": "Brake Pad Installation",
          "shopId": "shop_123",
          "shopName": "QuickFix Auto Service",
          "price": 120.00,
          "estimatedTime": "2 hours"
        },
        "quantity": 1,
        "scheduledTime": "2024-01-16T14:30:00Z"
      }
    ],
    "summary": {
      "itemCount": 2,
      "subtotal": 209.99,
      "tax": 16.80,
      "shipping": 0.00,
      "total": 226.79
    }
  }
}
```

### Add to Cart
```http
POST /cart/items
Authorization: Bearer <jwt_token>
Content-Type: application/json

{
  "type": "part",
  "partId": "part_123",
  "quantity": 1,
  "vehicleId": "vehicle_123"
}
```

### Update Cart Item
```http
PUT /cart/items/:itemId
Authorization: Bearer <jwt_token>
Content-Type: application/json

{
  "quantity": 2
}
```

### Remove from Cart
```http
DELETE /cart/items/:itemId
Authorization: Bearer <jwt_token>
```

### Apply Promo Code
```http
POST /cart/promo
Authorization: Bearer <jwt_token>
Content-Type: application/json

{
  "code": "SAVE10"
}
```

## 🔧 Maintenance API

### Get Maintenance Records
```http
GET /vehicles/:vehicleId/maintenance
Authorization: Bearer <jwt_token>

Query Parameters:
- page: number
- limit: number
- type: string (service, repair, inspection)
- dateFrom: string (YYYY-MM-DD)
- dateTo: string (YYYY-MM-DD)
```

**Response:**
```json
{
  "success": true,
  "data": {
    "records": [
      {
        "id": "maintenance_123",
        "vehicleId": "vehicle_123",
        "type": "service",
        "date": "2024-01-05T00:00:00Z",
        "mileage": 45000,
        "description": "Oil Change & Filter Replacement",
        "cost": 45.99,
        "shopId": "shop_123",
        "shopName": "QuickFix Auto Service",
        "partIds": ["part_456", "part_789"],
        "nextDue": {
          "date": "2024-04-05T00:00:00Z",
          "mileage": 48000,
          "description": "Next oil change"
        },
        "warranty": {
          "duration": "3 months",
          "mileage": 3000,
          "expiresAt": "2024-04-05T00:00:00Z"
        },
        "status": "completed",
        "notes": "Used full synthetic oil",
        "attachments": [
          {
            "type": "receipt",
            "url": "https://cdn.autowise.com/receipts/receipt_123.pdf"
          }
        ]
      }
    ],
    "pagination": {
      "page": 1,
      "limit": 20,
      "total": 15,
      "totalPages": 1
    }
  }
}
```

### Add Maintenance Record
```http
POST /vehicles/:vehicleId/maintenance
Authorization: Bearer <jwt_token>
Content-Type: application/json

{
  "type": "service",
  "date": "2024-01-05",
  "mileage": 45000,
  "description": "Oil Change & Filter Replacement",
  "cost": 45.99,
  "shopId": "shop_123",
  "partIds": ["part_456"],
  "notes": "Used full synthetic oil"
}
```

### Get Maintenance Reminders
```http
GET /vehicles/:vehicleId/reminders
Authorization: Bearer <jwt_token>
```

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "id": "reminder_123",
      "vehicleId": "vehicle_123",
      "type": "Oil Change",
      "description": "Next oil change due",
      "dueDate": "2024-04-05T00:00:00Z",
      "dueMileage": 48000,
      "priority": "medium",
      "status": "upcoming",
      "daysUntilDue": 45,
      "milesUntilDue": 2770
    }
  ]
}
```

### Create Reminder
```http
POST /vehicles/:vehicleId/reminders
Authorization: Bearer <jwt_token>
Content-Type: application/json

{
  "type": "Tire Rotation",
  "description": "Rotate tires for even wear",
  "dueDate": "2024-02-15",
  "dueMileage": 46000,
  "priority": "low"
}
```

## 📊 Analytics API

### Get User Dashboard
```http
GET /analytics/dashboard
Authorization: Bearer <jwt_token>
```

**Response:**
```json
{
  "success": true,
  "data": {
    "summary": {
      "totalVehicles": 2,
      "totalSpent": 1245.67,
      "servicesThisYear": 8,
      "overdueItems": 0
    },
    "recentActivity": [
      {
        "type": "maintenance",
        "description": "Oil change completed",
        "date": "2024-01-05T00:00:00Z",
        "vehicleId": "vehicle_123"
      }
    ],
    "upcomingReminders": [
      {
        "type": "Oil Change",
        "dueDate": "2024-04-05T00:00:00Z",
        "vehicleId": "vehicle_123"
      }
    ]
  }
}
```

## 🔔 Notifications API

### Get Notifications
```http
GET /notifications
Authorization: Bearer <jwt_token>

Query Parameters:
- unread: boolean
- type: string
- page: number
- limit: number
```

### Mark as Read
```http
PUT /notifications/:notificationId/read
Authorization: Bearer <jwt_token>
```

### Update Notification Settings
```http
PUT /notifications/settings
Authorization: Bearer <jwt_token>
Content-Type: application/json

{
  "email": {
    "maintenanceReminders": true,
    "quoteUpdates": true,
    "promotions": false
  },
  "push": {
    "maintenanceReminders": true,
    "quoteUpdates": true,
    "promotions": false
  }
}
```

## 📄 File Upload API

### Upload File
```http
POST /upload
Authorization: Bearer <jwt_token>
Content-Type: multipart/form-data

Form Data:
- file: File
- type: string (receipt, photo, document)
- vehicleId: string (optional)
- maintenanceId: string (optional)
```

**Response:**
```json
{
  "success": true,
  "data": {
    "fileId": "file_123",
    "url": "https://cdn.autowise.com/uploads/file_123.jpg",
    "type": "photo",
    "size": 1024576,
    "mimeType": "image/jpeg"
  }
}
```

## 🚨 Error Responses

### Standard Error Format
```json
{
  "success": false,
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Invalid input data",
    "details": [
      {
        "field": "email",
        "message": "Invalid email format"
      }
    ]
  }
}
```

### Common Error Codes
- `VALIDATION_ERROR` (400) - Invalid input data
- `UNAUTHORIZED` (401) - Invalid or missing authentication
- `FORBIDDEN` (403) - Insufficient permissions
- `NOT_FOUND` (404) - Resource not found
- `RATE_LIMIT_EXCEEDED` (429) - Too many requests
- `INTERNAL_ERROR` (500) - Server error

## 📡 WebSocket Events

### Real-time Quote Updates
```javascript
// Connect to WebSocket
const ws = new WebSocket('wss://api.autowise.com/ws');

// Subscribe to quote updates
ws.send(JSON.stringify({
  type: 'subscribe',
  channel: 'quotes',
  quoteId: 'quote_123'
}));

// Receive bid updates
ws.onmessage = (event) => {
  const data = JSON.parse(event.data);
  if (data.type === 'new_bid') {
    // Handle new bid
  }
};
```

## 🔧 Rate Limiting

- **Authentication**: 10 requests per minute
- **Search**: 100 requests per hour
- **General API**: 1000 requests per hour
- **File Upload**: 50 requests per hour

## 📋 API Versioning

- Current version: `v1`
- Version specified in URL: `/v1/endpoint`
- Backward compatibility maintained for 1 year
- Deprecation notices sent 6 months before removal

---

This API documentation provides the complete specification for integrating with the AutoWise platform. All endpoints return JSON responses and follow RESTful conventions.