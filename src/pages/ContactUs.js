import React from 'react';
import medicalOlympicsImage from '../assets/medical-olympics.svg';
import cmcLogo from '../assets/cmc-logo.svg';
import Navbar from '../components/Navbar';
import './ContactUs.css'; 
import team1 from '../assets/team/team-1.png';
import team2 from '../assets/team/team-2.png';
import team3 from '../assets/team/team-3.png';
import team4 from '../assets/team/team-4.png';
import team5 from '../assets/team/team-5.png';
import team6 from '../assets/team/team-6.png';
import team7 from '../assets/team/team-7.png';
import team8 from '../assets/team/team-8.png';
import team9 from '../assets/team/team-9.png';
import team10 from '../assets/team/team-10.png';
import team11 from '../assets/team/team-11.png';
import team12 from '../assets/team/team-12.png';
import team13 from '../assets/team/team-13.png';
import team14 from '../assets/team/team-14.png';
import team15 from '../assets/team/team-15.png';
import team16 from '../assets/team/team-16.png';
import team17 from '../assets/team/team-17.png';
import team18 from '../assets/team/team-18.png';
import team19 from '../assets/team/team-19.png';
import team20 from '../assets/team/team-20.png';
import team21 from '../assets/team/team-21.png';
import team22 from '../assets/team/team-22.png';
import team23 from '../assets/team/team-23.png';
import team24 from '../assets/team/team-24.png';
import team25 from '../assets/team/team-25.png';
import team26 from '../assets/team/team-26.png';
import team27 from '../assets/team/team-27.png';
import team28 from '../assets/team/team-28.png';
import team29 from '../assets/team/team-29.png';
import team30 from '../assets/team/team-30.png';
import team31 from '../assets/team/team-31.png';
import team32 from '../assets/team/team-32.png';
import team33 from '../assets/team/team-33.png';
import team34 from '../assets/team/team-34.png';
import Footer from '../components/footer';
function ContactUsPage() {
  return (
    <div className="contact-us-page">
      
      <div className="line"></div>
      <div className="team-section">
        <h1 className="team-header">Meet our team</h1>
        <p className="subheading">ORGANISING CHAIRPERSONS</p>
        <div className="team-members">
        <div className="team-member">
        <img src={team1} alt="Team Member 1" />
            <p className='member-name'>Dr. Ebin B Thomas</p>
          </div>
          <div className="team-member">
          <img src={team2} alt="Team Member 2" />
          <p className='member-name'>Dr. Divya Handa</p>
            
          </div>
          
        </div>
      </div>
      <p className="subheading">VICE ORGANISING CHAIRPERSONS</p>
        <div className="team-members">
        <div className="team-member">
        <img src={team3} alt="Team Member 1" />
        <p className='member-name'>Riya Mariam George</p>
          </div>
          <div className="team-member">
          <img src={team4} alt="Team Member 2" />
          <p className='member-name'>David Thomas</p>
          </div>
          </div>
          <p className="subheading">HEADS OF ACADEMICS</p>
        <div className="team-members">
        <div className="team-member">
        <img src={team5} alt="Team Member 1" />
           <p className='member-name'>Dr. Elbe Thomas</p>
          </div>
          <div className="team-member">
          <img src={team6} alt="Team Member 2" />
           <p className='member-name'>Dr. Aleena Mathew</p>
          </div>
          </div>
          <p className="subheading">HEADS OF CULTURALS</p>
        <div className="team-members">
        <div className="team-member">
        <img src={team7} alt="Team Member 1" />
           <p className='member-name'>Dr. Benjamin David</p>
          </div>
          <div className="team-member">
          <img src={team8} alt="Team Member 2" />
           <p className='member-name'>Dr. Meryl Ann George</p>
          </div>
          <div className="team-member">
          <img src={team9} alt="Team Member 2" />
           <p className='member-name'>Dennis Daniel</p>
          </div>
          </div>
          <div className='parent'>
          <p className="subheading">HEADS OF SPORTS</p>
        <div className="team-members-sports">
        <div className="team-member">
        <img src={team10} alt="Team Member 1" />
           <p className='member-name'>Dr. Abhay S K</p>
          </div>
          <div className="team-member">
          <img src={team11} alt="Team Member 2" />
           <p className='member-name'>Dr. Shantanu Bernard</p>
          </div>
          <div className="team-member">
          <img src={team12} alt="Team Member 2" />
           <p className='member-name'>Blesson Pathilchirayil</p>
          </div>
          <div className="team-member">
          <img src={team13} alt="Team Member 2" />
           <p className='member-name'>Dhanya Thomas</p>
          </div>
          </div>
          </div>
          <p className="subheading">HEADS OF FINANCE AND SPONSORSHIP</p>
        <div className="team-members">
        <div className="team-member">
        <img src={team14} alt="Team Member 1" />
           <p className='member-name'>Dr. Abhishek James</p>
          </div>
          <div className="team-member">
          <img src={team15} alt="Team Member 2" />
           <p className='member-name'>Dr. Vishwas Devakumar</p>
          </div>
          <div className="team-member">
          <img src={team16} alt="Team Member 2" />
           <p className='member-name'>Leo John Sudheer</p>
          </div>
          </div>
          <p className="subheading">HEADS OF ACCOMODATION</p>
        <div className="team-members">
        <div className="team-member">
        <img src={team17} alt="Team Member 1" />
           <p className='member-name'>Dr. Anshul Singla</p>
          </div>
          <div className="team-member">
          <img src={team18} alt="Team Member 2" />
           <p className='member-name'>Dr. Ayana K Alex</p>
          </div>
          </div>
          <p className="subheading">HEADS OF SOCIAL NETWORKING AND IT</p>
        <div className="team-members">
        <div className="team-member">
        <img src={team19} alt="Team Member 1" />
           <p className='member-name'>Dr. Nithin Joshy</p>
          </div>
          <div className="team-member">
          <img src={team20} alt="Team Member 2" />
           <p className='member-name'>Dr. Muskan Chaudhary</p>
          </div>
          <div className="team-member">
          <img src={team21} alt="Team Member 2" />
           <p className='member-name'>Jemie Soundarya</p>
          </div>
          </div>
          <p className="subheading">HEADS OF INTERNATIONAL AFFAIRS</p>
        <div className="team-members">
        <div className="team-member">
        <img src={team22} alt="Team Member 1" />
           <p className='member-name'>Dr. Arush E Michael</p>
          </div>
          <div className="team-member">
          <img src={team23} alt="Team Member 2" />
           <p className='member-name'>Dr. Dinah Liz Jacob</p>
          </div>
          </div>
          <p className="subheading">HEADS OF LOGISTICS</p>
        <div className="team-members">
        <div className="team-member">
        <img src={team24} alt="Team Member 1" />
           <p className='member-name'>Dr. Joe James</p>
          </div>
          <div className="team-member">
          <img src={team25} alt="Team Member 2" />
           <p className='member-name'>Dr. Kevin Soju</p>
          </div>
          <div className="team-member">
          <img src={team26} alt="Team Member 2" />
           <p className='member-name'>Aakash R Kumar</p>
          </div>
          </div>
          <p className="subheading">HEADS OF PUBLIC RELATIONS</p>
        <div className="team-members">
        <div className="team-member">
        <img src={team27} alt="Team Member 1" />
           <p className='member-name'>Dr. Malika Gupta</p>
          </div>
          <div className="team-member">
          <img src={team28} alt="Team Member 2" />
           <p className='member-name'>Dr. Carol Clarance</p>
          </div>
          </div>
          <p className="subheading">HEADS OF REFRESHMENTS</p>
        <div className="team-members">
        <div className="team-member">
        <img src={team29} alt="Team Member 1" />
           <p className='member-name'>Dr. Ajay Samuel</p>
          </div>
          <div className="team-member">
          <img src={team30} alt="Team Member 2" />
           <p className='member-name'>Dr. Ankur Moses</p>
          </div>
          <div className="team-member">
          <img src={team34} alt="Team Member 2" />
           <p className='member-name'>Dr. Shasvat</p>
          </div>
          </div>
          <p className="subheading">For further information please contact:</p>
        <div className="team-members-contact">
        <div className="team-member">
           <p className='member-name-bottom'>Dr. Carol Clarance<br></br>7906865903</p>
          </div>
          <div className="team-member">
           <p className='member-name-bottom'>Dr. Malika Gupta<br></br>8728077890</p>
          </div>
          <div className="team-member">
           <p className='member-name-bottom'>Dr. Yukta Ephraim<br></br>7814148649</p>
          </div>
          </div>
          <Footer/>
    </div>
    
    
    
  );
}

export default ContactUsPage;
