import React from 'react';
import delegatesData from '../components/delegatesData';
import Navbar from '../components/Navbar';
import medicalOlympicsImage from '../assets/medical-olympics.svg';
import cmcLogo from '../assets/cmc-logo.svg';
import './InternationalDelegates.css';
import Footer from '../components/footer';
import team22 from '../assets/team/team-22.png';
import team23 from '../assets/team/team-23.png';
import itinerary from '../assets/itinerary.png';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../components/authContext';
function InternationalDelegates() {
  const [isExpanded1, setIsExpanded1] = useState(false);
  const [isExpanded2, setIsExpanded2] = useState(false);
  const { loggedIn, userProfile } = useAuth();
  const toggleExpand1 = () => {
    setIsExpanded1(!isExpanded1);
  };

  const toggleExpand2 = () => {
    setIsExpanded2(!isExpanded2);
  };
  

  const addToCart = async (eventId) => {
    if(loggedIn){
    const email = userProfile.email;
    try {
      const addToCartResponse = await fetch('http://174.138.121.198:3001/api/add-to-cart', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, eventId }),
      });
      if (addToCartResponse.ok) {
        alert("Added to cart");
        console.log("added to cart");
        if(eventId===29){
        const updateBRStatusResponse = await fetch('http://174.138.121.198:3001/api/update-br-status', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ email, brStatus: 3 }),
        });
        if (updateBRStatusResponse.ok) {
          // Perform any further actions upon successful update
          // For example, updating UI or showing a success message
        } else {
          console.error('Failed to update BR status');
          // Handle failure to update BR status
        }
      }
      else if(eventId===30){
        const updateBRStatusResponse = await fetch('http://174.138.121.198:3001/api/update-br-status', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ email, brStatus: 4 }),
        });
        if (updateBRStatusResponse.ok) {
          // Perform any further actions upon successful update
          // For example, updating UI or showing a success message
        } else {
          console.error('Failed to update BR status');
          // Handle failure to update BR status
        }
      }
      } else {
        console.error('Failed to add to cart');
        // Handle failure to add to cart
      }
    } catch (error) {
      console.error('Error:', error);
      // Handle other errors
    }}
    else{
      alert("You must be logged in to apply!");
    }
  };
  
  return (
    <div className="int-del-page">
  
      <div className="line"></div>
    <div className="accommodation-page">
    <img className="itinerary" src={itinerary}></img>
    <Link to="https://drive.google.com/file/d/1d44n1Al9UFMhZrCiiLVP7kBWvBx-L5Sh/view?usp=drivesdk" className="itinerarylink">Check out our International Affairs Brochure</Link>
      <header>
        <h1 className='acc-header'>INTERNATIONAL AFFAIRS</h1>
      </header>
      <div className='acc-text'>
    <div className='subtext'>As the Heads of International affairs, we hope that all the incoming delegates from around the globe are excited about Junior World Congress - Medical Olympics, just as we are.<br></br><br></br>

We have planned out a jam-packed itinerary for the international students, which shall not only include the conferences, sports and cultural events of Medical Olympics but also a rural healthcare center visit, hospital postings, a trip to Amritsar and fun activities every evening.<br></br><br></br>

We assure each and every delegate that no second of your time with us shall go to waste, and you shall all return home with memories that will last you a lifetime. So buckle up and join us for Medical Olympics here at CMC - Ludhiana.<br></br></div>
      
      </div>
      <div className="container">
        
        <div className="details-left">
        <img className="acc-image" src={team22} alt="Image 1" />
          <div className="del-name">Dr. Arush E Michael
<br></br>International Affairs Head</div>
         
        </div>
        <div className="details-right">
        <img className="acc-image" src={team23} alt="Image 2" />
          <div className="del-name">Dr. Dinah Liz Jacob<br></br>International Affairs Head</div>
         
        </div>
      </div>
      
      
    </div>
    <div className="container-int-del">
          
            <h2>Registration</h2>
          </div>
          <div className="header-container">
          <div className="column-leftt" onClick={toggleExpand1}>
            <div className="name">OFF - CAMPUS</div>
            <p><div className="bullet-points">
        <ul className='bullet'>
          <li>We offer an ideal downtown location in the heart of the city’s business district
<br></br></li>
          <div><br></br></div>
          <li>Location would be within a 4-5 km radius from the college<br></br></li>
          <div><br></br></div>
          <li>12 day extravaganza!</li>
          <div><br></br></div>
          <li>Basic registration for JWC - Medical Olympics</li>
          <div><br></br></div>
          
          </ul>
          {isExpanded1 && (
        <div className="bullet">
          <p className='expanded'>The basic registration includes:</p>
          <ul>
            <li>Entry to the conference</li>
            <li>Entry to the cultural nights including opening night</li>
            <li>Access to all the free events</li>
            <li>Dinner on Day 1 and Breakfast for 3 days of the conference from 4th - 6th April</li>
            <li>Travel to all the places mentioned in the itinerary</li>
            
          </ul>
          <p className='expanded'>P.S. Travel to the airport for departure not included</p>
        </div>
      )}
        </div></p>
        <a className="apply-button" onClick={() => addToCart(29)}>
        Apply Now!
          </a>
        
          </div>
          <div className="divider"></div>
          <div className="column-rightt" onClick={toggleExpand2}>
            <div className="name">ON - CAMPUS</div>
            <p><div className="bullet-points">
        <ul className='bullet'>
          <li>Easy and quick access to the campus.
<br></br></li>
          <div><br></br></div>
          <li>No transportation required.<br></br></li>
          <div><br></br></div>
          <li>Good stay at low cost.</li>
          <div><br></br></div>
          <li>Being around CMCites and experiencing their life.<br></br></li>
          <div><br></br></div><li>Location would be within a 4-5 km radius from the college</li>
          <div><br></br></div>
          <li>12 day extravaganza!</li>
          <div><br></br></div>
          <li>Basic registration for JWC - Medical Olympics</li>
          

          </ul>
          {isExpanded2 && (
        <div className="bullet">
          <p className='expanded'>The basic registration includes:</p>
          <ul>
            <li>Entry to the conference</li>
            <li>Entry to the cultural nights including opening night</li>
            <li>Access to all the free events</li>
            <li>Dinner on Day 1 and Breakfast for 3 days of the conference from 4th - 6th April</li>
            <li>Travel to all the places mentioned in the itinerary</li>
            
          </ul>
          <p className='expanded'>P.S. Travel to the airport for departure not included</p>
        </div>
      )}
        </div></p>
        <a className="apply-button" onClick={() => addToCart(30)}>
            Apply Now!
          </a>
        
          </div>
        </div>
      

    <Footer/>
    </div>
  );
}

export default InternationalDelegates;
