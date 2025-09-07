import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { CartProvider } from './context/CartContext';

import Navbar from './components/Navbar/Navbar';
import Footer from './components/Footer/Footer';

import Home from './pages/Home/Home';
import Contact from './pages/Contact/Contact';
import Donation from './pages/Donation/Donation';
import ProductList from './pages/ProductList/ProductList';
import Login from './pages/Login/Login';
import Register from './pages/Register/Register';
import Cart from './pages/Cart/Cart';

import ProtectedRoute from './components/ProtectedRoute';  // 🔐 ProtectedRoute
import BookDetails from './pages/BookDetails/BookDetails'; // 📚 Book Overview

import './styles/App.css';

function App() {
  return (
    <Router>
      <CartProvider>
        <div className="app">
          <Navbar />
          <main>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/contact" element={<Contact />} />

              {/* 🔐 Protected routes */}
              <Route
                path="/donation"
                element={
                  <ProtectedRoute>
                    <Donation />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/cart"
                element={
                  <ProtectedRoute>
                    <Cart />
                  </ProtectedRoute>
                }
              />

              <Route path="/product-list" element={<ProductList />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/books/:id" element={<BookDetails />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </CartProvider>
    </Router>
  );
}

export default App;