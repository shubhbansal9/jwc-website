import React from 'react';
import workshopsData from '../components/workshopData';
import medicalOlympicsImage from '../assets/medical-olympics.svg';
import cmcLogo from '../assets/cmc-logo.svg';
import Navbar from '../components/Navbar';
import './EventsPage.css';
import culturalData from '../components/culturalData';
import sportsData from '../components/sportsData';
function EventsPage() {
  return (
    <div className="events-page">
         <header className="header">
      <img src={medicalOlympicsImage} alt="Medical Olympics Logo" className="logo-left" />
        <div className="center-text">JWC - MEDICAL OLYMPICS 2024</div>
        <img src={cmcLogo} alt="Medical Olympics Logo" className="logo-right" />
      </header>
      <Navbar />
      <div className='workshop'>
      <h1>Workshops</h1>
      <div className="workshop-cards">
        {workshopsData.map((workshop, index) => (
          <div className="workshop-card" key={index}>
            <img src={workshop.image} alt={workshop.title} />
            <div className='workshop-title'>{workshop.title}</div>
            
            <p>{workshop.description}</p>
            <div className='workshop-buttons'>
            <button className='workshop-button'>Register</button>
            <div className="price-rectangle">
                <p className="price">{workshop.price}</p>
              </div>
              </div> 
          </div>
          
        ))}
      </div>
      </div>
      <div className='workshop'>
      <h1>Culturals</h1>
      <div className="workshop-cards">
        {culturalData.map((workshop, index) => (
          <div className="workshop-card" key={index}>
            <img src={workshop.image} alt={workshop.title} />
            <div className='workshop-title'>{workshop.title}</div>
            
            <p>{workshop.description}</p>
            <div className='workshop-buttons'>
            <button className='workshop-button'>Register</button>
            <div className="price-rectangle">
                <p className="price">{workshop.price}</p>
              </div>
              </div> 
          </div>
          
        ))}
      </div>
      </div>
      <div className='workshop'>
      <h1>Sports</h1>
      <div className="workshop-cards">
        {sportsData.map((workshop, index) => (
          <div className="workshop-card" key={index}>
            <img src={workshop.image} alt={workshop.title} />
            <div className='workshop-title'>{workshop.title}</div>
            
            <p>{workshop.description}</p>
            <div className='workshop-buttons'>
            <button className='workshop-button'>Register</button>
            <div className="price-rectangle">
                <p className="price">{workshop.price}</p>
              </div>
              </div> 
          </div>
          
        ))}
      </div>
      </div>
    </div>
  );
}

export default EventsPage;
