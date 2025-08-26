import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Navbar from './components/Navbar/Navbar';
import Footer from './components/Footer/Footer';

import Home from './pages/Home/Home';
import Contact from './pages/Contact/Contact';
import Donation from './pages/Donation/Donation';
import ProductList from './pages/ProductList/ProductList';
import Login from './pages/Login/Login';   // ✅ new import

import './styles/App.css';

function App() {
  return (
    <Router>
      <div className="app">
        <Navbar />
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/donation" element={<Donation />} />
            <Route path="/product-list" element={<ProductList />} />
            <Route path="/login" element={<Login />} />  {/* ✅ new route */}
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;