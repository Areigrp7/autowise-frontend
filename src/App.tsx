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
import { CartProvider } from './context/CartContext'; // Import CartProvider
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
          <CartProvider> {/* Wrap Routes with CartProvider */}
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/parts" element={<PartsSearch />} />
              {/* <Route path="/parts-search" element={<PartsSearch />} /> */}
              <Route path="/shops" element={<ShopsMap />} />
              <Route path="/shops-map" element={<ShopsMap />} />
              <Route path="/quotes" element={<QuoteBidding />} />
              <Route path="/quote-bidding" element={<QuoteBidding />} />
              <Route path="/dashboard" element={<MyGarage />} />
              <Route path="/my-garage" element={<MyGarage />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/register" element={<Register />} /> {/* Add Register route */}
              <Route path="/login" element={<Login />} /> {/* Add Login route */}
              <Route path="/checkout" element={<Checkout />} /> {/* Add Checkout route */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </CartProvider>
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