import React from 'react';
import delegatesData from '../components/delegatesData';
import Navbar from '../components/Navbar';
import medicalOlympicsImage from '../assets/medical-olympics.svg';
import cmcLogo from '../assets/cmc-logo.svg';
import './InternationalDelegates.css';

function InternationalDelegates() {
  return (
    <div className="int-del">
      <header className="header">
        <img src={medicalOlympicsImage} alt="Medical Olympics Logo" className="logo-left" />
        <div className="center-text">JWC - MEDICAL OLYMPICS 2024</div>
        <img src={cmcLogo} alt="Medical Olympics Logo" className="logo-right" />
      </header>
      <Navbar />
      <div className="international-delegates">
        {delegatesData.map((delegate) => (
          <div key={delegate.id} className="delegate-card">
            <div className="designation">Designation {delegate.id}</div>
            <div className="delegate-info">
              <img src={delegate.image} alt={delegate.name} />
              <div className="delegate-details">
                <h2>{delegate.name}</h2>
                <p>Phone: {delegate.phone}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default InternationalDelegates;
