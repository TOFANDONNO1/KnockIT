import React, { useEffect, useState } from "react";
import axios from "axios";
// import reverseGeocode from "./reverseGeocode";
 // Import the reverse geocoding function
import { useUserAuth } from "../Context/UseAuthContext";
import UserDataService from "../services/User.js";

const PermissionComponent = () => {
  const [location, setLocation] = useState(null);

 
  const {User}=useUserAuth();
  // console.log(User);
  useEffect(() => {
  // const User = JSON.parse(localStorage.getItem("user"));

  const reverseGeocode = async (latitude, longitude) => {
    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`
      );
  
      if (response.ok) {
        const locationData = await response.json();
        return locationData;
      } else {
        console.error(`Error fetching location data. Status: ${response.status}`);
        return null;
      }
    } catch (error) {
      console.error("Error fetching location data:", error);
      return null;
    }
  };
  


    if ("geolocation" in navigator) {
      const requestLocationPermission = () => {
        navigator.geolocation.getCurrentPosition(
          async (position) => {
            const { latitude, longitude } = position.coords;

            // Fetch location data using reverse geocoding
            const locationData = await reverseGeocode(latitude, longitude);

            if (locationData) {
              const { address } = locationData;
              const { display_name } = locationData;

              setLocation(address);
// console.log(address,"DISPLAY",display_name);
localStorage.setItem('address', JSON.stringify(display_name));

              if (User && User.uid) {
                await UserDataService.updateUser(User.uid, {
                  latitude,
                  longitude,
                  city:address.town,
                  state: address.state,
                  country: address.country,
                  pincode: address.postcode,
                  address: display_name,
                });
                
              
              }
            } else {
              console.error("Error fetching location data.");
            }
          },
          (error) => {
            // Handle permission denied or other errors
            console.error("Error getting location:", error.message);
          }
        );
      };

      requestLocationPermission();
     
    } else {
      // Geolocation API not supported
      console.error("Geolocation is not supported by this browser.");
    }
    // }
  }, []);

  // Render your component based on location data


    return (
      <>
        {/* {location  } */}
        {/* // <div style={{height:"0.0%"}}> */}
        {/* // <p>{location.town}</p> */}

        {/* Render your profile update form here */}
        {/* </div> */}
        {/* ) : ( */}
        {/* <>Loading...</> */}
        {/* )} */}
      </>
    );
  
};

export default PermissionComponent;
