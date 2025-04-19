import { lazy } from 'react';
import { Routes, Route } from 'react-router-dom';
import ProductCatalog from './pages/products/ProductCatalog';
import About from './pages/about/About';
import BookingsPage from './pages/bookings/Bookings';
import TestimonialsPage from './pages/testimonials/TestimonialsPage';
import Contact from './pages/contact/Contact';
import OrderStatus from './pages/order/OrderStatus'; // also cart page
import { CheckoutForm } from "./pages/checkout/CheckoutForm";
import Home from './pages/home/Home';
import Hire from './pages/hire/Hire';
import Training from './pages/training/Training';
import Apprenticeship from './pages/training/Apprenticeship';
import Workshops from './pages/training/Workshops';
import Careers from './pages/training/Careers';

// Lazy load components
const NotFoundPage = lazy(() => import('./pages/errors/NotFoundPage'));

export default function AppRoutes() {
  return (
    <Routes>
      {/* For Clients who visit the website */}
      <Route path="/" element={<Home />} /> {/* 🔴 Most Priority */}
      <Route path="/testimonials" element={<TestimonialsPage />} /> {/* 🟢 Least Priority */}
      <Route path="/about" element={<About />} /> {/* 🟢 Least Priority */}
      <Route path="/products" element={<ProductCatalog />} /> {/* 🔴 Most Priority */}
      <Route path='/booking' element={<BookingsPage />} /> {/* 🟡 Medium Priority */}
      <Route path='/hire' element={<Hire />} /> {/* 🟡 Medium Priority */}
      <Route path='/training' element={<Training />} /> {/* 🟡 Medium Priority */}
      <Route path='/training/apprenticeship' element={<Apprenticeship />} /> {/* 🟡 Medium Priority */}
      <Route path='/training/workshops' element={<Workshops />} /> {/* 🟡 Medium Priority */}
      <Route path='/training/careers' element={<Careers />} /> {/* 🟡 Medium Priority */}
      {/* <Route path="/gallery" element={<GalleryPage />} /> */} {/* 🟢 Least Priority (Currently commented) */}
      <Route path="/contact" element={<Contact />} /> {/* 🟡 Medium Priority */}

      {/* For the Clients - Functional Pages: Payments and Bookings */}
      <Route path="/order/:status" element={<OrderStatus />} /> {/* 🔴 Most Priority */}
      <Route path="/cart" element={<OrderStatus />} /> {/* 🔴 Most Priority */}
      <Route path="/checkout" element={<OrderStatus />} /> {/* 🟡 Medium Priority */}
      <Route path="/checkout" element={<CheckoutForm />} /> {/* 🔴 Most Priority */}
      
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}