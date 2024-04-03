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
    alert("Registrations are closed.");
    return;
    // if (!loggedIn) {
    //   alert('Kindly login before registering.');
    //   return;
    // }
    // setSelectedWorkshop(workshop);
    // setShowPopup(true);
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
    alert("Registrations are closed.");
    return;
    if (!selectedWorkshop) {
      console.error('No selected workshop to add to cart.');
      return;
    }
  
    // Make a POST request to add the event to the cart
    try {
      const response = await fetch('https://api.jwcmedicalolympics.com/api/add-to-cart', {
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
        await fetch('https://api.jwcmedicalolympics.com/api/update-br-status', {
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
        await fetch('https://api.jwcmedicalolympics.com/api/update-br-status', {
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
      if (selectedWorkshop.eventId === 34) {
        // Make a request to update BR status to 1
        await fetch('https://api.jwcmedicalolympics.com/api/update-br-status', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            email: userProfile.email,
            brStatus: 5,
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
  <li className='terms-text'>Entry will not be provided into any workshop or event without Basic Registration (BR)/ Premium Registration (PR).</li>
  <li className='terms-text'>A delegate can register for workshops, academic, cultural or sports events only after completion of BR/PR. Payments received for workshops before completion of Basic/Premium Registration shall be considered invalid. No refund requests shall be entertained for the same.</li>
  <li className='terms-text'>A delegate can register for only one of the workshops per day. If payment is made for more than one workshop, one of the payments shall be deemed valid and remaining invalid at the discretion of the organising committee.</li>
  <li className='terms-text'>The organising committee reserves the right to make changes to the event schedule if necessary.</li>
  <li className='terms-text'>The delegate must always carry an ID proof (Aadhar card/Passport, DL, PAN card or college ID) with themselves during the conference. Entry into any event/workshop shall not be provided without these.</li>
  <li className='terms-text'>The delegate must maintain professional and civil conduct throughout the conference. Any violation of the code of conduct shall lead to immediate expulsion from the event without refunds being issued later.</li>
  <li className='terms-text'>In the unfortunate event of the conference or workshop(s) being cancelled due to unforeseen circumstances, only registration amounts for the workshops, academic, cultural and sports events shall be refunded. BR/PR fee is a non-refundable amount.</li>
  <li className='terms-text'>The Organising Committee holds the right to terminate the registration of any delegate that violates the above mentioned terms.</li>
  <p>Refund for other events (Workshops/Academic/Cultural/Sports Events) will be subject to decision of the organising committee based on the time left prior to start of the event.</p>

<p>Refund will be as follows :-<br></br></p>
<p>75% :- If initiated between 1st - 12th March, 2024.<br></br></p>
<p>50% :- if initiated between 13th - 24th March, 2024.<br></br></p>
<p>25% :- if initiated between 25th March - 31st March, 2024.<br></br></p>
<p>No refund will be initiated after 31st March 2024.</p><br></br>
</ol>





<h1 className='terms-header'>FAQs:</h1>

  <p classname="faq-text" style={faqTextStyle}>
 <a style={faqTextStyle} href="https://drive.google.com/file/d/1-Pfn4X6wPhBroDHu-ChQHOitb7_i-ESp/view?usp=drivesdk" target="_blank" >Check out some of the FAQs</a>
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
