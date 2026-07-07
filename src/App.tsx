import { Routes, Route, useLocation } from 'react-router';
import { useEffect } from 'react';
import InkPool from './components/InkPool';
import Navigation from './components/Navigation';
import Footer from './components/Footer';
import BackToTop from './components/BackToTop';
import Home from './pages/Home';
import About from './pages/About';
import Products from './pages/Products';
import Order from './pages/Order';
import Contact from './pages/Contact';

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior });
  }, [pathname]);
  return null;
}

export default function App() {
  return (
    <>
      {/* WebGL background — only on home page for performance */}
      <InkPool />

      {/* Fixed navigation */}
      <Navigation />

      {/* Page-level scroll reset */}
      <ScrollToTop />

      {/* Main content */}
      <main id="main-content" style={{ position: 'relative', zIndex: 2 }}>
        <Routes>
          <Route path="/"        element={<Home />} />
          <Route path="/about"   element={<About />} />
          <Route path="/products" element={<Products />} />
          <Route path="/order"   element={<Order />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </main>

      {/* Footer */}
      <div style={{ position: 'relative', zIndex: 3 }}>
        <Footer />
      </div>

      {/* Back to top button */}
      <BackToTop />
    </>
  );
}
