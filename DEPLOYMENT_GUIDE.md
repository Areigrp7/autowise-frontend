# AutoWise Deployment Guide

## 🚀 Overview

This guide covers deployment options for the AutoWise web application, from development to production environments.

## 📋 Prerequisites

### System Requirements
- Node.js 18.x or higher
- pnpm (recommended) or npm
- Git
- Modern web browser

### Environment Setup
```bash
# Install Node.js (using nvm)
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.0/install.sh | bash
nvm install 18
nvm use 18

# Install pnpm
npm install -g pnpm

# Verify installation
node --version
pnpm --version
```

## 🏗️ Build Process

### Development Build
```bash
# Install dependencies
pnpm install

# Start development server
pnpm run dev

# Application will be available at http://localhost:5173
```

### Production Build
```bash
# Create optimized production build
pnpm run build

# Preview production build locally
pnpm run preview

# Build output will be in the 'dist' directory
```

### Build Configuration
```javascript
// vite.config.ts
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  build: {
    outDir: 'dist',
    sourcemap: false, // Set to true for debugging
    minify: 'terser',
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom'],
          router: ['react-router-dom'],
          ui: ['@radix-ui/react-dialog', '@radix-ui/react-dropdown-menu']
        }
      }
    }
  }
})
```

## 🌐 Environment Variables

### Environment Configuration
Create environment files for different stages:

#### `.env.development`
```env
VITE_API_BASE_URL=http://localhost:3000/api
VITE_APP_ENV=development
VITE_ENABLE_ANALYTICS=false
VITE_LOG_LEVEL=debug
```

#### `.env.production`
```env
VITE_API_BASE_URL=https://api.autowise.com/v1
VITE_APP_ENV=production
VITE_ENABLE_ANALYTICS=true
VITE_LOG_LEVEL=error
VITE_SENTRY_DSN=https://your-sentry-dsn@sentry.io/project-id
```

#### `.env.staging`
```env
VITE_API_BASE_URL=https://staging-api.autowise.com/v1
VITE_APP_ENV=staging
VITE_ENABLE_ANALYTICS=true
VITE_LOG_LEVEL=warn
```

### Environment Usage
```typescript
// src/config/env.ts
export const config = {
  apiBaseUrl: import.meta.env.VITE_API_BASE_URL,
  environment: import.meta.env.VITE_APP_ENV,
  enableAnalytics: import.meta.env.VITE_ENABLE_ANALYTICS === 'true',
  logLevel: import.meta.env.VITE_LOG_LEVEL || 'info',
};
```

## ☁️ Deployment Options

### 1. Vercel (Recommended)

#### Quick Deploy
```bash
# Install Vercel CLI
npm install -g vercel

# Deploy to Vercel
vercel

# Follow the prompts to configure your project
```

#### Vercel Configuration
```json
// vercel.json
{
  "version": 2,
  "builds": [
    {
      "src": "package.json",
      "use": "@vercel/static-build",
      "config": {
        "distDir": "dist"
      }
    }
  ],
  "routes": [
    {
      "src": "/(.*)",
      "dest": "/index.html"
    }
  ],
  "env": {
    "VITE_API_BASE_URL": "@api_base_url",
    "VITE_APP_ENV": "production"
  }
}
```

#### Environment Variables in Vercel
```bash
# Set environment variables
vercel env add VITE_API_BASE_URL production
vercel env add VITE_ENABLE_ANALYTICS production
```

### 2. Netlify

#### Deploy via Git
1. Connect your repository to Netlify
2. Set build command: `pnpm run build`
3. Set publish directory: `dist`

#### Netlify Configuration
```toml
# netlify.toml
[build]
  command = "pnpm run build"
  publish = "dist"

[build.environment]
  NODE_VERSION = "18"

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200

[context.production.environment]
  VITE_API_BASE_URL = "https://api.autowise.com/v1"
  VITE_APP_ENV = "production"

[context.staging.environment]
  VITE_API_BASE_URL = "https://staging-api.autowise.com/v1"
  VITE_APP_ENV = "staging"
```

### 3. AWS S3 + CloudFront

#### S3 Bucket Setup
```bash
# Create S3 bucket
aws s3 mb s3://autowise-app

# Configure bucket for static website hosting
aws s3 website s3://autowise-app --index-document index.html --error-document index.html

# Upload build files
aws s3 sync dist/ s3://autowise-app --delete
```

#### CloudFront Distribution
```json
{
  "DistributionConfig": {
    "CallerReference": "autowise-app-2024",
    "Origins": [
      {
        "Id": "S3-autowise-app",
        "DomainName": "autowise-app.s3.amazonaws.com",
        "S3OriginConfig": {
          "OriginAccessIdentity": ""
        }
      }
    ],
    "DefaultCacheBehavior": {
      "TargetOriginId": "S3-autowise-app",
      "ViewerProtocolPolicy": "redirect-to-https",
      "TrustedSigners": {
        "Enabled": false,
        "Quantity": 0
      },
      "ForwardedValues": {
        "QueryString": false,
        "Cookies": {
          "Forward": "none"
        }
      }
    },
    "CustomErrorResponses": [
      {
        "ErrorCode": 404,
        "ResponsePagePath": "/index.html",
        "ResponseCode": "200"
      }
    ],
    "Enabled": true
  }
}
```

### 4. Firebase Hosting

#### Setup
```bash
# Install Firebase CLI
npm install -g firebase-tools

# Login to Firebase
firebase login

# Initialize Firebase in your project
firebase init hosting
```

#### Firebase Configuration
```json
// firebase.json
{
  "hosting": {
    "public": "dist",
    "ignore": [
      "firebase.json",
      "**/.*",
      "**/node_modules/**"
    ],
    "rewrites": [
      {
        "source": "**",
        "destination": "/index.html"
      }
    ],
    "headers": [
      {
        "source": "**/*.@(js|css)",
        "headers": [
          {
            "key": "Cache-Control",
            "value": "max-age=31536000"
          }
        ]
      }
    ]
  }
}
```

#### Deploy
```bash
# Build and deploy
pnpm run build
firebase deploy
```

### 5. Docker Deployment

#### Dockerfile
```dockerfile
# Build stage
FROM node:18-alpine as builder

WORKDIR /app
COPY package.json pnpm-lock.yaml ./
RUN npm install -g pnpm
RUN pnpm install --frozen-lockfile

COPY . .
RUN pnpm run build

# Production stage
FROM nginx:alpine

# Copy built assets
COPY --from=builder /app/dist /usr/share/nginx/html

# Copy nginx configuration
COPY nginx.conf /etc/nginx/nginx.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
```

#### Nginx Configuration
```nginx
# nginx.conf
events {
    worker_connections 1024;
}

http {
    include       /etc/nginx/mime.types;
    default_type  application/octet-stream;

    server {
        listen 80;
        server_name localhost;
        root /usr/share/nginx/html;
        index index.html;

        # Enable gzip compression
        gzip on;
        gzip_types text/plain text/css application/json application/javascript text/xml application/xml application/xml+rss text/javascript;

        # Handle client-side routing
        location / {
            try_files $uri $uri/ /index.html;
        }

        # Cache static assets
        location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg)$ {
            expires 1y;
            add_header Cache-Control "public, immutable";
        }

        # Security headers
        add_header X-Frame-Options "SAMEORIGIN" always;
        add_header X-Content-Type-Options "nosniff" always;
        add_header X-XSS-Protection "1; mode=block" always;
    }
}
```

#### Docker Commands
```bash
# Build Docker image
docker build -t autowise-app .

# Run container
docker run -p 80:80 autowise-app

# Docker Compose
docker-compose up -d
```

#### docker-compose.yml
```yaml
version: '3.8'
services:
  autowise-app:
    build: .
    ports:
      - "80:80"
    environment:
      - NODE_ENV=production
    restart: unless-stopped
```

## 🔧 CI/CD Pipeline

### GitHub Actions

#### Build and Deploy Workflow
```yaml
# .github/workflows/deploy.yml
name: Build and Deploy

on:
  push:
    branches: [main, staging]
  pull_request:
    branches: [main]

jobs:
  build:
    runs-on: ubuntu-latest

    steps:
      - name: Checkout code
        uses: actions/checkout@v3

      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '18'
          cache: 'npm'

      - name: Install pnpm
        run: npm install -g pnpm

      - name: Install dependencies
        run: pnpm install --frozen-lockfile

      - name: Run tests
        run: pnpm run test

      - name: Run linting
        run: pnpm run lint

      - name: Build application
        run: pnpm run build
        env:
          VITE_API_BASE_URL: ${{ secrets.API_BASE_URL }}
          VITE_APP_ENV: production

      - name: Upload build artifacts
        uses: actions/upload-artifact@v3
        with:
          name: build-files
          path: dist/

  deploy-staging:
    needs: build
    runs-on: ubuntu-latest
    if: github.ref == 'refs/heads/staging'

    steps:
      - name: Download build artifacts
        uses: actions/download-artifact@v3
        with:
          name: build-files
          path: dist/

      - name: Deploy to Staging
        run: |
          # Deploy to staging environment
          echo "Deploying to staging..."

  deploy-production:
    needs: build
    runs-on: ubuntu-latest
    if: github.ref == 'refs/heads/main'

    steps:
      - name: Download build artifacts
        uses: actions/download-artifact@v3
        with:
          name: build-files
          path: dist/

      - name: Deploy to Production
        run: |
          # Deploy to production environment
          echo "Deploying to production..."
```

### GitLab CI/CD
```yaml
# .gitlab-ci.yml
stages:
  - build
  - test
  - deploy

variables:
  NODE_VERSION: "18"

cache:
  paths:
    - node_modules/

build:
  stage: build
  image: node:18-alpine
  script:
    - npm install -g pnpm
    - pnpm install --frozen-lockfile
    - pnpm run build
  artifacts:
    paths:
      - dist/
    expire_in: 1 hour

test:
  stage: test
  image: node:18-alpine
  script:
    - npm install -g pnpm
    - pnpm install --frozen-lockfile
    - pnpm run test
    - pnpm run lint

deploy-staging:
  stage: deploy
  script:
    - echo "Deploying to staging..."
  only:
    - staging

deploy-production:
  stage: deploy
  script:
    - echo "Deploying to production..."
  only:
    - main
```

## 📊 Performance Optimization

### Build Optimization
```typescript
// vite.config.ts - Advanced optimization
export default defineConfig({
  build: {
    rollupOptions: {
      output: {
        manualChunks: (id) => {
          if (id.includes('node_modules')) {
            if (id.includes('react')) return 'react-vendor';
            if (id.includes('@radix-ui')) return 'ui-vendor';
            return 'vendor';
          }
        }
      }
    },
    chunkSizeWarningLimit: 1000
  }
});
```

### Asset Optimization
```bash
# Install optimization tools
pnpm add -D vite-plugin-compression vite-plugin-pwa

# Image optimization
pnpm add -D vite-plugin-imagemin
```

### Performance Monitoring
```typescript
// src/utils/performance.ts
export const measurePerformance = () => {
  if ('performance' in window) {
    window.addEventListener('load', () => {
      const navigation = performance.getEntriesByType('navigation')[0];
      console.log('Page Load Time:', navigation.loadEventEnd - navigation.loadEventStart);
    });
  }
};
```

## 🔒 Security Configuration

### Content Security Policy
```html
<!-- index.html -->
<meta http-equiv="Content-Security-Policy" content="
  default-src 'self';
  script-src 'self' 'unsafe-inline';
  style-src 'self' 'unsafe-inline';
  img-src 'self' data: https:;
  font-src 'self';
  connect-src 'self' https://api.autowise.com;
">
```

### Security Headers
```nginx
# nginx security headers
add_header Strict-Transport-Security "max-age=31536000; includeSubDomains" always;
add_header X-Frame-Options "SAMEORIGIN" always;
add_header X-Content-Type-Options "nosniff" always;
add_header Referrer-Policy "strict-origin-when-cross-origin" always;
```

## 📈 Monitoring and Analytics

### Error Tracking (Sentry)
```typescript
// src/utils/sentry.ts
import * as Sentry from '@sentry/react';

if (import.meta.env.PROD) {
  Sentry.init({
    dsn: import.meta.env.VITE_SENTRY_DSN,
    environment: import.meta.env.VITE_APP_ENV,
  });
}
```

### Analytics (Google Analytics)
```typescript
// src/utils/analytics.ts
import { gtag } from 'ga-gtag';

export const initAnalytics = () => {
  if (import.meta.env.VITE_ENABLE_ANALYTICS === 'true') {
    gtag('config', import.meta.env.VITE_GA_TRACKING_ID);
  }
};
```

## 🔍 Health Checks

### Health Check Endpoint
```typescript
// src/utils/healthCheck.ts
export const healthCheck = async () => {
  try {
    const response = await fetch('/health');
    return response.ok;
  } catch {
    return false;
  }
};
```

### Uptime Monitoring
```bash
# Simple uptime check script
#!/bin/bash
URL="https://autowise.com"
STATUS=$(curl -s -o /dev/null -w "%{http_code}" $URL)

if [ $STATUS -eq 200 ]; then
  echo "Site is up"
else
  echo "Site is down - Status: $STATUS"
fi
```

## 📋 Deployment Checklist

### Pre-deployment
- [ ] Run all tests
- [ ] Check linting
- [ ] Build successfully
- [ ] Test in staging environment
- [ ] Verify environment variables
- [ ] Check security headers
- [ ] Performance audit

### Post-deployment
- [ ] Verify site loads correctly
- [ ] Test critical user flows
- [ ] Check error monitoring
- [ ] Verify analytics tracking
- [ ] Monitor performance metrics
- [ ] Check SSL certificate
- [ ] Test mobile responsiveness

## 🆘 Troubleshooting

### Common Issues

#### Build Failures
```bash
# Clear cache and reinstall
rm -rf node_modules pnpm-lock.yaml
pnpm install

# Check Node.js version
node --version # Should be 18+
```

#### Deployment Issues
```bash
# Check environment variables
echo $VITE_API_BASE_URL

# Verify build output
ls -la dist/

# Test build locally
pnpm run preview
```

#### Performance Issues
```bash
# Analyze bundle size
pnpm run build --analyze

# Check for large dependencies
npx webpack-bundle-analyzer dist/stats.json
```

---

This deployment guide provides comprehensive instructions for deploying AutoWise to various platforms and environments. Choose the deployment method that best fits your infrastructure and requirements.