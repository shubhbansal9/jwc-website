
import medicalOlympicsImage from '../assets/medical-olympics.svg';
import cmcLogo from '../assets/cmc-logo.svg';
import Navbar from '../components/Navbar';
import team17 from '../assets/team/team-17.png';
import './Accommodation.css'; 
import React, { useState } from 'react';
import team18 from '../assets/team/team-18.png';
import Footer from '../components/footer';
import hotel1 from '../assets/hotel-tacksons.jpeg';
import hotel2 from '../assets/hotel-city-lite.jpeg';
import hotel3 from '../assets/hotel-k-classic.jpg';
import { Link } from 'react-router-dom';
function AccommodationCard({ hotelName, imageSrc, roomDetails }) {
  const [showDetails, setShowDetails] = useState(false);

  const handleCardClick = () => {
    setShowDetails(!showDetails);
  };

  return (
    <div className="accommodation-card" onClick={handleCardClick}>
      <img className="acc-image-hotel" src={imageSrc} alt={hotelName} />
      <div className="acc-name">{hotelName}</div>
      {showDetails && (
        <div className="hotel-details">
          {roomDetails.map((detail, index) => (
            <div key={index} className="room-detail">
              <p>{detail.roomType}</p>
              <p>{detail.price}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function AccommodationPage() {
  
  const hotelData = [
    {
      hotelName: 'Hotel Taksons (3 Star)',
      imageSrc: hotel1,
      roomDetails: [
        { roomType: 'Single room', price: '1600rs' },
        { roomType: 'Double occupancy per person', price: '900rs' },
      ],
    },
    {
      hotelName: 'Hotel K Classic (2 Star)',
      imageSrc: hotel2,
      roomDetails: [
        { roomType: 'Single room', price: '900rs' },
        { roomType: 'Double occupancy per person', price: '500rs' },
        { roomType: 'Triple occupancy per person', price: '400rs' },
        { roomType: 'Extra bedding', price: '200rs' },
        { roomType: 'Check-in on 3rd April (6hrs rent)', price: '600rs' },
      ],
    },
    {
      hotelName: 'Hotel City Light (2 Star)',
      imageSrc: hotel3, // You may want to replace this with the actual image
      roomDetails: [
        { roomType: 'Single', price: '1300 per person' },
        { roomType: 'Super deluxe Double', price: '800 per person' },
        { roomType: 'Deluxe Double', price: '700 per person' },
      ],
    },
  ];
  return (
    <div className="accommodation">
     
      <div className="line"></div>
    <div className="accommodation-page">
      <header>
        <h1 className='acc-header'>ACCOMMODATION</h1>
      </header>
      <div className='acc-text'>
    <div className='subtext'>We the “Accommodation Department” warmly welcome you to CMC - Ludhiana on behalf of Medical Olympics. We are here to make your stay safe and comfortable at Ludhiana, our home away from home. </div>
      <div className="bullet-points">
        <ul>
          <li>Location: Keeping it raw and close to our roots - Old Ludhiana is famous for its architecture, and we plan to provide our delegates the accommodation near our campus.<br></br></li>
          <div><br></br></div>
          <li>Amenities: All the essential amenities will be provided in the rooms. Rooms will be equipped with mattresses, fans, tube lights, 24x7 water and electricity supply will be ensured. Cleanliness is our priority. An emergency contact number will be provided in case you experience any difficulty during your stay.<br></br></li>
          <div><br></br></div>
          <li>Pocket Friendly: We will provide rooms on per day and per head basis. Prices will be well within affordable limits. Group stay is available. <br></br></li>
          <div><br></br></div>
          <li>Value for Money: With our accommodation, you are just steps away from events, so that it saves you the hassle of travel or delay due to any other reason.</li>
        </ul>
        <div className='subtext'>All you need to bring is your college ID and BR card at all times during the event and above all, an open heart to new experiences.</div>
        <div className='accomm-apply'>
        <div className='subtext-apply'>If you wish to avail Accommodation, kindly fill in the Google form:</div>
        <Link to="https://forms.gle/uwhqkP9hLtagZkkx8" className="accommodation-link">Accommodation application form</Link>
        </div>
      </div>
      </div>
      <div className="container">
        
        <div className="column-left">
          
          <img className="acc-image" src={team17} alt="Image 1" />
          <div className="acc-name">Dr. Anshul Singla<br></br>Accommodation Head</div>
        </div>
        <div className="column-right">
          
          <img className="acc-image" src={team18} alt="Image 2" />
          <div className="acc-name">Dr. Ayana K Alex<br></br>Accommodation Head</div>
        </div>
      </div>
      <h2 className='acc-header'> ACCOMMODATION FOR NATIONAL DELEGATES</h2>
      <div className="container">
        
        {hotelData.map((hotel, index) => (
          <AccommodationCard key={index} {...hotel} />
        ))}
      </div>
    </div>
    <Footer/>
    </div>
    
  );
}

export default AccommodationPage;
