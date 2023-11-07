import React, { useState } from 'react';
import workshopsData from '../components/workshopData';
import medicalOlympicsImage from '../assets/medical-olympics.svg';
import cmcLogo from '../assets/cmc-logo.svg';
import Navbar from '../components/Navbar';
import './EventsPage.css';
import culturalData from '../components/culturalData';
import sportsData from '../components/sportsData';
import workshopImage from '../assets/events.png';
import iternaryImage from '../assets/itenary.png';
import academicsData from '../components/academicsData';
import Footer from '../components/footer';


function EventsPage() {
  const [expandedWorkshops, setExpandedWorkshops] = useState(Array(workshopsData.length).fill(false));

  const handleWorkshopCardClick = (index) => {
    const updatedWorkshops = [...expandedWorkshops];
    updatedWorkshops[index] = !updatedWorkshops[index];
    setExpandedWorkshops(updatedWorkshops);
  };

  return (
    <div className="events-page">
         <header className="header">
      <img src={medicalOlympicsImage} alt="Medical Olympics Logo" className="logo-left" />
        <div className="center-text">JWC - MEDICAL OLYMPICS 2024</div>
        <img src={cmcLogo} alt="Medical Olympics Logo" className="logo-right" />
      </header>
      <Navbar />
      <div className="line"></div>
      <div className='workshop'>
      <img src={iternaryImage} alt="Medical Olympics Logo" className="image" />
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
      <div className='workshop'>
      <h1 className='workshop-headers'>CULTURALS</h1>
      <div className="workshop-cards">
        {culturalData.map((workshop, index) => (
          <div className={`workshop-card ${expandedWorkshops[index] ? 'expanded' : ''}`} key={index} onClick={() => handleWorkshopCardClick(index)}>
            <img src={workshop.image} alt={workshop.title} />
            <div className='workshop-title'>{workshop.title}</div>
            {expandedWorkshops[index] && (
              <p className='workshop-description'>{workshop.description}</p>
            )}
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
      <h1 className='workshop-headers'>SPORTS</h1>
      <div className="workshop-cards">
        {sportsData.map((workshop, index) => (
          <div className={`workshop-card ${expandedWorkshops[index] ? 'expanded' : ''}`} key={index} onClick={() => handleWorkshopCardClick(index)}>
            <img src={workshop.image} alt={workshop.title} />
            <div className='workshop-title'>{workshop.title}</div>
            {expandedWorkshops[index] && (
              <p className='workshop-description'>{workshop.description}</p>
            )}
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
      <Footer/>
    </div>
    
  );
}

export default EventsPage;
