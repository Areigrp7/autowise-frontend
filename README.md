# AutoWise - Automotive Parts & Services Platform

## 🚗 Overview

AutoWise is a comprehensive web application for automotive parts comparison, shop discovery, and vehicle maintenance management. Built with React, TypeScript, and modern web technologies, it provides a complete solution for vehicle owners to find parts, connect with mechanics, and manage their vehicle maintenance.

## 🏗️ Architecture

### Technology Stack
- **Frontend Framework**: React 18 with TypeScript
- **Styling**: Tailwind CSS + shadcn/ui components
- **Routing**: React Router v6
- **State Management**: React Hooks (useState, useEffect)
- **Build Tool**: Vite
- **Package Manager**: pnpm

### Project Structure
```
src/
├── components/           # Reusable UI components
│   ├── ui/              # shadcn/ui base components
│   ├── Layout.tsx       # Main layout wrapper
│   └── CustomSelect.tsx # Custom dropdown component
├── pages/               # Route components (screens)
│   ├── Index.tsx        # Home/Landing page
│   ├── PartsSearch.tsx  # Parts comparison
│   ├── ShopsMap.tsx     # Shop discovery
│   ├── QuoteBidding.tsx # Quote management
│   ├── Cart.tsx         # Shopping cart
│   ├── MyGarage.tsx     # Vehicle management
│   └── NotFound.tsx     # 404 page
├── hooks/               # Custom React hooks
├── lib/                 # Utility functions
├── types/               # TypeScript type definitions
└── App.tsx              # Main app component
```

## 🚀 Features

### Core Functionality
1. **Vehicle Management** - Add, edit, and track multiple vehicles
2. **Parts Search** - Compare parts across multiple suppliers
3. **Shop Discovery** - Find and connect with local mechanics
4. **Quote Bidding** - Get competitive quotes for services
5. **Shopping Cart** - Purchase parts and book services
6. **Maintenance Tracking** - Schedule and track vehicle maintenance

### Key Components
- **Responsive Design** - Mobile-first approach
- **Custom Dropdown System** - Stable, accessible select components
- **Navigation System** - Clean routing with active states
- **Interactive Footer** - Support and company information
- **Error Handling** - Comprehensive error boundaries

## 📱 React Native Conversion Guide

### Architecture Compatibility
The application is structured for easy React Native conversion:

1. **Component Separation**: UI components are separated from business logic
2. **Hook-based State**: Uses React hooks compatible with React Native
3. **Modular Design**: Each page/feature is self-contained
4. **Type Safety**: Full TypeScript coverage for easier refactoring

### Conversion Steps

#### 1. Replace Web Components with React Native
```typescript
// Web (current)
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

// React Native (target)
import { TouchableOpacity, View, Text } from 'react-native';
```

#### 2. Navigation Migration
```typescript
// Web (current)
import { BrowserRouter, Routes, Route } from 'react-router-dom';

// React Native (target)
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
```

#### 3. Styling Migration
```typescript
// Web (current)
className="bg-blue-600 text-white px-4 py-2 rounded"

// React Native (target)
style={styles.button}
// with StyleSheet.create({...})
```

### Mobile-Specific Considerations

#### Platform Features to Implement
1. **Camera Integration** - For VIN scanning and part photos
2. **GPS Location** - For finding nearby shops
3. **Push Notifications** - For maintenance reminders
4. **Offline Storage** - Using AsyncStorage or SQLite
5. **Biometric Auth** - For secure login

#### API Integration Points
- Vehicle data management
- Parts catalog search
- Shop location services
- Quote/booking system
- User authentication
- Payment processing

## 🛠️ Development Setup

### Prerequisites
- Node.js 18+ 
- pnpm (recommended) or npm

### Installation
```bash
# Clone the repository
git clone <repository-url>
cd autowise

# Install dependencies
pnpm install

# Start development server
pnpm run dev

# Build for production
pnpm run build
```

### Available Scripts
```bash
pnpm run dev          # Start development server
pnpm run build        # Build for production
pnpm run preview      # Preview production build
pnpm run lint         # Run ESLint
pnpm run type-check   # Run TypeScript compiler
```

## 📊 Data Models

### Core Entities

#### Vehicle
```typescript
interface Vehicle {
  id: string;
  year: number;
  make: string;
  model: string;
  trim?: string;
  vin: string;
  mileage: number;
  color: string;
  nickname?: string;
  image?: string;
}
```

#### Part
```typescript
interface Part {
  id: string;
  name: string;
  brand: string;
  partNumber: string;
  price: number;
  originalPrice?: number;
  compatibility: string[];
  seller: string;
  rating: number;
  reviews: number;
  image?: string;
  warranty?: string;
  shipping?: string;
}
```

#### Shop
```typescript
interface Shop {
  id: string;
  name: string;
  address: string;
  phone: string;
  rating: number;
  reviews: number;
  distance: string;
  services: string[];
  certifications: string[];
  hours: Record<string, string>;
  pricing: 'Budget' | 'Moderate' | 'Premium';
  verified: boolean;
}
```

#### Maintenance Record
```typescript
interface MaintenanceRecord {
  id: string;
  vehicleId: string;
  date: string;
  type: 'service' | 'repair' | 'inspection';
  description: string;
  mileage: number;
  cost: number;
  shop: string;
  nextDue?: string;
  nextMileage?: number;
  status: 'completed' | 'scheduled' | 'overdue';
}
```

## 🔧 API Integration

### Recommended API Structure

#### Authentication
```typescript
POST /api/auth/login
POST /api/auth/register
POST /api/auth/logout
GET  /api/auth/profile
```

#### Vehicles
```typescript
GET    /api/vehicles
POST   /api/vehicles
PUT    /api/vehicles/:id
DELETE /api/vehicles/:id
```

#### Parts
```typescript
GET /api/parts/search?make=&model=&year=&category=
GET /api/parts/:id
GET /api/parts/compatibility/:vehicleId
```

#### Shops
```typescript
GET /api/shops/search?location=&service=&radius=
GET /api/shops/:id
GET /api/shops/:id/availability
```

#### Quotes
```typescript
POST /api/quotes/request
GET  /api/quotes/:id/bids
POST /api/quotes/:id/accept-bid
```

## 🎨 Design System

### Color Palette
```css
/* Primary Colors */
--blue-600: #2563eb;
--blue-700: #1d4ed8;

/* Status Colors */
--green-600: #16a34a;  /* Success */
--red-600: #dc2626;    /* Error */
--yellow-600: #ca8a04; /* Warning */

/* Neutral Colors */
--gray-50: #f9fafb;
--gray-600: #4b5563;
--gray-900: #111827;
```

### Typography
```css
/* Headings */
.text-3xl { font-size: 1.875rem; }
.text-2xl { font-size: 1.5rem; }
.text-xl { font-size: 1.25rem; }

/* Body */
.text-base { font-size: 1rem; }
.text-sm { font-size: 0.875rem; }
```

### Component Variants
- **Buttons**: Primary, Secondary, Outline, Ghost
- **Cards**: Default, Elevated, Outlined
- **Badges**: Default, Secondary, Destructive, Outline

## 🧪 Testing Strategy

### Recommended Testing Approach
1. **Unit Tests** - Component logic and utilities
2. **Integration Tests** - Page-level functionality
3. **E2E Tests** - Critical user journeys
4. **Visual Tests** - Component snapshots

### Key Test Scenarios
- Vehicle CRUD operations
- Parts search and filtering
- Quote request workflow
- Cart management
- Navigation flows

## 🚀 Deployment

### Build Optimization
```bash
# Production build
pnpm run build

# Analyze bundle size
pnpm run build --analyze
```

### Environment Variables
```env
VITE_API_BASE_URL=https://api.autowise.com
VITE_MAPS_API_KEY=your_maps_api_key
VITE_STRIPE_PUBLIC_KEY=your_stripe_key
```

### Hosting Options
- **Vercel** - Recommended for React apps
- **Netlify** - Good for static sites
- **AWS S3 + CloudFront** - Enterprise option
- **Firebase Hosting** - Google ecosystem

## 📈 Performance Optimization

### Current Optimizations
- **Code Splitting** - Route-based lazy loading
- **Bundle Size** - 452.57 kB (optimized)
- **Tree Shaking** - Unused code elimination
- **Image Optimization** - WebP format support

### Mobile Performance Tips
- Implement virtual scrolling for large lists
- Use React.memo for expensive components
- Optimize images for mobile screens
- Implement offline caching strategy

## 🔐 Security Considerations

### Current Security Features
- **Input Validation** - Form validation on all inputs
- **XSS Protection** - Sanitized user content
- **HTTPS Only** - Secure data transmission

### Mobile Security Additions
- **Biometric Authentication** - Face ID / Touch ID
- **Certificate Pinning** - API security
- **Secure Storage** - Keychain / Keystore
- **Root/Jailbreak Detection** - Device integrity

## 📚 Additional Resources

### Documentation
- [React Native Documentation](https://reactnative.dev/)
- [Expo Documentation](https://docs.expo.dev/)
- [React Navigation](https://reactnavigation.org/)

### UI Libraries for React Native
- **NativeBase** - Component library
- **React Native Elements** - Cross-platform UI
- **Tamagui** - Universal design system

## 🤝 Contributing

### Development Workflow
1. Create feature branch from `main`
2. Implement changes with tests
3. Run linting and type checking
4. Submit pull request with description
5. Code review and merge

### Code Standards
- **TypeScript** - Strict mode enabled
- **ESLint** - Airbnb configuration
- **Prettier** - Code formatting
- **Conventional Commits** - Commit message format

---

## 📞 Support

For questions about React Native conversion or mobile development:
- Create an issue in the repository
- Contact the development team
- Review the conversion guide above

**Last Updated**: November 2024
**Version**: 1.0.0
**License**: MIT