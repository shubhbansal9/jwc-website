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
          <Link to="/delegates" className={buttonClass}>International Delegates</Link>
        </li>
        <li>
          <Link to="/accommodation" className={buttonClass}>Accommodation</Link>
        </li>
        <li>
          <Link to="/contact" className={buttonClass}>Contact Us</Link>
        </li>
      </ul>
      
      <button className='sign-in'>Sign In</button>
      <div className="search-bar">
        <input type="text" placeholder="Search" />
        <i className="fas fa-search"></i> 
      </div>
    </nav>
  );
}

export default Navbar;
