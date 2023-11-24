// ConfirmationPopup.js
import React from 'react';
import './confirmationPopup.css';

const ConfirmationPopup = ({ workshopDetails, onConfirmBooking, onClose }) => {
  return (
    <div className="popup-overlay">
      <div className="atc-popup">
        <button className="close-button" onClick={onClose}>
          X
        </button>
        <div className="popup-content">
          <div className='popup-header'>Are you sure you want to add this event to cart?</div>
          {/* Display workshop details */}
          <p>Title: {workshopDetails.title}</p>
          <div className='workshop-desc'>Description: {workshopDetails.description}</div>
          <p>Price: {workshopDetails.price}</p>
        </div>
        <div className="button-container">
        <button className="add-to-cart-button" onClick={onConfirmBooking}>
            Add to Cart
          </button>
          <button className="cancel-button" onClick={onClose}>
            Cancel
          </button>
         
        </div>
      </div>
    </div>
  );
};

export default ConfirmationPopup;
