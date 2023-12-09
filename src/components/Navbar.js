import React, { useState, useEffect, useRef } from 'react';
import './Navbar.css';
import { Link } from 'react-router-dom';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { GoogleLogin } from '@react-oauth/google';
import { jwtDecode } from "jwt-decode";
import { useAuth } from './authContext';
import cart from '../assets/cart-icon.png';
import { useNavigate } from 'react-router-dom';
function Navbar() {
  const { loggedIn, login, logout } = useAuth();
  const [isNavOpen, setIsNavOpen] = useState(false);
  const toggleNav = () => {
    setIsNavOpen(!isNavOpen);
  };
  const [userProfile, setUserProfile] = useState(null);
  const popupRef = useRef(null);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const navigate = useNavigate();

  const navigateToCart = () => {
    navigate('/cart');
  };
  const [showGoogleSignIn, setShowGoogleSignIn] = useState(false);
  const responseGoogle = async response => {
    const decoded = jwtDecode(response.credential);
    console.log(decoded);
    setUserProfile(decoded);
    setShowGoogleSignIn(false);
    login();
    try {
      const response = await fetch('http://localhost:3001/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username: decoded.name, email: decoded.email }),
      });

      const data = await response.json();

      if (data.success) {
        // Registration successful
        console.log('Registration successful');
        login(); // Log in the user on the frontend
      } else {
        // Registration failed
        console.error('Registration failed');
        // Handle the error, show a message, etc.
      }
    } catch (error) {
      console.error('Error:', error);
      // Handle the error, show a message, etc.
    }

    setShowGoogleSignIn(false);
  };




  const closePopup = (e) => {
    if (popupRef.current && !popupRef.current.contains(e.target)) {
      setShowProfileMenu(false);
    }
  };

  // Click outside listener
  useEffect(() => {
    document.addEventListener('mousedown', closePopup);
    return () => {
      document.removeEventListener('mousedown', closePopup);
    };
  }, []);

  return (
    <nav className={`navbar ${isNavOpen ? 'open' : ''}`}>
      <div className="app-drawer-icon" onClick={toggleNav}>
        <div className={`bar ${isNavOpen ? 'open' : ''}`}></div>
        <div className={`bar ${isNavOpen ? 'open' : ''}`}></div>
        <div className={`bar ${isNavOpen ? 'open' : ''}`}></div>
      </div>
      <ul className={`nav-list ${isNavOpen ? 'active' : ''}`}>
        <li>
          <Link to="/" className="nav-button">Home</Link>
        </li>
        <li>
          <Link to="/about" className="nav-button">About</Link>
        </li>
        <li>
          <Link to="/events" className="nav-button">Events</Link>
        </li>
        <li>
          <Link to="/int-delegates" className="nav-button">International Delegates</Link>
        </li>
        <li>
          <Link to="/accommodation" className="nav-button">Accommodation</Link>
        </li>
        <li>
          <Link to="/contact-us" className="nav-button">Contact Us</Link>
        </li>
        <li>
          <Link to="/register" className="nav-button">Register now</Link>
        </li>
      </ul>

      <div>
      {loggedIn ? (
          <div className='profile-container'>
            <img className='cart-icon' src={cart} alt="Profile" onClick={() => navigateToCart('/cart') }/>
            <img className='profile-pic' src={userProfile.picture} alt="Profile" onClick={() => setShowProfileMenu(!showProfileMenu)} />
            {showProfileMenu && (
              <div className='profile-dropdown' ref={popupRef}>
                <Link to="/cart" className='nav-button'>My Bookings</Link>
                <Link to="" className='nav-button' onClick={() => logout()}>Logout</Link>

              </div>
            )}
            
          </div>
        ) : (
      <div className='signin'>

        <button className='sign-in' onClick={() => setShowGoogleSignIn(true)}>
            Sign In with Google
          </button>
          {showGoogleSignIn && (
             <div className='overlay'>
             <div className='popup' ref={popupRef}>
      <GoogleOAuthProvider clientId="1042129033581-ff1kfr8e9143fml673v6rpc9lg60dkhd.apps.googleusercontent.com">
        
        <GoogleLogin 
  onSuccess={responseGoogle}
  onError={() => {
    console.log('Login Failed');
  }}
/></GoogleOAuthProvider>
              </div>
            </div>
      )}
      </div>
        )}
        </div>
      
    </nav>
  );
}


export default Navbar;
