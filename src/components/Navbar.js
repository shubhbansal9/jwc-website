import React from 'react';
import './Navbar.css';
import { Link } from 'react-router-dom'; // Import Link from React Router

function Navbar() {
  // Define a common CSS class for the buttons
  const buttonClass = 'nav-button';

  return (
    <nav className="navbar">
      <ul className="nav-list">
        <li>
          <Link to="/" className={buttonClass}>Home</Link>
        </li>
        <li>
          <Link to="/about" className={buttonClass}>About</Link>
        </li>
        <li>
          <Link to="/events" className={buttonClass}>Events</Link>
        </li>
        <li>
          <Link to="/int-delegates" className={buttonClass}>International Delegates</Link>
        </li>
        <li>
          <Link to="/accommodation" className={buttonClass}>Accommodation</Link>
        </li>
        <li>
          <Link to="/contact-us" className={buttonClass}>Contact Us</Link>
        </li>
        
      </ul>
      
      <button className='sign-in'>Sign In</button>
      <button className='sign-in'>Register now</button>
    </nav>
  );
}

export default Navbar;
