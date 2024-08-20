import React from 'react';
import { Button } from 'react-bootstrap';
import "../CSS/WhatsApp.css";
import { FaWhatsapp } from 'react-icons/fa';
import { IconContext } from 'react-icons';

const WhatsAppChatButton = () => {
  // Define your WhatsApp number with the country code
  const phone = '';

  const handleWhatsAppClick = () => {
    window.open(`https://wa.me/${phone}`, '_blank');
  };

  return (
    <Button variant="none" onClick={handleWhatsAppClick}   className="whatsapp-button">
      <IconContext.Provider value={{ className: "top-react-icons-whatapp" }}> 
      <FaWhatsapp color='white'/>
              </IconContext.Provider>
     
    </Button>
  );
};

export default WhatsAppChatButton;
