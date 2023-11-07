import React, { useState } from 'react';
import './Navbar.css';
import { Link } from 'react-router-dom';

function Navbar() {
  const [isNavOpen, setIsNavOpen] = useState(false);

  const toggleNav = () => {
    setIsNavOpen(!isNavOpen);
  };

  return (
    <nav className={`navbar ${isNavOpen ? 'open' : ''}`}>
      <div className="app-drawer-icon" onClick={toggleNav}>
        <div className={`bar ${isNavOpen ? 'open' : ''}`}></div>
        <div className={`bar ${isNavOpen ? 'open' : ''}`}></div>
        <div className={`bar ${isNavOpen ? 'open' : ''}`}></div>
      </div>
      <ul className={`nav-list ${isNavOpen ? 'active' : ''}`}>
        <li>
          <Link to="/" className="nav-button">Home</Link>
        </li>
        <li>
          <Link to="/about" className="nav-button">About</Link>
        </li>
        <li>
          <Link to="/events" className="nav-button">Events</Link>
        </li>
        <li>
          <Link to="/int-delegates" className="nav-button">International Delegates</Link>
        </li>
        <li>
          <Link to="/accommodation" className="nav-button">Accommodation</Link>
        </li>
        <li>
          <Link to="/contact-us" className="nav-button">Contact Us</Link>
        </li>
      </ul>
      <button className='sign-in'>Sign In</button>
      <button className='sign-in'>Register now</button>
    </nav>
  );
}

export default Navbar;
