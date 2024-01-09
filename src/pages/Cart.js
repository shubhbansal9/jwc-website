import React, { useState, useEffect } from 'react';
import './Cart.css';
import medicalOlympicsImage from '../assets/medical-olympics.svg';
import cmcLogo from '../assets/cmc-logo.svg';
import Navbar from '../components/Navbar';
import Footer from '../components/footer';
import '../components/footer.css';
import { useAuth } from '../components/authContext';
import axios from 'axios';
const CartPage = () => {
  const { loggedIn, userProfile } = useAuth();
  const [eventsDetails, setEventsDetails] = useState([]);
  const [total, setTotal] = useState(0);
  const [isAMSAMember, setIsAMSAMember] = useState(false);
  const [membershipNumber, setMembershipNumber] = useState('');
  const data ={
    name: userProfile.name,
    amount: total,
    MUID: "MUID" + Date.now(),
    transactionId: 'T' + Date.now(),
}

const handlePayment = (e) => {
  e.preventDefault();

  // Assuming userEmail is available
  const userEmail = userProfile.email;
  console.log(userEmail);

  // Log request data
  console.log('Request Data:', { ...data, userEmail }); 

  axios.post(`https://api.jwcmedicalolympics.com/api/payment/${userEmail}`, { ...data }) 
    .then(res => {
      // Log successful response
      console.log('Response Data:', res.data);

      // Extract the payment gateway URL from the response
      const paymentGatewayUrl = res.data;
      console.log("Payment Gateway URL:", paymentGatewayUrl);

      // Redirect the user to the payment gateway
      try {
        console.log("Redirecting to the payment gateway");
        window.location.href = paymentGatewayUrl;
      } catch (redirectError) {
        console.error('Error during redirection:', redirectError.message);
      }
    })
    .catch(error => {
      // Log Axios error
      console.error('Axios Error:', error);

      // Log response data if available
      if (error.response) {
        console.error('Response Data:', error.response.data);
      }

      // Log request headers
      if (error.config && error.config.headers) {
        console.log('Request Headers:', error.config.headers);
      }

      // Log request data if available
      if (error.config && error.config.data) {
        console.log('Request Data:', JSON.parse(error.config.data));
      }

      // Handle error or take appropriate action
      console.log("Error during payment:", error.message);
    });
};
const handleAMSAStatusUpdate = async () => {
  try {
    const newAMSAStatus = isAMSAMember ? 'yes' : 'no'; // Convert boolean to string
    console.log(`Amsa membership: ${newAMSAStatus}`);
    const response = await axios.post('https://api.jwcmedicalolympics.com/api/update-amsa-status', {
      email: userProfile.email,
      amsaMember: newAMSAStatus,
    });

    if (response.data.success) {
      console.log(`AMSA member status updated successfully: ${newAMSAStatus}`);
    } else {
      console.log('Failed to update AMSA member status');
    }
  } catch (error) {
    console.error('Error updating AMSA member status:', error);
  }
};
  const fetchUserLocation = async (email) => {
    try {
      const response = await fetch(`https://api.jwcmedicalolympics.com/api/user-location?email=${email}`);
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
          const response = await fetch(`https://api.jwcmedicalolympics.com/api/user-cart/${userProfile.email}`);
          const cartData = await response.json();

          if (cartData.success && cartData.cart) {
            const eventIds = cartData.cart.eventsInCart;
            const eventDetailsPromises = eventIds.map(async (eventId) => {
              const eventResponse = await fetch(`https://api.jwcmedicalolympics.com/api/events/${eventId}`);
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
    const calculateTotal = async () => {
      try {
        const totalPrice = eventsDetails.reduce((sum, item) => {
          // Assuming the price is stored in the 'eventPrice_in' property of the event object
          const price = item.eventPrice_in || 0;
          return sum + price;
        }, 0);
  
        let discountedTotal = totalPrice;
  
        if (isAMSAMember) {
          // Check if events 27 and 28 are in the cart
          const hasEvent27 = await checkEventInCart("27");
          const hasEvent28 = await checkEventInCart("28");
  
          // Subtract discount based on the events in the cart
          if (hasEvent27) {
            discountedTotal -= 100;
          }
  
          if (hasEvent28) {
            discountedTotal -= 150;
          }
        }
  
        setTotal(discountedTotal);
      } catch (error) {
        console.error(error);
      }
    };
  
    const checkEventInCart = async (eventId) => {
      try {
        const response = await fetch(`https://your-api-domain/api/user-cart-has-event/${userEmail}/${eventId}`);
        const data = await response.json();
  
        return data.success && data.hasEvent;
      } catch (error) {
        console.error(error);
        return false;
      }
    };
  
    calculateTotal();
  }, [eventsDetails, isAMSAMember, userEmail]);
  
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
                const response = await fetch(`https://api.jwcmedicalolympics.com/api/remove-from-cart/${userProfile.email}/${event.eventId}`, {
                  method: 'POST',
                });
                console.log(userProfile.email);
                console.log(parseInt(event.eventId));
                const data = await response.json();
                console.log(event.eventId);
                if (data.success && (event.eventId === "27" || event.eventId === "28")) {
                  console.log("updating");
                  await fetch('https://api.jwcmedicalolympics.com/api/update-br-status', {
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
          onChange={() => {
            setIsAMSAMember(!isAMSAMember)
            handleAMSAStatusUpdate();
          }}
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
          <button className="pay-button" onClick={handlePayment}>Pay Now</button>
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
