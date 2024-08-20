import axios from "axios";
// import UserDataService from "../services/User.js";

// Function to perform reverse geocoding
const reverseGeocode = async (latitude, longitude) => {
  try {
    // Make a GET request to Nominatim's reverse geocoding API
    const response = await axios.get(
      `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`
    );

    if (response.data) {
   return response.data;
    } else {
      console.error("No location data found");
      return null;
    }
  } catch (error) {
    console.error("Error fetching location data:", error);
    return null;
  }
};

export default reverseGeocode;


// import React from 'react';
// import Modal from 'react-modal';

// const LocationModal = ({ isOpen, onRequestClose, onAllowLocation }) => {
//   return (
//     <Modal
//       isOpen={isOpen}
//       onRequestClose={onRequestClose}
//       contentLabel="Location Access Modal"
//     >
//       <h2>Allow Location Access</h2>
//       <p>We need access to your location for a better experience.</p>
//       <button onClick={onAllowLocation}>OK</button>
//       <button onClick={onRequestClose}>Cancel</button>
//     </Modal>
//   );
// };

// export default LocationModal;
