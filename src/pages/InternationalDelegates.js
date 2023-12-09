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
function InternationalDelegates() {
  const [isExpanded1, setIsExpanded1] = useState(false);
  const [isExpanded2, setIsExpanded2] = useState(false);

  const toggleExpand1 = () => {
    setIsExpanded1(!isExpanded1);
  };

  const toggleExpand2 = () => {
    setIsExpanded2(!isExpanded2);
  };
  return (
    <div className="int-del-page">
  
      <div className="line"></div>
    <div className="accommodation-page">
    <img className="itinerary" src={itinerary}></img>
    <Link to="https://drive.google.com/file/d/1d44n1Al9UFMhZrCiiLVP7kBWvBx-L5Sh/view?usp=drivesdk" className="itinerarylink">Itinerary Brochure</Link>
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
        {/* <a href="https://forms.gle/8R4hfdBAJDbD6DEX9" class="apply-button">Apply Now!</a> */}
        <a class="apply-button">Apply Now!</a>
        
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
        {/* <a href="https://forms.gle/8R4hfdBAJDbD6DEX9" class="apply-button">Apply Now!</a> */}
        <a class="apply-button">Apply Now!</a>
        
          </div>
        </div>
      

    <Footer/>
    </div>
  );
}

export default InternationalDelegates;
