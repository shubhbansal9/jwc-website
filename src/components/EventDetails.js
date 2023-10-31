import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faArrowRight } from '@fortawesome/free-solid-svg-icons';
import './EventDetails.css';
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
        <div className="arrow left" onClick={previousEvent}>
          <FontAwesomeIcon icon={faArrowLeft} />
        </div>
        <div className='event'>
        <h3>{events[currentIndex].title}</h3>
        <img src={events[currentIndex].imageUrl} alt={events[currentIndex].title} />
        </div>
        <div className="arrow right" onClick={nextEvent}>
          <FontAwesomeIcon icon={faArrowRight} />
        </div>
      </div>
    </div>
  );
};

export default EventDetails;
