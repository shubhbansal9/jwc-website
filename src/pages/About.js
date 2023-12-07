import React from 'react';
import medicalOlympicsImage from '../assets/medical-olympics.svg';
import cmcLogo from '../assets/cmc-logo.svg';
import Navbar from '../components/Navbar';
import './About.css';
import Footer from '../components/footer';
import aboutPage from '../assets/about-page.svg';
import chiefPatronImg from '../assets/chief-patron.png';
import patronImg from '../assets/patron.svg';
import chairImg1 from '../assets/org-chair.svg';
import chairImg2 from '../assets/org-chair2.svg';
import vchair1 from '../assets/vchair1.png';
import vchair2 from '../assets/vchair2.png';


function AboutPage() {
  return (
    <div className="about-page">
      
      <div className="line"></div>
      <div className='about'>
        <h1>CHRISTIAN MEDICAL COLLEGE - LUDHIANA</h1>
      <p>The Christian Medical College & Hospital, Ludhiana is an educational and research institution of an all India character established and run by the minority Christian community. Founded in 1894, it was then the first medical school for women in Asia. In 1994, the world's first total face replant surgery was performed in the medical college by Abraham Thomas. First surgical research hub of India is also set up in the medical college in 2019 by National Institute for Health and Care research. CMC Ludhiana became the first educational
institution to launch
telemedicine consultation with the Cleveland Clinic in 2020.<br></br><br></br>

CMC Ludhiana has been a recognized by NMC and has played a pivotal role in various key student-faculty developmental centres. Here, we strive with a bright
motto - "My Work is for a King"</p>
<div className='CMC'>
<img className='CMC-pic' src={aboutPage} alt="CMC-Ludiana" />
</div>
<h3 className="left-header">What is <span className="different-color-text">Medical Olympics</span>?</h3>
      <p>
      Inspired from a combination of aspiration of Medicos & designed like the perseverance of Olympians, Medical Olympics is an International Medical Conference with a fun & sporty touch to it.
 It will be a three day long event to be held in CMC, comprising of various workshops, Competitive Academic events, Keynote Lectures, Fun-filled Cultural events and of course few select Sports as well.
Invites will be sent all across the Globe for Undergraduate Medical students to take part in the Conference, have some leisure time beyond the scope of our medical curriculum and learn fruitfully in an innovative module. Rest Assured, you're gonna love it.
      </p>
      <h3 className="left-header">Message from the <span className="different-color-text">Chief Patron</span></h3>
      <p>
      As we gather here to commemorate a momentous milestone, the 130th anniversary of Christian Medical College Ludhiana, it is with great pride and enthusiasm that I extend my warmest welcome to the International Undergraduate Medical Conference, JWC - Medical Olympics 2024. Our institution's enduring legacy, founded on the principles of compassion and excellence, has stood the test of time for well over a century.<br></br><br></br>

We are thrilled to present this year's conference theme: "Climate Change and its Impact on Global Health." Recognizing the urgent need to address this pressing global challenge, we aim to foster discussions and innovations that pave the way for sustainable healthcare solutions, fostering a healthier planet for generations to come.<br></br><br></br>

As we reflect on the successful hosting of the Junior World Congress in 2019, the sequel, bigger and better JWC - Medical Olympics 2024, is poised to be a platform that not only celebrates the achievements of young medical minds but also fosters a spirit of collaboration and knowledge-sharing that transcends borders and cultures.<br></br><br></br>

I extend my heartfelt gratitude to all the participants, organizers, and partners for their invaluable contributions to this noble endeavor. May this conference serve as a catalyst for impactful change in the world of medicine and beyond.
      </p>
    
      <div className="chief-patron-container">
  <div className="chief-patron-text">
  
  Dr. Jeyaraj D Pandian<br></br>MD DM FRACP FRCP FESO FWSO FNAMS<br></br>Principal (Dean) and Professor of Neurology<br></br>Christian Medical College - Ludhiana<br></br>
President Elect, World Stroke Organization
  </div>
  <div className="image-container">
    <img src={chiefPatronImg} alt="patron" className="patron-image" />
  </div>
</div>
      <h3 className="left-header2">Message from the <span className="different-color-text">Patron</span></h3>
      <p>
      It gives me immense pleasure to extend a warm welcome to the esteemed Junior World Congress (JWC) - Medical Olympics at Christian Medical College Ludhiana, as we proudly celebrate our 130 years of legacy in healthcare and education. <br></br><br></br>

The theme for this year's Congress is 'Climate Change and its Impact on Health,' an urgent call to action that resonates profoundly with our commitment to global well-being. Through a series of workshops and inter-college events, including academic competitions, cultural festivities, and spirited sports activities, we aim to foster a holistic understanding of the multifaceted challenges posed by climate change on human health.<br></br><br></br>

This prestigious gathering of bright young minds from around the world serves as a beacon of collaboration and knowledge exchange, offering a platform to collectively address the critical nexus between environmental dynamics and public health. We believe that through shared learning and interdisciplinary engagement, we can forge a path towards a healthier, sustainable future for all.<br></br><br></br>

Join us in this momentous occasion as we come together to not just learn, but to inspire change and pave the way for a healthier, greener tomorrow.<br></br><br></br>
      </p>
      <div className="chief-patron-container">
  <div className="chief-patron-text">
  Dr. William Bhatti<br></br>Professor and Head<br></br>
Department of Pediatric Surgery<br></br>
  </div>
  <div className="image-container">
    <img src={patronImg} alt="patron" className="patron-image" />
  </div>
</div>
      <h3 className="left-header2">Message from the <span className="different-color-text">Chairpersons</span></h3>
      <p>
      Christian Medical College Ludhiana is all set to joyously celebrate its 130 years of legacy in healing and innovation. On behalf of everyone at CMC, we would like to welcome you all to the JWC Medical Olympics 2024 , an International Undergraduate Medical Conference cum Fest that promises an unforgettable blend of knowledge, fun, and cultural enrichment. This year, we gather to explore the critical theme of "Climate Change and its impact on Health" while offering you a diverse array of experiences.<br></br><br></br>

5 years ago, we splendidly hosted delegates from across the globe in a Congress of Undergraduates namely Junior World Congress. This year, we bring forth to you a bigger, better and stronger platform to showcase your plethora of talents across various formats.<br></br><br></br>
The JWC - Medical Olympics 2024 is not just an event; it's an opportunity to grow, connect,
and celebrate. We can't wait to see you here!<br></br><br></br>
      </p>
      <div className="dual-container">
      <div className="chairpersons-container">
  <img src={chairImg1} alt="patron" className="patron-image" />
    
    <div className="image-container">
    <div className="chairpersons-text">
    Dr. Ebin B Thomas<br></br>
Organizing Chairperson
    </div>
      </div>
  </div>
  <div className="chairpersons-container">
  <img src={chairImg2} alt="patron" className="patron-image" />
    
    <div className="image-container">
    <div className="chairpersons-text">
    Dr. Divya Handa<br></br>
Organizing Chairperson
    </div>
      </div>
  </div>
  <div className="chairpersons-container">
  <img src={vchair1} alt="patron" className="patron-image" />
    
    <div className="image-container">
    <div className="chairpersons-text">
    David Thomas<br></br>
Vice Organizing Chairperson
    </div>
      </div>
  </div>
  <div className="chairpersons-container">
  <img src={vchair2} alt="patron" className="patron-image" />
    <div className="image-container">
    <div className="chairpersons-text">
    Riya Mariam George<br></br>
Vice Organizing Chairperson
    </div>
      
    </div>
  </div>
</div>
    </div>
    <Footer/>
    </div>
    
  );
 
}

export default AboutPage;
