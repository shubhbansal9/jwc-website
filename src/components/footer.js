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
              <a href="http://bit.ly/MOthreads">
              Instagram
                </a>
            </div>
            
            <div className="column-footer">
              <a href="http://bit.ly/MO-Xtwitter">
                <img src={twitterIcon} alt="Twitter" />
              </a>
              <a href="http://bit.ly/MO-ig">
              X/Twitter
                </a>
            </div>
            <div className="column-footer">
              <a href="http://bit.ly/MO-threads">
                <img src={linkedinIcon} alt="LinkedIn" />
              </a>
              <a href="http://bit.ly/MO-threads">
              Threads
                </a>
            </div>
            </div>
          </div>
         <div className="footer-right">
        <img src={cmcLogo} alt="Medical Olympics Logo" />
        <p>Email: medicalolympicscmcl@gmail.com</p>
        <a className='terms-link' href="https://www.jwcmedicalolympics.com/register#terms-and-conditions">View Terms and Conditions</a>

      </div>
    </div>
  );
};

export default Footer;
