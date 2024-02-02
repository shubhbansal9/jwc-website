import React from 'react';
import './footer.css';
import cmcLogo from '../assets/medical-olympics.svg'
import facebookIcon from '../assets/facebook.svg';
import instagramIcon from '../assets/instagram.svg';
import twitterIcon from '../assets/x-twitter.svg';
import linkedinIcon from '../assets/threads.svg';
import { Link } from 'react-router-dom';
const Footer = () => {
  return (
    <div className="footer">
      <div className="footer-left">
        <h3>Get in Touch</h3>
        <div className="social-media">
            
            <div className="column-footer">
              <a href="http://bit.ly/MO-facebook">
                <img src={facebookIcon} alt="Facebook" />
                
              </a>
              <a href="http://bit.ly/MO-facebook">
                Facebook
                
              </a>
            </div>
            <div className="column-footer">
              <a href="http://bit.ly/MO-ig">
                <img src={instagramIcon} alt="Instagram" />
              </a>
              <a href="http://bit.ly/MO-ig">
              Instagram
                </a>
            </div>
            
            <div className="column-footer">
              <a href="http://bit.ly/MO-Xtwitter">
                <img src={twitterIcon} alt="Twitter" />
              </a>
              <a href="http://bit.ly/MO-Xtwitter">
              X/Twitter
                </a>
            </div>
            {/* <div className="column-footer">
              <a href="http://bit.ly/MOthreads">
                <img src={linkedinIcon} alt="LinkedIn" />
              </a>
              <a href="http://bit.ly/MOthreads">
              Threads
                </a>
            </div> */}
            </div>
          </div>
         <div className="footer-right">
        <img className='logo-right' src={cmcLogo} alt="Medical Olympics Logo" />
        <a className='terms-link' href="https://www.jwcmedicalolympics.com/register#terms-and-conditions">Terms and Conditions</a>
        <a className='email-hyperlink' href="mailto:medicalolympicscmcl@gmail.com">Email: medicalolympicscmcl@gmail.com</a>

        

      </div>
    </div>
  );
};

export default Footer;
