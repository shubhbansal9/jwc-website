import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'; // Import Routes
import HomePage from './pages/HomePage';
import Navbar from './components/Navbar'; // Import the Navbar component
import AboutPage from './pages/About';
import EventsPage from './pages/EventsPage';
import InternationalDelegates from './pages/InternationalDelegates';
import ContactUsPage from './pages/ContactUs';

function App() {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<AboutPage/>}/>
          <Route path="/events" element={<EventsPage/>}/>
          <Route path="/int-delegates" element={<InternationalDelegates/>}/>
          <Route path="/contact-us" element={<ContactUsPage/>}/>
        </Routes>
      </div>
    </Router>
  );
}

export default App;
