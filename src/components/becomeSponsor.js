import React from 'react';
import './becomeSponsor.css'
import sponsImage from '../assets/spons-img.svg';
const SponsorSection = () => {
  return (
    <div className="sponsor-section">
      <h2>Become a Sponsor</h2>
      <img src={sponsImage} alt="Become a Sponsor" />
      <p>
      Christian medical college Ludhiana has been a pioneer in medical education for more than 125 years. From 4 students back in 1894 to 100 students per batch the journey has been long and fruitful. Today using advanced teaching methods , we aspire to provide and promote medical education to students all over the country and beyond through workshops and
medical conventions.<br></br><br></br>
Medical Olympics 2024 was born with the idea to integrate both medical and co-curricular events under one banner to promote and nurture the minds and bodies of young upcoming doctors both in
India and beyond.<br></br><br></br>
Medical Olympics will include a variety of medical conferences and workshops along with sports and
cultural events occurring across 3 days which will be a common ground for medical students to interact with each other and make connections across India and
beyond.
This is a unique opportunity for you to participate and sponsor a medical event increasing your brand visibility. It also gives you a chance to involve yourself in the community and help in training of the future doctors of this country. Last but not the least multiple benefits for the sponsors are listed based on the level of sponsorship
you wish to provide.
      </p>
      <button href="https://forms.gle/8R4hfdBAJDbD6DEX9" class="apply-now-button">Apply Now!</button>

    </div>
  );
};

export default SponsorSection;
