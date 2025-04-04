import './App.css';
import BookList from './components/BookList';
import CategoryFilter from './components/CategoryFilter';
import WelcomeBand from './layout/WelcomeBand';
import { useState } from 'react';
import { CartProvider } from './context/CartContext';
import CartSummary from './components/CartSummary';
import CartPage from './pages/CartPage';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Footer from './layout/Footer';
import BackToTopButton from './layout/BackToTopButton';
import AdminBooksPage from './components/AdminBooksPage';

function App() {
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);

  return (
    <>
      <Router>
        <CartProvider>
          <div className="container mt-4">
            <div className="row bg-primary text-white">
              <WelcomeBand />
            </div>

            <Routes>
              {' '}
              {/* Define routes here */}
              <Route
                path="/"
                element={
                  <div className="row">
                    {/* Sidebar */}
                    <div className="col-md-3">
                      <CategoryFilter
                        selectedCategories={selectedCategories}
                        setSelectedCategories={setSelectedCategories}
                      />
                    </div>

                    {/* Book list */}
                    <div className="col-md-6">
                      <BookList selectedCategories={selectedCategories} />
                    </div>

                    {/* Cart Summary as a Card */}
                    <div className="col-md-3">
                      <div className="card shadow-sm border-secondary">
                        <div className="card-body">
                          <h5 className="card-title">Cart Summary</h5>
                          <CartSummary />
                        </div>
                      </div>
                    </div>
                  </div>
                }
              />
              <Route path="/cart" element={<CartPage />} />
              <Route path="/admin/books" element={<AdminBooksPage />} />
            </Routes>
          </div>
        </CartProvider>
      </Router>
      <Footer />
      <BackToTopButton />
    </>
  );
}

export default App;
