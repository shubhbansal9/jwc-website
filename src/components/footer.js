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
          <div className="row">
            
            <div className="column-footer">
              <a href="http://bit.ly/MO-facebook">
                <img src={facebookIcon} alt="Facebook" />
                
              </a>
              <a href="http://bit.ly/MO-facebook">
                facebook
                
              </a>
            </div>
            <div className="column-footer">
              <a href="http://bit.ly/MO-ig">
                <img src={instagramIcon} alt="Instagram" />
              </a>
              <a href="http://bit.ly/MOthreads">
              instagram
                </a>
            </div>
          </div>
          <div className="row">
            <div className="column-footer">
              <a href="http://bit.ly/MO-Xtwitter">
                <img src={twitterIcon} alt="Twitter" />
              </a>
              <a href="http://bit.ly/MO-ig">
              x/twitter
                </a>
            </div>
            <div className="column-footer">
              <a href="http://bit.ly/MO-threads">
                <img src={linkedinIcon} alt="LinkedIn" />
              </a>
              <a href="http://bit.ly/MO-threads">
              threads
                </a>
            </div>
          </div>
          </div>
      </div>
      <div className="footer-middle">
        <h3>Sitemap</h3>

        <div className="sitemap">
      
            <Link to="/">Home</Link>
            <Link to="/packs">Packs</Link>
            <Link to="/about">About us</Link>
            <Link to="/events">Events</Link>
            <Link to="/delegates">International Delegates</Link>
            <Link to="/accommodation">Accommodation</Link>
            <Link to="/contact">Contact us</Link>
        
      </div>
      </div>
      <div className="footer-right">
        <img src={cmcLogo} alt="Medical Olympics Logo" />
        <p>Contact Number: (123) 456-7890</p>
        <p>Email: info@example.com</p>
      </div>
    </div>
  );
};

export default Footer;
