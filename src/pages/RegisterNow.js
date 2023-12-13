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
  
  const { loggedIn, userProfile } = useAuth();
  const [expandedWorkshops, setExpandedWorkshops] = useState(Array(workshopsData.length).fill(false));
  const [showPopup, setShowPopup] = useState(false);
  const { addToCart } = useCart();
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
    color: '#FE7EA4',
    textDecoration: 'none'

  };

  const handleClosePopup = () => {
    setSelectedWorkshop(null);
    setShowPopup(false);
    setPopupOpen(false);
  };

  const handleConfirmBooking = async () => {
    if (!selectedWorkshop) {
      console.error('No selected workshop to add to cart.');
      return;
    }
  
    // Make a POST request to add the event to the cart
    try {
      const response = await fetch('http://64.227.156.132:3001/api/add-to-cart', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: userProfile.email,
          eventId: selectedWorkshop.eventId,
        }),
      });
  
      const data = await response.json();
      console.log('Item added to cart:', data);
  
      // Check if the added event has ID 19 or 20
      if (selectedWorkshop.eventId === 27) {
        // Make a request to update BR status to 1
        await fetch('http://64.227.156.132:3001/api/update-br-status', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            email: userProfile.email,
            brStatus: 1,
          }),
        });
      }
      if (selectedWorkshop.eventId === 28) {
        // Make a request to update BR status to 1
        await fetch('http://64.227.156.132:3001/api/update-br-status', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            email: userProfile.email,
            brStatus: 2,
          }),
        });
      }
      setShowPopup(false);
    } catch (error) {
      console.error('Error adding item to cart:', error);
      // Handle errors appropriately
    }
  };
  
  // Function to handle removal of an item from the cart
  

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
                    <p className="price">{workshop.price_in}</p>
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
      <h1 id="terms-and-conditions" className='terms-header'>Terms and Conditions</h1>

<ol className='terms-container'>
  <li className='terms-text'>Entry will not be provided into any workshop or event without Basic Registration (BR).</li>
  <li className='terms-text'>A delegate can register for Workshops, Academic, Cultural or Sports Events only after completion of BR/PR. Payments received for Workshops before completion of Basic/Premium Registration shall be considered invalid. No refund requests shall be entertained for the same.</li>
  <li className='terms-text'>A delegate can register for only one of the workshops per day. if payment is made for more than one workshop, one of the payments shall be deemed valid and remaining invalid at the discretion of the Organising Committee.</li>
  <li className='terms-text'>The Organising Committee reserves the right to make changes to the event schedule if necessary.</li>
  <li className='terms-text'>The delegate must always carry an ID proof (Aadhar card, DL, PAN card or college ID) with themselves during the conference. Entry into any event/workshop shall not be provided without these.</li>
  <li className='terms-text'> The delegate must maintain professional and civil conduct throughout the conference. Any violation of the code of conduct shall lead to immediate expulsion from the event without refunds being issued later.  </li>
  <li className='terms-text'>In the unfortunate event of the conference or Worksop(s) being cancelled due to unforeseen circumstances, only registration amounts for the Workshops, Academic, Cultural and Sports Events shall be refunded. BR/PR fee is a non-refundable amount.</li>
  <li className='terms-text'>The Organising Committee holds the right to terminate the registration of any delegate that violates the above mentioned terms.</li></ol>
<h1 className='terms-header'>FAQs:</h1>

  <p classname="faq-text" style={faqTextStyle}>
 <a style={faqTextStyle} href="https://docs.google.com/document/d/1-rfcYGfWT8M3dbDu_nkuzbMZOgmRk7nkjSqWY3uIJQg/edit" target="_blank" >Check out some of the FAQs</a>
 </p>
<h1 className='terms-header'>Booking Refund/Cancellation</h1>

  <p className='refund-text'>
The refund policy is determined by the event organizer and can vary from Event to Event. The service provider will not make any refunds nor will they be liable for any consequential loss, damage or additional expense whatsoever. We would recommend users to read Terms & Conditions before registration.</p>
      <Footer />

      </div>
      </div>
 
  );
}

export default RegisterNowPage;
