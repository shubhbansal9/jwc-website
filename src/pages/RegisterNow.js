import React, { useState } from 'react';
import './RegisterNow.css'; // Create a CSS file for styling
import register1 from '../assets/register-basic.png';
import register2 from '../assets/register-prem.png';
import Footer from '../components/footer';
import workshopsData from '../components/workshopData';
import EventDetails from '../components/EventDetails';
import { useCart } from '../components/cart';
import { useAuth } from '../components/authContext';
import ConfirmationPopup from '../components/confirmationPopup';
import regData from '../components/regData';

const RegisterNowPage = () => {
  const [expandedWorkshops, setExpandedWorkshops] = useState(Array(workshopsData.length).fill(false));
  const [showPopup, setShowPopup] = useState(false);
  const { addToCart } = useCart();
  const { loggedIn } = useAuth();
  const handleWorkshopCardClick = (index) => {
    const updatedWorkshops = [...expandedWorkshops];
    
    // Close the previously expanded card
    const previouslyExpandedIndex = updatedWorkshops.findIndex((isExpanded) => isExpanded);
    if (previouslyExpandedIndex !== -1 && previouslyExpandedIndex !== index) {
      updatedWorkshops[previouslyExpandedIndex] = false;
    }
  
    // Toggle the clicked card
    updatedWorkshops[index] = !updatedWorkshops[index];
    setExpandedWorkshops(updatedWorkshops);
  };
  const [popupOpen, setPopupOpen] = useState(false);
  const handleRegisterClick = (workshop) => {
    if (!loggedIn) {
      alert('Kindly login before registering.');
      return;
    }
    setSelectedWorkshop(workshop);
    setShowPopup(true);
  };
  const [selectedWorkshop, setSelectedWorkshop] = useState(null);
  const faqTextStyle = {
    textAlign: 'center',
    color: '#A6113D',
    textDecoration: 'none'

  };

  const handleClosePopup = () => {
    setSelectedWorkshop(null);
    setShowPopup(false);
    setPopupOpen(false);
  };

  const handleConfirmBooking = () => {
    addToCart(selectedWorkshop);
    setShowPopup(false);
  };

  return (
    <div className={`reg-page ${showPopup ? 'popup-open' : ''}`}>
    {showPopup && <div className='overlay'></div>}
    <div className='reg-page'>
      <div className='workshop'>
        <h1 className='workshop-headers'>REGISTRATION</h1>
        <div className="workshop-cards-container">
          <div className="workshop-cards">
            {regData.map((workshop, index) => (
              <div className={`workshop-card ${expandedWorkshops[index] ? 'expanded' : ''}`} key={index} onClick={() => handleWorkshopCardClick(index)}>
                <img src={workshop.image} alt={workshop.title} />
                <div className='workshop-title'>{workshop.title}</div>
                {expandedWorkshops[index] && (
                  <p className='workshop-description' dangerouslySetInnerHTML={{ __html: workshop.description }}/>
                )}
                <div className='workshop-buttons'>
                  <button className='workshop-button' onClick={() => handleRegisterClick(workshop)}>Register</button>
                  <div className="price-rectangle">
                    <p className="price">{workshop.price}</p>
                  </div>
                </div>
                

              </div>
              
            ))}
      </div>
      {showPopup && (
        <ConfirmationPopup workshopDetails={selectedWorkshop} onConfirmBooking={handleConfirmBooking} onClose={handleClosePopup}>
          {/* Customize the content of your popup here */}
          <p>ARE YOU SURE YOU WANT TO ADD THIS EVENT TO THE CART?</p>
        </ConfirmationPopup>
      )}
      </div>
      </div>
      <h1 className='terms-header'>Terms and Conditions</h1>

<ol className='terms-container'>
  <li className='terms-text'>Entry will not be provided into any workshop or event without Basic Registration (BR).</li>
  <li className='terms-text'>A delegate can register for Workshops or Quizzes only after completion of BR. Payments received for Workshops before completion of Basic Registration shall be considered invalid. No refund requests shall be entertained for the same.</li>
  <li className='terms-text'>A delegate can register for only one out of the two major workshops. If payment is made for both the workshops, one of the payments shall be deemed invalid at the discretion of the Organising Committee. No refund requests shall be entertained for the same.</li>
  <li className='terms-text'>A delegate can register for up to 2 minor workshops. If payment is made for more than 2 minor workshops, the excess payments shall be deemed invalid at the discretion of the Organising Committee. No refund requests shall be entertained for the same.</li>
  <li className='terms-text'>The Organising Committee reserves the right to make changes to the event schedule if necessary.</li>
  <li className='terms-text'>The delegate must always carry an ID proof (Aadhar card, DL, PAN card, or college ID) with themselves during the conference. Entry into any event/workshop shall not be provided without these.</li>
  <li className='terms-text'>The delegate must maintain professional and civil conduct throughout the conference. Any violation of the code of conduct shall lead to immediate expulsion from the event with no refunds being issued later.</li>
  <li className='terms-text'>In the unfortunate event of the conference or Workshop(s) being canceled due to unforeseen circumstances, only registration amounts for the Workshops and quizzes shall be refunded. BR fee is a non-refundable amount.</li>
  <li className='terms-text'>The Organising Committee holds the right to terminate the registration of any delegate that violates the above mentioned terms.</li>
</ol>
<h1 className='terms-header'>FAQs:</h1>

  <p classname="faq-text" style={faqTextStyle}>
 <a style={faqTextStyle} href="https://docs.google.com/document/d/1-rfcYGfWT8M3dbDu_nkuzbMZOgmRk7nkjSqWY3uIJQg/edit" target="_blank" >Visit FAQs Document</a>
 </p>
<h1 className='terms-header'>Booking Refund/Cancellation</h1>

  <p className='refund-text'>The refund policy is determined by the event organizer and can vary from Event to Event. The service provider will not make any refunds nor will they be liable for any consequential loss, damage, or additional expense whatsoever. We would recommend users to read Terms & Conditions of every Event before booking the tickets or register for an event.</p>
      <Footer />

      </div>
      </div>
 
  );
}

export default RegisterNowPage;
