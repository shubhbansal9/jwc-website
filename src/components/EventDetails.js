import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faArrowRight } from '@fortawesome/free-solid-svg-icons';
import './EventDetails.css';
import arrowLeft from '../assets/arrow-left.svg';
import arrowRight from '../assets/arrow-right.svg';
const EventDetails = ({ events }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextEvent = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % events.length);
  };

  const previousEvent = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + events.length) % events.length);
  };

  return (
    <div className="event-details">
    <h2>Upcoming Events</h2>
    <div className="event-content">
      <div className="event">
        <h3>{events[currentIndex].title}</h3>
        <img src={events[currentIndex].imageUrl} alt={events[currentIndex].title} />
        <div className="arrow left" onClick={previousEvent}>
          <img src={arrowLeft} alt="Previous" />
        </div>
        <div className="arrow right" onClick={nextEvent}>
          <img src={arrowRight} alt="Next" />
        </div>
      </div>
      
    </div>
    <div className="dots">
    {events.map((event, index) => (
      <span
        key={index}
        className={index === currentIndex ? 'dot active' : 'dot'}
        onClick={() => setCurrentIndex(index)}
      ></span>
    ))}
  </div>
  </div>
  
  );
};

export default EventDetails;
