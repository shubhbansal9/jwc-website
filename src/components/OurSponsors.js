// OurSponsors.js

import React from 'react';
import sponsor1 from '../assets/amsa-logo.jpg';
import sponsor2 from '../assets/sponsor2.png';
import sponsor3 from '../assets/sponsor3.png';
import titleSponsor from '../assets/title-sponsor.jpeg';
import './OurSponsors.css';
const OurSponsors = () => {
  return (
    <div className="our-sponsors">
      <h2 className='our-spons-header'>Our Sponsors</h2>
      <div className="sponsor-row">
      <div className="individual-sponsor">
          <img src={titleSponsor} alt="Sponsor 3" className="title-sponsor" />
          <p className='our-spons-title'>Title Sponsor</p>
        </div>
        <div className='sponsor-first'>
          
        <div className="sponsor-group">
          <img src={sponsor1} alt="Sponsor 1" className="sponsor-image-leftt" />
          <img src={sponsor2} alt="Sponsor 2" className="sponsor-image-left" />
          
        </div>
        <div className="collective-title">
          <p className='our-spons-title-left'>Student Outreach Partners</p>
        </div>
        </div>

        <div className="individual-sponsor">
          <img src={sponsor3} alt="Sponsor 3" className="sponsor-image-right" />
          <p className='our-spons-title'>Logistics Sponsors</p>
        </div>
      </div>
    </div>
  );
};

export default OurSponsors;
