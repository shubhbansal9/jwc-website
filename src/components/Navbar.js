import React, { useState, useEffect, useRef } from 'react';
import './Navbar.css';
import { Link } from 'react-router-dom';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { GoogleLogin } from '@react-oauth/google';
import { jwtDecode } from "jwt-decode";
function Navbar() {
  const [isNavOpen, setIsNavOpen] = useState(false);

  const toggleNav = () => {
    setIsNavOpen(!isNavOpen);
  };
  const [loggedIn, setLoggedIn] = useState(false);
  const [userProfile, setUserProfile] = useState(null);
  const popupRef = useRef(null);

 

  const [showGoogleSignIn, setShowGoogleSignIn] = useState(false);
  const responseGoogle = response => {
    const decoded = jwtDecode(response.credential);
    setUserProfile(decoded);
    setLoggedIn(true);
    setShowGoogleSignIn(false);
  };

  const closePopup = (e) => {
    if (popupRef.current && !popupRef.current.contains(e.target)) {
      setShowGoogleSignIn(false);
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
          <Link to="/contact-us" className="nav-button">Register now</Link>
        </li>
      </ul>

      <div>
      {loggedIn ? (
        <img className='profile-pic' src={userProfile.picture} alt="Profile" />
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
