import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import HomePage from './pages/HomePage';
import ShopPage from './pages/ShopPage';
import FreePage from './pages/FreePage';
import ContactPage from './pages/ContactPage';
import ProductDetailPage from './pages/ProductDetailPage';
import Footer from './components/Footer';
import { CartProvider } from './pages/ShopPage';
import CartSlideOut from './components/CartSlideOut';

function App() {
  return (
    <CartProvider>
      <div className="min-h-screen bg-dark-950 text-gray-200">
        <Navbar />
        <CartSlideOut />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/shop" element={<ShopPage />} />
          <Route path="/shop/:slug" element={<ProductDetailPage />} />
          <Route path="/free" element={<FreePage />} />
          <Route path="/contact" element={<ContactPage />} />
        </Routes>
        <Footer />
      </div>
    </CartProvider>
  );
}

export default App;
