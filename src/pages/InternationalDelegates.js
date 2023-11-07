import React from 'react';
import delegatesData from '../components/delegatesData';
import Navbar from '../components/Navbar';
import medicalOlympicsImage from '../assets/medical-olympics.svg';
import cmcLogo from '../assets/cmc-logo.svg';
import './InternationalDelegates.css';
import Footer from '../components/footer';
import team22 from '../assets/team/team-22.png';
import team23 from '../assets/team/team-23.png';
import itinerary from '../assets/itinerary.png'
function InternationalDelegates() {
  return (
    <div className="int-del-page">
   <header className="header">
      <img src={medicalOlympicsImage} alt="Medical Olympics Logo" className="logo-left" />
        <div className="center-text">JWC - MEDICAL OLYMPICS 2024</div>
        <img src={cmcLogo} alt="Medical Olympics Logo" className="logo-right" />
      </header>
      <Navbar />
      <div className="line"></div>
    <div className="accommodation-page">
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
          <div className="name">Dr. Arush E Michael
<br></br>International Affairs Head</div>
          <img className="acc-image" src={team22} alt="Image 1" />
        </div>
        <div className="details-right">
          <div className="name">Dr. Dinah Liz Jacob<br></br>International Affairs Head</div>
          <img className="acc-image" src={team23} alt="Image 2" />
        </div>
      </div>
      <img className="itinerary" src={itinerary}></img>
      
    </div>
    <div className="container-int-del">
          
            <h2>Registration</h2>
          </div>
          <div className="header-container">
          <div className="column-leftt">
            <div className="name">Off-campus</div>
            <p><div className="bullet-points">
        <ul>
          <li>We offer an ideal downtown location in the heart of the city’s business district
<br></br></li>
          <div><br></br></div>
          <li>Location would be within a 4-5 km radius from the college<br></br></li>
          <div><br></br></div>
          </ul>
        </div></p>
        <button className="apply-button">Apply Now!</button>
          </div>
          <div className="divider"></div>
          <div className="column-rightt">
            <div className="name">On campus</div>
            <p><div className="bullet-points">
        <ul>
          <li>Easy and quick access to the campus.
<br></br></li>
          <div><br></br></div>
          <li>No transportation required.<br></br></li>
          <div><br></br></div>
          <li>Good stay at low cost.</li>
          <div><br></br></div>
          <li>Being around CMCites and experiencing their life.<br></br></li>
          <div><br></br></div><li>Location would be within a 4-5 km radius from the college</li>
          </ul>
        </div></p>
        <button className="apply-button">Apply Now!</button>
          </div>
        </div>
      

    <Footer/>
    </div>
  );
}

export default InternationalDelegates;
