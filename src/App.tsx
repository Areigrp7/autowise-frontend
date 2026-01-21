import React, { useState, useEffect } from 'react';
import { Toaster } from '@/components/ui/sonner';
import { TooltipProvider } from '@/components/ui/tooltip';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Index from './pages/Index';
import PartsSearch from './pages/PartsSearch';
import ShopsMap from './pages/ShopsMap';
import QuoteBidding from './pages/QuoteBidding';
import Cart from './pages/Cart';
import MyGarage from './pages/MyGarage';
import NotFound from './pages/NotFound';
import Register from './pages/Register'; // Import Register component
import Login from './pages/Login'; // Import Login component
import Checkout from './pages/Checkout'; // Import Checkout component
import CheckoutSuccess from './pages/CheckoutSuccess'; // Import CheckoutSuccess component
import CheckoutCancel from './pages/CheckoutCancel'; // Import CheckoutCancel component
import StripeDebug from './components/StripeDebug'; // Import StripeDebug component
import AdminDashboard from './pages/AdminDashboard'; // Import AdminDashboard component
import RoleSelector from './pages/RoleSelector'; // Import RoleSelector component
import CustomerRegister from './pages/CustomerRegister'; // Import CustomerRegister component
import ShopRegister from './pages/ShopRegister'; // Import ShopRegister component
import ShopProfile from './pages/ShopProfile'; // Import ShopProfile component
import ShopDashboard from './pages/ShopDashboard'; // Import ShopDashboard component
import SubscriptionManagement from './pages/SubscriptionManagement'; // Import SubscriptionManagement component
import AdDashboard from './pages/AdDashboard'; // Import AdDashboard component
import MyShops from './pages/MyShops'; // Import MyShops component
import { CartProvider } from './context/CartContext'; // Import CartProvider
import { AuthProvider } from './context/AuthContext'; // Import AuthProvider
import ProtectedRoute from './components/ProtectedRoute'; // Import ProtectedRoute
import AddToHomeScreenPrompt from './components/AddToHomeScreenPrompt'; // Import AddToHomeScreenPrompt
import "leaflet/dist/leaflet.css";

const queryClient = new QueryClient();

interface BeforeInstallPromptEvent extends Event {
  readonly platforms: Array<string>;
  readonly userChoice: Promise<{outcome: 'accepted' | 'dismissed', platform: string}>;
  prompt(): Promise<void>;
}

const App = () => {
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [showPrompt, setShowPrompt] = useState(false);
  const [isInstalled, setIsInstalled] = useState(false);

  useEffect(() => {
    // Check if app is already installed
    const checkInstalled = () => {
      // Check if running in standalone mode (PWA)
      const isStandalone = window.matchMedia('(display-mode: standalone)').matches;
      // Check if running as PWA on iOS
      const isIOSPWA = (window.navigator as any).standalone === true;

      if (isStandalone || isIOSPWA) {
        setIsInstalled(true);
        return;
      }

      // Check if app was previously installed (user dismissed or installed)
      const installDismissed = localStorage.getItem('pwa-install-dismissed');
      if (installDismissed) {
        const dismissedTime = parseInt(installDismissed);
        const now = Date.now();
        // Show prompt again after 7 days if dismissed
        if (now - dismissedTime > 7 * 24 * 60 * 60 * 1000) {
          localStorage.removeItem('pwa-install-dismissed');
        } else {
          return;
        }
      }
    };

    checkInstalled();

    const handler = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e as BeforeInstallPromptEvent);
      // Only show prompt if not already installed and not recently dismissed
      if (!isInstalled && !localStorage.getItem('pwa-install-dismissed')) {
        setShowPrompt(true);
      }
    };

    window.addEventListener('beforeinstallprompt', handler);

    // Listen for app installation
    window.addEventListener('appinstalled', () => {
      setIsInstalled(true);
      setShowPrompt(false);
      setDeferredPrompt(null);
      localStorage.removeItem('pwa-install-dismissed');
    });

    return () => {
      window.removeEventListener('beforeinstallprompt', handler);
      window.removeEventListener('appinstalled', checkInstalled);
    };
  }, [isInstalled]);

  const handleInstallClick = () => {
    if (deferredPrompt) {
      setShowPrompt(false);
      deferredPrompt.prompt();
      deferredPrompt.userChoice.then((choiceResult) => {
        if (choiceResult.outcome === 'accepted') {
          console.log('User accepted the A2HS prompt');
        } else {
          console.log('User dismissed the A2HS prompt');
        }
        setDeferredPrompt(null);
      });
    }
  };

  const handleClosePrompt = () => {
    setShowPrompt(false);
    // Remember that user dismissed the prompt
    localStorage.setItem('pwa-install-dismissed', Date.now().toString());
  };

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <BrowserRouter>
          <AuthProvider>
            <CartProvider> {/* Wrap Routes with CartProvider */}
              <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/parts" element={<PartsSearch />} />
              {/* <Route path="/parts-search" element={<PartsSearch />} /> */}
              <Route path="/shops" element={<ShopsMap />} />
              <Route path="/shops-map" element={<ShopsMap />} />
              <Route path="/quotes" element={<QuoteBidding />} />
              <Route path="/quote-bidding" element={<QuoteBidding />} />
              <Route path="/dashboard" element={
                <ProtectedRoute allowedRoles={['customer']}>
                  <MyGarage />
                </ProtectedRoute>
              } />
              <Route path="/my-garage" element={
                <ProtectedRoute allowedRoles={['customer']}>
                  <MyGarage />
                </ProtectedRoute>
              } />
              <Route path="/cart" element={
                <ProtectedRoute allowedRoles={['customer']}>
                  <Cart />
                </ProtectedRoute>
              } />
              <Route path="/register" element={<RoleSelector />} /> {/* Role selector for registration */}
              <Route path="/register/customer" element={<CustomerRegister />} /> {/* Customer registration */}
              <Route path="/register/shop" element={<ShopRegister />} /> {/* Shop registration */}
              <Route path="/login" element={<Login />} /> {/* Add Login route */}
              <Route path="/shop/:shopId" element={<ShopProfile />} /> {/* Public shop profile */}
              <Route path="/shop-dashboard" element={
                <ProtectedRoute allowedRoles={['mechanic']}>
                  <ShopDashboard />
                </ProtectedRoute>
              } /> {/* Shop owner dashboard - Shop only */}
              <Route path="/subscription" element={
                <ProtectedRoute allowedRoles={['mechanic']}>
                  <SubscriptionManagement />
                </ProtectedRoute>
              } /> {/* Subscription management - Shop only */}
              <Route path="/ads" element={
                <ProtectedRoute allowedRoles={['mechanic']}>
                  <AdDashboard />
                </ProtectedRoute>
              } /> {/* Advertising dashboard - Shop only */}
              <Route path="/my-shops" element={
                <ProtectedRoute allowedRoles={['mechanic']}>
                  <MyShops />
                </ProtectedRoute>
              } /> {/* My Shops - Shop owners only */}
              <Route path="/checkout" element={<Checkout />} /> {/* Add Checkout route */}
              <Route path="/checkout/success" element={<CheckoutSuccess />} /> {/* Add Checkout Success route */}
              <Route path="/checkout/cancel" element={<CheckoutCancel />} /> {/* Add Checkout Cancel route */}
              <Route path="/stripe-debug" element={<StripeDebug />} /> {/* Add Stripe Debug route */}
              <Route path="/admin" element={
                <ProtectedRoute allowedRoles={['admin']}>
                  <AdminDashboard />
                </ProtectedRoute>
              } /> {/* Admin Dashboard - Admin only */}
              <Route path="*" element={<NotFound />} />
              </Routes>
            </CartProvider>
          </AuthProvider>
        </BrowserRouter>
        <AddToHomeScreenPrompt
          isVisible={showPrompt}
          onClose={handleClosePrompt}
          onInstall={handleInstallClick}
          canManuallyInstall={!deferredPrompt}
        />
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;