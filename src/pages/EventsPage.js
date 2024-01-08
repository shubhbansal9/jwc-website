import React, { useState } from 'react';
import workshopsData from '../components/workshopData';
import medicalOlympicsImage from '../assets/medical-olympics.svg';
import cmcLogo from '../assets/cmc-logo.svg';
import Navbar from '../components/Navbar';
import './EventsPage.css';
import culturalData from '../components/culturalData';
import sportsData from '../components/sportsData';
import workshopImage from '../assets/events.png';
import iternaryImage from '../assets/itinerary.png';
import academicsData from '../components/academicsData';
import Footer from '../components/footer';
import EventDetails from '../components/EventDetails';
import upcomingEvents from '../components/eventData';
import ConfirmationPopup from '../components/confirmationPopup';
import { useCart } from '../components/cart';
import { useAuth } from '../components/authContext';
import { useEffect } from 'react';
import eventItinerary from '../assets/event-itinerary.jpeg';
import { Link  } from 'react-router-dom';
function EventsPage() {
  
  const { loggedIn, userProfile } = useAuth();
  const [expandedWorkshops, setExpandedWorkshops] = useState(Array(workshopsData.length).fill(false));
  const [showPopup, setShowPopup] = useState(false);
  const { addToCart } = useCart();
  const [userBRStatus, setUserBRStatus] = useState(0);
  
  const [showLocationPopup, setLocationShowPopup] = useState(true);

  const [userLocation, setUserLocation] = useState(null);

  // Function to update user location
  const updateUserLocation = async (email, location) => {
    try {
      await fetch('https://api.jwcmedicalolympics.com/api/update-location', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: email,
          location: location,
        }),
      });
      console.log("updated location: ", location);
    } catch (error) {
      console.error('Error updating user location:', error);
    }
  };

  // Function to fetch user location
  const fetchUserLocation = async (email) => {
    try {
      const response = await fetch(`https://api.jwcmedicalolympics.com/api/user-location?email=${email}`);
      const data = await response.json();
      setUserLocation(data.location);
      console.log("location fetched: ", data.location);
    } catch (error) {
      console.error('Error fetching user location:', error);
    }
  };

  // Handle location confirmation
  const handleLocationConfirmation = async (location) => {
    // Update user location in the backend
    if (loggedIn && userProfile && userProfile.email) {
      await updateUserLocation(userProfile.email, location);
      setUserLocation(location);
    }
    
    else{
      setUserLocation(location);
    }
    setLocationShowPopup(false); // Close the location popup
  };

  useEffect(() => {
    // Fetch user's location on each navigation if logged in and there's an email
    if (loggedIn && userProfile && userProfile.email) {
      fetchUserLocation(userProfile.email);
    }
  }, [loggedIn, userProfile]);

  // Function to determine price based on location
  const getPriceByLocation = (workshop) => {
    if (userLocation === 'India') {
      console.log(workshop.price_in);
      return workshop.price_in;
    } else {
      return workshop.price_us;
    }
  };



  useEffect(() => {
    // Fetch user's BR status
    const fetchBRStatus = async () => {
      try {
        console.log("fetching user br status");
        if (loggedIn && userProfile && userProfile.email) {
          const response = await fetch(`https://api.jwcmedicalolympics.com/api/get-br-status/${userProfile.email}`);
          const data = await response.json();
          setUserBRStatus(data.brStatus);
        }
      } catch (error) {
        console.error('Error fetching BR status:', error);
      }
    };

    fetchBRStatus();
  }, [loggedIn, userProfile]);
  const [totalSeats, setTotalSeats] = useState({}); // Object to store total seats for each eventId

  useEffect(() => {
    // Fetch total seats for each eventId
    const fetchTotalSeats = async (eventId) => {
      try {
        const response = await fetch(`https://api.jwcmedicalolympics.com/api/total-seats/${eventId}`);
        const data = await response.json();
        if (data.success) {
          setTotalSeats(prevTotalSeats => ({
            ...prevTotalSeats,
            [eventId]: data.totalSeats,
          }));
        } else {
          console.error(`Failed to fetch total seats for eventId ${eventId}`);
        }
      } catch (error) {
        console.error('Error fetching total seats:', error);
      }
    };

    // Iterate over all events and fetch total seats
    [...workshopsData, ...culturalData, ...academicsData, ...sportsData].forEach(workshop => {
      fetchTotalSeats(workshop.eventId);
    });
  }, []); // Empty dependency array to run the effect only once on component mount

  // Function to render the total seats for an event
  const renderTotalSeats = (eventId) => {
    const seats = totalSeats[eventId];
    return seats !== undefined ? `Total Seats: ${seats}` : 'Fetching...';
  };


  const handleWorkshopCardClick = (index) => {
    const updatedWorkshops = [...expandedWorkshops];
    
    // Close the previously expanded card
    const previouslyExpandedIndex = updatedWorkshops.findIndex((isExpanded) => isExpanded);
    if (previouslyExpandedIndex !== -1 && previouslyExpandedIndex !== index) {
      updatedWorkshops[previouslyExpandedIndex] = false;
    }
  
    // Toggle the clicked card
    updatedWorkshops[index] = !updatedWorkshops[index];
    setExpandedWorkshops(updatedWorkshops);
  };
  const checkClashingEvents = async (eventId) => {
    try {
      if (loggedIn && userProfile && userProfile.email) {
        const response = await fetch(`https://api.jwcmedicalolympics.com/api/user-cart/${userProfile.email}`);
        const cartData = await response.json();


        if (cartData.success && cartData.cart) {
          const eventsInCart = cartData.cart.eventsInCart;
          console.log(eventsInCart);
          const clashingEvents = [
            [4, 8, 6],
            [20, 24],
            [1, 5, 3],
            [22, 21, 23],
            [2, 7, 9, 13],
            [29,30],
            [27,28]
          ];

          for (const clashingGroup of clashingEvents) {
            if (clashingGroup.includes(eventId)) {
              const intersection = clashingGroup.filter((event) => eventsInCart.includes(event));
              if (intersection.length > 0) {
                return true; // There's a clash
              }
            }
          }
        }
      }
    } catch (error) {
      console.error('Error checking clashing events:', error);
    }

    return false;
  };
  const handleRegisterClick = async (workshop) => {
    if (!loggedIn) {
      alert('Kindly login before registering.');
      return;
    }
    
      
    if (!userBRStatus || userBRStatus.brStatus === 0 || userBRStatus === false) {
      alert('You are not eligible to register for Events. Complete the Basic Registration in Register Now page first');
      return;
    }
  
  const { eventId } = workshop;

  // Check for clashing events
  const isClashing = await checkClashingEvents(eventId);
  console.log(eventId);
  if (isClashing) {
    alert('This event clashes with another event in your cart. You cannot register for them together.');
    return;
  }
  else{
    console.log("no clash");
  }

  setSelectedWorkshop(workshop);
  setShowPopup(true);
};
  const [selectedWorkshop, setSelectedWorkshop] = useState(null);
  
  const handleClosePopup = () => {
    setSelectedWorkshop(null);
    setShowPopup(false);
  };
  
    const handleConfirmBooking = () => {
      if (!selectedWorkshop) {
        console.error('No selected workshop to add to cart.');
        return;
      }
    
      // Make a POST request to your server's endpoint to add the event to the cart
      fetch('https://api.jwcmedicalolympics.com/api/add-to-cart', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: userProfile.email, // Replace with the actual user's email or fetch it from your authentication context
          eventId: selectedWorkshop.eventId,
        }),
      })
        .then(response => response.json())
        .then(data => {
          console.log('Item added to cart:', data);
          // You can update your UI or take further actions based on the response
        })
        .catch(error => {
          console.error('Error adding item to cart:', error);
          // Handle the error, show an alert, or take appropriate action
        });
    
      setShowPopup(false);
    };


  return (
    <div className="events-page">
         {showLocationPopup && (userLocation === "none" || userLocation === null) &&(
        <div className="popup-container">
          <div className="popup-content">
            <p>Are you from India?</p>
            <button className="popup-button" onClick={() => handleLocationConfirmation('India')}>
              Yes
            </button>
            <button className="popup-button" onClick={() => handleLocationConfirmation('Other')}>
              No
            </button>
          </div>
        </div>
      )}
      <div className="line"></div>
      <div className='workshop'>
      {/* <EventDetails events={upcomingEvents} /> */}
      <img src={eventItinerary} alt="Medical Olympics Logo" className="event-itinerary" />
      <Link to="https://drive.google.com/file/d/1fzysBeCum2B2_4ZhPKGFkxf2JHlXbDra/view?usp=drivesdk" className="itinerarylink"><br></br><br></br>Check out our Academic events Brochure<br></br></Link>
      <Link to="https://drive.google.com/file/d/1nBTPQTI4yRwhZjo8LEFN42WHlultiEG1/view?usp=drivesdk" className="itinerarylink">Check out our Cultural events Brochure<br></br></Link>
      <Link to="https://drive.google.com/file/d/1fh3pF0fHK2Zat17-l2ScNb5GbCddx1Yx/view" className="itinerarylink">Check out our Sports events Brochure<br></br><br></br></Link>
      <div className='note'>Note: Only one of the members from the team requires to register for the GROUP EVENTS</div>
        <h1 className='workshop-headers'>WORKSHOPS</h1>
        <div className="workshop-cards-container">
          <div className="workshop-cards">
            {workshopsData.map((workshop, index) => (
              <div className={`workshop-card ${expandedWorkshops[index] ? 'expanded' : ''}`} key={index} onClick={() => handleWorkshopCardClick(index)}>
                <img src={workshop.image} alt={workshop.title} />
                <div className='workshop-title'>{workshop.title}</div>

                {expandedWorkshops[index] && (
                  <p className='workshop-description'>{workshop.description}</p>
                )}
                <div className='workshop-buttons'>
                  <button className='workshop-button' onClick={() => handleRegisterClick(workshop)}>Register</button>
                  <div className="price-rectangle">
                  <p className="price">{getPriceByLocation(workshop)}</p>
                  <p className="total-seats">{renderTotalSeats(workshop.eventId)}</p>
                  </div>
                </div>
                {showPopup && (
        <ConfirmationPopup workshopDetails={selectedWorkshop} onConfirmBooking={handleConfirmBooking} onClose={handleClosePopup}>
          {/* Customize the content of your popup here */}
          <p>ARE YOU SURE YOU WANT TO ADD THIS EVENT TO THE CART?</p>
        </ConfirmationPopup>
      )}

              </div>
            ))}
      </div>
      </div>
      </div>
      <div className='workshop'>
        <h1 className='workshop-headers'>ACADEMICS</h1>
        <div className="workshop-cards-container">
          <div className="workshop-cards">
            {academicsData.map((workshop, index) => (
              <div className={`workshop-card ${expandedWorkshops[index] ? 'expanded' : ''}`} key={index} onClick={() => handleWorkshopCardClick(index)}>
                <img src={workshop.image} alt={workshop.title} />
                <div className='workshop-title'>{workshop.title}</div>
                <div className='workshop-event-type'>{workshop.eventType}</div>
                {expandedWorkshops[index] && (
                  <p className='workshop-description'>{workshop.description}</p>
                )}
                <div className='workshop-buttons'>
                  <button className='workshop-button' onClick={() => handleRegisterClick(workshop)}>Register</button>
                  <div className="price-rectangle">
                  <p className="price">{getPriceByLocation(workshop)}</p>
                  <p className="total-seats">{renderTotalSeats(workshop.eventId)}</p>
                  </div>
                </div>
                {showPopup && (
        <ConfirmationPopup workshopDetails={selectedWorkshop} onConfirmBooking={handleConfirmBooking} onClose={handleClosePopup}>
          {/* Customize the content of your popup here */}
          <p>ARE YOU SURE YOU WANT TO ADD THIS EVENT TO THE CART?</p>
        </ConfirmationPopup>
      )}

              </div>
            ))}
      </div>
      </div>
      </div>
      <div className='workshop'>
        <h1 className='workshop-headers'>CULTURALS</h1>
        <div className="workshop-cards-container">
          <div className="workshop-cards">
            {culturalData.map((workshop, index) => (
              <div className={`workshop-card ${expandedWorkshops[index] ? 'expanded' : ''}`} key={index} onClick={() => handleWorkshopCardClick(index)}>
                <img src={workshop.image} alt={workshop.title} />
                <div className='workshop-title'>{workshop.title}</div>
                <div className='workshop-event-type'>{workshop.eventType}</div>
                {expandedWorkshops[index] && (
                  <p className='workshop-description'>{workshop.description}</p>
                )}
                <div className='workshop-buttons'>
                  <button className='workshop-button' onClick={() => handleRegisterClick(workshop)}>Register</button>
                  <div className="price-rectangle">
                  <p className="price">{getPriceByLocation(workshop)}</p>
                  <p className="total-seats">{renderTotalSeats(workshop.eventId)}</p>
                  </div>
                </div>
                {showPopup && (
        <ConfirmationPopup workshopDetails={selectedWorkshop} onConfirmBooking={handleConfirmBooking} onClose={handleClosePopup}>
          {/* Customize the content of your popup here */}
          <p>ARE YOU SURE YOU WANT TO ADD THIS EVENT TO THE CART?</p>
        </ConfirmationPopup>
      )}

              </div>
            ))}
      </div>
      </div>
      </div>
      <div className='workshop'>
        <h1 className='workshop-headers'>SPORTS</h1>
        <div className="workshop-cards-container">
          <div className="workshop-cards">
            {sportsData.map((workshop, index) => (
              <div className={`workshop-card ${expandedWorkshops[index] ? 'expanded' : ''}`} key={index} onClick={() => handleWorkshopCardClick(index)}>
                <img src={workshop.image} alt={workshop.title} />
                <div className='workshop-title'>{workshop.title}</div>
                <div className='workshop-event-type'>{workshop.eventType}</div>
                {expandedWorkshops[index] && (
                  <p className='workshop-description'>{workshop.description}</p>
                )}
                <div className='workshop-buttons'>
                  <button className='workshop-button' onClick={() => handleRegisterClick(workshop)}>Register</button>
                  <div className="price-rectangle">
                  <p className="price">{getPriceByLocation(workshop)}</p>
                  <p className="total-seats">{renderTotalSeats(workshop.eventId)}</p>
                  </div>
                </div>
                {showPopup && (
        <ConfirmationPopup workshopDetails={selectedWorkshop} onConfirmBooking={handleConfirmBooking} onClose={handleClosePopup}>
          {/* Customize the content of your popup here */}
          <p>ARE YOU SURE YOU WANT TO ADD THIS EVENT TO THE CART?</p>
        </ConfirmationPopup>
      )}

              </div>
            ))}
      </div>
      </div>
      </div>
      <Footer/>
     
      
    </div>
    
  );
}

export default EventsPage;
