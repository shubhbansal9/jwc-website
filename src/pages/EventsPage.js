import React, { useState } from 'react';
import workshopsData from '../components/workshopData';
import medicalOlympicsImage from '../assets/medical-olympics.svg';
import cmcLogo from '../assets/cmc-logo.svg';
import Navbar from '../components/Navbar';
import './EventsPage.css';
import culturalData from '../components/culturalData';
import sportsData from '../components/sportsData';
import workshopImage from '../assets/events.png';
import iternaryImage from '../assets/itinerary.png';
import academicsData from '../components/academicsData';
import Footer from '../components/footer';
import EventDetails from '../components/EventDetails';
import upcomingEvents from '../components/eventData';
import ConfirmationPopup from '../components/confirmationPopup';
import { useCart } from '../components/cart';
import { useAuth } from '../components/authContext';
function EventsPage() {
  const [expandedWorkshops, setExpandedWorkshops] = useState(Array(workshopsData.length).fill(false));
  const [showPopup, setShowPopup] = useState(false);
  const { addToCart } = useCart();
  const { loggedIn } = useAuth();
  const handleWorkshopCardClick = (index) => {
    const updatedWorkshops = [...expandedWorkshops];
    updatedWorkshops[index] = !updatedWorkshops[index];
    setExpandedWorkshops(updatedWorkshops);
    
  };
  const handleRegisterClick = (workshop) => {
    if (!loggedIn) {
      alert('Kindly login before registering.');
      return;
    }
    setSelectedWorkshop(workshop);
    setShowPopup(true);
  };
  const [selectedWorkshop, setSelectedWorkshop] = useState(null);
  

  const handleClosePopup = () => {
    setSelectedWorkshop(null);
    setShowPopup(false);
  };

  const handleConfirmBooking = () => {
    addToCart(selectedWorkshop);
    setShowPopup(false);
  };


  return (
    <div className="events-page">
      
      <div className="line"></div>
      <div className='workshop'>
        <EventDetails events={upcomingEvents} />
        <h1 className='workshop-headers'>WORKSHOPS</h1>
        <div className="workshop-cards-container">
          <div className="workshop-cards">
            {workshopsData.map((workshop, index) => (
              <div className={`workshop-card ${expandedWorkshops[index] ? 'expanded' : ''}`} key={index} onClick={() => handleWorkshopCardClick(index)}>
                <img src={workshop.image} alt={workshop.title} />
                <div className='workshop-title'>{workshop.title}</div>
                {expandedWorkshops[index] && (
                  <p className='workshop-description'>{workshop.description}</p>
                )}
                <div className='workshop-buttons'>
                  <button className='workshop-button' onClick={() => handleRegisterClick(workshop)}>Register</button>
                  <div className="price-rectangle">
                    <p className="price">{workshop.price}</p>
                  </div>
                </div>
                {showPopup && (
        <ConfirmationPopup workshopDetails={selectedWorkshop} onConfirmBooking={handleConfirmBooking} onClose={handleClosePopup}>
          {/* Customize the content of your popup here */}
          <p>ARE YOU SURE YOU WANT TO ADD THIS EVENT TO THE CART?</p>
        </ConfirmationPopup>
      )}

              </div>
            ))}
      </div>
      </div>
      </div>
      <div className='workshop'>
        <h1 className='workshop-headers'>ACADEMICS</h1>
        <div className="workshop-cards-container">
          <div className="workshop-cards">
            {academicsData.map((workshop, index) => (
              <div className={`workshop-card ${expandedWorkshops[index] ? 'expanded' : ''}`} key={index} onClick={() => handleWorkshopCardClick(index)}>
                <img src={workshop.image} alt={workshop.title} />
                <div className='workshop-title'>{workshop.title}</div>
                {expandedWorkshops[index] && (
                  <p className='workshop-description'>{workshop.description}</p>
                )}
                <div className='workshop-buttons'>
                  <button className='workshop-button' onClick={() => handleRegisterClick(workshop)}>Register</button>
                  <div className="price-rectangle">
                    <p className="price">{workshop.price}</p>
                  </div>
                </div>
                {showPopup && (
        <ConfirmationPopup workshopDetails={selectedWorkshop} onConfirmBooking={handleConfirmBooking} onClose={handleClosePopup}>
          {/* Customize the content of your popup here */}
          <p>ARE YOU SURE YOU WANT TO ADD THIS EVENT TO THE CART?</p>
        </ConfirmationPopup>
      )}

              </div>
            ))}
      </div>
      </div>
      </div>
      <div className='workshop'>
        <h1 className='workshop-headers'>CULTURALS</h1>
        <div className="workshop-cards-container">
          <div className="workshop-cards">
            {culturalData.map((workshop, index) => (
              <div className={`workshop-card ${expandedWorkshops[index] ? 'expanded' : ''}`} key={index} onClick={() => handleWorkshopCardClick(index)}>
                <img src={workshop.image} alt={workshop.title} />
                <div className='workshop-title'>{workshop.title}</div>
                {expandedWorkshops[index] && (
                  <p className='workshop-description'>{workshop.description}</p>
                )}
                <div className='workshop-buttons'>
                  <button className='workshop-button' onClick={() => handleRegisterClick(workshop)}>Register</button>
                  <div className="price-rectangle">
                    <p className="price">{workshop.price}</p>
                  </div>
                </div>
                {showPopup && (
        <ConfirmationPopup workshopDetails={selectedWorkshop} onConfirmBooking={handleConfirmBooking} onClose={handleClosePopup}>
          {/* Customize the content of your popup here */}
          <p>ARE YOU SURE YOU WANT TO ADD THIS EVENT TO THE CART?</p>
        </ConfirmationPopup>
      )}

              </div>
            ))}
      </div>
      </div>
      </div>
      <div className='workshop'>
        <h1 className='workshop-headers'>SPORTS</h1>
        <div className="workshop-cards-container">
          <div className="workshop-cards">
            {sportsData.map((workshop, index) => (
              <div className={`workshop-card ${expandedWorkshops[index] ? 'expanded' : ''}`} key={index} onClick={() => handleWorkshopCardClick(index)}>
                <img src={workshop.image} alt={workshop.title} />
                <div className='workshop-title'>{workshop.title}</div>
                {expandedWorkshops[index] && (
                  <p className='workshop-description'>{workshop.description}</p>
                )}
                <div className='workshop-buttons'>
                  <button className='workshop-button' onClick={() => handleRegisterClick(workshop)}>Register</button>
                  <div className="price-rectangle">
                    <p className="price">{workshop.price}</p>
                  </div>
                </div>
                {showPopup && (
        <ConfirmationPopup workshopDetails={selectedWorkshop} onConfirmBooking={handleConfirmBooking} onClose={handleClosePopup}>
          {/* Customize the content of your popup here */}
          <p>ARE YOU SURE YOU WANT TO ADD THIS EVENT TO THE CART?</p>
        </ConfirmationPopup>
      )}

              </div>
            ))}
      </div>
      </div>
      </div>
      <Footer/>
     
      
    </div>
    
  );
}

export default EventsPage;
