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
    {/* <div className="card-container">
      <div className="reg-cards-container">
          <div className="reg-cards">
         
              <div className="reg-card">
                <img src={register1} alt="" />
                <div className='reg-title'>Secure your spot with Basic Registration (BR)</div>
                  <p className='reg-description'><ul>
  <li><strong>Conference Access:</strong> Your ticket to the heart of the action – the Conference! - Conference Access</li>
  <li><strong>Unique BR ID:</strong> Your golden key! Unlock a world of possibilities by registering for regs, Academic Sessions, Cultural Extravaganzas, and Sports Showdowns. - Unique BR ID</li>
  <li><strong>Showcase Your Talent:</strong> BR opens the door for you to submit your outstanding Abstracts and Documentaries. - Showcase Your Talent</li>
  <li><strong>Spectator Access:</strong> Be everywhere! Witness all campus events, excluding the exclusive Gala Night and Pediatric Autism Awareness Fundraiser. - Spectator Access</li>
  <li><strong>Sunburn DJ Night:</strong> Groove into the night! BR grants you access to the electrifying Sunburn DJ Night on Day 3 of the Conference. - Sunburn DJ Night</li>
</ul>
</p>
                
                <div className='reg-buttons'>
                  <button className='reg-button' >
                    Register
                  </button>
                  <div className="price-rectangle">
                    <p className="price">Rs1000</p>
                  </div>
                </div>
               

              
              </div>
              <div className="reg-card">
                <img src={register2} alt="" />
                <div className='reg-title'>Elevate your experience with a Premium Package!</div>
                  <p className='reg-description'>
                  <ul>
  <li><strong>All BR Perks:</strong> Dive into the heart of the event with the Premium Package, enjoying all the benefits that Basic Registration offers.</li>
  <li><strong>Gala Night Access (Day 1):</strong> Elevate your evening! Join the exclusive Gala Night on Day 1, a gathering of elegance and entertainment.</li>
  <li><strong>Gala Night Dinner:</strong> Savor the moment! Your Premium Package includes an exquisite Gala Night Dinner, a feast for both the senses and the soul.</li>
  <li><strong>Breakfast Inclusions:</strong> Fuel your mornings! Enjoy a complimentary breakfast for all three days, setting the tone for each exciting event.</li>
  <li><strong>Meal Coupons:</strong> Your discretion, your choice! You receive meal coupons to be used as per your preferences throughout the event.</li>
</ul>

</p>
                
                <div className='reg-buttons'>
                  <button className='reg-button' >
                    Register
                  </button>
                  <div className="price-rectangle">
                    <p className="price">Rs1500</p>
                  </div>
                </div>
                </div>
      </div>
      
      </div>
      </div> */}
      <Footer />

      </div>
 
  );
}

export default RegisterNowPage;
