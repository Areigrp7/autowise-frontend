# AutoWise App Store Deployment Guide

## 🎯 Overview

This guide provides step-by-step instructions for deploying your AutoWise PWA to both the Apple App Store and Google Play Store using Capacitor.

## ✅ Prerequisites

### Development Environment
- Node.js 18+ and npm/pnpm
- Capacitor CLI installed (`npm install -g @capacitor/cli`)
- For iOS: macOS with Xcode 15+
- For Android: Android Studio with SDK

### App Store Accounts
- Apple Developer Program ($99/year)
- Google Play Console ($25 one-time fee)

## 📱 Capacitor Setup (Completed)

Your project has been configured with Capacitor. The following has been set up:

- ✅ Capacitor core installed
- ✅ Android and iOS platforms added
- ✅ App icons and splash screens generated
- ✅ Manifest.json updated for app store compliance
- ✅ iOS Info.plist configured with required permissions
- ✅ Android manifest configured with required permissions

## 🏗️ Build Process

### 1. Build Web App
```bash
# Build production version
npm run build

# Sync web assets to native projects
npx cap sync
```

### 2. iOS Build Process

#### For Development Testing:
```bash
# Open iOS project in Xcode
npx cap open ios

# In Xcode:
# 1. Select your development team
# 2. Set bundle identifier to: com.autowise.app
# 3. Build and run on simulator/device
```

#### For App Store Submission:
```bash
# Open iOS project
npx cap open ios

# In Xcode:
# 1. Select "AutoWise" as target
# 2. Go to Product > Archive
# 3. Once archived, click "Distribute App"
# 4. Select "App Store Connect" and follow prompts
```

### 3. Android Build Process

#### For Development Testing:
```bash
# Open Android project
npx cap open android

# In Android Studio:
# 1. Wait for Gradle sync
# 2. Run on device/emulator
```

#### For Play Store Submission:
```bash
# Build release APK
cd android
./gradlew assembleRelease

# Or build AAB (recommended)
./gradlew bundleRelease
```

## 📋 App Store Submission Requirements

### iOS App Store Requirements

#### App Information
- **App Name**: AutoWise - Car Parts & Mechanics
- **Bundle ID**: com.autowise.app
- **Version**: 1.0.0
- **Category**: Business/Utilities

#### Required Assets
1. **App Icons**: Already generated (various sizes)
2. **Screenshots**: 6.5-inch (iPhone 13/14) - 5 screenshots
3. **App Preview Video**: Optional but recommended
4. **Description**: 170 characters max for short, 4000 for full
5. **Keywords**: car parts, auto repair, mechanics, automotive

#### Privacy Policy URL
You'll need to host a privacy policy. Consider using:
- GitHub Pages
- Your website
- TermsFeed or similar service

#### TestFlight Testing
```bash
# Create TestFlight build
# In Xcode: Product > Archive
# Upload to App Store Connect
# Add internal/external testers
```

### Android Play Store Requirements

#### App Information
- **App Name**: AutoWise - Car Parts & Mechanics
- **Package Name**: com.autowise.app
- **Version Code**: 1
- **Version Name**: 1.0.0
- **Category**: Business

#### Required Assets
1. **App Icons**: Already generated (adaptive icons)
2. **Feature Graphic**: 1024x500px
3. **Screenshots**: Phone (at least 2, up to 8)
4. **Promo Video**: Optional
5. **Description**: 80 characters max for short, 4000 for full

#### Signing Configuration
Create a signing key for production:

```bash
# Generate keystore
keytool -genkey -v -keystore autowise.keystore -alias autowise -keyalg RSA -keysize 2048 -validity 10000

# Update android/app/build.gradle signing config
android {
    signingConfigs {
        release {
            storeFile file('path/to/autowise.keystore')
            storePassword 'your_store_password'
            keyAlias 'autowise'
            keyPassword 'your_key_password'
        }
    }
}
```

## 🚀 Deployment Steps

### Step 1: Test on Devices

#### iOS Testing
1. Connect iOS device
2. In Xcode: Product > Run
3. Test all PWA features work in native app

#### Android Testing
1. Connect Android device
2. In Android Studio: Run > Run 'app'
3. Test all PWA features work in native app

### Step 2: Prepare App Store Assets

#### Create Screenshots
1. Run app on device
2. Take screenshots of key screens:
   - Home screen
   - Parts search
   - Shop listings
   - Cart/checkout
   - Profile/garage

#### App Store Screenshots Requirements:
- **iOS**: 6.5-inch display (1242x2688px)
- **Android**: Phone screenshots (various sizes accepted)

### Step 3: Configure App Store Listings

#### iOS App Store Connect
1. Go to [App Store Connect](https://appstoreconnect.apple.com)
2. Create new app
3. Fill in metadata:
   - Name, description, keywords
   - Category: Business > Productivity
   - Price: Free
   - Age rating: 4+ (PEGI 3)
4. Upload screenshots and icons
5. Submit for review

#### Android Play Console
1. Go to [Play Console](https://play.google.com/console)
2. Create new app
3. Fill in store listing:
   - Title, short/full description
   - Category: Business
   - Content rating: Everyone
4. Upload graphics and screenshots
5. Create release (internal/test/production)

### Step 4: Submit for Review

#### iOS Review Process
- **Review Time**: 24-48 hours typically
- **Common Rejection Reasons**:
  - Missing privacy policy
  - Inadequate screenshots
  - App crashes
  - Poor description

#### Android Review Process
- **Review Time**: Hours to days
- **Common Issues**:
  - Missing privacy policy
  - Incorrect content rating
  - App crashes

## 🔧 Troubleshooting

### Common iOS Issues

#### Build Errors
```bash
# Clean and rebuild
npx cap sync ios
cd ios/App
xcodebuild clean
xcodebuild build
```

#### Permission Issues
- Ensure all required permissions are in Info.plist
- Test permissions on physical device

### Common Android Issues

#### Build Errors
```bash
# Clean Gradle
cd android
./gradlew clean
./gradlew build
```

#### Permission Issues
- Check AndroidManifest.xml permissions
- Test on physical device with location/camera enabled

### PWA Functionality Issues

#### Service Worker
- Ensure service worker registers correctly in native app
- Test offline functionality

#### Camera/Location
- Request permissions properly
- Handle permission denials gracefully

## 📊 Post-Launch

### Analytics Setup
```typescript
// Add to your app
import { initializeApp } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';

// Initialize Firebase
const firebaseConfig = {
  // Your Firebase config
};
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
```

### Crash Reporting
```typescript
// Sentry for error tracking
import * as Sentry from '@sentry/react';

Sentry.init({
  dsn: 'your-sentry-dsn',
  environment: 'production',
});
```

### Update Process

#### iOS Updates
1. Increment version number in Xcode
2. Archive and upload new build
3. Submit for review

#### Android Updates
1. Increment version code/name in build.gradle
2. Build new AAB
3. Upload to Play Console
4. Roll out to production

## 📋 Checklist

### Pre-Submission
- [ ] App builds successfully on both platforms
- [ ] All PWA features work in native apps
- [ ] Privacy policy published and linked
- [ ] Screenshots taken and formatted
- [ ] App store metadata prepared
- [ ] Test accounts created if needed

### iOS Specific
- [ ] Bundle ID matches Capacitor config
- [ ] App icons in all required sizes
- [ ] Privacy permissions configured
- [ ] TestFlight beta testing completed

### Android Specific
- [ ] Package name matches Capacitor config
- [ ] Signing key created and configured
- [ ] Adaptive icons configured
- [ ] Content rating appropriate

### Post-Submission
- [ ] Monitor crash reports
- [ ] Track user feedback
- [ ] Plan update releases
- [ ] Set up analytics

## 🎯 Next Steps

1. **Build and Test**: Run `npm run build && npx cap sync`
2. **Test on Devices**: Use `npx cap run ios` and `npx cap run android`
3. **Create App Store Accounts**: Apple Developer Program & Google Play Console
4. **Prepare Assets**: Screenshots, icons, descriptions
5. **Submit**: Follow the respective app store submission processes

## 📞 Support

- **Capacitor Docs**: https://capacitorjs.com/docs
- **iOS App Store Guidelines**: https://developer.apple.com/app-store/review/guidelines/
- **Google Play Policies**: https://play.google.com/about/developer-content-policy/

---

**Need Help?** Check the Capacitor documentation or create an issue in your repository.
