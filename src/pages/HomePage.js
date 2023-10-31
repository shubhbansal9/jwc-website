import React from 'react';
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
function Homepage() {
  
  return (
    <div className="homepage">
      <header className="header">
      <img src={medicalOlympicsImage} alt="Medical Olympics Logo" className="logo-left" />
        <div className="center-text">JWC - MEDICAL OLYMPICS 2024</div>
        <img src={cmcLogo} alt="Medical Olympics Logo" className="logo-right" />
      </header>
      <Navbar />
      <div className="video-box">
        <video
          autoPlay
          loop
          muted
          controls // Show video controls
          className="content-video"
        >
          <source src="your-video.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>
      <div className="register-now-container">
        <img src={registerNow} alt="Register Now" className="register-now" />
      </div>
      <Countdown />
      <EventDetails events={upcomingEvents} />
      <SponsorSection/>
      <Footer/>
    </div>
  );
}

export default Homepage;
