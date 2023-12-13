import React, { useState, useEffect } from 'react';
import './Cart.css';
import medicalOlympicsImage from '../assets/medical-olympics.svg';
import cmcLogo from '../assets/cmc-logo.svg';
import Navbar from '../components/Navbar';
import Footer from '../components/footer';
import '../components/footer.css';
import { useAuth } from '../components/authContext';

const CartPage = () => {
  const { loggedIn, userProfile } = useAuth();
  const [eventsDetails, setEventsDetails] = useState([]);
  const [total, setTotal] = useState(0);
  const [isAMSAMember, setIsAMSAMember] = useState(false);
  const [membershipNumber, setMembershipNumber] = useState('');

  const fetchUserLocation = async (email) => {
    try {
      const response = await fetch(`https://64.227.156.132:3001/api/user-location?email=${email}`);
      const data = await response.json();
      return data.location; // Assuming the response contains the user's location
    } catch (error) {
      console.error('Error fetching user location:', error);
      return null;
    }
  };
  useEffect(() => {
    const fetchEventDetails = async () => {
      try {
        if (userProfile && userProfile.email) {
          const response = await fetch(`https://64.227.156.132:3001/api/user-cart/${userProfile.email}`);
          const cartData = await response.json();

          if (cartData.success && cartData.cart) {
            const eventIds = cartData.cart.eventsInCart;
            const eventDetailsPromises = eventIds.map(async (eventId) => {
              const eventResponse = await fetch(`https://64.227.156.132:3001/api/events/${eventId}`);
              const eventData = await eventResponse.json();
              console.log(eventData.price_in);
              return eventData;
            });

            const resolvedEvents = await Promise.all(eventDetailsPromises);
            setEventsDetails(resolvedEvents);
          
        
        const userLocation = await fetchUserLocation(userProfile.email);

        // Loop through fetched event details to adjust prices based on user location
        const updatedEventsDetails = resolvedEvents.map((event) => {
          console.log(userLocation);
          if (userLocation === 'India') {
            event.price = event.price_in;
          } else {
            event.price = event.price_us;
          }
          console.log(`Event ID: ${event.eventId}, Updated Price: ${event.price}`);
          return event;
        });
        
  
        setEventsDetails(updatedEventsDetails);
      } 
    }
  }
  catch (error) {
        console.error(error);
      }
    };
  
    fetchEventDetails();
  }, [userProfile]);

  useEffect(() => {
    const calculateTotal = () => {
      const totalPrice = eventsDetails.reduce((sum, item) => {
        const price = item.price || ''; // Assuming the price is stored in the 'price' property of the event object
        let numericPrice = 0;
  
        // Check if the price is a string
        if (typeof price === 'string') {
          const numericValue = parseInt(price.replace(/\D/g, ''), 10);
          numericPrice = !isNaN(numericValue) ? numericValue : 0;
        } else if (typeof price === 'number') {
          numericPrice = price;
        }
  
        return sum + numericPrice;
      }, 0);
      setTotal(totalPrice);
    };
  
    calculateTotal();
  }, [eventsDetails]);
  
  
  

  return (
    <div className="cart-page">
      <h1 className='cart-header'>Your Cart</h1>
      {eventsDetails.length === 0 ? (
      <p className='cart-text'>Your cart is empty.</p>
    ) : (
      <>
      <ul className="cart-items">
        {eventsDetails.map((event, index) => (
          <li key={index} className="cart-item">
            <div className="cart-item-details">
              <p className='item'>{event.eventName}</p>
              <p className='item'>Price: {event.price}</p>
            </div>
            {/* Button for removing the item */}
            <button onClick={async () => {
              try {
                const response = await fetch(`https://64.227.156.132:3001/api/remove-from-cart/${userProfile.email}/${event.eventId}`, {
                  method: 'POST',
                });
                console.log(userProfile.email);
                console.log(parseInt(event.eventId));
                const data = await response.json();
                console.log(event.eventId);
                if (data.success && (event.eventId === "27" || event.eventId === "28")) {
                  console.log("updating");
                  await fetch('https://64.227.156.132:3001/api/update-br-status', {
                    method: 'POST',
                    headers: {
                      'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                      email: userProfile.email,
                      brStatus: 0,
                    }),
                  });
                }
                if (data.success) {
                  // If the removal was successful, update the events displayed
                  const updatedEvents = eventsDetails.filter((item, idx) => idx !== index);
                  setEventsDetails(updatedEvents);
                } else {
                  // Handle failure or display a message
                  console.log('Failed to remove item from the cart');

                }
              } catch (error) {
                console.error('Error removing item from cart:', error);
              }
              
            }}>Remove</button>
          </li>
        ))}
      </ul>
      <div className="amsa-membership">
        <input
          type="checkbox"
          id="amsaMemberCheckbox"
          checked={isAMSAMember}
          onChange={() => setIsAMSAMember(!isAMSAMember)}
        />
        <label htmlFor="amsaMemberCheckbox">Are you AMSA member?</label>

        {/* Show text field if AMSA member checkbox is checked */}
        {isAMSAMember && (
          <div className="membership-number">
            <label htmlFor="membershipNumber">Membership Number:  </label>
            <input
              type="text"
              id="membershipNumber"
              value={membershipNumber}
              onChange={(e) => setMembershipNumber(e.target.value)}
            />
          </div>
        )}
      </div>
      {total > 0 && (
        <div className="cart-total">
          <p className='item-total'>Total: {total}</p>
          <button className="pay-button" onClick={() => alert("Payment functionality to be implemented")}>Pay Now</button>
        </div>
      )}
     
      </>
    )}
      <div className="cart-footer">
        <Footer/>
      </div>
    </div>
  );
};

export default CartPage;
