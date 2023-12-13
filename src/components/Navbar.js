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
  const { loggedIn, login, logout, userProfile, updateUserProfile } = useAuth();
  const [isNavOpen, setIsNavOpen] = useState(false);
  const toggleNav = () => {
    setIsNavOpen(!isNavOpen);
  };
  const popupRef = useRef(null);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const navigate = useNavigate();
  const userProfilePicture = userProfile ? userProfile.picture : null;
  const navigateToCart = () => {
    navigate('/cart');
  };
  const [showGoogleSignIn, setShowGoogleSignIn] = useState(false);
  const responseGoogle = async response => {
    const decoded = jwtDecode(response.credential);
    console.log(decoded);
    setShowGoogleSignIn(false);

    try {
      const userExistsResponse = await fetch('https://174.138.121.198:3001/api/user-exists', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email: decoded.email }),
      });
      

      const userExistsData = await userExistsResponse.json();

      if (!userExistsData.exists) {
        // If the user does not exist, proceed with registration
        const registerResponse = await fetch('https://174.138.121.198:3001/api/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ username: decoded.name, email: decoded.email }),
        });

        const registerData = await registerResponse.json();

        if (registerData.success) {
          // Registration successful
          console.log('Registration successful');
          login();
          updateUserProfile(decoded);
        } else {
          // Registration failed
          console.error('Registration failed');
          // Handle the error, show a message, etc.
        }
      }
      else{
        login();
        updateUserProfile(decoded);
      }
      } catch (error) {
        console.error('Error:', error);
        // Handle the error, show a message, etc.
      }

      setShowGoogleSignIn(false);
    };

    const [showLocationPopup, setShowLocationPopup] = useState(false);
    const [userLocation, setUserLocation] = useState(null);
  
    const fetchUserLocation = async (email) => {
      let userLocation = null;
      try {
        const response = await fetch(`https://174.138.121.198:3001/api/user-location?email=${email}`);
        const data = await response.json();
        userLocation = data.location;
        setUserLocation(userLocation);
        console.log("location fetched: ", userLocation);
      } catch (error) {
        console.error('Error fetching user location:', error);
      }
      return userLocation;
    };
    
    const updateUserLocation = async (email, location) => {
      try {
        await fetch('https://174.138.121.198:3001/api/update-location', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            email: email,
            location: location,
          }),
        });
        console.log("updated location: ", location);
      } catch (error) {
        console.error('Error updating user location:', error);
      }
    };
    const handleLocationConfirmation = (location) => {
      setShowLocationPopup(false);
      console.log("called");

      if (loggedIn && userProfile && userProfile.email) {
        updateUserLocation(userProfile.email, location);
      
        fetchUserLocation(userProfile.email).then(() => {
          console.log('yo', location);
          if (location === 'India') {
            setShowLocationPopup(false);
            navigate('/register');
          } else if (location === 'Other') {
            setShowLocationPopup(false);
            navigate('/int-delegates');
          } else {
            setShowLocationPopup(true);
          }
        });
      }
      else{
        console.log('yo', location);
        if (location === 'India') {
          setShowLocationPopup(false);
          navigate('/register');
        } else if (location === 'Other') {
          setShowLocationPopup(false);
          navigate('/int-delegates');
        } else {
          setShowLocationPopup(true);
        }
      }
    };
    
  
    const handleRegisterClick = async () => {
      if (!loggedIn || userProfile === null || userProfile.email === null) {
        setShowLocationPopup(true);
      } else {
        try {
          const updatedLocation = await fetchUserLocation(userProfile.email);
          console.log(updatedLocation); // Updated userLocation value
          if (updatedLocation === 'India') {
            setShowLocationPopup(false);
            navigate('/register');
          } else if (updatedLocation === 'Other') {
            setShowLocationPopup(false);
            navigate('/int-delegates');
          } else {
            setShowLocationPopup(true);
          }
        } catch (error) {
          console.error('Error handling user location:', error);
        }
      }
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
           <button className='nav-button-register' onClick={handleRegisterClick}>
            Register now
          </button>
        </li>
      </ul>

      <div>
      {loggedIn ? (
          <div className='profile-container'>
            <img className='cart-icon' src={cart} alt="Profile" onClick={() => navigateToCart('/cart') }/>
            {userProfilePicture && ( // Check if userProfilePicture exists before rendering
            <img className='profile-pic' src={userProfilePicture} alt="Profile" onClick={() => setShowProfileMenu(!showProfileMenu)} />
          )}
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
        {showLocationPopup && (
        <div className="popup-container">
          <div className="popup-content">
            <p>Are you from India?</p>
            <button className="popup-button" onClick={() => handleLocationConfirmation('India')}>
              Yes
            </button>
            <button className="popup-button" onClick={() => handleLocationConfirmation('Other')}>
              No
            </button>
          </div>
        </div>
      )}
    </nav>
  );
}


export default Navbar;
