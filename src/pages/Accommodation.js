import React from 'react';
import medicalOlympicsImage from '../assets/medical-olympics.svg';
import cmcLogo from '../assets/cmc-logo.svg';
import Navbar from '../components/Navbar';
import team17 from '../assets/team/team-17.png';
import './Accommodation.css'; 
import team18 from '../assets/team/team-18.png';
import Footer from '../components/footer';
function AccommodationPage() {
  return (
    <div className="accommodation">
     <header className="header">
      <img src={medicalOlympicsImage} alt="Medical Olympics Logo" className="logo-left" />
        <div className="center-text">JWC - MEDICAL OLYMPICS 2024</div>
        <img src={cmcLogo} alt="Medical Olympics Logo" className="logo-right" />
      </header>
      <Navbar />
    <div className="accommodation-page">
      <header>
        <h1 className='acc-header'>ACCOMODATION</h1>
      </header>
      <div className='acc-text'>
    <div className='subtext'>We the “Accommodation Department” warmly welcome you to CMC - Ludhiana on behalf of Medical Olympics. We are here to make your stay safe and comfortable at Ludhiana, our home away from home. </div>
      <div className="bullet-points">
        <ul>
          <li>Location: Keeping it raw and close to our roots - Old Ludhiana is famous for its architecture, and we plan to provide our delegates the accommodation near our campus.<br></br></li>
          <div><br></br></div>
          <li>Amenities: All the essential amenities will be provided in the rooms. Rooms will be equipped with mattresses, fans, tube lights, 24x7 water and electricity supply will be ensured. Cleanliness is our priority. An emergency contact number will be provided in case you experience any difficulty during your stay.<br></br></li>
          <div><br></br></div>
          <li>Pocket Friendly: We will provide rooms on per day and per head basis. Prices will be well within affordable limits. Group stay is available. You will have options to choose from. Pre-registration forms with further details will be provided.<br></br></li>
          <div><br></br></div>
          <li>Value for Money: With our accommodation, you are just steps away from events, so that it saves you the hassle of travel or delay due to any other reason.</li>
        </ul>
        <div className='subtext'>All you need to bring is your college ID and BR card at all times during the event and above all, an open heart to new experiences.</div>
      </div>
      </div>
      <div className="container">
        
        <div className="column-left">
          <div className="name">Dr. Anshul Singla<br></br>Accommodation Head</div>
          <img className="acc-image" src={team17} alt="Image 1" />
        </div>
        <div className="column-right">
          <div className="name">Dr. Ayana K Alex<br></br>Accommodation Head</div>
          <img className="acc-image" src={team18} alt="Image 2" />
        </div>
      </div>
    </div>
    <Footer/>
    </div>
    
  );
}

export default AccommodationPage;
