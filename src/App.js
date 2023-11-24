import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage';
import Navbar from './components/Navbar';
import AboutPage from './pages/About';
import EventsPage from './pages/EventsPage';
import InternationalDelegates from './pages/InternationalDelegates';
import ContactUsPage from './pages/ContactUs';
import AccommodationPage from './pages/Accommodation';
import CartPage from './pages/Cart';
import CartProvider from './components/cart';
import medicalOlympicsImage from './assets/medical-olympics.svg';
import cmcLogo from './assets/cmc-logo.svg';
import { AuthProvider } from './components/authContext';
import { useAuth } from './components/authContext';

function App() {
  return (
    <Router>
      <header className="header">
      <img src={medicalOlympicsImage} alt="Medical Olympics Logo" className="logo-left" />
        <div className="center-text">JWC - MEDICAL OLYMPICS 2024</div>
        <img src={cmcLogo} alt="Medical Olympics Logo" className="logo-right" />
      </header>
      <AuthProvider>
      <Navbar/>
      <CartProvider>
        <div>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/events" element={<EventsPage />} />
            <Route path="/int-delegates" element={<InternationalDelegates />} />
            <Route path="/contact-us" element={<ContactUsPage />} />
            <Route path="/accommodation" element={<AccommodationPage />} />
            <Route path="/cart" element={<CartPage />} />
          </Routes>
        </div>
      </CartProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;
