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
import "leaflet/dist/leaflet.css";

const queryClient = new QueryClient();


const App = () => (
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
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;