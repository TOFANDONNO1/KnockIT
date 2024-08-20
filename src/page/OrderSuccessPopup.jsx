// OrderSuccessPopup.js
import React from 'react';

const OrderSuccessPopup = ({ showPopup, onClose }) => {
  return (
    <div className={`popup ${showPopup ? 'show' : ''}`}>
      <div className="popup-content">
        <h2>Order Successfully Placed</h2>
        <p>Thank you for your order. You will receive an email confirmation shortly.</p>
        <button onClick={onClose}>Close</button>
      </div>
    </div>
  );
};

export default OrderSuccessPopup;
