import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { HomePage } from './pages/HomePage';
import { CategoriesPage } from './pages/CategoriesPage';
import { AllProductsPage } from './pages/AllProductsPage';
import { AllSalesPage } from './pages/AllSalesPage';
import { ProductCategoryPage } from './pages/ProductCategoryPage';
import { ProductPage } from './pages/ProductPage';
import { NotFoundPage } from './pages/NotFoundPage';
import { CartPage } from './pages/CartPage';
import { Header } from './components/Header';
import { Footer } from './components/Footer';

function App() {
  return (
    <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/categories" element={<CategoriesPage />} />
          <Route path="/products" element={<AllProductsPage />} />
          <Route path="/sales" element={<AllSalesPage />} />
          <Route path="/categories/:title" element={<ProductCategoryPage />} />
          <Route path="/products/:id" element={<ProductPage />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
        <Footer />
    </BrowserRouter>
  );
}

export default App;
