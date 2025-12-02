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

  useEffect(() => {
    const handler = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e as BeforeInstallPromptEvent);
      setShowPrompt(true);
    };

    window.addEventListener('beforeinstallprompt', handler);

    return () => {
      window.removeEventListener('beforeinstallprompt', handler);
    };
  }, []);

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
        />
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;