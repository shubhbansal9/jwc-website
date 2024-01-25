import React, { useState, useEffect } from 'react';
import './MyBookings.css'; // You can create a separate CSS file for styling if needed
import Navbar from '../components/Navbar';
import Footer from '../components/footer';
import { useAuth } from '../components/authContext';
import axios from 'axios';

const MyBookingsPage = () => {
  const { userProfile } = useAuth();
  const [eventsDetails, setEventsDetails] = useState([]);

  useEffect(() => {
    const fetchUserBookings = async () => {
      try {
        if (userProfile && userProfile.email) {
          const response = await fetch(`https://api.jwcmedicalolympics.com/api/registered-events/${userProfile.email}`);
          const bookingData = await response.json();

          if (bookingData.success && bookingData.registeredEvents) {
            const eventIds = bookingData.registeredEvents;
            const eventDetailsPromises = eventIds.map(async (eventId) => {
              const eventResponse = await fetch(`https://api.jwcmedicalolympics.com/api/events/${eventId}`);
              const eventData = await eventResponse.json();
              return eventData;
            });

            const resolvedEvents = await Promise.all(eventDetailsPromises);
            setEventsDetails(resolvedEvents);
          }
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchUserBookings();
  }, [userProfile]);

  return (
    <div className="my-bookings-page">
      <h1 className="bookings-header">My Bookings</h1>
      {eventsDetails.length === 0 ? (
        <p className="bookings-text">You haven't booked any events yet.</p>
      ) : (
        <ul className="bookings-list">
          {eventsDetails.map((event, index) => (
            <li key={index} className="booking-item">
              <div className="booking-item-details">
                <p className="item">{event.eventName}</p>
              </div>
            </li>
          ))}
        </ul>
      )}
      <div className="bookings-footer">
        <Footer />
      </div>
    </div>
  );
};

export default MyBookingsPage;
