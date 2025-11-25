import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Link, useLocation } from 'react-router-dom';
import {
  Search,
  ShoppingCart,
  User,
  Menu,
  Car,
  Wrench,
  MapPin,
  Calendar,
  Star,
  Shield,
  Truck,
  Phone,
  Mail,
  Facebook,
  Twitter,
  Instagram,
  Youtube,
  ExternalLink
} from 'lucide-react';
import { useCart } from '../context/CartContext'; // Import useCart

interface LayoutProps {
  children: React.ReactNode;
  currentPage?: string;
}

export default function Layout({ children, currentPage }: LayoutProps) {
  const location = useLocation();
  const { getCartTotalQuantity } = useCart(); // Use the cart hook
  const cartQuantity = getCartTotalQuantity();

  const isActive = (path: string) => {
    if (path === '/' && location.pathname === '/') return true;
    if (path !== '/' && location.pathname.includes(path)) return true;
    return false;
  };

  const handleSupportLink = (section: string) => {
    // For demo purposes, show alert with the section
    // In a real app, these would navigate to actual pages
    switch (section) {
      case 'help-center':
        alert('Help Center - Access our comprehensive FAQ, tutorials, and troubleshooting guides.');
        break;
      case 'contact-us':
        alert('Contact Us - Get in touch with our customer support team via phone, email, or live chat.');
        break;
      case 'warranty-claims':
        alert('Warranty Claims - File a warranty claim for parts or services purchased through AutoWise.');
        break;
      case 'returns':
        alert('Returns - Process returns for eligible parts and get refunds or exchanges.');
        break;
      case 'about-us':
        alert('About Us - Learn about AutoWise mission to revolutionize automotive parts and services.');
        break;
      case 'careers':
        alert('Careers - Join our team! View open positions in engineering, sales, and customer service.');
        break;
      case 'privacy-policy':
        alert('Privacy Policy - Read our comprehensive privacy policy and data protection practices.');
        break;
      case 'terms-of-service':
        alert('Terms of Service - Review the terms and conditions for using AutoWise platform.');
        break;
      default:
        alert(`${section} - This feature will be available soon.`);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link to="/" className="flex items-center space-x-2">
              <img src="/autowise_logo_transparent.webp" alt="AutoWise Logo" className="h-28" />
            </Link>

            {/* Navigation */}
            <nav className="hidden md:flex items-center space-x-8">
              <Link
                to="/"
                className={`text-sm font-medium transition-colors hover:text-blue-600 ${
                  isActive('/') ? 'text-blue-600' : 'text-gray-700'
                }`}
              >
                Home
              </Link>
              <Link
                to="/parts-search"
                className={`text-sm font-medium transition-colors hover:text-blue-600 ${
                  isActive('/parts') ? 'text-blue-600' : 'text-gray-700'
                }`}
              >
                Parts Search
              </Link>
              <Link
                to="/shops-map"
                className={`text-sm font-medium transition-colors hover:text-blue-600 ${
                  isActive('/shops') ? 'text-blue-600' : 'text-gray-700'
                }`}
              >
                Find Shops
              </Link>
              <Link
                to="/quote-bidding"
                className={`text-sm font-medium transition-colors hover:text-blue-600 ${
                  isActive('/quote') ? 'text-blue-600' : 'text-gray-700'
                }`}
              >
                Get Quotes
              </Link>
              <Link
                to="/my-garage"
                className={`text-sm font-medium transition-colors hover:text-blue-600 ${
                  isActive('/my-garage') || isActive('/dashboard') ? 'text-blue-600' : 'text-gray-700'
                }`}
              >
                My Garage
              </Link>
            </nav>

            {/* Right side */}
            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="sm">
                <Search className="h-4 w-4" />
              </Button>
              <Link to="/cart">
                <Button variant="ghost" size="sm" className="relative">
                  <ShoppingCart className="h-4 w-4" />
                  {cartQuantity > 0 && (
                    <Badge variant="destructive" className="absolute -top-2 -right-2 h-5 w-5 flex items-center justify-center text-xs">
                      {cartQuantity}
                    </Badge>
                  )}
                </Button>
              </Link>
              <Button variant="ghost" size="sm">
                <User className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="sm" className="md:hidden">
                <Menu className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1">
        {children}
      </main>

      {/* Footer */}
      <footer className="bg-gray-900 text-white">
        <div className="container mx-auto px-4 py-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Company Info */}
            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <Car className="h-6 w-6 text-blue-400" />
                <span className="text-xl font-bold">AutoWise</span>
              </div>
              <p className="text-gray-400 text-sm">
                Your trusted partner for automotive parts and services. Find the best deals and connect with verified mechanics in your area.
              </p>
              <div className="flex space-x-4">
                <Button variant="ghost" size="sm" className="text-gray-400 hover:text-white p-2">
                  <Facebook className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="sm" className="text-gray-400 hover:text-white p-2">
                  <Twitter className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="sm" className="text-gray-400 hover:text-white p-2">
                  <Instagram className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="sm" className="text-gray-400 hover:text-white p-2">
                  <Youtube className="h-4 w-4" />
                </Button>
              </div>
            </div>

            {/* Support Links */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Support</h3>
              <ul className="space-y-2">
                <li>
                  <button
                    onClick={() => handleSupportLink('help-center')}
                    className="text-gray-400 hover:text-white text-sm transition-colors cursor-pointer flex items-center gap-1"
                  >
                    Help Center
                    <ExternalLink className="h-3 w-3" />
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => handleSupportLink('contact-us')}
                    className="text-gray-400 hover:text-white text-sm transition-colors cursor-pointer flex items-center gap-1"
                  >
                    Contact Us
                    <Phone className="h-3 w-3" />
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => handleSupportLink('warranty-claims')}
                    className="text-gray-400 hover:text-white text-sm transition-colors cursor-pointer flex items-center gap-1"
                  >
                    Warranty Claims
                    <Shield className="h-3 w-3" />
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => handleSupportLink('returns')}
                    className="text-gray-400 hover:text-white text-sm transition-colors cursor-pointer flex items-center gap-1"
                  >
                    Returns
                    <Truck className="h-3 w-3" />
                  </button>
                </li>
              </ul>
            </div>

            {/* Company Links */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Company</h3>
              <ul className="space-y-2">
                <li>
                  <button
                    onClick={() => handleSupportLink('about-us')}
                    className="text-gray-400 hover:text-white text-sm transition-colors cursor-pointer"
                  >
                    About Us
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => handleSupportLink('careers')}
                    className="text-gray-400 hover:text-white text-sm transition-colors cursor-pointer"
                  >
                    Careers
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => handleSupportLink('privacy-policy')}
                    className="text-gray-400 hover:text-white text-sm transition-colors cursor-pointer"
                  >
                    Privacy Policy
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => handleSupportLink('terms-of-service')}
                    className="text-gray-400 hover:text-white text-sm transition-colors cursor-pointer"
                  >
                    Terms of Service
                  </button>
                </li>
              </ul>
            </div>

            {/* Contact Info */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Get in Touch</h3>
              <div className="space-y-3">
                <div className="flex items-center space-x-2 text-sm text-gray-400">
                  <Phone className="h-4 w-4" />
                  <span>1-800-AUTO-WISE</span>
                </div>
                <div className="flex items-center space-x-2 text-sm text-gray-400">
                  <Mail className="h-4 w-4" />
                  <span>support@autowise.com</span>
                </div>
                <div className="flex items-start space-x-2 text-sm text-gray-400">
                  <MapPin className="h-4 w-4 mt-0.5" />
                  <span>123 Auto Street<br />Car City, CC 12345</span>
                </div>
              </div>

              {/* Newsletter Signup */}
              <div className="space-y-2">
                <h4 className="text-sm font-medium">Stay Updated</h4>
                <div className="flex space-x-2">
                  <Input
                    placeholder="Enter your email"
                    className="bg-gray-800 border-gray-700 text-white placeholder-gray-400 text-sm"
                  />
                  <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
                    Subscribe
                  </Button>
                </div>
              </div>
            </div>
          </div>

          <Separator className="my-8 bg-gray-800" />

          {/* Bottom Footer */}
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="text-sm text-gray-400">
              © 2024 AutoWise. All rights reserved.
            </div>
            <div className="flex items-center space-x-6 text-sm text-gray-400">
              <div className="flex items-center space-x-1">
                <Shield className="h-4 w-4" />
                <span>Secure Shopping</span>
              </div>
              <div className="flex items-center space-x-1">
                <Star className="h-4 w-4" />
                <span>Trusted Reviews</span>
              </div>
              <div className="flex items-center space-x-1">
                <Truck className="h-4 w-4" />
                <span>Fast Shipping</span>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}