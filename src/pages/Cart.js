// CartPage.js
import React from 'react';
import './Cart.css'; // You can create a separate CSS file for styling
import { useCart } from '../components/cart'; // Make sure to use the correct path
import medicalOlympicsImage from '../assets/medical-olympics.svg';
import cmcLogo from '../assets/cmc-logo.svg';
import Navbar from '../components/Navbar';
import Footer from '../components/footer';
import '../components/footer.css';
const CartPage = () => {
  const { cartItems, removeFromCart } = useCart();

  return (
    <div className="cart-page">
          <header className="header">
      <img src={medicalOlympicsImage} alt="Medical Olympics Logo" className="logo-left" />
        <div className="center-text">JWC - MEDICAL OLYMPICS 2024</div>
        <img src={cmcLogo} alt="Medical Olympics Logo" className="logo-right" />
      </header>
      <Navbar />
      <h1 className='cart-header'>Your Cart</h1>
      {cartItems && cartItems.length > 0 ? (
        <ul className="cart-items">
          {cartItems.map((item, index) => (
            <li key={index} className="cart-item">
              <div className="cart-item-details">
                <p className='item'>{item.title}</p>
                <p className='item'>{item.description}</p>
                <p className='item'>{item.price}</p>
              </div>
              <button onClick={() => removeFromCart(index)}>Remove</button>
            </li>
          ))}
        </ul>
      ) : (
        <p className='cart-text'>Your cart is empty.</p>
      )}
      <div className='cart-footer'>
    <Footer/>
    </div>
    </div>
    
  );
};

export default CartPage;
