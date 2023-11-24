// CartPage.js
import React, { useState, useEffect } from 'react';
import './Cart.css';
import { useCart } from '../components/cart';
import medicalOlympicsImage from '../assets/medical-olympics.svg';
import cmcLogo from '../assets/cmc-logo.svg';
import Navbar from '../components/Navbar';
import Footer from '../components/footer';
import '../components/footer.css';

const CartPage = () => {
  const { cartItems, removeFromCart } = useCart();
  const [total, setTotal] = useState(0);

  useEffect(() => {
    // Calculate the total when cartItems change
    const calculateTotal = () => {
      const totalPrice = cartItems.reduce((sum, item) => {
        // Extract numeric value from item.price
        const numericPrice = parseInt(item.price.replace(/\D/g, '')) || 0;
        return sum + numericPrice;
      }, 0);
      setTotal(totalPrice);
    };

    calculateTotal();
  }, [cartItems]);
  
  return (
    <div className="cart-page">
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
      
      {total > 0 && (
        <div className="cart-total">
          <p className='item-total'>Total: Rs {total}</p>
          <button className="pay-button" onClick={() => alert("Payment functionality to be implemented")}>Pay Now</button>
        </div>
      )}

<div className="cart-footer">
        <Footer/>
      </div>
    </div>
  );
};

export default CartPage;
