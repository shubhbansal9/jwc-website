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
import vid from '../assets/videos/MEDICAL-OLYMPICS.mp4';
import OurSponsors from '../components/OurSponsors';
import eventItinerary from '../assets/event-itinerary.png';
import { Link } from 'react-router-dom';
function Homepage() {
  const targetTime = new Date('2024-01-01T00:00:00'); // Set your target date and time

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
      
      <Link to="/register">
      <div className='register-now-container'>
      <img src={registerNow} alt="Register Now" className="register-now" />
      </div>
    </Link>
   
      <Countdown/>


      <EventDetails events={upcomingEvents} />
      <OurSponsors/>
      <SponsorSection/>
      
      <Footer/>
    </div>
  );
}

export default Homepage;
