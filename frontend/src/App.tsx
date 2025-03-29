import './App.css';
import BookList from './components/BookList';
import CategoryFilter from './components/CategoryFilter';
import WelcomeBand from './components/WelcomeBand';
import { useState } from 'react';
import { CartProvider } from './context/CartContext';
import CartSummary from './components/CartSummary';
import CartPage from './pages/CartPage';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Footer from './components/Footer';
import BackToTopButton from './components/BackToTopButton';

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

            <div className="row">
              <div className="col-12 text-end">
                <CartSummary />
              </div>
            </div>

            <Routes>
              {' '}
              {/* Define routes here */}
              <Route
                path="/"
                element={
                  <div className="row">
                    <div className="col-md-3">
                      <CategoryFilter
                        selectedCategories={selectedCategories}
                        setSelectedCategories={setSelectedCategories}
                      />
                    </div>

                    <div className="col-md-9">
                      <BookList selectedCategories={selectedCategories} />
                    </div>
                  </div>
                }
              />
              <Route path="/cart" element={<CartPage />} />
            </Routes>
          </div>
        </CartProvider>
      </Router>
      <Footer/>
      <BackToTopButton/>
    </>
  );
}

export default App;
