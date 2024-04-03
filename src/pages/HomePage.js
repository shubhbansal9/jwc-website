
import Navbar from '../components/Navbar';
import './HomePage.css';
import medicalOlympicsImage from '../assets/medical-olympics.svg';
import cmcLogo from '../assets/cmc-logo.svg';
import Countdown from '../components/countdown';
import registerNow from '../assets/register-now.png';
import upcomingEvents from '../components/eventData'; 
import EventDetails from '../components/EventDetails';
import SponsorSection from '../components/becomeSponsor';
import Footer from '../components/footer';
import vid from '../assets/videos/MEDICAL-OLYMPICS.mp4';
import OurSponsors from '../components/OurSponsors';
import eventItinerary from '../assets/event-itinerary.png';
import { Link } from 'react-router-dom';
import React, { useState, useEffect, useRef } from 'react';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { GoogleLogin } from '@react-oauth/google';
import { jwtDecode } from "jwt-decode";
import { useAuth } from '../components/authContext';
import cart from '../assets/cart-icon.png';
import { useNavigate } from 'react-router-dom';
import leaderboard from '../assets/leaderboard.jpg';

function Homepage() {
  const { loggedIn, login, logout, userProfile, updateUserProfile } = useAuth();
  const targetTime = new Date('2024-01-01T00:00:00'); // Set your target date and time
  const [showLocationPopup, setShowLocationPopup] = useState(false);
  const [userLocation, setUserLocation] = useState(null);
  const navigate = useNavigate();
  const fetchUserLocation = async (email) => {
    let userLocation = null;
    try {
      const response = await fetch(`https://api.jwcmedicalolympics.com/api/user-location?email=${email}`);
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
      await fetch('https://api.jwcmedicalolympics.com/api/update-location', {
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
    if (loggedIn && userProfile && userProfile.email) {
      updateUserLocation(userProfile.email, location);
    
      fetchUserLocation(userProfile.email).then(() => {
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
        console.log(updatedLocation);
        setUserLocation(updatedLocation);
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
  
  

  return (
    <div className="homepage">
      
      <div className="line"></div>
      <div className="video-box">
        <video
          autoPlay
          loop
          muted
          controls
          className="content-video"
        >
          <source src={vid} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>
      <div className='register-now-container'>
      <img src={registerNow} alt="Register Now" className="register-now" />
      </div>
   
      <Countdown/>
      <div className='register-now-button'>
      <button className='nav-register' onClick={handleRegisterClick}>
            Register now
          </button>
          </div>
          {showLocationPopup && (
        <div className="popup-container">
          <div className="popup-content">
            <p>Are you studying in India?</p>
            <button className="popup-button" onClick={() => handleLocationConfirmation('India')}>
              Yes
            </button>
            <button className="popup-button" onClick={() => handleLocationConfirmation('Other')}>
              No
            </button>
          </div>
        </div>
      )}

      <EventDetails events={upcomingEvents} />
      <OurSponsors/>
      <img src={leaderboard} alt="Register Now" className="leaderboard" />
      <SponsorSection/>
      
      <Footer/>
    </div>
  );
}

export default Homepage;
