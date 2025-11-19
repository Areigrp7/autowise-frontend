# React Native Conversion Guide for AutoWise

## 🎯 Overview

This guide provides step-by-step instructions for converting the AutoWise web application to React Native for iOS and Android development.

## 📋 Prerequisites

### Development Environment Setup
```bash
# Install React Native CLI
npm install -g @react-native-community/cli

# For iOS development (macOS only)
# Install Xcode from App Store
# Install CocoaPods
sudo gem install cocoapods

# For Android development
# Install Android Studio
# Setup Android SDK and emulator
```

## 🏗️ Project Structure Migration

### 1. Initialize React Native Project
```bash
npx react-native init AutoWiseApp --template react-native-template-typescript
cd AutoWiseApp
```

### 2. Install Required Dependencies
```bash
# Navigation
npm install @react-navigation/native @react-navigation/stack @react-navigation/bottom-tabs
npm install react-native-screens react-native-safe-area-context

# UI Components
npm install react-native-vector-icons react-native-svg
npm install react-native-paper # or native-base

# State Management (if needed)
npm install @reduxjs/toolkit react-redux

# HTTP Client
npm install axios

# Storage
npm install @react-native-async-storage/async-storage

# Device Features
npm install react-native-camera
npm install @react-native-community/geolocation
npm install react-native-push-notification
```

### 3. Directory Structure
```
src/
├── components/          # Reusable components
│   ├── common/         # Shared UI components
│   ├── forms/          # Form components
│   └── navigation/     # Navigation components
├── screens/            # Screen components (pages)
│   ├── Home/
│   ├── PartsSearch/
│   ├── ShopsMap/
│   ├── QuoteBidding/
│   ├── Cart/
│   └── MyGarage/
├── services/           # API services
├── utils/              # Utility functions
├── types/              # TypeScript definitions
├── hooks/              # Custom hooks
├── constants/          # App constants
└── assets/             # Images, fonts, etc.
```

## 🔄 Component Conversion

### Web to React Native Component Mapping

#### 1. Layout Components
```typescript
// Web (Layout.tsx)
<div className="container mx-auto px-4">
  <header className="bg-white shadow-sm">
    <nav>...</nav>
  </header>
  <main>{children}</main>
  <footer>...</footer>
</div>

// React Native (Layout.tsx)
import { View, ScrollView, SafeAreaView } from 'react-native';

<SafeAreaView style={styles.container}>
  <View style={styles.header}>
    {/* Navigation component */}
  </View>
  <ScrollView style={styles.main}>
    {children}
  </ScrollView>
</SafeAreaView>
```

#### 2. Button Components
```typescript
// Web (Button)
import { Button } from '@/components/ui/button';
<Button className="bg-blue-600 text-white">Click me</Button>

// React Native (Button)
import { TouchableOpacity, Text } from 'react-native';
<TouchableOpacity style={styles.button} onPress={onPress}>
  <Text style={styles.buttonText}>Click me</Text>
</TouchableOpacity>
```

#### 3. Card Components
```typescript
// Web (Card)
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
<Card>
  <CardHeader>
    <CardTitle>Title</CardTitle>
  </CardHeader>
  <CardContent>Content</CardContent>
</Card>

// React Native (Card)
import { View, Text } from 'react-native';
<View style={styles.card}>
  <View style={styles.cardHeader}>
    <Text style={styles.cardTitle}>Title</Text>
  </View>
  <View style={styles.cardContent}>
    <Text>Content</Text>
  </View>
</View>
```

#### 4. Input Components
```typescript
// Web (Input)
import { Input } from '@/components/ui/input';
<Input placeholder="Enter text" value={value} onChange={onChange} />

// React Native (Input)
import { TextInput } from 'react-native';
<TextInput
  style={styles.input}
  placeholder="Enter text"
  value={value}
  onChangeText={onChange}
/>
```

## 🧭 Navigation Setup

### 1. Main Navigator
```typescript
// App.tsx
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import HomeScreen from './src/screens/Home/HomeScreen';
import PartsSearchScreen from './src/screens/PartsSearch/PartsSearchScreen';
import ShopsMapScreen from './src/screens/ShopsMap/ShopsMapScreen';
import MyGarageScreen from './src/screens/MyGarage/MyGarageScreen';
import CartScreen from './src/screens/Cart/CartScreen';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

const TabNavigator = () => (
  <Tab.Navigator>
    <Tab.Screen name="Home" component={HomeScreen} />
    <Tab.Screen name="Parts" component={PartsSearchScreen} />
    <Tab.Screen name="Shops" component={ShopsMapScreen} />
    <Tab.Screen name="Garage" component={MyGarageScreen} />
    <Tab.Screen name="Cart" component={CartScreen} />
  </Tab.Navigator>
);

const App = () => (
  <NavigationContainer>
    <Stack.Navigator>
      <Stack.Screen 
        name="Main" 
        component={TabNavigator} 
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  </NavigationContainer>
);

export default App;
```

### 2. Navigation Types
```typescript
// types/navigation.ts
export type RootStackParamList = {
  Main: undefined;
  PartsDetail: { partId: string };
  ShopDetail: { shopId: string };
  QuoteDetail: { quoteId: string };
};

export type TabParamList = {
  Home: undefined;
  Parts: undefined;
  Shops: undefined;
  Garage: undefined;
  Cart: undefined;
};
```

## 📱 Screen Conversion

### 1. Home Screen (Index.tsx → HomeScreen.tsx)
```typescript
// src/screens/Home/HomeScreen.tsx
import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import VehicleSelector from '../../components/VehicleSelector';
import QuickActions from '../../components/QuickActions';

const HomeScreen = ({ navigation }) => {
  const [selectedVehicle, setSelectedVehicle] = useState(null);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View style={styles.header}>
          <Text style={styles.title}>AutoWise</Text>
          <Text style={styles.subtitle}>
            Find parts, connect with mechanics, manage your vehicles
          </Text>
        </View>

        <VehicleSelector
          selectedVehicle={selectedVehicle}
          onVehicleSelect={setSelectedVehicle}
        />

        <QuickActions navigation={navigation} />
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9fafb',
  },
  header: {
    padding: 20,
    alignItems: 'center',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#111827',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#6b7280',
    textAlign: 'center',
  },
});

export default HomeScreen;
```

### 2. Parts Search Screen
```typescript
// src/screens/PartsSearch/PartsSearchScreen.tsx
import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  FlatList,
  TextInput,
  TouchableOpacity,
} from 'react-native';

import PartCard from '../../components/PartCard';
import FilterModal from '../../components/FilterModal';
import { searchParts } from '../../services/partsService';

const PartsSearchScreen = () => {
  const [parts, setParts] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [filters, setFilters] = useState({});
  const [loading, setLoading] = useState(false);

  const handleSearch = async () => {
    setLoading(true);
    try {
      const results = await searchParts(searchQuery, filters);
      setParts(results);
    } catch (error) {
      console.error('Search failed:', error);
    } finally {
      setLoading(false);
    }
  };

  const renderPart = ({ item }) => (
    <PartCard part={item} onPress={() => {/* Navigate to detail */}} />
  );

  return (
    <View style={styles.container}>
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="Search for parts..."
          value={searchQuery}
          onChangeText={setSearchQuery}
          onSubmitEditing={handleSearch}
        />
        <TouchableOpacity style={styles.filterButton}>
          <Text>Filters</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={parts}
        renderItem={renderPart}
        keyExtractor={(item) => item.id}
        refreshing={loading}
        onRefresh={handleSearch}
      />
    </View>
  );
};
```

## 🎨 Styling Migration

### 1. Create Style System
```typescript
// src/constants/theme.ts
export const colors = {
  primary: '#2563eb',
  primaryDark: '#1d4ed8',
  success: '#16a34a',
  error: '#dc2626',
  warning: '#ca8a04',
  gray50: '#f9fafb',
  gray600: '#4b5563',
  gray900: '#111827',
};

export const typography = {
  h1: {
    fontSize: 32,
    fontWeight: 'bold',
  },
  h2: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  body: {
    fontSize: 16,
  },
  caption: {
    fontSize: 14,
  },
};

export const spacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
};
```

### 2. Common Styles
```typescript
// src/styles/commonStyles.ts
import { StyleSheet } from 'react-native';
import { colors, typography, spacing } from '../constants/theme';

export const commonStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.gray50,
  },
  card: {
    backgroundColor: 'white',
    borderRadius: 8,
    padding: spacing.md,
    marginHorizontal: spacing.md,
    marginVertical: spacing.sm,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  button: {
    backgroundColor: colors.primary,
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.md,
    borderRadius: 6,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: typography.body.fontSize,
    fontWeight: '600',
  },
});
```

## 🔌 API Services

### 1. HTTP Client Setup
```typescript
// src/services/api.ts
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const API_BASE_URL = 'https://api.autowise.com';

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
});

// Request interceptor for auth token
apiClient.interceptors.request.use(async (config) => {
  const token = await AsyncStorage.getItem('authToken');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default apiClient;
```

### 2. Service Modules
```typescript
// src/services/partsService.ts
import apiClient from './api';
import { Part } from '../types/part';

export const searchParts = async (
  query: string,
  filters: any
): Promise<Part[]> => {
  const response = await apiClient.get('/parts/search', {
    params: { q: query, ...filters },
  });
  return response.data;
};

export const getPartById = async (id: string): Promise<Part> => {
  const response = await apiClient.get(`/parts/${id}`);
  return response.data;
};
```

## 📱 Mobile-Specific Features

### 1. Camera Integration (VIN Scanning)
```typescript
// src/components/VINScanner.tsx
import React from 'react';
import { RNCamera } from 'react-native-camera';

const VINScanner = ({ onVINDetected }) => {
  const handleBarCodeRead = (event) => {
    if (event.data && event.data.length === 17) {
      onVINDetected(event.data);
    }
  };

  return (
    <RNCamera
      style={{ flex: 1 }}
      onBarCodeRead={handleBarCodeRead}
      barCodeTypes={[RNCamera.Constants.BarCodeType.code128]}
    />
  );
};
```

### 2. Location Services
```typescript
// src/services/locationService.ts
import Geolocation from '@react-native-community/geolocation';

export const getCurrentLocation = (): Promise<{
  latitude: number;
  longitude: number;
}> => {
  return new Promise((resolve, reject) => {
    Geolocation.getCurrentPosition(
      (position) => {
        resolve({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        });
      },
      (error) => reject(error),
      { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
    );
  });
};
```

### 3. Push Notifications
```typescript
// src/services/notificationService.ts
import PushNotification from 'react-native-push-notification';

export const initializeNotifications = () => {
  PushNotification.configure({
    onNotification: function(notification) {
      console.log('NOTIFICATION:', notification);
    },
    requestPermissions: Platform.OS === 'ios',
  });
};

export const scheduleMaintenanceReminder = (
  vehicleId: string,
  message: string,
  date: Date
) => {
  PushNotification.localNotificationSchedule({
    message,
    date,
    userInfo: { vehicleId },
  });
};
```

## 🧪 Testing Setup

### 1. Jest Configuration
```javascript
// jest.config.js
module.exports = {
  preset: 'react-native',
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
  transform: {
    '^.+\\.(js|jsx|ts|tsx)$': 'babel-jest',
  },
  testMatch: ['**/__tests__/**/*.(ts|tsx|js)', '**/*.(test|spec).(ts|tsx|js)'],
  collectCoverageFrom: [
    'src/**/*.{ts,tsx}',
    '!src/**/*.d.ts',
  ],
};
```

### 2. Component Testing
```typescript
// src/components/__tests__/PartCard.test.tsx
import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import PartCard from '../PartCard';

const mockPart = {
  id: '1',
  name: 'Brake Pads',
  brand: 'Brembo',
  price: 89.99,
};

describe('PartCard', () => {
  it('renders part information correctly', () => {
    const { getByText } = render(
      <PartCard part={mockPart} onPress={() => {}} />
    );
    
    expect(getByText('Brake Pads')).toBeTruthy();
    expect(getByText('Brembo')).toBeTruthy();
    expect(getByText('$89.99')).toBeTruthy();
  });

  it('calls onPress when tapped', () => {
    const onPress = jest.fn();
    const { getByTestId } = render(
      <PartCard part={mockPart} onPress={onPress} />
    );
    
    fireEvent.press(getByTestId('part-card'));
    expect(onPress).toHaveBeenCalledWith(mockPart);
  });
});
```

## 🚀 Build and Deployment

### 1. Android Build
```bash
# Debug build
npx react-native run-android

# Release build
cd android
./gradlew assembleRelease

# Generate signed APK
./gradlew bundleRelease
```

### 2. iOS Build
```bash
# Debug build
npx react-native run-ios

# Release build (Xcode)
# Open ios/AutoWiseApp.xcworkspace in Xcode
# Product > Archive
```

### 3. Code Push (Optional)
```bash
# Install CodePush
npm install --save react-native-code-push

# Release update
appcenter codepush release-react AutoWise-iOS ios
appcenter codepush release-react AutoWise-Android android
```

## 📋 Migration Checklist

### Phase 1: Setup
- [ ] Initialize React Native project
- [ ] Install dependencies
- [ ] Setup navigation structure
- [ ] Create base components

### Phase 2: Core Features
- [ ] Convert Home screen
- [ ] Convert Parts Search
- [ ] Convert Shop Discovery
- [ ] Convert My Garage
- [ ] Convert Cart functionality

### Phase 3: Mobile Features
- [ ] Add camera integration
- [ ] Implement location services
- [ ] Setup push notifications
- [ ] Add offline storage

### Phase 4: Testing & Polish
- [ ] Write unit tests
- [ ] Perform integration testing
- [ ] Test on physical devices
- [ ] Optimize performance

### Phase 5: Deployment
- [ ] Setup CI/CD pipeline
- [ ] Configure app store metadata
- [ ] Submit to app stores
- [ ] Monitor crash reports

## 🔧 Troubleshooting

### Common Issues
1. **Metro bundler issues**: Clear cache with `npx react-native start --reset-cache`
2. **iOS build failures**: Clean build folder in Xcode
3. **Android build issues**: Clean gradle with `cd android && ./gradlew clean`
4. **Dependency conflicts**: Check React Native compatibility

### Performance Tips
- Use FlatList for large lists
- Implement image caching
- Optimize bundle size
- Use Hermes engine (Android)
- Enable ProGuard (Android release)

---

This guide provides a comprehensive roadmap for converting the AutoWise web application to React Native. Follow the phases sequentially and refer to the React Native documentation for detailed implementation guidance.